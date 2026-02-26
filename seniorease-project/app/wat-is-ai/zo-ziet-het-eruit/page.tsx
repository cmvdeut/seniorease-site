import Link from 'next/link';

export const metadata = {
  title: "Zo ziet ChatGPT eruit",
  description: "Screenshots en uitleg van de ChatGPT en Claude interface. Waar typt u uw vraag en waar verschijnt het antwoord?",
};

const placeholderSteps = [
  {
    num: 1,
    title: "ChatGPT startscherm",
    desc: "Lege chat met invoerveld onderaan. Hier typt u uw vraag.",
    imagePlaceholder: "Plaats hier later een screenshot: lege chat, invoerveld onderaan.",
  },
  {
    num: 2,
    title: "Vraag en antwoord",
    desc: "Simpele vraag: \"Wat kan ik koken met pasta en tomaten?\" Uw vraag bovenaan, het antwoord van AI eronder.",
    imagePlaceholder: "Plaats hier later een screenshot: vraag + antwoord in de chat.",
  },
  {
    num: 3,
    title: "Nieuw gesprek starten",
    desc: "Sidebar met \"New chat\" knop. Klik hier voor een nieuw gesprek.",
    imagePlaceholder: "Plaats hier later een screenshot: sidebar met New chat.",
  },
  {
    num: 4,
    title: "Claude.ai interface",
    desc: "Claude ziet er ongeveer hetzelfde uit: een veld om uw vraag te typen en antwoorden erboven.",
    imagePlaceholder: "Plaats hier later een screenshot: Claude startscherm.",
  },
];

export default function ZoZietHetEruitPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
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
              Zo ziet ChatGPT eruit
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Nog nooit ChatGPT of Claude gebruikt? Geen zorgen! Hier ziet u precies hoe het eruitziet en waar u moet klikken.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="AI Ontdekken subnavigatie">
              <Link href="/wat-is-ai" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Wat is AI?</Link>
              <Link href="/wat-is-ai/uitproberen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Uitproberen (Demo)</Link>
              <Link href="/wat-is-ai/prompts" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Voorbeeldvragen</Link>
              <span className="text-senior-sm font-bold text-primary underline">Zo ziet het eruit</span>
              <Link href="/wat-is-ai/chatgpt" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">ChatGPT stap voor stap</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Video: Bekijk het in actie */}
          <section className="my-8">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary text-center mb-4">
              Bekijk het in actie
            </h2>
            <p className="text-center text-gray-600 mb-6 text-senior-base">
              In deze video vraag ik ChatGPT om een recept te bedenken. Zo ziet u precies hoe het werkt!
            </p>
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/g_XX1jY6VkI"
                title="ChatGPT gebruiken: zo vraag je om een recept"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-500 mt-4 text-senior-sm">
              💡 Tip: Zet de video op volledig scherm voor de beste weergave
            </p>
            <div className="text-center mt-8 p-6 bg-primary/10 rounded-xl border-2 border-primary/30">
              <p className="text-senior-lg font-bold text-primary mb-4">Zelf proberen?</p>
              <a
                href="https://chat.openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
              >
                Ga naar ChatGPT →
              </a>
            </div>
          </section>

          {placeholderSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden"
            >
              <div className="p-6 border-b-2 border-neutral-stone">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-senior-lg font-bold mb-3">
                  {step.num}
                </span>
                <h2 className="text-senior-xl font-bold text-primary">
                  {step.title}
                </h2>
                <p className="text-senior-base text-gray-700 mt-2">
                  {step.desc}
                </p>
              </div>
              <div className="bg-neutral-cream border-2 border-dashed border-neutral-stone m-6 p-12 rounded-xl text-center">
                <p className="text-senior-base text-gray-500 italic">
                  {step.imagePlaceholder}
                </p>
                <p className="text-senior-sm text-gray-400 mt-2">
                  (Screenshot later toevoegen)
                </p>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Stappen in het kort
            </h2>
            <ol className="space-y-4 text-senior-base text-gray-700">
              <li className="flex gap-4">
                <span className="font-bold text-primary shrink-0">1.</span>
                Ga naar chatgpt.com of claude.ai en maak een gratis account aan.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary shrink-0">2.</span>
                U ziet een leeg scherm met onderaan een tekstveld.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary shrink-0">3.</span>
                Typ uw vraag en druk op Enter.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary shrink-0">4.</span>
                Wacht even en het antwoord verschijnt.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary shrink-0">5.</span>
                U kunt doorvragen of een nieuw gesprek beginnen.
              </li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/wat-is-ai/uitproberen"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
              >
                Demo uitproberen →
              </Link>
              <Link
                href="/wat-is-ai/prompts"
                className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
              >
                Voorbeeldvragen bekijken →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
