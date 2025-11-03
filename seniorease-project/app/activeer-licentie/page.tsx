'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ActiveerLicentiePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [licentieCode, setLicentieCode] = useState(searchParams.get('code') || '');
  const [email, setEmail] = useState('');
  const [activeringStatus, setActiveringStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Activeer licentie met code (voor klanten die code van support hebben gekregen)
  function activeerLicentie() {
    if (!licentieCode.trim()) {
      alert('Vul een licentie code in');
      return;
    }

    // Genereer licentie data (vergelijkbaar met Stripe licentie)
    const licentieData = {
      code: licentieCode.toUpperCase().trim(),
      email: email || 'Support',
      date: new Date().toISOString(),
      valid: true,
      source: 'support'
    };

    localStorage.setItem('seniorease-licentie', JSON.stringify(licentieData));
    setActiveringStatus('success');
    
    // Auto-redirect naar download na 2 seconden
    setTimeout(() => {
      router.push('/download');
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-neutral-cream flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
        <div className="text-center">
          <div className="text-6xl mb-6">🔑</div>
          <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
            Activeer Uw Licentie
          </h1>
          <p className="text-senior-lg text-gray-700 mb-6">
            Voer de licentie code in die u van support heeft ontvangen
          </p>

          {activeringStatus === 'success' ? (
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
              <p className="text-senior-base font-bold text-green-900 mb-2">
                ✅ Licentie Geactiveerd!
              </p>
              <p className="text-senior-sm text-green-800">
                U wordt doorgestuurd naar de download pagina...
              </p>
            </div>
          ) : (
            <>
              {/* Licentie Code Input */}
              <div className="mb-6">
                <label className="block text-senior-base font-bold text-gray-700 mb-2 text-left">
                  Licentie Code:
                </label>
                <input
                  type="text"
                  value={licentieCode}
                  onChange={(e) => setLicentieCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-lg font-mono text-center focus:border-primary uppercase"
                  placeholder="VOER CODE HIER IN"
                  autoFocus
                />
                <p className="text-senior-xs text-gray-500 mt-2 text-left">
                  De licentie code die u via email of telefoon van support heeft ontvangen
                </p>
              </div>

              {/* Email Input (optioneel) */}
              <div className="mb-6">
                <label className="block text-senior-base font-bold text-gray-700 mb-2 text-left">
                  Email (optioneel):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base focus:border-primary"
                  placeholder="uw@email.nl"
                />
              </div>

              {/* Actie Knop */}
              <button
                onClick={activeerLicentie}
                className="w-full bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl mb-4"
              >
                ✅ Activeer Licentie
              </button>

              {/* Info */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                <p className="text-senior-sm text-blue-900 font-bold mb-2">
                  💡 Hulp nodig?
                </p>
                <p className="text-senior-xs text-blue-800 text-left">
                  Heeft u geen licentie code? Neem contact op met support via het contactformulier of bel ons.
                </p>
              </div>
            </>
          )}

          {/* Terug Link */}
          <Link
            href="/"
            className="block mt-6 text-senior-base text-primary hover:underline"
          >
            ← Terug naar home
          </Link>
        </div>
      </div>
    </main>
  );
}

