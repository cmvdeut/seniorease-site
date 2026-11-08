import { randomUUID, createHash } from 'crypto';
import { getNeonSql } from '@/lib/db/neon';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_VERSION,
} from '@/lib/digital-delivery-consent-text';
import type { CatalogBuyerType } from '@/lib/lesmateriaal-checkout-catalog';

export type ConsentStatus = 'pending' | 'bound' | 'paid' | 'orphan';
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
  };
}

export async function insertConsentRecord(params: {
  email: string;
  referenceId: string;
  productLabel: string;
  buyerType: CatalogBuyerType;
}): Promise<ConsentRow> {
  const sql = getNeonSql();
  const consentId = randomUUID();
  const consentText = DIGITAL_CONSENT_CHECKBOX_LABEL;
  const consentVersion = DIGITAL_CONSENT_VERSION;
  const consentTextHash = hashConsentText(consentText, consentVersion);
  const email = params.email.trim().toLowerCase();

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

  if (lookupFailed) {
    // Sessions-modus: caller moet claim/500-pad houden. Links: bestaand Payment Links-pad.
    return checkoutMode === 'sessions'
      ? { action: 'sessions_claim' }
      : { action: 'links_lookup_failed' };
  }

  if (existing && isFulfillmentTerminal(existing.status)) {
    return { action: 'skip', status: existing.status };
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
    const row = mapFulfillment(existing[0] as Record<string, unknown>);
    if (isFulfillmentTerminal(row.status)) {
      return { action: 'skip', row };
    }
    const mergedVerified = resolveConsentVerifiedForClaim({
      newlyVerified: params.consentVerified,
      existingVerified: row.consentVerified,
    });
    await sql`
      UPDATE lesmateriaal_fulfillments
      SET status = 'pending',
          updated_at = now(),
          last_error = NULL,
          consent_verified = ${mergedVerified},
          consent_id = COALESCE(${params.consentId}, consent_id)
      WHERE stripe_session_id = ${params.stripeSessionId}
    `;
    return {
      action: 'retry',
      row: { ...row, status: 'pending', consentVerified: mergedVerified },
    };
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

  // Race: other worker inserted — zelfde OR-merge als bestaande-rij retry,
  // anders kan claim.row.consentVerified false blijven terwijl deze worker true had.
  const again = await sql`
    SELECT * FROM lesmateriaal_fulfillments
    WHERE stripe_session_id = ${params.stripeSessionId}
    LIMIT 1
  `;
  if (!again[0]) {
    throw new Error('Fulfillment claim race: rij ontbreekt na conflict');
  }
  const row = mapFulfillment(again[0] as Record<string, unknown>);
  if (isFulfillmentTerminal(row.status)) {
    return { action: 'skip', row };
  }
  const raceMergedVerified = resolveConsentVerifiedForClaim({
    newlyVerified: params.consentVerified,
    existingVerified: row.consentVerified,
  });
  await sql`
    UPDATE lesmateriaal_fulfillments
    SET status = 'pending',
        updated_at = now(),
        last_error = NULL,
        consent_verified = ${raceMergedVerified},
        consent_id = COALESCE(${params.consentId}, consent_id)
    WHERE stripe_session_id = ${params.stripeSessionId}
  `;
  return {
    action: 'retry',
    row: { ...row, status: 'pending', consentVerified: raceMergedVerified },
  };
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
