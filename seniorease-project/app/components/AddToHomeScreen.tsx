'use client';

import { useEffect, useState } from 'react';

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/** Chrome/Firefox/Edge on iOS are not Safari — only Safari can add to home screen. */
function isIosSafari(): boolean {
  if (!isIos()) return false;
  const ua = navigator.userAgent;
  const isCriOS = /CriOS/i.test(ua);
  const isFxiOS = /FxiOS/i.test(ua);
  const isEdgiOS = /EdgiOS/i.test(ua);
  const isOPiOS = /OPiOS|OPT\//i.test(ua);
  return !isCriOS && !isFxiOS && !isEdgiOS && !isOPiOS;
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isLikelyDesktop(): boolean {
  if (typeof window === 'undefined') return true;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  return !coarse && !narrow;
}

/**
 * Helpt senioren de pagina op het beginscherm te zetten.
 * Android Chrome: één-tik install als de browser dat toestaat.
 * iPhone Safari: drie duidelijke stappen (Apple laat geen install-API toe).
 */
export default function AddToHomeScreen({
  label = 'Zet op beginscherm',
}: {
  label?: string;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);
  const [iosSafari, setIosSafari] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStandalone(isStandalone());
    setIos(isIos());
    setIosSafari(isIosSafari());
    setDesktop(isLikelyDesktop());
    setReady(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as InstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (!ready) {
    return <div className="min-h-[56px]" aria-hidden />;
  }

  if (standalone) {
    return (
      <p className="text-senior-sm text-navy font-semibold text-center m-0">
        Staat al op uw beginscherm.
      </p>
    );
  }

  if (desktop) {
    return (
      <p className="text-senior-sm text-navy/75 text-center leading-relaxed m-0">
        Open deze pagina op uw telefoon om hem daar te zetten.
      </p>
    );
  }

  if (ios && !iosSafari) {
    return (
      <div className="space-y-4">
        <p className="text-senior-sm text-navy leading-relaxed text-center m-0">
          Open deze pagina in <strong>Safari</strong> (niet Chrome). Alleen Safari kan Afvinken op
          het beginscherm zetten.
        </p>
        <button
          type="button"
          onClick={() => void copyLink()}
          className="w-full min-h-touch rounded-full bg-gold hover:bg-gold-light text-white font-semibold text-senior-sm transition-colors"
        >
          {copied ? 'Link gekopieerd' : 'Kopieer link'}
        </button>
      </div>
    );
  }

  if (ios && iosSafari) {
    return (
      <ol className="m-0 p-0 list-none space-y-4">
        <li className="flex gap-4 items-start">
          <span
            className="flex-shrink-0 w-11 h-11 rounded-full bg-navy text-white font-bold text-senior-base flex items-center justify-center"
            aria-hidden
          >
            1
          </span>
          <p className="text-senior-sm text-navy leading-relaxed m-0 pt-2">
            Tik op <strong>Deel</strong> onderaan (vierkantje met pijltje omhoog □↑)
          </p>
        </li>
        <li className="flex gap-4 items-start">
          <span
            className="flex-shrink-0 w-11 h-11 rounded-full bg-navy text-white font-bold text-senior-base flex items-center justify-center"
            aria-hidden
          >
            2
          </span>
          <p className="text-senior-sm text-navy leading-relaxed m-0 pt-2">
            Kies <strong>Zet op beginscherm</strong>
          </p>
        </li>
        <li className="flex gap-4 items-start">
          <span
            className="flex-shrink-0 w-11 h-11 rounded-full bg-navy text-white font-bold text-senior-base flex items-center justify-center"
            aria-hidden
          >
            3
          </span>
          <p className="text-senior-sm text-navy leading-relaxed m-0 pt-2">
            Tik op <strong>Voeg toe</strong>
          </p>
        </li>
      </ol>
    );
  }

  // Android / andere: native prompt of korte fallback
  if (deferredPrompt) {
    return (
      <button
        type="button"
        onClick={() => void handleInstall()}
        className="w-full min-h-touch rounded-full bg-gold hover:bg-gold-light text-white font-semibold text-senior-sm transition-colors touch-manipulation"
      >
        {label}
      </button>
    );
  }

  return (
    <p className="text-senior-sm text-navy leading-relaxed text-center m-0">
      Tik op de <strong>drie puntjes</strong> rechtsboven →{' '}
      <strong>Installeren en snelkoppelingen</strong> →{' '}
      <strong>App installeren</strong> of <strong>Toevoegen aan beginscherm</strong>.
    </p>
  );
}
