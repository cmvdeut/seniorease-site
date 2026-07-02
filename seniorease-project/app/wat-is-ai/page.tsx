import Link from 'next/link';
import { YOUTUBE_PLAYLISTS, youtubePlaylistUrl } from '@/lib/youtube-videos';

export const metadata = {
  title: "Wat is AI? Uitleg in gewone taal voor senioren",
  description: "Wat is kunstmatige intelligentie en gebruikt u het al zonder het te weten? Begrijpelijke uitleg over AI en ChatGPT, speciaal voor senioren.",
};

export default function WatIsAIPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Wat is AI? En nee, het komt niet uit een sciencefictionfilm
            </h1>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="AI Ontdekken subnavigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">AI Ontdekken:</span>
              <Link href="/wat-is-ai" className="text-senior-sm font-bold text-primary underline hover:text-primary-dark">
                Wat is AI?
              </Link>
              <Link href="/wat-is-ai/uitproberen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">
                Uitproberen (Demo)
              </Link>
              <Link href="/wat-is-ai/prompts" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">
                Voorbeeldvragen
              </Link>
              <Link href="/wat-is-ai/zo-ziet-het-eruit" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">
                Zo ziet het eruit
              </Link>
              <Link href="/wat-is-ai/chatgpt" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">
                ChatGPT stap voor stap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Video */}
          <section className="my-8 mx-4 sm:mx-0">
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/oIpn7WSopy0"
                title="Wat is AI? Simpele uitleg voor senioren"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-senior-base">
              🎬 Bekijk de video (1 minuut) of lees verder voor meer uitleg
            </p>
            <div className="max-w-3xl mx-auto mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-neutral-stone/40 bg-white">
              <div className="text-4xl" aria-hidden="true">▶️</div>
              <div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-1">Alle AI-video&apos;s op YouTube</h3>
                <p className="text-senior-base text-gray-600 mb-4">
                  Rustige uitleg over AI en ChatGPT — stap voor stap, speciaal voor senioren.
                </p>
                <a
                  href={youtubePlaylistUrl(YOUTUBE_PLAYLISTS.ai)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm text-primary border-primary bg-neutral-cream"
                >
                  Bekijk de AI-playlist op YouTube
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              De robots komen... om te helpen met de boodschappenlijst
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
              U hebt het vast wel eens gehoord: &quot;AI dit, AI dat.&quot; Op het nieuws, van de kleinkinderen, of van die ene buurman die altijd alles al weet. Maar wat <em>ís</em> het nou eigenlijk? En belangrijker: moet u er bang voor zijn?
            </p>
            <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6">
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed font-semibold">
                <strong>Het korte antwoord:</strong> Nee. AI bijt niet en het kan ook niet door uw muren kijken. Beloofd.
              </p>
            </div>
          </section>

          {/* AI in gewone-mensen-taal */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              AI in gewone-mensen-taal
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
              AI staat voor &quot;Artificial Intelligence&quot; — kunstmatige intelligentie. Klinkt ingewikkeld, maar eigenlijk is het gewoon een slim computerprogramma dat heel goed is in één ding: patronen herkennen en daar iets mee doen.
            </p>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
              <strong>Vergelijking:</strong> Weet u nog hoe u uw kleinkinderen leerde fietsen? Eerst vallen, dan wankelen, dan rijden. AI leert ook zo — alleen dan met miljoenen voorbeelden tegelijk. En zonder schaafwonden.
            </p>
          </section>

          {/* Maar ik gebruik toch geen AI? */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              &quot;Maar ik gebruik toch geen AI?&quot;
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Toch wel. Hier zijn voorbeelden die u vast herkent:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Spamfilter", desc: "Die rommel uit uw e-mail houdt? AI." },
                { title: "Netflix aanbevelingen", desc: "\"Omdat u Dokter Tinus keek...\" AI." },
                { title: "Google", desc: "Weet wat u bedoelt, ook als u het verkeerd typt? AI." },
                { title: "Telefoon", desc: "Herkent gezichten op foto&apos;s? AI." },
              ].map((item, i) => (
                <li key={i} className="bg-neutral-cream border-2 border-neutral-stone rounded-xl p-4">
                  <span className="text-senior-base font-bold text-primary block mb-1">{item.title}</span>
                  <span className="text-senior-sm text-gray-700">{item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mt-6 font-semibold">
              U bent dus al een ervaren AI-gebruiker. Gefeliciteerd!
            </p>
          </section>

          {/* Wat kunt u ermee? */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Wat kunt u ermee?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: "✍️",
                  title: "Helpt met schrijven",
                  items: ["Een brief naar de gemeente opstellen", "Een klacht formuleren die wél serieus wordt genomen", "Een verjaardagsgedicht voor de kleinkinderen"],
                },
                {
                  icon: "🍳",
                  title: "Meedenkt in de keuken",
                  items: ["\"Ik heb nog aardappelen, een ui en een blikje tonijn. Wat kan ik maken?\" AI geeft u binnen seconden drie recepten. Zonder te zuchten."],
                },
                {
                  icon: "📋",
                  title: "Dingen uitlegt",
                  items: ["Die ingewikkelde bijsluiter? AI legt het uit in begrijpelijke taal.", "Een brief van de belastingdienst? AI vertaalt ambtenarenjargon naar Nederlands."],
                },
                {
                  icon: "🗓️",
                  title: "Helpt plannen",
                  items: ["Een dagje uit organiseren", "Een route uitstippelen", "Bedenken wat u moet inpakken"],
                },
              ].map((card, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6">
                  <h3 className="text-senior-lg font-bold text-primary mb-3">
                    {card.icon} {card.title}
                  </h3>
                  <ul className="list-disc list-inside text-senior-base text-gray-700 space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Is het niet gevaarlijk? */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Is het niet gevaarlijk?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-green-800 mb-3">Geen zorgen nodig:</h3>
                <ul className="text-senior-base text-gray-700 space-y-2">
                  <li>• AI leest niet uw gedachten</li>
                  <li>• AI &quot;neemt het niet over&quot;</li>
                  <li>• AI wordt niet boos op u</li>
                </ul>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-amber-800 mb-3">Wel even opletten:</h3>
                <ul className="text-senior-base text-gray-700 space-y-2">
                  <li>• Deel geen wachtwoorden of pincodes</li>
                  <li>• Controleer belangrijke info altijd even</li>
                  <li>• Gratis is niet altijd gratis (let op uw gegevens)</li>
                </ul>
              </div>
            </div>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed bg-neutral-cream border-2 border-primary/30 rounded-xl p-4">
              <strong>Vuistregel:</strong> Behandel AI zoals een behulpzame vreemde. Vriendelijk en handig, maar u geeft niet zomaar uw pincode.
            </p>
          </section>

          {/* Zelf proberen? CTA */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Zelf proberen?
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              De beste manier om AI te leren kennen is gewoon even proberen. U kunt niets kapotmaken!
            </p>
            <p className="text-senior-base font-bold text-gray-800 mb-2">Stappen:</p>
            <ol className="list-decimal list-inside text-senior-base text-gray-700 space-y-2 mb-6">
              <li>Ga naar <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">claude.ai</a> of <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">chatgpt.com</a></li>
              <li>Maak gratis een account aan</li>
              <li>Typ een vraag, bijvoorbeeld:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>&quot;Leg uit wat AI is alsof ik 10 jaar oud ben&quot;</li>
                  <li>&quot;Geef me een recept voor appeltaart zonder suiker&quot;</li>
                  <li>&quot;Schrijf een grappig gedichtje over mijn kat&quot;</li>
                </ul>
              </li>
            </ol>
            <p className="text-senior-base font-bold text-gray-800 mb-2">Tips:</p>
            <ul className="text-senior-base text-gray-700 space-y-1 mb-4">
              <li>• Wees gewoon beleefd — geen speciale taal nodig</li>
              <li>• Stel vervolgvragen: &quot;Kunt u dat korter uitleggen?&quot;</li>
              <li>• Het is oké om fouten te maken</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
              >
                Claude.ai openen →
              </a>
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-3 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
              >
                ChatGPT openen →
              </a>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-neutral-stone">
              <p className="text-senior-base font-bold text-gray-800 mb-4">Verder ontdekken:</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/wat-is-ai/uitproberen"
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
                >
                  Probeer de demo →
                </Link>
                <Link
                  href="/wat-is-ai/prompts"
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-5 py-3 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
                >
                  Bekijk voorbeeldvragen →
                </Link>
                <Link
                  href="/wat-is-ai/zo-ziet-het-eruit"
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-5 py-3 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
                >
                  Zo ziet ChatGPT eruit →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Veelgestelde vragen
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Kost het geld?",
                  a: "Er zijn gratis versies van de meeste AI-tools. Prima om mee te beginnen!",
                },
                {
                  q: "Moet ik er technisch voor zijn?",
                  a: "Kunt u typen en een vraag stellen? Dan kunt u AI gebruiken.",
                },
                {
                  q: "Wat als ik iets verkeerd doe?",
                  a: "Dan zegt AI beleefd dat het u niet begrijpt. Net als de zelfscanner bij Albert Heijn, maar dan vriendelijker.",
                },
                {
                  q: "Vervangt AI mijn dokter/advocaat/kleinkind?",
                  a: "Nee! AI is een hulpmiddel, geen vervanging. Voor een knuffel gaat u nog steeds naar uw kleinkind.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-neutral-cream border-2 border-neutral-stone rounded-xl overflow-hidden"
                >
                  <summary className="text-senior-base font-bold text-primary cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-2">
                    <span>&quot;{faq.q}&quot;</span>
                    <span className="text-2xl text-primary group-open:rotate-180 transition-transform" aria-hidden>▼</span>
                  </summary>
                  <div className="px-6 pb-4 pt-0 text-senior-base text-gray-700 leading-relaxed border-t-0">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Afsluiting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Samenvatting
            </h2>
            <ul className="space-y-3 text-senior-base text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-2xl">✅</span>
                Een handige digitale helper
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-2xl">✅</span>
                Makkelijker dan u denkt
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-2xl">✅</span>
                Gratis te proberen
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500 font-bold text-2xl">❌</span>
                Geen robot die de wereld overneemt
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500 font-bold text-2xl">❌</span>
                Niet eng of ingewikkeld
              </li>
            </ul>
            <p className="text-senior-lg font-bold text-primary mt-8">
              Neem een kop koffie, open uw laptop, en stel uw eerste vraag!
            </p>
            <Link
              href="/"
              className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
            >
              ← Terug naar home
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
