import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/hoofdtelefoon',
  title: "Draadloze hoofdtelefoon voor senioren – wat is handig en hoe werkt het?",
  description: "Draadloos muziek luisteren of bellen zonder kabels. Uitleg over draadloze hoofdtelefoons en oortjes voor senioren, met tips over wat u moet weten.",
});

export default function HoofdtelefoonPage() {
  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="hoofdtelefoon" />
      {/* Header */}
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Draadloze hoofdtelefoon
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Muziek luisteren zonder kabels — fijn en makkelijker dan u denkt!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Foto&apos;s ordenen</Link>
              <Link href="/uitleg/e-bike" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">E-bike apps</Link>
              <span className="text-senior-sm font-bold text-gold underline">Hoofdtelefoon</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Wat is een draadloze hoofdtelefoon?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Een draadloze hoofdtelefoon werkt via <strong>Bluetooth</strong> — een soort onzichtbare verbinding tussen uw telefoon en de hoofdtelefoon. Er zit geen snoer aan. U kunt gewoon rondlopen terwijl u muziek luistert of belt.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Eenmaal verbonden hoeft u niets meer in te stellen. Zet de hoofdtelefoon op en de muziek klinkt vanzelf.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🎵", label: "Muziek zonder kabels" },
                { icon: "📞", label: "Bellen via de hoofdtelefoon" },
                { icon: "🚶", label: "Vrij bewegen" },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Soorten */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Welke soorten zijn er?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "🎧",
                  naam: "Over-ear hoofdtelefoon (over de oorschelp)",
                  beschrijving: "Grote oorkussens die om uw oren gaan. Comfortabel voor lang gebruik, goed geluid en prettig als u gehoorapparaten draagt.",
                  kleur: "bg-paper border-navy/8",
                  badge: "Meest comfortabel",
                  badgekleur: "bg-blue-600",
                },
                {
                  icon: "🎶",
                  naam: "On-ear hoofdtelefoon (op de oren)",
                  beschrijving: "Iets kleiner dan over-ear. Liggen op de oren in plaats van eromheen. Lichter en makkelijker mee te nemen.",
                  kleur: "bg-green-50 border-green-300",
                  badge: "Licht en handig",
                  badgekleur: "bg-green-600",
                },
                {
                  icon: "🦴",
                  naam: "Botgeleiding hoofdtelefoon",
                  beschrijving: "Een bijzonder type: geen oordopjes in de oren, maar knoppen op uw jukbeenderen. Het geluid wordt via uw botten doorgegeven. Ideaal als u een gehoorapparaat draagt of als u tijdens het fietsen ook uw omgeving wilt horen.",
                  kleur: "bg-amber-50 border-amber-300",
                  badge: "Met gehoorapparaat",
                  badgekleur: "bg-amber-600",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border-2 ${item.kleur} p-6 flex gap-4 items-start`}>
                  <span className="text-4xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-senior-lg font-bold text-navy">{item.naam}</h3>
                      <span className={`text-xs font-bold text-white ${item.badgekleur} px-2 py-0.5 rounded-full`}>{item.badge}</span>
                    </div>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.beschrijving}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verbinden stap voor stap */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-3">
              Bluetooth verbinden — stap voor stap
            </h2>
            <p className="text-senior-base text-navy/55 mb-8">Eenmalig instellen, daarna verbindt het vanzelf</p>

            <ol className="space-y-6">
              {[
                {
                  stap: "Zet de hoofdtelefoon aan",
                  uitleg: "Houd de aan/uit-knop ingedrukt totdat u een lampje ziet knipperen of een geluidje hoort. De hoofdtelefoon staat nu klaar om te verbinden.",
                  tip: "",
                },
                {
                  stap: "Open de Instellingen op uw telefoon",
                  uitleg: "Tik op het tandwiel-icoontje op uw telefoon om naar Instellingen te gaan.",
                  tip: "",
                },
                {
                  stap: "Tik op 'Bluetooth'",
                  uitleg: "Zorg dat Bluetooth aanstaat (het bolletje moet blauw zijn). Uw telefoon zoekt nu naar apparaten in de buurt.",
                  tip: "",
                },
                {
                  stap: "Tik op de naam van uw hoofdtelefoon",
                  uitleg: "U ziet een lijst met apparaten. Tik op de naam van uw hoofdtelefoon. Soms staat er 'Koppelen' of 'Verbinden' — tik daarop.",
                  tip: "Staat uw hoofdtelefoon er niet bij? Houd de knop op de hoofdtelefoon iets langer ingedrukt tot het lampje snel knippert.",
                },
                {
                  stap: "Klaar! Muziek aan",
                  uitleg: "De hoofdtelefoon is nu verbonden. Open uw muziek-app of zet de radio aan — het geluid klinkt via de hoofdtelefoon.",
                  tip: "",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
                    {item.tip && (
                      <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-2">
                        {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-1">✅ Volgende keer gaat het vanzelf</p>
              <p className="text-senior-base text-navy/80">Heeft u de hoofdtelefoon eenmaal verbonden? Dan herkent uw telefoon hem voortaan automatisch. Zet hem aan en binnen enkele seconden bent u verbonden.</p>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Handige tips
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "🔋",
                  titel: "Opladen en accuduur",
                  uitleg: "Hoe lang de accu meegaat verschilt per model. Raadpleeg de handleiding van uw hoofdtelefoon voor de juiste informatie.",
                },
                {
                  icon: "🔊",
                  titel: "Volume via knoppen op de hoofdtelefoon",
                  uitleg: "U hoeft niet steeds naar uw telefoon te grijpen. Op de hoofdtelefoon zitten kleine knoppen om het geluid harder of zachter te zetten.",
                },
                {
                  icon: "📞",
                  titel: "Bellen gaat ook",
                  uitleg: "Als iemand belt terwijl u de hoofdtelefoon op heeft, hoort u dat meteen. Tik op de knop op de hoofdtelefoon om op te nemen — uw handen blijven vrij.",
                },
                {
                  icon: "🎧",
                  titel: "Gehoorapparaat? Kies botgeleiding",
                  uitleg: "Draagt u een gehoorapparaat in of om uw oor? Dan past een gewone hoofdtelefoon misschien niet goed. Een botgeleidingshoofdtelefoon rust op uw jukbeenderen en past altijd — ook met gehoorapparaat.",
                },
                {
                  icon: "📶",
                  titel: "Bereik is circa 10 meter",
                  uitleg: "U kunt zo&apos;n 10 meter van uw telefoon verwijderd zijn. Laat uw telefoon op tafel liggen en beweeg door uw huis — de muziek blijft gewoon spelen.",
                },
              ].map((tip, i) => (
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

          {/* Zoektip */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              🔍 Een hoofdtelefoon kopen?
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Wilt u een draadloze hoofdtelefoon of botgeleiding kopen? Zoek dan zelf even op via Google of ChatGPT — dan vindt u actuele prijzen en beoordelingen.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-paper border border-navy/8 rounded-xl p-5">
                <p className="text-senior-base font-bold text-navy/75 mb-2">🌐 Via Google</p>
                <p className="text-senior-base text-navy/80">Typ in Google bijvoorbeeld: <strong>draadloze hoofdtelefoon senioren</strong> — dan ziet u meteen webshops met prijzen.</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-green-800 mb-2">🤖 Via ChatGPT</p>
                <p className="text-senior-base text-navy/80">Vraag aan ChatGPT: <strong>&ldquo;Welke draadloze hoofdtelefoon is geschikt voor senioren?&rdquo;</strong> — dan krijgt u uitleg én aanbevelingen.</p>
              </div>
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
                  vraag: "Werkt een draadloze hoofdtelefoon ook met mijn tablet?",
                  antwoord: "Ja! Bluetooth werkt op smartphones, tablets én computers. U koppelt hem op dezelfde manier — via Instellingen → Bluetooth.",
                },
                {
                  vraag: "Kan ik de hoofdtelefoon ook gebruiken als ik geen muziek wil?",
                  antwoord: "Gewoon uitzetten. Houd de aan/uit-knop ingedrukt totdat het lampje uit gaat. De verbinding wordt dan verbroken.",
                },
                {
                  vraag: "Wat als het geluid wegvalt of hapert?",
                  antwoord: "Dat gebeurt soms als u te ver van uw telefoon bent of als er muren tussenzitten. Ga dichter bij uw telefoon staan. Helpt dat niet, zet de Bluetooth even uit en weer aan op uw telefoon.",
                },
                {
                  vraag: "Kan ik twee apparaten tegelijk verbinden?",
                  antwoord: "De meeste moderne hoofdtelefoons ondersteunen 'multipoint': verbonden met zowel uw telefoon als uw tablet tegelijk. Staat dit in de beschrijving, dan schakelt het geluid automatisch over.",
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

          {/* Samenvatting */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Draadloze hoofdtelefoon werkt via Bluetooth — geen snoer",
                "Eenmalig verbinden via Instellingen → Bluetooth → naam kiezen",
                "Daarna verbindt het elke keer vanzelf",
                "Draagt u een gehoorapparaat? Kies een botgeleidingshoofdtelefoon",
                "Accuduur verschilt per model — raadpleeg de handleiding",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream border-2 border-navy/8/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/muziek-radio" className="inline-flex items-center gap-2 bg-white border-2 border-navy/8 text-gold px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold/10 transition-colors">
                ← Spotify &amp; DAB
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
