import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isNeonConfigured } from '@/lib/db/neon';
import { isCheckoutSessionsMode } from '@/lib/lesmateriaal-checkout-mode';
import {
  claimFulfillment,
  getConsentById,
  getConsentByStripeSessionId,
  markConsentPaid,
  markFulfillmentMailFailed,
  markFulfillmentMailSent,
  verifyConsentForOrder,
} from '@/lib/lesmateriaal-consent-store';
import { resolveOrderFromClientReferenceId } from '@/lib/lesmateriaal-order-resolve';
import { sendLesmateriaalFulfillmentEmail } from '@/lib/lesmateriaal-fulfillment-email';
import { COMPANY } from '@/lib/company';
import { getBrevoApiKeyCandidates } from '@/lib/brevo';

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
      if (response.ok) return;
    } catch (err) {
      console.error('consent-mismatch alert failed:', err);
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

  const sessionsMode = isCheckoutSessionsMode() && isNeonConfigured();

  if (sessionsMode) {
    try {
      let consent = consentId ? await getConsentById(consentId) : null;
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
        if (consentVerified) {
          await markConsentPaid(consent.consentId);
        }
      }
    } catch (err) {
      console.error('Lesmateriaal consent lookup failed:', err);
      consentVerified = false;
    }

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
    } catch (err) {
      console.error('Lesmateriaal fulfillment claim failed:', err);
      return NextResponse.json({ error: 'Fulfillment claim failed' }, { status: 500 });
    }
  }

  try {
    const result = await sendLesmateriaalFulfillmentEmail({
      order,
      orderId,
      includeConsentConfirmation: sessionsMode ? consentVerified : false,
    });
    if (!result.ok) {
      console.error('Lesmateriaal fulfillment mail error:', result.error);
      if (sessionsMode) {
        await markFulfillmentMailFailed(orderId, result.error || 'mail_failed');
      }
      return NextResponse.json(
        { error: 'Mail verzenden mislukt', detail: result.error },
        { status: 500 },
      );
    }

    if (sessionsMode) {
      await markFulfillmentMailSent(orderId);
      if (!consentVerified) {
        await alertSupportMissingConsent({
          sessionId: orderId,
          email,
          referenceId: session.client_reference_id,
        });
      }
    }

    processedSessions.add(orderId);
    console.log('Lesmateriaal fulfillment OK:', {
      orderId,
      email: order.email,
      kind: order.kind,
      files: order.assets.length,
      consentVerified: sessionsMode ? consentVerified : null,
      mode: sessionsMode ? 'sessions' : 'links',
    });
    return NextResponse.json({
      received: true,
      fulfilled: true,
      consentVerified: sessionsMode ? consentVerified : undefined,
    });
  } catch (err) {
    console.error('Lesmateriaal fulfillment exception:', err);
    if (sessionsMode) {
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
