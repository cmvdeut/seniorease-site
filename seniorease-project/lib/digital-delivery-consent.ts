/**
 * Toestemming voor directe levering van digitale lesinhoud (herroepingsrecht).
 * Versie verhogen wanneer de checkbox-tekst juridisch wijzigt.
 */

import { createHmac, timingSafeEqual } from 'crypto';

export const DIGITAL_CONSENT_VERSION = '2026-11-06-v1';

/** Tekst die de koper moet zien en bevestigen (niet vooraf aangevinkt). */
export const DIGITAL_CONSENT_CHECKBOX_LABEL =
  'Ik stem ermee in dat de download van dit digitale lesmateriaal direct na betaling start. Ik begrijp dat ik — als consument — daarmee het herroepingsrecht verlies zodra de levering is begonnen, voor zover de wet dat toestaat. Bij gebrekkige of onjuiste bestanden behoud ik mijn wettelijke rechten.';

export const DIGITAL_CONSENT_ORG_NOTE =
  'Koopt u als organisatie of onderneming? Dan geldt het herroepingsrecht voor consumenten mogelijk niet. Wettelijke rechten bij gebrekkige digitale producten blijven bestaan.';

export const DIGITAL_CONSENT_EMAIL_CONFIRMATION = [
  'U heeft vóór betaling ingestemd met directe digitale levering en erkend dat het herroepingsrecht voor consumenten kan vervallen zodra de download beschikbaar is, voor zover de wet dat toestaat.',
  'Bij gebrekkige of onjuiste bestanden behoudt u de rechten die de wet u geeft. Hulp bij download: support@seniorease.nl.',
].join(' ');

export type DigitalConsentBuyerType = 'consumer' | 'organization';

export type DigitalConsentRecord = {
  consentId: string;
  email: string;
  referenceId: string;
  productLabel: string;
  buyerType: DigitalConsentBuyerType;
  version: string;
  consentedAt: string;
  label: string;
};

function getConsentSecret(): string {
  const secret =
    process.env.LESMATERIAAL_DOWNLOAD_SECRET?.trim() ||
    process.env.DIGITAL_CONSENT_SECRET?.trim();
  if (!secret) {
    throw new Error('LESMATERIAAL_DOWNLOAD_SECRET ontbreekt voor consent-registratie');
  }
  return secret;
}

export function createConsentId(parts: {
  email: string;
  referenceId: string;
  consentedAt: string;
  version: string;
}): string {
  const payload = [
    parts.email.trim().toLowerCase(),
    parts.referenceId.trim(),
    parts.consentedAt,
    parts.version,
  ].join('|');
  return createHmac('sha256', getConsentSecret()).update(payload).digest('hex').slice(0, 32);
}

export function signConsentRecord(record: Omit<DigitalConsentRecord, 'consentId'>): DigitalConsentRecord {
  const consentId = createConsentId({
    email: record.email,
    referenceId: record.referenceId,
    consentedAt: record.consentedAt,
    version: record.version,
  });
  return { ...record, consentId };
}

/** Bewijsstring voor audit-mail / logging (geen geheim). */
export function formatConsentAuditLines(record: DigitalConsentRecord): string {
  return [
    `consentId=${record.consentId}`,
    `email=${record.email}`,
    `referenceId=${record.referenceId}`,
    `product=${record.productLabel}`,
    `buyerType=${record.buyerType}`,
    `version=${record.version}`,
    `consentedAt=${record.consentedAt}`,
    `label=${record.label.slice(0, 120)}…`,
  ].join('\n');
}

export function verifyConsentId(record: DigitalConsentRecord): boolean {
  try {
    const expected = createConsentId({
      email: record.email,
      referenceId: record.referenceId,
      consentedAt: record.consentedAt,
      version: record.version,
    });
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(record.consentId, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Stripe Customer metadata keys (server-side bewijs naast audit-mail). */
export const STRIPE_CONSENT_META = {
  id: 'se_digital_consent_id',
  at: 'se_digital_consent_at',
  ref: 'se_digital_consent_ref',
  version: 'se_digital_consent_version',
  buyer: 'se_digital_consent_buyer',
} as const;
