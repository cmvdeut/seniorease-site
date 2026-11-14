import YoutubeWatchCta from '@/app/components/YoutubeWatchCta';
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtube-videos';

type UitlegGeenOnderwerpVideoCtaProps = {
  /** Korte onderwerpnaam, bijv. "Netflix" of "wifi" — voor de zin “nog geen aparte …-video”. */
  onderwerp: string;
};

/**
 * Eerlijke YouTube-CTA als er nog geen onderwerp-specifieke uitlegvideo is.
 * Linkt naar het kanaal — niet naar een Tips-playlist alsof die dit onderwerp dekt.
 */
export default function UitlegGeenOnderwerpVideoCta({ onderwerp }: UitlegGeenOnderwerpVideoCtaProps) {
  return (
    <YoutubeWatchCta
      description={`Er is nog geen aparte ${onderwerp}-video. Op ons YouTube-kanaal vindt u wel rustige uitleg over WhatsApp, veiligheid, foto’s en meer.`}
      href={YOUTUBE_CHANNEL_URL}
      linkLabel="Bekijk SeniorEase-video’s op YouTube"
    />
  );
}
