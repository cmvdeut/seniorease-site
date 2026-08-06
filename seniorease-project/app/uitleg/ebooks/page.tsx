import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/ebooks',
  title: "E-books lezen voor senioren – gratis lenen via de bibliotheek",
  description: "Gratis digitale boeken lenen met uw bibliotheekpas via de Libby-app. Letters zo groot als u wilt. Stap-voor-stap uitleg.",
});

export default function EbooksPage() {
  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="ebooks" />
      {/* Header */}
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              E-books lezen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Duizenden boeken in uw broekzak — en gratis lenen via de bibliotheek kan gewoon digitaal.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Hobby's navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">🎨 Hobby&apos;s:</span>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Foto&apos;s ordenen</Link>
              <span className="text-senior-sm font-bold text-gold underline">E-books lezen</span>
              <Link href="/uitleg/muziek-radio" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Muziek &amp; radio</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Wat is een e-book?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Een e-book is een digitaal boek — gewoon een boek, maar dan op uw scherm. U leest het via een app op uw telefoon, tablet of een speciale e-reader. Het voordeel: u kunt de letters groter zetten, het leest makkelijk in het donker en u kunt honderden boeken meenemen op reis zonder extra gewicht.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: "🔤", label: "Letters zo groot als u wilt" },
                { icon: "🌙", label: "Lezen in het donker" },
                { icon: "📚", label: "Duizenden boeken op één apparaat" },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-paper border border-navy/10 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">Geen speciale e-reader nodig</p>
              <p className="text-senior-base text-navy/80 leading-relaxed">
                U kunt e-books lezen op uw gewone telefoon of tablet via een gratis app. Een aparte e-reader (zoals een Kobo of Kindle) is handig maar niet verplicht.
              </p>
            </div>
          </section>

          {/* Bibliotheek – gratis */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-3">
              📖 Gratis lenen via de bibliotheek
            </h2>
            <p className="text-senior-base text-navy/55 mb-6">De makkelijkste en goedkoopste manier</p>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-8">
              <p className="text-senior-base font-bold text-green-800 mb-2">✅ Heeft u een bibliotheekpas?</p>
              <p className="text-senior-base text-navy/80 leading-relaxed">
                Dan kunt u via de app <strong>Libby</strong> of <strong>BibliONL</strong> gratis digitale boeken lenen — net zoals u een gewoon boek leent, maar dan thuis vanuit uw luie stoel. U mag meerdere boeken tegelijk lenen, en na drie weken verdwijnen ze automatisch. U hoeft nooit te terugbrengen!
              </p>
            </div>

            <h3 className="text-senior-lg font-bold text-navy mb-5">Zo werkt het — stap voor stap</h3>
            <ol className="space-y-5">
              {[
                {
                  stap: "Download de app 'Libby'",
                  detail: "Zoek in de App Store (iPhone) of Play Store (Android) op 'Libby'. De app is gratis.",
                },
                {
                  stap: "Zoek uw bibliotheek",
                  detail: "Open Libby en tik op 'Bibliotheek zoeken'. Typ de naam van uw gemeente of bibliotheek in.",
                },
                {
                  stap: "Log in met uw bibliotheekpas",
                  detail: "Voer uw pasnummer in (staat op de pas of in uw account bij de bibliotheek). Heeft u nog geen pas? Vraag er eentje aan bij uw lokale bibliotheek.",
                },
                {
                  stap: "Zoek een boek",
                  detail: "Typ de titel of auteur in het zoekvak. U ziet meteen of het boek beschikbaar is of hoelang de wachtrij is.",
                },
                {
                  stap: "Tik op 'Lenen'",
                  detail: "Het boek wordt direct naar uw app gestuurd. Tik op 'Nu lezen' om te beginnen.",
                },
                {
                  stap: "Stel de lettergrootte in",
                  detail: "Tik op het Aa-icoontje bovenin om letters groter of kleiner te maken. Kies ook een prettig lettertype en achtergrondkleur.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Kopen: Kobo en Kindle */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              🛒 E-books kopen — Kobo en Kindle
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Wilt u een boek dat niet in de bibliotheek staat, of wilt u het meteen hebben? Dan koopt u het bij Kobo of Kindle. Een e-book kost gemiddeld € 5 tot € 12 — goedkoper dan een papieren boek.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-orange-800 mb-3">📕 Kobo (aanbevolen voor Nederland)</h3>
                <p className="text-senior-base text-navy/80 leading-relaxed mb-4">
                  Kobo is de populairste e-bookwinkel in Nederland. Boeken in het Nederlands zijn goed vertegenwoordigd.
                </p>
                <ul className="space-y-2 text-senior-base text-navy/80">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Grote keuze Nederlandstalige boeken</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Gratis Kobo-app op telefoon</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Aparte Kobo e-reader verkrijgbaar</li>
                </ul>
              </div>
              <div className="bg-paper border border-navy/8 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-navy/75 mb-3">📗 Kindle (van Amazon)</h3>
                <p className="text-senior-base text-navy/80 leading-relaxed mb-4">
                  Kindle is de e-bookwinkel van Amazon. Groot aanbod, ook in het Engels. Handig als u veel Engelstalige boeken leest.
                </p>
                <ul className="space-y-2 text-senior-base text-navy/80">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Enorm aanbod, ook gratis boeken</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Gratis Kindle-app op telefoon</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Minder Nederlandstalig aanbod</li>
                </ul>
              </div>
            </div>
          </section>

          {/* E-reader */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              📱 E-reader of telefoon — wat is fijner?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-senior-base font-bold text-navy mb-3 flex items-center gap-2">
                  <span className="text-2xl">📱</span> Telefoon of tablet
                </h3>
                <ul className="space-y-2 text-senior-base text-navy/80">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Heeft u al</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Geen extra apparaat nodig</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Kleurenscherm</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Batterij gaat minder lang mee</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Buiten wat minder goed leesbaar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-senior-base font-bold text-navy mb-3 flex items-center gap-2">
                  <span className="text-2xl">📖</span> Speciale e-reader (Kobo/Kindle)
                </h3>
                <ul className="space-y-2 text-senior-base text-navy/80">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> E-ink scherm: leest als echt papier</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Weken op één batterijlading</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Goed leesbaar in felle zon</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Kost € 100 à € 200</li>
                  <li className="flex gap-2"><span className="text-amber-500">~</span> Geen kleur (sommige modellen wel)</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-gold/10 border-2 border-navy/8/30 rounded-xl p-5">
              <p className="text-senior-base font-bold text-gold mb-1">Advies</p>
              <p className="text-senior-base text-navy/80 leading-relaxed">
                Begin gewoon op uw telefoon of tablet met de gratis Libby-app. Als u merkt dat u veel leest en het prettig vindt, is een e-reader een mooie volgende stap.
              </p>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Gratis lenen: download de app 'Libby' en log in met uw bibliotheekpas",
                "Boeken verdwijnen na 3 weken automatisch — u hoeft nooit terug te brengen",
                "Lettergrootte aanpassen: tik op 'Aa' in de app",
                "Kopen: Kobo is het beste voor Nederlandstalige boeken",
                "Begin op uw telefoon — een aparte e-reader is niet nodig",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream border-2 border-navy/8/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/muziek-radio" className="inline-flex items-center gap-2 bg-white border-2 border-navy/8 text-gold px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold/10 transition-colors">
                Muziek &amp; radio →
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 bg-gold text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold-light transition-colors ">
                ← Terug naar home
              </Link>
            </div>
          </section>

          {/* Zoektip */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              🔍 Een e-reader kopen?
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Wilt u een Kobo of andere e-reader kopen? Zoek dan zelf even op via Google of ChatGPT — dan vindt u actuele prijzen en beoordelingen.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-paper border border-navy/8 rounded-xl p-5">
                <p className="text-senior-base font-bold text-navy/75 mb-2">🌐 Via Google</p>
                <p className="text-senior-base text-navy/80">Typ in Google bijvoorbeeld: <strong>Kobo Clara kopen</strong> — dan ziet u meteen webshops met prijzen.</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-green-800 mb-2">🤖 Via ChatGPT</p>
                <p className="text-senior-base text-navy/80">Vraag aan ChatGPT: <strong>&ldquo;Welke e-reader is geschikt voor een beginnende gebruiker?&rdquo;</strong> — dan krijgt u uitleg én aanbevelingen.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
