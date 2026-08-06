import { getYoutubeForPath, YOUTUBE_CHANNEL_URL, type YoutubeLink } from '@/lib/youtube-videos';

type YoutubeHintProps = {
  /** Pagina-pad, bijv. /uitleg/google-maps */
  path?: string;
  /** Of toon een vaste link (kanaal / playlist) */
  link?: YoutubeLink;
  className?: string;
};

/**
 * Compacte YouTube-verwijzing — alleen tonen als er een filmpje/playlist is.
 */
export default function YoutubeHint({ path, link, className = '' }: YoutubeHintProps) {
  const resolved = link ?? (path ? getYoutubeForPath(path) : null);
  if (!resolved) return null;

  return (
    <a
      href={resolved.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-gold font-semibold text-senior-sm hover:text-gold-light ${className}`}
    >
      <span aria-hidden>▶</span>
      {resolved.label}
    </a>
  );
}

export function YoutubeChannelCta({
  title = 'Liever kijken dan lezen?',
  description = 'Op ons YouTube-kanaal staan rustige uitlegvideo’s — in uw eigen tempo.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9 max-w-2xl">
      <h2 className="font-serif text-navy text-senior-lg font-semibold mb-2">{title}</h2>
      <p className="text-navy/75 text-senior-sm mb-6 leading-relaxed">{description}</p>
      <a
        href={YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-h-touch px-8 py-3 font-semibold text-white bg-gold hover:bg-gold-light rounded-full transition-colors text-senior-sm"
      >
        ▶ Naar YouTube
      </a>
    </div>
  );
}
