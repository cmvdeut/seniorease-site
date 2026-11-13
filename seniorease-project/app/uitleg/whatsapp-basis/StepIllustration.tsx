'use client';

import Image from 'next/image';
import { useState } from 'react';

const STEP_IMAGES: Record<number, string> = {
  1: '/images/guides/whatsapp/step-1-nl.png',
  2: '/images/guides/whatsapp/step-2-nl.png',
  3: '/images/guides/whatsapp/step-3-nl.png',
  4: '/images/uitleg/whatsapp/stap4-paperclip.svg',
  5: '/images/uitleg/whatsapp/stap5-foto-versturen.svg',
  6: '/images/uitleg/whatsapp/stap6-foto-ontvangen.svg',
  7: '/images/uitleg/whatsapp/stap7-duimpje.svg',
};

export function StepIllustration({ step, children }: { step: number; children: React.ReactNode }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = STEP_IMAGES[step];

  return (
    <div className="my-6">
      <div className="relative w-full max-w-sm">
        <div className="absolute -top-2 -left-2 z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-senior-lg font-bold shadow-lg border-2 border-white">
          {step}
        </div>
        <div className="w-full max-w-sm aspect-[360/570] bg-gray-100 rounded-2xl border-4 border-gray-300 flex items-center justify-center p-3 shadow-inner overflow-hidden">
          {src && !imgFailed ? (
            <Image
              src={src}
              alt={`Vereenvoudigd WhatsApp-scherm bij stap ${step}`}
              width={192}
              height={256}
              className="w-full h-full object-contain rounded-xl"
              onError={() => setImgFailed(true)}
              unoptimized
            />
          ) : (
            children
          )}
        </div>
      </div>
      <p className="mt-2 text-senior-sm text-gray-600">Schermvoorbeeld. Knoppen kunnen per telefoon verschillen.</p>
    </div>
  );
}
