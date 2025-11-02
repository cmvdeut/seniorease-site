'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

export default function MobileDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    // Gebruik de huidige URL voor de QR code
    setCurrentUrl(window.location.origin);
  }, []);

  // QR code linkt naar download pagina (voor gebruikers met licentie) of betalen pagina
  const qrUrl = currentUrl ? `${currentUrl}/download` : '';

  return (
    <>
      {qrUrl && (
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 mb-4">
            <QRCodeSVG
              value={qrUrl}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-senior-sm font-bold text-gray-700 mb-2 text-center">
            Scan met uw telefoon camera
          </p>
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-senior-xs text-blue-900 text-center max-w-xs">
            <p className="font-bold mb-2">📱 Installatie instructies:</p>
            <ol className="list-decimal list-inside space-y-1 text-left ml-2">
              <li>Scan de QR code met uw telefoon</li>
              <li>Betaal € 2,99 (eenmalig)</li>
              <li>Download de app via de QR code</li>
              <li>Geef toestemming voor "onbekende bronnen"</li>
              <li>Installeer de app</li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

