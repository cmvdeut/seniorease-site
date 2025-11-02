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
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 border-t-2 border-neutral-stone">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
                📱 Gebruik op uw telefoon of tablet
              </h2>
              <p className="text-senior-lg text-gray-700 mb-2">
                Installeer de app op uw mobiele apparaat
              </p>
              <p className="text-senior-base text-gray-600">
                € 2,99 eenmalig • Geen abonnement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 mb-4">
                  {currentUrl && (
                    <QRCodeSVG
                      value={`${currentUrl}/betalen`}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  )}
                </div>
                <p className="text-senior-base font-bold text-gray-700 mb-2">
                  Scan de QR code
                </p>
                <p className="text-senior-sm text-gray-600 text-center">
                  Open de camera app op uw telefoon en scan deze code
                </p>
              </div>

              {/* Download Opties */}
              <div className="space-y-4">
                <a
                  href="/betalen"
                  className="block bg-primary text-white px-8 py-6 rounded-xl text-senior-lg font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-center
                           flex items-center justify-center gap-3"
                >
                  <span className="text-3xl">💳</span>
                  <span>Download mobiele versie</span>
                </a>
                
                <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-senior-base font-bold text-gray-800 mb-3">
                    Wat krijgt u?
                  </h3>
                  <ul className="space-y-2 text-senior-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Volledige bibliotheek app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Barcode scanner voor boeken & muziek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Offline werken mogelijk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Geen reclame</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Levenslange licentie</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

