import Link from "next/link";

export const metadata = {
  title: "Computer hulp – Digitale hulp voor senioren",
  description:
    "Uitleg over computer, screenshot maken, bestanden opslaan en programma's installeren. Stap voor stap voor senioren.",
  alternates: {
    canonical: "https://seniorease.nl/digitale-hulp/computer",
  },
};

// Later dynamisch maken: bijv. uit CMS of artikelen.ts filteren op categorie.
// Enkele items linken naar verwante artikelen tot er een eigen pagina is (Computer uitleg, Bestand opslaan).
const artikelen = [
  { title: "Computer uitleg", href: "/digitale-hulp" },
  { title: "Screenshot maken", href: "/digitale-hulp/screenshot-en-schermopname-telefoon" },
  { title: "Bestand opslaan", href: "/digitale-hulp/wat-is-de-cloud" },
  { title: "Programma installeren", href: "/digitale-hulp/apps-installeren" },
];

export default function ComputerCategoriePage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/digitale-hulp"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar Digitale hulp
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Computer hulp
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uitleg over computer, schermfoto&apos;s, bestanden bewaren en apps of programma&apos;s installeren.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-8">
              Werkt u op een computer of tablet? Hier vindt u artikelen over schermfoto&apos;s maken, bestanden opslaan (onder andere in de cloud) en veilig programma&apos;s of apps installeren.
            </p>

            <h2 className="text-senior-xl font-bold text-primary mb-4">Artikelen</h2>
            <ul className="space-y-3" aria-label="Artikelen in deze categorie">
              {artikelen.map((item) => (
                <li key={item.href + item.title}>
                  <Link
                    href={item.href}
                    className="block rounded-xl border-2 border-primary/30 bg-neutral-cream/50 p-4 text-senior-base font-semibold text-primary hover:border-primary hover:bg-primary/5 hover:underline focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] flex items-center"
                  >
                    {item.title} →
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-senior-base text-gray-600 mt-8 pt-6 border-t border-neutral-stone">
              <strong>Tip:</strong> Staat uw vraag er niet bij? Gebruik de zoekbalk op de pagina{" "}
              <Link href="/digitale-hulp" className="font-semibold text-primary hover:underline">
                Digitale hulp
              </Link>{" "}
              of kijk bij de andere categorie&apos;s.
            </p>

            <p className="mt-6 pt-4 border-t border-neutral-stone">
              <Link
                href="/digitale-hulp"
                className="text-senior-base font-bold text-primary hover:text-primary-dark underline"
              >
                ← Alle artikelen Digitale hulp
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
