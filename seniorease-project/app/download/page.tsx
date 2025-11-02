'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

function DownloadContent() {
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check licentie
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        if (licentieData.valid) {
          setHasLicense(true);
          
          // Genereer download URL
          const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
          setDownloadUrl(`${baseUrl}/api/download-app`);
          
          return;
        }
      } catch (e) {
        console.error('Error checking license:', e);
      }
    }
    setHasLicense(false);

    // Check of Android
    const userAgent = navigator.userAgent;
    setIsAndroid(/Android/i.test(userAgent));
  }, []);

  // Loading state
  if (hasLicense === null) {
    return (
      <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-senior-lg text-gray-700">Controleren licentie...</p>
        </div>
      </div>
    );
  }

  // Geen licentie
  if (hasLicense === false) {
    return (
      <div className="min-h-screen bg-neutral-cream">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border-4 border-primary p-8 text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-senior-2xl font-bold text-primary mb-4">
              Licentie vereist
            </h1>
            <p className="text-senior-base text-gray-700 mb-6">
              Om de app te downloaden heeft u een licentie nodig.
            </p>
            <Link
              href="/betalen"
              className="inline-block bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              💳 Koop licentie voor € 2,99
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Met licentie - toon download
  return (
    <div className="min-h-screen bg-neutral-cream">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-senior-3xl font-bold text-primary mb-4">
              📱 Download de App
            </h1>
            <p className="text-senior-lg text-gray-700">
              Uw licentie is actief. Download hier de bibliotheek app voor Android.
            </p>
          </div>

          {/* QR Code voor download */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8">
              <h2 className="text-senior-xl font-bold text-primary mb-6 text-center">
                📱 Scan QR Code om te downloaden
              </h2>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 mb-6">
                  {downloadUrl ? (
                    <QRCodeSVG
                      value={downloadUrl}
                      size={250}
                      level="H"
                      includeMargin={true}
                    />
                  ) : (
                    <div className="w-[250px] h-[250px] flex items-center justify-center bg-gray-100 rounded">
                      <p className="text-senior-sm text-gray-500">QR code wordt geladen...</p>
                    </div>
                  )}
                </div>
                <p className="text-senior-base text-gray-700 text-center font-bold mb-2">
                  Scan met uw telefoon camera
                </p>
                <p className="text-senior-sm text-gray-600 text-center">
                  De download start automatisch na het scannen
                </p>
              </div>
            </div>
          </div>

          {/* Installatie instructies */}
          <div className="bg-blue-50 border-4 border-blue-300 rounded-2xl p-8 mb-6">
            <h2 className="text-senior-xl font-bold text-blue-900 mb-4 text-center">
              📲 App installeren op Android
            </h2>
            
            <div className="space-y-6 text-senior-base text-blue-900">
              {/* Stap 1: Downloaden */}
              <div>
                <h3 className="font-bold mb-2 text-senior-lg">Stap 1: Download de APK</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Klik op <strong>"Download APK"</strong> hierboven, of scan de QR code</li>
                  <li>Wacht tot de download klaar is</li>
                  <li>U ziet een melding: <strong>"Download voltooid"</strong></li>
                </ol>
              </div>

              {/* Stap 2: Toestemming */}
              <div>
                <h3 className="font-bold mb-2 text-senior-lg">Stap 2: Toestemming geven (eenmalig)</h3>
                <p className="mb-3">Android vraagt om toestemming. Dit is <strong>veilig</strong> en maar <strong>één keer</strong> nodig:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Open het gedownloade APK bestand (tap op melding of ga naar Downloads)</li>
                  <li>Android toont: <strong>"Installeer dit bestand?"</strong></li>
                  <li>Klik op <strong>"Installeer"</strong></li>
                  <li className="font-bold">Als u ziet: <strong>"Toestaan van onbekende bronnen"</strong></li>
                  <li className="ml-6">→ Klik op <strong>"Instellingen"</strong> of <strong>"Toestaan"</strong></li>
                  <li className="ml-6">→ Zet het schakelaartje <strong>AAN</strong> (bijv. "Deze bron toestaan")</li>
                  <li className="ml-6">→ Klik <strong>"Terug"</strong> en probeer opnieuw</li>
                </ol>
              </div>

              {/* Stap 3: Installeren */}
              <div>
                <h3 className="font-bold mb-2 text-senior-lg">Stap 3: App installeren</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Na toestemming ziet u: <strong>"App installeren"</strong></li>
                  <li>Klik op <strong>"Installeer"</strong></li>
                  <li>Wacht even tot installatie klaar is</li>
                  <li>Klik op <strong>"Openen"</strong> om de app te starten</li>
                  <li>De app verschijnt nu op uw startscherm! 🎉</li>
                </ol>
              </div>

              {/* Help sectie */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mt-4">
                <p className="font-bold mb-2">💡 Hulp nodig?</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Download niet gevonden?</strong> Check "Downloads" map of browser downloads</li>
                  <li><strong>Kan niet installeren?</strong> Ga naar Instellingen → Beveiliging → Onbekende bronnen (oude Android) of check per-app toestemming (nieuwe Android)</li>
                  <li><strong>Wil je het niet toestaan?</strong> U kunt altijd de webversie gebruiken in uw browser</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Terug knoppen */}
          <div className="text-center space-y-4">
            <Link
              href="/bibliotheek"
              className="inline-block bg-secondary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                       hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl mr-4"
            >
              → Ga naar Bibliotheek
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-300 text-gray-800 px-10 py-6 rounded-xl text-senior-lg font-bold
                       hover:bg-gray-400 transition-all shadow-lg"
            >
              ← Terug naar Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-senior-lg text-gray-700">Laden...</p>
        </div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}

