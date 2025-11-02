'use client';

import Link from 'next/link';

export default function HulpPage() {
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
              Hulp & Veelgestelde Vragen
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            
            {/* Inleiding */}
            <div className="mb-8">
              <p className="text-senior-base text-gray-700 mb-4">
                Heeft u vragen over de SeniorEase Bibliotheek App? Hier vindt u antwoorden op de meest gestelde vragen.
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
              
              {/* FAQ 1 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  📱 Hoe installeer ik de app op mijn telefoon?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-2">
                  <p><strong>Op Android:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Open de bibliotheek app in Chrome</li>
                    <li>Klik op de drie puntjes (⋮) rechtsboven</li>
                    <li>Kies "Installeer app" of "Toevoegen aan startscherm"</li>
                    <li>Bevestig met "Toevoegen"</li>
                  </ol>
                  <p className="mt-3"><strong>Op iPhone/iPad:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Open de bibliotheek app in Safari</li>
                    <li>Klik op het deel-icoon (vierkant met pijl) onderaan</li>
                    <li>Scroll en kies "Voeg toe aan beginscherm"</li>
                    <li>Klik "Toevoegen"</li>
                  </ol>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  💳 Moet ik betalen voor de app?
                </h2>
                <div className="text-senior-base text-gray-700">
                  <p>
                    De app is <strong>gratis</strong> op desktop/laptop. Voor gebruik op telefoon of tablet kost de app eenmalig <strong>€ 2,99</strong>. Dit is een levenslange licentie, geen abonnement. U ontvangt ook alle toekomstige updates.
                  </p>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  📚 Hoe voeg ik een boek toe?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-2">
                  <p>U kunt een boek toevoegen op twee manieren:</p>
                  <p><strong>1. Met barcode scanner:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Klik op "Barcode scannen met camera"</li>
                    <li>Houd de barcode in het kader</li>
                    <li>Wacht 4 seconden (aftelling)</li>
                    <li>De informatie wordt automatisch ingevuld</li>
                    <li>Klik "Opslaan"</li>
                  </ol>
                  <p className="mt-3"><strong>2. Handmatig:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Klik op "Item handmatig toevoegen"</li>
                    <li>Vul de gegevens in</li>
                    <li>Bij ISBN/EAN code: klik op "Zoeken" om automatisch informatie op te halen</li>
                    <li>Klik "Opslaan"</li>
                  </ol>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  🔍 Hoe werkt de barcode scanner?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-2">
                  <p>De barcode scanner werkt het beste op telefoon of tablet met achter camera:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Open de scanner in de bibliotheek app</li>
                    <li>Houd de barcode (ISBN/EAN) in het kader</li>
                    <li>Wacht 4 seconden terwijl de camera scherpstelt</li>
                    <li>De informatie wordt automatisch opgehaald uit online databases</li>
                    <li>Controleer en klik "Opslaan"</li>
                  </ul>
                  <p className="mt-3"><strong>Tip:</strong> Zorg voor goed licht en houd de camera stil.</p>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  💾 Hoe maak ik een backup?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-2">
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Open de bibliotheek app</li>
                    <li>Klik op het Opties menu (⚙️) rechtsboven</li>
                    <li>Kies "Backup maken"</li>
                    <li>Kies waar u de backup wilt opslaan (bijv. Bureaublad of Documenten)</li>
                    <li>De backup wordt opgeslagen als JSON bestand</li>
                  </ol>
                  <p className="mt-3"><strong>Backup terugzetten:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>Kies "Backup terugzetten" in het Opties menu</li>
                    <li>Selecteer uw backup bestand</li>
                    <li>Bevestig dat u de backup wilt terugzetten</li>
                  </ol>
                </div>
              </div>

              {/* FAQ 6 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  🔄 Kan ik de app gebruiken op meerdere apparaten?
                </h2>
                <div className="text-senior-base text-gray-700">
                  <p>
                    De licentie werkt op <strong>één apparaat</strong> (telefoon of tablet). Als u de app op een ander apparaat wilt gebruiken, moet u opnieuw een licentie aanschaffen. Uw bibliotheek data kan u via de backup functie overzetten naar het nieuwe apparaat.
                  </p>
                </div>
              </div>

              {/* FAQ 7 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  ❌ Wat als de barcode niet wordt herkend?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-2">
                  <p>Als de barcode niet wordt herkend:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Probeer het opnieuw met beter licht</li>
                    <li>Zorg dat de barcode volledig in het kader staat</li>
                    <li>Houd de camera stil tijdens het scannen</li>
                    <li>Gebruik bij voorkeur de achter camera van uw telefoon</li>
                    <li>Als het niet werkt, voeg het item handmatig toe</li>
                  </ul>
                </div>
              </div>

              {/* FAQ 8 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  📧 Ik heb een andere vraag
                </h2>
                <div className="text-senior-base text-gray-700">
                  <p>
                    Heeft u een vraag die hier niet bij staat? Neem gerust contact met ons op:
                  </p>
                  <ul className="list-none ml-4 space-y-2 mt-3">
                    <li className="flex items-center gap-2">
                      <span className="font-bold">Algemene vragen:</span>
                      <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">Technische support:</span>
                      <a href="mailto:support@seniorease.nl" className="text-primary hover:underline">support@seniorease.nl</a>
                    </li>
                  </ul>
                </div>
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

