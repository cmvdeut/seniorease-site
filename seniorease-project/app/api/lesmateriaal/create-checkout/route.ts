import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isNeonConfigured } from '@/lib/db/neon';
import {
  getStripePriceIdForEntry,
  resolveCheckoutCatalogEntry,
} from '@/lib/lesmateriaal-checkout-catalog';
import { isCheckoutSessionsMode } from '@/lib/lesmateriaal-checkout-mode';
import {
  bindConsentToStripeSession,
  insertConsentRecord,
} from '@/lib/lesmateriaal-consent-store';
import {
  DIGITAL_CONSENT_VERSION,
} from '@/lib/digital-delivery-consent';
import { createLesmateriaalCheckoutSession } from '@/lib/lesmateriaal-checkout-payment-methods';
import { getSiteBaseUrl } from '@/lib/site-base-url';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error('STRIPE_SECRET_KEY ontbreekt');
  return new Stripe(key);
}

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const at = trimmed.indexOf('@');
  if (at <= 0) return false;
  const domain = trimmed.slice(at + 1);
  return Boolean(domain && domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.'));
}

/**
 * Maakt consent + Stripe Checkout Session.
 * Geen sessie als consentregistratie mislukt.
 * Alleen actief als LESMATERIAAL_CHECKOUT_MODE=sessions.
 */
export async function POST(request: NextRequest) {
  if (!isCheckoutSessionsMode()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Checkout Sessions zijn nog niet geactiveerd (LESMATERIAAL_CHECKOUT_MODE).',
      },
      { status: 503 },
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
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const referenceId = typeof data.referenceId === 'string' ? data.referenceId.trim() : '';
  const consented = data.consented === true;
  const clientVersion =
    typeof data.consentVersion === 'string' ? data.consentVersion.trim() : '';

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
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Ongeldig e-mailadres' }, { status: 400 });
  }

  const catalog = resolveCheckoutCatalogEntry(referenceId);
  if (!catalog) {
    return NextResponse.json({ ok: false, error: 'Onbekend product' }, { status: 400 });
  }

  const priceId = getStripePriceIdForEntry(catalog);
  if (!priceId) {
    console.error('create-checkout: price env missing', catalog.priceEnvKey);
    return NextResponse.json(
      { ok: false, error: 'Betaling tijdelijk niet geconfigureerd voor dit product.' },
      { status: 503 },
    );
  }

  let consent;
  try {
    consent = await insertConsentRecord({
      email,
      referenceId: catalog.referenceId,
      productLabel: catalog.productLabel,
      buyerType: catalog.buyerType,
    });
  } catch (err) {
    console.error('create-checkout consent insert failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Toestemming kon niet worden vastgelegd. Probeer het later opnieuw.' },
      { status: 503 },
    );
  }

  const baseUrl = getSiteBaseUrl().replace(/\/$/, '');
  const successUrl = `${baseUrl}/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl =
    catalog.kind.startsWith('chatgpt')
      ? `${baseUrl}/lesmateriaal/chatgpt`
      : `${baseUrl}/lesmateriaal`;

  let session: Stripe.Checkout.Session;
  try {
    const stripe = getStripe();
    // Allowlist + Wero-fallback zitten in createLesmateriaalCheckoutSession.
    session = await createLesmateriaalCheckoutSession(stripe, {
      mode: 'payment',
      customer_email: email,
      client_reference_id: catalog.referenceId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Geen automatic_tax / Stripe Tax
      metadata: {
        consent_id: consent.consentId,
        consent_version: consent.consentVersion,
        consent_hash: consent.consentTextHash,
        reference_id: catalog.referenceId,
        buyer_type: catalog.buyerType,
      },
      payment_intent_data: {
        metadata: {
          consent_id: consent.consentId,
          reference_id: catalog.referenceId,
        },
      },
    });
  } catch (err) {
    console.error('create-checkout Stripe session failed:', err);
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
    console.error('create-checkout bind consent failed', {
      consentId: consent.consentId,
      sessionId: session.id,
    });
    try {
      const stripe = getStripe();
      await stripe.checkout.sessions.expire(session.id);
    } catch (expireErr) {
      console.error('create-checkout expire session failed:', expireErr);
    }
    return NextResponse.json(
      { ok: false, error: 'Toestemming kon niet aan de betaling worden gekoppeld.' },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    url: session.url,
    sessionId: session.id,
    consentId: consent.consentId,
    referenceId: catalog.referenceId,
  });
}
