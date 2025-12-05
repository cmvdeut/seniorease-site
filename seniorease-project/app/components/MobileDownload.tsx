'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

export default function MobileDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check of we in browser zijn
    if (typeof window === 'undefined') {
      return;
    }
    
    // Gebruik de huidige URL voor de QR code
    setCurrentUrl(window.location.origin);
    
    // Check licentie
    try {
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
    } catch (e) {
      // localStorage kan niet beschikbaar zijn (bijv. in private mode)
      setHasLicense(false);
    }
  }, []);

  // QR code linkt naar bibliotheek app (gratis voor iedereen)
  const qrUrl = currentUrl 
    ? `${currentUrl}/bibliotheek`
    : '';

  return (
    <>
      {qrUrl && (
        <div className="flex flex-col items-center">
          <div className="bg-neutral-cream p-4 rounded-xl shadow-lg border-2 border-primary/20 mb-4">
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
          <div className="bg-neutral-cream border-2 border-primary/20 rounded-xl p-4 text-senior-xs text-gray-700 text-center max-w-xs">
            <p className="font-bold mb-2">📱 Web App Installeren:</p>
            <ol className="list-decimal list-inside space-y-1 text-left ml-2">
              <li>Scan de QR code met uw telefoon</li>
              <li>Open de bibliotheek app in uw browser</li>
              <li>Klik op "Opties" → "Installeer als app"</li>
              <li>Volg de installatie instructies</li>
            </ol>
            <p className="text-senior-xs text-gray-600 mt-2">
              Werkt op Android, iPhone en iPad
            </p>
          </div>
        </div>
      )}
    </>
  );
}

