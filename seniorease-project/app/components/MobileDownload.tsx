'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

export default function MobileDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    // Gebruik de huidige URL voor de QR code
    setCurrentUrl(window.location.origin);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8 h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
          📱 Gebruik op telefoon/tablet
        </h2>
        <p className="text-senior-sm text-gray-700 mb-1">
          Installeer de app
        </p>
        <p className="text-senior-xs text-gray-600">
          € 2,99 eenmalig
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 flex-1">
        {/* QR Code */}
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 mb-3">
            {currentUrl && (
              <QRCodeSVG
                value={`${currentUrl}/betalen`}
                size={150}
                level="H"
                includeMargin={true}
              />
            )}
          </div>
          <p className="text-senior-sm font-bold text-gray-700 mb-1">
            Scan de QR code
          </p>
          <p className="text-senior-xs text-gray-600 text-center">
            Met uw telefoon camera
          </p>
        </div>

        {/* Download Knop */}
        <a
          href="/betalen"
          className="w-full bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                   hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-center
                   flex items-center justify-center gap-2"
        >
          <span className="text-2xl">💳</span>
          <span>Download app</span>
        </a>
        
        {/* Features lijst */}
        <div className="bg-neutral-cream rounded-xl p-4 border-2 border-gray-200 w-full flex-1">
          <h3 className="text-senior-sm font-bold text-gray-800 mb-2">
            Inbegrepen:
          </h3>
          <ul className="space-y-1.5 text-senior-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Volledige app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Barcode scanner</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Offline werken</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Levenslang</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

