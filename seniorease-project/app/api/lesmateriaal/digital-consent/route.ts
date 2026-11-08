import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBrevoApiKeyCandidates } from '@/lib/brevo';
import { COMPANY } from '@/lib/company';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
  STRIPE_CONSENT_META,
  formatConsentAuditLines,
  signConsentRecord,
  type DigitalConsentBuyerType,
} from '@/lib/digital-delivery-consent';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

async function persistConsentOnStripeCustomer(params: {
  email: string;
  consentId: string;
  consentedAt: string;
  referenceId: string;
  buyerType: DigitalConsentBuyerType;
}): Promise<{ ok: boolean; detail: string }> {
  const stripe = getStripe();
  if (!stripe) return { ok: false, detail: 'STRIPE_SECRET_KEY ontbreekt' };

  try {
    const existing = await stripe.customers.list({ email: params.email, limit: 1 });
    const meta = {
      [STRIPE_CONSENT_META.id]: params.consentId,
      [STRIPE_CONSENT_META.at]: params.consentedAt,
      [STRIPE_CONSENT_META.ref]: params.referenceId.slice(0, 500),
      [STRIPE_CONSENT_META.version]: DIGITAL_CONSENT_VERSION,
      [STRIPE_CONSENT_META.buyer]: params.buyerType,
    };

    if (existing.data[0]) {
      await stripe.customers.update(existing.data[0].id, { metadata: meta });
      return { ok: true, detail: `updated:${existing.data[0].id}` };
    }

    const created = await stripe.customers.create({
      email: params.email,
      metadata: meta,
      description: 'SeniorEase lesmateriaal — digitale toestemmingsregistratie',
    });
    return { ok: true, detail: `created:${created.id}` };
  } catch (err) {
    console.error('digital-consent Stripe persist failed:', err);
    return { ok: false, detail: err instanceof Error ? err.message : 'stripe_error' };
  }
}

async function sendConsentAuditEmail(bodyText: string): Promise<boolean> {
  const apiKeys = getBrevoApiKeyCandidates();
  if (apiKeys.length === 0) return false;

  const to = COMPANY.emailSupport;
  const payload = {
    sender: {
      email: process.env.BREVO_SENDER_EMAIL?.trim() || COMPANY.emailGeneral,
      name: process.env.BREVO_SENDER_NAME?.trim() || COMPANY.brandName,
    },
    to: [{ email: to }],
    subject: `[SeniorEase] Digitale levering — toestemming vastgelegd`,
    textContent: bodyText,
  };

  for (const apiKey of apiKeys) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) return true;
    } catch (err) {
      console.error('digital-consent audit mail failed:', err);
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const referenceId = typeof data.referenceId === 'string' ? data.referenceId.trim() : '';
  const productLabel = typeof data.productLabel === 'string' ? data.productLabel.trim() : '';
  const consented = data.consented === true;
  const buyerType: DigitalConsentBuyerType =
    data.buyerType === 'organization' ? 'organization' : 'consumer';

  if (!consented) {
    return NextResponse.json(
      { ok: false, error: 'Toestemming is verplicht voor directe digitale levering.' },
      { status: 400 },
    );
  }
  if (!email.includes('@') || !referenceId || !productLabel) {
    return NextResponse.json({ ok: false, error: 'Onvolledige gegevens' }, { status: 400 });
  }

  const consentedAt = new Date().toISOString();
  let record;
  try {
    record = signConsentRecord({
      email,
      referenceId,
      productLabel,
      buyerType,
      version: DIGITAL_CONSENT_VERSION,
      consentedAt,
      label: DIGITAL_CONSENT_CHECKBOX_LABEL,
    });
  } catch (err) {
    console.error('digital-consent sign failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Toestemming tijdelijk niet beschikbaar' },
      { status: 503 },
    );
  }

  const stripeResult = await persistConsentOnStripeCustomer({
    email,
    consentId: record.consentId,
    consentedAt,
    referenceId,
    buyerType,
  });

  const auditBody = [
    'SeniorEase — auditregistratie digitale leveringstoestemming',
    '',
    formatConsentAuditLines(record),
    '',
    `stripePersist=${stripeResult.ok ? 'ok' : 'fail'} ${stripeResult.detail}`,
    '',
    'Checkbox-tekst:',
    DIGITAL_CONSENT_CHECKBOX_LABEL,
  ].join('\n');

  const mailOk = await sendConsentAuditEmail(auditBody);
  console.info('digital-consent recorded', {
    consentId: record.consentId,
    referenceId,
    buyerType,
    stripe: stripeResult.ok,
    auditMail: mailOk,
  });

  if (!stripeResult.ok && !mailOk) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Toestemming kon niet server-side worden vastgelegd. Probeer het later opnieuw of mail support@seniorease.nl.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    consentId: record.consentId,
    consentedAt: record.consentedAt,
    version: record.version,
    stripePersisted: stripeResult.ok,
    auditMailed: mailOk,
  });
}
