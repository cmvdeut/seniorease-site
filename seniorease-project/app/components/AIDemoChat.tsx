'use client';

import { useState } from 'react';

const demoConversations = {
  recept: {
    prompt: "Ik heb aardappelen, een ui en een blikje tonijn. Wat kan ik maken?",
    response: `Daar kan ik iets lekkers van maken! Hier is een simpel recept:

**Tonijn-aardappelschotel** (30 minuten)

1. Kook de aardappelen in blokjes gaar (15 min)
2. Fruit de ui glazig in een pan
3. Voeg de tonijn toe en roer door
4. Meng met de aardappelen
5. Breng op smaak met peper en eventueel een beetje mayonaise

Tip: Heb je nog kaas? Strooi er wat overheen en zet 10 minuten in de oven voor een gratinnetje!

Smakelijk eten! 🍽️`
  },
  brief: {
    prompt: "Help me een brief schrijven naar de gemeente over een kapotte stoeptegel",
    response: `Natuurlijk help ik u daarmee. Hier is een nette brief:

---

Geachte heer/mevrouw,

Hierbij wil ik u attent maken op een kapotte stoeptegel voor mijn woning aan de [uw straatnaam + huisnummer].

De tegel ligt los en steekt omhoog, waardoor er valgevaar ontstaat. Vooral voor oudere buurtbewoners en mensen met een rollator is dit een risico.

Ik verzoek u vriendelijk om de tegel te laten repareren.

Met vriendelijke groet,
[Uw naam]
[Uw adres]
[Datum]

---

Wilt u dat ik nog iets aanpas? Bijvoorbeeld de toon wat dringender maken?`
  },
  bijsluiter: {
    prompt: "Leg deze bijsluitertekst uit in simpele taal: 'Niet gebruiken bij overgevoeligheid voor de werkzame stof'",
    response: `In gewone taal betekent dit:

**"Gebruik dit medicijn niet als u er allergisch voor bent."**

Wat is een "werkzame stof"? 
Dat is simpelweg het ingrediënt in het medicijn dat het echte werk doet — datgene wat u beter maakt.

Hoe weet u of u allergisch bent?
- Heeft u dit medicijn eerder gebruikt zonder problemen? Dan bent u waarschijnlijk niet allergisch.
- Twijfelt u? Vraag het uw huisarts of apotheker.

Wilt u dat ik nog meer van de bijsluiter uitleg?`
  },
  gedicht: {
    prompt: "Schrijf een grappig verjaardagsgedicht voor mijn kleinkind van 8",
    response: `Hier is een vrolijk gedichtje:

🎈 **Voor een jarige van 8** 🎈

Hoera, hoera, je bent alweer acht!
Dat is toch echt een heleracht.
Je bent nu groot, maar niet té groot,
Want dan pas je niet meer op oma's schoot!

Je mag nog steeds naar buiten om te spelen,
En snoepjes van opa stiekem delen.
Maar huiswerk maken, ja dat moet...
(Gelukkig helpt de juf je goed!)

Geniet van taart en cadeaus en feest,
Je bent het allerleukste beest!

🎁 Van oma/opa met heel veel liefs 🎁

---
Wilt u dat ik er iets persoonlijks aan toevoeg? Bijvoorbeeld een hobby of de naam van uw kleinkind?`
  }
};

type ConversationKey = keyof typeof demoConversations;

export default function AIDemoChat() {
  const [selectedDemo, setSelectedDemo] = useState<ConversationKey | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectDemo = (key: ConversationKey) => {
    setSelectedDemo(key);
    setShowResponse(false);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowResponse(true);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedDemo(null);
    setShowResponse(false);
    setIsTyping(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-white p-6 rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-paper/20 rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl" aria-hidden>🤖</span>
          </div>
          <div>
            <h3 className="text-senior-lg font-bold">AI Assistent (Demo)</h3>
            <p className="text-senior-sm text-white/90">Probeer het zelf uit!</p>
          </div>
        </div>
      </div>

      {/* Chat venster */}
      <div className="bg-neutral-cream border-x-2 border-b-2 border-neutral-stone p-6 min-h-[420px]">
        {!selectedDemo ? (
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl shadow-sm border-2 border-primary/20">
              <p className="text-senior-base text-gray-700 mb-4">
                👋 Hallo! Ik ben een AI-assistent. Klik op een voorbeeld om te zien hoe ik u kan helpen.
              </p>
              <p className="text-senior-sm text-gray-500">
                Dit is een demonstratie — bij de echte AI kunt u alles vragen!
              </p>
            </div>

            <p className="text-senior-base font-bold text-gray-700">
              Kies een voorbeeld:
            </p>

            <div className="grid gap-4">
              {[
                { key: 'recept', icon: '🍳', title: 'Recept bedenken', desc: '"Wat kan ik maken met deze ingrediënten?"' },
                { key: 'brief', icon: '✉️', title: 'Brief schrijven', desc: '"Help me een brief naar de gemeente schrijven"' },
                { key: 'bijsluiter', icon: '💊', title: 'Bijsluiter uitleggen', desc: '"Wat betekent deze medische tekst?"' },
                { key: 'gedicht', icon: '🎈', title: 'Gedicht maken', desc: '"Schrijf een verjaardagsgedicht"' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSelectDemo(item.key as ConversationKey)}
                  className="text-left p-5 bg-paper border-2 border-neutral-stone rounded-xl hover:border-primary hover:bg-primary/5 transition-all min-h-[72px]"
                >
                  <span className="text-2xl mr-3 align-middle">{item.icon}</span>
                  <span className="text-senior-base font-bold text-primary align-middle">{item.title}</span>
                  <p className="text-senior-sm text-gray-500 mt-2 ml-11">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <div className="bg-primary text-white p-5 rounded-2xl rounded-tr-sm max-w-[90%]">
                <p className="text-senior-base">{demoConversations[selectedDemo].prompt}</p>
              </div>
            </div>

            {isTyping ? (
              <div className="flex justify-start">
                <div className="bg-paper border-2 border-neutral-stone p-5 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden />
                      <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden />
                      <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden />
                    </div>
                    <span className="text-senior-sm">AI is aan het typen...</span>
                  </div>
                </div>
              </div>
            ) : showResponse && (
              <div className="flex justify-start">
                <div className="bg-paper border-2 border-neutral-stone p-5 rounded-2xl rounded-tl-sm shadow-sm max-w-[90%]">
                  <div className="whitespace-pre-wrap text-senior-base text-gray-700 leading-relaxed [&_strong]:font-bold [&_strong]:text-gray-800">
                    {demoConversations[selectedDemo].response}
                  </div>
                </div>
              </div>
            )}

            {showResponse && (
              <div className="pt-6 border-t-2 border-neutral-stone mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-4 bg-paper border-2 border-primary text-primary rounded-xl font-bold text-senior-base hover:bg-primary/10 transition-colors"
                >
                  ← Probeer een ander voorbeeld
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-paper border-2 border-t-0 border-neutral-stone p-5 rounded-b-2xl">
        <div className="flex items-center gap-2 text-gray-400">
          <input
            type="text"
            placeholder="Dit is een demo — kies hierboven een voorbeeld"
            disabled
            className="flex-1 p-4 bg-neutral-cream rounded-xl text-senior-base cursor-not-allowed border-2 border-transparent"
            aria-label="Demo-invoerveld (uitgeschakeld)"
          />
          <button type="button" disabled className="p-4 bg-neutral-stone rounded-xl cursor-not-allowed text-senior-base" aria-hidden>➤</button>
        </div>
        <p className="text-senior-sm text-center text-gray-500 mt-4">
          💡 Bij de echte ChatGPT of Claude kunt u zelf typen wat u wilt!
        </p>
      </div>
    </div>
  );
}
