import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/e-bike',
  title: "E-bike apps voor senioren – routes plannen en ritten bijhouden",
  description: "Handige apps voor uw elektrische fiets: routes plannen via knooppunten, uw rit bijhouden en de accu in de gaten houden. Uitleg voor senioren.",
});

const routeApps = [
  {
    icon: "🗺️",
    naam: "ANWB Fietsen",
    beschrijving: "De bekendste fietsroute-app van Nederland. Honderden uitgestippelde routes door heel het land — van 20 tot 80 kilometer. U kiest een route en de app leidt u stap voor stap.",
    kleur: "bg-orange-50 border-orange-300",
    badge: "Meest gebruikt in NL",
    badgekleur: "bg-orange-600",
    tip: "Gratis te downloaden in de App Store en Play Store.",
  },
  {
    icon: "📍",
    naam: "Komoot",
    beschrijving: "Geweldig voor wie zelf een route wil samenstellen. U klikt op een kaart waar u naartoe wilt en Komoot berekent de mooiste fietsroute. Werkt ook offline.",
    kleur: "bg-green-50 border-green-300",
    badge: "Zelf routes maken",
    badgekleur: "bg-green-600",
    tip: "De regio rondom u is gratis; andere regio's zijn eenmalig aan te schaffen.",
  },
  {
    icon: "🔵",
    naam: "Fietsknoop.nl app",
    beschrijving: "Speciaal voor knooppuntenroutes in Nederland en België. U typt de knooppuntnummers in (bijv. 12 → 34 → 56) en de app toont de route op de kaart.",
    kleur: "bg-paper border-navy/8",
    badge: "Knooppunten",
    badgekleur: "bg-blue-600",
    tip: "Ideaal als u al een knooppuntenkaart van de VVV heeft.",
  },
  {
    icon: "🌍",
    naam: "Google Maps (fietsroute)",
    beschrijving: "De gewone Google Maps-app kan ook fietsroutes berekenen. Tik na 'Route' op het fiets-icoontje. Handig als u al weet hoe Google Maps werkt.",
    kleur: "bg-purple-50 border-purple-300",
    badge: "Al op uw telefoon",
    badgekleur: "bg-purple-600",
    tip: "Google Maps toont ook fietspaden en rustige wegen.",
  },
];

const accuTips = [
  {
    icon: "🔋",
    titel: "Laad op na elke rit",
    uitleg: "Wacht niet tot de accu helemaal leeg is. Na elke rit even opladen verlengt de levensduur van de accu.",
  },
  {
    icon: "❄️",
    titel: "Niet in de kou bewaren",
    uitleg: "Een koude accu heeft minder bereik. Berg uw fiets binnen op in de winter, of haal de accu eraf en bewaar hem op kamertemperatuur.",
  },
  {
    icon: "⚡",
    titel: "Gebruik de juiste trap-stand",
    uitleg: "Stand 1 (laag) verbruikt veel minder stroom dan stand 4 of 5. Op vlak terrein is een lage stand prima — gebruik de hogere standen alleen voor heuvels.",
  },
  {
    icon: "📱",
    titel: "Check de accu in de app",
    uitleg: "Veel e-bike apps tonen het exacte accupercentage en schatten hoeveel kilometer u nog kunt rijden op basis van de gekozen ondersteuning.",
  },
  {
    icon: "🌬️",
    titel: "Tegenwind kost meer stroom",
    uitleg: "Bij harde tegenwind verbruikt u meer vermogen. Plan uw langste stuk bij voorkeur met de wind mee.",
  },
];

export default function EBikePage() {
  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="e-bike" />
      {/* Header */}
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              E-bike en uw telefoon
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Routes plannen, knooppunten volgen en uw rit bijhouden — uw telefoon maakt fietsen nog leuker!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <Link href="/uitleg/ebooks" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">E-books</Link>
              <Link href="/uitleg/muziek-radio" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Muziek</Link>
              <Link href="/uitleg/google-maps" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Google Maps</Link>
              <span className="text-senior-sm font-bold text-gold underline">E-bike</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Uw telefoon als fietsgids
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Met een e-bike kunt u verder komen dan ooit. En met de juiste app op uw telefoon weet u altijd de weg, rijdt u nooit meer een knooppunt voorbij en ziet u precies hoeveel kilometer er nog in uw accu zit.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Geen papieren kaart meer nodig — uw telefoon doet het werk. En als u toch de verkeerde afslag neemt, herberekent de app gewoon de route.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🗺️",
                  label: "Routes uitstippelen",
                  uitleg: "Kies van tevoren waar u naartoe fietst. De app toont de route op de kaart en zegt wanneer u moet afslaan.",
                },
                {
                  icon: "🔵",
                  label: "Knooppunten volgen",
                  uitleg: "Typ de nummers van de knooppuntpaaltjes in (bijv. 12 → 34 → 56) en de app tekent de route voor u uit.",
                },
                {
                  icon: "📊",
                  label: "Rit bijhouden",
                  uitleg: "De app houdt bij hoeveel kilometer u heeft gereden, hoe lang u onderweg was en hoeveel accu u heeft verbruikt.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-5 flex flex-col items-center text-center gap-2">
                  <div className="text-4xl">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                  <p className="text-senior-sm text-navy/70 leading-relaxed">{item.uitleg}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Route apps */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-3">
              Handige apps voor onderweg
            </h2>
            <p className="text-senior-base text-navy/55 mb-8">Allemaal gratis of bijna gratis te gebruiken</p>
            <div className="space-y-5">
              {routeApps.map((app, i) => (
                <div key={i} className={`rounded-xl border-2 ${app.kleur} p-6`}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-3xl">{app.icon}</span>
                    <h3 className="text-senior-lg font-bold text-navy">{app.naam}</h3>
                    <span className={`text-xs font-bold text-white ${app.badgekleur} px-2 py-0.5 rounded-full`}>{app.badge}</span>
                  </div>
                  <p className="text-senior-base text-navy/80 leading-relaxed mb-2">{app.beschrijving}</p>
                  <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2">
                    {app.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Knooppunten uitleg */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              🔵 Wat zijn knooppunten?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Door heel Nederland en België staan kleine blauwe bordjes met nummers langs fietspaden. Dit zijn <strong>knooppunten</strong>. U rijdt van nummer naar nummer en zo volgt u automatisch mooie, veilige fietspaden — door bossen, langs water en over rustige wegen.
            </p>
            <div className="bg-paper border border-navy/8 rounded-xl p-6 mb-6">
              <p className="text-senior-base font-bold text-navy/75 mb-3">Zo werkt het:</p>
              <ol className="space-y-3">
                {[
                  "Kies een startpunt en een eindpunt op de kaart",
                  "Noteer de knooppuntnummers onderweg (bijv. 12 → 34 → 56 → 78)",
                  "Of typ ze in de Fietsknoop-app — die tekent de route voor u",
                  "Onderweg volgt u de blauwe nummerbordjes — of uw telefoonscherm",
                ].map((stap, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{stap}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-senior-base text-navy/70 italic">
              Tip: De VVV en bibliotheken hebben gratis knooppuntenkaarten per regio. Handig als back-up!
            </p>
          </section>

          {/* Bosch app */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              ⚡ De app van uw e-bike-merk
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Veel e-bikes hebben een eigen app waarmee u uw fiets kunt bijstellen en uw ritten kunt bijhouden. Kijk op uw fietsdisplay of in het handleiding welk merk motor uw fiets heeft.
            </p>
            <div className="space-y-4">
              {[
                {
                  merk: "Bosch",
                  app: "Bosch eBike Flow",
                  functies: ["Accuniveau en resterende km", "Rit statistieken", "Ondersteuningsniveaus instellen", "Fiets-updates installeren"],
                  kleur: "bg-red-50 border-red-200",
                },
                {
                  merk: "Yamaha",
                  app: "Yamaha MyRide",
                  functies: ["Rit bijhouden", "Calorieverbruik", "Kaart met routes"],
                  kleur: "bg-paper border-navy/8",
                },
                {
                  merk: "Shimano STEPS",
                  app: "E-TUBE RIDE",
                  functies: ["Ondersteuning instellen", "Accu bewaken", "Rit statistieken"],
                  kleur: "bg-gray-50 border-gray-200",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border-2 ${item.kleur} p-5`}>
                  <p className="text-senior-base font-bold text-navy mb-1">{item.merk} → <span className="text-gold">{item.app}</span></p>
                  <ul className="space-y-1 mt-2">
                    {item.functies.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-senior-sm text-navy/80">
                        <span className="text-green-600">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-paper border border-navy/10 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">Weet u het niet zeker?</p>
              <p className="text-senior-base text-navy/80">Zoek in de App Store of Play Store op de naam van uw fietsmerk + &apos;app&apos;. Of vraag het bij de fietswinkel waar u de e-bike heeft gekocht.</p>
            </div>
          </section>

          {/* Accu tips */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              🔋 Tips voor een langere accu
            </h2>
            <div className="space-y-4">
              {accuTips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start bg-cream border-2 border-navy/8/20 rounded-xl px-5 py-4">
                  <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                  <div>
                    <p className="text-senior-base font-bold text-navy mb-1">{tip.titel}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{tip.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Veelgestelde vragen */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Veel gestelde vragen
            </h2>
            <div className="space-y-5">
              {[
                {
                  vraag: "Moet ik mijn telefoon op het stuur monteren?",
                  antwoord: "Dat is handig maar niet verplicht. Een telefoonhouder voor op het stuur kost een paar euro bij de fietsenwinkel of online. Dan kunt u de kaart zien zonder te stoppen. U kunt ook gewoon audio-aanwijzingen volgen en uw telefoon in uw zak houden.",
                },
                {
                  vraag: "Wat als mijn telefoon leeg raakt onderweg?",
                  antwoord: "Neem een kleine powerbank mee — een oplaadbaar accupakketje. Die past in uw fietstas of rugzak. Veel wielrenners en fietsers doen dit. Een powerbank van €15-20 geeft uw telefoon 2-3 keer op.",
                },
                {
                  vraag: "Kan ik ook zonder app fietsen via knooppunten?",
                  antwoord: "Zeker! De knooppunten staan op bordjes langs de weg. U schrijft de nummers van tevoren op of neemt een papieren knooppuntenkaart mee. De app is een handige extra, maar niet noodzakelijk.",
                },
                {
                  vraag: "Hoe ver kan ik rijden op één accu?",
                  antwoord: "Dat hangt af van uw e-bike en hoe zwaar u de motor belast. Met lichte ondersteuning (stand 1-2) rijdt u gemiddeld 60 tot 100 km. Met de zwaarste stand (4-5) minder. Heuvelachtig terrein en tegenwind kosten ook meer stroom.",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-navy/10 rounded-xl overflow-hidden">
                  <div className="bg-gold/10 px-6 py-4 border-b border-navy/10">
                    <p className="text-senior-base font-bold text-gold">❓ {item.vraag}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.antwoord}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Zoektip */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              🔍 Een product opzoeken?
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Wilt u een telefoonhouder, powerbank of hoofdtelefoon kopen? Zoek dan zelf even op via Google of ChatGPT — dan vindt u actuele prijzen en beoordelingen.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-paper border border-navy/8 rounded-xl p-5">
                <p className="text-senior-base font-bold text-navy/75 mb-2">🌐 Via Google</p>
                <p className="text-senior-base text-navy/80">Typ in Google bijvoorbeeld: <strong>telefoonhouder fiets waterdicht</strong> — dan ziet u meteen webshops met prijzen.</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-green-800 mb-2">🤖 Via ChatGPT</p>
                <p className="text-senior-base text-navy/80">Vraag aan ChatGPT: <strong>&ldquo;Welke powerbank is goed voor op de fiets?&rdquo;</strong> — dan krijgt u uitleg én aanbevelingen.</p>
              </div>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "ANWB Fietsen app: kant-en-klare routes door heel Nederland",
                "Fietsknoop app: typ knooppuntnummers in en volg de route",
                "Bosch eBike Flow (of uw eigen merk-app): accu bewaken en ritten bijhouden",
                "Google Maps werkt ook op de fiets — kies het fiets-icoontje",
                "Neem een powerbank mee voor lange tochten",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream border-2 border-navy/8/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/google-maps" className="inline-flex items-center gap-2 bg-white border-2 border-navy/8 text-gold px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold/10 transition-colors">
                ← Google Maps
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 bg-gold text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold-light transition-colors ">
                ← Terug naar home
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
