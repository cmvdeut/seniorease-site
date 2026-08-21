/** YouTube-video-ID's voor embeds op de website. Vul aan na publicatie via Blotato. */
export const YOUTUBE_VIDEOS = {
  watIsAi: 'oIpn7WSopy0',
  zoZietChatGptErUit: 'g_XX1jY6VkI',
  /** ChatGPT voor senioren — live op YouTube (19 jun 2026). */
  chatgptSenioren: 'B4-2r7ks4mg',
  /** Oplichting herkennen — 5 waarschuwingstekens (5 jul 2026). */
  oplichtingHerkennen: 'uprzSjDAeUg',
  /** Betere foto's maken — NotebookLM instructievideo (6 jul 2026). */
  fotosMaken: '4yEKPemRm6U',
  /** Videobellen via WhatsApp — NotebookLM instructievideo (6 jul 2026). */
  videobellen: 'hxIVYqSSflU',
  /** Google Maps — NotebookLM instructievideo (6 jul 2026). */
  googleMaps: 'QYKisb9t5gg',
} as const;

/** Metadata voor VideoObject + YouTube Studio checklist. */
export const YOUTUBE_VIDEO_META: Record<
  keyof typeof YOUTUBE_VIDEOS,
  { name: string; description: string; uploadDate: string; path: string }
> = {
  watIsAi: {
    name: 'Wat is AI? Uitleg voor senioren',
    description:
      'Wat is kunstmatige intelligentie in gewone taal? Rustige uitleg voor beginners.',
    uploadDate: '2026-06-01',
    path: '/wat-is-ai',
  },
  zoZietChatGptErUit: {
    name: 'Zo ziet ChatGPT eruit — korte rondleiding',
    description: 'Hoe ziet het ChatGPT-scherm eruit? Kort en duidelijk voor senioren.',
    uploadDate: '2026-06-10',
    path: '/wat-is-ai/chatgpt',
  },
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

/** Pagina-pad → YouTube (video, playlist of kanaal). */
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
    kind: 'playlist',
    id: 'whatsapp',
    label: 'Bekijk WhatsApp-video’s',
  },
  '/digitale-hulp/whatsapp-uitleg-beginners': {
    kind: 'playlist',
    id: 'whatsapp',
    label: 'Bekijk WhatsApp-video’s',
  },
  '/digitale-hulp/whatsapp-fotos-opslaan': {
    kind: 'playlist',
    id: 'whatsapp',
    label: 'Bekijk WhatsApp-video’s',
  },
  '/digitale-hulp/googelen-google-zoeken': {
    kind: 'playlist',
    id: 'tips',
    label: 'Bekijk Tips & Tricks-video’s',
  },
  '/digitale-hulp/veilig-internet': {
    kind: 'video',
    id: 'oplichtingHerkennen',
    label: 'Bekijk de video over oplichting',
  },
  '/digitale-hulp/ai': { kind: 'playlist', id: 'ai', label: 'Bekijk AI-video’s' },
  '/wat-is-ai': { kind: 'playlist', id: 'ai', label: 'Bekijk AI-video’s' },
  '/wat-is-ai/chatgpt': { kind: 'video', id: 'chatgptSenioren', label: 'Bekijk de ChatGPT-video' },
  '/uitleg/wifi': {
    kind: 'playlist',
    id: 'tips',
    label: 'Bekijk Tips & Tricks-video’s',
  },
  '/uitleg/qr-code': {
    kind: 'playlist',
    id: 'tips',
    label: 'Bekijk Tips & Tricks-video’s',
  },
  '/uitleg/digid': {
    kind: 'playlist',
    id: 'tips',
    label: 'Bekijk Tips & Tricks-video’s',
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
