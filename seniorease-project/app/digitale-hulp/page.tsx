import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import FAQAccordion from '@/app/components/FAQAccordion';
import PopularCard from '@/app/components/PopularCard';
import { YoutubeChannelCta } from '@/app/components/YoutubeHint';
import {
  buildCollectionPageSchema,
  buildPageMetadata,
  DIGITALE_HULP_FAQ,
  digitaleHulpFaqSchema,
} from '@/lib/seo';
import { artikelen } from './artikelen';
import { DigitaleHulpZoek } from './DigitaleHulpZoek';
import { DigitaleHulpCategorieen } from './DigitaleHulpCategorieen';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp',
  title: 'Digitale hulp voor senioren',
  description:
    "Eenvoudige uitleg en tips voor senioren: telefoon sneller maken, WhatsApp foto's opslaan, phishing herkennen, e-mail en apps. Hulp bij telefoon en computer.",
  keywords: ['digitale hulp', 'senioren', 'WhatsApp', 'phishing', 'telefoon', 'computer'],
});

const hubItems = [
  { name: 'Smartphone hulp', path: '/digitale-hulp/smartphone' },
  { name: 'Computer hulp', path: '/digitale-hulp/computer' },
  { name: 'Internet & e-mail', path: '/digitale-hulp/internet-email' },
  { name: 'Veilig internet', path: '/digitale-hulp/veilig-internet' },
  { name: 'AI uitleg', path: '/digitale-hulp/ai' },
  ...artikelen.map((a) => ({ name: a.title, path: `/digitale-hulp/${a.slug}` })),
];

const digitaleHulpCollectionSchema = buildCollectionPageSchema(
  'Digitale hulp voor senioren',
  'Eenvoudige uitleg en tips voor senioren over telefoon, computer en internet.',
  '/digitale-hulp',
  hubItems,
);

const POPULAIR = [
  {
    title: 'WhatsApp voor beginners',
    href: '/digitale-hulp/whatsapp-uitleg-beginners',
    description: 'Berichten sturen, foto’s en eerste stappen.',
  },
  {
    title: 'Googelen voor beginners',
    href: '/digitale-hulp/googelen-google-zoeken',
    description: 'Iets opzoeken op Google, stap voor stap.',
  },
] as const;

const DIGITALE_HULP_FAQ_ITEMS = DIGITALE_HULP_FAQ.map((item) => {
  if (item.question !== 'Is SeniorEase gratis te gebruiken?') return item;
  return {
    question: item.question,
    answer: (
      <>
        Ja. De uitleg, gidsen en tools op SeniorEase zijn gratis. Alleen de app{' '}
        <Link
          href="/bibliotheek"
          className="font-semibold text-gold underline hover:text-gold-light"
        >
          Mijn Bibliotheek
        </Link>{' '}
        is een apart product waarvoor kosten kunnen gelden — die kunt u wel gratis
        uitproberen.
      </>
    ),
  };
});

export default async function DigitaleHulpPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = typeof params.q === 'string' ? params.q.trim() : '';

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={[digitaleHulpCollectionSchema, digitaleHulpFaqSchema]} />

      {/* Intro + zoek */}
      <section className="bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-10 md:pb-12">
          <Link
            href="/"
            className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
          >
            ← Terug naar home
          </Link>

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-8 max-w-2xl">
            Stap-voor-stap uitleg over telefoon, computer en internet.
          </h1>

          <div className="max-w-2xl">
            <DigitaleHulpZoek initialQuery={initialQuery} />
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="bg-cream pb-16 md:pb-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
            Of kies een onderwerp
          </h2>
          <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
            Grote knoppen naar alle artikelen per thema.
          </p>
          <DigitaleHulpCategorieen />
        </div>
      </section>

      {/* Populair */}
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

      {/* FAQ */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6 space-y-12">
          <FAQAccordion items={DIGITALE_HULP_FAQ_ITEMS} title="Veelgestelde vragen" embedded />
          <YoutubeChannelCta />
        </div>
      </section>
    </main>
  );
}
