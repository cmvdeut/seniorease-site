'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DemoDownload from '../components/DemoDownload';

export default function ProbeerMijnBibliotheekPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check of het een mobiel apparaat is
    const userAgent = navigator.userAgent;
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent) || 
                         (window.innerWidth <= 768 && window.innerHeight <= 1024);
    
    setIsMobile(isMobileDevice);
    
    // Als het een desktop is, redirect direct naar bibliotheek (geen demo nodig)
    if (!isMobileDevice) {
      router.push('/bibliotheek');
    }
  }, [router]);

  const handleStartDemo = () => {
    if (typeof window === 'undefined') return;
    
    // Activeer demo mode in localStorage
    try {
      localStorage.setItem('seniorease-demo-mode', 'true');
      // Redirect naar bibliotheek met demo mode
      router.push('/bibliotheek?demo=true');
    } catch (e) {
      console.error('Error setting demo mode:', e);
      // Fallback: gewoon naar bibliotheek
      router.push('/bibliotheek');
    }
  };

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
              Probeer Mijn Bibliotheek
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
              <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-4">
                U kunt dit eerst rustig proberen
              </h2>
              <div className="space-y-3 text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
                <p>
                  Tijdens het proberen kunt u maximaal 10 boeken toevoegen.
                </p>
                <p>
                  Alle functionaliteit is beschikbaar:<br />
                  • Barcode scannen<br />
                  • Boeken zoeken<br />
                  • Bibliotheek beheren
                </p>
                <p className="text-senior-sm text-gray-600 mt-4">
                  Wilt u meer dan 10 boeken? Dan kunt u later de volledige versie eenmalig aanschaffen.
                </p>
              </div>
            </div>

            {/* QR Code en Download */}
            <div className="mt-6">
              <DemoDownload />
            </div>
            
            {/* Start demo knop (voor web versie) */}
            <div className="text-center pt-4">
              <button
                onClick={handleStartDemo}
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                👉 Start met proberen (web versie)
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

