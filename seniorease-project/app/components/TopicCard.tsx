import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';

export type TopicCardProps = {
  title: string;
  href: string;
  imageUrl?: string;
  /** Geïllustreerd icoon zonder foto (tools) — kleiner, lager, iets doorzichtig */
  illustrationUrl?: string;
  illustrationBg?: string;
  /** Fallback Lucide-icoon */
  Icon?: LucideIcon;
  iconBg?: string;
  /** Optioneel icoon bovenop de foto (gidsen) */
  overlay?: ReactNode;
};

export default function TopicCard({
  title,
  href,
  imageUrl,
  illustrationUrl,
  illustrationBg = '#F3EDE4',
  Icon,
  iconBg = '#F3EDE4',
  overlay,
}: TopicCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      {imageUrl ? (
        <div className="relative aspect-[5/4] w-full bg-cream shrink-0">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 40vw, 180px"
          />
          {overlay && (
            <span
              className="absolute inset-x-0 bottom-[18%] flex justify-center pointer-events-none opacity-70 group-hover:opacity-85 transition-opacity"
              aria-hidden
            >
              <span className="drop-shadow-sm group-hover:scale-105 transition-transform">
                {overlay}
              </span>
            </span>
          )}
        </div>
      ) : illustrationUrl ? (
        <div
          className="relative aspect-[5/4] w-full shrink-0 flex items-end justify-center pb-[18%]"
          style={{ background: illustrationBg }}
        >
          <Image
            src={illustrationUrl}
            alt=""
            width={56}
            height={56}
            className="object-contain opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>
      ) : Icon ? (
        <div
          className="aspect-[5/4] w-full flex items-end justify-center pb-[18%] shrink-0"
          style={{ background: iconBg }}
        >
          <Icon
            size={36}
            strokeWidth={1.5}
            className="text-navy opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all"
            aria-hidden
          />
        </div>
      ) : (
        <div className="aspect-[5/4] w-full bg-gold/30 shrink-0" />
      )}
      <span className="px-2.5 py-3.5 text-center font-semibold text-navy text-[0.95rem] sm:text-senior-xs leading-snug flex-1 flex items-center justify-center">
        {title}
      </span>
    </Link>
  );
}
