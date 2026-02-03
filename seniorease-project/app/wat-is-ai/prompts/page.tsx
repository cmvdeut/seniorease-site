'use client';

import { useState } from 'react';
import Link from 'next/link';

const examplePrompts = [
  {
    category: '🍳 In de keuken',
    prompts: [
      `Ik heb de volgende ingrediënten over: [ingrediënten]. 
Geef me 3 simpele recepten die ik hiermee kan maken. 
Ik kook alleen, dus kleine porties graag.`,
      `Ik wil vanavond Italiaans koken maar ik ben niet zo ervaren. 
Geef me een makkelijk recept met stap-voor-stap uitleg.`,
    ],
  },
  {
    category: '✉️ Brieven en e-mails',
    prompts: [
      `Schrijf een beleefde maar duidelijke klachtbrief naar [bedrijf].
Het probleem is: [beschrijf het probleem].
Ik wil graag [wat u wilt bereiken].`,
      `Help me een bedankkaartje schrijven voor de buren die op mijn 
kat hebben gepast tijdens mijn vakantie. Kort en hartelijk.`,
    ],
  },
  {
    category: '🎁 Creatief',
    prompts: [
      `Schrijf een grappig verjaardagsgedicht voor mijn kleinkind [naam] 
die [leeftijd] wordt. Hij/zij houdt van [hobby's/interesses].`,
      `Ik zoek een leuke groepsnaam voor onze wandelclub. 
We zijn een groep van 8 gepensioneerden uit [plaats].
Geef me 10 creatieve suggesties.`,
    ],
  },
  {
    category: '🗺️ Plannen en organiseren',
    prompts: [
      `Help me een dagje uit plannen naar [plaats]. 
We zijn met 4 personen, allemaal 65+, en willen niet te veel lopen.
Wat zijn leuke dingen om te doen en waar kunnen we goed lunchen?`,
      `Ik ga volgende week op vakantie naar [bestemming] voor [aantal] dagen.
Maak een paklijst voor me. Het weer wordt [warm/koud/wisselend].`,
    ],
  },
  {
    category: '📱 Technologie begrijpen',
    prompts: [
      `Leg uit hoe ik een foto van mijn telefoon naar mijn computer 
kan krijgen. Ik heb een [iPhone/Samsung] en een Windows computer.
Leg het stap voor stap uit, ik ben niet technisch.`,
      `Wat is het verschil tussen WiFi en mobiel internet?
Leg het uit zonder technische termen.`,
    ],
  },
];

const followUpPrompts = [
  'Kun je dat korter/langer maken?',
  'Kun je het simpeler uitleggen?',
  'Geef me nog 3 andere opties',
  'Maak het wat formeler/informeler',
  'Ik bedoelde eigenlijk [verduidelijking]',
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 px-4 py-2 rounded-lg border-2 border-primary text-primary text-senior-sm font-bold hover:bg-primary/10 transition-colors min-h-[48px]"
      title="Kopieer naar klembord"
    >
      {copied ? '✓ Gekopieerd!' : 'Kopieer'}
    </button>
  );
}

export default function PromptsPage() {
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
              Prompts schrijven: zo praat u met AI
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Gebruik deze voorbeelden in ChatGPT of Claude. Klik op &quot;Kopieer&quot; en plak de vraag in de echte AI.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="AI Ontdekken subnavigatie">
              <Link href="/wat-is-ai" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Wat is AI?</Link>
              <Link href="/wat-is-ai/uitproberen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Uitproberen (Demo)</Link>
              <span className="text-senior-sm font-bold text-primary underline">Voorbeeldvragen</span>
              <Link href="/wat-is-ai/zo-ziet-het-eruit" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Zo ziet het eruit</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is een prompt? */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Wat is een &quot;prompt&quot;?
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
              Een prompt is gewoon uw vraag of opdracht aan de AI. Net zoals u iets aan een mens zou vragen! Het mooie is: u hoeft geen speciale taal te leren.
            </p>
          </div>

          {/* Gouden regels */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              De gouden regels voor goede prompts
            </h2>

            <h3 className="text-senior-lg font-bold text-primary mt-6 mb-3">1. Wees specifiek 🎯</h3>
            <p className="text-senior-base text-gray-700 mb-4">Hoe meer details, hoe beter het antwoord.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-senior-base border-collapse border-2 border-neutral-stone">
                <thead>
                  <tr className="bg-neutral-cream">
                    <th className="border border-neutral-stone p-3 text-left font-bold text-primary">❌ Vaag</th>
                    <th className="border border-neutral-stone p-3 text-left font-bold text-primary">✅ Specifiek</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-stone p-3 text-gray-700">&quot;Geef me een recept&quot;</td>
                    <td className="border border-neutral-stone p-3 text-gray-700">&quot;Geef me een makkelijk recept voor 2 personen met kip, dat maximaal 30 minuten duurt&quot;</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-stone p-3 text-gray-700">&quot;Schrijf een brief&quot;</td>
                    <td className="border border-neutral-stone p-3 text-gray-700">&quot;Schrijf een beleefde brief naar mijn energieleverancier om mijn maandbedrag te verlagen&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-senior-lg font-bold text-primary mt-6 mb-3">2. Vertel wat u wilt bereiken 🏁</h3>
            <p className="text-senior-base text-gray-700 mb-2">AI kan beter helpen als het weet <em>waarom</em> u iets vraagt.</p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-neutral-cream rounded-r-xl text-senior-base text-gray-700 italic">
              &quot;Ik moet een speech houden op het 50-jarig huwelijk van mijn zus. Help me een korte, grappige maar ook ontroerende tekst van ongeveer 3 minuten te schrijven.&quot;
            </blockquote>

            <h3 className="text-senior-lg font-bold text-primary mt-6 mb-3">3. Geef context over uzelf 👤</h3>
            <p className="text-senior-base text-gray-700 mb-2">AI past zich aan als het meer over u weet.</p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-neutral-cream rounded-r-xl text-senior-base text-gray-700 italic">
              &quot;Leg uit hoe een smartphone werkt. Ik ben 72 en heb nog nooit een smartphone gehad.&quot;
            </blockquote>

            <h3 className="text-senior-lg font-bold text-primary mt-6 mb-3">4. Vraag om een bepaalde stijl of lengte 📏</h3>
            <ul className="list-disc list-inside text-senior-base text-gray-700 space-y-2">
              <li>&quot;Leg het uit alsof ik 10 jaar oud ben&quot;</li>
              <li>&quot;Geef een kort antwoord van maximaal 3 zinnen&quot;</li>
              <li>&quot;Schrijf het formeel / informeel / met humor&quot;</li>
            </ul>
          </div>

          {/* 10 Voorbeeldprompts */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              10 Voorbeeldprompts om te kopiëren
            </h2>
            <p className="text-senior-base text-gray-700 mb-6">
              Vervang de tekst tussen [haakjes] door uw eigen gegevens.
            </p>

            {examplePrompts.map((section, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h3 className="text-senior-lg font-bold text-primary mb-4">{section.category}</h3>
                <div className="space-y-4">
                  {section.prompts.map((prompt, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-neutral-cream rounded-xl border-2 border-neutral-stone"
                    >
                      <pre className="flex-1 text-senior-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans overflow-x-auto p-2">
                        {prompt.trim()}
                      </pre>
                      <CopyButton text={prompt} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vervolgvragen */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-4">
              Vervolgvragen: de geheime superkracht
            </h2>
            <p className="text-senior-base text-gray-700 mb-6">
              Het mooie van AI is dat u kunt <em>doorvragen</em>. U hoeft niet alles in één keer goed te hebben!
            </p>
            <p className="text-senior-base font-bold text-gray-800 mb-3">Handige vervolgvragen:</p>
            <ul className="space-y-2">
              {followUpPrompts.map((q, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-neutral-cream rounded-xl border-2 border-neutral-stone">
                  <span className="text-primary font-bold shrink-0">&quot;{q}&quot;</span>
                  <CopyButton text={q} />
                </li>
              ))}
            </ul>
          </div>

          {/* Wat als het antwoord niet goed is? */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Wat als het antwoord niet goed is?
            </h2>
            <p className="text-senior-base text-gray-700 mb-6">
              Geen probleem! Probeer dan:
            </p>
            <ol className="list-decimal list-inside text-senior-base text-gray-700 space-y-3">
              <li><strong>Meer details geven:</strong> &quot;Ik bedoelde eigenlijk...&quot;</li>
              <li><strong>Anders formuleren:</strong> Stel dezelfde vraag op een andere manier</li>
              <li><strong>Om verbetering vragen:</strong> &quot;Dit is te lang, maak het korter&quot;</li>
              <li><strong>Opnieuw beginnen:</strong> &quot;Laten we opnieuw beginnen. Ik wil...&quot;</li>
            </ol>
            <p className="text-senior-base text-gray-700 mt-6">
              AI wordt niet boos, ongeduldig of beledigd. U kunt het eindeloos opnieuw proberen!
            </p>
          </div>

          {/* Samenvatting */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Samenvatting
            </h2>
            <ul className="space-y-3 text-senior-base text-gray-700">
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Wees specifiek en geef details</li>
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Vertel wat u wilt bereiken</li>
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Geef context over uzelf</li>
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Vraag om een bepaalde stijl</li>
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Durf door te vragen</li>
              <li className="flex items-center gap-3"><span className="text-green-600 font-bold text-2xl">✅</span> Probeer gerust opnieuw</li>
            </ul>
            <p className="text-senior-lg font-bold text-primary mt-8">
              Het allerbelangrijkste: gewoon beginnen! U leert het snelst door te doen.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 text-center">
            <p className="text-senior-base text-gray-700 mb-4">
              Probeer deze vragen in de demo of direct in ChatGPT of Claude!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/wat-is-ai/uitproberen"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
              >
                Demo uitproberen →
              </Link>
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
              >
                ChatGPT openen →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
