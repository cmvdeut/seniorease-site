'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

export default function MobileDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    // Gebruik de huidige URL voor de QR code
    setCurrentUrl(window.location.origin);
  }, []);

  // Alleen QR code component voor hergebruik
  return (
    <>
      {currentUrl && (
        <QRCodeSVG
          value={`${currentUrl}/betalen`}
          size={80}
          level="H"
          includeMargin={true}
          className="w-full h-auto max-w-[80px] sm:max-w-[140px]"
        />
      )}
      <p className="text-[10px] sm:text-senior-xs font-bold text-gray-700 mt-1 sm:mt-2 mb-0.5 sm:mb-1 text-center">
        Scan QR code
      </p>
      <p className="text-[9px] sm:text-senior-xs text-gray-600 text-center">
        Met telefoon camera
      </p>
    </>
  );
}

