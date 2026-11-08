import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isNeonConfigured } from '@/lib/db/neon';
import {
  getLesmateriaalCheckoutMode,
  isCheckoutSessionsMode,
} from '@/lib/lesmateriaal-checkout-mode';
import {
  claimFulfillment,
  decideWebhookFulfillmentGate,
  getConsentById,
  getConsentByStripeSessionId,
  getFulfillmentByStripeSessionId,
  markConsentPaid,
  markFulfillmentMailFailed,
  markFulfillmentMailSent,
  markFulfillmentMailSkipped,
  resolveConsentVerifiedForClaim,
  verifyConsentForOrder,
} from '@/lib/lesmateriaal-consent-store';
import { resolveOrderFromClientReferenceId } from '@/lib/lesmateriaal-order-resolve';
import { sendLesmateriaalFulfillmentEmail } from '@/lib/lesmateriaal-fulfillment-email';
import { evaluateLesmateriaalMailAllowlist } from '@/lib/lesmateriaal-preview-mail-guard';
import { COMPANY } from '@/lib/company';
import { getBrevoApiKeyCandidates } from '@/lib/brevo';
import {
  SESSIONS_LIVE_TEST_META,
  resolveLiveTestFromBoundConsent,
  shouldFailClosedOnLiveTestRecognitionError,
  verifySessionsLiveTestStripeSession,
  type LiveTestSessionRecognition,
} from '@/lib/lesmateriaal-sessions-live-test';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Best-effort dedupe binnen één serverless instance (aanvulling op DB) */
const processedSessions = new Set<string>();

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY ontbreekt');
  return new Stripe(key);
}

async function alertSupportMissingConsent(params: {
  sessionId: string;
  email: string;
  referenceId: string | null;
}): Promise<void> {
  const allow = evaluateLesmateriaalMailAllowlist(COMPANY.emailSupport);
  if (!allow.allowed) {
    console.warn('Lesmateriaal consent-mismatch alert skipped (preview guard):', {
      sessionId: params.sessionId,
      delivery: 'skipped_preview_guard',
      reason: allow.reason,
    });
    return;
  }

  const apiKeys = getBrevoApiKeyCandidates();
  if (apiKeys.length === 0) return;
  const text = [
    'SeniorEase — betaling zonder geverifieerde digitale toestemming',
    '',
    `sessionId=${params.sessionId}`,
    `email=${params.email}`,
    `referenceId=${params.referenceId ?? ''}`,
    '',
    'Download is wél geleverd. Geen toestemmingsbevestiging in de klantmail.',
  ].join('\n');

  for (const apiKey of apiKeys) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: {
            email: process.env.BREVO_SENDER_EMAIL?.trim() || COMPANY.emailGeneral,
            name: process.env.BREVO_SENDER_NAME?.trim() || COMPANY.brandName,
          },
          to: [{ email: COMPANY.emailSupport }],
          subject: '[SeniorEase] Betaling zonder geverifieerde consent',
          textContent: text,
        }),
      });
      if (response.ok) {
        console.log('Lesmateriaal consent-mismatch alert sent:', {
          sessionId: params.sessionId,
          delivery: 'sent',
        });
        return;
      }
    } catch (err) {
      console.error('consent-mismatch alert failed:', {
        sessionId: params.sessionId,
        delivery: 'failed',
        error: err,
      });
    }
  }
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook: signature of STRIPE_WEBHOOK_SECRET ontbreekt');
    return NextResponse.json({ error: 'Webhook niet geconfigureerd' }, { status: 500 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.id;

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return NextResponse.json({ received: true, skipped: 'not_paid' });
  }

  if (processedSessions.has(orderId)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const email =
    session.customer_details?.email?.trim() ||
    session.customer_email?.trim() ||
    undefined;

  if (!email) {
    console.error('Lesmateriaal fulfillment: geen e-mail', {
      orderId,
      client_reference_id: session.client_reference_id,
    });
    return NextResponse.json({ received: true, skipped: 'bad_reference' });
  }

  const order = resolveOrderFromClientReferenceId(
    session.client_reference_id,
    email.toLowerCase(),
  );
  if (!order) {
    console.error('Lesmateriaal fulfillment: geen geldige client_reference_id of mapping', {
      orderId,
      client_reference_id: session.client_reference_id,
      email,
    });
    return NextResponse.json({ received: true, skipped: 'bad_reference' });
  }

  const referenceId = session.client_reference_id || '';
  let consentVerified = false;
  let consentId: string | null = session.metadata?.consent_id?.trim() || null;

  const neonConfigured = isNeonConfigured();
  const checkoutMode = getLesmateriaalCheckoutMode();
  const sessionsMode = isCheckoutSessionsMode() && neonConfigured;
  /**
   * Variant C: live-test Session → Neon consent/fulfillment terwijl mode=links.
   * 1) HMAC zolang create-secret nog geldig is
   * 2) anders Neon checkout_source + bound session (overleeft secret-rotatie/uit)
   * Geen vertrouwen op alleen client-metadata.
   */
  let liveTest: LiveTestSessionRecognition =
    verifySessionsLiveTestStripeSession(session);

  let existingFulfillment = null as Awaited<
    ReturnType<typeof getFulfillmentByStripeSessionId>
  >;
  /** Alleen fulfillment-lookupfout — niet consent/live-test. */
  let lookupFailed = false;
  let liveTestRecognitionFailed = false;
  let boundLiveTestConsent = null as Awaited<
    ReturnType<typeof getConsentByStripeSessionId>
  >;

  if (neonConfigured) {
    try {
      existingFulfillment = await getFulfillmentByStripeSessionId(orderId);
    } catch (err) {
      lookupFailed = true;
      console.error('Lesmateriaal fulfillment lookup failed:', {
        orderId,
        mode: checkoutMode,
        liveTest: liveTest.ok,
        error: err,
        note:
          checkoutMode === 'links' && !liveTest.ok
            ? 'Idempotency niet gegarandeerd tijdens Neon-storing in links-modus; Payment Links-flow blijft actief.'
            : 'Sessions/live-test: claim-pad volgt (500 bij claimfout).',
      });
    }

    // Apart van fulfillment: Neon-herkenning na secret-rotatie mag niet
    // een bekende terminal rij of fail-closed live-test maskeren.
    if (!liveTest.ok) {
      try {
        boundLiveTestConsent = await getConsentByStripeSessionId(orderId);
        liveTest = resolveLiveTestFromBoundConsent(boundLiveTestConsent, session);
      } catch (err) {
        liveTestRecognitionFailed = true;
        console.error('Lesmateriaal live-test consent recognition failed:', {
          orderId,
          mode: checkoutMode,
          error: err,
        });
      }
    }
  }

  const useSessionsNeonFlow = sessionsMode || (liveTest.ok && neonConfigured);

  const gate = decideWebhookFulfillmentGate({
    checkoutMode: useSessionsNeonFlow ? 'sessions' : checkoutMode,
    neonConfigured,
    existing: existingFulfillment,
    lookupFailed,
  });

  if (gate.action === 'skip') {
    processedSessions.add(orderId);
    return NextResponse.json({
      received: true,
      duplicate: true,
      status: gate.status,
    });
  }

  // DB-fout bij live-test-herkenning: geen stille Payment Links-mailflow.
  if (
    shouldFailClosedOnLiveTestRecognitionError({
      liveTestOk: liveTest.ok,
      liveTestRecognitionFailed,
      metadataLiveTestFlag: session.metadata?.[SESSIONS_LIVE_TEST_META.flag],
    })
  ) {
    console.error('Lesmateriaal live-test recognition fail-closed (Stripe retry):', {
      orderId,
      mode: checkoutMode,
    });
    return NextResponse.json(
      { error: 'Live-test session recognition failed' },
      { status: 500 },
    );
  }

  /** Neon-rij bijhouden (sessions claim of links retry van bestaande rij). */
  let trackNeonFulfillment =
    gate.action === 'sessions_claim' || gate.action === 'links_retry';

  if (gate.action === 'links_lookup_failed') {
    // Payment Links: geen blokkade. Idempotency tijdelijk niet gegarandeerd.
    trackNeonFulfillment = false;
  }

  if (useSessionsNeonFlow) {
    try {
      // Live-test: alleen server-erkende consent_id (HMAC of Neon checkout_source).
      if (liveTest.ok) {
        consentId = liveTest.consentId;
      }
      let consent =
        boundLiveTestConsent &&
        liveTest.ok &&
        liveTest.via === 'neon' &&
        boundLiveTestConsent.consentId === liveTest.consentId
          ? boundLiveTestConsent
          : consentId
            ? await getConsentById(consentId)
            : null;
      if (!consent) {
        consent = await getConsentByStripeSessionId(orderId);
        if (consent) consentId = consent.consentId;
      }
      if (consent) {
        consentVerified = verifyConsentForOrder({
          consent,
          email,
          referenceId,
          stripeSessionId: orderId,
        });
        // Extra live-testgrenzen: erkende consent + Stripe e-mail/reference.
        if (liveTest.ok) {
          consentVerified =
            consentVerified &&
            consent.consentId === liveTest.consentId &&
            consent.email === liveTest.email &&
            consent.referenceId === liveTest.referenceId;
        }
        if (consentVerified) {
          await markConsentPaid(consent.consentId);
        }
      }
    } catch (err) {
      console.error('Lesmateriaal consent lookup failed:', err);
      consentVerified = false;
    }
  }

  // links_retry: behoud eerder vastgelegde consent_verified (true mag niet false worden).
  if (gate.action === 'links_retry' && existingFulfillment) {
    consentVerified = resolveConsentVerifiedForClaim({
      newlyVerified: consentVerified,
      existingVerified: existingFulfillment.consentVerified,
    });
    if (!consentId && existingFulfillment.consentId) {
      consentId = existingFulfillment.consentId;
    }
  }

  if (gate.action === 'sessions_claim' || gate.action === 'links_retry') {
    const consentVerifiedBeforeClaim = consentVerified;
    try {
      const claim = await claimFulfillment({
        stripeSessionId: orderId,
        consentId,
        referenceId,
        email,
        consentVerified,
      });

      if (claim.action === 'skip') {
        processedSessions.add(orderId);
        return NextResponse.json({
          received: true,
          duplicate: true,
          status: claim.row.status,
        });
      }
      // DB en mail: OR van pre-claim + claim.row (dekt race waarbij andere insert false schreef).
      consentVerified = resolveConsentVerifiedForClaim({
        newlyVerified: consentVerifiedBeforeClaim,
        existingVerified: claim.row.consentVerified,
      });
      trackNeonFulfillment = true;
    } catch (err) {
      console.error('Lesmateriaal fulfillment claim failed:', err);
      // Sessions: bestaande foutafhandeling (500 + Stripe retry).
      // Links-retry: ook 500 zodat Stripe opnieuw probeert (rij bestaat al).
      return NextResponse.json({ error: 'Fulfillment claim failed' }, { status: 500 });
    }
  }

  /** Consentbevestiging in mail: Sessions/live-test-verificatie of behouden flag bij links_retry. */
  const includeConsentConfirmation =
    useSessionsNeonFlow || gate.action === 'links_retry' ? consentVerified : false;

  try {
    const result = await sendLesmateriaalFulfillmentEmail({
      order,
      orderId,
      includeConsentConfirmation,
    });
    if (!result.ok) {
      console.error('Lesmateriaal fulfillment mail error:', {
        orderId,
        delivery: 'failed',
        error: result.error,
      });
      if (trackNeonFulfillment) {
        await markFulfillmentMailFailed(orderId, result.error || 'mail_failed');
      }
      return NextResponse.json(
        { error: 'Mail verzenden mislukt', detail: result.error },
        { status: 500 },
      );
    }

    if (result.delivery === 'skipped_preview_guard') {
      if (trackNeonFulfillment) {
        await markFulfillmentMailSkipped(
          orderId,
          result.skipReason || 'skipped_preview_guard',
        );
      }
      processedSessions.add(orderId);
      console.warn('Lesmateriaal fulfillment mail skipped (preview guard):', {
        orderId,
        delivery: 'skipped_preview_guard',
        skipReason: result.skipReason,
        kind: order.kind,
        mode: useSessionsNeonFlow
          ? sessionsMode
            ? 'sessions'
            : 'links_live_test'
          : 'links',
      });
      // Geen fulfilled:true — mail is bewust niet verzonden (preview-guard), geen succesvolle levering.
      return NextResponse.json({
        received: true,
        fulfilled: false,
        mailDelivery: 'skipped_preview_guard',
        consentVerified: includeConsentConfirmation ? consentVerified : undefined,
      });
    }

    if (trackNeonFulfillment) {
      await markFulfillmentMailSent(orderId);
    }
    if (useSessionsNeonFlow && !consentVerified) {
      await alertSupportMissingConsent({
        sessionId: orderId,
        email,
        referenceId: session.client_reference_id,
      });
    }

    processedSessions.add(orderId);
    console.log('Lesmateriaal fulfillment OK:', {
      orderId,
      delivery: 'sent',
      kind: order.kind,
      files: order.assets.length,
      consentVerified: includeConsentConfirmation ? consentVerified : null,
      mode: useSessionsNeonFlow
        ? sessionsMode
          ? 'sessions'
          : 'links_live_test'
        : 'links',
      gate: gate.action,
      liveTest: liveTest.ok,
    });
    return NextResponse.json({
      received: true,
      fulfilled: true,
      mailDelivery: 'sent',
      consentVerified: includeConsentConfirmation ? consentVerified : undefined,
    });
  } catch (err) {
    console.error('Lesmateriaal fulfillment exception:', err);
    if (trackNeonFulfillment) {
      try {
        await markFulfillmentMailFailed(
          orderId,
          err instanceof Error ? err.message : 'exception',
        );
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }
}
