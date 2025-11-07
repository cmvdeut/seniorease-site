'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

export default function MobileDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Gebruik de huidige URL voor de QR code
    setCurrentUrl(window.location.origin);
    
    // Check licentie
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        setHasLicense(licentieData.valid === true);
      } catch (e) {
        setHasLicense(false);
      }
    } else {
      setHasLicense(false);
    }
  }, []);

  // QR code linkt direct naar APK download als licentie actief is, anders naar betalen
  const qrUrl = currentUrl 
    ? (hasLicense 
        ? `${currentUrl}/api/download-app` 
        : `${currentUrl}/betalen`)
    : '';

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

