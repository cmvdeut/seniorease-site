/**
 * Officiële bedrijfsgegevens SeniorEase / EaseWorks.
 * Geen woon-/straatadres hier publiceren zonder expliciet akkoord.
 */

export const COMPANY = {
  legalName: 'EaseWorks',
  brandName: 'SeniorEase',
  kvk: '42201315',
  city: 'Leimuiden',
  /** Alleen publiceren als gevuld — geen fictief nummer. */
  btwId: 'NL05581413B67',
  emailGeneral: 'info@seniorease.nl',
  emailSupport: 'support@seniorease.nl',
  siteUrl: 'https://www.seniorease.nl',
} as const;

export function companyFooterLine(): string {
  return `${COMPANY.brandName} is een product van ${COMPANY.legalName} · KvK ${COMPANY.kvk} · ${COMPANY.city}`;
}

export function companyBtwLine(): string | null {
  const id = COMPANY.btwId?.trim();
  return id ? `Btw-id: ${id}` : null;
}
