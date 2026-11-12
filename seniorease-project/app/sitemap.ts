import { MetadataRoute } from 'next';
import { artikelen } from './digitale-hulp/artikelen';
import { LESMATERIAAL_PAKKETTEN } from './lesmateriaal/lesmateriaal-data';
import { SITE_URL } from '@/lib/seo';

/**
 * lastmod per inhoudsgroep — gebaseerd op aantoonbare contentwijzigingen
 * (git-commits van de primaire bronbestanden; GEO-rondes F1–F12 op 2026-11-12
 * alleen voor pagina's die toen inhoudelijk/schema zijn bijgewerkt).
 * Geen globale “vandaag”-datum voor alle URL’s.
 */
const LM = {
  /** Site redesign / tools go-live */
  toolsGoLive: new Date('2026-08-07'),
  /** Homepage hybrid / trust strip */
  homeLegacy: new Date('2026-08-06'),
  /** SEO/GEO canonicals, llms/ai, EN, kijk-en-help */
  seoGeoJuly: new Date('2026-07-18'),
  /** Oudere support-/extras-pagina’s */
  earlySite: new Date('2026-07-10'),
  uitlegvideo: new Date('2026-07-05'),
  kalender: new Date('2026-07-31'),
  /** Lesmateriaal begeleiders/woordenlijst */
  lesmateriaalSupport: new Date('2026-08-29'),
  beamer: new Date('2026-09-13'),
  /** Digitale-hulp / wat-is-ai / uitleg GEO */
  geoTrustSep: new Date('2026-09-14'),
  /** ChatGPT lesmateriaal shop (eerste live-inhoud) — later schema-update zie geoRound */
  chatgptContent: new Date('2026-09-30'),
  /** EaseWorks legal / contact / over-ons footer */
  legalNov: new Date('2026-11-06'),
  /** Lesmateriaal hub + pakketpagina’s (titels/checkout) */
  lesmateriaalNov: new Date('2026-11-08'),
  /** GEO/AEO-rondes F1–F12 (merk, schema, FAQ, CollectionPage, voorwaarden) */
  geoRound: new Date('2026-11-12'),
} as const;

function entry(
  path: string,
  priority: number,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const artikelUrls = artikelen.map((artikel) =>
    entry(`/digitale-hulp/${artikel.slug}`, 0.8, LM.geoTrustSep),
  );

  const uitlegSlugs = [
    'whatsapp-basis', 'whatsapp-deel2', 'whatsapp-deel3', 'videobellen',
    'veiligheid', 'wachtwoorden', 'fotos-maken', 'fotos-ordenen',
    'fotos-naar-computer', 'email-bijlage', 'bestanden-vinden',
    'computer-traag', 'screenshot-pc', 'letters-groter-pc',
    'programma-installeren', 'digid', 'online-bankieren', 'ebooks',
    'muziek-radio', 'qr-code', 'google-maps', 'e-bike', 'hoofdtelefoon',
    'wifi', 'inspreken', 'betalen-ov', 'google-translate', '9292',
    'bol-com', 'boodschappen-bestellen', 'online-retourneren', 'mobiel-parkeren',
    'zoom', 'facetime', 'netflix', 'npo-start', 'youtube-tv',
  ];

  const uitlegUrls = uitlegSlugs.map((slug) =>
    entry(`/uitleg/${slug}`, 0.9, LM.geoTrustSep),
  );

  const animatieSlugs = [
    'bibliotheek', 'rekenmachine', 'kalender', 'klok', 'puzzel', 'afvinken',
  ];

  return [
    entry('/', 1, LM.geoRound, 'weekly'),
    entry('/en', 0.5, LM.seoGeoJuly, 'monthly'),
    entry('/en/bibliotheek', 0.4, LM.seoGeoJuly, 'monthly'),
    entry('/uitleg', 0.9, LM.toolsGoLive, 'weekly'),
    ...uitlegUrls,
    entry('/digitale-hulp', 0.9, LM.geoTrustSep, 'weekly'),
    entry('/digitale-hulp/smartphone', 0.85, LM.geoTrustSep),
    entry('/digitale-hulp/computer', 0.85, LM.geoTrustSep),
    entry('/digitale-hulp/internet-email', 0.85, LM.geoTrustSep),
    entry('/digitale-hulp/veilig-internet', 0.85, LM.geoTrustSep),
    entry('/digitale-hulp/ai', 0.85, LM.geoTrustSep),
    ...artikelUrls,
    entry('/wat-is-ai', 0.9, LM.geoTrustSep),
    entry('/wat-is-ai/chatgpt', 0.9, LM.geoTrustSep),
    entry('/wat-is-ai/uitproberen', 0.6, LM.geoTrustSep),
    entry('/wat-is-ai/prompts', 0.6, LM.geoTrustSep),
    entry('/wat-is-ai/zo-ziet-het-eruit', 0.6, LM.geoTrustSep),
    entry('/bibliotheek', 0.9, LM.toolsGoLive, 'weekly'),
    entry('/rekenmachine', 0.8, LM.toolsGoLive),
    entry('/kalender', 0.8, LM.kalender),
    entry('/klok', 0.8, LM.toolsGoLive),
    entry('/puzzels', 0.7, LM.toolsGoLive, 'daily'),
    entry('/afvinken', 0.7, LM.toolsGoLive),
    entry('/tools', 0.8, LM.toolsGoLive),
    entry('/lesmateriaal', 0.9, LM.geoRound, 'weekly'),
    ...LESMATERIAAL_PAKKETTEN.map((p) =>
      entry(`/lesmateriaal/${p.slug}`, 0.85, LM.geoRound),
    ),
    entry('/lesmateriaal/chatgpt', 0.85, LM.geoRound, 'weekly'),
    entry('/lesmateriaal/begeleiders', 0.75, LM.lesmateriaalSupport),
    entry('/lesmateriaal/interessepeiling', 0.6, LM.lesmateriaalNov),
    entry('/lesmateriaal/woordenlijst', 0.7, LM.lesmateriaalSupport),
    entry('/lesmateriaal/beamer', 0.65, LM.beamer),
    // noindex-pagina's (bedankt, /oefenen/*) bewust niet in sitemap
    entry('/kijk-en-help', 0.95, LM.seoGeoJuly, 'weekly'),
    entry('/extras', 0.7, LM.earlySite),
    entry('/hobbys', 0.7, LM.seoGeoJuly),
    entry('/foto-archief', 0.6, LM.seoGeoJuly),
    entry('/animaties', 0.6, LM.earlySite),
    ...animatieSlugs.map((slug) => entry(`/animaties/${slug}`, 0.5, LM.earlySite)),
    entry('/contact', 0.6, LM.legalNov),
    entry('/over-ons', 0.7, LM.geoRound, 'yearly'),
    entry('/hulp', 0.7, LM.earlySite),
    entry('/zo-werkt-het', 0.7, LM.earlySite),
    entry('/nuttige-links', 0.7, LM.earlySite),
    entry('/download', 0.7, LM.seoGeoJuly),
    entry('/privacy', 0.3, LM.geoRound, 'yearly'),
    entry('/voorwaarden', 0.3, LM.geoRound, 'yearly'),
    entry('/uitlegvideo', 0.6, LM.uitlegvideo),
  ];
}
