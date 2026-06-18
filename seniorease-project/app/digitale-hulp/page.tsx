import Link from 'next/link';
import { DigitaleHulpZoek } from './DigitaleHulpZoek';

export const metadata = {
  title: "Digitale hulp voor senioren",
  description:
    "Eenvoudige uitleg en tips voor senioren: telefoon sneller maken, WhatsApp foto's opslaan, phishing herkennen, e-mail en apps. Hulp bij telefoon en computer.",
  alternates: {
    canonical: "https://seniorease.nl/digitale-hulp",
  },
};

export default async function DigitaleHulpPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = typeof params.q === 'string' ? params.q.trim() : '';

  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Digitale hulp voor senioren
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
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

      </div>
    </main>
  );
}
