import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/betalen-ov" },
    { "@type": "ListItem", "position": 3, "name": "Betalen in het OV", "item": "https://www.seniorease.nl/uitleg/betalen-ov" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Betalen in het OV met uw pinpas",
  "description": "Stap voor stap in- en uitchecken in de bus of trein met uw contactloze pinpas.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Controleer of uw pas contactloos is", "text": "Kijk of er een golfje-icoontje op uw pinpas staat. Dat betekent dat u contactloos kunt betalen." },
    { "@type": "HowToStep", "position": 2, "name": "Inchecken", "text": "Houd uw pinpas tegen de gele of witte kaartlezer bij de ingang. U hoort een piepje en ziet een groen vinkje — u bent ingecheckt." },
    { "@type": "HowToStep", "position": 3, "name": "Uitchecken", "text": "Vergeet niet uit te checken bij aankomst. Houd uw pas opnieuw tegen de kaartlezer. Zonder uitchecken betaalt u een boetetarief." },
    { "@type": "HowToStep", "position": 4, "name": "Kosten controleren", "text": "De reiskosten worden automatisch van uw bankrekening afgeschreven. U kunt ze terugzien in uw bankapp." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kan ik overal in het OV betalen met mijn pinpas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In de trein (NS), bus, tram en metro kunt u bijna overal betalen met een contactloze pinpas. Sommige regionale buslijnen werken alleen nog met de OV-chipkaart. Kijk op de website van uw vervoerder voor de actuele informatie."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen pinpas en OV-chipkaart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Met een pinpas betaalt u direct van uw bankrekening — u hoeft geen saldo op te laden. Met een OV-chipkaart laadt u van tevoren saldo op en dat wordt per reis afgeschreven. Beide werken op dezelfde gele kaartlezers."
      }
    },
    {
      "@type": "Question",
      "name": "Wat gebeurt er als ik vergeet uit te checken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als u vergeet uit te checken, wordt een maximumtarief in rekening gebracht. Dat is vaak veel duurder dan de werkelijke reiskosten. Controleer altijd of u het groene vinkje ziet bij het uitchecken."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/betalen-ov',
  title: "Betalen in het OV met pinpas of OV-chipkaart – uitleg voor senioren",
  description: "Hoe betaalt u in de bus of trein met uw pinpas of OV-chipkaart? Stap-voor-stap uitleg voor senioren: inchecken, uitchecken en wat te doen bij problemen.",
});

export default function BetalenOvPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/uitleg" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar alle uitleg
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Betalen in het OV
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              In- en uitchecken in de bus of trein met uw pinpas of OV-chipkaart — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Pinpas of OV-chipkaart */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Pinpas of OV-chipkaart — wat is het verschil?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              In het openbaar vervoer checkt u in en uit met een kaartje dat u tegen een gele lezer houdt.
              Dat kan uw gewone pinpas zijn, maar ook de OV-chipkaart. Beide werken op dezelfde manier.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="text-senior-base font-bold text-blue-900 mb-2">💳 Pinpas (contactloos)</p>
                <ul className="space-y-2 text-senior-sm text-blue-800">
                  <li className="flex gap-2"><span>✓</span><span>Geen saldo opladen nodig</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Betaling gaat direct van uw rekening</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Werkt als er een golfje op uw pas staat</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Werkt bij NS, GVB, RET en de meeste bussen</span></li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <p className="text-senior-base font-bold text-yellow-900 mb-2">🟡 OV-chipkaart</p>
                <ul className="space-y-2 text-senior-sm text-yellow-800">
                  <li className="flex gap-2"><span>✓</span><span>Saldo van tevoren opladen</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Werkt bij alle vervoerders in Nederland</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Handig voor de 65+ korting (Voordeelurenabonnement)</span></li>
                  <li className="flex gap-2"><span>✓</span><span>Aparte kaart, los van uw bankpas</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base text-gray-800">
                <strong>💡 Tip:</strong> Heeft u een contactloze pinpas? Dan kunt u die gewoon gebruiken in de trein en bij de meeste bussen. U hoeft geen aparte OV-chipkaart aan te schaffen.
              </p>
            </div>
          </section>

          {/* Betalen met pinpas */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-2">
              Betalen met uw pinpas in het OV
            </h2>
            <p className="text-senior-base text-gray-500 mb-6">Inchecken en uitchecken — stap voor stap</p>
            <ol className="space-y-6">
              {[
                {
                  stap: "Controleer of uw pas contactloos is",
                  uitleg: "Kijk op uw pinpas: staat er een klein golfje-icoontje op (zoals een wifi-symbool op zijn kant)? Dan kunt u contactloos betalen in het OV.",
                },
                {
                  stap: "Inchecken bij de kaartlezer",
                  uitleg: "Stap in de bus, tram of bij het draaihek van de trein. Houd uw pinpas kort tegen de gele of witte kaartlezer. U hoort een piepje en ziet een groen vinkje of lichtje — u bent ingecheckt.",
                  tip: "Houd uw pas slechts even tegen de lezer. U hoeft hem niet lang vast te houden.",
                },
                {
                  stap: "Reizen",
                  uitleg: "Geniet van uw reis. U hoeft tijdens de rit niets te doen.",
                },
                {
                  stap: "Uitchecken bij aankomst",
                  uitleg: "Vergeet dit niet! Houd uw pinpas opnieuw tegen de kaartlezer bij de uitgang van de bus of het station. U hoort weer een piepje en ziet een groen vinkje — u bent uitgecheckt.",
                  tip: "Geen groen vinkje maar een rood kruis? Probeer het opnieuw. Lukt het niet? Vraag de chauffeur of een medewerker om hulp.",
                },
                {
                  stap: "Kosten worden automatisch afgeschreven",
                  uitleg: "Na uw reis wordt het juiste bedrag automatisch van uw bankrekening afgeschreven. U kunt de kosten terugzien in uw bankapp of op uw afschrift.",
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

          {/* OV-chipkaart opladen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              OV-chipkaart opladen
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Gebruikt u een OV-chipkaart? Dan moet u van tevoren saldo opladen.
              Zonder voldoende saldo kunt u niet inchecken.
            </p>
            <ul className="space-y-3">
              {[
                "Bij een NS-automaat op het station — tik op 'OV-chipkaart opladen' en volg de stappen.",
                "Bij de servicebalie op het station of in de bus.",
                "Via de website ov-chipkaart.nl met uw bankpas.",
                "Bij sommige supermarkten en kiosken.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base text-gray-800">
                <strong>💡 Minimaal saldo:</strong> Zorg dat u altijd minimaal €20 saldo op uw OV-chipkaart heeft. Bij minder dan €0 kunt u niet meer inchecken.
              </p>
            </div>
          </section>

          {/* Problemen */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
              Veelvoorkomende problemen
            </h2>
            <div className="space-y-5">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">❌ De lezer geeft een rood kruis</p>
                <p className="text-senior-base text-gray-700">Uw pas werd niet herkend. Probeer het opnieuw, iets langzamer. Zit uw pas in een portemonnee met meerdere kaarten? Haal hem er even uit — meerdere contactloze kaarten tegelijk kunnen storing geven.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">😰 Ik ben vergeten uit te checken</p>
                <p className="text-senior-base text-gray-700">Er wordt een maximumtarief in rekening gebracht. Bij de NS kunt u dit laten corrigeren via ns.nl/uitchecken of de NS-klantenservice (0900-202 1163).</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">❓ Ik weet niet of mijn pas contactloos is</p>
                <p className="text-senior-base text-gray-700">Kijk op uw pas naar het golfje-icoontje. Twijfelt u? Bel uw bank of kijk op de website van uw bank.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik overal in het OV betalen met mijn pinpas?</p>
                <p className="text-senior-base text-gray-700">Bij de NS, GVB (Amsterdam) en RET (Rotterdam) wel. Sommige regionale bussen werken alleen met de OV-chipkaart. Kijk op de website van uw vervoerder.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat als ik vergeet uit te checken?</p>
                <p className="text-senior-base text-gray-700">Er wordt een maximumtarief berekend. Bij de NS kunt u dit laten terugboeken via ns.nl of de klantenservice.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik ook betalen met mijn telefoon?</p>
                <p className="text-senior-base text-gray-700">Ja, als u Apple Pay of Google Pay heeft ingesteld op uw telefoon, kunt u ook daarmee inchecken — op dezelfde manier als met uw pinpas.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over reizen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/9292" className="text-senior-base font-bold text-primary hover:underline">9292 OV-app — reis plannen →</Link></li>
              <li><Link href="/uitleg/google-maps" className="text-senior-base font-bold text-primary hover:underline">Google Maps gebruiken →</Link></li>
              <li><Link href="/uitleg/google-translate" className="text-senior-base font-bold text-primary hover:underline">Google Translate — vertalen op reis →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
