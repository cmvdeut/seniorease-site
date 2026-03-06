'use client';

import Image from 'next/image';
import { useState } from 'react';

const STEP_IMAGES: Record<number, string> = {
  1: '/images/uitleg/whatsapp/stap1-openen.jpg',
  2: '/images/uitleg/whatsapp/stap2-gesprek.jpg',
  3: '/images/uitleg/whatsapp/stap3-bericht.jpg',
  4: '/images/uitleg/whatsapp/stap4-paperclip.jpg',
  5: '/images/uitleg/whatsapp/stap5-foto-versturen.jpg',
  6: '/images/uitleg/whatsapp/stap6-foto-ontvangen.jpg',
  7: '/images/uitleg/whatsapp/stap7-duimpje.jpg',
};

export function StepIllustration({ step, children }: { step: number; children: React.ReactNode }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = STEP_IMAGES[step];

  return (
    <div className="my-6">
      <div className="relative inline-block">
        <div className="absolute -top-2 -left-2 z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-senior-lg font-bold shadow-lg border-2 border-white">
          {step}
        </div>
        <div className="w-40 h-52 md:w-48 md:h-64 bg-gray-100 rounded-2xl border-4 border-gray-300 flex items-center justify-center p-3 shadow-inner overflow-hidden">
          {src && !imgFailed ? (
            <Image
              src={src}
              alt={`Stap ${step} illustratie`}
              width={192}
              height={256}
              className="w-full h-full object-cover rounded-xl"
              onError={() => setImgFailed(true)}
              unoptimized
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
