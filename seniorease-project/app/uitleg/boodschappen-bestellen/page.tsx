import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://seniorease.nl/uitleg/boodschappen-bestellen" },
    { "@type": "ListItem", "position": 3, "name": "Online boodschappen bestellen", "item": "https://seniorease.nl/uitleg/boodschappen-bestellen" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Online boodschappen bestellen en laten bezorgen",
  "description": "Stap voor stap boodschappen bestellen via Albert Heijn of Jumbo en thuis laten bezorgen.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Ga naar de webwinkel", "text": "Ga naar ah.nl of jumbo.com op uw computer of tablet, of open de app." },
    { "@type": "HowToStep", "position": 2, "name": "Maak een account aan", "text": "Tik op 'Inloggen' en daarna op 'Account aanmaken'. Vul uw e-mailadres en een wachtwoord in." },
    { "@type": "HowToStep", "position": 3, "name": "Voeg producten toe", "text": "Zoek producten via de zoekbalk of blader door de categorieën. Tik op het plusje of 'In winkelwagen' om producten toe te voegen." },
    { "@type": "HowToStep", "position": 4, "name": "Kies een bezorgmoment", "text": "Ga naar uw winkelwagen en kies een dag en tijdslot voor de bezorging. Vul uw adres in en betaal." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat kost thuisbezorging van boodschappen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Albert Heijn en Jumbo rekenen bezorgkosten, meestal tussen de €3 en €6. Vanaf een bepaald bestelbedrag (bijv. €60 bij AH) zijn bezorgkosten soms gratis. Dit verschilt per supermarkt en tijdslot."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe ver van tevoren moet ik bestellen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "U kunt meestal tot een dag van tevoren een bezorgmoment reserveren. Op drukke tijden (vrijdag, zaterdag) zijn de slots snel vol — bestel dan liever een paar dagen eerder."
      }
    },
    {
      "@type": "Question",
      "name": "Wat als een product niet leverbaar is?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als een product niet op voorraad is, wordt het weggelaten uit uw bestelling. U betaalt dan ook niet voor dat product. Sommige supermarkten bieden een vervangend product aan."
      }
    },
  ],
};

export const metadata = {
  title: "Online boodschappen bestellen – uitleg voor senioren",
  description: "Hoe bestelt u boodschappen online bij Albert Heijn of Jumbo en laat ze thuisbezorgen? Stap-voor-stap uitleg speciaal voor senioren.",
};

export default function BoodschappenBestellenPage() {
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
              Online boodschappen bestellen
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Boodschappen thuis laten bezorgen via Albert Heijn of Jumbo — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Boodschappen zonder de deur uit
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              De meeste grote supermarkten bezorgen uw boodschappen thuis.
              U kiest zelf wanneer de bezorger langskomt — 's ochtends, 's middags of 's avonds.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Handig als u moeilijk kunt lopen, geen auto heeft, of gewoon niet de drukte van de supermarkt
              wilt. U betaalt een kleine bezorgtoeslag, maar spaart tijd en energie.
            </p>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 mb-6">
              <p className="text-senior-base font-bold text-green-900 mb-1">🚲 Tip: Picnic — altijd gratis bezorgd</p>
              <p className="text-senior-base text-green-800 leading-relaxed">
                Picnic is een online supermarkt die <strong>altijd gratis bezorgt</strong> — ook kleine boodschappen.
                Er is geen minimaal bestelbedrag en geen bezorgkosten. U kiest een tijdslot en de bezorger
                komt met een elektrisch bakfietsje aan de deur. Handig voor wie niet veel tegelijk nodig heeft.
                Kijk op <strong>picnic.app</strong> of download de Picnic-app.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🛒", naam: "Albert Heijn", site: "ah.nl", kleur: "bg-blue-50 border-blue-200" },
                { icon: "🟡", naam: "Jumbo", site: "jumbo.com", kleur: "bg-yellow-50 border-yellow-200" },
                { icon: "🚲", naam: "Picnic", site: "picnic.app — gratis bezorgd", kleur: "bg-green-50 border-green-200" },
              ].map((item, i) => (
                <div key={i} className={`${item.kleur} border-2 rounded-xl p-4 text-center`}>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-base font-bold text-gray-800">{item.naam}</p>
                  <p className="text-senior-sm text-gray-600">{item.site}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stap voor stap */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Zo bestelt u boodschappen
            </h2>
            <p className="text-senior-base text-gray-600 mb-6 italic">
              De stappen hieronder gelden voor Albert Heijn (ah.nl). Bij Jumbo werkt het vrijwel hetzelfde.
            </p>
            <ol className="space-y-6">
              {[
                {
                  stap: "Ga naar ah.nl",
                  uitleg: "Open uw browser en typ ah.nl in de adresbalk. Of download de Albert Heijn-app via de App Store of Play Store.",
                },
                {
                  stap: "Maak een account aan (eenmalig)",
                  uitleg: "Tik op 'Inloggen' rechtsboven, daarna op 'Account aanmaken'. Vul uw e-mailadres in en kies een wachtwoord. Dit doet u maar één keer.",
                  tip: "Schrijf uw e-mailadres en wachtwoord op en bewaar het op een vaste plek.",
                },
                {
                  stap: "Kies een bezorgmoment eerst",
                  uitleg: "Tik op 'Bezorgen' bovenaan. Voer uw postcode in en kies een dag en tijdslot. Het is slim om dit eerst te doen — zo weet u zeker dat er plek is voor bezorging.",
                },
                {
                  stap: "Producten toevoegen",
                  uitleg: "Zoek producten via de zoekbalk of klik op een categorie (brood, zuivel, groenten). Tik op het plusje (+) naast een product om het toe te voegen.",
                  tip: "Heeft u een vaste boodschappenlijst? Zoek de producten op en sla ze op als 'Favorieten'. De volgende keer kunt u ze snel terugvinden.",
                },
                {
                  stap: "Controleer uw winkelwagen",
                  uitleg: "Tik op het winkelwagen-icoontje rechtsboven. Controleer of alles klopt — aantallen, producten en het totaalbedrag.",
                },
                {
                  stap: "Betalen",
                  uitleg: "Tik op 'Afrekenen'. Vul uw bezorgadres in als dat nog niet ingevuld is. Kies als betaalmethode iDEAL en kies uw bank. U betaalt via de vertrouwde betaalomgeving van uw bank.",
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

          {/* De bezorging */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              De bezorging
            </h2>
            <ul className="space-y-4">
              {[
                "Op de dag van bezorging ontvangt u een melding wanneer de bezorger onderweg is.",
                "De bezorger brengt de boodschappen tot aan uw voordeur.",
                "U hoeft niet contant te betalen — u heeft al online betaald.",
                "Controleer uw bestelling als de bezorger vertrekt. Ontbreekt er iets? Neem dan contact op met de klantenservice.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat kost thuisbezorging?</p>
                <p className="text-senior-base text-gray-700">Meestal tussen de €3 en €6. Vanaf een bepaald bestelbedrag is bezorging soms gratis.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoe ver van tevoren moet ik bestellen?</p>
                <p className="text-senior-base text-gray-700">Meestal tot een dag van tevoren. Op drukke momenten zijn de tijdslots snel vol — bestel op tijd.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat als een product niet leverbaar is?</p>
                <p className="text-senior-base text-gray-700">U betaalt dan niet voor dat product. Soms wordt een vergelijkbaar product aangeboden als vervanging.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over online winkelen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/bol-com" className="text-senior-base font-bold text-primary hover:underline">Bestellen bij Bol.com →</Link></li>
              <li><Link href="/uitleg/online-retourneren" className="text-senior-base font-bold text-primary hover:underline">Iets terugsturen: hoe werkt dat? →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-bold text-primary hover:underline">Veilig op internet →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
