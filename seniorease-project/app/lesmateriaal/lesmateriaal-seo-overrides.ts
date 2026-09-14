/**
 * Commerciële SEO-overrides voor geselecteerde themapakketten (Sprint 2).
 * Wijzigt geen prijzen, lessen, includes of checkout — alleen title/meta/openingslead.
 */
export type LesmateriaalSeoOverride = {
  /** Document title (zonder | SeniorEase; template voegt dat toe) */
  title: string;
  /** Meta description */
  description: string;
  /** Eerste openingszin(nen) vóór de bestaande productbeschrijving */
  openingLead: string;
};

export const LESMATERIAAL_SEO_OVERRIDES: Record<string, LesmateriaalSeoOverride> = {
  'pakket-c': {
    title: 'WhatsApp-lesmateriaal — zelf een cursus voor senioren geven',
    description:
      'Kant-en-klaar WhatsApp-lesmateriaal waarmee uw organisatie zelf een cursus of workshop voor senioren kan geven. Digitaal lesboek (PDF), vier lessen à 90 minuten. €19,95.',
    openingLead:
      'Kant-en-klaar lesmateriaal waarmee uw organisatie een WhatsApp-les voor senioren kan geven.',
  },
  'pakket-d': {
    title: 'Veilig online — lesmateriaal voor organisaties',
    description:
      'Lesmateriaal over veilig internetten voor senioren: verdachte berichten, links, bellers en veilig betalen. Geef zelf rustige lessen in bibliotheek of buurthuis. Digitaal lesboek (PDF), vier lessen. €19,95.',
    openingLead:
      'Kant-en-klaar lesmateriaal waarmee uw organisatie zelf lessen over veilig online handelen voor senioren kan geven.',
  },
  'pakket-e': {
    title: 'DigiD-lesmateriaal — zelf een workshop voor senioren geven',
    description:
      'Lesmateriaal DigiD & digitale overheid voor senioren: DigiD, MijnOverheid en overheidsberichten. Zelf een DigiD-les of -workshop geven — zonder echte login in de klas. Digitaal lesboek (PDF), vier lessen. €19,95.',
    openingLead:
      'Kant-en-klaar lesmateriaal waarmee uw organisatie zelf een DigiD-les of workshop over digitale overheid voor senioren kan geven.',
  },
  'pakket-h-ai': {
    title: 'Pakket H — AI in het dagelijks leven — lesmateriaal voor organisaties',
    description:
      'AI-lesmateriaal waarmee uw organisatie zelf een praktische AI-workshop voor senioren kan geven. Gemini is voorbeeld; ook bij andere AI-assistenten. Vier lessen, €19,95.',
    openingLead:
      'Kant-en-klaar lesmateriaal waarmee uw organisatie zelf een praktische AI-les of -workshop voor senioren kan geven.',
  },
};

export function getLesmateriaalSeoOverride(slug: string): LesmateriaalSeoOverride | undefined {
  return LESMATERIAAL_SEO_OVERRIDES[slug];
}
