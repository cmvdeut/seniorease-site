import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import PopularCard from '@/app/components/PopularCard';
import NieuwsbriefBlok from '@/app/components/NieuwsbriefBlok';
import { YoutubeChannelCta } from '@/app/components/YoutubeHint';
import { buildPageMetadata, toolsCollectionSchema } from '@/lib/seo';
import { ToolsCategorieen } from './ToolsCategorieen';

export const metadata = buildPageMetadata({
  path: '/tools',
  title: 'Handige tools voor senioren',
  description:
    'Rekenmachine, verjaardagskalender, afvinken, klok, puzzels en meer. Grote knoppen, rustig ontworpen voor senioren.',
  keywords: ['tools senioren', 'rekenmachine', 'verjaardagskalender', 'afvinken'],
});

const POPULAIR = [
  {
    title: 'Rekenmachine',
    href: '/rekenmachine',
    description: 'Grote knoppen — ook valuta omrekenen.',
  },
  {
    title: 'Verjaardagskalender',
    href: '/kalender',
    description: 'Nooit meer een verjaardag vergeten.',
  },
  {
    title: 'Afvinken maar!',
    href: '/afvinken',
    description: 'Boodschappen en to-dolijstjes.',
  },
  {
    title: 'Mijn Bibliotheek',
    href: '/bibliotheek',
    description: 'Boeken en muziek bijhouden.',
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={toolsCollectionSchema} />

      <section className="bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-10 md:pb-12">
          <Link
            href="/"
            className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
          >
            ← Terug naar home
          </Link>

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-10 max-w-2xl">
            Handige tools met grote knoppen.
          </h1>

          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
            Of kies een onderwerp
          </h2>
          <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
            Grote knoppen naar alle tools per thema.
          </p>
          <ToolsCategorieen />
        </div>
      </section>

      <section className="bg-slate py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-8">
            Meest bekeken
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {POPULAIR.map((item) => (
              <PopularCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6 space-y-8">
          <NieuwsbriefBlok />

          <YoutubeChannelCta
            title="Liever een filmpje?"
            description="Op YouTube laten we rustig zien hoe Mijn Bibliotheek en andere onderwerpen werken."
          />
        </div>
      </section>
    </main>
  );
}
