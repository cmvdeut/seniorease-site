'use client';

import { useEffect } from 'react';

export default function NieuwsbriefBlok() {
  useEffect(() => {
    const ml = (window as any).ml;
    if (typeof ml === 'function') {
      ml('account', '2211176');
    }
  }, []);

  return (
    <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-8 mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        📬 Ontvang elke week een digitale tip
      </h2>
      <p className="text-gray-600 mb-6">
        Gratis. Geen spam. Altijd opzegbaar.
      </p>
      <div className="ml-embedded" data-form="2LZinn"></div>
    </section>
  );
}
