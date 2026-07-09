import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { YOUTUBE_VIDEOS, YOUTUBE_PLAYLISTS, youtubePlaylistUrl } from '@/lib/youtube-videos';
import { MapsAppGuide } from './MapsAppGuide';

export const metadata = buildPageMetadata({
  path: '/uitleg/google-maps',
  title: "Google Maps uitleg voor senioren – route en adres zoeken",
  description: "Hoe gebruikt u Google Maps op uw telefoon? Adres zoeken, route berekenen en uw locatie bekijken. Stap-voor-stap uitleg voor senioren.",
});

export default function GoogleMapsPage() {
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
              Google Maps gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Nooit meer verdwalen — uw telefoon weet precies hoe u er komt!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Smartphone navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">📱 Smartphone:</span>
              <Link href="/uitleg/whatsapp-basis" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">WhatsApp basis</Link>
              <Link href="/uitleg/videobellen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Videobellen</Link>
              <Link href="/uitleg/fotos-maken" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Foto&apos;s maken</Link>
              <span className="text-senior-sm font-bold text-primary underline">Google Maps</span>
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
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEOS.googleMaps}`}
                title="Google Maps uitleg voor senioren – route en adres zoeken"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-senior-base">
              Bekijk de uitlegvideo (±7 minuten) of lees verder voor de stappen op deze pagina
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
              Wat is Google Maps?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Google Maps is een gratis app op uw telefoon waarmee u overal een route kunt berekenen. U typt een adres in en de app vertelt u stap voor stap hoe u er komt — lopend, met de auto of met het openbaar vervoer.
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Het werkt als een navigatiesysteem in uw auto, maar dan op uw telefoon. En het is altijd bijgewerkt met de nieuwste wegen en adressen.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🗺️", label: "Adres zoeken en vinden" },
                { icon: "🚗", label: "Route berekenen" },
                { icon: "📍", label: "Zien waar u bent" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <MapsAppGuide />

          {/* App openen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              De app openen
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Google Maps staat op bijna elke telefoon al voorgeïnstalleerd. Zoek op uw telefoon naar het icoontje met een gekleurde kaartspeld.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                <p className="text-senior-base font-bold text-gray-800 mb-2">🤖 Android-telefoon</p>
                <p className="text-senior-base text-gray-700 leading-relaxed">Het Google Maps-icoontje staat op uw beginscherm of in de lijst met apps. Het ziet eruit als een rode kaartspeld op een gekleurde kaart.</p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                <p className="text-senior-base font-bold text-gray-800 mb-2">🍎 iPhone</p>
                <p className="text-senior-base text-gray-700 leading-relaxed">Zoek op uw beginscherm naar &apos;Maps&apos; (Apple&apos;s eigen kaarten-app) of download Google Maps gratis via de App Store. Beide apps werken goed.</p>
              </div>
            </div>
            <div className="mt-5 bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">💡 App niet gevonden?</p>
              <p className="text-senior-base text-gray-700">Zoek in de App Store (iPhone) of Play Store (Android) naar &apos;Google Maps&apos; en tik op Installeren. Het is gratis.</p>
            </div>
          </section>

          {/* Een adres zoeken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-3">
              📍 Een adres zoeken — stap voor stap
            </h2>
            <p className="text-senior-base text-gray-500 mb-8">Zo vindt u elk adres in Nederland</p>

            <ol className="space-y-6">
              {[
                {
                  stap: "Open Google Maps",
                  uitleg: "Tik op het Maps-icoontje op uw telefoon. U ziet een kaart van uw omgeving.",
                  tip: "",
                },
                {
                  stap: "Tik op de zoekbalk bovenaan",
                  uitleg: "Bovenaan het scherm staat een balk met 'Zoeken in Maps'. Tik daarop. Uw toetsenbord verschijnt.",
                  tip: "",
                },
                {
                  stap: "Typ het adres",
                  uitleg: "Typ de straatnaam, het huisnummer en de plaatsnaam. Bijvoorbeeld: 'Kerkstraat 12 Utrecht'. U hoeft niet alles te typen — de app geeft suggesties zodra u begint.",
                  tip: "Tik op een suggestie zodra u de goede ziet. Dat is sneller dan alles uittypen.",
                },
                {
                  stap: "Tik op het adres in de lijst",
                  uitleg: "Onder de zoekbalk verschijnen adressen die overeenkomen met wat u typt. Tik op het juiste adres.",
                  tip: "",
                },
                {
                  stap: "Bekijk de locatie op de kaart",
                  uitleg: "De kaart springt naar het adres. U ziet een rode kaartspeld op de plek. Onderaan het scherm staat de naam en het adres.",
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
          </section>

          {/* Route berekenen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-3">
              🚗 Een route berekenen
            </h2>
            <p className="text-senior-base text-gray-500 mb-8">Nadat u een adres gevonden heeft</p>

            <ol className="space-y-6 mb-8">
              {[
                {
                  stap: "Tik op 'Route'",
                  uitleg: "Onderaan het scherm ziet u een blauwe knop met 'Route'. Tik daarop.",
                  tip: "",
                },
                {
                  stap: "Kies hoe u reist",
                  uitleg: "Bovenaan ziet u icoontjes: een auto 🚗, een bus 🚌, een persoon 🚶, een fiets 🚲. Tik op het icoontje dat bij u past.",
                  tip: "",
                },
                {
                  stap: "Controleer de route",
                  uitleg: "De app toont u de route op de kaart en hoelang het duurt. Bij meerdere opties (bijv. snelweg of binnenwegen) kunt u kiezen.",
                  tip: "",
                },
                {
                  stap: "Tik op 'Starten'",
                  uitleg: "De navigatie begint. Een stem vertelt u wanneer u moet afslaan. U hoeft alleen maar te rijden of te lopen — de app houdt bij waar u bent.",
                  tip: "Zet het geluid van uw telefoon aan, zodat u de aanwijzingen hoort.",
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

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🚗", label: "Auto", kleur: "bg-blue-50 border-blue-200" },
                { icon: "🚌", label: "Bus / trein", kleur: "bg-orange-50 border-orange-200" },
                { icon: "🚶", label: "Lopen", kleur: "bg-green-50 border-green-200" },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border-2 ${item.kleur} p-4 text-center`}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Waar ben ik */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              📌 Waar ben ik?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Bent u ergens en weet u niet precies waar? Google Maps kan u dat direct vertellen.
            </p>
            <ol className="space-y-4">
              {[
                "Open Google Maps",
                "Tik op het blauwe cirkeltje-icoontje rechtsonder op het scherm (het &apos;mijn locatie&apos;-icoontje)",
                "De kaart centreert op waar u nu bent. U ziet een blauwe stip — dat bent u!",
                "Tik op de blauwe stip voor meer informatie, zoals de straatnaam",
              ].map((stap, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <p className="text-senior-base text-gray-700 leading-relaxed pt-1" dangerouslySetInnerHTML={{ __html: stap }} />
                </li>
              ))}
            </ol>
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-blue-800 mb-1">ℹ️ Locatie moet aanstaan</p>
              <p className="text-senior-base text-gray-700">Voor &apos;Waar ben ik?&apos; moet uw locatie aanstaan. De app vraagt daar toestemming voor. Tik op &apos;Toestaan&apos; als dat nog niet is gebeurd.</p>
            </div>
          </section>

          {/* Favorieten opslaan */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              ⭐ Thuis en favorieten opslaan
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              U kunt uw thuisadres en adressen van familie opslaan. Zo hoeft u niet elke keer hetzelfde adres in te typen.
            </p>
            <ol className="space-y-5">
              {[
                {
                  stap: "Zoek het adres op",
                  uitleg: "Typ het adres in de zoekbalk, zoals uitgelegd hierboven.",
                },
                {
                  stap: "Tik op 'Opslaan'",
                  uitleg: "Onderaan het scherm ziet u bij het gevonden adres een knop 'Opslaan' (soms een ster-icoontje ⭐). Tik daarop.",
                },
                {
                  stap: "Kies een label",
                  uitleg: "U kunt kiezen: 'Thuis', 'Werk' of een eigen naam zoals 'Dochter Maria'. Tik op de juiste optie.",
                },
                {
                  stap: "Klaar!",
                  uitleg: "Volgende keer typt u alleen 'Thuis' en de app weet meteen het adres.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Veelgestelde vragen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Veel gestelde vragen
            </h2>
            <div className="space-y-5">
              {[
                {
                  vraag: "Kost Google Maps geld?",
                  antwoord: "Nee, Google Maps is helemaal gratis. U heeft wel een internetverbinding nodig — via wifi of mobiele data. Het dataverbruik valt mee, maar als u veel navigeert, is wifi thuis altijd het zuinigst.",
                },
                {
                  vraag: "Werkt het ook zonder internet?",
                  antwoord: "Deels. U kunt een kaartgebied downloaden zodat u het ook zonder internet kunt gebruiken. Maar voor live verkeersinformatie en actuele routes heeft u wel internet nodig.",
                },
                {
                  vraag: "De stem zegt iets en ik mis de afslag — wat nu?",
                  antwoord: "Geen zorgen! De app herberekent automatisch de route als u de verkeerde weg gaat. U hoeft alleen verder te rijden of te lopen — de app past zich aan.",
                },
                {
                  vraag: "Kan ik ook openbaar vervoer opzoeken?",
                  antwoord: "Ja! Kies na 'Route' het bus-icoontje 🚌. De app laat zien welke bus of trein u moet nemen, hoe laat hij vertrekt en waar u moet overstappen.",
                },
                {
                  vraag: "Mijn locatie klopt niet — wat doe ik?",
                  antwoord: "Ga even naar buiten of bij een raam staan. Binnenshuis kan de locatie een beetje afwijken. Wacht even en tik opnieuw op het locatie-icoontje.",
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
                "Adres zoeken: tik op de zoekbalk → typ het adres → tik op de suggestie",
                "Route: zoek adres op → tik op 'Route' → kies auto/bus/lopen → tik op 'Starten'",
                "Kijk waar u bent: tik op het blauwe cirkeltje rechtsonder",
                "Sla thuis op zodat u het niet elke keer hoeft in te typen",
                "Verkeerd gereden? De app herberekent automatisch",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/videobellen" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                ← Videobellen
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
