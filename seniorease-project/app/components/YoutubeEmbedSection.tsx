import {
  YOUTUBE_PLAYLISTS,
  youtubeEmbedUrl,
  youtubePlaylistUrl,
  youtubeWatchUrl,
} from '@/lib/youtube-videos';

type YoutubeEmbedSectionProps = {
  videoId: string;
  title: string;
  caption?: string;
  playlistKey?: keyof typeof YOUTUBE_PLAYLISTS;
  playlistLabel?: string;
};

/**
 * Uitlegvideo-embed + optionele playlist-CTA (YouTube ↔ site-brug).
 */
export default function YoutubeEmbedSection({
  videoId,
  title,
  caption = 'Bekijk de uitlegvideo of lees verder voor de stappen op deze pagina',
  playlistKey = 'tips',
  playlistLabel = 'Bekijk de Tips & Tricks-playlist',
}: YoutubeEmbedSectionProps) {
  return (
    <section className="my-8 mx-4 sm:mx-0">
      <div className="max-w-3xl mx-auto rounded-xl overflow-hidden aspect-video bg-navy/5">
        <iframe
          width="100%"
          height="100%"
          src={youtubeEmbedUrl(videoId)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <p className="text-center text-navy/70 mt-4 text-senior-base">{caption}</p>
      <p className="text-center mt-2">
        <a
          href={youtubeWatchUrl(videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-senior-sm font-semibold text-gold hover:text-gold-light underline"
        >
          Open op YouTube
        </a>
      </p>
      <div className="max-w-3xl mx-auto mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-navy/10 bg-white">
        <div className="text-4xl" aria-hidden="true">
          ▶️
        </div>
        <div>
          <h3 className="text-senior-lg font-bold text-navy mb-1">Meer instructievideo&apos;s</h3>
          <p className="text-senior-base text-navy/70 mb-4">
            Rustige uitleg op YouTube — in uw eigen tempo.
          </p>
          <a
            href={youtubePlaylistUrl(YOUTUBE_PLAYLISTS[playlistKey])}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm text-gold border-navy/8 bg-cream"
          >
            {playlistLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
