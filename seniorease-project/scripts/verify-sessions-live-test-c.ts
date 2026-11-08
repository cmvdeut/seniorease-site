/**
 * Regressietests variant C: afgeschermde LIVE Checkout Sessions-test terwijl mode=links.
 * Geen echte betalingen, geen Production-env, secrets worden niet gelogd.
 *
 * Run: npx --yes tsx scripts/verify-sessions-live-test-c.ts
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NextRequest } from 'next/server';
import {
  CONSENT_CHECKOUT_SOURCE_NEGATIVE_CACHE_TTL_MS,
  ConsentCheckoutSourceUnavailableError,
  decideWebhookFulfillmentGate,
  hashConsentText,
  insertConsentRecord,
  isConsentCheckoutSourceColumnAvailable,
  resetConsentCheckoutSourceColumnCacheForTests,
  setConsentCheckoutSourceColumnAvailableForTests,
  setConsentCheckoutSourceColumnCacheEntryForTests,
  type ConsentRow,
} from '../lib/lesmateriaal-consent-store';
import { isCheckoutSessionsMode } from '../lib/lesmateriaal-checkout-mode';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
} from '../lib/digital-delivery-consent';
import {
  SESSIONS_LIVE_TEST_COOKIE,
  SESSIONS_LIVE_TEST_DEFAULT_REFERENCE,
  SESSIONS_LIVE_TEST_META,
  SESSIONS_LIVE_TEST_UNLOCK_RATE,
  authorizeSessionsLiveTestUnlock,
  buildSessionsLiveTestStripeMetadata,
  clearSessionsLiveTestUnlockRateLimit,
  createSessionsLiveTestAuthCookieValue,
  getSessionsLiveTestEmail,
  getSessionsLiveTestReferenceId,
  getSessionsLiveTestSecret,
  getSessionsLiveTestUnlockRateLimit,
  isSessionsLiveTestEnabled,
  parseSessionsLiveTestAuthCookie,
  recordSessionsLiveTestUnlockFailure,
  resetSessionsLiveTestUnlockRateLimitForTests,
  resolveLiveTestFromBoundConsent,
  resolveSessionsLiveTestCatalog,
  shouldFailClosedOnLiveTestRecognitionError,
  signSessionsLiveTestCheckout,
  verifySessionsLiveTestCheckoutSignature,
  verifySessionsLiveTestStripeSession,
} from '../lib/lesmateriaal-sessions-live-test';
import {
  buildLesmateriaalCheckoutUrl,
  getLesmateriaalPaymentLinkBase,
} from '../lib/lesmateriaal-checkout';

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed += 1;
      console.log(`PASS  ${name}`);
    })
    .catch((err) => {
      failed += 1;
      console.error(`FAIL  ${name}`);
      console.error(err);
    });
}

const ROOT = join(__dirname, '..');

const ENV_KEYS = [
  'LESMATERIAAL_CHECKOUT_MODE',
  'NEXT_PUBLIC_LESMATERIAAL_CHECKOUT_MODE',
  'LESMATERIAAL_SESSIONS_TEST_SECRET',
  'LESMATERIAAL_SESSIONS_TEST_EMAIL',
  'LESMATERIAAL_SESSIONS_TEST_REFERENCE',
  'STRIPE_SECRET_KEY',
  'DATABASE_URL',
  'NEON_DATABASE_URL',
  'NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS',
] as const;

const envBackup: Record<string, string | undefined> = {};
for (const key of ENV_KEYS) envBackup[key] = process.env[key];

const TEST_SECRET = 'regressie-live-test-secret-min-24-chars!!';
const TEST_EMAIL = 'live-test@example.nl';
const LINK_LOS = 'https://buy.stripe.com/test_los_live_c';

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const v = envBackup[key];
    if (v === undefined) delete process.env[key];
    else process.env[key] = v;
  }
}

function enableLiveTestEnv() {
  delete process.env.LESMATERIAAL_CHECKOUT_MODE;
  delete process.env.NEXT_PUBLIC_LESMATERIAAL_CHECKOUT_MODE;
  process.env.LESMATERIAAL_SESSIONS_TEST_SECRET = TEST_SECRET;
  process.env.LESMATERIAAL_SESSIONS_TEST_EMAIL = TEST_EMAIL;
  delete process.env.LESMATERIAAL_SESSIONS_TEST_REFERENCE;
  process.env.NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS = LINK_LOS;
}

function disableLiveTestEnv() {
  delete process.env.LESMATERIAAL_SESSIONS_TEST_SECRET;
  delete process.env.LESMATERIAAL_SESSIONS_TEST_EMAIL;
  delete process.env.LESMATERIAAL_SESSIONS_TEST_REFERENCE;
}

function sourceOf(rel: string): string {
  return readFileSync(join(ROOT, rel), 'utf8');
}

console.log('=== verify-sessions-live-test-c (mocks only) ===\n');

async function main() {
  enableLiveTestEnv();

  await check('mode blijft links (default) met live-test aan', () => {
    assert.equal(isCheckoutSessionsMode(), false);
    assert.equal(isSessionsLiveTestEnabled(), true);
  });

  await check('vaste reference is los_g1 (€6,95)', () => {
    assert.equal(getSessionsLiveTestReferenceId(), SESSIONS_LIVE_TEST_DEFAULT_REFERENCE);
    const catalog = resolveSessionsLiveTestCatalog();
    assert.ok(catalog);
    assert.equal(catalog!.referenceId, 'los_g1');
    assert.equal(catalog!.amountEur, 6.95);
    assert.equal(catalog!.kind, 'ah_los');
  });

  await check('secret korter dan 24 chars → uitgeschakeld', () => {
    process.env.LESMATERIAAL_SESSIONS_TEST_SECRET = 'te-kort';
    assert.equal(isSessionsLiveTestEnabled(), false);
    assert.equal(getSessionsLiveTestSecret(), null);
    process.env.LESMATERIAAL_SESSIONS_TEST_SECRET = TEST_SECRET;
  });

  await check('uitschakelen: secret weg → enabled false', () => {
    disableLiveTestEnv();
    assert.equal(isSessionsLiveTestEnabled(), false);
    enableLiveTestEnv();
  });

  await check('HMAC sign/verify + timing-safe mismatch', () => {
    const nonce = 'abc123nonce';
    const sig = signSessionsLiveTestCheckout({
      secret: TEST_SECRET,
      consentId: 'c-1',
      email: TEST_EMAIL,
      referenceId: 'los_g1',
      nonce,
    });
    assert.equal(sig.length, 64);
    assert.equal(
      verifySessionsLiveTestCheckoutSignature({
        secret: TEST_SECRET,
        consentId: 'c-1',
        email: TEST_EMAIL,
        referenceId: 'los_g1',
        nonce,
        signature: sig,
      }),
      true,
    );
    assert.equal(
      verifySessionsLiveTestCheckoutSignature({
        secret: TEST_SECRET,
        consentId: 'c-1',
        email: TEST_EMAIL,
        referenceId: 'los_g1',
        nonce,
        signature: '0'.repeat(64),
      }),
      false,
    );
  });

  await check('auth unlock: juiste secret+email ok; verkeerd secret/email geweigerd', () => {
    assert.equal(
      authorizeSessionsLiveTestUnlock({
        providedSecret: TEST_SECRET,
        providedEmail: TEST_EMAIL,
      }).ok,
      true,
    );
    assert.equal(
      authorizeSessionsLiveTestUnlock({
        providedSecret: 'verkeerd-secret-minstens-24-chars!!',
        providedEmail: TEST_EMAIL,
      }).ok,
      false,
    );
    assert.equal(
      authorizeSessionsLiveTestUnlock({
        providedSecret: TEST_SECRET,
        providedEmail: 'ander@example.nl',
      }).ok,
      false,
    );
  });

  await check('auth-cookie: geldig parseert; verlopen/vervalst faalt', () => {
    const { value } = createSessionsLiveTestAuthCookieValue({
      secret: TEST_SECRET,
      email: TEST_EMAIL,
      nowSec: 1_700_000_000,
    });
    assert.equal(
      parseSessionsLiveTestAuthCookie(value, process.env, 1_700_000_100).ok,
      true,
    );
    assert.equal(
      parseSessionsLiveTestAuthCookie(value, process.env, 1_700_000_000 + 3 * 60 * 60).ok,
      false,
    );
    const forged = value.replace(/\.[^.]+$/, '.deadbeef');
    assert.equal(parseSessionsLiveTestAuthCookie(forged, process.env, 1_700_000_100).ok, false);
  });

  await check('Stripe Session verify: echte live-test metadata ok', () => {
    const meta = buildSessionsLiveTestStripeMetadata({
      secret: TEST_SECRET,
      consentId: 'consent-xyz',
      email: TEST_EMAIL,
      referenceId: 'los_g1',
      consentVersion: '2026-11-07-v1',
      consentHash: 'hash',
      buyerType: 'consumer',
    });
    const result = verifySessionsLiveTestStripeSession({
      id: 'cs_live_test_ok',
      client_reference_id: 'los_g1',
      customer_email: TEST_EMAIL,
      customer_details: { email: TEST_EMAIL } as never,
      metadata: meta,
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.consentId, 'consent-xyz');
      assert.equal(result.email, TEST_EMAIL);
      assert.equal(result.referenceId, 'los_g1');
      assert.equal(result.via, 'hmac');
    }
  });

  await check('misbruik: gefaked se_slt zonder geldige HMAC → reject', () => {
    const result = verifySessionsLiveTestStripeSession({
      id: 'cs_live_forged',
      client_reference_id: 'los_g1',
      customer_email: TEST_EMAIL,
      customer_details: { email: TEST_EMAIL } as never,
      metadata: {
        [SESSIONS_LIVE_TEST_META.flag]: '1',
        [SESSIONS_LIVE_TEST_META.nonce]: 'nonce',
        [SESSIONS_LIVE_TEST_META.sig]: 'a'.repeat(64),
        consent_id: 'forged',
        reference_id: 'los_g1',
      },
    });
    assert.equal(result.ok, false);
  });

  await check('misbruik: verkeerde e-mail / verkeerd product → reject', () => {
    const meta = buildSessionsLiveTestStripeMetadata({
      secret: TEST_SECRET,
      consentId: 'c',
      email: TEST_EMAIL,
      referenceId: 'los_g1',
      consentVersion: 'v',
      consentHash: 'h',
      buyerType: 'consumer',
    });
    assert.equal(
      verifySessionsLiveTestStripeSession({
        id: 'cs1',
        client_reference_id: 'los_g1',
        customer_email: 'evil@example.nl',
        customer_details: { email: 'evil@example.nl' } as never,
        metadata: meta,
      }).ok,
      false,
    );
    assert.equal(
      verifySessionsLiveTestStripeSession({
        id: 'cs2',
        client_reference_id: 'pakket_pakket-g',
        customer_email: TEST_EMAIL,
        customer_details: { email: TEST_EMAIL } as never,
        metadata: { ...meta, reference_id: 'pakket_pakket-g' },
      }).ok,
      false,
    );
  });

  await check('Payment Links ongewijzigd in links-modus', () => {
    assert.equal(getLesmateriaalPaymentLinkBase('los', 'g1'), LINK_LOS);
    const url = buildLesmateriaalCheckoutUrl({
      productType: 'los',
      lessonCode: 'G1',
      email: 'koper@example.nl',
      paymentLinkBase: LINK_LOS,
    });
    assert.ok(url?.includes('client_reference_id=los_g1'));
    assert.ok(url?.includes('prefilled_email='));
  });

  await check('webhook gate: links zonder live-test → passthrough (Payment Links)', () => {
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'links',
        neonConfigured: true,
        existing: null,
      }).action,
      'links_passthrough',
    );
  });

  await check('webhook gate: live-test als sessions → claim', () => {
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: null,
      }).action,
      'sessions_claim',
    );
  });

  await check('webhook gate: terminal skip blijft (idempotency / retries)', () => {
    for (const status of ['completed', 'mail_sent', 'mail_skipped'] as const) {
      const gate = decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_x',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status,
          consentVerified: true,
          lastError: null,
        },
      });
      assert.equal(gate.action, 'skip');
    }
  });

  await check('create-checkout blijft 503 in links-modus (publiek)', async () => {
    delete process.env.LESMATERIAAL_CHECKOUT_MODE;
    const { POST } = await import('../app/api/lesmateriaal/create-checkout/route');
    const req = new NextRequest('http://localhost/api/lesmateriaal/create-checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        referenceId: 'los_g1',
        consented: true,
      }),
    });
    const res = await POST(req);
    assert.equal(res.status, 503);
  });

  await check('live-test create zonder cookie → 401', async () => {
    enableLiveTestEnv();
    const { POST } = await import('../app/api/lesmateriaal/create-checkout-live-test/route');
    const req = new NextRequest(
      'http://localhost/api/lesmateriaal/create-checkout-live-test',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ consented: true }),
      },
    );
    const res = await POST(req);
    assert.equal(res.status, 401);
  });

  await check('live-test create met cookie maar zonder Neon → 503', async () => {
    enableLiveTestEnv();
    delete process.env.DATABASE_URL;
    delete process.env.NEON_DATABASE_URL;
    const cookie = createSessionsLiveTestAuthCookieValue({
      secret: TEST_SECRET,
      email: TEST_EMAIL,
    });
    const { POST } = await import('../app/api/lesmateriaal/create-checkout-live-test/route');
    const req = new NextRequest(
      'http://localhost/api/lesmateriaal/create-checkout-live-test',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: `${SESSIONS_LIVE_TEST_COOKIE}=${cookie.value}`,
        },
        body: JSON.stringify({ consented: true }),
      },
    );
    const res = await POST(req);
    assert.equal(res.status, 503);
  });

  await check('live-test create uitgeschakeld → 404', async () => {
    disableLiveTestEnv();
    const { POST } = await import('../app/api/lesmateriaal/create-checkout-live-test/route');
    const req = new NextRequest(
      'http://localhost/api/lesmateriaal/create-checkout-live-test',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ consented: true }),
      },
    );
    const res = await POST(req);
    assert.equal(res.status, 404);
    enableLiveTestEnv();
  });

  await check('auth API: verkeerd secret → 401; uitgeschakeld → 404', async () => {
    enableLiveTestEnv();
    const { POST } = await import('../app/api/lesmateriaal/sessions-live-test/auth/route');
    const bad = await POST(
      new NextRequest('http://localhost/api/lesmateriaal/sessions-live-test/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          secret: 'verkeerd-secret-minstens-24-chars!!',
          email: TEST_EMAIL,
        }),
      }),
    );
    assert.equal(bad.status, 401);

    disableLiveTestEnv();
    const off = await POST(
      new NextRequest('http://localhost/api/lesmateriaal/sessions-live-test/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret: TEST_SECRET, email: TEST_EMAIL }),
      }),
    );
    assert.equal(off.status, 404);
    enableLiveTestEnv();
  });

  await check('auth API: geldige unlock zet httpOnly cookie (geen secret in body)', async () => {
    enableLiveTestEnv();
    const { POST } = await import('../app/api/lesmateriaal/sessions-live-test/auth/route');
    const res = await POST(
      new NextRequest('http://localhost/api/lesmateriaal/sessions-live-test/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret: TEST_SECRET, email: TEST_EMAIL }),
      }),
    );
    assert.equal(res.status, 200);
    const json = (await res.json()) as Record<string, unknown>;
    assert.equal(json.ok, true);
    assert.equal(json.email, TEST_EMAIL);
    assert.equal('secret' in json, false);
    const setCookie = res.headers.get('set-cookie') || '';
    assert.ok(setCookie.includes(SESSIONS_LIVE_TEST_COOKIE));
    assert.ok(/httponly/i.test(setCookie));
    assert.equal(setCookie.includes(TEST_SECRET), false);
  });

  await check('secret-rotatie: HMAC faalt, Neon bound consent blijft herkenbaar', () => {
    const consentText = DIGITAL_CONSENT_CHECKBOX_LABEL;
    const consentVersion = DIGITAL_CONSENT_VERSION;
    const consent: ConsentRow = {
      consentId: '22222222-2222-2222-2222-222222222222',
      createdAt: new Date().toISOString(),
      email: TEST_EMAIL,
      referenceId: 'los_g1',
      productLabel: 'Losse les G1',
      buyerType: 'consumer',
      consentVersion,
      consentText,
      consentTextHash: hashConsentText(consentText, consentVersion),
      stripeSessionId: 'cs_live_after_rotate',
      status: 'bound',
      checkoutSource: 'sessions_live_test',
    };
    const session = {
      id: 'cs_live_after_rotate',
      client_reference_id: 'los_g1',
      customer_email: TEST_EMAIL,
      customer_details: { email: TEST_EMAIL } as never,
      metadata: {
        [SESSIONS_LIVE_TEST_META.flag]: '1',
        consent_id: consent.consentId,
        // oude HMAC onder vorig secret — ongeldig na rotatie
        [SESSIONS_LIVE_TEST_META.nonce]: 'oldnonce',
        [SESSIONS_LIVE_TEST_META.sig]: 'b'.repeat(64),
      },
    };

    process.env.LESMATERIAAL_SESSIONS_TEST_SECRET =
      'nieuw-secret-na-rotatie-min-24-chars!!';
    assert.equal(verifySessionsLiveTestStripeSession(session).ok, false);

    const neon = resolveLiveTestFromBoundConsent(consent, session);
    assert.equal(neon.ok, true);
    if (neon.ok) {
      assert.equal(neon.via, 'neon');
      assert.equal(neon.consentId, consent.consentId);
    }

    // create uit, fulfillment-herkenning blijft
    delete process.env.LESMATERIAAL_SESSIONS_TEST_SECRET;
    assert.equal(isSessionsLiveTestEnabled(), false);
    assert.equal(verifySessionsLiveTestStripeSession(session).ok, false);
    assert.equal(resolveLiveTestFromBoundConsent(consent, session).ok, true);
    process.env.LESMATERIAAL_SESSIONS_TEST_SECRET = TEST_SECRET;
  });

  await check('Neon-pad: geen live-test source → reject (Payment Links veilig)', () => {
    const consentText = DIGITAL_CONSENT_CHECKBOX_LABEL;
    const consentVersion = DIGITAL_CONSENT_VERSION;
    const consent: ConsentRow = {
      consentId: '33333333-3333-3333-3333-333333333333',
      createdAt: new Date().toISOString(),
      email: 'koper@example.nl',
      referenceId: 'los_g1',
      productLabel: 'Losse les G1',
      buyerType: 'consumer',
      consentVersion,
      consentText,
      consentTextHash: hashConsentText(consentText, consentVersion),
      stripeSessionId: 'cs_payment_link',
      status: 'bound',
      checkoutSource: null,
    };
    assert.equal(
      resolveLiveTestFromBoundConsent(consent, {
        id: 'cs_payment_link',
        client_reference_id: 'los_g1',
        customer_email: 'koper@example.nl',
        customer_details: { email: 'koper@example.nl' } as never,
      }).ok,
      false,
    );
  });

  await check('webhook retries: pending/mail_failed blijven retry; terminal skip', () => {
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_retry',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status: 'mail_failed',
          consentVerified: true,
          lastError: 'tmp',
        },
      }).action,
      'sessions_claim',
    );
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'links',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_retry_links',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status: 'pending',
          consentVerified: true,
          lastError: null,
        },
      }).action,
      'links_retry',
    );
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_done',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status: 'mail_sent',
          consentVerified: true,
          lastError: null,
        },
      }).action,
      'skip',
    );
  });

  await check('1) terminal fulfillment + latere lookupfout → skip (geen dubbele mail)', () => {
    for (const status of ['completed', 'mail_sent', 'mail_skipped'] as const) {
      const gate = decideWebhookFulfillmentGate({
        checkoutMode: 'links',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_term',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status,
          consentVerified: true,
          lastError: null,
        },
        lookupFailed: true,
      });
      assert.equal(gate.action, 'skip');
    }
  });

  await check('2) Neon-lookupfout bij live-test Session → fail-closed (geen Payment Links)', () => {
    assert.equal(
      shouldFailClosedOnLiveTestRecognitionError({
        liveTestOk: false,
        liveTestRecognitionFailed: true,
        metadataLiveTestFlag: '1',
      }),
      true,
    );
    assert.equal(
      shouldFailClosedOnLiveTestRecognitionError({
        liveTestOk: false,
        liveTestRecognitionFailed: true,
        metadataLiveTestFlag: undefined,
      }),
      false,
    );
    assert.equal(
      shouldFailClosedOnLiveTestRecognitionError({
        liveTestOk: true,
        liveTestRecognitionFailed: true,
        metadataLiveTestFlag: '1',
      }),
      false,
    );
  });

  await check('3) Payment Links vóór migratie 003: consent insert zonder checkout_source-kolom', () => {
    const store = sourceOf('lib/lesmateriaal-consent-store.ts');
    assert.match(store, /if \(!checkoutSource\)/);
    assert.match(store, /isConsentCheckoutSourceColumnAvailable/);
    assert.match(store, /ConsentCheckoutSourceUnavailableError/);
    // Standaard-pad: INSERT zonder checkout_source-kolom.
    const start = store.indexOf('if (!checkoutSource)');
    const end = store.indexOf('RETURNING *', start);
    assert.ok(start > 0 && end > start);
    const withoutSource = store.slice(start, end);
    assert.doesNotMatch(withoutSource, /checkout_source/);
  });

  await check('sticky false-cache verloopt; true blijft sticky', async () => {
    resetConsentCheckoutSourceColumnCacheForTests();
    setConsentCheckoutSourceColumnCacheEntryForTests({
      value: false,
      expiresAt: 1_000,
    });
    assert.equal(await isConsentCheckoutSourceColumnAvailable(500), false);
    // Na TTL: opnieuw proberen mag herstellen (hier via test-override na expiry).
    assert.equal(await isConsentCheckoutSourceColumnAvailable(1_000), false);
    assert.ok(CONSENT_CHECKOUT_SOURCE_NEGATIVE_CACHE_TTL_MS >= 1_000);
    setConsentCheckoutSourceColumnAvailableForTests(true);
    assert.equal(await isConsentCheckoutSourceColumnAvailable(2_000), true);
    // Sticky true overleeft “latere” clock.
    assert.equal(await isConsentCheckoutSourceColumnAvailable(9_999_999), true);
    resetConsentCheckoutSourceColumnCacheForTests();
  });

  await check('4) LIVE-test zonder migratie 003 → geen Checkout Session', async () => {
    enableLiveTestEnv();
    process.env.DATABASE_URL = 'postgres://example.invalid/db';
    setConsentCheckoutSourceColumnAvailableForTests(false);
    const cookie = createSessionsLiveTestAuthCookieValue({
      secret: TEST_SECRET,
      email: TEST_EMAIL,
    });
    const { POST } = await import('../app/api/lesmateriaal/create-checkout-live-test/route');
    const res = await POST(
      new NextRequest('http://localhost/api/lesmateriaal/create-checkout-live-test', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: `${SESSIONS_LIVE_TEST_COOKIE}=${cookie.value}`,
        },
        body: JSON.stringify({ consented: true }),
      }),
    );
    assert.equal(res.status, 503);
    const json = (await res.json()) as { error?: string };
    assert.match(String(json.error || ''), /migratie|checkout_source/i);
    resetConsentCheckoutSourceColumnCacheForTests();
    delete process.env.DATABASE_URL;
  });

  await check('5) LIVE-test met migratie 003 → insert-pad met checkout_source vereist', async () => {
    // Zonder kolom: fail-closed vóór Neon-connect.
    setConsentCheckoutSourceColumnAvailableForTests(false);
    await assert.rejects(
      () =>
        insertConsentRecord({
          email: TEST_EMAIL,
          referenceId: 'los_g1',
          productLabel: 'Losse les',
          buyerType: 'consumer',
          checkoutSource: 'sessions_live_test',
        }),
      (err: unknown) => err instanceof ConsentCheckoutSourceUnavailableError,
    );

    // Met kolom-cache “aan”: UnavailableError niet meer; daarna Neon-URL vereist.
    setConsentCheckoutSourceColumnAvailableForTests(true);
    delete process.env.DATABASE_URL;
    delete process.env.NEON_DATABASE_URL;
    await assert.rejects(
      () =>
        insertConsentRecord({
          email: TEST_EMAIL,
          referenceId: 'los_g1',
          productLabel: 'Losse les',
          buyerType: 'consumer',
          checkoutSource: 'sessions_live_test',
        }),
      (err: unknown) =>
        err instanceof Error &&
        !(err instanceof ConsentCheckoutSourceUnavailableError) &&
        /DATABASE_URL/i.test(err.message),
    );
    resetConsentCheckoutSourceColumnCacheForTests();

    const live = sourceOf('app/api/lesmateriaal/create-checkout-live-test/route.ts');
    assert.match(live, /isConsentCheckoutSourceColumnAvailable/);
    assert.match(live, /checkoutSource:\s*'sessions_live_test'/);
    assert.match(live, /createLesmateriaalCheckoutSession/);
    // Consent vóór Stripe session create.
    const consentIdx = live.indexOf('insertConsentRecord');
    const stripeIdx = live.indexOf('createLesmateriaalCheckoutSession');
    assert.ok(consentIdx > 0 && stripeIdx > consentIdx);
  });

  await check('6) Webhook-retry na tijdelijke databasefout (sessions/live-test)', () => {
    // Fulfillment lookup failed + live-test herkend → sessions_claim (Stripe mag retryen).
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: null,
        lookupFailed: true,
      }).action,
      'sessions_claim',
    );
    // mail_failed blijft claim/retry-pad.
    assert.equal(
      decideWebhookFulfillmentGate({
        checkoutMode: 'sessions',
        neonConfigured: true,
        existing: {
          stripeSessionId: 'cs_tmp_fail',
          consentId: 'c',
          referenceId: 'los_g1',
          email: TEST_EMAIL,
          status: 'mail_failed',
          consentVerified: true,
          lastError: 'tmp',
        },
        lookupFailed: false,
      }).action,
      'sessions_claim',
    );
    const wh = sourceOf('app/api/stripe-webhook/route.ts');
    assert.match(wh, /Live-test session recognition failed/);
    assert.match(wh, /status: 500/);
  });

  await check('unlock rate-limit: blokkeert na max failures, clear bij succes', () => {
    resetSessionsLiveTestUnlockRateLimitForTests();
    const key = 'ip:1.2.3.4';
    for (let i = 0; i < SESSIONS_LIVE_TEST_UNLOCK_RATE.maxFailures; i += 1) {
      assert.equal(getSessionsLiveTestUnlockRateLimit(key).allowed, true);
      recordSessionsLiveTestUnlockFailure(key);
    }
    const blocked = getSessionsLiveTestUnlockRateLimit(key);
    assert.equal(blocked.allowed, false);
    clearSessionsLiveTestUnlockRateLimit(key);
    assert.equal(getSessionsLiveTestUnlockRateLimit(key).allowed, true);
  });

  await check('bron: publieke create-checkout niet open in links; live-test apart', () => {
    const pub = sourceOf('app/api/lesmateriaal/create-checkout/route.ts');
    assert.match(pub, /isCheckoutSessionsMode/);
    assert.doesNotMatch(pub, /sessions-live-test|SESSIONS_LIVE_TEST/);

    const live = sourceOf('app/api/lesmateriaal/create-checkout-live-test/route.ts');
    assert.match(live, /parseSessionsLiveTestAuthCookie/);
    assert.match(live, /buildSessionsLiveTestStripeMetadata/);
    assert.match(live, /isSessionsLiveTestEnabled/);
    assert.match(live, /checkoutSource:\s*'sessions_live_test'/);

    const wh = sourceOf('app/api/stripe-webhook/route.ts');
    assert.match(wh, /verifySessionsLiveTestStripeSession/);
    assert.match(wh, /resolveLiveTestFromBoundConsent/);
    assert.match(wh, /useSessionsNeonFlow/);

    const mig = sourceOf('db/migrations/003_lesmateriaal_consent_checkout_source.sql');
    assert.match(mig, /checkout_source/);
    assert.match(mig, /sessions_live_test/);
  });

  await check('bron: geen NEXT_PUBLIC live-test secret; robots disallow', () => {
    const lib = sourceOf('lib/lesmateriaal-sessions-live-test.ts');
    assert.doesNotMatch(lib, /NEXT_PUBLIC_.*SESSIONS_TEST/);
    const robots = sourceOf('app/robots.ts');
    assert.match(robots, /\/lesmateriaal\/sessions-live-test/);
  });

  await check('bron: testpagina 404 zonder secret', () => {
    const page = sourceOf('app/lesmateriaal/sessions-live-test/page.tsx');
    assert.match(page, /notFound\(\)/);
    assert.match(page, /isSessionsLiveTestEnabled/);
    assert.doesNotMatch(page, /process\.env\.LESMATERIAAL_SESSIONS_TEST_SECRET/);
  });

  await check('getSessionsLiveTestEmail allowlist', () => {
    assert.equal(getSessionsLiveTestEmail(), TEST_EMAIL);
    process.env.LESMATERIAAL_SESSIONS_TEST_EMAIL = 'geen-at-teken';
    assert.equal(getSessionsLiveTestEmail(), null);
    process.env.LESMATERIAAL_SESSIONS_TEST_EMAIL = TEST_EMAIL;
  });

  restoreEnv();

  console.log(`\n=== Resultaat: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  restoreEnv();
  console.error(err);
  process.exit(1);
});
