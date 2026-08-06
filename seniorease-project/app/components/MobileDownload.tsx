'use client';

import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.maureen.biblitoheek';

export default function MobileDownload() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-paper p-4 rounded-xl shadow-lg border-2 border-gray-200 mb-4">
        <QRCodeSVG
          value={PLAY_STORE_URL}
          size={180}
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="text-senior-sm font-bold text-gray-700 mb-4 text-center">
        Scan met uw telefoon camera
      </p>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Image
          src="/images/google-play-badge-nl.png"
          alt="Beschikbaar in Google Play"
          width={180}
          height={54}
          className="mx-auto"
        />
      </a>
    </div>
  );
}
