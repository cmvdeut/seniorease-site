import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import {
  buildCollectionPageSchema,
  buildPageMetadata,
  DIGITALE_HULP_FAQ,
  digitaleHulpFaqSchema,
} from '@/lib/seo';
import { artikelen } from './artikelen';
import { DigitaleHulpZoek } from './DigitaleHulpZoek';

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

export default async function DigitaleHulpPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = typeof params.q === 'string' ? params.q.trim() : '';

  return (
    <main className="min-h-screen bg-neutral-cream">
      <JsonLd data={[digitaleHulpCollectionSchema, digitaleHulpFaqSchema]} />
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Digitale hulp voor senioren
        </h1>
        <p className="text-gray-500 mb-8 text-senior-lg">
          Duidelijke uitleg en tips voor telefoon, computer en internet. Stap voor stap, zonder ingewikkelde termen.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8">
          <div className="bg-neutral-cream rounded-xl p-5 mb-8 border border-neutral-stone/40">
            <p className="text-gray-800 leading-relaxed mb-2" style={{ fontSize: '1.1rem' }}>
              Komt u ergens niet uit met uw telefoon of computer?
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Hier vindt u artikelen over veelvoorkomende vragen: foto&apos;s bewaren, uw apparaat sneller maken, veilig e-mailen en oplichting herkennen.
            </p>
          </div>

          <DigitaleHulpZoek initialQuery={initialQuery} />
        </div>

        <section className="mt-10 bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-bold text-gray-900 mb-6" style={{ fontSize: '1.5rem' }}>
            Veelgestelde vragen
          </h2>
          <div className="space-y-6">
            {DIGITALE_HULP_FAQ.map((item) => (
              <div key={item.question}>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.15rem' }}>
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
