import Link from "next/link";

export const metadata = {
  title: "Internet & e-mail – Digitale hulp voor senioren",
  description:
    "Uitleg over wifi, e-mail openen, bijlagen en internetproblemen oplossen. Stap voor stap voor senioren.",
  alternates: {
    canonical: "https://seniorease.nl/digitale-hulp/internet-email",
  },
};

// Later dynamisch maken: bijv. uit CMS of artikelen.ts filteren op categorie.
// Bijlage openen: geen aparte pagina, link naar e-mail-openen als verwant onderwerp.
const artikelen = [
  { title: "Wifi instellen", href: "/uitleg/wifi" },
  { title: "E-mail uitleg", href: "/digitale-hulp/e-mail-openen" },
  { title: "Bijlage openen", href: "/digitale-hulp/e-mail-openen" },
  { title: "Internet probleem oplossen", href: "/digitale-hulp/wifi-werkt-niet-oplossen" },
];

export default function InternetEmailCategoriePage() {
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
              Internet & e-mail
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uitleg over wifi, e-mail en internetproblemen. Stap voor stap.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-8">
              Heeft u hulp nodig met internet of e-mail? Hier vindt u artikelen over wifi verbinden, e-mail openen en beheren, bijlagen openen en wat u kunt doen als internet of wifi niet werkt.
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
              of kijk bij Veilig internet als het over oplichting of wachtwoorden gaat.
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
