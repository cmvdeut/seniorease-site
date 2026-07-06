import Link from 'next/link';
import { YOUTUBE_VIDEOS, YOUTUBE_PLAYLISTS, youtubePlaylistUrl } from '@/lib/youtube-videos';

export const metadata = {
  title: "Betere foto's maken met uw telefoon – 5 tips voor senioren",
  description: "Mooiere foto's maken met uw smartphone? Met 5 eenvoudige tips lukt het meteen. Ook: selfies maken. Uitleg speciaal voor senioren.",
};

const tips = [
  {
    num: 1,
    icon: "☀️",
    titel: "Licht op uw onderwerp",
    kort: "Licht op wat u fotografeert",
    uitleg: "De belangrijkste fototip ooit: zorg dat het licht op uw onderwerp schijnt, niet op de lens van uw telefoon. Staat u binnen? Ga dan bij een raam staan. Buiten? Zorg dat de zon achter u is.",
    doehet: "Sta bij een raam en fotografeer iemand die voor u staat. Verschil is enorm!",
    fout: "Foto tegen het raam in nemen — dan ziet u alleen een silhouet.",
    kleur: "bg-amber-50 border-amber-200",
    titelkleur: "text-amber-800",
  },
  {
    num: 2,
    icon: "🤳",
    titel: "Houd uw telefoon stil",
    kort: "Stabiliteit = scherpe foto",
    uitleg: "Onscherpe foto's komen bijna altijd door bewegen op het moment van de foto. Houd uw telefoon vast met twee handen, houd uw ellebogen dicht bij uw lichaam, of leun met uw rug tegen een muur.",
    doehet: "Adem rustig in, houd even in en druk pas af als u uitademt — net als een scherpschutter!",
    fout: "Met uitgestrekte arm fotograferen terwijl u op de knop drukt.",
    kleur: "bg-blue-50 border-blue-200",
    titelkleur: "text-blue-800",
  },
  {
    num: 3,
    icon: "👆",
    titel: "Tik op het scherm om scherp te stellen",
    kort: "Tik op wat u scherp wilt",
    uitleg: "Uw telefoon probeert zelf te raden wat u fotografeert — maar u weet dat beter. Tik gewoon met uw vinger op het scherm, op de plek die scherp moet zijn. U ziet dan een klein vierkantje of cirkel verschijnen.",
    doehet: "Fotografeer een bloem. Tik op de bloem op uw scherm. Maak de foto. Vergelijk met een foto zonder tikken.",
    fout: "Zomaar drukken zonder te tikken — de telefoon stelt dan mis scherp.",
    kleur: "bg-green-50 border-green-200",
    titelkleur: "text-green-800",
  },
  {
    num: 4,
    icon: "🖼️",
    titel: "Geef ruimte in uw foto",
    kort: "Vul niet het hele beeld",
    uitleg: "Veel mensen zetten hun onderwerp precies in het midden. Dat is prima, maar een kleine truc maakt foto's mooier: zet uw onderwerp iets links of rechts van het midden. Geef ook ruimte aan de bovenkant — snij geen hoofden af!",
    doehet: "Fotografeer een kleinkind. Zet hem/haar iets links van het midden. Kijk het verschil.",
    fout: "Het hoofd afsnijden of de persoon té ver onderaan zetten.",
    kleur: "bg-purple-50 border-purple-200",
    titelkleur: "text-purple-800",
  },
  {
    num: 5,
    icon: "📸",
    titel: "Maak meerdere foto's",
    kort: "Maak er 3, kies de beste",
    uitleg: "Professionele fotografen maken honderden foto's om er tien te gebruiken. U hoeft niet zo ver te gaan — maar maak gerust 3 tot 5 foto's van hetzelfde. Daarna kiest u de mooiste. Het kost u niets extra.",
    doehet: "Maak 5 foto's van hetzelfde. Verwijder daarna de 4 minst mooie. U houdt altijd een goede over.",
    fout: "Eén foto maken en dan hopen dat het goed is.",
    kleur: "bg-rose-50 border-rose-200",
    titelkleur: "text-rose-800",
  },
];

const situaties = [
  {
    icon: "👶",
    titel: "Kleinkinderen fotograferen",
    tips: [
      "Ga op hun niveau zitten — niet van bovenaf, maar oog-in-oog",
      "Zeg hun naam vlak voor u de foto maakt — dan kijken ze even",
      "Tik op hun gezichtje op uw scherm zodat het scherp is",
      "Maak ook foto's terwijl ze spelen, niet alleen als ze poseren",
    ],
  },
  {
    icon: "🌸",
    titel: "Tuin en natuur",
    tips: [
      "Fotografeer bloemen 's ochtends of 's avonds — dan is het licht zachter",
      "Ga dichtbij voor een mooie close-up van een bloem",
      "Houd de horizon recht (gebruik de rasterlijnen op uw scherm)",
      "Kies een eenvoudige achtergrond zodat de bloem opvalt",
    ],
  },
  {
    icon: "🗺️",
    titel: "Uitstapjes en vakanties",
    tips: [
      "Fotograeer mensen voor bezienswaardigheden, niet erna (licht is beter)",
      "Leg ook kleine details vast: een mooi broodje, een grappig bord",
      "Maak een foto van de omgeving om de sfeer te bewaren",
      "Noteer waar u was — later weet u het anders niet meer",
    ],
  },
];

export default function FotosMakenPage() {
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
              Betere foto&apos;s maken met uw smartphone
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              5 simpele tips — geen technische kennis nodig. Gewoon proberen!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Smartphone uitleg navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">📱 Smartphone:</span>
              <Link href="/uitleg/whatsapp-basis" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">WhatsApp</Link>
              <span className="text-senior-sm font-bold text-primary underline">Foto&apos;s maken</span>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Foto&apos;s ordenen</Link>
              <Link href="/uitleg/fotos-naar-computer" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Naar computer</Link>
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
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEOS.fotosMaken}`}
                title="Betere foto's maken met uw telefoon – 5 tips voor senioren"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-senior-base">
              Bekijk de uitlegvideo (±10 minuten) of lees verder voor de tips op deze pagina
            </p>
            <div className="max-w-3xl mx-auto mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-neutral-stone/40 bg-white">
              <div className="text-4xl" aria-hidden="true">▶️</div>
              <div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-1">Meer instructievideo&apos;s</h3>
                <p className="text-senior-base text-gray-600 mb-4">
                  Rustige uitleg op YouTube — in uw eigen tempo.
                </p>
                <a
                  href={youtubePlaylistUrl(YOUTUBE_PLAYLISTS.tips)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm text-primary border-primary bg-neutral-cream"
                >
                  Bekijk de Tips &amp; Tricks-playlist
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Iedereen kan mooie foto&apos;s maken
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              95% van de senioren deelt foto&apos;s via de telefoon — maar veel mensen zijn niet tevreden over de kwaliteit. De foto&apos;s zijn wazig, te donker of het hoofd is afgesneden.
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Goed nieuws: met 5 eenvoudige tips maakt u meteen betere foto&apos;s. Geen dure camera nodig, geen cursus — gewoon uw telefoon en een paar handige gewoontes.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📱", label: "Alleen uw telefoon nodig" },
                { icon: "⏱️", label: "Tips in 2 minuten geleerd" },
                { icon: "🎯", label: "Direct resultaat" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5 Tips */}
          <section>
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">
              De 5 gouden tips
            </h2>
            <div className="space-y-6">
              {tips.map((tip) => (
                <div key={tip.num} className={`bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden`}>
                  <div className={`${tip.kleur} border-b-2 border-inherit px-8 py-5 flex items-center gap-4`}>
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-md border-2 border-white">
                      {tip.icon}
                    </div>
                    <div>
                      <span className="text-senior-xs font-bold text-gray-500 uppercase tracking-wide">Tip {tip.num}</span>
                      <h3 className={`text-senior-lg md:text-senior-xl font-bold ${tip.titelkleur}`}>{tip.titel}</h3>
                      <p className="text-senior-sm text-gray-600 italic">{tip.kort}</p>
                    </div>
                  </div>
                  <div className="p-8 space-y-5">
                    <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                      {tip.uitleg}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                        <p className="text-senior-sm font-bold text-green-800 mb-1">✅ Doe dit:</p>
                        <p className="text-senior-base text-gray-700">{tip.doehet}</p>
                      </div>
                      <div className="flex-1 bg-red-50 border-2 border-red-200 rounded-xl p-4">
                        <p className="text-senior-sm font-bold text-red-800 mb-1">❌ Niet dit:</p>
                        <p className="text-senior-base text-gray-700">{tip.fout}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Per situatie */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-8">
              Tips per situatie
            </h2>
            <div className="space-y-8">
              {situaties.map((situatie, i) => (
                <div key={i}>
                  <h3 className="text-senior-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="text-3xl">{situatie.icon}</span>
                    {situatie.titel}
                  </h3>
                  <ul className="space-y-3 ml-12">
                    {situatie.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-primary font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                        <p className="text-senior-base text-gray-700 leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                  {i < situaties.length - 1 && (
                    <div className="mt-8 border-t-2 border-neutral-stone" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Selfies */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              🤳 Een selfie maken — zo doet u dat
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Een selfie is een foto die u van uzelf maakt met uw eigen telefoon. Heel handig om samen op de foto te gaan, of om een berichtje extra persoonlijk te maken. Met deze tips lukt het meteen.
            </p>

            {/* Voorkant camera */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-senior-base font-bold text-amber-800 mb-2">📷 Stap 1: Zet de camera om</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Uw telefoon heeft twee camera&apos;s: één aan de achterkant (voor gewone foto&apos;s) en één aan de voorkant (voor selfies). Tik op het icoontje met twee pijltjes of een omgedraaide camera — dan draait de camera om en ziet u uzelf op het scherm.
              </p>
            </div>

            {/* Tips */}
            <div className="space-y-4 mb-6">
              {[
                {
                  icon: "📐",
                  titel: "Houd de telefoon iets omhoog",
                  uitleg: "Houd de telefoon een klein stukje boven ooghoogte en kijk iets omhoog. Dat is flatteuzer dan van onderaf fotograferen.",
                },
                {
                  icon: "👁️",
                  titel: "Kijk naar de lens, niet naar het scherm",
                  uitleg: "Op het scherm ziet u uzelf — maar de lens zit iets hoger (het kleine ronde gaatje bovenaan). Kijk dáár naar voor oogcontact op de foto.",
                },
                {
                  icon: "☀️",
                  titel: "Ga bij het raam staan",
                  uitleg: "Licht van voren maakt uw gezicht helder en rustig. Staat u met uw rug naar het raam? Dan wordt uw gezicht donker.",
                },
                {
                  icon: "⏱️",
                  titel: "Gebruik de zelfontspanner",
                  uitleg: "Zoek in de camera-app het icoontje met een klokje (timer). Stel 3 seconden in — dan kunt u de telefoon neerzetten of vasthouden zonder te drukken. Geen trillende arm meer!",
                },
                {
                  icon: "🖼️",
                  titel: "Let op de achtergrond",
                  uitleg: "Kijk even wat er achter u te zien is. Een rommelige kamer of volle wasmand valt op. Een neutrale muur of raam ziet er altijd netjes uit.",
                },
              ].map((tip, i) => (
                <div key={i} className="flex gap-4 items-start bg-neutral-cream border-2 border-primary/20 rounded-xl px-5 py-4">
                  <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                  <div>
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{tip.titel}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{tip.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Samen op de foto */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-2">👫 Samen op de foto?</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Houd de telefoon iets verder weg zodat iedereen erin past. Strek uw arm goed uit, of vraag iemand anders om de telefoon vast te houden. Maak gerust 3 foto&apos;s — kies daarna de leukste.
              </p>
            </div>
          </section>

          {/* Snelle oefening */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Oefen het nu meteen — 5 minuten
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Pak uw telefoon en maak deze 5 oefenfoto&apos;s. Daarna kent u de tips uit uw hoofd:
            </p>
            <ol className="space-y-4">
              {[
                "Fotografeer iets op tafel, bij een raam (licht van voren)",
                "Maak dezelfde foto maar houd de telefoon met twee handen vast",
                "Tik op het onderwerp op uw scherm voor u de foto maakt",
                "Zet het onderwerp iets links van het midden",
                "Maak 5 foto's van hetzelfde — kies daarna de beste",
              ].map((stap, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <p className="text-senior-base text-gray-700 leading-relaxed pt-1">{stap}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Samenvatting — altijd onthouden
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {tips.map((tip) => (
                <div key={tip.num} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <p className="text-senior-base font-bold text-gray-800">{tip.kort}</p>
                </div>
              ))}
            </div>
            <p className="text-senior-lg font-bold text-primary mb-2">
              Oefening baart kunst! 📸
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              De eerste paar keer denkt u nog aan de tips. Na een weekje is het gewoon. Uw familie zal verbaasd zijn van de mooie foto&apos;s!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-colors shadow-lg"
            >
              ← Terug naar home
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}
