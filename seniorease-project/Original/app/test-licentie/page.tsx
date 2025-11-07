'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TestLicentiePage() {
  const router = useRouter();
  const [email, setEmail] = useState('test@example.com');
  const [licentieActief, setLicentieActief] = useState(false);

  // Check of er al een licentie is
  useEffect(() => {
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        if (licentieData.valid) {
          setLicentieActief(true);
        }
      } catch (e) {
        // Geen licentie
      }
    }
  }, []);

  // Activeer test licentie (zonder betaling)
  function activeerTestLicentie() {
    if (!email.trim()) {
      alert('Vul een email in');
      return;
    }

    const code = `TEST-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const licentieData = {
      code: code,
      email: email,
      date: new Date().toISOString(),
      valid: true,
      source: 'test'
    };

    localStorage.setItem('seniorease-licentie', JSON.stringify(licentieData));
    setLicentieActief(true);
    alert('Test licentie geactiveerd! Je kunt nu de bibliotheek app gebruiken.');
  }

  // Verwijder licentie
  function verwijderLicentie() {
    if (confirm('Weet u zeker dat u de licentie wilt verwijderen?')) {
      localStorage.removeItem('seniorease-licentie');
      setLicentieActief(false);
      alert('Licentie verwijderd. Test opnieuw indien nodig.');
    }
  }

  return (
    <main className="min-h-screen bg-neutral-cream flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
        <div className="text-center">
          <div className="text-6xl mb-6">🧪</div>
          <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
            Test Licentie Activatie
          </h1>
          <p className="text-senior-lg text-gray-700 mb-6">
            Activeer een test licentie zonder betaling om de app te testen
          </p>

          {/* Huidige Status */}
          <div className={`bg-${licentieActief ? 'green' : 'yellow'}-50 border-2 border-${licentieActief ? 'green' : 'yellow'}-300 rounded-xl p-6 mb-6`}>
            <p className={`text-senior-base font-bold text-${licentieActief ? 'green' : 'yellow'}-900 mb-2`}>
              {licentieActief ? '✅ Licentie Actief' : '⚠️ Geen Licentie'}
            </p>
            <p className={`text-senior-sm text-${licentieActief ? 'green' : 'yellow'}-800`}>
              {licentieActief 
                ? 'Je kunt nu de bibliotheek app gebruiken zonder licentie blokkade.'
                : 'Activeer een test licentie om de app te kunnen gebruiken.'}
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-senior-base font-bold text-gray-700 mb-2 text-left">
              Test Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base focus:border-primary"
              placeholder="test@example.com"
            />
          </div>

          {/* Actie Knoppen */}
          <div className="space-y-4">
            {!licentieActief ? (
              <button
                onClick={activeerTestLicentie}
                className="w-full bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                ✅ Activeer Test Licentie
              </button>
            ) : (
              <>
                <Link
                  href="/bibliotheek"
                  className="block bg-green-600 text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                           hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  → Open Bibliotheek App
                </Link>
                <button
                  onClick={verwijderLicentie}
                  className="w-full bg-gray-500 text-white px-6 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-gray-600 transition-all"
                >
                  🗑️ Verwijder Test Licentie
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <p className="text-senior-sm text-blue-900 font-bold mb-2">
              💡 Info:
            </p>
            <p className="text-senior-xs text-blue-800 text-left">
              Deze test licentie werkt alleen op dit apparaat en in deze browser. 
              Voor echte gebruikers wordt de licentie automatisch geactiveerd na betaling via Stripe.
            </p>
          </div>

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

