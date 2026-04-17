'use client';

import Link from 'next/link';

const faqItems = [
  {
    vraag: 'Moet ik betalen voor Mijn Bibliotheek?',
    antwoord: (
      <div className="space-y-3">
        <div className="bg-neutral-cream rounded-lg p-4 border border-neutral-stone/40">
          <p className="font-bold text-gray-800 mb-1">Gratis in de browser:</p>
          <p className="text-gray-700">Mijn Bibliotheek is <strong>volledig gratis</strong> te gebruiken in uw browser op alle apparaten — desktop, laptop, iPhone en iPad.</p>
        </div>
        <div className="bg-neutral-cream rounded-lg p-4 border border-neutral-stone/40">
          <p className="font-bold text-gray-800 mb-1">Android app (€4,99 eenmalig):</p>
          <p className="text-gray-700">De Android app staat in de Google Play Store voor <strong>€4,99 eenmalig</strong>. Geen abonnement.</p>
        </div>
      </div>
    ),
  },
  {
    vraag: 'Hoe voeg ik een boek toe?',
    antwoord: (
      <div className="text-gray-700 space-y-3">
        <p><strong>1. Met barcode scanner:</strong></p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Klik op "Barcode scannen met camera"</li>
          <li>Houd de barcode in het kader</li>
          <li>Wacht 4 seconden — de informatie wordt automatisch ingevuld</li>
          <li>Klik "Opslaan"</li>
        </ol>
        <p><strong>2. Handmatig:</strong></p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Klik op "Item handmatig toevoegen"</li>
          <li>Vul de gegevens in of gebruik "Zoeken" bij het ISBN</li>
          <li>Klik "Opslaan"</li>
        </ol>
      </div>
    ),
  },
  {
    vraag: 'Hoe werkt de barcode scanner?',
    antwoord: (
      <div className="text-gray-700 space-y-2">
        <p>De barcode scanner werkt het beste op telefoon of tablet met achtercamera:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Open de scanner in Mijn Bibliotheek</li>
          <li>Houd de barcode (ISBN/EAN) in het kader</li>
          <li>Wacht 4 seconden — informatie wordt automatisch opgehaald</li>
          <li>Controleer en klik "Opslaan"</li>
        </ul>
        <p><strong>Tip:</strong> Zorg voor goed licht en houd de camera stil.</p>
      </div>
    ),
  },
  {
    vraag: 'Hoe maak ik een backup?',
    antwoord: (
      <div className="text-gray-700 space-y-2">
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Open Mijn Bibliotheek</li>
          <li>Klik op het Opties menu rechtsboven</li>
          <li>Kies "Backup maken"</li>
          <li>Kies waar u de backup wilt opslaan</li>
        </ol>
        <p className="mt-2"><strong>Backup terugzetten:</strong></p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Kies "Backup terugzetten" in het Opties menu</li>
          <li>Selecteer uw backup bestand</li>
          <li>Bevestig dat u de backup wilt terugzetten</li>
        </ol>
      </div>
    ),
  },
  {
    vraag: 'Kan ik Mijn Bibliotheek op meerdere apparaten gebruiken?',
    antwoord: (
      <div className="text-gray-700 space-y-2">
        <p>Ja! Mijn Bibliotheek is <strong>gratis in de browser</strong> op alle apparaten. Om uw data over te zetten:</p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Maak een backup op uw huidige apparaat</li>
          <li>Open Mijn Bibliotheek op uw nieuwe apparaat</li>
          <li>Zet de backup terug</li>
        </ol>
      </div>
    ),
  },
  {
    vraag: 'Wat als de barcode niet wordt herkend?',
    antwoord: (
      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
        <li>Probeer het opnieuw met beter licht</li>
        <li>Zorg dat de barcode volledig in het kader staat</li>
        <li>Houd de camera stil tijdens het scannen</li>
        <li>Gebruik bij voorkeur de achtercamera</li>
        <li>Werkt het niet? Voeg het item handmatig toe</li>
      </ul>
    ),
  },
];

export default function HulpPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Hulp & veelgestelde vragen
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Komt u ergens niet uit? Hier vindt u antwoorden op de meest gestelde vragen.
        </p>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>Heeft u een vraag?</h2>
          <p className="text-gray-700 mb-5" style={{ fontSize: '1.15rem' }}>
            Neem gerust contact met ons op via e-mail:
          </p>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.05rem' }}>Algemene vragen:</p>
              <a href="mailto:info@seniorease.nl" className="font-bold text-primary hover:underline" style={{ fontSize: '1.15rem' }}>
                info@seniorease.nl
              </a>
            </div>
            <div>
              <p className="font-bold text-gray-800 mb-1" style={{ fontSize: '1.05rem' }}>Technische support:</p>
              <a href="mailto:support@seniorease.nl" className="font-bold text-primary hover:underline" style={{ fontSize: '1.15rem' }}>
                support@seniorease.nl
              </a>
            </div>
          </div>
        </div>

        {/* Digitale hulp link */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-6 mb-6">
          <p className="text-gray-700 mb-3" style={{ fontSize: '1.15rem' }}>
            Meer uitleg over telefoon, computer en internet:
          </p>
          <Link href="/digitale-hulp" className="font-bold text-primary hover:underline" style={{ fontSize: '1.15rem' }}>
            Digitale hulp voor senioren →
          </Link>
        </div>

        {/* App installatie */}
        <div id="app-installatie" className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
            Mijn Bibliotheek installeren
          </h2>
          <p className="text-gray-700 mb-4" style={{ fontSize: '1.15rem' }}>
            De app staat in de <strong>Google Play Store</strong> en is eenvoudig te installeren:
          </p>
          <ol className="space-y-3 mb-6">
            {[
              'Open de Google Play Store op uw Android telefoon of tablet.',
              'Zoek op "Mijn Bibliotheek SeniorEase" of ga naar de downloadpagina.',
              'Tik op "Installeren" en wacht tot de download klaar is.',
              'Open de app en begin met het bijhouden van uw boeken.',
            ].map((stap, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700" style={{ fontSize: '1.1rem' }}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5" style={{ background: '#8B5E3C' }}>
                  {i + 1}
                </span>
                <span>{stap}</span>
              </li>
            ))}
          </ol>
          <Link href="/download" className="inline-block font-bold text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-sm" style={{ background: '#8B5E3C', fontSize: '1.1rem' }}>
            Naar de downloadpagina →
          </Link>
          <div className="mt-4 bg-neutral-cream rounded-xl p-4 border border-neutral-stone/40 text-gray-600" style={{ fontSize: '1rem' }}>
            <strong>Android:</strong> €4,99 eenmalig via Play Store &nbsp;·&nbsp; <strong>iPhone / iPad / PC:</strong> gratis via de browser
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-6">
              <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '1.25rem' }}>
                {item.vraag}
              </h2>
              <div className="text-senior-base">
                {item.antwoord}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
