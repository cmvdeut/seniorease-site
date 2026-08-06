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
