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
            
            {/* Geruststellende intro */}
            <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 mb-8">
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed mb-3">
                Komt u ergens niet uit?<br />
                <span className="font-bold">Dat is heel normaal.</span>
              </p>
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed">
                Hier vindt u antwoorden<br />
                op de meest gestelde vragen.
              </p>
            </div>

            {/* E-mailcontact - duidelijk zichtbaar */}
            <div className="bg-primary/10 border-4 border-primary rounded-xl p-6 mb-8 text-center">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                📧 Heeft u een vraag?
              </h2>
              <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                Neem gerust contact met ons op via e-mail:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-senior-base font-bold text-gray-800 mb-2">Algemene vragen:</p>
                  <a 
                    href="mailto:info@seniorease.nl" 
                    className="text-senior-lg md:text-senior-xl font-bold text-primary hover:text-primary-dark underline"
                  >
                    info@seniorease.nl
                  </a>
                </div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800 mb-2">Technische support:</p>
                  <a 
                    href="mailto:support@seniorease.nl" 
                    className="text-senior-lg md:text-senior-xl font-bold text-primary hover:text-primary-dark underline"
                  >
                    support@seniorease.nl
                  </a>
                </div>
              </div>
              <p className="text-senior-sm text-gray-600 mt-4">
                Geen formulieren verplicht • Stuur gewoon een e-mail
              </p>
            </div>

            {/* Mijn Bibliotheek Installatie Sectie */}
            <div id="app-installatie" className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-4 border-yellow-400 mb-8">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                📱 Mijn Bibliotheek Installeren - Uitgebreide Instructies
              </h2>
              
              {/* Proberen op Telefoon of Tablet */}
              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-yellow-300">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  🎁 Mijn Bibliotheek Proberen op Telefoon of Tablet (Gratis)
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p className="font-bold text-primary">Stap 1: Download Mijn Bibliotheek om te proberen</p>
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
                  
                  <p className="font-bold text-primary mt-4">Stap 3: Installeer Mijn Bibliotheek</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li><strong>Melding: "Openen met pakket installatie?"</strong> → Klik <strong>"Openen"</strong></li>
                    <li><strong>Melding: "Installeer apps van onbekende bronnen toestaan?"</strong> → Klik <strong>"Toestaan"</strong></li>
                    <li>Kies uw browser (Chrome, Firefox, etc.) en klik <strong>"Toestaan van deze bron"</strong></li>
                    <li>Klik op <strong>"Installeren"</strong></li>
                    <li>Wacht tot installatie klaar is (10-30 seconden)</li>
                    <li>Klik op <strong>"Openen"</strong> om Mijn Bibliotheek te starten</li>
                  </ol>
                  
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mt-4">
                    <p className="text-senior-sm text-blue-900">
                      <span className="font-bold">💡 Tip:</span> Als u dit vaker doet, kunt u "Toestaan van deze bron" permanent aanzetten in Instellingen → Apps → Speciale toegang → "Installeer onbekende apps".
                    </p>
                  </div>
                </div>
              </div>

              {/* Info over Proberen */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  ℹ️ Over het Proberen
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p>
                    Het proberen is <strong>volledig gratis</strong> en bevat alle functionaliteit van Mijn Bibliotheek, met een limiet van <strong>10 boeken</strong>.
                  </p>
                  <p>
                    Tijdens het proberen kunt u:
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
                      <span className="font-bold">💡 Tip:</span> Perfect om Mijn Bibliotheek te proberen! Als u meer dan 10 boeken wilt opslaan, kunt u altijd een backup maken en deze later terugzetten.
                    </p>
                  </div>
                </div>
              </div>

              {/* Volledige Versie Aanschaffen */}
              <div className="bg-white rounded-xl p-6 border-2 border-primary">
                <h3 className="text-senior-lg font-bold text-primary mb-4">
                  💳 Volledige Versie Eenmalig Aanschaffen (€2,99)
                </h3>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <p className="font-bold text-primary">Stap 1: Schaf de volledige versie eenmalig aan</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Ga naar de <Link href="/betalen" className="text-primary hover:underline">betaalpagina</Link></li>
                    <li>Klik op "Eenmalig aanschaffen" (€2,99)</li>
                    <li>Volg de betaalstappen</li>
                    <li>Na betaling ontvangt u een licentiecode</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 2: Download de volledige versie</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Ga naar de <Link href="/download" className="text-primary hover:underline">downloadpagina</Link></li>
                    <li>Voer uw licentiecode in</li>
                    <li>Download de volledige versie (Seniorease-Bibliotheek.apk)</li>
                  </ol>
                  
                  <p className="font-bold text-primary mt-4">Stap 3: Installeer Mijn Bibliotheek</p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Volg dezelfde stappen als bij het proberen (zie hierboven)</li>
                    <li>Klik "Openen" → "Toestaan" → "Installeren"</li>
                    <li>Open Mijn Bibliotheek en geniet van onbeperkt gebruik!</li>
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
                  💳 Moet ik betalen voor Mijn Bibliotheek?
                </h2>
                <div className="text-senior-base text-gray-700 space-y-3">
                  <div className="bg-white rounded-xl p-4 border-2 border-primary/20">
                    <p className="font-bold text-primary mb-2">🌐 Gratis op de pc:</p>
                    <p>
                      Mijn Bibliotheek is <strong>volledig gratis</strong> op alle apparaten (desktop, laptop, Android, iPhone en iPad). U kunt Mijn Bibliotheek gebruiken in uw browser of installeren als PWA (Progressive Web App). Geen kosten, geen abonnementen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border-2 border-yellow-300">
                    <p className="font-bold text-primary mb-2">📱 Proberen op telefoon of tablet (Gratis):</p>
                    <p>
                      Het proberen is <strong>volledig gratis</strong> voor Android telefoons en tablets. Tijdens het proberen heeft u een limiet van <strong>10 boeken</strong>, maar alle functionaliteit is beschikbaar. Perfect om Mijn Bibliotheek te proberen!
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                    <p className="font-bold text-primary mb-2">💳 Volledige versie (Eenmalig aanschaffen - €2,99):</p>
                    <p>
                      De volledige versie voor Android kost <strong>€2,99 eenmalig aanschaffen</strong>. Dit geeft u onbeperkt gebruik zonder limiet op het aantal boeken. Geen abonnement, eenmalige aanschaf.
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
                    <li>Open de scanner in Mijn Bibliotheek</li>
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
                    <li>Open Mijn Bibliotheek</li>
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
                  🔄 Kan ik Mijn Bibliotheek gebruiken op meerdere apparaten?
                </h2>
                <div className="text-senior-base text-gray-700">
                  <p>
                    Ja! U kunt Mijn Bibliotheek op zoveel apparaten gebruiken als u wilt. Mijn Bibliotheek is <strong>gratis op de pc</strong> en werkt op desktop, laptop, telefoon en tablet.
                  </p>
                  <p className="mt-3">
                    Om uw bibliotheek data over te zetten naar een ander apparaat, gebruikt u de backup functie:
                  </p>
                  <ol className="list-decimal list-inside ml-4 space-y-1 mt-2">
                    <li>Maak een backup op uw huidige apparaat</li>
                    <li>Open Mijn Bibliotheek op uw nieuwe apparaat</li>
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

