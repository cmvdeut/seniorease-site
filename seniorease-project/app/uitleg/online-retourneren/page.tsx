import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/online-retourneren" },
    { "@type": "ListItem", "position": 3, "name": "Online retourneren", "item": "https://www.seniorease.nl/uitleg/online-retourneren" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Een online aankoop terugsturen",
  "description": "Stap voor stap een product retourneren dat u online heeft besteld.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Log in op uw account", "text": "Ga naar de website waar u het product heeft gekocht en log in met uw e-mailadres en wachtwoord." },
    { "@type": "HowToStep", "position": 2, "name": "Ga naar uw bestellingen", "text": "Zoek naar 'Mijn bestellingen' of 'Mijn account'. Klik op de bestelling met het product dat u wilt terugsturen." },
    { "@type": "HowToStep", "position": 3, "name": "Kies retourneren", "text": "Klik op 'Retourneren' of 'Artikel terugsturen'. Geef aan waarom u het product teruggestuurd. U ontvangt dan een retourlabel." },
    { "@type": "HowToStep", "position": 4, "name": "Pakket inpakken en insturen", "text": "Pak het product in (bij voorkeur in de originele verpakking), plak het retourlabel op het pakketje en breng het naar een PostNL-punt of pakketautomaat." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hoelang heb ik de tijd om iets terug te sturen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Volgens de wet heeft u minimaal 14 dagen bedenktijd voor online aankopen. Veel winkels geven meer tijd: Bol.com geeft 30 dagen, en veel kledingwinkels geven ook 30 dagen of meer."
      }
    },
    {
      "@type": "Question",
      "name": "Kost retourneren geld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dit verschilt per winkel. Bij Bol.com is retourneren gratis. Bij sommige andere winkels worden retourkosten ingehouden op uw terugbetaling. Lees dit na in de winkelvoorwaarden voordat u iets koopt."
      }
    },
    {
      "@type": "Question",
      "name": "Wanneer krijg ik mijn geld terug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nadat de winkel uw retour heeft ontvangen en goedgekeurd, ontvangt u het geld binnen 14 dagen terug op uw rekening. Bij iDEAL-betalingen gaat dit vaak sneller."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/online-retourneren',
  title: "Online bestelling terugsturen – uitleg retourneren voor senioren",
  description: "Hoe stuurt u een online bestelling terug? Stap-voor-stap uitleg voor senioren: retourlabel aanvragen, inpakken en insturen bij Bol.com en andere webwinkels.",
});

export default function OnlineRetournerenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Online bestelling terugsturen
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Niet tevreden? Zo stuurt u een product eenvoudig terug.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              U heeft altijd bedenktijd
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Als u iets online koopt, heeft u volgens de wet altijd <strong>minimaal 14 dagen bedenktijd</strong>.
              U mag het product in die tijd terugsturen zonder dat u een reden hoeft te geven.
              U krijgt dan het volledige aankoopbedrag terug.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Veel grote webwinkels geven zelfs <strong>30 dagen</strong> of meer. Dat staat altijd vermeld
              op de website of in de bevestigingsmail die u na uw bestelling ontvangt.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📦", label: "Bol.com: 30 dagen" },
                { icon: "👗", label: "Kleding: vaak 30+ dagen" },
                { icon: "⚖️", label: "Wettelijk minimaal 14 dagen" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Retourneren bij Bol.com */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Terugsturen bij Bol.com
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Log in op Bol.com",
                  uitleg: "Ga naar bol.com en log in met uw e-mailadres en wachtwoord. Tik rechtsboven op uw naam of het icoontje van een persoon.",
                },
                {
                  stap: "Ga naar 'Mijn bestellingen'",
                  uitleg: "Klik op 'Mijn bestellingen' in het menu. U ziet een overzicht van al uw aankopen.",
                },
                {
                  stap: "Kies de bestelling",
                  uitleg: "Zoek de bestelling met het product dat u wilt terugsturen. Klik erop om de details te zien.",
                },
                {
                  stap: "Tik op 'Artikel retourneren'",
                  uitleg: "Klik op de knop 'Retourneren' of 'Artikel terugsturen'. Vink het product aan dat u wilt terugsturen en geef aan waarom (bijv. 'past niet' of 'niet wat ik verwachtte').",
                },
                {
                  stap: "Print het retourlabel",
                  uitleg: "U ontvangt een retourlabel per e-mail of kunt het direct afdrukken. Heeft u geen printer? Geef dan de e-mail met de QR-code aan bij het PostNL-punt — zij printen het label voor u.",
                  tip: "Geen printer nodig bij de meeste PostNL-punten. Laat de QR-code op uw telefoon zien.",
                },
                {
                  stap: "Pak het product in en stuur het op",
                  uitleg: "Pak het product goed in (bij voorkeur in de originele doos). Plak het retourlabel goed zichtbaar op het pakket. Breng het naar een PostNL-punt of pakketautomaat bij u in de buurt.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</p>
                    {item.tip && (
                      <p className="text-senior-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                        💡 {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Geld terug */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wanneer krijgt u uw geld terug?
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Zodra de winkel uw retour heeft ontvangen en goedgekeurd, ontvangt u het geld terug.
              Dit duurt meestal <strong>3 tot 14 dagen</strong> na ontvangst van uw pakket.
            </p>
            <div className="space-y-3">
              {[
                "U ontvangt een e-mail als de winkel uw retour heeft ontvangen.",
                "Het geld wordt teruggestort op dezelfde rekening waarmee u heeft betaald.",
                "Bij iDEAL-betalingen gaat dit doorgaans snel.",
                "Heeft u na 14 dagen nog niets ontvangen? Neem dan contact op met de klantenservice.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoelang heb ik de tijd om iets terug te sturen?</p>
                <p className="text-senior-base text-gray-700">Minimaal 14 dagen volgens de wet. Bol.com geeft 30 dagen. Dit staat in de bevestigingsmail van uw bestelling.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kost retourneren geld?</p>
                <p className="text-senior-base text-gray-700">Bij Bol.com is retourneren gratis. Bij andere winkels kunnen retourkosten gelden. Kijk dit na voordat u iets bestelt.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wanneer krijg ik mijn geld terug?</p>
                <p className="text-senior-base text-gray-700">Binnen 14 dagen nadat de winkel uw retour heeft ontvangen en goedgekeurd.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over online winkelen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/bol-com" className="text-senior-base font-bold text-primary hover:underline">Bestellen bij Bol.com →</Link></li>
              <li><Link href="/uitleg/boodschappen-bestellen" className="text-senior-base font-bold text-primary hover:underline">Online boodschappen bestellen →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-bold text-primary hover:underline">Veilig op internet →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
