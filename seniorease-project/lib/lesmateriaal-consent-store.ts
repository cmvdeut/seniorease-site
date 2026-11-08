import { randomUUID, createHash } from 'crypto';
import { getNeonSql } from '@/lib/db/neon';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
} from '@/lib/digital-delivery-consent-text';
import type { CatalogBuyerType } from '@/lib/lesmateriaal-checkout-catalog';

export type ConsentStatus = 'pending' | 'bound' | 'paid' | 'orphan';
export type ConsentCheckoutSource = 'sessions_live_test';
export type FulfillmentStatus =
  | 'pending'
  | 'mail_sent'
  | 'mail_failed'
  | 'mail_skipped'
  | 'completed';

export type ConsentRow = {
  consentId: string;
  createdAt: string;
  email: string;
  referenceId: string;
  productLabel: string;
  buyerType: CatalogBuyerType;
  consentVersion: string;
  consentText: string;
  consentTextHash: string;
  stripeSessionId: string | null;
  status: ConsentStatus;
  /** Alleen gezet door afgeschermde live-test create; webhook-bewijs na secret-rotatie. */
  checkoutSource: ConsentCheckoutSource | null;
};

export type FulfillmentRow = {
  stripeSessionId: string;
  consentId: string | null;
  referenceId: string;
  email: string;
  status: FulfillmentStatus;
  consentVerified: boolean;
  lastError: string | null;
};

function hashConsentText(text: string, version: string): string {
  return createHash('sha256').update(`${version}\n${text}`, 'utf8').digest('hex');
}

function mapConsent(row: Record<string, unknown>): ConsentRow {
  const sourceRaw = row.checkout_source ? String(row.checkout_source) : '';
  return {
    consentId: String(row.consent_id),
    createdAt: new Date(String(row.created_at)).toISOString(),
    email: String(row.email),
    referenceId: String(row.reference_id),
    productLabel: String(row.product_label),
    buyerType: row.buyer_type === 'organization' ? 'organization' : 'consumer',
    consentVersion: String(row.consent_version),
    consentText: String(row.consent_text),
    consentTextHash: String(row.consent_text_hash),
    stripeSessionId: row.stripe_session_id ? String(row.stripe_session_id) : null,
    status: String(row.status) as ConsentStatus,
    checkoutSource: sourceRaw === 'sessions_live_test' ? 'sessions_live_test' : null,
  };
}

/**
 * Probe-cache voor migratie 003.
 * - `true` mag sticky blijven (kolom verdwijnt niet in een running process).
 * - `false` / probe-fouten krijgen een korte TTL, anders blijft live-test 503
 *   na een tijdelijke Neon-fout of een probe vóór migratie.
 */
export const CONSENT_CHECKOUT_SOURCE_NEGATIVE_CACHE_TTL_MS = 30_000;

type CheckoutSourceColumnCache = {
  value: boolean;
  /** null = niet verlopen (alleen voor sticky true of test-overrides). */
  expiresAt: number | null;
};

let checkoutSourceColumnCache: CheckoutSourceColumnCache | null = null;

export function resetConsentCheckoutSourceColumnCacheForTests(): void {
  checkoutSourceColumnCache = null;
}

/** Test helper: forceer cache zonder Neon-query (sticky tot reset). */
export function setConsentCheckoutSourceColumnAvailableForTests(
  value: boolean | null,
): void {
  checkoutSourceColumnCache =
    value === null ? null : { value, expiresAt: null };
}

/** Test helper: zet cache-entry inclusief TTL (productiegedrag nabootsen). */
export function setConsentCheckoutSourceColumnCacheEntryForTests(
  entry: CheckoutSourceColumnCache | null,
): void {
  checkoutSourceColumnCache = entry;
}

export class ConsentCheckoutSourceUnavailableError extends Error {
  readonly code = 'CHECKOUT_SOURCE_UNAVAILABLE';

  constructor(message = 'checkout_source kolom ontbreekt (migratie 003)') {
    super(message);
    this.name = 'ConsentCheckoutSourceUnavailableError';
  }
}

function readCheckoutSourceColumnCache(nowMs: number): boolean | null {
  if (!checkoutSourceColumnCache) return null;
  if (
    checkoutSourceColumnCache.expiresAt !== null &&
    checkoutSourceColumnCache.expiresAt <= nowMs
  ) {
    checkoutSourceColumnCache = null;
    return null;
  }
  return checkoutSourceColumnCache.value;
}

/**
 * Of lesmateriaal_consents.checkout_source bestaat (migratie 003).
 * Fail-closed per request bij probe-fout; negatieve uitkomst is niet sticky.
 */
export async function isConsentCheckoutSourceColumnAvailable(
  nowMs: number = Date.now(),
): Promise<boolean> {
  const cached = readCheckoutSourceColumnCache(nowMs);
  if (cached !== null) return cached;

  try {
    const sql = getNeonSql();
    const rows = await sql`
      SELECT 1 AS ok
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'lesmateriaal_consents'
        AND column_name = 'checkout_source'
      LIMIT 1
    `;
    const available = Boolean(rows[0]);
    checkoutSourceColumnCache = available
      ? { value: true, expiresAt: null }
      : {
          value: false,
          expiresAt: nowMs + CONSENT_CHECKOUT_SOURCE_NEGATIVE_CACHE_TTL_MS,
        };
    return available;
  } catch {
    // Transient Neon/probe-fout: deze request fail-closed, cache niet permanent.
    checkoutSourceColumnCache = {
      value: false,
      expiresAt: nowMs + CONSENT_CHECKOUT_SOURCE_NEGATIVE_CACHE_TTL_MS,
    };
    return false;
  }
}

export async function insertConsentRecord(params: {
  email: string;
  referenceId: string;
  productLabel: string;
  buyerType: CatalogBuyerType;
  checkoutSource?: ConsentCheckoutSource | null;
}): Promise<ConsentRow> {
  const consentId = randomUUID();
  const consentText = DIGITAL_CONSENT_CHECKBOX_LABEL;
  const consentVersion = DIGITAL_CONSENT_VERSION;
  const consentTextHash = hashConsentText(consentText, consentVersion);
  const email = params.email.trim().toLowerCase();
  const checkoutSource = params.checkoutSource ?? null;

  // Live-test marker: kolom-check vóór Neon-connect (fail-closed zonder migratie 003).
  if (checkoutSource && !(await isConsentCheckoutSourceColumnAvailable())) {
    throw new ConsentCheckoutSourceUnavailableError();
  }

  const sql = getNeonSql();

  // Zonder checkoutSource: geen nieuwe kolom in INSERT → werkt vóór én na migratie 003.
  if (!checkoutSource) {
    const rows = await sql`
      INSERT INTO lesmateriaal_consents (
        consent_id, email, reference_id, product_label, buyer_type,
        consent_version, consent_text, consent_text_hash, status
      ) VALUES (
        ${consentId}, ${email}, ${params.referenceId}, ${params.productLabel}, ${params.buyerType},
        ${consentVersion}, ${consentText}, ${consentTextHash}, 'pending'
      )
      RETURNING *
    `;
    const row = rows[0];
    if (!row) throw new Error('Consent insert mislukt');
    return mapConsent(row as Record<string, unknown>);
  }

  const rows = await sql`
    INSERT INTO lesmateriaal_consents (
      consent_id, email, reference_id, product_label, buyer_type,
      consent_version, consent_text, consent_text_hash, status, checkout_source
    ) VALUES (
      ${consentId}, ${email}, ${params.referenceId}, ${params.productLabel}, ${params.buyerType},
      ${consentVersion}, ${consentText}, ${consentTextHash}, 'pending', ${checkoutSource}
    )
    RETURNING *
  `;
  const row = rows[0];
  if (!row) throw new Error('Consent insert mislukt');
  return mapConsent(row as Record<string, unknown>);
}

export async function bindConsentToStripeSession(
  consentId: string,
  stripeSessionId: string,
): Promise<ConsentRow | null> {
  const sql = getNeonSql();
  const rows = await sql`
    UPDATE lesmateriaal_consents
    SET stripe_session_id = ${stripeSessionId},
        status = 'bound'
    WHERE consent_id = ${consentId}
      AND stripe_session_id IS NULL
      AND status = 'pending'
    RETURNING *
  `;
  const row = rows[0];
  return row ? mapConsent(row as Record<string, unknown>) : null;
}

export async function getConsentById(consentId: string): Promise<ConsentRow | null> {
  const sql = getNeonSql();
  const rows = await sql`
    SELECT * FROM lesmateriaal_consents WHERE consent_id = ${consentId} LIMIT 1
  `;
  const row = rows[0];
  return row ? mapConsent(row as Record<string, unknown>) : null;
}

export async function getConsentByStripeSessionId(
  stripeSessionId: string,
): Promise<ConsentRow | null> {
  const sql = getNeonSql();
  const rows = await sql`
    SELECT * FROM lesmateriaal_consents
    WHERE stripe_session_id = ${stripeSessionId}
    LIMIT 1
  `;
  const row = rows[0];
  return row ? mapConsent(row as Record<string, unknown>) : null;
}

export async function markConsentPaid(consentId: string): Promise<void> {
  const sql = getNeonSql();
  await sql`
    UPDATE lesmateriaal_consents
    SET status = 'paid'
    WHERE consent_id = ${consentId}
  `;
}

export function verifyConsentForOrder(params: {
  consent: ConsentRow;
  email: string;
  referenceId: string;
  stripeSessionId: string;
}): boolean {
  const email = params.email.trim().toLowerCase();
  if (params.consent.email !== email) return false;
  if (params.consent.referenceId !== params.referenceId) return false;
  if (params.consent.stripeSessionId !== params.stripeSessionId) return false;
  if (params.consent.consentVersion !== DIGITAL_CONSENT_VERSION) {
    // Oudere versie mag nog geldig zijn als tekst-hash klopt met opgeslagen tekst
  }
  const expectedHash = hashConsentText(
    params.consent.consentText,
    params.consent.consentVersion,
  );
  if (params.consent.consentTextHash !== expectedHash) return false;
  return true;
}

export function isFulfillmentTerminal(status: FulfillmentStatus): boolean {
  return (
    status === 'completed' ||
    status === 'mail_sent' ||
    status === 'mail_skipped'
  );
}

export async function getFulfillmentByStripeSessionId(
  stripeSessionId: string,
): Promise<FulfillmentRow | null> {
  const sql = getNeonSql();
  const rows = await sql`
    SELECT * FROM lesmateriaal_fulfillments
    WHERE stripe_session_id = ${stripeSessionId}
    LIMIT 1
  `;
  const row = rows[0];
  return row ? mapFulfillment(row as Record<string, unknown>) : null;
}

/**
 * Webhook-gate: terminal Neon-rijen altijd respecteren (ook in links-modus).
 * Nieuwe inserts alleen via sessions_claim.
 *
 * links_passthrough = geen bestaande rij → Payment Links-gedrag (geen Neon-write).
 * links_retry = pending/mail_failed na Sessions → veilig opnieuw mailen.
 * links_lookup_failed = Neon-fout in links-modus → doorlaten; idempotency niet gegarandeerd.
 */
export type WebhookFulfillmentGate =
  | { action: 'skip'; status: FulfillmentStatus }
  | { action: 'sessions_claim' }
  | { action: 'links_retry' }
  | { action: 'links_passthrough' }
  | { action: 'links_lookup_failed' };

export function decideWebhookFulfillmentGate(params: {
  checkoutMode: 'links' | 'sessions';
  neonConfigured: boolean;
  existing: FulfillmentRow | null;
  lookupFailed?: boolean;
}): WebhookFulfillmentGate {
  const { checkoutMode, neonConfigured, existing, lookupFailed = false } = params;

  if (!neonConfigured) {
    return { action: 'links_passthrough' };
  }

  // Bekende terminal rij wint altijd — ook als een latere lookup faalde.
  if (existing && isFulfillmentTerminal(existing.status)) {
    return { action: 'skip', status: existing.status };
  }

  if (lookupFailed) {
    // Sessions-modus: caller moet claim/500-pad houden. Links: bestaand Payment Links-pad.
    return checkoutMode === 'sessions'
      ? { action: 'sessions_claim' }
      : { action: 'links_lookup_failed' };
  }

  if (checkoutMode === 'sessions') {
    return { action: 'sessions_claim' };
  }

  if (existing && (existing.status === 'pending' || existing.status === 'mail_failed')) {
    return { action: 'links_retry' };
  }

  return { action: 'links_passthrough' };
}

/**
 * Merge consent flags for claim/retry: bestaande true mag nooit false worden
 * wanneer een latere poging geen nieuwe verificatie heeft.
 */
export function resolveConsentVerifiedForClaim(params: {
  newlyVerified: boolean;
  existingVerified?: boolean | null;
}): boolean {
  return Boolean(params.existingVerified) || params.newlyVerified;
}

/**
 * Claim fulfillment row for processing. Idempotent:
 * - new session → insert pending, return { action: 'process' }
 * - completed / mail_sent / mail_skipped → { action: 'skip' }
 * - mail_failed / pending → { action: 'retry' }
 *
 * Bij retry: consent_verified wordt OR-gewijs gemerged (true blijft true).
 */
/**
 * Atomisch opnieuw claimen: alleen pending/mail_failed → pending.
 * Voorkomt rewind van completed/mail_sent/mail_skipped tussen SELECT en UPDATE.
 */
async function claimNonTerminalFulfillmentRow(params: {
  stripeSessionId: string;
  consentId: string | null;
  consentVerified: boolean;
  existing: FulfillmentRow;
}): Promise<{ action: 'retry' | 'skip'; row: FulfillmentRow }> {
  const sql = getNeonSql();
  if (isFulfillmentTerminal(params.existing.status)) {
    return { action: 'skip', row: params.existing };
  }

  const mergedVerified = resolveConsentVerifiedForClaim({
    newlyVerified: params.consentVerified,
    existingVerified: params.existing.consentVerified,
  });

  const updated = await sql`
    UPDATE lesmateriaal_fulfillments
    SET status = 'pending',
        updated_at = now(),
        last_error = NULL,
        consent_verified = ${mergedVerified},
        consent_id = COALESCE(${params.consentId}, consent_id)
    WHERE stripe_session_id = ${params.stripeSessionId}
      AND status IN ('pending', 'mail_failed')
    RETURNING *
  `;

  if (updated[0]) {
    return {
      action: 'retry',
      row: mapFulfillment(updated[0] as Record<string, unknown>),
    };
  }

  // Peer markeerde terminal (of rij weg) tussen check en update.
  const latest = await sql`
    SELECT * FROM lesmateriaal_fulfillments
    WHERE stripe_session_id = ${params.stripeSessionId}
    LIMIT 1
  `;
  if (!latest[0]) {
    throw new Error('Fulfillment claim: rij ontbreekt na mislukte non-terminal update');
  }
  const row = mapFulfillment(latest[0] as Record<string, unknown>);
  if (isFulfillmentTerminal(row.status)) {
    return { action: 'skip', row };
  }
  // Nog steeds non-terminal maar update matchte niet — geef gemergede flag voor mail zonder rewind.
  return {
    action: 'retry',
    row: {
      ...row,
      consentVerified: resolveConsentVerifiedForClaim({
        newlyVerified: params.consentVerified,
        existingVerified: row.consentVerified,
      }),
    },
  };
}

export async function claimFulfillment(params: {
  stripeSessionId: string;
  consentId: string | null;
  referenceId: string;
  email: string;
  consentVerified: boolean;
}): Promise<{ action: 'process' | 'retry' | 'skip'; row: FulfillmentRow }> {
  const sql = getNeonSql();
  const email = params.email.trim().toLowerCase();

  const existing = await sql`
    SELECT * FROM lesmateriaal_fulfillments
    WHERE stripe_session_id = ${params.stripeSessionId}
    LIMIT 1
  `;

  if (existing[0]) {
    return claimNonTerminalFulfillmentRow({
      stripeSessionId: params.stripeSessionId,
      consentId: params.consentId,
      consentVerified: params.consentVerified,
      existing: mapFulfillment(existing[0] as Record<string, unknown>),
    });
  }

  const inserted = await sql`
    INSERT INTO lesmateriaal_fulfillments (
      stripe_session_id, consent_id, reference_id, email, status, consent_verified
    ) VALUES (
      ${params.stripeSessionId}, ${params.consentId}, ${params.referenceId},
      ${email}, 'pending', ${params.consentVerified}
    )
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING *
  `;

  if (inserted[0]) {
    return {
      action: 'process',
      row: mapFulfillment(inserted[0] as Record<string, unknown>),
    };
  }

  // Race: other worker inserted — OR-merge + alleen non-terminal updaten.
  const again = await sql`
    SELECT * FROM lesmateriaal_fulfillments
    WHERE stripe_session_id = ${params.stripeSessionId}
    LIMIT 1
  `;
  if (!again[0]) {
    throw new Error('Fulfillment claim race: rij ontbreekt na conflict');
  }
  return claimNonTerminalFulfillmentRow({
    stripeSessionId: params.stripeSessionId,
    consentId: params.consentId,
    consentVerified: params.consentVerified,
    existing: mapFulfillment(again[0] as Record<string, unknown>),
  });
}

export async function markFulfillmentMailSent(
  stripeSessionId: string,
): Promise<void> {
  const sql = getNeonSql();
  await sql`
    UPDATE lesmateriaal_fulfillments
    SET status = 'completed',
        updated_at = now(),
        last_error = NULL
    WHERE stripe_session_id = ${stripeSessionId}
  `;
}

/** Preview allowlist: mail bewust niet verzonden — geen 'completed'/verzonden. */
export async function markFulfillmentMailSkipped(
  stripeSessionId: string,
  reason: string,
): Promise<void> {
  const sql = getNeonSql();
  await sql`
    UPDATE lesmateriaal_fulfillments
    SET status = 'mail_skipped',
        updated_at = now(),
        last_error = ${reason.slice(0, 500)}
    WHERE stripe_session_id = ${stripeSessionId}
  `;
}

export async function markFulfillmentMailFailed(
  stripeSessionId: string,
  error: string,
): Promise<void> {
  const sql = getNeonSql();
  await sql`
    UPDATE lesmateriaal_fulfillments
    SET status = 'mail_failed',
        updated_at = now(),
        last_error = ${error.slice(0, 500)}
    WHERE stripe_session_id = ${stripeSessionId}
  `;
}

function mapFulfillment(row: Record<string, unknown>): FulfillmentRow {
  return {
    stripeSessionId: String(row.stripe_session_id),
    consentId: row.consent_id ? String(row.consent_id) : null,
    referenceId: String(row.reference_id),
    email: String(row.email),
    status: String(row.status) as FulfillmentStatus,
    consentVerified: Boolean(row.consent_verified),
    lastError: row.last_error ? String(row.last_error) : null,
  };
}

export { hashConsentText };
