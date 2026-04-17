'use client';

import Link from 'next/link';

export default function VoorwaardenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Algemene Voorwaarden & Privacybeleid
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Lees hier onze voorwaarden en hoe wij omgaan met uw gegevens.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6 space-y-10">

          {/* Algemene Voorwaarden */}
          <section>
            <h2 className="font-bold text-gray-900 mb-5" style={{ fontSize: '1.5rem' }}>
              1. Algemene Voorwaarden SeniorEase Bibliotheek App
            </h2>
            <div className="space-y-5 text-gray-700" style={{ fontSize: '1.05rem' }}>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.1 Licentie</h3>
                <p>Door aankoop van de SeniorEase Bibliotheek App via de Google Play Store verkrijgt u een levenslange licentie voor persoonlijk gebruik. De licentie is niet overdraagbaar naar andere personen.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.2 Prijs en Betaling</h3>
                <p>De app kost eenmalig € 4,99. Betaling verloopt via de Google Play Store. Na succesvolle betaling ontvangt u direct toegang tot de app. U ontvangt geen fysiek product.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.3 Gebruik</h3>
                <p>De app is bedoeld voor persoonlijk gebruik. U mag de app gebruiken om uw boeken- en muziekcollectie bij te houden. Het is niet toegestaan de app te gebruiken voor commerciële doeleinden zonder toestemming.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.4 Retourbeleid</h3>
                <p>Het retourbeleid van Google Play is van toepassing. Binnen 2 uur na aankoop kunt u de app terugbetaald krijgen via de Play Store. U kunt de app ook eerst gratis uitproberen via de browser op seniorease.nl.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.5 Updates</h3>
                <p>Toekomstige updates van de app zijn inbegrepen bij uw aankoop. Wij streven ernaar de app regelmatig te verbeteren en nieuwe functies toe te voegen.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.6 Beschikbaarheid</h3>
                <p>Wij streven ernaar de app beschikbaar te houden, maar kunnen niet garanderen dat de app altijd zonder onderbrekingen beschikbaar is. Wij zijn niet aansprakelijk voor eventueel gegevensverlies.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>1.7 Wijzigingen Voorwaarden</h3>
                <p>Wij behouden ons het recht voor deze voorwaarden te wijzigen. Wijzigingen worden bekendgemaakt via de website. Uw gebruik na wijzigingen betekent acceptatie van de nieuwe voorwaarden.</p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-stone/30" />

          {/* Privacybeleid */}
          <section>
            <h2 className="font-bold text-gray-900 mb-5" style={{ fontSize: '1.5rem' }}>
              2. Privacybeleid
            </h2>
            <div className="space-y-5 text-gray-700" style={{ fontSize: '1.05rem' }}>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.1 Gegevensverzameling</h3>
                <p className="mb-2">Wij verzamelen alleen de volgende gegevens:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>E-mailadres: voor uw licentie en eventuele communicatie</li>
                  <li>Bibliotheek data: uw boeken- en muziekcollectie (alleen lokaal op uw apparaat opgeslagen)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.2 Lokale Opslag</h3>
                <p>Al uw bibliotheek data wordt alleen opgeslagen op uw eigen apparaat (localStorage). Wij hebben geen toegang tot uw collectie. U bent zelf verantwoordelijk voor het maken van backups.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.3 Betalingsgegevens</h3>
                <p>Betalingen worden verwerkt door Google Play. Wij zien geen betaalgegevens of andere betalingsdetails. Google Play voldoet aan de hoogste beveiligingsstandaarden.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.4 Cookies en Tracking</h3>
                <p>Wij gebruiken geen tracking cookies of analytics. De app functioneert zonder persoonlijke tracking. Wij verzamelen geen gebruikersstatistieken.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.5 Delen van Gegevens</h3>
                <p className="mb-2">Wij delen uw gegevens niet met derden, behalve:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Google Play (voor betalingsverwerking)</li>
                  <li>Wanneer dit wettelijk verplicht is</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.1rem' }}>2.6 Uw Rechten</h3>
                <p className="mb-2">U heeft het recht:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Inzage te vragen in uw opgeslagen gegevens</li>
                  <li>Uw gegevens te verwijderen via de app (optie "Alle data wissen")</li>
                  <li>Vragen te stellen over ons privacybeleid</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-neutral-stone/30" />

          {/* Contact */}
          <section>
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
              3. Contact & Vragen
            </h2>
            <div className="text-gray-700 space-y-2" style={{ fontSize: '1.05rem' }}>
              <p>Heeft u vragen over deze voorwaarden of het privacybeleid?</p>
              <p>Neem contact op via: <a href="mailto:info@seniorease.nl" className="text-primary hover:underline font-medium">info@seniorease.nl</a></p>
            </div>
          </section>

          <div className="pt-4 border-t border-neutral-stone/30">
            <p className="text-gray-400" style={{ fontSize: '0.9rem' }}>
              Laatste wijziging: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
