import Link from 'next/link';
import { YOUTUBE_VIDEOS, YOUTUBE_PLAYLISTS, youtubePlaylistUrl } from '@/lib/youtube-videos';

export const metadata = {
  title: "Videobellen via WhatsApp – stap voor stap uitleg voor senioren",
  description: "Uw kleinkind zien terwijl u belt! Gratis videobellen via WhatsApp. Stap-voor-stap uitleg voor senioren, ook voor beginners.",
};

export default function VideoBellenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Videobellen met familie
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uw kleinkind zien terwijl u belt — het is makkelijker dan u denkt!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Foto&apos;s ordenen</Link>
              <span className="text-senior-sm font-bold text-primary underline">Videobellen</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Video */}
          <section className="my-8 mx-4 sm:mx-0">
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEOS.videobellen}`}
                title="Videobellen via WhatsApp – stap voor stap uitleg voor senioren"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-senior-base">
              Bekijk de uitlegvideo (±9 minuten) of lees verder voor de stappen op deze pagina
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
              Wat is videobellen?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Bij een gewoon telefoongesprek hoort u de ander alleen. Bij videobellen <strong>ziet</strong> u de ander ook — op uw scherm. U kunt elkaars gezicht zien, lachen, en de kleinkinderen groeien zien. Heel fijn als familie ver weg woont!
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              U heeft geen extra apparaat nodig. Uw gewone smartphone of tablet is genoeg.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📱", label: "Alleen uw telefoon nodig" },
                { icon: "🌐", label: "Gratis via wifi of data" },
                { icon: "👴👵", label: "Makkelijk te leren" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Welke app */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Welke app gebruikt u?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Er zijn drie veelgebruikte apps voor videobellen. De makkelijkste is WhatsApp — die heeft u waarschijnlijk al.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: "💬",
                  naam: "WhatsApp (aanbevolen)",
                  beschrijving: "Heeft u WhatsApp al? Dan kunt u meteen videobellen. Gratis, werkt op Android én iPhone, en bijna iedereen heeft het.",
                  kleur: "bg-green-50 border-green-300",
                  badge: "Makkelijkste keuze",
                  badgekleur: "bg-green-600",
                },
                {
                  icon: "🍎",
                  naam: "FaceTime (alleen iPhone)",
                  beschrijving: "Heeft u een iPhone? Dan staat FaceTime er al op. Heel helder beeld. Werkt alleen als de andere persoon ook een iPhone of iPad heeft.",
                  kleur: "bg-blue-50 border-blue-300",
                  badge: "Alleen iPhone",
                  badgekleur: "bg-blue-600",
                },
                {
                  icon: "🎥",
                  naam: "Zoom",
                  beschrijving: "Handig voor grotere groepen, zoals een familiebijeenkomst online. Iets meer stappen om in te stellen, maar werkt op elk apparaat.",
                  kleur: "bg-purple-50 border-purple-300",
                  badge: "Groepsgesprekken",
                  badgekleur: "bg-purple-600",
                },
              ].map((app, i) => (
                <div key={i} className={`rounded-xl border-2 ${app.kleur} p-6 flex gap-4 items-start`}>
                  <span className="text-4xl flex-shrink-0">{app.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-senior-lg font-bold text-gray-800">{app.naam}</h3>
                      <span className={`text-xs font-bold text-white ${app.badgekleur} px-2 py-0.5 rounded-full`}>{app.badge}</span>
                    </div>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{app.beschrijving}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WhatsApp videogesprek stap voor stap */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-3">
              💬 Videobellen via WhatsApp — stap voor stap
            </h2>
            <p className="text-senior-base text-gray-500 mb-8">De makkelijkste manier, werkt op elke telefoon</p>

            <ol className="space-y-6">
              {[
                {
                  stap: "Open WhatsApp",
                  uitleg: "Tik op het groene WhatsApp-icoontje op uw telefoon.",
                  tip: "",
                },
                {
                  stap: "Zoek het contact",
                  uitleg: "Tik op 'Chats' onderaan en zoek de persoon die u wilt bellen. Of tik op het belletje-icoontje voor uw belgeschiedenis.",
                  tip: "",
                },
                {
                  stap: "Open het gesprek",
                  uitleg: "Tik op de naam van de persoon om het gesprek te openen.",
                  tip: "",
                },
                {
                  stap: "Tik op het camera-icoontje",
                  uitleg: "Rechtsboven in het gesprek ziet u een icoontje van een camera 📹. Tik daarop.",
                  tip: "Ziet u alleen een belletje? Dan tikt u op het belletje en kiest u daarna voor 'Videogesprek'.",
                },
                {
                  stap: "Wacht tot de ander opneemt",
                  uitleg: "U hoort een beltoon. Als de ander opneemt, ziet u direct hun gezicht op uw scherm — en zij het uwe!",
                  tip: "",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
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

            <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-1">✅ Ophangen</p>
              <p className="text-senior-base text-gray-700">Tik op de rode knop met een telefoonhoorn om het gesprek te beëindigen. Die knop staat tijdens het gesprek onderaan uw scherm.</p>
            </div>
          </section>

          {/* Tips voor goed gesprek */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Tips voor een goed videogesprek
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "☀️",
                  titel: "Zorg voor goed licht",
                  uitleg: "Ga bij een raam zitten met het licht op uw gezicht — niet achter u. Anders ziet de ander alleen een donkere vlek.",
                },
                {
                  icon: "👁️",
                  titel: "Kijk naar de camera, niet naar het scherm",
                  uitleg: "Het kleine gaatje bovenaan uw telefoon is de camera. Als u daarnaar kijkt, lijkt het voor de ander alsof u hen aankijkt.",
                },
                {
                  icon: "📐",
                  titel: "Houd de telefoon op hoogte",
                  uitleg: "Zet uw telefoon neer of houd hem op borsthoogte. Van onderaf filmen is minder flatteus voor iedereen.",
                },
                {
                  icon: "🔇",
                  titel: "Zit ergens stil",
                  uitleg: "Achtergrondgeluid (tv, muziek) maakt het moeilijk om elkaar te verstaan. Een rustige kamer werkt het beste.",
                },
                {
                  icon: "🔋",
                  titel: "Laad uw telefoon op",
                  uitleg: "Een videogesprek gebruikt meer batterij dan bellen. Sluit uw telefoon aan als u lang wilt praten.",
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
          </section>

          {/* Veelgestelde vragen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Veel gestelde vragen
            </h2>
            <div className="space-y-5">
              {[
                {
                  vraag: "Kost videobellen geld?",
                  antwoord: "Via WhatsApp, FaceTime en Zoom is videobellen gratis — zolang u wifi heeft. Gebruikt u mobiele data (het netwerk van uw provider), dan telt het mee voor uw databundel. Het verbruikt meer data dan een gewoon gesprek.",
                },
                {
                  vraag: "Kan de ander mij zien als ik hen bel?",
                  antwoord: "Ja, zodra het videogesprek verbonden is, ziet de ander uw gezicht via uw voorkant-camera. U ziet hun gezicht ook. Wilt u even niet in beeld? Tik op het camera-icoontje om uw camera uit te zetten.",
                },
                {
                  vraag: "Wat als het beeld hapert of bevriest?",
                  antwoord: "Dat komt door een zwakke internetverbinding. Ga dichter bij uw wifi-router staan, of vraag de ander hetzelfde te doen. U kunt ook het gesprek beëindigen en opnieuw bellen.",
                },
                {
                  vraag: "Kan ik met meerdere mensen tegelijk bellen?",
                  antwoord: "Ja! In WhatsApp kunt u met meerdere mensen tegelijk videobellen via een groepsgesprek. Open een groepschat en tik op het camera-icoontje. Of gebruik Zoom voor grotere groepen.",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-neutral-stone rounded-xl overflow-hidden">
                  <div className="bg-primary/10 px-6 py-4 border-b border-neutral-stone">
                    <p className="text-senior-base font-bold text-primary">❓ {item.vraag}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.antwoord}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "WhatsApp videobellen: open gesprek → camera-icoontje rechtsboven → wacht af",
                "Zit in goed licht — raam vóór u, niet achter u",
                "Kijk naar het kleine gaatje bovenaan (de camera), niet naar het scherm",
                "Rode knop = ophangen",
                "Gratis via wifi — zorg dat uw telefoon opgeladen is",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/fotos-ordenen" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                ← Foto&apos;s ordenen
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-colors shadow-lg">
                ← Terug naar home
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
