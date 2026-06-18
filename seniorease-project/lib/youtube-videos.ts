/** YouTube-video-ID's voor embeds op de website. Vul aan na publicatie via Blotato. */
export const YOUTUBE_VIDEOS = {
  watIsAi: "oIpn7WSopy0",
  zoZietChatGptErUit: "g_XX1jY6VkI",
  /** ChatGPT voor senioren — live op YouTube (19 jun 2026). */
  chatgptSenioren: "B4-2r7ks4mg",
} as const;

/** YouTube-playlist-ID's voor links op de website. */
export const YOUTUBE_PLAYLISTS = {
  ai: "PLw97JnScZym-GYObZWKuAbfzRe_Mx2Jej",
  whatsapp: "PLw97JnScZym_83xf1Ypz_npeXj308wRN6",
} as const;

export function youtubePlaylistUrl(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}
