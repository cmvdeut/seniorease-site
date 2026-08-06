import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import PopularCard from '@/app/components/PopularCard';
import { YoutubeChannelCta } from '@/app/components/YoutubeHint';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import { UITLEG_CLUSTERS } from './clusters';
import { UitlegCategorieen } from './UitlegCategorieen';

export const metadata = buildPageMetadata({
  path: '/uitleg',
  title: 'Alle uitleg',
  description:
    'Overzicht van alle stap-voor-stap uitleg voor senioren: videobellen, streaming, online winkelen, reizen en meer.',
  keywords: ['uitleg senioren', 'stap voor stap', 'technologie uitleg', 'WhatsApp', 'DigiD'],
});

const uitlegListItems = UITLEG_CLUSTERS.flatMap((cluster) =>
  cluster.paginas.map((p) => ({ name: p.label, path: p.href })),
);

const uitlegCollectionSchema = buildCollectionPageSchema(
  'Alle uitleg voor senioren',
  'Overzicht van alle stap-voor-stap uitleg voor senioren: videobellen, streaming, online winkelen, reizen en meer.',
  '/uitleg',
  uitlegListItems,
);

const POPULAIR = [
  {
    title: 'Mobiel parkeren',
    href: '/uitleg/mobiel-parkeren',
    description: 'Parkeren betalen met een app — zonder muntjes.',
  },
  {
    title: 'OV betalen met uw pinpas',
    href: '/uitleg/betalen-ov',
    description: 'Inchecken zonder OV-chipkaart: met contactloze pinpas.',
  },
  {
    title: 'WhatsApp – eerste stappen',
    href: '/uitleg/whatsapp-basis',
    description: 'Berichten sturen en de basis van WhatsApp.',
  },
  {
    title: 'DigiD — hoe werkt het?',
    href: '/uitleg/digid',
    description: 'Veilig inloggen bij de overheid.',
  },
] as const;

export default function UitlegOverzichtPage() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={uitlegCollectionSchema} />

      <section className="bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-10 md:pb-12">
          <Link
            href="/"
            className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
          >
            ← Terug naar home
          </Link>

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-10 max-w-2xl">
            Stap-voor-stap uitleg over technologie.
          </h1>

          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
            Of kies een onderwerp
          </h2>
          <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
            Grote knoppen naar alle uitleg per thema.
          </p>
          <UitlegCategorieen />
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

      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-senior mx-auto px-5 sm:px-6 space-y-10">
          <YoutubeChannelCta />
          <p className="text-center">
            <Link
              href="/digitale-hulp"
              className="text-senior-sm font-semibold text-gold hover:text-gold-light"
            >
              Liever zoeken? Ga naar Digitale hulp →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
