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

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

/**
 * Helpt senioren de pagina op het beginscherm te zetten.
 * Android Chrome: echte install-knop als de browser dat toestaat.
 * iPhone: alleen via Safari + Deel → Zet op beginscherm.
 */
export default function AddToHomeScreen({
  label = 'Zet op beginscherm',
}: {
  label?: string;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setStandalone(isStandalone());
    setIos(isIos());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as InstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (standalone) {
    return (
      <p className="text-senior-sm text-green-800 text-center font-semibold">
        ✓ Dit staat al op uw beginscherm. Handig!
      </p>
    );
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="space-y-3">
      {deferredPrompt ? (
        <button
          type="button"
          onClick={handleInstall}
          className="w-full min-h-[56px] bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                     shadow-lg border-4 border-primary active:bg-primary-dark touch-manipulation"
        >
          📱 {label}
        </button>
      ) : null}

      {ios ? (
        <p className="text-senior-sm text-green-900 text-center leading-relaxed">
          Op iPhone/iPad moet u <strong>Safari</strong> gebruiken (niet Chrome).
          Tik onderaan op het <strong>deelknopje</strong> (□↑), kies{' '}
          <strong>Zet op beginscherm</strong>, en bevestig.
        </p>
      ) : !deferredPrompt ? (
        <p className="text-senior-sm text-green-900 text-center leading-relaxed">
          Tik op de <strong>drie puntjes</strong> rechtsboven in Chrome.
          Kies <strong>Installeren en snelkoppelingen</strong>, daarna{' '}
          <strong>App installeren</strong> of <strong>Toevoegen aan beginscherm</strong>.
        </p>
      ) : null}
    </div>
  );
}
