import Link from 'next/link';

export const metadata = {
  title: "Digitale foto's ordenen op uw telefoon",
  description: "Hoe maakt u albums, zet u favorieten apart en deelt u foto's met familie? Stap-voor-stap uitleg voor senioren.",
};

export default function FotosOrdenenPage() {
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
              Digitale foto&apos;s ordenen op uw telefoon
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Al uw mooie herinneringen netjes op een rij — makkelijk terug te vinden en te delen.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <span className="text-senior-sm font-bold text-primary underline">Foto&apos;s ordenen</span>
              <Link href="/uitleg/videobellen" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Videobellen</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Waarom foto&apos;s ordenen?
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
              Op uw telefoon staan misschien honderden of zelfs duizenden foto&apos;s. Leuk — maar het is soms lastig om snel een bepaalde foto terug te vinden. Met albums kunt u uw foto&apos;s netjes sorteren: één album voor de kleinkinderen, één voor de vakantie, één voor de tuin.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🔍", label: "Snel terugvinden" },
                { icon: "❤️", label: "Mooiste foto's apart" },
                { icon: "📤", label: "Makkelijk delen" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Albums maken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              📁 Een album maken
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Op zowel Android als iPhone maakt u albums via de Foto&apos;s-app. Dat is de app met het icoontje van een bloem of berglandschap.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Android */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  🤖 Android-telefoon
                </h3>
                <ol className="space-y-3">
                  {[
                    "Open de Foto's-app (of Google Foto's)",
                    "Tik rechtsonder op 'Bibliotheek'",
                    "Tik op 'Nieuw album' of het + icoontje",
                    "Geef het album een naam (bijv. 'Kleinkinderen 2025')",
                    "Selecteer de foto's die erin moeten",
                    "Tik op 'Gereed' of 'Album aanmaken'",
                  ].map((stap, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-senior-base text-gray-700 leading-relaxed pt-0.5">{stap}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* iPhone */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                  🍎 iPhone
                </h3>
                <ol className="space-y-3">
                  {[
                    "Open de Foto's-app",
                    "Tik onderaan op 'Albums'",
                    "Tik linksboven op het + icoontje",
                    "Kies 'Nieuw album'",
                    "Typ een naam voor het album",
                    "Selecteer de foto's en tik op 'Gereed'",
                  ].map((stap, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-senior-base text-gray-700 leading-relaxed pt-0.5">{stap}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Favorieten */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              ❤️ Favoriete foto&apos;s apart zetten
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Heeft u een foto die u echt heel mooi vindt? Zet hem bij uw favorieten. Die zijn altijd snel terug te vinden in een apart mapje.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: "🤖",
                  platform: "Android",
                  uitleg: "Open de foto en tik op het hartje ❤️ of de ster ⭐ bovenin het scherm. De foto gaat dan naar 'Favorieten'.",
                  kleur: "bg-green-50 border-green-200",
                  tekstkleur: "text-green-800",
                },
                {
                  icon: "🍎",
                  platform: "iPhone",
                  uitleg: "Open de foto en tik op het hartje ❤️ onderaan het scherm. In uw albumoverzicht staat een map 'Favorieten' waar ze automatisch in komen.",
                  kleur: "bg-blue-50 border-blue-200",
                  tekstkleur: "text-blue-800",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border-2 ${item.kleur} px-6 py-5 flex gap-4 items-start`}>
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className={`text-senior-base font-bold ${item.tekstkleur} mb-1`}>{item.platform}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Foto's delen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              📤 Foto&apos;s delen met familie
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Een mooie foto wil je toch doorsturen! Dat kan heel gemakkelijk via WhatsApp of e-mail.
            </p>
            <ol className="space-y-5 mb-6">
              {[
                { stap: "Open de Foto's-app en zoek de foto op", detail: "" },
                { stap: "Tik op de foto zodat hij groot te zien is", detail: "" },
                { stap: "Tik op het deelknopje", detail: "Dat is een vierkantje met een pijltje omhoog (iPhone) of drie puntjes / deelknop (Android)" },
                { stap: "Kies 'WhatsApp' of 'E-mail'", detail: "Kies de app waarmee u wilt delen" },
                { stap: "Kies de ontvanger en verstuur", detail: "Selecteer het contact en tik op Verzenden" },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-senior-base font-bold text-gray-800">{item.stap}</p>
                    {item.detail && <p className="text-senior-sm text-gray-500 mt-0.5">{item.detail}</p>}
                  </div>
                </li>
              ))}
            </ol>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">💡 Tip: meerdere foto's tegelijk sturen</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Houd uw vinger op één foto totdat er een vinkje verschijnt. Tik daarna op alle andere foto&apos;s die u wilt toevoegen. Dan kunt u ze in één keer doorsturen.
              </p>
            </div>
          </section>

          {/* Back-up */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              ☁️ Foto&apos;s bewaren — ook als uw telefoon stukgaat
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
              Wat als uw telefoon verloren gaat of kapotgaat? Dan zijn uw foto&apos;s ook weg — tenzij u een back-up heeft. Gelukkig kan dat automatisch.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-green-800 mb-3">🤖 Android: Google Foto&apos;s</h3>
                <ul className="space-y-2">
                  {[
                    "Open de app 'Google Foto's'",
                    "Tik op uw profielfoto rechtsboven",
                    "Tik op 'Back-up inschakelen'",
                    "Klaar — foto's worden automatisch opgeslagen",
                  ].map((stap, i) => (
                    <li key={i} className="flex gap-2 text-senior-base text-gray-700">
                      <span className="text-green-600 flex-shrink-0">✓</span>{stap}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-blue-800 mb-3">🍎 iPhone: iCloud</h3>
                <ul className="space-y-2">
                  {[
                    "Ga naar Instellingen (het tandwiel)",
                    "Tik op uw naam bovenaan",
                    "Tik op 'iCloud' → 'Foto's'",
                    "Zet 'iCloud-foto's' aan",
                  ].map((stap, i) => (
                    <li key={i} className="flex gap-2 text-senior-base text-gray-700">
                      <span className="text-blue-600 flex-shrink-0">✓</span>{stap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-neutral-cream border-2 border-primary/20 rounded-xl p-4">
              <p className="text-senior-sm text-gray-600">
                💡 De gratis opslag is voldoende voor duizenden foto&apos;s. Pas als u heel veel video&apos;s opslaat, kunt u meer ruimte nodig hebben.
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
                "Maak albums aan voor bijv. 'Kleinkinderen', 'Vakantie', 'Tuin'",
                "Tik op het hartje om een foto bij uw favorieten te zetten",
                "Deel foto's via WhatsApp: open foto → deelknop → WhatsApp → contact",
                "Zet automatische back-up aan via Google Foto's of iCloud",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/videobellen" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                Videobellen met familie →
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
