'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DemoDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState<string>('https://www.seniorease.nl/Seniorease-Bibliotheek-Demo.apk');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setCurrentUrl(origin);
      // Gebruik directe public folder link (werkt altijd, ook als API route faalt)
      const fullUrl = `${origin}/Seniorease-Bibliotheek-Demo.apk`;
      setDemoUrl(fullUrl);
    }
  }, []);

  // Demo download link - direct naar demo APK in public folder
  // Dit werkt altijd, ook als API route problemen heeft
  const qrCodeValue = demoUrl;

  return (
    <div className="grid md:grid-cols-3 gap-4 items-start md:items-center">
      {/* Linker deel - QR Code */}
      <div className="flex flex-col items-center">
        <div className="bg-neutral-cream p-3 rounded-xl border-2 border-primary/20 mb-2">
          <QRCodeSVG
            value={qrCodeValue}
            size={140}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="text-senior-xs font-bold text-gray-700 text-center">
          Scan om te proberen
        </p>
      </div>
      
      {/* Midden deel - Download knop en info */}
      <div className="flex flex-col gap-3">
        <Link
          href="/Seniorease-Bibliotheek-Demo.apk"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-senior-base font-bold
                   transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
          download="Seniorease-Bibliotheek-Demo.apk"
        >
          📱 Download om te proberen
        </Link>
        
        <div className="bg-neutral-cream rounded-xl p-3 text-senior-xs text-gray-700">
          <p className="font-bold mb-1">🎁 Proberen:</p>
          <ul className="list-disc list-inside space-y-0.5 text-left ml-2">
            <li>Max. 10 boeken</li>
            <li>Barcode scanner</li>
            <li>Gratis te proberen</li>
          </ul>
        </div>
      </div>

      {/* Rechter deel - Installatie instructies */}
      <div className="bg-neutral-cream rounded-xl p-3 text-senior-xs text-gray-700">
        <p className="font-bold mb-2">📱 Installeren:</p>
        <ol className="list-decimal list-inside space-y-1 text-left">
          <li>Klik "Openen"</li>
          <li>Klik "Toestaan"</li>
          <li>Klik "Installeren"</li>
        </ol>
        <Link 
          href="/hulp#app-installatie"
          className="text-senior-xs text-primary hover:underline font-bold mt-2 inline-block"
        >
          → Meer info
        </Link>
      </div>
    </div>
  );
}

