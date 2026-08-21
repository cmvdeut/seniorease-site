import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/qr-code',
  title: 'QR-code scannen met uw telefoon (Android & iPhone)',
  description:
    'Hoe scant u een QR-code? Open de Camera-app, richt op de vierkante code en tik op de link. Meestal geen aparte app nodig — stap voor stap uitgelegd.',
  keywords: [
    'qr code scannen',
    'qr-code scannen',
    'vierkante code scannen',
    'qr scannen telefoon',
    'qr code android',
    'qr code iphone',
  ],
});

const voorbeelden = [
  { icon: "🍽️", tekst: "Het menu in een restaurant" },
  { icon: "🚌", tekst: "Dienstregeling bij een bushalte" },
  { icon: "💊", tekst: "Bijsluiter van medicijnen" },
  { icon: "🎟️", tekst: "Uw trein- of vliegticket" },
  { icon: "🏛️", tekst: "Informatiebord in een museum" },
  { icon: "📦", tekst: "Pakket traceren bij PostNL" },
  { icon: "🏥", tekst: "Inloggen bij MijnGezondheid.net" },
  { icon: "📺", tekst: "Link naar een YouTube-video" },
];

const stappenAndroid = [
  {
    num: 1,
    tekst: "Open de Camera-app op uw telefoon (het fotoapparaat-icoon).",
  },
  {
    num: 2,
    tekst: "Richt de camera op de QR-code. Houd uw telefoon stil op circa 20 cm afstand.",
  },
  {
    num: 3,
    tekst: "Er verschijnt vanzelf een melding of banner bovenaan uw scherm.",
  },
  {
    num: 4,
    tekst: "Tik op die melding. De link of informatie opent zich automatisch.",
  },
];

const stappenIphone = [
  {
    num: 1,
    tekst: "Open de Camera-app (het gele icoon met een camera).",
  },
  {
    num: 2,
    tekst: "Richt de camera op de QR-code. Hoeft u niet te drukken — gewoon richten.",
  },
  {
    num: 3,
    tekst: "Bovenaan uw scherm verschijnt een gele banner met een link.",
  },
  {
    num: 4,
    tekst: "Tik op die gele banner om de pagina te openen.",
  },
];

export default function QRCodePage() {
  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="qr-code" />
      {/* Header */}
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              QR-code scannen met uw smartphone
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Die vierkante blokjespuzzel uitgelegd — en in 4 stappen gescand.
            </p>
            <p className="text-senior-sm text-navy/80 mt-3 max-w-2xl">
              Hier leest u wat een QR-code is, waar u ze tegenkomt en hoe u ze veilig scant met uw telefoon.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Smartphone uitleg navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">📱 Smartphone:</span>
              <Link href="/uitleg/whatsapp-basis" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">WhatsApp</Link>
              <Link href="/uitleg/fotos-maken" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Foto&apos;s maken</Link>
              <span className="text-senior-sm font-bold text-gold underline">QR-code scannen</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is een QR-code? */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Wat is een QR-code?
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
                  Een QR-code is dat vierkante plaatje vol zwarte en witte blokjes dat u steeds vaker tegenkomt. Het lijkt op een kruiswoordpuzzel, maar het is eigenlijk een <strong>verkorte link</strong> naar een website of informatie.
                </p>
                <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
                  In plaats van een lang webadres intypen, richt u gewoon uw telefoon op het plaatje — en uw telefoon doet de rest.
                </p>
                <div className="bg-cream border-2 border-navy/8/30 rounded-xl p-5">
                  <p className="text-senior-base font-bold text-navy mb-1">Simpel gezegd:</p>
                  <p className="text-senior-base text-navy/80">
                    QR-code = snelkoppeling. Uw telefoon &quot;leest&quot; de code en opent automatisch de bijbehorende pagina.
                  </p>
                </div>
              </div>
              {/* QR-code illustratie */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-36 h-36 bg-white border-4 border-gray-800 rounded-xl p-3 ">
                  <svg viewBox="0 0 21 21" className="w-full h-full" aria-hidden>
                    {/* Simplified QR code pattern */}
                    <rect width="21" height="21" fill="white"/>
                    {/* Top-left finder */}
                    <rect x="1" y="1" width="7" height="7" fill="#1a1a1a" rx="0.5"/>
                    <rect x="2" y="2" width="5" height="5" fill="white" rx="0.3"/>
                    <rect x="3" y="3" width="3" height="3" fill="#1a1a1a" rx="0.2"/>
                    {/* Top-right finder */}
                    <rect x="13" y="1" width="7" height="7" fill="#1a1a1a" rx="0.5"/>
                    <rect x="14" y="2" width="5" height="5" fill="white" rx="0.3"/>
                    <rect x="15" y="3" width="3" height="3" fill="#1a1a1a" rx="0.2"/>
                    {/* Bottom-left finder */}
                    <rect x="1" y="13" width="7" height="7" fill="#1a1a1a" rx="0.5"/>
                    <rect x="2" y="14" width="5" height="5" fill="white" rx="0.3"/>
                    <rect x="3" y="15" width="3" height="3" fill="#1a1a1a" rx="0.2"/>
                    {/* Data dots */}
                    <rect x="9" y="1" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="11" y="1" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="9" y="3" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="11" y="3" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="9" y="5" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="1" y="9" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="3" y="9" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="6" y="9" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="9" y="9" width="3" height="1" fill="#1a1a1a"/>
                    <rect x="13" y="9" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="16" y="9" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="19" y="9" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="1" y="11" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="5" y="11" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="9" y="11" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="11" y="11" width="3" height="1" fill="#1a1a1a"/>
                    <rect x="15" y="11" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="19" y="11" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="9" y="13" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="13" y="15" width="1" height="2" fill="#1a1a1a"/>
                    <rect x="15" y="14" width="2" height="1" fill="#1a1a1a"/>
                    <rect x="18" y="13" width="1" height="3" fill="#1a1a1a"/>
                    <rect x="9" y="16" width="1" height="2" fill="#1a1a1a"/>
                    <rect x="11" y="15" width="1" height="1" fill="#1a1a1a"/>
                    <rect x="15" y="17" width="3" height="1" fill="#1a1a1a"/>
                  </svg>
                </div>
                <p className="text-senior-xs text-navy/55 text-center max-w-32">Zo ziet een QR-code eruit</p>
              </div>
            </div>
          </section>

          {/* Waar komt u ze tegen? */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Waar komt u QR-codes tegen?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Overal! Hier zijn situaties die u vast herkent:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {voorbeelden.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-cream border-2 border-navy/10 rounded-xl px-5 py-3">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <p className="text-senior-base text-navy/80">{item.tekst}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hoe scannen — Android */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">
              Scannen met Android
            </h2>
            <p className="text-senior-base text-navy/70 mb-8">
              Voor Samsung, Motorola, LG en de meeste andere Android-telefoons.
            </p>
            <ol className="space-y-5">
              {stappenAndroid.map((stap) => (
                <li key={stap.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center text-senior-lg font-bold shadow-md">
                    {stap.num}
                  </div>
                  <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed pt-2">
                    {stap.tekst}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 bg-paper border border-navy/10 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">Werkt de camera niet?</p>
              <p className="text-senior-base text-navy/80">
                Sommige oudere Android-telefoons hebben een aparte QR-scanner nodig. Zoek in de App Store naar <strong>&quot;QR Scanner&quot;</strong> en installeer een gratis app. Die werkt dan net zo.
              </p>
            </div>
          </section>

          {/* Hoe scannen — iPhone */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">
              Scannen met iPhone
            </h2>
            <p className="text-senior-base text-navy/70 mb-8">
              Voor alle iPhones met iOS 11 of nieuwer (dat is vrijwel elke iPhone van de afgelopen jaren).
            </p>
            <ol className="space-y-5">
              {stappenIphone.map((stap) => (
                <li key={stap.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center text-senior-lg font-bold shadow-md">
                    {stap.num}
                  </div>
                  <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed pt-2">
                    {stap.tekst}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 bg-paper border border-navy/8 rounded-xl p-5">
              <p className="text-senior-base font-bold text-navy/75 mb-1">📱 Extra tip voor iPhone</p>
              <p className="text-senior-base text-navy/80">
                U kunt ook het <strong>Bedieningspaneel</strong> openen (veeg van rechtsonder omhoog) en op het QR-code-icoontje tikken. Dat is soms sneller.
              </p>
            </div>
          </section>

          {/* Is het veilig? */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Is het veilig?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Meestal wel — maar net als bij e-mail geldt: let even op voor u klikt. Meer over veilig omgaan met links en oplichting leest u in onze{' '}
              <Link href="/uitleg/veiligheid" className="font-semibold text-gold hover:text-gold-light">uitleg over oplichting herkennen</Link>.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-green-800 mb-3">✅ Veilig te scannen:</p>
                <ul className="text-senior-base text-navy/80 space-y-2">
                  <li>• QR-codes in restaurants of winkels</li>
                  <li>• Op officiële brieven of tickets</li>
                  <li>• Bij informatieborden in musea</li>
                  <li>• Op medicijnverpakkingen</li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-red-800 mb-3">⚠️ Voorzichtig mee zijn:</p>
                <ul className="text-senior-base text-navy/80 space-y-2">
                  <li>• QR-codes geplakt over een ander stickertje</li>
                  <li>• Codes ontvangen via WhatsApp van onbekenden — zie onze <Link href="/uitleg/veiligheid" className="font-semibold text-gold hover:text-gold-light">uitleg over WhatsApp-oplichting</Link></li>
                  <li>• Als de link erachter er vreemd uitziet</li>
                </ul>
              </div>
            </div>
            <div className="bg-cream border-2 border-navy/8/30 rounded-xl p-5">
              <p className="text-senior-base font-bold text-navy mb-1">
                🔍 Handige tip: kijk altijd even naar de link
              </p>
              <p className="text-senior-base text-navy/80">
                Wanneer uw telefoon de QR-code leest, ziet u eerst de link voordat u erop tikt. Herkent u de website niet? Tik dan niet verder.
              </p>
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Samenvatting
            </h2>
            <ol className="space-y-4 mb-8">
              {[
                "Open de Camera-app op uw telefoon",
                "Richt de camera op de QR-code (niet klikken, gewoon richten)",
                "Wacht op de melding of banner op uw scherm",
                "Tik op de melding — klaar!",
              ].map((stap, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-base">
                    {i + 1}
                  </div>
                  <p className="text-senior-base text-navy/80 leading-relaxed pt-1">{stap}</p>
                </li>
              ))}
            </ol>
            <p className="text-senior-lg font-bold text-gold mb-6">
              Probeer het eens — u doet het binnen 10 seconden! 📷
            </p>

            {/* Gerelateerde uitleg – interne links voor SEO en navigatie */}
            <h2 className="font-serif text-senior-lg font-semibold text-navy mt-8 mb-4">Gerelateerde uitleg</h2>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/digitale-hulp/smartphone" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  Smartphone hulp (alle artikelen)
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  WhatsApp uitleg voor beginners
                </Link>
              </li>
              <li>
                <Link href="/uitleg/whatsapp-basis" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  WhatsApp basis (uitgebreide uitleg)
                </Link>
              </li>
              <li>
                <Link href="/uitleg/wifi" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  WiFi instellen
                </Link>
              </li>
              <li>
                <Link href="/uitleg/veiligheid" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  Oplichting herkennen
                </Link>
              </li>
            </ul>
            <Link href="/" className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-xl text-senior-base font-bold hover:bg-gold-light transition-colors ">
              ← Terug naar home
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}
