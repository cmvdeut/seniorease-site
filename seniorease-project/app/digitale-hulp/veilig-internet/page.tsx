import Link from "next/link";
import JsonLd from '@/app/components/JsonLd';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/veilig-internet',
  title: 'Veilig internet',
  description:
    'Phishing herkennen, oplichting voorkomen, veilig wachtwoord maken. Bescherm uzelf online. Stap voor stap voor senioren.',
  keywords: ['phishing', 'veilig internet', 'oplichting senioren'],
});

// Later dynamisch maken: bijv. uit CMS of artikelen.ts filteren op categorie.
const artikelen = [
  { title: "Phishing herkennen", href: "/digitale-hulp/phishing-herkennen" },
  { title: "Phishing mail herkennen", href: "/digitale-hulp/phishing-mail-herkennen" },
  { title: "Oplichting herkennen", href: "/uitleg/veiligheid" },
  { title: "DigiD — wat is het?", href: "/uitleg/digid" },
  { title: "Veilig online bankieren", href: "/uitleg/online-bankieren" },
  { title: "Veilig wachtwoord maken", href: "/digitale-hulp/veilig-wachtwoord-maken" },
  { title: "Wachtwoorden beheren", href: "/uitleg/wachtwoorden" },
];

const collectionSchema = buildCollectionPageSchema(
  'Veilig internet voor senioren',
  'Phishing herkennen, oplichting voorkomen en veilig wachtwoorden maken.',
  '/digitale-hulp/veilig-internet',
  artikelen.map((a) => ({ name: a.title, path: a.href })),
);

export default function VeiligInternetCategoriePage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <JsonLd data={collectionSchema} />
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
              Veilig internet
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Herkennen van nepberichten, sterke wachtwoorden en bescherming tegen oplichting.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-8">
              Blijf veilig online: leer nep e-mails en oplichting herkennen, maak een sterk wachtwoord en lees wat u kunt doen om fraude te voorkomen.
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
              <strong>Tip:</strong> Klik nooit op links in verdachte e-mails of berichten. Bij twijfel: bel het bedrijf of de overheid via het nummer op hun echte website. Meer hulp:{" "}
              <Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">
                Oplichting herkennen
              </Link>.
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
