/**
 * YouTube-video-ID's voor embeds op de website.
 * Alleen IDs die live via oEmbed bevestigd zijn — geen placeholders.
 * Ontbrekende onderwerpen (wifi, qr, …): géén Tips-playlist als “valse” video-CTA.
 */
export const YOUTUBE_VIDEOS = {
  /** ChatGPT voor senioren. */
  chatgptSenioren: 'B4-2r7ks4mg',
  /** Oplichting herkennen — 5 waarschuwingstekens. */
  oplichtingHerkennen: 'uprzSjDAeUg',
  /** Betere foto's maken. */
  fotosMaken: '4yEKPemRm6U',
  /** Videobellen via WhatsApp. */
  videobellen: 'hxIVYqSSflU',
  /** Google Maps. */
  googleMaps: 'QYKisb9t5gg',
  /**
   * WhatsApp-intro (eerste stappen).
   * Bron: contentplan — watch?v=DZBGAk_mlwE
   */
  whatsappIntro: 'DZBGAk_mlwE',
  /** WhatsApp foto's versturen (playlist WhatsApp). */
  whatsappFotos: 'evL2RaD7I9c',
  /** WhatsApp berichten versturen. */
  whatsappBerichten: 'ATVtWbjFHrg',
  /** WhatsApp bellen (audio). */
  whatsappBellen: 'ENBI4mk3M-Y',
  /** Veilig WhatsApp gebruiken. */
  whatsappVeilig: '84zdE_gKUNg',
  /** Googelen voor beginners. */
  googelen: 'yaEL4vD5uo8',
  /** Foto Archief — wie staat waar op de foto? */
  fotoArchief: 'F2SAvnGs0uI',
} as const;

/** Metadata voor VideoObject + YouTube Studio checklist. */
export const YOUTUBE_VIDEO_META: Record<
  keyof typeof YOUTUBE_VIDEOS,
  { name: string; description: string; uploadDate: string; path: string }
> = {
  chatgptSenioren: {
    name: 'ChatGPT voor senioren — stap voor stap',
    description:
      'ChatGPT gebruiken zonder jargon: wat het is, hoe u begint, en waar u op let.',
    uploadDate: '2026-06-19',
    path: '/wat-is-ai/chatgpt',
  },
  oplichtingHerkennen: {
    name: 'Oplichting herkennen — 5 waarschuwingstekens',
    description:
      'Vijf signalen van phishing en WhatsApp-oplichting. Rustige uitleg zodat u veilig blijft.',
    uploadDate: '2026-07-05',
    path: '/uitleg/veiligheid',
  },
  fotosMaken: {
    name: "Betere foto's maken met uw smartphone — 5 tips",
    description:
      "Mooiere foto's met licht, stilhouden en eenvoudige tips. Geen technische kennis nodig.",
    uploadDate: '2026-07-06',
    path: '/uitleg/fotos-maken',
  },
  videobellen: {
    name: 'Videobellen via WhatsApp — uitleg voor senioren',
    description:
      'Familie zien terwijl u belt: WhatsApp-videogesprek starten, stap voor stap.',
    uploadDate: '2026-07-06',
    path: '/uitleg/videobellen',
  },
  googleMaps: {
    name: 'Waar ben ik nu? Google Maps locatie en route',
    description:
      'Zie waar u bent op de kaart, zoek een adres en vraag de route. Rustige uitleg voor senioren.',
    uploadDate: '2026-07-06',
    path: '/uitleg/google-maps',
  },
  whatsappIntro: {
    name: 'WhatsApp uitleg voor beginners — eerste stappen',
    description:
      'WhatsApp openen en de eerste stappen. Rustige uitleg voor wie net begint.',
    uploadDate: '2026-06-18',
    path: '/uitleg/whatsapp-basis',
  },
  whatsappFotos: {
    name: "WhatsApp foto's versturen — stap voor stap",
    description: "Foto kiezen en versturen via WhatsApp, rustig uitgelegd.",
    uploadDate: '2026-06-20',
    path: '/digitale-hulp/whatsapp-fotos-opslaan',
  },
  whatsappBerichten: {
    name: 'WhatsApp berichten versturen — stap voor stap',
    description: 'Een tekstbericht typen en versturen in WhatsApp.',
    uploadDate: '2026-06-20',
    path: '/digitale-hulp/whatsapp-uitleg-beginners',
  },
  whatsappBellen: {
    name: 'Bellen met WhatsApp — gratis bellen uitgelegd',
    description: 'Gratis bellen via WhatsApp met wifi of data.',
    uploadDate: '2026-06-21',
    path: '/digitale-hulp/whatsapp-videobellen-uitleg',
  },
  whatsappVeilig: {
    name: 'Veilig WhatsApp gebruiken — tips tegen oplichting',
    description: 'Veilig blijven in WhatsApp: geen vreemde links, geen geld verzoeken.',
    uploadDate: '2026-06-22',
    path: '/digitale-hulp/veilig-internet',
  },
  googelen: {
    name: 'Googelen voor beginners — zo zoekt u op Google',
    description: 'Rustig zoeken op Google: trefwoorden, resultaten lezen, veilig klikken.',
    uploadDate: '2026-07-01',
    path: '/digitale-hulp/googelen-google-zoeken',
  },
  fotoArchief: {
    name: 'Foto Archief — wie staat waar op de foto?',
    description: 'Namen op groepsfoto’s: kort wat Foto Archief doet, voor senioren.',
    uploadDate: '2026-08-01',
    path: '/foto-archief',
  },
};

/** YouTube-playlist-ID's voor links op de website. */
export const YOUTUBE_PLAYLISTS = {
  ai: 'PLw97JnScZym-GYObZWKuAbfzRe_Mx2Jej',
  whatsapp: 'PLw97JnScZym_83xf1Ypz_npeXj308wRN6',
  tips: 'PLw97JnScZym8Ae4tlW7j38EfvMKMRIBem',
} as const;

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';

export function youtubePlaylistUrl(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

export function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

type YoutubeRef =
  | { kind: 'video'; id: keyof typeof YOUTUBE_VIDEOS; label?: string }
  | { kind: 'playlist'; id: keyof typeof YOUTUBE_PLAYLISTS; label?: string }
  | { kind: 'channel'; label?: string };

/**
 * Pagina-pad → YouTube (video, playlist of kanaal).
 * Alleen echte, passende content — geen Tips-playlist “omdat er iets moet”.
 */
const YOUTUBE_BY_PATH: Record<string, YoutubeRef> = {
  '/uitleg/google-maps': { kind: 'video', id: 'googleMaps', label: 'Bekijk de Google Maps-video' },
  '/uitleg/videobellen': { kind: 'video', id: 'videobellen', label: 'Bekijk de videobellen-video' },
  '/uitleg/fotos-maken': { kind: 'video', id: 'fotosMaken', label: "Bekijk de foto's-video" },
  '/uitleg/veiligheid': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/uitleg/whatsapp-basis': {
    kind: 'video',
    id: 'whatsappIntro',
    label: 'Bekijk video',
  },
  '/digitale-hulp/whatsapp-uitleg-beginners': {
    kind: 'playlist',
    id: 'whatsapp',
    label: 'Bekijk WhatsApp-video’s',
  },
  '/digitale-hulp/whatsapp-fotos-opslaan': {
    kind: 'video',
    id: 'whatsappFotos',
    label: "Bekijk de WhatsApp-foto's-video",
  },
  '/digitale-hulp/whatsapp-videobellen-uitleg': {
    kind: 'video',
    id: 'videobellen',
    label: 'Bekijk de videobellen-video',
  },
  '/digitale-hulp/googelen-google-zoeken': {
    kind: 'video',
    id: 'googelen',
    label: 'Bekijk de Googelen-video',
  },
  '/digitale-hulp/veilig-internet': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/digitale-hulp/phishing-herkennen': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/digitale-hulp/phishing-mail-herkennen': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/digitale-hulp/wat-is-ai-simpel-uitgelegd': {
    kind: 'playlist',
    id: 'ai',
    label: 'Bekijk AI-video’s',
  },
  '/digitale-hulp/fotos-kwijt-telefoon': {
    kind: 'video',
    id: 'fotosMaken',
    label: "Bekijk de foto's-video",
  },
  '/digitale-hulp/ai': { kind: 'playlist', id: 'ai', label: 'Bekijk AI-video’s' },
  '/wat-is-ai': { kind: 'playlist', id: 'ai', label: 'Bekijk AI-video’s' },
  '/wat-is-ai/chatgpt': { kind: 'video', id: 'chatgptSenioren', label: 'Bekijk video' },
  '/wat-is-ai/zo-ziet-het-eruit': {
    kind: 'video',
    id: 'chatgptSenioren',
    label: 'Bekijk de ChatGPT-video',
  },
  '/uitleg/digid': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/foto-archief': {
    kind: 'video',
    id: 'fotoArchief',
    label: 'Bekijk de Foto Archief-video',
  },
  '/uitleg/youtube-tv': {
    kind: 'channel',
    label: 'Bekijk SeniorEase-video’s op YouTube',
  },
  '/bibliotheek': { kind: 'channel', label: 'Bekijk Bibliotheek-video’s op YouTube' },
  '/uitlegvideo': { kind: 'channel', label: 'Bekijk uitlegvideo’s op YouTube' },
};

export type YoutubeLink = {
  href: string;
  label: string;
};

/** Onderwerp-specifieke video (embed). Playlist/kanaal tellen niet mee. */
export function getTopicVideoId(path: string): keyof typeof YOUTUBE_VIDEOS | null {
  const ref = YOUTUBE_BY_PATH[path];
  if (!ref || ref.kind !== 'video') return null;
  return ref.id;
}

/**
 * Themaknop “Bekijk video” — alleen bij passende video op de onderwerppagina.
 * Linkt naar #uitleg-video (geen lege knop, geen ongerelateerde tips-playlist).
 */
export function getTopicVideoThemeCta(path: string): YoutubeLink | null {
  if (!getTopicVideoId(path)) return null;
  return {
    href: `${path}#uitleg-video`,
    label: 'Bekijk video',
  };
}

export function getYoutubeForPath(path: string): YoutubeLink | null {
  const ref = YOUTUBE_BY_PATH[path];
  if (!ref) return null;

  if (ref.kind === 'video') {
    return {
      href: youtubeWatchUrl(YOUTUBE_VIDEOS[ref.id]),
      label: ref.label ?? 'Bekijk de video op YouTube',
    };
  }
  if (ref.kind === 'playlist') {
    return {
      href: youtubePlaylistUrl(YOUTUBE_PLAYLISTS[ref.id]),
      label: ref.label ?? 'Bekijk de video’s op YouTube',
    };
  }
  return {
    href: YOUTUBE_CHANNEL_URL,
    label: ref.label ?? 'Bekijk video’s op YouTube',
  };
}
