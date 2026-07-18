'use client';

import Link from 'next/link';

export default function DataDeletionPage() {  return (
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
              User Data Deletion – SeniorEase
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <p className="text-senior-sm text-gray-500 italic mb-6">
                Laatste update: {new Date().getFullYear()}
              </p>

              <p className="text-senior-base text-gray-700 mb-6">
                Bij <strong>SeniorEase</strong> respecteren wij jouw privacy. Volgens het Facebook-platformbeleid moet elke gebruiker de mogelijkheid hebben om zijn of haar persoonlijke gegevens te laten verwijderen. Op deze pagina leggen wij uit hoe je dat kunt doen.
              </p>

              <h2 id="hoe-verwijderen" className="text-senior-xl font-bold text-primary mb-4 mt-8">
                Hoe kan ik mijn gegevens laten verwijderen?
              </h2>
              
              <div className="bg-neutral-stone rounded-lg p-6 mb-8">
                <p className="text-senior-base text-gray-700 mb-4">
                  Als je wilt dat alle gegevens die via onze app, website of gekoppelde diensten (zoals Facebook Login) zijn verzameld worden verwijderd, stuur dan een verzoek naar:
                </p>
                <p className="text-senior-base text-gray-700">
                  <strong>E-mail:</strong> <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a><br />
                  <strong>Onderwerpregel:</strong> Verzoek tot gegevensverwijdering
                </p>
              </div>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                Wat gebeurt er na jouw verzoek?
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-4">
                Binnen <strong>30 dagen</strong> zullen wij:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-senior-base text-gray-700 mb-6">
                <li>al jouw persoonsgegevens verwijderen uit onze systemen;</li>
                <li>jou per e-mail bevestigen dat de verwijdering heeft plaatsgevonden.</li>
              </ul>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                Welke gegevens kunnen worden verwijderd?
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-4">
                Afhankelijk van jouw gebruik van onze diensten kunnen dit onder andere de volgende gegevens zijn:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-senior-base text-gray-700 mb-6">
                <li>Naam en e-mailadres (alleen als je die zelf hebt verstrekt);</li>
                <li>Eventuele gegevens die via Facebook Login met ons zijn gedeeld;</li>
                <li>Eventuele gegevens die via formulieren, inschrijvingen of interacties zijn doorgegeven.</li>
              </ul>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Wij bewaren <strong>geen</strong> gegevens langer dan noodzakelijk en wij delen jouw gegevens niet met derden, tenzij dit wettelijk verplicht is.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                Vragen over privacy of gegevensverwijdering?
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Heb je vragen over dit gegevensverwijderingsproces of over ons privacybeleid in het algemeen, neem dan gerust contact op via{' '}
                <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a>.
              </p>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-senior-sm text-gray-500">
                  &copy; {new Date().getFullYear()} SeniorEase. Alle rechten voorbehouden.
                </p>
              </div>

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

