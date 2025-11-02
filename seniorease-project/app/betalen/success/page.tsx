'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [licentieCode, setLicentieCode] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Haal email op uit sessionStorage (van voor betaling)
    const paymentEmail = sessionStorage.getItem('seniorease-payment-email');
    if (paymentEmail) {
      setEmail(paymentEmail);
      sessionStorage.removeItem('seniorease-payment-email'); // Clean up
    }

    // Check of er al een licentie is
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        if (licentieData.valid) {
          setLicentieCode(licentieData.code || 'Geactiveerd');
          return;
        }
      } catch (e) {
        console.error('Error reading license:', e);
      }
    }

    // Genereer en activeer licentie
    const code = `SE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const licentieData = {
      code: code,
      email: paymentEmail || 'Onbekend',
      date: new Date().toISOString(),
      valid: true,
      source: 'stripe'
    };

    localStorage.setItem('seniorease-licentie', JSON.stringify(licentieData));
    setLicentieCode(code);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-cream flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-4 border-green-500 p-8 md:p-12">
        <div className="text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
            Betaling geslaagd!
          </h1>
          <p className="text-senior-lg text-gray-700 mb-6">
            Uw licentie is geactiveerd
          </p>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <p className="text-senior-sm text-gray-600 mb-2">Uw licentie code:</p>
            <p className="text-senior-lg font-bold text-green-700 font-mono break-all">
              {licentieCode || 'Activeren...'}
            </p>
            {email && (
              <p className="text-senior-xs text-gray-500 mt-2">
                E-mail: {email}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Link
              href="/bibliotheek"
              className="block bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-center"
            >
              → Open Mijn Bibliotheek
            </Link>
            
            {/* Installatie Instructies */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mt-4">
              <h3 className="text-senior-base font-bold text-blue-900 mb-3">
                📱 App installeren op uw telefoon:
              </h3>
              <div className="text-left space-y-3 text-senior-sm text-blue-800">
                <div>
                  <p className="font-bold mb-1">Op Android (Chrome/Samsung Internet):</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Klik op de drie puntjes (⋮) rechtsboven in de browser</li>
                    <li>Kies "Installeer app" of "Toevoegen aan startscherm"</li>
                    <li>Bevestig met "Toevoegen"</li>
                  </ol>
                </div>
                <div>
                  <p className="font-bold mb-1">Op iPhone/iPad (Safari):</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Klik op het deel-icoon (vierkant met pijl omhoog)</li>
                    <li>Scroll naar beneden en kies "Voeg toe aan beginscherm"</li>
                    <li>Klik op "Toevoegen"</li>
                  </ol>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <p className="font-bold text-blue-900">💡 Tip:</p>
                  <p>Na installatie verschijnt de app op uw startscherm. U kunt de app ook installeren via het Opties menu (⚙️) in de bibliotheek app.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BetalenSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-senior-lg text-gray-700">Laden...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}

