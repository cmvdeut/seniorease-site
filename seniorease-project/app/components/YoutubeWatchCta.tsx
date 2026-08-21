import {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_PLAYLISTS,
  youtubePlaylistUrl,
} from '@/lib/youtube-videos';

type YoutubeWatchCtaProps = {
  title?: string;
  description: string;
  href?: string;
  linkLabel: string;
};

/**
 * CTA naar YouTube (playlist of kanaal) als er nog geen passende embed-video is.
 */
export default function YoutubeWatchCta({
  title = 'Liever kijken dan lezen?',
  description,
  href,
  linkLabel,
}: YoutubeWatchCtaProps) {
  const target = href ?? YOUTUBE_CHANNEL_URL;

  return (
    <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="text-4xl" aria-hidden="true">
          ▶️
        </div>
        <div>
          <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">{title}</h2>
          <p className="text-senior-base text-navy/80 leading-relaxed mb-4">{description}</p>
          <a
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 border-2 text-gold border-navy/8 bg-cream hover:border-gold/40 transition-colors"
          >
            {linkLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function tipsPlaylistHref() {
  return youtubePlaylistUrl(YOUTUBE_PLAYLISTS.tips);
}

export function whatsappPlaylistHref() {
  return youtubePlaylistUrl(YOUTUBE_PLAYLISTS.whatsapp);
}
