'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DemoDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  // Demo download link - naar bibliotheek pagina waar demo geïnstalleerd kan worden
  const demoUrl = currentUrl ? `${currentUrl}/bibliotheek` : '';

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-yellow-400 mb-4">
        <QRCodeSVG
          value={demoUrl}
          size={180}
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="text-senior-sm font-bold text-gray-700 mb-2 text-center">
        Scan voor GRATIS demo versie
      </p>
      <Link
        href="/bibliotheek"
        className="text-senior-xs text-primary hover:underline font-bold text-center"
      >
        Of klik hier voor demo →
      </Link>
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 mt-3 text-senior-xs text-yellow-900 text-center max-w-xs">
        <p className="font-bold mb-1">🎁 Demo versie:</p>
        <ul className="list-disc list-inside space-y-0.5 text-left ml-2">
          <li>Max. 10 items</li>
          <li>Barcode scanner</li>
          <li>Gratis te proberen</li>
        </ul>
      </div>
    </div>
  );
}

