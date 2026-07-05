import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://seniorease.nl/uitleg/youtube-tv" },
    { "@type": "ListItem", "position": 3, "name": "YouTube kijken", "item": "https://seniorease.nl/uitleg/youtube-tv" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "YouTube kijken op tablet, smartphone, computer of televisie",
  "description": "Stap voor stap YouTube openen en video's kijken op uw apparaat.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "YouTube openen", "text": "Tik op het rode YouTube-icoontje op uw telefoon of tablet. Of ga naar youtube.com in uw internetbrowser op de computer." },
    { "@type": "HowToStep", "position": 2, "name": "Zoeken naar een video", "text": "Tik op het vergrootglas bovenaan en typ wat u wilt zien, bijvoorbeeld 'tuinieren tips' of 'klassieke muziek'." },
    { "@type": "HowToStep", "position": 3, "name": "Video starten", "text": "Tik op een video in de lijst. De video begint vanzelf te spelen." },
    { "@type": "HowToStep", "position": 4, "name": "YouTube op de computer", "text": "Open Chrome, Edge of Firefox. Typ youtube.com in de adresbalk. Klik bovenaan in de zoekbalk, typ uw zoekterm en druk op Enter. Klik op een video om te starten." },
    { "@type": "HowToStep", "position": 5, "name": "Op televisie kijken", "text": "Kijk of uw televisie een Smart TV is. Zoek via de app-winkel van uw tv naar YouTube en installeer de app." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is YouTube gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, YouTube is gratis. U kunt bijna alle video's gratis bekijken. Er worden wel korte advertenties getoond. Met een betaald YouTube Premium abonnement kunt u advertenties overslaan."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe maak ik de tekst groter bij YouTube?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YouTube past zich aan aan de tekstgrootte van uw telefoon. Ga naar Instellingen van uw telefoon, zoek naar 'Lettergrootte' en maak die groter. YouTube gebruikt dan automatisch grotere tekst."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik YouTube ook zonder internet gebruiken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, voor YouTube heeft u internet nodig. Zorg dat u verbonden bent met wifi, anders gebruikt u veel mobiele data."
      }
    },
  ],
};

export const metadata = {
  title: "YouTube kijken op tablet, telefoon, computer of televisie – uitleg voor senioren",
  description: "Hoe gebruikt u YouTube? Stap-voor-stap uitleg voor senioren. Video's zoeken op telefoon, tablet, computer of tv — met handige tips.",
};

export default function YoutubeTvPage() {
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
              YouTube kijken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Gratis video&apos;s kijken op uw tablet, smartphone, computer of televisie — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is YouTube */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is YouTube?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              YouTube is een gratis website en app waar miljoenen video&apos;s op staan.
              U kunt er kookvideo&apos;s, reisfilmpjes, muziek, nieuws, doe-het-zelf uitleg en nog veel meer op vinden.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Alles is gratis te bekijken. Er worden soms korte reclames getoond — die kunt u na een paar seconden overslaan.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🎥", label: "Miljoenen gratis video's" },
                { icon: "🔍", label: "Zoek alles wat u wilt" },
                { icon: "💻", label: "Ook op de computer" },
                { icon: "📺", label: "Ook op televisie" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* YouTube op telefoon of tablet */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              YouTube op uw telefoon of tablet
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "YouTube openen",
                  uitleg: "Tik op het rode icoontje met het witte driehoekje — dat is YouTube. Staat het er nog niet op? Zoek in de App Store (iPhone) of Play Store (Android) op 'YouTube' en installeer de app gratis.",
                },
                {
                  stap: "Een video zoeken",
                  uitleg: "Tik bovenaan op het vergrootglas. Typ wat u wilt zien — bijvoorbeeld 'breien voor beginners', 'André Rieu concert' of 'tuinieren september'. U ziet meteen een lijst met video's.",
                  tip: "Tik op het microfoonknopje naast de zoekbalk om in te spreken in plaats van te typen.",
                },
                {
                  stap: "Een video starten",
                  uitleg: "Tik op een video in de lijst. De video begint vanzelf te spelen. Tik op het scherm om de afspeelknop te zien.",
                },
                {
                  stap: "Groter kijken",
                  uitleg: "Draai uw telefoon of tablet op zijn kant. Het beeld wordt automatisch groter en past het hele scherm.",
                },
                {
                  stap: "Pauzeren of stoppen",
                  uitleg: "Tik eenmaal op het scherm. Tik op ❚❚ om te pauzeren. Tik op de pijl linksboven om terug te gaan naar de zoekresultaten.",
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

          {/* YouTube op computer */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              YouTube op uw computer
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Heeft u een laptop of desktop? Dan kunt u YouTube ook gewoon in uw internetbrowser bekijken — geen app installeren nodig.
            </p>
            <ol className="space-y-6">
              {[
                {
                  stap: "YouTube openen in uw browser",
                  uitleg: "Open uw internetbrowser — dat is het programma waarmee u websites bezoekt, bijvoorbeeld Chrome, Edge of Firefox. Typ bovenaan in de adresbalk: youtube.com en druk op Enter.",
                },
                {
                  stap: "Een video zoeken",
                  uitleg: "Klik bovenaan in de zoekbalk. Typ wat u wilt zien — bijvoorbeeld 'breien voor beginners' of 'André Rieu concert'. Druk op Enter op uw toetsenbord.",
                },
                {
                  stap: "Een video starten",
                  uitleg: "Klik op een video in de lijst. De video begint vanzelf te spelen. Klik op het scherm of op ❚❚ om te pauzeren.",
                },
                {
                  stap: "Groter kijken",
                  uitleg: "Klik rechtsonder op het vierkante icoon (volledig scherm). Uw video vult dan het hele scherm. Druk op Escape op uw toetsenbord — of klik opnieuw op het icoon — om terug te gaan.",
                },
                {
                  stap: "Geluid harder of zachter",
                  uitleg: "Onder de video ziet u een luidspreker-icoontje. Klik daarop en sleep de balk naar links (zachter) of rechts (harder).",
                  tip: "Werkt het geluid niet? Controleer of het volume van uw computer aan staat — vaak zit er een knopje op uw toetsenbord of aan de zijkant van uw laptop.",
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

          {/* YouTube op televisie */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              YouTube op uw televisie kijken
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Heeft u een Smart TV? Dan kunt u YouTube rechtstreeks op uw televisie kijken — op een groot scherm, met uw afstandsbediening.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">1</div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Controleer of uw tv een Smart TV is</p>
                  <p className="text-senior-base text-gray-700">Druk op de Home-knop van uw afstandsbediening. Als er een beginscherm met apps verschijnt, heeft u een Smart TV.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">2</div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Zoek YouTube op het beginscherm</p>
                  <p className="text-senior-base text-gray-700">Vaak staat YouTube er al op. Zo niet, ga dan naar de &quot;App Store&quot; of &quot;Apps&quot; van uw televisie en installeer YouTube.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">3</div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Zoeken met de afstandsbediening</p>
                  <p className="text-senior-base text-gray-700">Open YouTube op uw tv en gebruik het schermtoetsenbord om te zoeken. Op sommige afstandsbedieningen kunt u ook inspreken via een microfoonknop.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base font-bold text-gray-800">💡 Geen Smart TV?</p>
              <p className="text-senior-base text-gray-700 mt-1">U kunt uw telefoon ook via een kabeltje (HDMI-adapter) of draadloos (Chromecast) verbinden met uw televisie. Vraag dit eventueel aan een familielid.</p>
            </div>
          </section>

          {/* Ideeën */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
              Wat kunt u zoeken op YouTube?
            </h2>
            <p className="text-senior-base text-gray-700 mb-4">Hier zijn wat ideeën om mee te beginnen:</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Klassieke muziek of uw favoriete artiest",
                "Kookvideo's en recepten",
                "Tuinieren en natuur",
                "Reisfilmpjes van plekken die u wilt bezoeken",
                "Doe-het-zelf en klusjes in huis",
                "Yoga of beweegvideo's voor senioren",
                "Documentaires over geschiedenis of natuur",
                "Breien, haken of andere hobby's",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is YouTube gratis?</p>
                <p className="text-senior-base text-gray-700">Ja, YouTube is gratis. Er worden wel korte advertenties getoond die u na een paar seconden kunt overslaan.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik YouTube ook zonder internet gebruiken?</p>
                <p className="text-senior-base text-gray-700">Nee, voor YouTube heeft u internet nodig. Gebruik bij voorkeur wifi zodat u geen mobiele data verbruikt.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoe sla ik een video op voor later?</p>
                <p className="text-senior-base text-gray-700">Klik of tik onder de video op &quot;Opslaan&quot; (of het bladwijzer-icoontje). De video wordt opgeslagen in uw &quot;Bekijk later&quot;-lijst. Hiervoor heeft u wel een gratis Google-account nodig.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/netflix" className="text-senior-base font-bold text-primary hover:underline">Netflix gebruiken →</Link></li>
              <li><Link href="/uitleg/npo-start" className="text-senior-base font-bold text-primary hover:underline">NPO Start gebruiken →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
