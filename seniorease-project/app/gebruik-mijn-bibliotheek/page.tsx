'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GebruikMijnBibliotheekPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check of het een mobiel apparaat is
    const userAgent = navigator.userAgent;
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent) || 
                         (window.innerWidth <= 768 && window.innerHeight <= 1024);
    
    setIsMobile(isMobileDevice);
  }, []);

  // Als het een desktop is, redirect direct naar bibliotheek
  useEffect(() => {
    if (isMobile === false) {
      window.location.href = '/bibliotheek';
    }
  }, [isMobile]);

  // Loading state
  if (isMobile === null) {
    return (
      <main className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-senior-lg text-gray-700">Laden...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Gebruik Mijn Bibliotheek
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12 space-y-6">
            
            {/* Uitleg */}
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                U gebruikt Mijn Bibliotheek:
              </h2>
              <div className="space-y-3 text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                <p>• Gratis op de pc</p>
                <p>• Op telefoon of tablet eerst rustig proberen</p>
              </div>
            </div>

            {/* Demo knop */}
            <div className="text-center pt-4">
              <Link 
                href="/probeer-mijn-bibliotheek"
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Probeer op telefoon of tablet
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}


