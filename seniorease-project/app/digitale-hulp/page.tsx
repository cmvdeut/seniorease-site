import Link from 'next/link';
import { artikelen } from './artikelen';
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
              Digitale hulp voor senioren
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Duidelijke uitleg en tips voor telefoon, computer en internet. Stap voor stap, zonder ingewikkelde termen.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 mb-8">
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed mb-3">
                Komt u ergens niet uit met uw telefoon of computer?
              </p>
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed">
                Hier vindt u artikelen over veelvoorkomende vragen: foto&apos;s bewaren, uw apparaat sneller maken, veilig e-mailen en oplichting herkennen.
              </p>
            </div>

            <DigitaleHulpZoek artikelen={artikelen} initialQuery={initialQuery} />
          </div>
        </div>
      </section>
    </main>
  );
}
