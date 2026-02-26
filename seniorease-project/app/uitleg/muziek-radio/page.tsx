import Link from 'next/link';

export const metadata = {
  title: "Muziek en radio luisteren op uw telefoon — Spotify en DAB+",
  description: "Hoe luistert u naar muziek via Spotify of naar de radio via DAB+? Stap-voor-stap uitleg voor senioren.",
};

export default function MuziekRadioPage() {
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
              Muziek en radio luisteren
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uw favoriete muziek en radio altijd bij de hand — op uw telefoon, tablet of radio.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Foto&apos;s ordenen</Link>
              <Link href="/uitleg/ebooks" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">E-books lezen</Link>
              <span className="text-senior-sm font-bold text-primary underline">Muziek &amp; radio</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Twee manieren om te luisteren
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Vroeger had u een radio of cd-speler. Nu kunt u via uw telefoon of tablet naar miljoenen nummers en honderden radiozenders luisteren. Op twee manieren:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="text-senior-lg font-bold text-green-800 mb-2">Spotify</h3>
                <p className="text-senior-base text-gray-700 leading-relaxed">Muziek streamen via internet. U kiest zelf wat u wilt horen — nummers, artiesten of kant-en-klare afspeellijsten.</p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="text-4xl mb-3">📻</div>
                <h3 className="text-senior-lg font-bold text-blue-800 mb-2">DAB+ digitale radio</h3>
                <p className="text-senior-base text-gray-700 leading-relaxed">Digitale radio via een speciale radio of via een app op uw telefoon. Helder geluid, geen ruis, veel meer zenders dan FM.</p>
              </div>
            </div>
          </section>

          {/* Spotify */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-3">
              🎵 Spotify — muziek op aanvraag
            </h2>
            <p className="text-senior-base text-gray-500 mb-8">Streamen via internet, op telefoon of tablet</p>

            {/* Wat is Spotify / streamen */}
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-senior-base font-bold text-green-800 mb-2">🎵 Wat is Spotify?</p>
                <p className="text-senior-base text-gray-700 leading-relaxed">
                  Spotify is een muziekdienst op internet. Het bedrijf heeft afspraken gemaakt met alle grote platenmaatschappijen, waardoor u via één app naar bijna alle muziek ter wereld kunt luisteren — van André Hazes tot klassieke muziek, van jaren &apos;60 hits tot de nieuwste nummers.
                </p>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                <p className="text-senior-base font-bold text-amber-800 mb-3">📡 Wat betekent &quot;streamen&quot;?</p>
                <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
                  Vroeger kocht u een cd of download en stond de muziek op uw apparaat. Bij <strong>streamen</strong> staat de muziek <em>niet</em> op uw telefoon — u luistert rechtstreeks via internet, zoals water dat door een kraan stroomt. Zodra u de muziek aanzet, speelt het. U heeft wél internet nodig (wifi of mobiele data).
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: "💿", label: "Vroeger", omschrijving: "Cd kopen → op apparaat zetten → luisteren" },
                    { icon: "📥", label: "Download", omschrijving: "Nummer kopen → opslaan → luisteren" },
                    { icon: "📡", label: "Streamen (nu)", omschrijving: "App openen → zoeken → meteen luisteren" },
                  ].map((item, i) => (
                    <div key={i} className={`rounded-xl p-3 text-center border-2 ${i === 2 ? "bg-green-50 border-green-300" : "bg-white border-neutral-stone"}`}>
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <p className={`text-senior-xs font-bold mb-1 ${i === 2 ? "text-green-700" : "text-gray-500"}`}>{item.label}</p>
                      <p className="text-senior-xs text-gray-600 leading-snug">{item.omschrijving}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gratis vs betaald */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-cream border-2 border-neutral-stone rounded-xl p-5">
                <p className="text-senior-base font-bold text-gray-800 mb-2">🆓 Gratis versie</p>
                <ul className="space-y-1 text-senior-base text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Miljoenen nummers luisteren</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Kant-en-klare afspeellijsten</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Af en toe een reclame</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Volgorde niet zelf kiezen</li>
                </ul>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-gray-800 mb-2">💳 Premium (€ 11,99/maand)</p>
                <ul className="space-y-1 text-senior-base text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Geen reclame</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Zelf nummers kiezen</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Ook zonder internet</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Betere geluidskwaliteit</li>
                </ul>
              </div>
            </div>

            {/* Installatie */}
            <h3 className="text-senior-lg font-bold text-gray-800 mb-5">Spotify installeren en gebruiken</h3>
            <ol className="space-y-5 mb-8">
              {[
                { stap: "Download de Spotify-app", detail: "Ga naar de App Store (iPhone) of Play Store (Android) en zoek op 'Spotify'. Tik op Installeren." },
                { stap: "Maak een gratis account aan", detail: "Tik op 'Aanmelden' en gebruik uw e-mailadres. Of log in met uw Google- of Facebook-account." },
                { stap: "Zoek uw favoriete artiest", detail: "Tik op het vergrootglas (🔍) onderaan en typ de naam in. Bijv. 'André Hazes' of 'Ramses Shaffy'." },
                { stap: "Tik op een nummer om het te spelen", detail: "Het nummer speelt meteen. Onderaan uw scherm verschijnt een balk met de muziekbediening." },
                { stap: "Gebruik de bediening", detail: "▶️ = spelen / pauzeren | ⏭️ = volgend nummer | ♥️ = opslaan als favoriet" },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Tips */}
            <div className="space-y-3">
              {[
                { icon: "🎼", tip: "Kant-en-klare afspeellijsten: zoek op 'jaren 70' of 'Nederlandse klassiekers' voor een complete lijst." },
                { icon: "📶", tip: "Gebruik bij voorkeur wifi. Via mobiele data verbruikt Spotify vrij snel data." },
                { icon: "🔊", tip: "Sluit uw telefoon aan op een Bluetooth-speaker voor beter geluid in huis." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-amber-50 border-2 border-amber-200 rounded-xl px-5 py-4">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DAB+ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-3">
              📻 DAB+ digitale radio
            </h2>
            <p className="text-senior-base text-gray-500 mb-8">Helder geluid, veel zenders, geen gedoe</p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8">
              <p className="text-senior-base font-bold text-blue-800 mb-2">Wat is DAB+?</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                DAB+ is de opvolger van de gewone FM-radio. Het signaal is digitaal: het geluid is helderder, er is geen ruis en er zijn veel meer zenders. In Nederland zijn bijna alle FM-zenders ook op DAB+ te ontvangen, plus tientallen extra zenders.
              </p>
            </div>

            <h3 className="text-senior-lg font-bold text-gray-800 mb-5">Twee manieren om DAB+ te luisteren</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-neutral-stone rounded-xl p-6">
                <h4 className="text-senior-base font-bold text-gray-800 mb-3">📻 DAB+-radio (apparaat)</h4>
                <p className="text-senior-base text-gray-700 leading-relaxed mb-3">
                  Een speciale radio die DAB+ ontvangt. Verkrijgbaar vanaf ca. € 30 bij de Mediamarkt, Bol.com of Kruidvat. Gewoon aanzetten en werkt direct — geen telefoon nodig.
                </p>
                <ul className="space-y-1 text-senior-base text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Makkelijkst in gebruik</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Geen internet nodig</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Werkt overal met ontvangst</li>
                </ul>
              </div>
              <div className="border-2 border-neutral-stone rounded-xl p-6">
                <h4 className="text-senior-base font-bold text-gray-800 mb-3">📱 Via de telefoon (app)</h4>
                <p className="text-senior-base text-gray-700 leading-relaxed mb-3">
                  Met de gratis app <strong>NPO Radio</strong> of <strong>Radio.nl</strong> luistert u naar alle Nederlandse zenders via internet. Handig als u al wifi heeft.
                </p>
                <ul className="space-y-1 text-senior-base text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Gratis, direct beschikbaar</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Honderden zenders</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Heeft internet nodig</li>
                </ul>
              </div>
            </div>

            <h3 className="text-senior-lg font-bold text-gray-800 mb-5">Radio luisteren via de NPO Radio-app</h3>
            <ol className="space-y-4">
              {[
                "Download de app 'NPO Radio' via de App Store of Play Store",
                "Open de app — u ziet meteen een lijst met zenders",
                "Tik op een zender, bijv. Radio 2, 3FM of Radio 4",
                "De radio speelt meteen — u hoeft niets in te stellen",
                "Tik op de pauzeknop om te stoppen",
              ].map((stap, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <p className="text-senior-base text-gray-700 leading-relaxed pt-1">{stap}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-1">💡 Terugluisteren</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Via de NPO-app kunt u ook programma&apos;s <em>terugluisteren</em> die u gemist heeft. Zoek op de naam van het programma en luister wanneer het u uitkomt.
              </p>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Spotify: gratis muziek streamen via internet — zoek op artiest of nummer",
                "Spotify gratis is voldoende voor de meeste mensen — reclame ertussendoor",
                "DAB+-radio: koop een apparaatje vanaf € 30 — geen telefoon nodig",
                "NPO Radio-app: gratis, alle Nederlandse zenders, ook terugluisteren",
                "Gebruik wifi voor Spotify en de radio-app — scheelt mobiele data",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/ebooks" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                E-books lezen →
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
