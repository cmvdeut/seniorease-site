import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/bol-com" },
    { "@type": "ListItem", "position": 3, "name": "Bestellen bij Bol.com", "item": "https://www.seniorease.nl/uitleg/bol-com" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Iets bestellen bij Bol.com",
  "description": "Stap voor stap een product zoeken, in het winkelmandje leggen en betalen bij Bol.com.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Ga naar Bol.com", "text": "Open uw browser en ga naar bol.com, of open de Bol.com app op uw telefoon of tablet." },
    { "@type": "HowToStep", "position": 2, "name": "Zoek een product", "text": "Typ de naam van het product in de zoekbalk bovenaan en tik op het vergrootglas." },
    { "@type": "HowToStep", "position": 3, "name": "Leg het in uw winkelmandje", "text": "Tik op het product en daarna op de gele knop 'In winkelmandje'." },
    { "@type": "HowToStep", "position": 4, "name": "Bestellen en betalen", "text": "Tik op 'Ga naar bestellen'. Log in of maak een account aan. Vul uw adres in en kies iDEAL als betaalmethode." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is bestellen bij Bol.com veilig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Bol.com is een grote, betrouwbare Nederlandse webwinkel. Uw betaling verloopt via iDEAL of creditcard met beveiligde verbinding. U heeft altijd 14 dagen bedenktijd om het product terug te sturen."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe lang duurt bezorging bij Bol.com?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Veel producten worden de volgende dag bezorgd als u voor een bepaald tijdstip bestelt. Op de productpagina staat wanneer u het kunt verwachten."
      }
    },
    {
      "@type": "Question",
      "name": "Wat als ik het product wil terugsturen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "U heeft 30 dagen de tijd om een product terug te sturen bij Bol.com. Log in op uw account, ga naar 'Mijn bestellingen' en kies 'Retourneren'. U krijgt dan een retourlabel om op het pakketje te plakken."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/bol-com',
  title: "Bestellen bij Bol.com – uitleg voor senioren stap voor stap",
  description: "Hoe bestelt u veilig iets bij Bol.com? Stap-voor-stap uitleg voor senioren: zoeken, in winkelmandje leggen, betalen met iDEAL en bezorging thuis.",
});

export default function BolComPage() {
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
              Bestellen bij Bol.com
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Veilig online winkelen — stap voor stap uitgelegd voor senioren.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is Bol.com */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is Bol.com?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Bol.com is de grootste Nederlandse webwinkel. U kunt er boeken, elektronica, kleding,
              tuinartikelen, speelgoed en nog veel meer bestellen — alles wordt thuisbezorgd.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Bol.com is een betrouwbare winkel. U betaalt via iDEAL (uw eigen bank) en heeft
              altijd 30 dagen de tijd om een product terug te sturen als u er niet tevreden mee bent.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🛒", label: "Miljoenen producten" },
                { icon: "🏠", label: "Thuisbezorgd" },
                { icon: "↩️", label: "30 dagen retour" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stap voor stap */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Zo bestelt u iets bij Bol.com
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Ga naar Bol.com",
                  uitleg: (
                    <>
                      Open uw internet-app (Safari of Chrome) en typ <strong>bol.com</strong> in de adresbalk bovenaan. Of open de Bol.com app als u die heeft geïnstalleerd.
                    </>
                  ),
                },
                {
                  stap: "Zoek een product",
                  uitleg: "Tik op de zoekbalk bovenaan (waar 'Zoeken in alles' staat). Typ de naam van wat u zoekt, bijvoorbeeld 'tuinhandschoenen' of 'sudokuboek'. Tik daarna op het vergrootglas of op Enter.",
                },
                {
                  stap: "Kies een product",
                  uitleg: "U ziet een lijst met producten. Tik op een product om meer informatie te lezen: de beschrijving, de prijs en beoordelingen van andere kopers.",
                  tip: "Kijk naar de oranje sterretjes. Producten met veel sterren (4 of hoger) zijn door veel mensen goed beoordeeld.",
                },
                {
                  stap: "Leg het in uw winkelmandje",
                  uitleg: "Tik op de gele knop 'In winkelmandje'. Het product wordt bewaard terwijl u verder kijkt. U kunt zo meerdere producten verzamelen voor u betaalt.",
                },
                {
                  stap: "Ga naar bestellen",
                  uitleg: "Tik op het winkelmandje-icoontje rechtsbovenaan. Controleer uw bestelling en tik op 'Ga naar bestellen'.",
                },
                {
                  stap: "Inloggen of account aanmaken",
                  uitleg: "Heeft u al een Bol.com account? Log dan in met uw e-mailadres en wachtwoord. Anders maakt u gratis een account aan met uw e-mailadres.",
                },
                {
                  stap: "Vul uw bezorgadres in",
                  uitleg: "Vul uw naam, straatnaam, huisnummer en postcode in. Controleer dit goed — het pakket wordt hiernaartoe gestuurd.",
                },
                {
                  stap: "Kies een betaalmethode en betaal",
                  uitleg: "Kies iDEAL (uw eigen bank). Kies uw bank uit de lijst en u wordt doorgestuurd naar de vertrouwde betaalomgeving van uw bank. Bevestig de betaling zoals u dat gewend bent.",
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

          {/* Bevestiging en bezorging */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Na uw bestelling
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Na de betaling ontvangt u een bevestigingsmail van Bol.com. Daarin staat uw bestelnummer
              en de verwachte bezorgdatum.
            </p>
            <ul className="space-y-3">
              {[
                "U ontvangt een e-mail als het pakket onderweg is, met een track & trace code om de bezorging te volgen.",
                "Veel producten worden de volgende dag bezorgd.",
                "Als u niet thuis bent, laat de bezorger het pakket achter bij een buurman of een afhaalpunt.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Veilig winkelen tips */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
              Veilig online winkelen
            </h2>
            <ul className="space-y-4">
              {[
                { tip: "Controleer altijd of de webadres begint met https:// — het slotje in uw browser betekent dat de verbinding beveiligd is." },
                { tip: "Betaal bij voorkeur met iDEAL. U wordt doorgestuurd naar de beveiligde omgeving van uw eigen bank." },
                { tip: "Bewaar uw bevestigingsmail. Daarin staan uw bestelnummer en de contactgegevens als er iets mis gaat." },
                { tip: "Twijfelt u aan een website? Zoek op Google naar de naam van de winkel plus het woord 'betrouwbaar' om ervaringen van anderen te lezen." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-2xl">🔒</span>
                  <span>{item.tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is bestellen bij Bol.com veilig?</p>
                <p className="text-senior-base text-gray-700">Ja, Bol.com is een grote, betrouwbare Nederlandse webwinkel. U heeft altijd 30 dagen bedenktijd.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoe lang duurt bezorging?</p>
                <p className="text-senior-base text-gray-700">Veel producten worden de volgende dag bezorgd als u voor een bepaald tijdstip bestelt. Op de productpagina staat de verwachte bezorgdatum.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat als ik iets wil terugsturen?</p>
                <p className="text-senior-base text-gray-700">U heeft 30 dagen de tijd. Log in, ga naar &apos;Mijn bestellingen&apos; en kies &apos;Retourneren&apos;. Meer uitleg: <Link href="/uitleg/online-retourneren" className="text-primary font-bold hover:underline">terugsturen uitgelegd</Link>.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over online winkelen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/boodschappen-bestellen" className="text-senior-base font-bold text-primary hover:underline">Online boodschappen bestellen →</Link></li>
              <li><Link href="/uitleg/online-retourneren" className="text-senior-base font-bold text-primary hover:underline">Iets terugsturen: hoe werkt dat? →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-bold text-primary hover:underline">Veilig op internet →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
