'use client';

import { useState, useEffect } from 'react';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Luister naar beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check of de app al geïnstalleerd is
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Toon de install prompt
    deferredPrompt.prompt();

    // Wacht op gebruiker response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('App geïnstalleerd');
    } else {
      console.log('Installatie geannuleerd');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleInstallClick}
        className="bg-primary text-white px-8 py-4 rounded-xl text-senior-base font-bold
                 shadow-xl hover:bg-primary-dark transition-all flex items-center gap-3
                 border-4 border-white"
      >
        <span className="text-2xl">📱</span>
        <span>Installeer als app</span>
      </button>
    </div>
  );
}

