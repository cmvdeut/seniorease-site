/**
 * Client-veilige consentteksten (geen Node crypto).
 * Versie verhogen wanneer de checkbox-tekst juridisch wijzigt.
 */

export const DIGITAL_CONSENT_VERSION = '2026-11-07-v1';

/** Tekst die de koper moet zien en bevestigen (niet vooraf aangevinkt). */
export const DIGITAL_CONSENT_CHECKBOX_LABEL =
  'Ik ga akkoord met directe levering van het digitale lesmateriaal en begrijp dat ik daarmee mijn herroepingsrecht verlies zodra de levering begint.';

export const DIGITAL_CONSENT_ORG_NOTE =
  'Koopt u als organisatie of onderneming? Dan geldt het herroepingsrecht voor consumenten mogelijk niet. Wettelijke rechten bij gebrekkige digitale producten blijven bestaan.';

export const DIGITAL_CONSENT_EMAIL_CONFIRMATION = [
  'U heeft vóór betaling akkoord gegeven met directe levering van het digitale lesmateriaal en begrepen dat u daarmee het herroepingsrecht verliest zodra de levering begint.',
  'Hulp bij download: support@seniorease.nl.',
].join(' ');
