'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function KlokPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dagen = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  const maanden = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

  const dagNaam = dagen[time.getDay()];
  const maandNaam = maanden[time.getMonth()];
  const dag = time.getDate();
  const jaar = time.getFullYear();

  const uren = String(time.getHours()).padStart(2, '0');
  const minuten = String(time.getMinutes()).padStart(2, '0');
  const seconden = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="min-h-screen bg-neutral-cream flex flex-col">
      {/* Header met terug knop en logo */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center gap-3 text-primary hover:text-primary-dark transition-colors font-semibold"
            >
              <span className="text-3xl">←</span>
              <span className="text-senior-base">Terug naar home</span>
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={50} 
                height={50}
                className="w-12 h-12"
              />
              <span className="text-senior-lg font-bold text-primary">SeniorEase</span>
            </div>
          </div>
        </div>
      </header>

      {/* Klok Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Tijd */}
        <div className="bg-white rounded-2xl shadow-xl border-4 border-primary/20 p-16 mb-8 w-full max-w-5xl">
          <div className="text-center">
            <div className="text-[11rem] font-bold text-primary leading-none tracking-tight mb-4">
              {uren}:{minuten}
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-1 w-20 bg-neutral-stone rounded"></div>
              <div className="text-senior-2xl text-gray-500 font-medium">
                {seconden}
              </div>
              <div className="h-1 w-20 bg-neutral-stone rounded"></div>
            </div>
          </div>
        </div>

        {/* Datum */}
        <div className="bg-white rounded-2xl shadow-xl border-4 border-secondary/20 p-12 w-full max-w-5xl">
          <div className="text-center">
            <div className="text-senior-2xl font-bold text-secondary mb-3">
              {dagNaam}
            </div>
            <div className="text-senior-xl text-gray-700">
              {dag} {maandNaam} {jaar}
            </div>
          </div>
        </div>

        {/* Instructie */}
        <div className="mt-12 bg-accent/10 rounded-xl px-8 py-5 border-l-4 border-accent">
          <p className="text-senior-sm text-gray-700">
            <strong>Tip:</strong> Druk op F11 voor volledig scherm
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-senior-sm text-gray-600">
            SeniorEase - Grote Klok
          </p>
        </div>
      </footer>
    </div>
  );
}
