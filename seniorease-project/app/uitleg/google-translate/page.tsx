import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/google-translate" },
    { "@type": "ListItem", "position": 3, "name": "Google Translate gebruiken", "item": "https://www.seniorease.nl/uitleg/google-translate" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Google Translate gebruiken op uw telefoon",
  "description": "Stap voor stap tekst vertalen, inspreken en foto's vertalen met Google Translate.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Google Translate installeren", "text": "Open de App Store of Play Store, zoek op 'Google Translate' en tik op Installeren." },
    { "@type": "HowToStep", "position": 2, "name": "Taal instellen", "text": "Open de app. Kies links de taal van de tekst (bijv. Engels) en rechts de taal waarnaar u wilt vertalen (bijv. Nederlands)." },
    { "@type": "HowToStep", "position": 3, "name": "Tekst typen of inspreken", "text": "Typ de tekst in het bovenste vak, of tik op het microfoonknopje om in te spreken. De vertaling verschijnt vanzelf." },
    { "@type": "HowToStep", "position": 4, "name": "Foto vertalen", "text": "Tik op het camera-icoontje. Richt uw camera op een bord of tekst. Google Translate vertaalt de tekst direct op uw scherm." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kan Google Translate ook offline werken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. U kunt talen downloaden voor gebruik zonder internet. Open Google Translate, tik op een taal en tik op het downloadpijltje. Handig op reis als u geen wifi heeft."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe vertaal ik een menukaart in een restaurant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Google Translate en tik op het camera-icoontje. Kies 'Instant' en richt uw camera op de menukaart. De tekst wordt direct vertaald op uw scherm — u hoeft niets te typen."
      }
    },
    {
      "@type": "Question",
      "name": "Is Google Translate gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Google Translate is volledig gratis te gebruiken."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/google-translate',
  title: "Google Translate gebruiken – vertalen op reis, uitleg voor senioren",
  description: "Hoe vertaalt u tekst, borden en menukaarten met Google Translate? Stap-voor-stap uitleg voor senioren. Handig op vakantie in het buitenland.",
});

export default function GoogleTranslatePage() {
  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Google Translate gebruiken
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Tekst vertalen op reis — stap voor stap uitgelegd voor senioren.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is Google Translate */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Wat is Google Translate?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Google Translate is een gratis app die tekst vertaalt naar meer dan 100 talen.
              Handig als u op vakantie bent en een bord, menukaart of briefje niet kunt lezen.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              U kunt tekst typen, inspreken of uw camera op een bord richten — en Google Translate
              vertaalt het meteen.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "⌨️", label: "Tekst typen" },
                { icon: "🎤", label: "Inspreken" },
                { icon: "📷", label: "Camera op bord richten" },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Installeren */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Google Translate installeren
            </h2>
            <p className="text-senior-base text-navy/80 mb-4">Op Android staat Google Translate er soms al op. Zo niet:</p>
            <div className="space-y-4">
              <div className="bg-paper border border-navy/8 rounded-xl p-4">
                <p className="text-senior-base font-bold text-navy mb-2">📱 Android</p>
                <p className="text-senior-base text-navy/80">Open de <strong>Play Store</strong>, zoek op <strong>Google Translate</strong> en tik op Installeren.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <p className="text-senior-base font-bold text-gray-900 mb-2">🍎 iPhone / iPad</p>
                <p className="text-senior-base text-navy/80">Open de <strong>App Store</strong>, zoek op <strong>Google Translate</strong> en tik op Krijg.</p>
              </div>
            </div>
          </section>

          {/* Tekst vertalen */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Tekst vertalen
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Open Google Translate",
                  uitleg: "Tik op het kleurrijke T-icoontje van Google Translate.",
                },
                {
                  stap: "Kies de talen",
                  uitleg: "Links kiest u de taal van de tekst die u wilt vertalen (bijv. 'Engels'). Rechts kiest u de taal waarnaar vertaald wordt (bijv. 'Nederlands'). Weet u de taal niet? Kies links 'Detecteren' — de app herkent de taal automatisch.",
                },
                {
                  stap: "Typ de tekst",
                  uitleg: "Tik in het grote tekstvak en typ de woorden of zin die u wilt vertalen. De vertaling verschijnt meteen eronder.",
                },
                {
                  stap: "Laat de vertaling voorlezen",
                  uitleg: "Tik op het luidspreker-icoontje naast de vertaling om de tekst hardop voor te laten lezen. Handig als u wilt weten hoe u iets uitspreekt.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Camera vertalen */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Borden en menukaarten vertalen met de camera
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Dit is de handigste functie op vakantie. U richt uw camera op een tekst en ziet
              meteen de vertaling op uw scherm — zonder typen.
            </p>
            <ol className="space-y-4 list-decimal list-outside pl-6 text-senior-base text-navy/80">
              <li>Open Google Translate en tik op het <strong>camera-icoontje</strong> onderaan.</li>
              <li>Kies <strong>Instant</strong> voor directe vertaling op het scherm.</li>
              <li>Richt uw camera op de tekst. De vertaling verschijnt automatisch over de tekst heen.</li>
              <li>Tik op het scherm als u de vertaling wilt vastzetten om hem rustig te lezen.</li>
            </ol>
            <div className="mt-6 p-4 rounded-xl bg-paper border border-navy/10">
              <p className="text-senior-base font-bold text-navy">Tip voor op vakantie</p>
              <p className="text-senior-base text-navy/80 mt-1">Download de taal van het land dat u bezoekt voor gebruik zonder internet. Zo werkt de vertaling ook als u geen wifi heeft. Ga naar de taal in Google Translate en tik op het downloadpijltje.</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Kan Google Translate ook offline werken?</p>
                <p className="text-senior-base text-navy/80">Ja. Download de taal van tevoren via de app. Dan werkt het ook zonder internet — handig onderweg.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Hoe vertaal ik een menukaart?</p>
                <p className="text-senior-base text-navy/80">Tik op het camera-icoontje, kies Instant en richt uw camera op de menukaart. De vertaling verschijnt direct op uw scherm.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Is Google Translate gratis?</p>
                <p className="text-senior-base text-navy/80">Ja, volledig gratis.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg over reizen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/google-maps" className="text-senior-base font-semibold text-gold hover:text-gold-light">Google Maps gebruiken →</Link></li>
              <li><Link href="/uitleg/9292" className="text-senior-base font-semibold text-gold hover:text-gold-light">9292 OV-app gebruiken →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-semibold text-gold hover:text-gold-light">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
