import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { Projector, Printer } from 'lucide-react';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/beamer',
  title: 'Beamer-slides (optioneel)',
  description:
    'Oefentaken groot op het scherm als uw zaal een beamer heeft. Print blijft altijd de basis — ook in clubhuizen zonder beamer.',
  keywords: ['beamer', 'presentatie', 'oefentaken', 'les', 'bibliotheek'],
});

export default function BeamerPage() {
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
          Beamer — optioneel
        </h1>
        <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-10">
          Sommige zalen hebben een beamer; veel clubhuizen niet. Beide situaties zijn goed — ons
          lesmateriaal werkt altijd met <strong>print op tafel</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-paper rounded-senior border border-navy/8 p-7">
            <Printer className="text-gold mb-4" size={28} aria-hidden />
            <h2 className="font-serif text-navy font-semibold text-senior-base mb-2">
              Zonder beamer (standaard)
            </h2>
            <p className="text-navy/70 text-senior-sm leading-relaxed">
              Deelnemerskaart en oefentaken op tafel. Begeleider voordoet op eigen telefoon of
              laptop. Werkt overal.
            </p>
          </div>
          <div className="bg-paper rounded-senior border border-navy/8 p-7">
            <Projector className="text-gold mb-4" size={28} aria-hidden />
            <h2 className="font-serif text-navy font-semibold text-senior-base mb-2">
              Met beamer (extra)
            </h2>
            <p className="text-navy/70 text-senior-sm leading-relaxed">
              Beamer-PDF openen: 1 slide = 1 oefentaak, grote letters. Page Down voor volgende
              stap. Print tóch meenemen.
            </p>
          </div>
        </div>

        <div className="bg-slate rounded-senior border border-navy/8 p-7 max-w-2xl">
          <h2 className="font-serif text-navy font-semibold text-senior-base mb-3">Beschikbaar</h2>
          <p className="text-navy/70 text-senior-sm leading-relaxed mb-4">
            Pilot: beamer-PDF’s bij <strong>pakket G (AI)</strong>. Andere pakketten volgen. Geen
            PowerPoint nodig — gewoon PDF op laptop aangesloten op beamer.
          </p>
          <Link
            href="/lesmateriaal/pakket-g"
            className="text-gold font-semibold text-senior-sm hover:text-gold-light"
          >
            Pakket G — AI →
          </Link>
        </div>
      </div>
    </main>
  );
}
