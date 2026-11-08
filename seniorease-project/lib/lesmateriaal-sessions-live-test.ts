/**
 * Afgeschermde éénmalige LIVE Checkout Sessions-test (variant C).
 *
 * Nieuwe bestellingen uit: LESMATERIAAL_SESSIONS_TEST_SECRET verwijderen/leeg laten.
 * Bestaande Sessions: webhook herkent via Neon checkout_source + bound stripe_session_id
 * (ook na secret-rotatie). Geen NEXT_PUBLIC_ secrets. Nooit secret/HMAC in logs of URLs.
 */

import { createHmac, timingSafeEqual, randomBytes } from 'crypto';
import type Stripe from 'stripe';
import {
  resolveCheckoutCatalogEntry,
  type CheckoutCatalogEntry,
} from '@/lib/lesmateriaal-checkout-catalog';
import type { ConsentRow } from '@/lib/lesmateriaal-consent-store';
import { verifyConsentForOrder } from '@/lib/lesmateriaal-consent-store';

/** Vaste losse-les reference (€6,95) tenzij env een andere geldige los_* zet. */
export const SESSIONS_LIVE_TEST_DEFAULT_REFERENCE = 'los_g1';

export const SESSIONS_LIVE_TEST_META = {
  flag: 'se_slt',
  nonce: 'se_slt_n',
  sig: 'se_slt_s',
} as const;

export const SESSIONS_LIVE_TEST_COOKIE = 'se_slt_auth';

/** Cookie TTL: 2 uur. */
export const SESSIONS_LIVE_TEST_COOKIE_TTL_SEC = 2 * 60 * 60;

export type SessionsLiveTestEnv = Record<string, string | undefined>;

export function getSessionsLiveTestSecret(
  env: SessionsLiveTestEnv = process.env,
): string | null {
  const raw = env.LESMATERIAAL_SESSIONS_TEST_SECRET?.trim() || '';
  if (raw.length < 24) return null;
  return raw;
}

export function isSessionsLiveTestEnabled(
  env: SessionsLiveTestEnv = process.env,
): boolean {
  return getSessionsLiveTestSecret(env) !== null;
}

export function getSessionsLiveTestEmail(
  env: SessionsLiveTestEnv = process.env,
): string | null {
  const raw = env.LESMATERIAAL_SESSIONS_TEST_EMAIL?.trim().toLowerCase() || '';
  if (!raw.includes('@')) return null;
  return raw;
}

export function getSessionsLiveTestReferenceId(
  env: SessionsLiveTestEnv = process.env,
): string {
  const raw = env.LESMATERIAAL_SESSIONS_TEST_REFERENCE?.trim().toLowerCase();
  if (raw && raw.startsWith('los_')) return raw;
  return SESSIONS_LIVE_TEST_DEFAULT_REFERENCE;
}

export function resolveSessionsLiveTestCatalog(
  env: SessionsLiveTestEnv = process.env,
): CheckoutCatalogEntry | null {
  const entry = resolveCheckoutCatalogEntry(getSessionsLiveTestReferenceId(env));
  if (!entry || entry.kind !== 'ah_los' || entry.amountEur !== 6.95) return null;
  return entry;
}

function hmacHex(secret: string, payload: string): string {
  return createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, 'utf8');
    const bb = Buffer.from(b, 'utf8');
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function safeEqualSecret(provided: string, expected: string): boolean {
  return safeEqualHex(provided.trim(), expected);
}

/** Stripe metadata signature (server-side; niet door client te forgeren zonder secret). */
export function signSessionsLiveTestCheckout(params: {
  secret: string;
  consentId: string;
  email: string;
  referenceId: string;
  nonce: string;
}): string {
  const payload = [
    params.consentId.trim(),
    params.email.trim().toLowerCase(),
    params.referenceId.trim(),
    params.nonce.trim(),
  ].join('\n');
  return hmacHex(params.secret, payload);
}

export function verifySessionsLiveTestCheckoutSignature(params: {
  secret: string;
  consentId: string;
  email: string;
  referenceId: string;
  nonce: string;
  signature: string;
}): boolean {
  const expected = signSessionsLiveTestCheckout(params);
  return safeEqualHex(expected, params.signature.trim());
}

export function createSessionsLiveTestNonce(): string {
  return randomBytes(16).toString('hex');
}

export function buildSessionsLiveTestStripeMetadata(params: {
  secret: string;
  consentId: string;
  email: string;
  referenceId: string;
  consentVersion: string;
  consentHash: string;
  buyerType: string;
}): Record<string, string> {
  const nonce = createSessionsLiveTestNonce();
  const sig = signSessionsLiveTestCheckout({
    secret: params.secret,
    consentId: params.consentId,
    email: params.email,
    referenceId: params.referenceId,
    nonce,
  });
  return {
    consent_id: params.consentId,
    consent_version: params.consentVersion,
    consent_hash: params.consentHash,
    reference_id: params.referenceId,
    buyer_type: params.buyerType,
    [SESSIONS_LIVE_TEST_META.flag]: '1',
    [SESSIONS_LIVE_TEST_META.nonce]: nonce,
    [SESSIONS_LIVE_TEST_META.sig]: sig,
  };
}

export type LiveTestSessionRecognition =
  | { ok: true; email: string; referenceId: string; consentId: string; via: 'hmac' | 'neon' }
  | { ok: false };

function sessionCustomerEmail(
  session: Pick<Stripe.Checkout.Session, 'customer_email' | 'customer_details'>,
): string {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    ''
  )
    .trim()
    .toLowerCase();
}

/**
 * HMAC-pad (alleen terwijl create-secret nog geldig is).
 * Geen vertrouwen op alleen consent_id / se_slt-flag zonder handtekening.
 */
export function verifySessionsLiveTestStripeSession(
  session: Pick<
    Stripe.Checkout.Session,
    'id' | 'client_reference_id' | 'customer_email' | 'customer_details' | 'metadata'
  >,
  env: SessionsLiveTestEnv = process.env,
): LiveTestSessionRecognition {
  const secret = getSessionsLiveTestSecret(env);
  if (!secret) return { ok: false };

  const allowedEmail = getSessionsLiveTestEmail(env);
  const catalog = resolveSessionsLiveTestCatalog(env);
  if (!allowedEmail || !catalog) return { ok: false };

  const meta = session.metadata || {};
  if (meta[SESSIONS_LIVE_TEST_META.flag] !== '1') return { ok: false };

  const consentId = meta.consent_id?.trim() || '';
  const nonce = meta[SESSIONS_LIVE_TEST_META.nonce]?.trim() || '';
  const signature = meta[SESSIONS_LIVE_TEST_META.sig]?.trim() || '';
  const metaRef = meta.reference_id?.trim() || '';
  if (!consentId || !nonce || !signature) return { ok: false };

  const email = sessionCustomerEmail(session);
  if (!email || email !== allowedEmail) return { ok: false };

  const referenceId = (session.client_reference_id || metaRef || '').trim();
  if (referenceId !== catalog.referenceId) return { ok: false };
  if (metaRef && metaRef !== catalog.referenceId) return { ok: false };

  const sigOk = verifySessionsLiveTestCheckoutSignature({
    secret,
    consentId,
    email,
    referenceId: catalog.referenceId,
    nonce,
    signature,
  });
  if (!sigOk) return { ok: false };

  return {
    ok: true,
    email,
    referenceId: catalog.referenceId,
    consentId,
    via: 'hmac',
  };
}

/**
 * Fail-closed: Neon-fout bij live-test-herkenning mag niet stil naar Payment Links.
 * `se_slt` metadata is alleen een hint (geen bewijs); bewijs blijft Neon/HMAC.
 */
export function shouldFailClosedOnLiveTestRecognitionError(params: {
  liveTestOk: boolean;
  liveTestRecognitionFailed: boolean;
  metadataLiveTestFlag?: string | null;
}): boolean {
  return (
    params.liveTestRecognitionFailed &&
    !params.liveTestOk &&
    params.metadataLiveTestFlag === '1'
  );
}

/**
 * Duurzame herkenning na secret-rotatie/uitschakeling.
 * Bewijs = Neon-consent met checkout_source + stripe_session_id-binding,
 * gecontroleerd tegen Stripe Session e-mail/reference (geen client-metadata).
 */
export function resolveLiveTestFromBoundConsent(
  consent: ConsentRow | null,
  session: Pick<
    Stripe.Checkout.Session,
    'id' | 'client_reference_id' | 'customer_email' | 'customer_details'
  >,
): LiveTestSessionRecognition {
  if (!consent || consent.checkoutSource !== 'sessions_live_test') {
    return { ok: false };
  }

  const email = sessionCustomerEmail(session);
  const referenceId = (session.client_reference_id || '').trim();
  if (!email || !referenceId) return { ok: false };

  const catalog = resolveCheckoutCatalogEntry(consent.referenceId);
  if (!catalog || catalog.kind !== 'ah_los' || catalog.amountEur !== 6.95) {
    return { ok: false };
  }
  if (consent.referenceId !== catalog.referenceId) return { ok: false };
  if (referenceId !== consent.referenceId) return { ok: false };

  const verified = verifyConsentForOrder({
    consent,
    email,
    referenceId,
    stripeSessionId: session.id,
  });
  if (!verified) return { ok: false };

  return {
    ok: true,
    email,
    referenceId: consent.referenceId,
    consentId: consent.consentId,
    via: 'neon',
  };
}

/** Eenvoudige in-memory rate-limit voor unlock (best-effort per instance). */
const unlockAttempts = new Map<string, { count: number; resetAt: number }>();

export const SESSIONS_LIVE_TEST_UNLOCK_RATE = {
  maxFailures: 5,
  windowSec: 15 * 60,
} as const;

function unlockRateKey(key: string): string {
  return key.trim().toLowerCase() || 'unknown';
}

export function resetSessionsLiveTestUnlockRateLimitForTests(): void {
  unlockAttempts.clear();
}

export function getSessionsLiveTestUnlockRateLimit(
  key: string,
  nowMs: number = Date.now(),
): { allowed: true } | { allowed: false; retryAfterSec: number } {
  const normalized = unlockRateKey(key);
  const row = unlockAttempts.get(normalized);
  if (!row || row.resetAt <= nowMs) return { allowed: true };
  if (row.count >= SESSIONS_LIVE_TEST_UNLOCK_RATE.maxFailures) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((row.resetAt - nowMs) / 1000)),
    };
  }
  return { allowed: true };
}

export function recordSessionsLiveTestUnlockFailure(
  key: string,
  nowMs: number = Date.now(),
): void {
  const normalized = unlockRateKey(key);
  const windowMs = SESSIONS_LIVE_TEST_UNLOCK_RATE.windowSec * 1000;
  const row = unlockAttempts.get(normalized);
  if (!row || row.resetAt <= nowMs) {
    unlockAttempts.set(normalized, { count: 1, resetAt: nowMs + windowMs });
    return;
  }
  row.count += 1;
}

export function clearSessionsLiveTestUnlockRateLimit(key: string): void {
  unlockAttempts.delete(unlockRateKey(key));
}

function encodeCookieEmail(email: string): string {
  return Buffer.from(email, 'utf8').toString('base64url');
}

function decodeCookieEmail(encoded: string): string | null {
  try {
    const email = Buffer.from(encoded, 'base64url').toString('utf8').trim().toLowerCase();
    return email.includes('@') ? email : null;
  } catch {
    return null;
  }
}

/** Auth-cookie payload (httpOnly). E-mail base64url i.v.m. punten in adressen. */
export function createSessionsLiveTestAuthCookieValue(params: {
  secret: string;
  email: string;
  nowSec?: number;
}): { value: string; maxAge: number } {
  const now = params.nowSec ?? Math.floor(Date.now() / 1000);
  const exp = now + SESSIONS_LIVE_TEST_COOKIE_TTL_SEC;
  const email = params.email.trim().toLowerCase();
  const emailEnc = encodeCookieEmail(email);
  const payload = `v1|${exp}|${email}`;
  const sig = hmacHex(params.secret, payload);
  return {
    value: `v1.${exp}.${emailEnc}.${sig}`,
    maxAge: SESSIONS_LIVE_TEST_COOKIE_TTL_SEC,
  };
}

export function parseSessionsLiveTestAuthCookie(
  raw: string | undefined,
  env: SessionsLiveTestEnv = process.env,
  nowSec?: number,
): { ok: true; email: string } | { ok: false } {
  const secret = getSessionsLiveTestSecret(env);
  const allowed = getSessionsLiveTestEmail(env);
  if (!secret || !allowed || !raw) return { ok: false };

  const parts = raw.split('.');
  if (parts.length !== 4 || parts[0] !== 'v1') return { ok: false };
  const exp = Number(parts[1]);
  const email = decodeCookieEmail(parts[2] || '');
  const sig = parts[3] || '';
  if (!Number.isFinite(exp) || !email || !sig) return { ok: false };

  const now = nowSec ?? Math.floor(Date.now() / 1000);
  if (exp < now) return { ok: false };
  if (email !== allowed) return { ok: false };

  const payload = `v1|${exp}|${email}`;
  const expected = hmacHex(secret, payload);
  if (!safeEqualHex(expected, sig)) return { ok: false };

  return { ok: true, email };
}

export function authorizeSessionsLiveTestUnlock(params: {
  providedSecret: string;
  providedEmail: string;
  env?: SessionsLiveTestEnv;
}): { ok: true; email: string } | { ok: false; error: string } {
  const env = params.env ?? process.env;
  const secret = getSessionsLiveTestSecret(env);
  const allowedEmail = getSessionsLiveTestEmail(env);
  const catalog = resolveSessionsLiveTestCatalog(env);

  if (!secret || !allowedEmail || !catalog) {
    return { ok: false, error: 'Live-testvoorziening is uitgeschakeld.' };
  }

  if (!safeEqualSecret(params.providedSecret, secret)) {
    return { ok: false, error: 'Ongeldige toegangscode.' };
  }

  const email = params.providedEmail.trim().toLowerCase();
  if (email !== allowedEmail) {
    return { ok: false, error: 'E-mailadres hoort niet bij deze testvoorziening.' };
  }

  return { ok: true, email };
}
