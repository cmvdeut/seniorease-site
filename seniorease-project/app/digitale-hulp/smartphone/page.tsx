import Link from "next/link";

export const metadata = {
  title: "Smartphone hulp – Digitale hulp voor senioren",
  description:
    "Uitleg over WhatsApp, telefoon sneller maken, letters groter zetten en QR-code scannen. Stap voor stap voor senioren.",
  alternates: {
    canonical: "https://seniorease.nl/digitale-hulp/smartphone",
  },
};

// Later dynamisch maken: bijv. uit CMS of artikelen.ts filteren op categorie
const artikelen = [
  { title: "WhatsApp uitleg voor beginners", href: "/digitale-hulp/whatsapp-uitleg-beginners" },
  { title: "WhatsApp foto's opslaan", href: "/digitale-hulp/whatsapp-fotos-opslaan" },
  { title: "Letters groter maken op telefoon", href: "/digitale-hulp/letters-groter-maken-telefoon" },
  { title: "QR-code scannen", href: "/uitleg/qr-code" },
  { title: "Telefoon langzaam oplossen", href: "/digitale-hulp/telefoon-langzaam-oplossen" },
];

export default function SmartphoneCategoriePage() {
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
              Smartphone hulp
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uitleg en tips voor uw telefoon: WhatsApp, scherm, snelheid en meer. Stap voor stap.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-8">
              Komt u ergens niet uit met uw smartphone? Hier vindt u artikelen over veelgestelde vragen: berichten en foto&apos;s sturen met WhatsApp, letters groter zetten, een trage telefoon sneller maken en een QR-code scannen.
            </p>

            <h2 className="text-senior-xl font-bold text-primary mb-4">Artikelen</h2>
            <ul className="space-y-3" aria-label="Artikelen in deze categorie">
              {artikelen.map((item) => (
                <li key={item.href}>
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
