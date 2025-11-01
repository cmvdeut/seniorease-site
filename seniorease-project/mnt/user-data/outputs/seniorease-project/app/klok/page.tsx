'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      {/* Terug knop */}
      <div className="p-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
        >
          <span className="text-3xl">←</span>
          <span className="text-senior-base">Terug naar Home</span>
        </Link>
      </div>

      {/* Klok Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Tijd */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 text-center">
          <div className="text-[10rem] font-bold text-blue-600 leading-none tracking-tight">
            {uren}:{minuten}
          </div>
          <div className="text-senior-2xl text-gray-500 mt-4 font-medium">
            {seconden} seconden
          </div>
        </div>

        {/* Datum */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-3xl w-full">
          <div className="text-senior-3xl font-bold text-gray-800 mb-2">
            {dagNaam}
          </div>
          <div className="text-senior-2xl text-gray-600">
            {dag} {maandNaam} {jaar}
          </div>
        </div>

        {/* Instructies */}
        <div className="mt-12 text-center text-white">
          <p className="text-senior-base opacity-90">
            💡 Tip: Druk op F11 voor volledig scherm
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div className="p-6 text-center text-white opacity-75">
        <p className="text-senior-sm">
          SeniorEase - Grote Klok
        </p>
      </div>
    </div>
  );
}
