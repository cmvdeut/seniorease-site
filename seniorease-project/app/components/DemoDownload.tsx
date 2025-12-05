'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DemoDownload() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  
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

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowInstructions(true);
  };

  const handleContinueDownload = () => {
    setShowInstructions(false);
    // Start download
    window.location.href = '/Seniorease-Bibliotheek-Demo.apk';
  };

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
        
        {/* Download Gratis Demo Knop */}
        <button
          onClick={handleDownloadClick}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-senior-base font-bold
                   transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
        >
          📥 Download Gratis Demo
        </button>

        {/* Directe APK Link onder de knop */}
        <Link
          href="/Seniorease-Bibliotheek-Demo.apk"
          className="text-senior-xs text-primary hover:underline font-bold text-center mb-3"
          download="Seniorease-Bibliotheek-Demo.apk"
        >
          📱 Direct APK downloaden
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

      {/* Instructies Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-4 border-yellow-400">
            <h2 className="text-senior-xl font-bold text-primary mb-4 text-center">
              📱 Installatie Instructies
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                <p className="text-senior-base font-bold text-yellow-900 mb-3">
                  Volg deze 3 eenvoudige stappen:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-senior-sm text-yellow-900">
                  <li className="font-bold">Klik "Openen" wanneer gevraagd</li>
                  <li className="font-bold">Klik "Toestaan" voor onbekende bronnen</li>
                  <li className="font-bold">Klik "Installeren" en wacht</li>
                </ol>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                <p className="text-senior-sm text-blue-900">
                  <span className="font-bold">💡 Tip:</span> Dit is veilig - het is je eigen app!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowInstructions(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl text-senior-base font-bold transition-all"
              >
                Annuleren
              </button>
              <button
                onClick={handleContinueDownload}
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-senior-base font-bold
                         transition-all shadow-lg hover:shadow-xl"
              >
                Ga Verder →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

