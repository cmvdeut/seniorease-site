'use client';

import Image from 'next/image';
import { useState } from 'react';

const PHOTOS = {
  icon: {
    src: '/images/uitleg/google-maps/google-maps-icon.png',
    alt: 'Screenshot: Google Maps-icoon op het beginscherm',
    label: 'Het icoon op uw telefoon',
  },
  open: {
    src: '/images/uitleg/google-maps/google-maps-opens.png',
    alt: 'Screenshot: Google Maps geopend met zoekbalk bovenaan',
    label: 'Zo ziet de app eruit als u hem opent',
  },
} as const;

function PhotoSlot({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="bg-neutral-cream border-2 border-dashed border-neutral-stone rounded-xl p-6 text-center">
        <p className="text-senior-base font-bold text-gray-800 mb-2">{label}</p>
        <p className="text-senior-sm text-gray-600">Screenshot volgt — voor nu: lees de omschrijving hieronder.</p>
      </div>
    );
  }

  return (
    <figure>
      <div className="bg-neutral-cream border-2 border-neutral-stone rounded-xl p-3">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={700}
          className="w-full max-w-sm mx-auto rounded-lg border border-neutral-stone/60"
          onError={() => setMissing(true)}
          unoptimized
        />
      </div>
      <figcaption className="mt-3 text-senior-sm text-gray-600 text-center">{label}</figcaption>
    </figure>
  );
}

export function MapsAppGuide() {
  return (
    <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
      <h2 className="text-senior-xl font-bold text-primary mb-2">
        Zo herkent u de app
      </h2>
      <p className="text-senior-base text-gray-700 mb-6 leading-relaxed">
        Google Maps is <strong>gratis</strong>. U hoeft niets te betalen en geen abonnement af te sluiten.
        Zoek op uw telefoon naar het icoon hieronder — of lees de omschrijving als u het scherm nog niet voor u heeft.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <PhotoSlot {...PHOTOS.icon} />
        <PhotoSlot {...PHOTOS.open} />
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl px-6 py-5">
          <p className="text-senior-base font-bold text-gray-800 mb-2">Google Maps (Android en iPhone)</p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Wit of licht icoon met een <strong>rode pin</strong> op een kleurrijk kaartje.
            Staat vaak al op uw telefoon. Heet meestal &quot;Maps&quot;.
          </p>
        </div>

        <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl px-6 py-5">
          <p className="text-senior-base font-bold text-gray-800 mb-2">Apple Maps (alleen iPhone)</p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            <strong>Blauw</strong> icoon met een witte route of pijl. Staat al op iPhone. Werkt ook goed voor navigatie.
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-6 py-5">
          <p className="text-senior-base font-bold text-amber-900 mb-2">Waar moet u tikken?</p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            <strong>Bovenaan</strong> staat &quot;Zoeken in Maps&quot; — daar typt u het adres.
            <strong> Rechtsonder</strong> het blauwe cirkeltje laat zien waar u bent.
          </p>
        </div>
      </div>
    </section>
  );
}
