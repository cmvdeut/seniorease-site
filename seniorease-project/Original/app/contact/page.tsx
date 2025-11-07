'use client';

import Link from 'next/link';

export default function ContactPage() {
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
              Contact
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✉️</div>
              <p className="text-senior-lg text-gray-700 mb-6">
                Heeft u vragen, opmerkingen of hulp nodig? Wij helpen u graag!
              </p>
            </div>

            {/* Contact Opties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Algemene Vragen */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <div className="text-4xl mb-4">📧</div>
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  Algemene Vragen
                </h2>
                <p className="text-senior-base text-gray-700 mb-4">
                  Voor vragen over de app, licenties, of algemene informatie:
                </p>
                <a
                  href="mailto:info@seniorease.nl"
                  className="inline-block bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  info@seniorease.nl
                </a>
              </div>

              {/* Technische Support */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <div className="text-4xl mb-4">🛠️</div>
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  Technische Support
                </h2>
                <p className="text-senior-base text-gray-700 mb-4">
                  Voor technische problemen, bugs of installatie hulp:
                </p>
                <a
                  href="mailto:support@seniorease.nl"
                  className="inline-block bg-secondary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  support@seniorease.nl
                </a>
              </div>

            </div>

            {/* Contact Informatie */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <h3 className="text-senior-base font-bold text-blue-900 mb-3">
                💡 Wanneer reageren wij?
              </h3>
              <ul className="text-senior-sm text-blue-800 space-y-2">
                <li>✓ Wij streven ernaar binnen 1-2 werkdagen te reageren</li>
                <li>✓ Voor dringende technische problemen proberen wij sneller te reageren</li>
                <li>✓ Vermeld in uw e-mail bij voorkeur uw apparaattype en browser</li>
              </ul>
            </div>

            {/* Veelgestelde Vragen Link */}
            <div className="text-center">
              <p className="text-senior-base text-gray-700 mb-4">
                Heeft u een snelle vraag? Bekijk eerst onze veelgestelde vragen:
              </p>
              <Link
                href="/hulp"
                className="inline-block bg-gray-600 text-white px-6 py-4 rounded-xl text-senior-base font-bold
                         hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
              >
                → Bekijk veelgestelde vragen
              </Link>
            </div>

          </div>

          {/* Terug Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-block text-senior-base text-primary hover:underline"
            >
              ← Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

