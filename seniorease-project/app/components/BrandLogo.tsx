'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

/** Sip-kijkend hart — homepage */
export const LOGO_SIP = '/heart-logo.png';
/** Lachend hart — hulppagina's en overige */
export const LOGO_SMILE = '/heart-logo-smile.png';

/** Homepage = sip; hulp & overige = lachend. */
export function brandLogoSrc(pathname: string) {
  if (pathname === '/') return LOGO_SIP;
  return LOGO_SMILE;
}

type BrandLogoProps = {
  size?: number;
  className?: string;
  /** Forceer een variant (negeert pathname) */
  variant?: 'sip' | 'smile';
};

export default function BrandLogo({ size = 36, className = '', variant }: BrandLogoProps) {
  const pathname = usePathname() ?? '/';
  const src =
    variant === 'sip'
      ? LOGO_SIP
      : variant === 'smile'
        ? LOGO_SMILE
        : brandLogoSrc(pathname);

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      priority={pathname === '/'}
      aria-hidden
    />
  );
}
