import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isNeonConfigured } from '@/lib/db/neon';
import { getStripePriceIdForEntry } from '@/lib/lesmateriaal-checkout-catalog';
import {
  bindConsentToStripeSession,
  insertConsentRecord,
} from '@/lib/lesmateriaal-consent-store';
import { DIGITAL_CONSENT_VERSION } from '@/lib/digital-delivery-consent';
import {
  getLesmateriaalCheckoutPaymentMethodTypes,
  getLesmateriaalCheckoutWalletOptions,
} from '@/lib/lesmateriaal-checkout-payment-methods';
import { getSiteBaseUrl } from '@/lib/site-base-url';
import {
  SESSIONS_LIVE_TEST_COOKIE,
  buildSessionsLiveTestStripeMetadata,
  getSessionsLiveTestSecret,
  isSessionsLiveTestEnabled,
  parseSessionsLiveTestAuthCookie,
  resolveSessionsLiveTestCatalog,
} from '@/lib/lesmateriaal-sessions-live-test';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY ontbreekt');
  return new Stripe(key);
}

/**
 * Afgeschermde Checkout Session voor één vaste losse les (€6,95).
 * Werkt ook terwijl LESMATERIAAL_CHECKOUT_MODE=links.
 * Publieke create-checkout blijft 503 in links-modus.
 */
export async function POST(request: NextRequest) {
  if (!isSessionsLiveTestEnabled()) {
    return NextResponse.json(
      { ok: false, error: 'Live-testvoorziening is uitgeschakeld.' },
      { status: 404 },
    );
  }

  const secret = getSessionsLiveTestSecret();
  const catalog = resolveSessionsLiveTestCatalog();
  if (!secret || !catalog) {
    return NextResponse.json(
      { ok: false, error: 'Live-testvoorziening is niet volledig geconfigureerd.' },
      { status: 503 },
    );
  }

  const auth = parseSessionsLiveTestAuthCookie(
    request.cookies.get(SESSIONS_LIVE_TEST_COOKIE)?.value,
  );
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: 'Niet geautoriseerd voor live-test checkout.' },
      { status: 401 },
    );
  }

  if (!isNeonConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'DATABASE_URL (Neon) ontbreekt' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const consented = data.consented === true;
  const clientVersion =
    typeof data.consentVersion === 'string' ? data.consentVersion.trim() : '';

  // Client mag geen ander product of e-mail forceren.
  if (
    typeof data.referenceId === 'string' &&
    data.referenceId.trim() &&
    data.referenceId.trim() !== catalog.referenceId
  ) {
    return NextResponse.json(
      { ok: false, error: 'Alleen het vaste live-testproduct is toegestaan.' },
      { status: 400 },
    );
  }
  if (
    typeof data.email === 'string' &&
    data.email.trim() &&
    data.email.trim().toLowerCase() !== auth.email
  ) {
    return NextResponse.json(
      { ok: false, error: 'E-mailadres hoort niet bij deze geautoriseerde test.' },
      { status: 400 },
    );
  }

  if (!consented) {
    return NextResponse.json(
      { ok: false, error: 'Toestemming voor directe digitale levering is verplicht.' },
      { status: 400 },
    );
  }
  if (clientVersion && clientVersion !== DIGITAL_CONSENT_VERSION) {
    return NextResponse.json(
      { ok: false, error: 'Ververs de pagina en probeer opnieuw (toestemmingsversie gewijzigd).' },
      { status: 409 },
    );
  }

  const priceId = getStripePriceIdForEntry(catalog);
  if (!priceId) {
    console.error('create-checkout-live-test: price env missing', catalog.priceEnvKey);
    return NextResponse.json(
      { ok: false, error: 'Betaling tijdelijk niet geconfigureerd voor dit product.' },
      { status: 503 },
    );
  }

  const email = auth.email;

  let consent;
  try {
    consent = await insertConsentRecord({
      email,
      referenceId: catalog.referenceId,
      productLabel: catalog.productLabel,
      buyerType: catalog.buyerType,
      checkoutSource: 'sessions_live_test',
    });
  } catch (err) {
    console.error('create-checkout-live-test consent insert failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Toestemming kon niet worden vastgelegd. Probeer het later opnieuw.' },
      { status: 503 },
    );
  }

  const baseUrl = getSiteBaseUrl().replace(/\/$/, '');
  const successUrl = `${baseUrl}/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}/lesmateriaal/sessions-live-test`;

  const metadata = buildSessionsLiveTestStripeMetadata({
    secret,
    consentId: consent.consentId,
    email,
    referenceId: catalog.referenceId,
    consentVersion: consent.consentVersion,
    consentHash: consent.consentTextHash,
    buyerType: catalog.buyerType,
  });

  let session: Stripe.Checkout.Session;
  try {
    const stripe = getStripe();
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      client_reference_id: catalog.referenceId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: getLesmateriaalCheckoutPaymentMethodTypes(),
      wallet_options: getLesmateriaalCheckoutWalletOptions(),
      metadata,
      payment_intent_data: {
        metadata: {
          consent_id: consent.consentId,
          reference_id: catalog.referenceId,
          se_slt: '1',
        },
      },
    });
  } catch (err) {
    console.error('create-checkout-live-test Stripe session failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Stripe-sessie kon niet worden aangemaakt. Probeer het later opnieuw.' },
      { status: 503 },
    );
  }

  if (!session.url || !session.id) {
    return NextResponse.json(
      { ok: false, error: 'Stripe gaf geen betaal-URL terug.' },
      { status: 503 },
    );
  }

  const bound = await bindConsentToStripeSession(consent.consentId, session.id);
  if (!bound) {
    console.error('create-checkout-live-test bind consent failed', {
      consentId: consent.consentId,
      sessionId: session.id,
    });
    try {
      const stripe = getStripe();
      await stripe.checkout.sessions.expire(session.id);
    } catch (expireErr) {
      console.error('create-checkout-live-test expire session failed:', expireErr);
    }
    return NextResponse.json(
      { ok: false, error: 'Toestemming kon niet aan de betaling worden gekoppeld.' },
      { status: 503 },
    );
  }

  console.log('create-checkout-live-test session created', {
    sessionId: session.id,
    referenceId: catalog.referenceId,
    se_slt: true,
  });

  return NextResponse.json({
    ok: true,
    url: session.url,
    sessionId: session.id,
    consentId: consent.consentId,
    referenceId: catalog.referenceId,
  });
}
