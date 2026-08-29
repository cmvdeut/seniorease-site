import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/woordenlijst',
  title: 'Woordenlijst — digitale termen in gewone taal',
  description:
    'Downloaden = lokaal opslaan, wifi, browser, DigiD, AI — korte uitleg voor deelnemers en begeleiders.',
  keywords: ['woordenlijst', 'jargon', 'senioren', 'downloaden', 'wifi', 'DigiD'],
});

const WOORDEN = [
  {
    term: 'Downloaden',
    uitleg:
      'Iets van internet naar uw toestel halen en daar bewaren. Hetzelfde als lokaal opslaan — het bestand staat op uw telefoon, tablet of computer.',
  },
  {
    term: 'Uploaden',
    uitleg: 'Iets van uw toestel naar internet sturen — het tegenovergestelde van downloaden.',
  },
  {
    term: 'Wifi',
    uitleg: 'Draadloos internet in huis, via uw modem. Geen kabel nodig, wel dichtbij de router.',
  },
  {
    term: 'Browser',
    uitleg:
      'Het programma waarmee u websites bekijkt: Chrome, Safari of Edge. Hetzelfde als internet openen op uw scherm.',
  },
  {
    term: 'App',
    uitleg: 'Een programma op uw telefoon of tablet — WhatsApp, de fotogalerij, weer-app.',
  },
  {
    term: 'Link',
    uitleg: 'Een klikbare verwijzing naar een website. Vaak blauw en onderstreept.',
  },
  {
    term: 'QR-code',
    uitleg:
      'Een vierkant met streepjes. Met de camera opent u een link — hetzelfde als scannen in plaats van typen.',
  },
  {
    term: 'DigiD',
    uitleg:
      'Uw persoonlijke inlog voor veel overheidswebsites. Niet hetzelfde als een gewoon e-mailwachtwoord.',
  },
  {
    term: 'AI / ChatGPT',
    uitleg:
      'Software die tekst maakt of antwoord geeft. Lijkt soms op een gesprek — maar het is geen mens en kan fout zitten.',
  },
  {
    term: 'Prompt',
    uitleg: 'Uw vraag aan AI, bijvoorbeeld: “Geef een recept voor appeltaart.”',
  },
];

export default function WoordenlijstPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/lesmateriaal"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Lesmateriaal
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-5">
          Woordenlijst
        </h1>
        <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-10">
          Digitale termen in gewone taal — voor aan de muur in de zaal, of om mee te nemen naar
          huis. Uit te breiden; volledige lijst volgt in print/PDF.
        </p>

        <dl className="space-y-4">
          {WOORDEN.map(({ term, uitleg }) => (
            <div
              key={term}
              className="bg-paper rounded-senior border border-navy/8 px-6 py-5"
            >
              <dt className="font-serif text-gold font-semibold text-senior-base mb-2">{term}</dt>
              <dd className="text-navy/85 text-senior-sm leading-relaxed">{uitleg}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
