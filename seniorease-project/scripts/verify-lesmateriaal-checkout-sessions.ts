/**
 * Unit/integratie-checks voor Checkout Sessions + Neon consent (zonder live Stripe/Neon).
 * Run: npx --yes tsx scripts/verify-lesmateriaal-checkout-sessions.ts
 */

import assert from 'node:assert/strict';
import {
  resolveCheckoutCatalogEntry,
  type CheckoutCatalogEntry,
} from '../lib/lesmateriaal-checkout-catalog';
import {
  decideWebhookFulfillmentGate,
  hashConsentText,
  isFulfillmentTerminal,
  verifyConsentForOrder,
  type ConsentRow,
  type FulfillmentRow,
} from '../lib/lesmateriaal-consent-store';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
} from '../lib/digital-delivery-consent';
import { getLesmateriaalCheckoutMode } from '../lib/lesmateriaal-checkout-mode';
import {
  evaluateLesmateriaalMailAllowlist,
  isLesmateriaalMailAllowed,
  isPreviewMailGuardActive,
} from '../lib/lesmateriaal-preview-mail-guard';
import {
  getLesmateriaalCheckoutPaymentMethodTypes,
  getLesmateriaalCheckoutWalletOptions,
  LESMATERIAAL_CHECKOUT_BLOCKED_PAYMENT_METHODS,
  LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES,
} from '../lib/lesmateriaal-checkout-payment-methods';
import { getSiteBaseUrl } from '../lib/site-base-url';
import {
  bedanktContentsBullets,
  resolveBedanktContentsKind,
} from '../lib/lesmateriaal-bedankt-contents';
import {
  LESMATERIAAL_PAKKETTEN,
  listRoutablePakketten,
} from '../app/lesmateriaal/lesmateriaal-data';
import { CHATGPT_LESSONS } from '../app/lesmateriaal/chatgpt/chatgpt-data';

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    passed += 1;
    console.log(`PASS  ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}`);
    console.error(err);
  }
}

function makeConsent(overrides: Partial<ConsentRow> = {}): ConsentRow {
  const consentText = DIGITAL_CONSENT_CHECKBOX_LABEL;
  const consentVersion = DIGITAL_CONSENT_VERSION;
  return {
    consentId: '11111111-1111-1111-1111-111111111111',
    createdAt: new Date().toISOString(),
    email: 'koper@example.nl',
    referenceId: 'chatgpt_b_compleet',
    productLabel: 'ChatGPT — Compleet uitlegpakket',
    buyerType: 'consumer',
    consentVersion,
    consentText,
    consentTextHash: hashConsentText(consentText, consentVersion),
    stripeSessionId: 'cs_test_abc',
    status: 'bound',
    ...overrides,
  };
}

console.log('=== verify-lesmateriaal-checkout-sessions ===\n');

check('default checkout mode is links', () => {
  delete process.env.LESMATERIAAL_CHECKOUT_MODE;
  delete process.env.NEXT_PUBLIC_LESMATERIAAL_CHECKOUT_MODE;
  assert.equal(getLesmateriaalCheckoutMode(), 'links');
});

check('sessions mode via LESMATERIAAL_CHECKOUT_MODE', () => {
  process.env.LESMATERIAAL_CHECKOUT_MODE = 'sessions';
  assert.equal(getLesmateriaalCheckoutMode(), 'sessions');
  delete process.env.LESMATERIAAL_CHECKOUT_MODE;
});

check('allowlist: compleet_org is organization', () => {
  const e = resolveCheckoutCatalogEntry('compleet_org');
  assert.ok(e);
  assert.equal(e!.buyerType, 'organization');
  assert.equal(e!.amountEur, 149);
  assert.equal(e!.priceEnvKey, 'STRIPE_PRICE_LESMATERIAAL_COMPLEET');
});

check('allowlist: chatgpt_b_compleet remains consumer', () => {
  const e = resolveCheckoutCatalogEntry('chatgpt_b_compleet');
  assert.ok(e);
  assert.equal(e!.buyerType, 'consumer');
  assert.equal(e!.amountEur, 49.95);
  assert.equal(e!.kind, 'chatgpt_compleet');
});

check('allowlist: chatgpt_c_organisatie is organization', () => {
  const e = resolveCheckoutCatalogEntry('chatgpt_c_organisatie');
  assert.ok(e);
  assert.equal(e!.buyerType, 'organization');
  assert.equal(e!.amountEur, 149);
});

check('allowlist: all A–H pakketten resolve', () => {
  for (const p of LESMATERIAAL_PAKKETTEN) {
    const e = resolveCheckoutCatalogEntry(`pakket_${p.slug}`);
    assert.ok(e, `missing pakket_${p.slug}`);
    assert.equal(e!.buyerType, 'consumer');
    assert.equal(e!.amountEur, 19.95);
  }
});

check('allowlist: all routable pakketten (incl. legacy) resolve', () => {
  for (const p of listRoutablePakketten()) {
    const e = resolveCheckoutCatalogEntry(`pakket_${p.slug}`);
    assert.ok(e, `missing pakket_${p.slug}`);
    assert.equal(e!.amountEur, 19.95);
    assert.ok(p.lessons.length >= 1, `geen lessen op ${p.slug}`);
  }
});

check('allowlist: all losse lessen resolve', () => {
  for (const p of listRoutablePakketten()) {
    for (const les of p.lessons) {
      const e = resolveCheckoutCatalogEntry(`los_${les.code.toLowerCase()}`);
      assert.ok(e, `missing los_${les.code}`);
      assert.equal(e!.amountEur, 6.95);
    }
  }
});

check('allowlist: all chatgpt_a1..a8 resolve as consumer', () => {
  for (const les of CHATGPT_LESSONS) {
    const e = resolveCheckoutCatalogEntry(les.referenceId);
    assert.ok(e, `missing ${les.referenceId}`);
    assert.equal(e!.buyerType, 'consumer');
    assert.equal(e!.amountEur, 9.95);
  }
});

check('allowlist: unknown reference fails closed', () => {
  assert.equal(resolveCheckoutCatalogEntry('pakket_niet-bestaand'), null);
  assert.equal(resolveCheckoutCatalogEntry('los_xx99'), null);
  assert.equal(resolveCheckoutCatalogEntry('chatgpt_a9'), null);
  assert.equal(resolveCheckoutCatalogEntry(''), null);
  assert.equal(resolveCheckoutCatalogEntry('evil;drop'), null);
});

check('catalog ignores browser-spoofable fields (only referenceId matters)', () => {
  const e = resolveCheckoutCatalogEntry('chatgpt_b_compleet') as CheckoutCatalogEntry;
  assert.equal(e.productLabel.includes('Compleet'), true);
  assert.notEqual(e.buyerType, 'organization');
});

check('verifyConsentForOrder: happy path', () => {
  const consent = makeConsent();
  assert.equal(
    verifyConsentForOrder({
      consent,
      email: 'koper@example.nl',
      referenceId: 'chatgpt_b_compleet',
      stripeSessionId: 'cs_test_abc',
    }),
    true,
  );
});

check('verifyConsentForOrder: rejects email mismatch', () => {
  const consent = makeConsent();
  assert.equal(
    verifyConsentForOrder({
      consent,
      email: 'andere@example.nl',
      referenceId: 'chatgpt_b_compleet',
      stripeSessionId: 'cs_test_abc',
    }),
    false,
  );
});

check('verifyConsentForOrder: rejects reference mismatch', () => {
  const consent = makeConsent();
  assert.equal(
    verifyConsentForOrder({
      consent,
      email: 'koper@example.nl',
      referenceId: 'chatgpt_a1',
      stripeSessionId: 'cs_test_abc',
    }),
    false,
  );
});

check('verifyConsentForOrder: rejects session mismatch', () => {
  const consent = makeConsent();
  assert.equal(
    verifyConsentForOrder({
      consent,
      email: 'koper@example.nl',
      referenceId: 'chatgpt_b_compleet',
      stripeSessionId: 'cs_test_other',
    }),
    false,
  );
});

check('verifyConsentForOrder: rejects tampered hash', () => {
  const consent = makeConsent({ consentTextHash: 'deadbeef' });
  assert.equal(
    verifyConsentForOrder({
      consent,
      email: 'koper@example.nl',
      referenceId: 'chatgpt_b_compleet',
      stripeSessionId: 'cs_test_abc',
    }),
    false,
  );
});

check('hashConsentText is stable for same text+version', () => {
  const a = hashConsentText(DIGITAL_CONSENT_CHECKBOX_LABEL, DIGITAL_CONSENT_VERSION);
  const b = hashConsentText(DIGITAL_CONSENT_CHECKBOX_LABEL, DIGITAL_CONSENT_VERSION);
  assert.equal(a, b);
  assert.equal(a.length, 64);
});

check('create-checkout route exists and gates on sessions mode', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const routePath = path.join(
    process.cwd(),
    'app/api/lesmateriaal/create-checkout/route.ts',
  );
  const src = fs.readFileSync(routePath, 'utf8');
  assert.match(src, /isCheckoutSessionsMode/);
  assert.match(src, /insertConsentRecord/);
  assert.match(src, /automatic_tax|Geen automatic_tax/);
  assert.match(src, /bindConsentToStripeSession/);
  assert.match(src, /payment_method_types:\s*getLesmateriaalCheckoutPaymentMethodTypes\(\)/);
  assert.match(src, /wallet_options:\s*getLesmateriaalCheckoutWalletOptions\(\)/);
  assert.doesNotMatch(src, /productLabel.*data\.productLabel/);
});

check('checkout payment methods allowlist is explicit and excludes blocked', () => {
  const allowed = getLesmateriaalCheckoutPaymentMethodTypes();
  assert.deepEqual(allowed, [...LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES]);
  assert.ok(allowed.includes('card'));
  assert.ok(allowed.includes('ideal'));
  assert.ok(allowed.includes('wero'));
  assert.ok(allowed.includes('bancontact'));
  assert.ok(allowed.includes('paypal'));
  for (const blocked of LESMATERIAAL_CHECKOUT_BLOCKED_PAYMENT_METHODS) {
    assert.equal(
      allowed.includes(blocked as (typeof allowed)[number]),
      false,
      `blocked method leaked into allowlist: ${blocked}`,
    );
  }
  assert.deepEqual(getLesmateriaalCheckoutWalletOptions(), {
    link: { display: 'never' },
  });
});

function makeFulfillment(status: FulfillmentRow['status']): FulfillmentRow {
  return {
    stripeSessionId: 'cs_test_idempotency',
    consentId: null,
    referenceId: 'pakket_pakket-g',
    email: 'koper@example.nl',
    status,
    consentVerified: true,
    lastError: null,
  };
}

check('fulfillment terminal statuses include completed/mail_sent/mail_skipped', () => {
  assert.equal(isFulfillmentTerminal('completed'), true);
  assert.equal(isFulfillmentTerminal('mail_sent'), true);
  assert.equal(isFulfillmentTerminal('mail_skipped'), true);
  assert.equal(isFulfillmentTerminal('pending'), false);
  assert.equal(isFulfillmentTerminal('mail_failed'), false);
});

check('gate: links + no Neon row → passthrough (Payment Links niet geblokkeerd)', () => {
  const gate = decideWebhookFulfillmentGate({
    checkoutMode: 'links',
    neonConfigured: true,
    existing: null,
  });
  assert.equal(gate.action, 'links_passthrough');
});

check('gate: links + terminal row → skip (idempotency na rollback)', () => {
  for (const status of ['completed', 'mail_sent', 'mail_skipped'] as const) {
    const gate = decideWebhookFulfillmentGate({
      checkoutMode: 'links',
      neonConfigured: true,
      existing: makeFulfillment(status),
    });
    assert.equal(gate.action, 'skip');
    if (gate.action === 'skip') assert.equal(gate.status, status);
  }
});

check('gate: links + pending/mail_failed → retry', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'links',
      neonConfigured: true,
      existing: makeFulfillment('pending'),
    }).action,
    'links_retry',
  );
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'links',
      neonConfigured: true,
      existing: makeFulfillment('mail_failed'),
    }).action,
    'links_retry',
  );
});

check('gate: sessions + no row → sessions_claim (nieuwe Neon-rij toegestaan)', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'sessions',
      neonConfigured: true,
      existing: null,
    }).action,
    'sessions_claim',
  );
});

check('gate: sessions + terminal → skip', () => {
  const gate = decideWebhookFulfillmentGate({
    checkoutMode: 'sessions',
    neonConfigured: true,
    existing: makeFulfillment('completed'),
  });
  assert.equal(gate.action, 'skip');
});

check('gate: sessions + mail_failed → sessions_claim (retry via claim)', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'sessions',
      neonConfigured: true,
      existing: makeFulfillment('mail_failed'),
    }).action,
    'sessions_claim',
  );
});

check('gate: Neon lookup failed in links → passthrough + documenteer risico', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'links',
      neonConfigured: true,
      existing: null,
      lookupFailed: true,
    }).action,
    'links_lookup_failed',
  );
});

check('gate: Neon lookup failed in sessions → sessions_claim (bestaande 500-pad)', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'sessions',
      neonConfigured: true,
      existing: null,
      lookupFailed: true,
    }).action,
    'sessions_claim',
  );
});

check('gate: Neon niet geconfigureerd → passthrough', () => {
  assert.equal(
    decideWebhookFulfillmentGate({
      checkoutMode: 'sessions',
      neonConfigured: false,
      existing: null,
    }).action,
    'links_passthrough',
  );
});

check('webhook uses claimFulfillment + conditional consent mail', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const src = fs.readFileSync(
    path.join(process.cwd(), 'app/api/stripe-webhook/route.ts'),
    'utf8',
  );
  assert.match(src, /claimFulfillment/);
  assert.match(src, /decideWebhookFulfillmentGate/);
  assert.match(src, /getFulfillmentByStripeSessionId/);
  assert.match(src, /includeConsentConfirmation: sessionsMode \? consentVerified : false/);
  assert.match(src, /markFulfillmentMailFailed/);
  assert.match(src, /markFulfillmentMailSent/);
  assert.match(src, /markFulfillmentMailSkipped/);
  assert.match(src, /skipped_preview_guard/);
  assert.match(src, /Idempotency niet gegarandeerd tijdens Neon-storing in links-modus/);
  // Terminal skip must not be gated only on sessionsMode
  assert.match(src, /gate\.action === 'skip'/);
  assert.match(src, /gate\.action === 'sessions_claim' \|\| gate\.action === 'links_retry'/);
  const skipResponse = src.match(
    /if \(result\.delivery === 'skipped_preview_guard'\) \{[\s\S]*?return NextResponse\.json\(\{([\s\S]*?)\}\);/,
  );
  assert.ok(skipResponse, 'missing skipped_preview_guard response block');
  assert.match(skipResponse[1], /fulfilled:\s*false/);
  assert.doesNotMatch(skipResponse[1], /fulfilled:\s*true/);
});

check('next.config keeps private downloads out of default function tracing', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const src = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8');
  assert.match(src, /outputFileTracingExcludes/);
  assert.match(src, /\.\/private\/\*\*/);
  assert.match(src, /outputFileTracingIncludes/);
  assert.match(src, /\/api\/lesmateriaal\/download/);
  assert.match(src, /\/api\/lesmateriaal\/chatgpt-download/);
});

check('preview site base URL uses VERCEL_URL, not production host', () => {
  assert.equal(
    getSiteBaseUrl({
      VERCEL_ENV: 'preview',
      VERCEL_URL: 'seniorease-site-git-legal-eas.vercel.app',
      NEXT_PUBLIC_SITE_URL: 'https://www.seniorease.nl',
    }),
    'https://seniorease-site-git-legal-eas.vercel.app',
  );
  assert.equal(
    getSiteBaseUrl({
      VERCEL_ENV: 'preview',
      VERCEL_URL: 'https://branch.vercel.app/',
    }),
    'https://branch.vercel.app',
  );
});

check('production site base URL keeps configured/fallback host', () => {
  assert.equal(
    getSiteBaseUrl({
      VERCEL_ENV: 'production',
      VERCEL_URL: 'should-not-use.vercel.app',
      NEXT_PUBLIC_SITE_URL: 'https://www.seniorease.nl',
    }),
    'https://www.seniorease.nl',
  );
  assert.equal(
    getSiteBaseUrl({
      SITE_URL: 'https://www.seniorease.nl/',
    }),
    'https://www.seniorease.nl',
  );
  assert.equal(getSiteBaseUrl({}), 'https://www.seniorease.nl');
});

check('bedankt contents: missing order does not default to pakket', () => {
  assert.equal(
    resolveBedanktContentsKind({
      orderStatus: 'error',
      orderKind: null,
      localProductType: null,
    }),
    'unknown',
  );
  const unknownBullets = bedanktContentsBullets('unknown');
  assert.equal(unknownBullets.some((b) => /4 lessen/i.test(b)), false);
});

check('bedankt contents: losse les uses lesson label only', () => {
  assert.equal(
    resolveBedanktContentsKind({
      orderKind: 'los',
      localProductType: 'pakket',
    }),
    'los',
  );
  assert.equal(
    resolveBedanktContentsKind({
      orderStatus: 'error',
      localProductType: 'los',
    }),
    'los',
  );
  const bullets = bedanktContentsBullets('los', {
    lessonLabel: 'Losse les A1: Ik ken mijn telefoon',
  });
  assert.equal(bullets.some((b) => /4 lessen/i.test(b)), false);
  assert.equal(
    bullets.some((b) => /Losse les A1: Ik ken mijn telefoon/.test(b)),
    true,
  );
  assert.equal(bullets.some((b) => /één lesmiddag/.test(b)), true);
});

check('Neon migration has unique session + fulfillment statuses', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const sql = fs.readFileSync(
    path.join(process.cwd(), 'db/migrations/001_lesmateriaal_checkout.sql'),
    'utf8',
  );
  assert.match(sql, /stripe_session_id TEXT UNIQUE/);
  assert.match(sql, /lesmateriaal_fulfillments/);
  assert.match(sql, /mail_failed/);
  assert.match(sql, /mail_skipped/);
  assert.match(sql, /consent_verified/);
  assert.doesNotMatch(sql, /redis|kv|blob/i);
});

check('migration 002 adds mail_skipped status', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const sql = fs.readFileSync(
    path.join(process.cwd(), 'db/migrations/002_lesmateriaal_fulfillment_mail_skipped.sql'),
    'utf8',
  );
  assert.match(sql, /mail_skipped/);
});

check('preview mail guard inactive in production', () => {
  const env = {
    VERCEL_ENV: 'production',
    LESMATERIAAL_TEST_EMAIL: 'test@seniorease.nl',
  };
  assert.equal(isPreviewMailGuardActive(env), false);
  assert.equal(isLesmateriaalMailAllowed('klant@example.nl', env), true);
  assert.equal(evaluateLesmateriaalMailAllowlist('klant@example.nl', env).reason, 'guard_inactive');
});

check('preview mail guard inactive when VERCEL_ENV unset', () => {
  const env = {
    LESMATERIAAL_TEST_EMAIL: 'test@seniorease.nl',
  };
  assert.equal(isPreviewMailGuardActive(env), false);
  assert.equal(isLesmateriaalMailAllowed('andere@example.nl', env), true);
});

check('preview allowlist allows exact test email', () => {
  const env = {
    VERCEL_ENV: 'preview',
    LESMATERIAAL_TEST_EMAIL: 'Test@Seniorease.nl',
  };
  assert.equal(isPreviewMailGuardActive(env), true);
  assert.equal(isLesmateriaalMailAllowed('test@seniorease.nl', env), true);
  assert.equal(
    evaluateLesmateriaalMailAllowlist('test@seniorease.nl', env).reason,
    'allowlist_match',
  );
});

check('preview allowlist blocks other recipients', () => {
  const env = {
    VERCEL_ENV: 'preview',
    LESMATERIAAL_TEST_EMAIL: 'test@seniorease.nl',
  };
  assert.equal(isLesmateriaalMailAllowed('klant@example.nl', env), false);
  assert.equal(
    evaluateLesmateriaalMailAllowlist('klant@example.nl', env).reason,
    'preview_recipient_not_allowlisted',
  );
});

check('preview blocks all mail when LESMATERIAAL_TEST_EMAIL missing', () => {
  const env = { VERCEL_ENV: 'preview' };
  assert.equal(isLesmateriaalMailAllowed('test@seniorease.nl', env), false);
  assert.equal(
    evaluateLesmateriaalMailAllowlist('test@seniorease.nl', env).reason,
    'preview_missing_test_email',
  );
});

console.log(`\n=== Resultaat: ${passed} pass, ${failed} fail ===`);
if (failed > 0) process.exit(1);
