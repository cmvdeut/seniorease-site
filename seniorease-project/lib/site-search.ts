import { artikelen } from '@/app/digitale-hulp/artikelen';
import { LESMATERIAAL_PAKKETTEN } from '@/app/lesmateriaal/lesmateriaal-data';

export type SearchCategory =
  | 'Digitale hulp'
  | 'Uitleg'
  | 'AI & ChatGPT'
  | 'Lesmateriaal'
  | 'Tools'
  | 'Website';

export interface SiteSearchItem {
  href: string;
  title: string;
  description: string;
  category: SearchCategory;
  keywords?: string[];
}

/** Uitgebreide zoekindex — artikelen, uitleg, AI, tools en vaste pagina's. */
export const SITE_SEARCH_INDEX: SiteSearchItem[] = [
  ...artikelen.map((a) => ({
    href: `/digitale-hulp/${a.slug}`,
    title: a.title,
    description: a.description,
    category: 'Digitale hulp' as const,
    keywords: a.keywords,
  })),

  {
    href: '/lesmateriaal',
    title: 'Lesmateriaal',
    description: 'Print-PDF\'s voor bibliotheken: telefoon, WhatsApp, veilig online, DigiD, internet, AI.',
    category: 'Lesmateriaal',
    keywords: ['lesmateriaal', 'cursus', 'bibliotheek', 'buurthuis', 'PDF', 'les'],
  },
  ...LESMATERIAAL_PAKKETTEN.map((p) => ({
    href: `/lesmateriaal/${p.slug}`,
    title: `Pakket ${p.code}: ${p.title}`,
    description: p.description,
    category: 'Lesmateriaal' as const,
    keywords: [p.code, p.title, 'les', 'senioren'],
  })),
  {
    href: '/lesmateriaal/begeleiders',
    title: 'Voor begeleiders',
    description: 'Rollen, didactiek en afspraken in de zaal.',
    category: 'Lesmateriaal',
    keywords: ['begeleider', 'vrijwilliger', 'docent', 'helper'],
  },
  {
    href: '/lesmateriaal/woordenlijst',
    title: 'Woordenlijst',
    description: 'Digitale termen in gewone taal — downloaden, wifi, DigiD, AI.',
    category: 'Lesmateriaal',
    keywords: ['woordenlijst', 'jargon', 'downloaden', 'uploaden'],
  },

  // Categorie-overzichten
  {
    href: '/digitale-hulp/smartphone',
    title: 'Smartphone hulp',
    description: 'Alle artikelen over uw telefoon: WhatsApp, foto\'s, wifi en meer.',
    category: 'Digitale hulp',
    keywords: ['telefoon', 'mobiel', 'android', 'iphone', 'smartphone', 'tablet'],
  },
  {
    href: '/digitale-hulp/computer',
    title: 'Computer hulp',
    description: 'Uitleg voor laptop en pc: e-mail, internet en veilig werken.',
    category: 'Digitale hulp',
    keywords: ['computer', 'laptop', 'pc', 'windows', 'bureau'],
  },
  {
    href: '/digitale-hulp/internet-email',
    title: 'Internet & e-mail',
    description: 'Online werken, e-mail lezen en versturen, en veilig internetten.',
    category: 'Digitale hulp',
    keywords: ['internet', 'e-mail', 'email', 'online', 'browser', 'chrome', 'safari'],
  },
  {
    href: '/digitale-hulp/veilig-internet',
    title: 'Veilig internet',
    description: 'Oplichting, phishing, wachtwoorden en veilig online.',
    category: 'Digitale hulp',
    keywords: ['veilig', 'oplichting', 'phishing', 'fraude', 'hack', 'wachtwoord'],
  },
  {
    href: '/digitale-hulp/ai',
    title: 'AI & ChatGPT hulp',
    description: 'Kunstmatige intelligentie en ChatGPT rustig uitgelegd.',
    category: 'AI & ChatGPT',
    keywords: ['ai', 'chatgpt', 'kunstmatige intelligentie', 'robot', 'assistent'],
  },

  // Uitleg-pagina's
  { href: '/uitleg', title: 'Alle uitleg', description: 'Overzicht van stap-voor-stap uitleg voor senioren.', category: 'Uitleg', keywords: ['uitleg', 'overzicht', 'help'] },
  { href: '/uitleg/whatsapp-basis', title: 'WhatsApp – eerste stappen', description: 'WhatsApp installeren, berichten sturen en bellen.', category: 'Uitleg', keywords: ['whatsapp', 'app', 'bericht', 'appen', 'installeren'] },
  { href: '/uitleg/whatsapp-deel2', title: 'WhatsApp deel 2', description: 'Meer WhatsApp-functies: groepen en instellingen.', category: 'Uitleg', keywords: ['whatsapp', 'groep', 'instellingen'] },
  { href: '/uitleg/whatsapp-deel3', title: 'WhatsApp deel 3', description: 'WhatsApp veilig en handig gebruiken.', category: 'Uitleg', keywords: ['whatsapp', 'veilig', 'privacy'] },
  { href: '/uitleg/videobellen', title: 'Videobellen via WhatsApp', description: 'Elkaar zien tijdens het bellen via WhatsApp.', category: 'Uitleg', keywords: ['videobellen', 'bellen', 'camera', 'whatsapp', 'beeld'] },
  { href: '/uitleg/veiligheid', title: 'Oplichting herkennen', description: 'Valse berichten, nep-mails en oplichters herkennen.', category: 'Uitleg', keywords: ['oplichting', 'veilig', 'fraude', 'nep', 'phishing', 'bank'] },
  { href: '/uitleg/wachtwoorden', title: 'Wachtwoorden beheren', description: 'Sterke wachtwoorden maken en veilig bewaren.', category: 'Uitleg', keywords: ['wachtwoord', 'pincode', 'inloggen', 'account'] },
  { href: '/uitleg/fotos-maken', title: "Foto's maken met uw telefoon", description: 'Foto maken, scherpstellen en bewaren.', category: 'Uitleg', keywords: ['foto', 'camera', 'selfie', 'fotograferen'] },
  { href: '/uitleg/fotos-ordenen', title: "Foto's ordenen en bewaren", description: "Foto's sorteren, zoeken in galerij, back-up en overzicht.", category: 'Uitleg', keywords: ['foto', 'album', 'galerij', 'zoeken', 'back-up', 'opslaan'] },
  { href: '/foto-archief', title: 'Foto Archief', description: 'Personen labelen op oude groepsfoto\'s — nummers, namen en export.', category: 'Tools', keywords: ['foto', 'album', 'familie', 'stamboom', 'groepsfoto', 'archief', 'namen'] },
  { href: '/kijk-en-help', title: 'Kijk & Help', description: 'Maak een foto van een scherm dat u niet begrijpt. Rustige uitleg in gewone taal.', category: 'Tools', keywords: ['screenshot', 'scherm', 'melding', 'foto', 'uitleg', 'kijk', 'help', 'veilig'] },
  { href: '/uitleg/fotos-naar-computer', title: "Foto's van telefoon naar computer", description: "Foto's overzetten naar pc via e-mail, USB, WhatsApp of cloud.", category: 'Uitleg', keywords: ['foto', 'computer', 'pc', 'overzetten', 'kopiëren', 'usb', 'email', 'google fotos', 'icloud'] },
  { href: '/uitleg/email-bijlage', title: 'E-mail bijlage openen', description: 'Bijlage uit e-mail openen en opslaan op uw computer.', category: 'Uitleg', keywords: ['email', 'bijlage', 'attachment', 'pdf', 'download'] },
  { href: '/uitleg/bestanden-vinden', title: 'Bestanden vinden op computer', description: 'Downloads, Bureaublad en Verkenner — waar staat mijn bestand?', category: 'Uitleg', keywords: ['bestand', 'downloads', 'verkenner', 'map', 'opslaan', 'windows'] },
  { href: '/uitleg/computer-traag', title: 'Computer traag of vastgelopen', description: 'Pc reageert niet of wordt traag — rustige oplossingen.', category: 'Uitleg', keywords: ['computer', 'traag', 'vastgelopen', 'herstarten', 'windows', 'laptop'] },
  { href: '/uitleg/screenshot-pc', title: 'Screenshot maken op computer', description: 'Schermafbeelding op Windows of Mac — waar vindt u de foto?', category: 'Uitleg', keywords: ['screenshot', 'schermafbeelding', 'print screen', 'windows', 'pc'] },
  { href: '/uitleg/letters-groter-pc', title: 'Letters groter op computer', description: 'Tekst vergroten in Windows, Mac en browser.', category: 'Uitleg', keywords: ['letters', 'lettergrootte', 'tekst', 'computer', 'lezen', 'windows'] },
  { href: '/uitleg/programma-installeren', title: 'Programma installeren op pc', description: 'Veilig software installeren via Microsoft Store of officiële website.', category: 'Uitleg', keywords: ['programma', 'installeren', 'software', 'windows', 'microsoft store'] },
  { href: '/uitleg/digid', title: 'DigiD uitleg', description: 'Wat is DigiD, aanvragen en veilig inloggen bij de overheid.', category: 'Uitleg', keywords: ['digid', 'overheid', 'mijnoverheid', 'inloggen', 'bsn'] },
  { href: '/uitleg/online-bankieren', title: 'Veilig online bankieren', description: 'Inloggen bij uw bank, iDEAL en verdachte afschrijvingen.', category: 'Uitleg', keywords: ['bank', 'bankieren', 'ideal', 'internetbankieren', 'rabobank', 'ing'] },
  { href: '/uitleg/ebooks', title: 'E-books lezen', description: 'Digitaal boeken lezen op tablet of e-reader.', category: 'Uitleg', keywords: ['ebook', 'e-book', 'lezen', 'kobo', 'kindle'] },
  { href: '/uitleg/muziek-radio', title: 'Muziek en radio op uw telefoon', description: 'Luisteren via apps en online radio.', category: 'Uitleg', keywords: ['muziek', 'radio', 'spotify', 'luisteren'] },
  { href: '/uitleg/qr-code', title: 'QR-code scannen', description: 'QR-codes lezen met de camera van uw telefoon.', category: 'Uitleg', keywords: ['qr', 'code', 'scannen', 'camera'] },
  { href: '/uitleg/google-maps', title: 'Google Maps gebruiken', description: 'Navigeren, route plannen en kaarten op uw telefoon.', category: 'Uitleg', keywords: ['google maps', 'kaart', 'navigatie', 'route', 'gps', 'google'] },
  { href: '/uitleg/google-translate', title: 'Google Translate – vertalen op reis', description: 'Tekst en gesprekken vertalen met Google.', category: 'Uitleg', keywords: ['google translate', 'vertalen', 'taal', 'vakantie', 'google'] },
  { href: '/uitleg/e-bike', title: 'E-bike app gebruiken', description: 'Apps voor uw e-bike en fietsroutes.', category: 'Uitleg', keywords: ['e-bike', 'fiets', 'fietsen', 'app'] },
  { href: '/uitleg/hoofdtelefoon', title: 'Hoofdtelefoon instellen', description: 'Bluetooth koptelefoon of oordopjes verbinden.', category: 'Uitleg', keywords: ['hoofdtelefoon', 'bluetooth', 'oordopjes', 'geluid'] },
  { href: '/uitleg/wifi', title: 'WiFi instellen', description: 'Verbinden met thuisnetwerk of openbaar wifi.', category: 'Uitleg', keywords: ['wifi', 'wlan', 'internet', 'netwerk', 'wachtwoord'] },
  { href: '/uitleg/inspreken', title: 'Inspreken op uw telefoon', description: 'Typen zonder toetsenbord — ook in Google en WhatsApp.', category: 'Uitleg', keywords: ['inspreken', 'spraak', 'microfoon', 'google', 'dicteren'] },
  { href: '/uitleg/betalen-ov', title: 'Betalen in het OV', description: 'OV-chipkaart, pinpas en reizen met de trein of bus.', category: 'Uitleg', keywords: ['ov', 'trein', 'bus', 'chipkaart', 'reizen'] },
  { href: '/uitleg/mobiel-parkeren', title: 'Mobiel parkeren', description: 'Parkeren betalen met een app op uw telefoon — zonder muntjes of parkeerkaartje.', category: 'Uitleg', keywords: ['parkeren', 'parkmobile', 'yellowbrick', 'parkeerapp', 'auto', 'mobiel parkeren'] },
  { href: '/uitleg/9292', title: '9292 OV-app', description: 'Trein en bus plannen met de 9292-app.', category: 'Uitleg', keywords: ['9292', 'ov', 'reis', 'trein', 'bus'] },
  { href: '/uitleg/bol-com', title: 'Bestellen bij Bol.com', description: 'Online winkelen en thuis laten bezorgen.', category: 'Uitleg', keywords: ['bol', 'winkelen', 'bestellen', 'webshop'] },
  { href: '/uitleg/boodschappen-bestellen', title: 'Online boodschappen bestellen', description: 'Boodschappen laten bezorgen via internet.', category: 'Uitleg', keywords: ['boodschappen', 'bezorgen', 'supermarkt', 'ah', 'jumbo'] },
  { href: '/uitleg/online-retourneren', title: 'Iets terugsturen', description: 'Online gekochte spullen retourneren.', category: 'Uitleg', keywords: ['retour', 'terugsturen', 'pakket', 'webshop'] },
  { href: '/uitleg/zoom', title: 'Zoom gebruiken', description: 'Videobellen via Zoom op computer of tablet.', category: 'Uitleg', keywords: ['zoom', 'videobellen', 'vergadering'] },
  { href: '/uitleg/facetime', title: 'FaceTime (iPhone/iPad)', description: 'Videobellen met Apple FaceTime.', category: 'Uitleg', keywords: ['facetime', 'iphone', 'ipad', 'apple', 'videobellen'] },
  { href: '/uitleg/netflix', title: 'Netflix gebruiken', description: 'Films en series kijken via Netflix.', category: 'Uitleg', keywords: ['netflix', 'film', 'serie', 'streamen', 'tv'] },
  { href: '/uitleg/npo-start', title: 'NPO Start – gratis tv terugkijken', description: 'Nederlandse programma\'s terugkijken via NPO.', category: 'Uitleg', keywords: ['npo', 'tv', 'uitzending gemist', 'omroep'] },
  { href: '/uitleg/youtube-tv', title: 'YouTube kijken', description: 'Video\'s zoeken en kijken op telefoon, tablet, computer of tv.', category: 'Uitleg', keywords: ['youtube', 'video', 'kijken', 'streamen', 'computer', 'pc'] },

  // AI-pagina's
  { href: '/wat-is-ai', title: 'Wat is AI?', description: 'Kunstmatige intelligentie in gewone taal uitgelegd.', category: 'AI & ChatGPT', keywords: ['ai', 'kunstmatige intelligentie', 'robot', 'computer'] },
  { href: '/wat-is-ai/chatgpt', title: 'ChatGPT stap voor stap', description: 'ChatGPT gebruiken: account, eerste vraag en tips.', category: 'AI & ChatGPT', keywords: ['chatgpt', 'chat gpt', 'openai', 'assistent', 'ai'] },
  { href: '/wat-is-ai/uitproberen', title: 'AI uitproberen (demo)', description: 'Probeer AI veilig uit op onze demopagina.', category: 'AI & ChatGPT', keywords: ['demo', 'uitproberen', 'ai', 'chatgpt'] },
  { href: '/wat-is-ai/prompts', title: 'Voorbeeldvragen voor ChatGPT', description: 'Kant-en-klare vragen om in ChatGPT te plakken.', category: 'AI & ChatGPT', keywords: ['prompt', 'vraag', 'voorbeeld', 'chatgpt'] },
  { href: '/wat-is-ai/zo-ziet-het-eruit', title: 'Zo ziet ChatGPT eruit', description: 'Een kijkje in het ChatGPT-scherm.', category: 'AI & ChatGPT', keywords: ['chatgpt', 'scherm', 'uitleg', 'video'] },

  // Tools & website
  { href: '/bibliotheek', title: 'Mijn Bibliotheek', description: 'Uw boekenlijst bijhouden — gratis in de browser.', category: 'Tools', keywords: ['bibliotheek', 'boeken', 'isbn', 'lezen', 'lijst'] },
  { href: '/rekenmachine', title: 'Rekenmachine', description: 'Grote knoppen, helder scherm.', category: 'Tools', keywords: ['rekenmachine', 'rekenen', 'som'] },
  { href: '/kalender', title: 'Verjaardagskalender', description: 'Verjaardagen bijhouden en herinneringen.', category: 'Tools', keywords: ['kalender', 'verjaardag', 'datum', 'agenda'] },
  { href: '/klok', title: 'Klok', description: 'Grote digitale klok op het scherm.', category: 'Tools', keywords: ['klok', 'tijd', 'uur'] },
  { href: '/puzzels', title: 'Dagelijkse puzzel', description: 'Woordzoeker en puzzels voor ontspanning.', category: 'Tools', keywords: ['puzzel', 'woordzoeker', 'spel'] },
  { href: '/afvinken', title: 'Afvinken – takenlijst', description: 'Simpele takenlijst om dingen af te vinken.', category: 'Tools', keywords: ['taken', 'lijst', 'afvinken', 'todo'] },
  { href: '/tools', title: 'Alle tools', description: 'Overzicht van handige SeniorEase-tools.', category: 'Tools', keywords: ['tools', 'hulpmiddelen'] },
  { href: '/uitlegvideo', title: 'Uitlegvideo\'s op YouTube', description: 'Bekijk onze video\'s over WhatsApp, AI en meer.', category: 'Website', keywords: ['video', 'youtube', 'uitlegvideo', 'kijken'] },
  { href: '/hulp', title: 'Hulp bij Mijn Bibliotheek', description: 'Veelgestelde vragen over de bibliotheek-app.', category: 'Website', keywords: ['hulp', 'faq', 'bibliotheek'] },
  { href: '/download', title: 'App downloaden', description: 'Mijn Bibliotheek downloaden voor Android.', category: 'Website', keywords: ['download', 'app', 'play store', 'android'] },
  { href: '/contact', title: 'Contact', description: 'Neem contact op met SeniorEase.', category: 'Website', keywords: ['contact', 'mail', 'vraag'] },
];

const SYNONYMS: Record<string, string[]> = {
  google: ['googelen', 'zoeken', 'zoekmachine', 'google.nl', 'opzoeken', 'internet zoeken'],
  googelen: ['google', 'zoeken', 'opzoeken', 'zoekmachine'],
  zoeken: ['google', 'googelen', 'opzoeken', 'vinden'],
  whatsapp: ['appen', 'berichten', 'chat'],
  wifi: ['wlan', 'internet', 'netwerk', 'draadloos'],
  mail: ['e-mail', 'email', 'post'],
  wachtwoord: ['pincode', 'inloggen', 'password'],
  oplichting: ['phishing', 'fraude', 'nep', 'veilig'],
  ai: ['chatgpt', 'kunstmatige intelligentie', 'intelligentie'],
  chatgpt: ['ai', 'chat gpt', 'openai', 'assistent'],
  foto: ['fotos', 'camera', 'afbeelding', 'galerij'],
  bellen: ['telefoon', 'videobellen', 'gesprek'],
};

export function normalizeSearchText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/['']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandQueryTerms(query: string): string[] {
  const base = normalizeSearchText(query).split(' ').filter(Boolean);
  const terms = new Set(base);

  for (const word of base) {
    for (const [key, values] of Object.entries(SYNONYMS)) {
      if (word.includes(key) || key.includes(word)) {
        terms.add(key);
        values.forEach((v) => terms.add(normalizeSearchText(v)));
      }
    }
  }

  return [...terms];
}

function scoreItem(item: SiteSearchItem, terms: string[]): number {
  if (terms.length === 0) return 1;

  const title = normalizeSearchText(item.title);
  const desc = normalizeSearchText(item.description);
  const keywords = (item.keywords ?? []).map(normalizeSearchText);
  const haystack = [title, desc, ...keywords].join(' ');

  let score = 0;

  for (const term of terms) {
    if (!term) continue;
    if (title === term) score += 30;
    else if (title.includes(term)) score += 20;
    if (keywords.some((k) => k === term || k.includes(term) || term.includes(k))) score += 15;
    if (desc.includes(term)) score += 8;
    if (haystack.includes(term)) score += 4;
    // losse woorden in query
    const parts = term.split(' ').filter((p) => p.length >= 3);
    for (const part of parts) {
      if (haystack.includes(part)) score += 3;
    }
  }

  return score;
}

export function searchSite(query: string): SiteSearchItem[] {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) {
    return SITE_SEARCH_INDEX.slice(0, 12);
  }

  const scored = SITE_SEARCH_INDEX
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const unique: SiteSearchItem[] = [];
  for (const { item } of scored) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    unique.push(item);
  }

  return unique;
}

export const SEARCH_SUGGESTIONS = [
  'Google',
  'googelen',
  'WhatsApp',
  'wifi',
  'ChatGPT',
  'oplichting',
  'wachtwoord',
  'foto',
  'e-mail',
  'bibliotheek',
  'lesmateriaal',
  'DigiD',
];
