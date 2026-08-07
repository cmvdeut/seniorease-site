import type { ReactNode } from 'react';

type BadgeSize = 'sm' | 'md';

const box: Record<BadgeSize, string> = {
  sm: 'h-8 w-8 sm:h-9 sm:w-9 rounded-lg',
  md: 'h-12 w-12 sm:h-14 sm:w-14 rounded-xl',
};

const icon: Record<BadgeSize, string> = {
  sm: 'h-4 w-4 sm:h-5 sm:w-5',
  md: 'h-7 w-7 sm:h-8 sm:w-8',
};

export function GoogleBadge({ size = 'sm' }: { size?: BadgeSize }) {
  return (
    <span
      className={`flex ${box[size]} items-center justify-center bg-paper/90 shadow-sm`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className={icon[size]}>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </span>
  );
}

export function WhatsAppBadge({ size = 'sm' }: { size?: BadgeSize }) {
  return (
    <span
      className={`flex ${box[size]} items-center justify-center bg-[#25D366]/90 shadow-sm`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className={`${icon[size]} fill-white`}>
        <path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.8 3 .7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1 0-.3-.1-.6-.2z" />
        <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
    </span>
  );
}

export function ShieldBadge({ size = 'sm' }: { size?: BadgeSize }) {
  return (
    <span
      className={`flex ${box[size]} items-center justify-center bg-[#2B6CB0]/90 shadow-sm`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className={icon[size]} fill="none">
        <path
          d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z"
          fill="#E8F1FB"
          stroke="white"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="11" r="3.2" stroke="#2B6CB0" strokeWidth="1.5" fill="none" />
        <path
          d="M12 8.5v5M9.5 11h5"
          stroke="#2B6CB0"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function MailBadge({ size = 'sm' }: { size?: BadgeSize }) {
  return (
    <span
      className={`flex ${box[size]} items-center justify-center bg-[#3B82F6]/90 shadow-sm`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className={icon[size]} fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" fill="white" />
        <path
          d="M4 8l8 5 8-5"
          stroke="#3B82F6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function DigiDBadge({ size = 'sm' }: { size?: BadgeSize }) {
  return (
    <span
      className={`flex ${box[size]} items-center justify-center bg-[#0B5C8A]/90 shadow-sm`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className={icon[size]} fill="none">
        <rect x="4" y="5" width="16" height="14" rx="2" fill="white" />
        <path
          d="M8 10h8M8 13h5"
          stroke="#0B5C8A"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="13.5" r="1.5" fill="#0B5C8A" />
      </svg>
    </span>
  );
}

/** Badge bij slug of pad — voor homepage-kaarten én artikelpagina’s */
export function getGuideBadge(
  slugOrPath: string,
  size: BadgeSize = 'sm',
): ReactNode | null {
  const key = slugOrPath
    .replace(/^\/digitale-hulp\//, '')
    .replace(/^\/uitleg\//, '')
    .replace(/\/$/, '');
  switch (key) {
    case 'googelen-google-zoeken':
      return <GoogleBadge size={size} />;
    case 'whatsapp-uitleg-beginners':
    case 'whatsapp-basis':
      return <WhatsAppBadge size={size} />;
    case 'veilig-internet':
    case 'veiligheid':
      return <ShieldBadge size={size} />;
    case 'e-mail-openen':
      return <MailBadge size={size} />;
    case 'digid':
      return <DigiDBadge size={size} />;
    default:
      return null;
  }
}
