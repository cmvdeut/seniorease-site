import Link from "next/link";

export const metadata = {
  title: "Computer hulp – Digitale hulp voor senioren",
  description:
    "Uitleg over e-mail bijlagen, bestanden vinden, computer traag oplossen en foto's op de pc. Stap voor stap voor senioren.",
  alternates: {
    canonical: "https://www.seniorease.nl/digitale-hulp/computer",
  },
};

const artikelen = [
  { title: "E-mail bijlage openen en opslaan", href: "/uitleg/email-bijlage" },
  { title: "Bestanden vinden op uw computer", href: "/uitleg/bestanden-vinden" },
  { title: "Computer traag of vastgelopen", href: "/uitleg/computer-traag" },
  { title: "Screenshot maken op computer", href: "/uitleg/screenshot-pc" },
  { title: "Letters groter maken op computer", href: "/uitleg/letters-groter-pc" },
  { title: "Programma installeren op computer", href: "/uitleg/programma-installeren" },
  { title: "Foto's van telefoon naar computer", href: "/uitleg/fotos-naar-computer" },
  { title: "Googelen voor beginners", href: "/digitale-hulp/googelen-google-zoeken" },
  { title: "E-mail openen", href: "/digitale-hulp/e-mail-openen" },
  { title: "Wat is de cloud?", href: "/digitale-hulp/wat-is-de-cloud" },
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
              E-mail bijlagen, bestanden vinden, traagheid oplossen en meer — stap voor stap op uw pc.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-8">
              Werkt u op een laptop of desktop? Hier vindt u rustige uitleg over dagelijkse computervragen — zonder moeilijke termen.
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
              <strong>Tip:</strong> Staat uw vraag er niet bij? Gebruik de zoekbalk op{" "}
              <Link href="/digitale-hulp" className="font-semibold text-primary hover:underline">
                Digitale hulp
              </Link>
              .
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
