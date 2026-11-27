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
        "text": "Volgens de wet heeft u minimaal 14 dagen bedenktijd voor online aankopen. Veel winkels geven meer tijd, vaak 30 dagen of langer. Dat staat in de voorwaarden of in uw bevestigingsmail."
      }
    },
    {
      "@type": "Question",
      "name": "Kost retourneren geld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dit verschilt per winkel. Soms is retourneren gratis, soms worden retourkosten ingehouden op uw terugbetaling. Lees dit na in de winkelvoorwaarden voordat u iets koopt."
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
  description: "Hoe stuurt u een online bestelling terug? Stap-voor-stap uitleg: retourlabel aanvragen, inpakken en insturen bij een afhaalpunt of pakketkluis.",
});

export default function OnlineRetournerenPage() {
  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Online bestelling terugsturen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Niet tevreden? Zo stuurt u een product eenvoudig terug.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              U heeft altijd bedenktijd
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Als u iets online koopt, heeft u volgens de wet altijd <strong>minimaal 14 dagen bedenktijd</strong>.
              U mag het product in die tijd terugsturen zonder dat u een reden hoeft te geven.
              U krijgt dan het volledige aankoopbedrag terug.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Veel grote webwinkels geven zelfs <strong>30 dagen</strong> of meer. Dat staat altijd vermeld
              op de website of in de bevestigingsmail die u na uw bestelling ontvangt.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Wettelijk minimaal 14 dagen' },
                { label: 'Vaak 30 dagen of meer' },
                { label: 'Staat in uw bevestigingsmail' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-cream border border-navy/10 rounded-xl p-4 text-center"
                >
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Zo stuurt u iets terug
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: 'Log in bij de webwinkel',
                  uitleg:
                    'Ga naar de website of app waar u heeft besteld. Log in met uw e-mailadres en wachtwoord.',
                },
                {
                  stap: "Ga naar 'Mijn bestellingen'",
                  uitleg:
                    "Zoek in het menu naar 'Mijn bestellingen', 'Mijn account' of 'Bestelgeschiedenis'. U ziet een overzicht van uw aankopen.",
                },
                {
                  stap: 'Kies de bestelling',
                  uitleg:
                    'Open de bestelling met het product dat u wilt terugsturen.',
                },
                {
                  stap: "Kies 'Retourneren'",
                  uitleg:
                    "Tik of klik op 'Retourneren' of 'Artikel terugsturen'. Vink het product aan en geef aan waarom (bijvoorbeeld 'past niet' of 'niet wat ik verwachtte').",
                },
                {
                  stap: 'Retourlabel of QR-code',
                  uitleg:
                    'U krijgt een retourlabel per e-mail, of een QR-code. Heeft u geen printer? Bij veel afhaalpunten printen ze het label voor u als u de QR-code op uw telefoon laat zien.',
                  tip: 'Geen printer nodig bij de meeste afhaalpunten. Laat de QR-code op uw telefoon zien.',
                },
                {
                  stap: 'Inpakken en inleveren',
                  uitleg:
                    'Pak het product goed in (bij voorkeur in de originele doos). Plak het label zichtbaar op het pakket — of volg de instructies bij een pakketkluis. Breng het naar een afhaalpunt of pakketkluis bij u in de buurt.',
                },
              ].map((item, i) => (
                <li key={item.stap} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
                    {item.tip && (
                      <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-2">
                        {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Geld terug */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Wanneer krijgt u uw geld terug?
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-4">
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
                <div key={i} className="flex items-start gap-3 text-senior-base text-navy/80">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Hoelang heb ik de tijd om iets terug te sturen?</p>
                <p className="text-senior-base text-navy/80">Minimaal 14 dagen volgens de wet. Veel winkels geven 30 dagen of meer. Dit staat in de bevestigingsmail van uw bestelling.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Kost retourneren geld?</p>
                <p className="text-senior-base text-navy/80">Dat verschilt per winkel. Soms gratis, soms met retourkosten. Kijk dit na voordat u iets bestelt.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Wanneer krijg ik mijn geld terug?</p>
                <p className="text-senior-base text-navy/80">Binnen 14 dagen nadat de winkel uw retour heeft ontvangen en goedgekeurd.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg over online winkelen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/online-bestellen" className="text-senior-base font-semibold text-gold hover:text-gold-light">Online bestellen →</Link></li>
              <li><Link href="/uitleg/boodschappen-bestellen" className="text-senior-base font-semibold text-gold hover:text-gold-light">Online boodschappen bestellen →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-semibold text-gold hover:text-gold-light">Veilig op internet →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
