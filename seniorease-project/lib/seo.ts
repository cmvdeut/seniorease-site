import type { Metadata } from 'next';

export const SITE_URL = 'https://www.seniorease.nl';
export const SITE_NAME = 'SeniorEase';

export const DEFAULT_DESCRIPTION =
  'SeniorEase helpt senioren met technologie — gratis tools én rustige stap-voor-stap uitleg over smartphone, computer en internet. In gewone taal, in uw eigen tempo.';

export const DEFAULT_OG_IMAGE = {
  url: '/images/senior-vrouw-laptop.png',
  width: 1200,
  height: 800,
  alt: 'SeniorEase — digitale hulp voor senioren',
};

type PageMetadataOptions = {
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
};

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildPageMetadata({
  path,
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE.url,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        'nl-NL': url,
        'x-default': url,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFAQSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export type UitlegSchemaEntry = {
  pageName: string;
  howTo: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string }>;
  };
  faq?: Array<{ question: string; answer: string }>;
};

export function buildUitlegSchemas(
  slug: string,
  entry: UitlegSchemaEntry,
): Array<Record<string, unknown>> {
  const path = `/uitleg/${slug}`;
  const schemas: Array<Record<string, unknown>> = [
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Uitleg', path: '/uitleg' },
      { name: entry.pageName, path },
    ]),
    buildHowToSchema(
      entry.howTo.name,
      entry.howTo.description,
      entry.howTo.steps,
    ),
  ];

  if (entry.faq?.length) {
    schemas.push(buildFAQSchema(entry.faq));
  }

  return schemas;
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/heart-logo.png'),
  description: DEFAULT_DESCRIPTION,
  email: 'info@seniorease.nl',
  sameAs: [
    'https://www.facebook.com/seniorease.nl',
    'https://www.youtube.com/@SeniorEaseNL',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'nl-NL',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/digitale-hulp?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  description: 'Digitale hulp voor senioren — simpel uitgelegd.',
  url: SITE_URL,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web, Android, iOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Gratis in de browser',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Senioren, Ouderen',
  },
};

/** Metadata for client-only pages (exported via layout.tsx) */
export const CLIENT_PAGE_METADATA = {
  bibliotheek: buildPageMetadata({
    path: '/bibliotheek',
    title: 'Mijn Bibliotheek — boeken bijhouden voor senioren',
    description:
      'Houd uw boekencollectie bij met Mijn Bibliotheek. Scan barcodes, voeg boeken toe en maak backups. Gratis in de browser, grote teksten.',
    keywords: ['bibliotheek app', 'boeken bijhouden', 'barcode scanner', 'senioren'],
  }),
  rekenmachine: buildPageMetadata({
    path: '/rekenmachine',
    title: 'Grote rekenmachine voor senioren',
    description:
      'Eenvoudige online rekenmachine met grote knoppen en duidelijke cijfers. Gratis te gebruiken, geen account nodig.',
    keywords: ['rekenmachine senioren', 'grote rekenmachine', 'online rekenmachine'],
  }),
  kalender: buildPageMetadata({
    path: '/kalender',
    title: 'Verjaardagskalender — nooit meer een verjaardag vergeten',
    description:
      'Houd verjaardagen bij met de SeniorEase kalender. Grote teksten, eenvoudig te gebruiken. Gratis en zonder account.',
    keywords: ['verjaardagskalender', 'kalender senioren', 'verjaardagen bijhouden'],
  }),
  klok: buildPageMetadata({
    path: '/klok',
    title: 'Grote klok — altijd de tijd duidelijk zichtbaar',
    description:
      'Een grote, duidelijke online klok voor senioren. Leesbaar op elk scherm. Gratis te gebruiken.',
    keywords: ['grote klok', 'online klok', 'klok senioren'],
  }),
  puzzels: buildPageMetadata({
    path: '/puzzels',
    title: 'Dagelijkse puzzels voor senioren',
    description:
      'Speel elke dag een nieuwe puzzel. Sudoku, woordzoeker en meer — rustig en in uw eigen tempo. Gratis.',
    keywords: ['puzzels senioren', 'sudoku', 'woordzoeker', 'hersentraining'],
  }),
  afvinken: buildPageMetadata({
    path: '/afvinken',
    title: 'Takenlijst — dingen afvinken en onthouden',
    description:
      'Maak eenvoudige takenlijsten en vink af wat u gedaan heeft. Grote teksten, geen account nodig.',
    keywords: ['takenlijst', 'to-do lijst senioren', 'afvinken'],
  }),
  contact: buildPageMetadata({
    path: '/contact',
    title: 'Contact',
    description:
      'Neem contact op met SeniorEase. Vragen over digitale hulp, Mijn Bibliotheek of technische ondersteuning? Wij helpen graag.',
    keywords: ['contact SeniorEase', 'hulp senioren'],
  }),
  hulp: buildPageMetadata({
    path: '/hulp',
    title: 'Hulp & veelgestelde vragen',
    description:
      'Antwoorden op veelgestelde vragen over Mijn Bibliotheek, de Android app en SeniorEase. Neem contact op als u hulp nodig heeft.',
    keywords: ['FAQ', 'hulp', 'Mijn Bibliotheek', 'SeniorEase support'],
  }),
  privacy: buildPageMetadata({
    path: '/privacy',
    title: 'Privacybeleid',
    description: 'Privacybeleid van SeniorEase. Hoe wij omgaan met uw gegevens.',
    noIndex: false,
  }),
  voorwaarden: buildPageMetadata({
    path: '/voorwaarden',
    title: 'Algemene voorwaarden',
    description: 'Algemene voorwaarden voor het gebruik van SeniorEase en Mijn Bibliotheek.',
  }),
  tools: buildPageMetadata({
    path: '/tools',
    title: 'Gratis digitale tools voor senioren',
    description:
      'Overzicht van alle gratis SeniorEase tools: bibliotheek, rekenmachine, kalender, klok en puzzels. Grote teksten, eenvoudig te gebruiken.',
    keywords: ['digitale tools senioren', 'gratis apps ouderen'],
  }),
  'zo-werkt-het': buildPageMetadata({
    path: '/zo-werkt-het',
    title: 'Zo werkt Mijn Bibliotheek',
    description:
      'Uitleg over hoe Mijn Bibliotheek werkt: boeken toevoegen, barcode scannen, backup maken en meer. Stap voor stap uitgelegd.',
  }),
  'nuttige-links': buildPageMetadata({
    path: '/nuttige-links',
    title: 'Nuttige links voor senioren',
    description:
      'Handige websites en links voor senioren: overheid, zorgverzekering, consumentenbond en meer.',
  }),
  animaties: buildPageMetadata({
    path: '/animaties',
    title: 'Animaties — zo werken de SeniorEase tools',
    description:
      'Bekijk korte animaties die laten zien hoe de SeniorEase tools werken: bibliotheek, rekenmachine, kalender en meer.',
  }),
  extras: buildPageMetadata({
    path: '/extras',
    title: 'Extra\'s',
    description: 'Extra functies en hulpmiddelen van SeniorEase.',
  }),
} as const;

export const HULP_FAQ_SCHEMA = buildFAQSchema([
  {
    question: 'Moet ik betalen voor Mijn Bibliotheek?',
    answer:
      'Mijn Bibliotheek is volledig gratis te gebruiken in uw browser op desktop, laptop, iPhone en iPad. De Android app staat in de Google Play Store voor €4,99 eenmalig. Geen abonnement.',
  },
  {
    question: 'Hoe voeg ik een boek toe?',
    answer:
      'Met barcode scanner: klik op Barcode scannen, houd de barcode in het kader, wacht 4 seconden en klik Opslaan. Handmatig: klik op Item handmatig toevoegen, vul de gegevens in en klik Opslaan.',
  },
  {
    question: 'Hoe werkt de barcode scanner?',
    answer:
      'De barcode scanner werkt het beste op telefoon of tablet met achtercamera. Houd de barcode in het kader, wacht 4 seconden en controleer de automatisch ingevulde informatie.',
  },
  {
    question: 'Hoe maak ik een backup?',
    answer:
      'Open Mijn Bibliotheek, klik op het Opties menu rechtsboven, kies Backup maken en sla het bestand op. Terugzetten kan via Backup terugzetten in hetzelfde menu.',
  },
  {
    question: 'Kan ik Mijn Bibliotheek op meerdere apparaten gebruiken?',
    answer:
      'Ja. Mijn Bibliotheek is gratis in de browser op alle apparaten. Maak een backup op het ene apparaat en zet die terug op het andere.',
  },
  {
    question: 'Wat als de barcode niet wordt herkend?',
    answer:
      'Probeer opnieuw met beter licht, houd de barcode volledig in het kader en houd de camera stil. Werkt het niet? Voeg het item handmatig toe.',
  },
]);
