'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DemoDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setCurrentUrl(origin);
      // Gebruik directe public folder link (werkt altijd, ook als API route faalt)
      const fullUrl = `${origin}/Seniorease-Bibliotheek-Demo.apk`;
      setDemoUrl(fullUrl);
      console.log('QR Code URL:', fullUrl); // Debug log
    }
  }, []);

  // Demo download link - direct naar demo APK in public folder
  // Dit werkt altijd, ook als API route problemen heeft
  const qrCodeValue = demoUrl || 'https://seniorease.nl/Seniorease-Bibliotheek-Demo.apk';

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-yellow-400 mb-4">
          {qrCodeValue && (
            <QRCodeSVG
              value={qrCodeValue}
              size={180}
              level="H"
              includeMargin={true}
            />
          )}
        </div>
        <p className="text-senior-sm font-bold text-gray-700 mb-4 text-center">
          Scan voor GRATIS demo versie
        </p>
        
        {/* Grote Directe APK Download Knop */}
        <Link
          href="/Seniorease-Bibliotheek-Demo.apk"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-senior-base font-bold
                   transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-4 inline-block"
          download="Seniorease-Bibliotheek-Demo.apk"
        >
          📱 Direct APK downloaden
        </Link>

        {/* Beknopte Installatie Instructies */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-3 text-senior-xs text-blue-900 text-center max-w-xs">
          <p className="font-bold mb-2">📱 Installeren (3 stappen):</p>
          <ol className="list-decimal list-inside space-y-1 text-left">
            <li>Klik "Openen" wanneer gevraagd</li>
            <li>Klik "Toestaan" voor onbekende bronnen</li>
            <li>Klik "Installeren" en wacht</li>
          </ol>
          <Link 
            href="/hulp#app-installatie"
            className="text-senior-xs text-primary hover:underline font-bold mt-2 inline-block"
          >
            → Uitgebreide instructies
          </Link>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 mt-3 text-senior-xs text-yellow-900 text-center max-w-xs">
          <p className="font-bold mb-1">🎁 Demo versie:</p>
          <ul className="list-disc list-inside space-y-0.5 text-left ml-2">
            <li>Max. 10 items</li>
            <li>Barcode scanner</li>
            <li>Gratis te proberen</li>
          </ul>
        </div>
      </div>

    </>
  );
}

