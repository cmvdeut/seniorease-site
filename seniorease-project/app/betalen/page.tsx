'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BetalenPage() {
  const router = useRouter();
  const [licentieCode, setLicentieCode] = useState('');
  const [betaalStatus, setBetaalStatus] = useState<'pending' | 'paid' | 'error'>('pending');
  const [email, setEmail] = useState('');
  const [heeftLicentie, setHeeftLicentie] = useState(false);

  // Check of er al een licentie is
  useEffect(() => {
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        if (licentieData.valid) {
          setHeeftLicentie(true);
        }
      } catch (e) {
        // Geen licentie
      }
    }
  }, []);

  // Redirect naar Stripe Payment Link
  function handleBetalen() {
    if (!email) {
      alert('Vul uw e-mailadres in');
      return;
    }

    // Sla email tijdelijk op in sessionStorage voor na betaling
    sessionStorage.setItem('seniorease-payment-email', email);
    
    // Redirect direct naar Stripe Payment Link (geen loading state nodig)
    // Test Payment Link (werkt alleen in Test Mode)
    const stripeUrl = new URL('https://buy.stripe.com/test_cNi3co3yC45O70b4NM6c000');
    stripeUrl.searchParams.set('client_reference_id', email);
    
    // Redirect direct - geen state update nodig, gebruiker gaat naar Stripe
    window.location.href = stripeUrl.toString();
  }

  if (betaalStatus === 'paid') {
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
                {licentieCode}
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/bibliotheek"
                className="block bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-center"
              >
                → Open Mijn Bibliotheek
              </Link>
              
              <p className="text-senior-sm text-gray-600">
                De app is nu beschikbaar op dit apparaat. 
                U kunt de app installeren via het menu van uw browser.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Mobiele versie kopen
            </h1>
          </div>
        </div>
      </header>

      {/* Betaal Formulier */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-senior-2xl font-bold text-primary mb-2">
                SeniorEase Bibliotheek App
              </h2>
              <p className="text-senior-xl text-gray-700 mb-1">
                € 2,99
              </p>
              <p className="text-senior-sm text-gray-600">
                Eenmalig • Geen abonnement • Levenslange licentie
              </p>
            </div>

            <div className="space-y-6">
              {/* Melding als er al een licentie is */}
              {heeftLicentie && (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                  <p className="text-senior-base font-bold text-blue-900 mb-2">
                    ℹ️ U heeft al een licentie
                  </p>
                  <p className="text-senior-sm text-blue-800 mb-3">
                    U kunt deze pagina gebruiken om een licentie te kopen voor een ander apparaat of voor iemand anders.
                  </p>
                  <Link
                    href="/bibliotheek"
                    className="inline-block text-senior-sm text-blue-700 hover:underline font-bold"
                  >
                    → Ga naar Bibliotheek App
                  </Link>
                </div>
              )}

              {/* E-mail invoer */}
              <div>
                <label className="block text-senior-base font-bold text-gray-700 mb-2">
                  E-mailadres: *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="uw@email.nl"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                           focus:border-primary focus:outline-none"
                  required
                />
                <p className="text-senior-xs text-gray-500 mt-1">
                  Voor uw licentie en eventuele updates
                </p>
              </div>

              {/* Betalingsinfo */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-senior-base font-bold text-gray-800 mb-3">
                  Inbegrepen in uw aankoop:
                </h3>
                <ul className="space-y-2 text-senior-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Volledige bibliotheek app met alle functies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Barcode scanner voor boeken & muziek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Backup maken en terugzetten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Offline werken mogelijk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Toekomstige updates inbegrepen</span>
                  </li>
                </ul>
              </div>

              {/* Betaal knop */}
              <button
                onClick={handleBetalen}
                disabled={!email}
                className="w-full bg-primary text-white px-10 py-6 rounded-xl text-senior-xl font-bold
                         hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span className="text-3xl">💳</span>
                <span>Betaal € 2,99</span>
              </button>

              {/* Betaalmethoden info */}
              <div className="text-center">
                <p className="text-senior-xs text-gray-500 mb-2">
                  Veilig betalen via Stripe
                </p>
                <p className="text-senior-xs text-gray-400">
                  iDEAL, creditcard, bancontact en meer betaalmethoden beschikbaar
                </p>
              </div>
            </div>
          </div>

          {/* Privacy info */}
          <div className="mt-6 text-center">
            <p className="text-senior-xs text-gray-500">
              Door te betalen gaat u akkoord met onze{' '}
              <Link href="/voorwaarden" className="text-primary hover:underline font-bold">
                algemene voorwaarden en privacybeleid
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

