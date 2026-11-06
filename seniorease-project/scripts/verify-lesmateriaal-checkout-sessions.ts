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
  hashConsentText,
  verifyConsentForOrder,
  type ConsentRow,
} from '../lib/lesmateriaal-consent-store';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
} from '../lib/digital-delivery-consent';
import { getLesmateriaalCheckoutMode } from '../lib/lesmateriaal-checkout-mode';
import { LESMATERIAAL_PAKKETTEN } from '../app/lesmateriaal/lesmateriaal-data';
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

check('allowlist: all losse lessen resolve', () => {
  for (const p of LESMATERIAAL_PAKKETTEN) {
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
  assert.doesNotMatch(src, /productLabel.*data\.productLabel/);
});

check('webhook uses claimFulfillment + conditional consent mail', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const src = fs.readFileSync(
    path.join(process.cwd(), 'app/api/stripe-webhook/route.ts'),
    'utf8',
  );
  assert.match(src, /claimFulfillment/);
  assert.match(src, /includeConsentConfirmation: sessionsMode \? consentVerified : false/);
  assert.match(src, /markFulfillmentMailFailed/);
  assert.match(src, /markFulfillmentMailSent/);
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
  assert.match(sql, /consent_verified/);
  assert.doesNotMatch(sql, /redis|kv|blob/i);
});

console.log(`\n=== Resultaat: ${passed} pass, ${failed} fail ===`);
if (failed > 0) process.exit(1);
