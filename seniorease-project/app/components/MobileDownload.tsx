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
          size={140}
          level="H"
          includeMargin={true}
        />
      )}
      <p className="text-senior-xs font-bold text-gray-700 mt-2 mb-1 text-center">
        Scan QR code
      </p>
      <p className="text-senior-xs text-gray-600 text-center">
        Met telefoon camera
      </p>
    </>
  );
}

