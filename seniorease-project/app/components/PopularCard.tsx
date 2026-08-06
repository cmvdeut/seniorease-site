import Link from 'next/link';
import YoutubeHint from '@/app/components/YoutubeHint';
import { getYoutubeForPath } from '@/lib/youtube-videos';

type PopularCardProps = {
  title: string;
  href: string;
  description: string;
};

/**
 * Meest-bekeken kaart met optionele YouTube-link (geen geneste anchors).
 */
export default function PopularCard({ title, href, description }: PopularCardProps) {
  const youtube = getYoutubeForPath(href);

  return (
    <div className="bg-paper rounded-senior border border-navy/8 p-6 min-h-touch hover:border-gold/40 transition-colors group flex flex-col">
      <Link href={href} className="flex-1">
        <h3 className="font-serif text-navy text-senior-base font-semibold mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-navy/65 text-senior-sm leading-relaxed">{description}</p>
        <span className="inline-block mt-4 text-gold font-semibold text-senior-sm">Openen →</span>
      </Link>
      {youtube && (
        <div className="mt-4 pt-4 border-t border-navy/10">
          <YoutubeHint path={href} />
        </div>
      )}
    </div>
  );
}
