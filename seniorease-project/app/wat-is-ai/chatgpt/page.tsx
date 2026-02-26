import Link from 'next/link';

export const metadata = {
  title: "ChatGPT stap voor stap – voor beginners",
  description: "Leer ChatGPT gebruiken in eenvoudige stappen. Account aanmaken, eerste vraag stellen, doorvragen en 10 handige voorbeelden voor senioren.",
};

const voorbeeldvragen = [
  {
    categorie: "Koken",
    icon: "🍳",
    vragen: [
      "\"Ik heb aardappelen, een ui en gehakt. Wat kan ik vanavond maken?\"",
      "\"Geef me een eenvoudig recept voor appeltaart zonder veel stappen\"",
    ],
  },
  {
    categorie: "Schrijven",
    icon: "✍️",
    vragen: [
      "\"Help me een brief schrijven naar mijn gemeente over [onderwerp]\"",
      "\"Schrijf een verjaardagsgedicht voor mijn kleinkind van 8 jaar\"",
    ],
  },
  {
    categorie: "Uitleg vragen",
    icon: "📋",
    vragen: [
      "\"Leg uit wat [moeilijk woord in brief] betekent in gewone taal\"",
      "\"Wat is het verschil tussen een huisarts en een specialist?\"",
    ],
  },
  {
    categorie: "Plannen",
    icon: "🗓️",
    vragen: [
      "\"Geef me ideeën voor een dagje uit in de buurt van [stad]\"",
      "\"Wat moet ik inpakken voor een weekendje weg in april?\"",
    ],
  },
  {
    categorie: "Gezondheid",
    icon: "💊",
    vragen: [
      "\"Leg uit wat [medicijnnaam] doet in eenvoudige taal\"",
      "\"Welke vragen kan ik stellen aan mijn dokter over [klacht]?\"",
    ],
  },
];

const stappenAccount = [
  {
    num: 1,
    titel: "Open uw browser",
    uitleg: "Start Chrome, Edge of Firefox op uw computer of tablet.",
  },
  {
    num: 2,
    titel: "Ga naar chatgpt.com",
    uitleg: "Typ chatgpt.com in de adresbalk bovenaan en druk op Enter.",
  },
  {
    num: 3,
    titel: "Klik op 'Aanmelden'",
    uitleg: "Rechts bovenaan ziet u de knop 'Sign up' of 'Aanmelden'. Klik daarop.",
  },
  {
    num: 4,
    titel: "Maak een account aan",
    uitleg: "Vul uw e-mailadres in en kies een wachtwoord. Of gebruik uw Google-account als u dat heeft — dat is nog makkelijker.",
  },
  {
    num: 5,
    titel: "Bevestig uw e-mail",
    uitleg: "U krijgt een e-mail van ChatGPT. Open die en klik op de link erin. Daarna kunt u meteen beginnen.",
  },
];

export default function ChatGPTUitlegPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/wat-is-ai"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar Wat is AI?
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              ChatGPT gebruiken — stap voor stap
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Geen ervaring nodig. Na deze uitleg kunt u meteen aan de slag.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="AI Ontdekken subnavigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">AI Ontdekken:</span>
              <Link href="/wat-is-ai" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Wat is AI?</Link>
              <Link href="/wat-is-ai/uitproberen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Uitproberen (Demo)</Link>
              <Link href="/wat-is-ai/prompts" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Voorbeeldvragen</Link>
              <Link href="/wat-is-ai/zo-ziet-het-eruit" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Zo ziet het eruit</Link>
              <span className="text-senior-sm font-bold text-primary underline">ChatGPT stap voor stap</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is ChatGPT precies? */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Wat is ChatGPT precies?
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
              ChatGPT is een digitale assistent waarmee u gewoon kunt typen, net als een berichtje sturen. U stelt een vraag, en ChatGPT geeft antwoord. In normale taal, zonder moeilijke woorden.
            </p>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Het is alsof u een heel belezen vriend heeft die altijd tijd heeft, nooit ongeduldig wordt en alles rustig uitlegt.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🆓", label: "Gratis te gebruiken", sub: "De basisversie kost niets" },
                { icon: "⏰", label: "Altijd beschikbaar", sub: "Ook &apos;s avonds en in het weekend" },
                { icon: "🤫", label: "Geen domme vragen", sub: "U kunt alles vragen, écht alles" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-base font-bold text-gray-800 mb-1">{item.label}</p>
                  <p className="text-senior-xs text-gray-600" dangerouslySetInnerHTML={{ __html: item.sub }} />
                </div>
              ))}
            </div>
          </section>

          {/* Stap 1: Account aanmaken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
              Stap 1 — Account aanmaken (eenmalig, 5 minuten)
            </h2>
            <p className="text-senior-base text-gray-600 mb-8">
              Dit hoeft u maar één keer te doen. Daarna kunt u altijd zo beginnen.
            </p>
            <ol className="space-y-5">
              {stappenAccount.map((stap) => (
                <li key={stap.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-senior-lg font-bold">
                    {stap.num}
                  </div>
                  <div>
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{stap.titel}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{stap.uitleg}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-2">💡 Tip</p>
              <p className="text-senior-base text-gray-700">
                Heeft u een Gmail-adres? Klik dan op &quot;Doorgaan met Google&quot;. U hoeft dan geen nieuw wachtwoord te bedenken — extra makkelijk!
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Ga naar ChatGPT →
              </a>
            </div>
          </section>

          {/* Stap 2: Uw eerste vraag */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
              Stap 2 — Uw eerste vraag stellen
            </h2>
            <p className="text-senior-base text-gray-600 mb-8">
              Eenmaal ingelogd ziet u een leeg tekstveld. Dat is het. Typ uw vraag en druk op Enter (of op het pijltje rechts van het veld).
            </p>

            {/* Voorbeeld gesprek */}
            <div className="bg-neutral-cream rounded-xl border-2 border-neutral-stone p-6 mb-6">
              <p className="text-senior-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">Voorbeeld gesprek</p>
              {/* Vraag */}
              <div className="flex justify-end mb-4">
                <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-sm">
                  <p className="text-senior-base">Geef me een eenvoudig recept voor appeltaart</p>
                </div>
              </div>
              {/* Antwoord */}
              <div className="flex justify-start">
                <div className="bg-white border-2 border-neutral-stone rounded-2xl rounded-tl-sm px-5 py-4 max-w-sm">
                  <p className="text-senior-xs font-bold text-gray-500 mb-2">ChatGPT antwoordt:</p>
                  <p className="text-senior-base text-gray-700 leading-relaxed">
                    Natuurlijk! Dit heb je nodig:<br />
                    4 appels, 200g bloem, 150g suiker, 125g boter, 2 eieren en wat kaneel.<br /><br />
                    Verwarm de oven op 180°C, schil de appels en snij ze in plakjes...
                  </p>
                  <p className="text-senior-xs text-gray-400 mt-2 italic">(en zo gaat het nog even door)</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <span className="text-2xl">✅</span>
                <p className="text-senior-base text-gray-700">Typ gewoon zoals u zou praten. Geen speciale taal nodig.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <span className="text-2xl">✅</span>
                <p className="text-senior-base text-gray-700">Maak geen zorgen over spelfouten — ChatGPT begrijpt u toch.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <span className="text-2xl">✅</span>
                <p className="text-senior-base text-gray-700">U kunt niets kapotmaken. Echt niet.</p>
              </div>
            </div>
          </section>

          {/* Stap 3: Doorvragen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
              Stap 3 — Doorvragen (het geheime trucje)
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              ChatGPT onthoudt wat u eerder in hetzelfde gesprek heeft gevraagd. U kunt dus gewoon doorpraten, zoals met een persoon.
            </p>

            <div className="bg-neutral-cream rounded-xl border-2 border-neutral-stone p-6 mb-6">
              <p className="text-senior-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">Doorvragen in de praktijk</p>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-xs">
                    <p className="text-senior-base">Geef me een recept voor appeltaart</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-neutral-stone rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs">
                    <p className="text-senior-base text-gray-700">Zeker! Hier is een recept... [antwoord]</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-xs">
                    <p className="text-senior-base">Kun je dat nog simpeler maken? Ik ben geen ervaren bakker.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-neutral-stone rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs">
                    <p className="text-senior-base text-gray-700">Natuurlijk! Hier een versimpelde versie... [nieuw antwoord]</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-senior-base md:text-senior-lg font-bold text-gray-800 mb-3">Handige zinnen om te doorvragen:</p>
            <ul className="space-y-2">
              {[
                "\"Kun je dat korter uitleggen?\"",
                "\"Ik begrijp het niet helemaal. Kun je een voorbeeld geven?\"",
                "\"Doe het wat eenvoudiger alsjeblieft\"",
                "\"En wat als ik geen [ingrediënt] in huis heb?\"",
                "\"Kun je dat in een lijstje zetten?\"",
              ].map((zin, i) => (
                <li key={i} className="flex items-center gap-3 bg-neutral-cream border border-neutral-stone rounded-lg px-4 py-3">
                  <span className="text-primary font-bold text-xl">→</span>
                  <span className="text-senior-base text-gray-700 italic">{zin}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 10 Voorbeeldvragen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
              10 handige vragen om mee te beginnen
            </h2>
            <p className="text-senior-base text-gray-600 mb-8">
              Kopieer een vraag, pas hem aan op uw situatie en plak hem in ChatGPT. Zo simpel is het.
            </p>
            <div className="space-y-6">
              {voorbeeldvragen.map((categorie, i) => (
                <div key={i}>
                  <h3 className="text-senior-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">{categorie.icon}</span>
                    {categorie.categorie}
                  </h3>
                  <div className="space-y-2 ml-8">
                    {categorie.vragen.map((vraag, j) => (
                      <div key={j} className="bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                        <p className="text-senior-base text-gray-700 leading-relaxed">{vraag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-primary/10 border-2 border-primary/30 rounded-xl p-5">
              <p className="text-senior-base font-bold text-primary mb-2">
                Wilt u nog meer voorbeeldvragen?
              </p>
              <Link
                href="/wat-is-ai/prompts"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
              >
                Bekijk alle voorbeeldvragen →
              </Link>
            </div>
          </section>

          {/* Wat u NIET moet doen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Veiligheid — wat u beter niet kunt doen
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              ChatGPT is veilig voor normaal gebruik. Maar net als op internet geldt: wees voorzichtig met uw persoonlijke gegevens.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-red-800 mb-3">❌ Nooit invullen:</p>
                <ul className="text-senior-base text-gray-700 space-y-2">
                  <li>• Uw wachtwoorden</li>
                  <li>• Uw pincode of bankgegevens</li>
                  <li>• Uw BSN-nummer</li>
                  <li>• Volledige creditcardnummers</li>
                </ul>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-green-800 mb-3">✅ Gerust vragen:</p>
                <ul className="text-senior-base text-gray-700 space-y-2">
                  <li>• Recepten en kooktips</li>
                  <li>• Uitleg over brieven of woorden</li>
                  <li>• Hulp bij teksten schrijven</li>
                  <li>• Ideeën en adviezen</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-2">⚠️ Belangrijk om te weten</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                ChatGPT kan soms fouten maken of verouderde informatie geven. Controleer medisch of financieel advies altijd bij een echte professional. Voor een knuffel en echt advies gaat u nog steeds naar uw kleinkind of huisarts.
              </p>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Samenvatting — in het kort
            </h2>
            <ol className="space-y-4 mb-8">
              {[
                { num: 1, tekst: "Ga naar chatgpt.com en maak een gratis account aan (eenmalig)" },
                { num: 2, tekst: "Typ uw vraag gewoon in normale taal en druk op Enter" },
                { num: 3, tekst: "Lees het antwoord en vraag door als iets niet duidelijk is" },
                { num: 4, tekst: "Deel nooit wachtwoorden, pincode of BSN-nummer" },
                { num: 5, tekst: "Oefening baart kunst — hoe vaker u het probeert, hoe makkelijker het gaat" },
              ].map((item) => (
                <li key={item.num} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {item.num}
                  </div>
                  <p className="text-senior-base text-gray-700 leading-relaxed pt-1">{item.tekst}</p>
                </li>
              ))}
            </ol>
            <p className="text-senior-lg font-bold text-primary mb-6">
              Klaar? Neem een kop koffie erbij en probeer het gewoon. U kunt niets kapotmaken! ☕
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Open ChatGPT →
              </a>
              <Link
                href="/wat-is-ai/uitproberen"
                className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors"
              >
                Probeer eerst de demo →
              </Link>
            </div>
          </section>

          {/* Navigatie onderaan */}
          <div className="flex flex-wrap gap-4 pb-4">
            <Link
              href="/wat-is-ai"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-senior-base font-semibold hover:underline"
            >
              ← Terug naar Wat is AI?
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-senior-base font-semibold hover:underline"
            >
              ← Terug naar home
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
