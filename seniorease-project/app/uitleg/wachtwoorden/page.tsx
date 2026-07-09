import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/wachtwoorden',
  title: "Veilig wachtwoord maken en onthouden – uitleg voor senioren",
  description: "Hoe maakt u een sterk wachtwoord en bewaart u het veilig? Praktische tips zonder ingewikkelde termen, speciaal voor senioren.",
});

const swakkeVoorbeelden = [
  { ww: "123456", reden: "Te simpel — eerste keuze van hackers" },
  { ww: "password", reden: "Veel te bekend en te raden" },
  { ww: "jan1952", reden: "Naam + geboortejaar — makkelijk te raden" },
  { ww: "welkom01", reden: "Komt voor in elke hackers-lijst" },
];

const tips = [
  {
    icon: "📖",
    titel: "Gebruik een wachtzin",
    uitleg: "Denk niet aan één woord maar aan een korte zin die u kunt onthouden. Bijv: MijnKatHeeftGrijzeOren! — lang, sterk, makkelijk te onthouden.",
    voorbeeld: "MijnTuinIsBeautiful2024!",
  },
  {
    icon: "🔢",
    titel: "Meng letters, cijfers en tekens",
    uitleg: "Een sterk wachtwoord bevat hoofdletters, kleine letters, minstens één cijfer en een teken zoals ! of @.",
    voorbeeld: "Appeltaart@1952",
  },
  {
    icon: "🚫",
    titel: "Gebruik niet uw naam, geboortedatum of adres",
    uitleg: "Oplichters proberen eerst uw naam, adres en geboortedatum. Die informatie staat soms openbaar op internet.",
    voorbeeld: "Niet: jan_1952 maar wel: Zondag!Wandelen99",
  },
  {
    icon: "🔑",
    titel: "Elk account een ander wachtwoord",
    uitleg: "Als u overal hetzelfde wachtwoord gebruikt en één account wordt gehackt, liggen alle anderen ook open. Gebruik per site een ander wachtwoord.",
    voorbeeld: "Email: Paars!Fietspad22 — Bank: Groene*Tulp88",
  },
];

const bewaarmethoden = [
  {
    methode: "Notitieboekje (veiligste voor senioren)",
    icon: "📓",
    kleur: "bg-green-50 border-green-200",
    voor: [
      "U hoeft niets te onthouden",
      "Werkt altijd, ook zonder internet",
      "Niemand kan er digitaal bij",
    ],
    let_op: [
      "Bewaar het op een vaste, veilige plek",
      "Schrijf alleen de hint op, niet het volledige wachtwoord",
      "Vertel niemand waar het ligt",
    ],
  },
  {
    methode: "Wachtwoordmanager (handigst voor veel accounts)",
    icon: "🔐",
    kleur: "bg-blue-50 border-blue-200",
    voor: [
      "Onthoudt al uw wachtwoorden automatisch",
      "U hoeft maar één wachtwoord te kennen",
      "Goede gratis opties: Bitwarden of de ingebouwde beheerder van Chrome",
    ],
    let_op: [
      "Het hoofdwachtwoord moet u GOED onthouden of opschrijven",
      "Werkt alleen als u altijd ingelogd bent op uw apparaat",
    ],
  },
];

export default function WachtwoordenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <UitlegJsonLd slug="wachtwoorden" />
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Wachtwoorden — veilig en toch te onthouden
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              70% van de senioren worstelt met wachtwoorden. Na deze uitleg niet meer.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Veiligheid navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">🔒 Veiligheid:</span>
              <Link href="/uitleg/veiligheid" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Oplichting herkennen</Link>
              <span className="text-senior-sm font-bold text-primary underline">Wachtwoorden</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Waarom belangrijk */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Waarom is een sterk wachtwoord zo belangrijk?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Uw wachtwoord is de sleutel tot uw e-mail, bankrekening, DigiD en meer. Een zwak wachtwoord is alsof u de voordeur op een kier laat staan.
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Hackers gebruiken computers die duizenden wachtwoorden per seconde proberen. Een simpel wachtwoord als &quot;123456&quot; is in minder dan een seconde gekraakt.
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-2">⏱️ Hoe snel wordt uw wachtwoord gekraakt?</p>
              <div className="space-y-2">
                {[
                  { ww: "123456", tijd: "Minder dan 1 seconde", kleur: "text-red-600" },
                  { ww: "welkom01", tijd: "Minder dan 1 minuut", kleur: "text-red-600" },
                  { ww: "Appel52!", tijd: "Meerdere weken", kleur: "text-amber-600" },
                  { ww: "MijnTuinIsBeautiful2024!", tijd: "Miljoenen jaren", kleur: "text-green-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border border-neutral-stone">
                    <span className="text-senior-base font-mono text-gray-700">{item.ww}</span>
                    <span className={`text-senior-sm font-bold ${item.kleur}`}>{item.tijd}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Zwakke wachtwoorden */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Wachtwoorden die u beter kunt vermijden
            </h2>
            <div className="space-y-3">
              {swakkeVoorbeelden.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-red-50 border-2 border-red-200 rounded-xl px-5 py-4">
                  <span className="text-red-600 font-bold text-2xl flex-shrink-0">✗</span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-senior-base font-mono font-bold text-gray-800 w-32">{item.ww}</span>
                    <span className="text-senior-base text-gray-600">{item.reden}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4 tips voor sterk wachtwoord */}
          <section>
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">
              Zo maakt u een sterk wachtwoord
            </h2>
            <div className="space-y-6">
              {tips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden">
                  <div className="bg-primary/10 border-b-2 border-primary/20 px-8 py-5 flex items-center gap-4">
                    <span className="text-4xl">{tip.icon}</span>
                    <h3 className="text-senior-lg md:text-senior-xl font-bold text-primary">{tip.titel}</h3>
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">{tip.uitleg}</p>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl px-5 py-4">
                      <p className="text-senior-xs font-bold text-green-700 mb-1 uppercase tracking-wide">Voorbeeld:</p>
                      <p className="text-senior-lg font-mono font-bold text-gray-800">{tip.voorbeeld}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wachtzin methode uitgelegd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              De wachtzin methode — makkelijkste manier
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Denk aan iets wat u altijd onthoudt — een herinnering, een hobby, uw tuin. Maak daar een zin van en voeg een cijfer en uitroepteken toe.
            </p>
            <ol className="space-y-5 mb-6">
              {[
                { stap: "Denk aan een persoonlijke zin", voorbeeld: "\"Mijn roos bloeit elke zomer\"" },
                { stap: "Pak de beginletters of gebruik de hele zin", voorbeeld: "MijnRoosBloeItElkeZomer" },
                { stap: "Voeg een cijfer toe", voorbeeld: "MijnRoosBloeItElkeZomer52" },
                { stap: "Voeg een leesteken toe", voorbeeld: "MijnRoosBloeItElkeZomer52!" },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base font-mono text-primary bg-primary/10 px-3 py-1 rounded-lg inline-block">{item.voorbeeld}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-1">✅ Resultaat:</p>
              <p className="text-senior-xl font-mono font-bold text-gray-800">MijnRoosBloeItElkeZomer52!</p>
              <p className="text-senior-sm text-gray-600 mt-2">Lang, sterk, en toch makkelijk te onthouden.</p>
            </div>
          </section>

          {/* Hoe bewaart u wachtwoorden? */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Hoe bewaart u uw wachtwoorden veilig?
            </h2>
            <div className="space-y-6">
              {bewaarmethoden.map((methode, i) => (
                <div key={i} className={`rounded-2xl border-2 ${methode.kleur} p-6`}>
                  <h3 className="text-senior-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="text-3xl">{methode.icon}</span>
                    {methode.methode}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-senior-sm font-bold text-green-700 mb-2">✅ Voordelen:</p>
                      <ul className="space-y-1">
                        {methode.voor.map((v, j) => (
                          <li key={j} className="text-senior-base text-gray-700 flex gap-2">
                            <span className="text-green-600 flex-shrink-0">•</span>{v}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-senior-sm font-bold text-amber-700 mb-2">⚠️ Let op:</p>
                      <ul className="space-y-1">
                        {methode.let_op.map((l, j) => (
                          <li key={j} className="text-senior-base text-gray-700 flex gap-2">
                            <span className="text-amber-600 flex-shrink-0">•</span>{l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-red-800 mb-2">❌ Dit nooit doen:</p>
              <ul className="space-y-2 text-senior-base text-gray-700">
                <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">•</span> Wachtwoorden opschrijven in een notitie op uw telefoon die &quot;Wachtwoorden&quot; heet</li>
                <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">•</span> Wachtwoorden via WhatsApp of e-mail versturen</li>
                <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">•</span> Uw wachtwoord vertellen aan iemand die u belt (ook niet als die zegt van de bank te zijn)</li>
              </ul>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Samenvatting — onthoud dit
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Lang is sterker dan ingewikkeld — gebruik een wachtzin",
                "Voeg altijd een cijfer en uitroepteken toe",
                "Gebruik uw naam of geboortedatum NOOIT als wachtwoord",
                "Elk account verdient een ander wachtwoord",
                "Schrijf het op in een notitieboekje op een veilige plek",
                "Vertel uw wachtwoord nooit — ook niet aan de bank",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/digid" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                DigiD uitleg →
              </Link>
              <Link href="/uitleg/veiligheid" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                ← Oplichting herkennen
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
