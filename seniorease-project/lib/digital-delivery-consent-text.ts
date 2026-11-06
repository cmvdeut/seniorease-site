/**
 * Client-veilige consentteksten (geen Node crypto).
 * Versie verhogen wanneer de checkbox-tekst juridisch wijzigt.
 */

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
