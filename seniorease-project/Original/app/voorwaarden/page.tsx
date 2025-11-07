'use client';

import Link from 'next/link';

export default function VoorwaardenPage() {
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
              Algemene Voorwaarden & Privacybeleid
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              {/* Algemene Voorwaarden */}
              <section className="mb-12">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  1. Algemene Voorwaarden SeniorEase Bibliotheek App
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.1 Licentie
                    </h3>
                    <p>
                      Door aankoop van de SeniorEase Bibliotheek App verkrijgt u een levenslange licentie voor gebruik op één apparaat (telefoon of tablet). De licentie is persoonlijk en niet overdraagbaar naar andere personen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.2 Prijs en Betaling
                    </h3>
                    <p>
                      De app kost eenmalig € 2,99. Betaling verloopt via Stripe (veilige betalingsprovider). Na succesvolle betaling ontvangt u direct toegang tot de app. U ontvangt geen fysiek product.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.3 Gebruik
                    </h3>
                    <p>
                      De app is bedoeld voor persoonlijk gebruik. U mag de app gebruiken om uw boeken- en muziekcollectie bij te houden. Het is niet toegestaan de app te gebruiken voor commerciële doeleinden zonder toestemming.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.4 Retourbeleid
                    </h3>
                    <p>
                      Gezien de digitale aard van de app en de directe toegang na aankoop, is er geen recht op terugbetaling. U kunt de app eerst gratis gebruiken op desktop/laptop om te zien of het bij u past.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.5 Updates
                    </h3>
                    <p>
                      Toekomstige updates van de app zijn inbegrepen bij uw aankoop. Wij streven ernaar de app regelmatig te verbeteren en nieuwe functies toe te voegen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.6 Beschikbaarheid
                    </h3>
                    <p>
                      Wij streven ernaar de app beschikbaar te houden, maar kunnen niet garanderen dat de app altijd zonder onderbrekingen beschikbaar is. Wij zijn niet aansprakelijk voor eventuele gegevensverlies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.7 Wijzigingen Voorwaarden
                    </h3>
                    <p>
                      Wij behouden ons het recht voor deze voorwaarden te wijzigen. Wijzigingen worden bekendgemaakt via de website. Uw gebruik na wijzigingen betekent acceptatie van de nieuwe voorwaarden.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacybeleid */}
              <section className="mb-12">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  2. Privacybeleid
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.1 Gegevensverzameling
                    </h3>
                    <p>
                      Wij verzamelen alleen de volgende gegevens:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                      <li>E-mailadres: Voor uw licentie en eventuele communicatie</li>
                      <li>Bibliotheek data: Uw boeken- en muziekcollectie (alleen lokaal op uw apparaat opgeslagen)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.2 Lokale Opslag
                    </h3>
                    <p>
                      Al uw bibliotheek data wordt alleen opgeslagen op uw eigen apparaat (localStorage). Wij hebben geen toegang tot uw collectie. U bent zelf verantwoordelijk voor het maken van backups.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.3 Betalingsgegevens
                    </h3>
                    <p>
                      Betalingen worden verwerkt door Stripe. Wij zien geen creditcardgegevens of andere betalingsdetails. Stripe voldoet aan de hoogste beveiligingsstandaarden (PCI-DSS compliant).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.4 Cookies en Tracking
                    </h3>
                    <p>
                      Wij gebruiken geen tracking cookies of analytics. De app functioneert zonder persoonlijke tracking. Wij verzamelen geen gebruikersstatistieken.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.5 Delen van Gegevens
                    </h3>
                    <p>
                      Wij delen uw gegevens niet met derden, behalve:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                      <li>Stripe (voor betalingsverwerking)</li>
                      <li>Wanneer dit wettelijk verplicht is</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      2.6 Uw Rechten
                    </h3>
                    <p>
                      U heeft het recht:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                      <li>Inzage te vragen in uw opgeslagen gegevens</li>
                      <li>Uw gegevens te verwijderen via de app (optie "Alle data wissen")</li>
                      <li>Vragen te stellen over ons privacybeleid</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-12">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  3. Contact & Vragen
                </h2>
                
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>
                    Heeft u vragen over deze voorwaarden of het privacybeleid?
                  </p>
                  <p>
                    Neem contact op via: <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a>
                  </p>
                  <p>
                    Of bezoek onze website: <a href="https://seniorease.nl" className="text-primary hover:underline">seniorease.nl</a>
                  </p>
                </div>
              </section>

              {/* Laatste Wijziging */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-senior-sm text-gray-500">
                  Laatste wijziging: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
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

