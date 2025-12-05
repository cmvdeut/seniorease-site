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

            {/* App Installatie Sectie */}
            <div id="app-installatie" className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-4 border-yellow-400 mb-8">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                📱 App Installatie - Uitgebreide Instructies
              </h2>
              
              {/* Demo App Installatie */}
              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-yellow-300">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  🎁 Demo App Installeren (Gratis)
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p className="font-bold text-primary">Stap 1: Download de Demo APK</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Ga naar de homepage: <Link href="/" className="text-primary hover:underline">www.seniorease.nl</Link></li>
                    <li>Scan de QR code met uw Android telefoon, of</li>
                    <li>Klik op "Direct APK downloaden" onder de QR code</li>
                    <li>Wacht tot de download klaar is (ongeveer 30 MB)</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 2: Open het gedownloade bestand</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Open uw Downloads map of meldingen</li>
                    <li>Zoek het bestand: <strong>"Seniorease-Bibliotheek-Demo.apk"</strong></li>
                    <li>Klik op het bestand om te openen</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 3: Installeer de app</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li><strong>Melding: "Openen met pakket installatie?"</strong> → Klik <strong>"Openen"</strong></li>
                    <li><strong>Melding: "Installeer apps van onbekende bronnen toestaan?"</strong> → Klik <strong>"Toestaan"</strong></li>
                    <li>Kies uw browser (Chrome, Firefox, etc.) en klik <strong>"Toestaan van deze bron"</strong></li>
                    <li>Klik op <strong>"Installeren"</strong></li>
                    <li>Wacht tot installatie klaar is (10-30 seconden)</li>
                    <li>Klik op <strong>"Openen"</strong> om de app te starten</li>
                  </ol>
                  
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mt-4">
                    <p className="text-senior-sm text-blue-900">
                      <span className="font-bold">💡 Tip:</span> Als u dit vaker doet, kunt u "Toestaan van deze bron" permanent aanzetten in Instellingen → Apps → Speciale toegang → "Installeer onbekende apps".
                    </p>
                  </div>
                </div>
              </div>

              {/* Info over Demo Versie */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  ℹ️ Over de Demo Versie
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p>
                    De demo versie is <strong>volledig gratis</strong> en bevat alle functionaliteit van de app, met een limiet van <strong>10 items</strong>.
                  </p>
                  <p>
                    Met de demo versie kunt u:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Boeken toevoegen via barcode scanner</li>
                    <li>Boeken handmatig toevoegen met zoekfunctie</li>
                    <li>Backup maken en terugzetten</li>
                    <li>PDF exporteren en delen via email</li>
                    <li>Zoeken en filteren in uw bibliotheek</li>
                  </ul>
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mt-4">
                    <p className="text-senior-sm text-yellow-900">
                      <span className="font-bold">💡 Tip:</span> De demo versie is perfect om de app uit te proberen! Als u meer dan 10 items wilt opslaan, kunt u altijd een backup maken en deze later terugzetten.
                    </p>
                  </div>
                </div>
              </div>

              {/* Volledige App Installatie */}
              <div className="bg-white rounded-xl p-6 border-2 border-primary">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  💳 Volledige App Installeren (Betaald - €2,99)
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p className="font-bold text-primary">Stap 1: Betaal voor de volledige app</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Ga naar de <Link href="/betalen" className="text-primary hover:underline">betaalpagina</Link></li>
                    <li>Klik op "Koop licentie" (€2,99 eenmalig)</li>
                    <li>Volg de betaalstappen</li>
                    <li>Na betaling ontvangt u een licentiecode</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 2: Download de volledige app</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Ga naar de <Link href="/download" className="text-primary hover:underline">downloadpagina</Link></li>
                    <li>Voer uw licentiecode in</li>
                    <li>Download de volledige APK (Seniorease-Bibliotheek.apk)</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 3: Installeer de app</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Volg dezelfde stappen als bij de demo app (zie hierboven)</li>
                    <li>Klik "Openen" → "Toestaan" → "Installeren"</li>
                    <li>Open de app en geniet van onbeperkt gebruik!</li>
                  </ol>
                  
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mt-4">
                    <p className="text-senior-sm text-green-900">
                      <span className="font-bold">✅ Voordeel:</span> Volledige versie heeft geen limiet en werkt op alle Android apparaten!
                    </p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mt-4">
                    <p className="text-senior-sm text-blue-900">
                      <span className="font-bold">📱 Platform informatie:</span>
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2 text-senior-sm">
                      <li><strong>Web versie:</strong> Werkt op alle apparaten (Android, iPhone, iPad) - gratis</li>
                      <li><strong>APK download:</strong> Alleen voor Android telefoons en tablets - €2,99</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
              
              {/* FAQ 1 - Verwijderd, nu in app-installatie sectie */}
              
              {/* FAQ 2 */}

              {/* FAQ 2 */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  💳 Moet ik betalen voor de app?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <div className="bg-white rounded-xl p-4 border-2 border-primary/20">
                    <p className="font-bold text-primary mb-2">🌐 Web App (Gratis):</p>
                    <p>
                      De web versie is <strong>volledig gratis</strong> op alle apparaten (desktop, laptop, Android, iPhone en iPad). U kunt de app gebruiken in uw browser of installeren als PWA (Progressive Web App). Geen kosten, geen abonnementen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border-2 border-yellow-300">
                    <p className="font-bold text-primary mb-2">📱 Demo App (Gratis):</p>
                    <p>
                      De demo APK is <strong>volledig gratis</strong> voor Android telefoons en tablets. De demo versie heeft een limiet van <strong>10 items</strong>, maar alle functionaliteit is beschikbaar. Perfect om de app uit te proberen!
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <p className="font-bold text-primary mb-2">💳 Volledige App (Betaald - €2,99):</p>
                    <p>
                      De volledige Android APK kost <strong>€2,99 eenmalig</strong>. Dit geeft u onbeperkt gebruik zonder limiet op het aantal items. Geen abonnement, eenmalige betaling.
                    </p>
                  </div>
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
                    Ja! U kunt de app op zoveel apparaten gebruiken als u wilt. De app is <strong>volledig gratis</strong> en werkt op desktop, laptop, telefoon en tablet.
                  </p>
                  <p className="mt-3">
                    Om uw bibliotheek data over te zetten naar een ander apparaat, gebruikt u de backup functie:
                  </p>
                  <ol className="list-decimal list-inside ml-4 space-y-1 mt-2">
                    <li>Maak een backup op uw huidige apparaat</li>
                    <li>Installeer de app op uw nieuwe apparaat</li>
                    <li>Zet de backup terug op het nieuwe apparaat</li>
                  </ol>
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

