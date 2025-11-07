'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
              Privacybeleid
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <div className="mb-8">
                <p className="text-senior-base text-gray-700 mb-4">
                  Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-senior-base text-gray-700">
                  Bij SeniorEase hechten wij grote waarde aan uw privacy. Dit privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze gebruiken en beschermen.
                </p>
              </div>

              {/* Gegevens die wij verzamelen */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  1. Gegevens die wij verzamelen
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.1 E-mailadres
                    </h3>
                    <p>
                      Wij verzamelen uw e-mailadres bij aankoop van de mobiele app. Dit gebruiken wij om:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                      <li>Uw licentie te activeren en bevestigen</li>
                      <li>Belangrijke updates over de app te communiceren</li>
                      <li>U te helpen bij vragen of problemen</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.2 Bibliotheek Data
                    </h3>
                    <p>
                      Al uw bibliotheekgegevens (boeken, muziek, notities) worden <strong>alleen opgeslagen op uw eigen apparaat</strong> (in de browser localStorage). Wij hebben <strong>geen toegang</strong> tot uw collectie. U bent zelf verantwoordelijk voor het maken van backups via de "Backup maken" functie in de app.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.3 Betalingsgegevens
                    </h3>
                    <p>
                      Betalingen worden volledig verwerkt door Stripe, een gerenommeerde betalingsprovider. Wij zien <strong>nooit</strong> uw creditcardgegevens, bankgegevens of andere betalingsdetails. Stripe voldoet aan de hoogste beveiligingsstandaarden (PCI-DSS compliant).
                    </p>
                  </div>
                </div>
              </section>

              {/* Hoe wij gegevens gebruiken */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  2. Hoe wij uw gegevens gebruiken
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Om uw licentie te activeren en te beheren</li>
                    <li>Om u te helpen bij vragen via e-mail</li>
                    <li>Om belangrijke updates over de app te communiceren</li>
                    <li>Om technische ondersteuning te bieden</li>
                  </ul>
                  <p className="mt-4">
                    Wij gebruiken uw gegevens <strong>niet</strong> voor marketingdoeleinden zonder uw toestemming.
                  </p>
                </div>
              </section>

              {/* Gegevens opslag */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  3. Gegevens opslag en beveiliging
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      3.1 Lokale Opslag
                    </h3>
                    <p>
                      Uw bibliotheekgegevens worden opgeslagen in de browser van uw apparaat (localStorage). Deze gegevens blijven op uw apparaat en worden niet naar onze servers verzonden. U kunt op elk moment alle data wissen via de "Alle data wissen" optie in de app.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      3.2 Server Opslag
                    </h3>
                    <p>
                      Wij slaan alleen uw e-mailadres op in verband met uw licentie. Deze gegevens worden veilig bewaard en worden alleen gebruikt voor licentiebeheer en communicatie.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      3.3 Beveiliging
                    </h3>
                    <p>
                      Wij nemen beveiliging serieus. Onze website gebruikt HTTPS encryptie. Betalingen worden verwerkt via de beveiligde servers van Stripe.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies en Tracking */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  4. Cookies en Tracking
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>
                    Wij gebruiken <strong>geen tracking cookies</strong>, analytics tools of advertentie trackers. De app functioneert zonder persoonlijke tracking. Wij verzamelen geen gebruikersstatistieken of gedragsdata.
                  </p>
                  <p>
                    De enige cookies die mogelijk worden gebruikt zijn technische cookies die nodig zijn voor de werking van de website (bijv. sessie management).
                  </p>
                </div>
              </section>

              {/* Delen met derden */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  5. Delen met derden
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>
                    Wij delen uw gegevens <strong>niet</strong> met derden, behalve:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Stripe</strong>: Voor betalingsverwerking (alleen betalingsgegevens, niet uw bibliotheek data)</li>
                    <li><strong>Wettelijke verplichtingen</strong>: Als dit wettelijk vereist is</li>
                  </ul>
                  <p className="mt-4">
                    Wij verkopen uw gegevens niet aan derden.
                  </p>
                </div>
              </section>

              {/* Uw rechten */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  6. Uw rechten
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>U heeft de volgende rechten:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Inzage</strong>: Vraag op elk moment welke gegevens wij van u hebben</li>
                    <li><strong>Verwijdering</strong>: Verwijder al uw bibliotheek data via de app ("Alle data wissen")</li>
                    <li><strong>Correctie</strong>: Laat ons weten als gegevens onjuist zijn</li>
                    <li><strong>Bezwaar</strong>: Maak bezwaar tegen het gebruik van uw gegevens</li>
                  </ul>
                  <p className="mt-4">
                    Om uw rechten uit te oefenen, neem contact op via <a href="mailto:info@seniorease.nl" className="text-primary hover:underline font-bold">info@seniorease.nl</a> of <a href="mailto:support@seniorease.nl" className="text-primary hover:underline font-bold">support@seniorease.nl</a>.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  7. Vragen over privacy
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>
                    Heeft u vragen over dit privacybeleid of hoe wij met uw gegevens omgaan?
                  </p>
                  <p>
                    Neem contact op via:
                  </p>
                  <ul className="list-none ml-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="font-bold">E-mail:</span>
                      <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">Support:</span>
                      <a href="mailto:support@seniorease.nl" className="text-primary hover:underline">support@seniorease.nl</a>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Wijzigingen */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-senior-sm text-gray-500">
                  Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wijzigingen worden gepubliceerd op deze pagina met vermelding van de datum van laatste wijziging.
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

