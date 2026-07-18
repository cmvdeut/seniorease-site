import { MetadataRoute } from 'next';
import { artikelen } from './digitale-hulp/artikelen';
import { SITE_URL } from '@/lib/seo';

/** Stable lastmod — avoid “always today” on every build */
const LASTMOD = new Date('2026-07-18');

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: LASTMOD,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const artikelUrls = artikelen.map((artikel) =>
    entry(`/digitale-hulp/${artikel.slug}`, 0.8),
  );

  const uitlegSlugs = [
    'whatsapp-basis', 'whatsapp-deel2', 'whatsapp-deel3', 'videobellen',
    'veiligheid', 'wachtwoorden', 'fotos-maken', 'fotos-ordenen',
    'fotos-naar-computer', 'email-bijlage', 'bestanden-vinden',
    'computer-traag', 'screenshot-pc', 'letters-groter-pc',
    'programma-installeren', 'digid', 'online-bankieren', 'ebooks',
    'muziek-radio', 'qr-code', 'google-maps', 'e-bike', 'hoofdtelefoon',
    'wifi', 'inspreken', 'betalen-ov', 'google-translate', '9292',
    'bol-com', 'boodschappen-bestellen', 'online-retourneren',
    'zoom', 'facetime', 'netflix', 'npo-start', 'youtube-tv',
  ];

  const uitlegUrls = uitlegSlugs.map((slug) => entry(`/uitleg/${slug}`, 0.9));

  const animatieSlugs = [
    'bibliotheek', 'rekenmachine', 'kalender', 'klok', 'puzzel', 'afvinken',
  ];

  return [
    entry('/', 1, 'weekly'),
    entry('/en', 0.5, 'monthly'),
    entry('/en/bibliotheek', 0.4, 'monthly'),
    entry('/uitleg', 0.9, 'weekly'),
    ...uitlegUrls,
    entry('/digitale-hulp', 0.9, 'weekly'),
    entry('/digitale-hulp/smartphone', 0.85),
    entry('/digitale-hulp/computer', 0.85),
    entry('/digitale-hulp/internet-email', 0.85),
    entry('/digitale-hulp/veilig-internet', 0.85),
    entry('/digitale-hulp/ai', 0.85),
    ...artikelUrls,
    entry('/wat-is-ai', 0.9),
    entry('/wat-is-ai/chatgpt', 0.9),
    entry('/wat-is-ai/uitproberen', 0.6),
    entry('/wat-is-ai/prompts', 0.6),
    entry('/wat-is-ai/zo-ziet-het-eruit', 0.6),
    entry('/bibliotheek', 0.9, 'weekly'),
    entry('/rekenmachine', 0.8),
    entry('/kalender', 0.8),
    entry('/klok', 0.8),
    entry('/puzzels', 0.7, 'daily'),
    entry('/afvinken', 0.7),
    entry('/tools', 0.8),
    entry('/kijk-en-help', 0.95, 'weekly'),
    entry('/extras', 0.7),
    entry('/hobbys', 0.7),
    entry('/foto-archief', 0.6),
    entry('/animaties', 0.6),
    ...animatieSlugs.map((slug) => entry(`/animaties/${slug}`, 0.5)),
    entry('/contact', 0.6),
    entry('/over-ons', 0.7, 'yearly'),
    entry('/hulp', 0.7),
    entry('/zo-werkt-het', 0.7),
    entry('/nuttige-links', 0.7),
    entry('/download', 0.7),
    entry('/privacy', 0.3, 'yearly'),
    entry('/voorwaarden', 0.3, 'yearly'),
    entry('/uitlegvideo', 0.6),
  ];
}
