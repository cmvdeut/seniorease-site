import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/npo-start" },
    { "@type": "ListItem", "position": 3, "name": "NPO Start gebruiken", "item": "https://www.seniorease.nl/uitleg/npo-start" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "NPO Start installeren en programma's terugkijken",
  "description": "Stap voor stap NPO Start installeren en gratis Nederlandse programma's terugkijken.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "NPO Start installeren", "text": "Open de App Store of Play Store, zoek op 'NPO Start' en tik op Installeren." },
    { "@type": "HowToStep", "position": 2, "name": "App openen", "text": "Tik op het rode NPO-icoontje om de app te openen. U hoeft niet in te loggen om te kijken." },
    { "@type": "HowToStep", "position": 3, "name": "Programma zoeken", "text": "Tik op het vergrootglas of blader door de lijst. Tik op een programma om het te openen." },
    { "@type": "HowToStep", "position": 4, "name": "Aflevering bekijken", "text": "Tik op een aflevering en daarna op de afspeelknop. Het programma begint vanzelf." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is NPO Start gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, NPO Start is volledig gratis. U heeft geen account nodig om programma's te kijken. Met een gratis account kunt u programma's bewaren en verder kijken waar u gebleven was."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe lang blijven programma's beschikbaar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De meeste programma's blijven enkele weken tot maanden beschikbaar na de uitzending. Sommige programma's zijn vanwege auteursrechten maar kort beschikbaar."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik NPO Start ook op mijn televisie kijken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Op een Smart TV kunt u de NPO Start app installeren via de app-winkel van uw televisie. U kunt ook uw telefoon of tablet via een kabeltje of draadloos verbinden met uw tv."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/npo-start',
  title: "NPO Start gebruiken op tablet of smartphone – uitleg voor senioren",
  description: "Hoe kijkt u gratis Nederlandse programma",
});

export default function NpoStartPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              NPO Start gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Gratis Nederlandse programma&apos;s terugkijken op uw tablet of smartphone — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is NPO Start */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is NPO Start?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              NPO Start is de gratis terugkijkdienst van de Nederlandse publieke omroep.
              Hiermee kunt u programma&apos;s van NPO 1, NPO 2 en NPO 3 bekijken wanneer u wilt —
              ook als u de uitzending gemist heeft.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Denk aan het Journaal, Nieuwsuur, talkshows, documentaires, natuurprogramma&apos;s en series.
              Alles gratis, zonder abonnement.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📺", label: "NPO 1, 2 en 3" },
                { icon: "🆓", label: "Helemaal gratis" },
                { icon: "⏰", label: "Kijk wanneer u wilt" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Installeren */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              NPO Start installeren
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-blue-900 mb-3">📱 Op Android</h3>
                <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>Play Store</strong>.</li>
                  <li>Zoek op <strong>NPO Start</strong>.</li>
                  <li>Tik op het rode NPO-icoontje en tik op <strong>Installeren</strong>.</li>
                </ol>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-gray-900 mb-3">🍎 Op iPhone of iPad</h3>
                <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>App Store</strong>.</li>
                  <li>Zoek op <strong>NPO Start</strong>.</li>
                  <li>Tik op <strong>Krijg</strong> en bevestig met uw vingerafdruk of wachtwoord.</li>
                </ol>
              </div>
            </div>
            <p className="text-senior-sm text-gray-500 mt-4">
              U hoeft geen account aan te maken om te kijken. Gewoon openen en kijken.
            </p>
          </section>

          {/* Programma terugkijken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Een programma terugkijken
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Open NPO Start",
                  uitleg: "Tik op het rode NPO Start-icoontje op uw telefoon of tablet.",
                },
                {
                  stap: "Zoek een programma",
                  uitleg: "Tik bovenaan op het vergrootglas en typ de naam van het programma. Of blader door het beginscherm — daar staan populaire en recent uitgezonden programma's.",
                },
                {
                  stap: "Tik op het programma",
                  uitleg: "U ziet een overzicht van afleveringen of uitzendingen. De meest recente staat bovenaan.",
                },
                {
                  stap: "Tik op een aflevering",
                  uitleg: "Kies de aflevering die u wilt zien. Tik daarna op de grote afspeelknop (▶). Het programma begint vanzelf.",
                  tip: "Draai uw tablet of telefoon op zijn kant voor een groter beeld.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start list-none">
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

          {/* Populaire programma's */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
              Populaire programma&apos;s op NPO Start
            </h2>
            <ul className="space-y-2">
              {[
                "Het Journaal (NPO 1)",
                "Nieuwsuur (NPO 2)",
                "Op1 (NPO 1)",
                "Andere Tijden (NPO 2)",
                "De Wereld Draait Door / DWDD",
                "Dokter Tinus, Goede Tijden Slechte Tijden en andere series",
                "Natuur- en reisprogramma's",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is NPO Start gratis?</p>
                <p className="text-senior-base text-gray-700">Ja, NPO Start is volledig gratis. U heeft geen account nodig om programma&apos;s te kijken.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoe lang blijven programma&apos;s beschikbaar?</p>
                <p className="text-senior-base text-gray-700">De meeste programma&apos;s blijven enkele weken tot maanden beschikbaar. Sommige zijn vanwege auteursrechten maar kort te zien.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik NPO Start ook op mijn televisie kijken?</p>
                <p className="text-senior-base text-gray-700">Ja. Op een Smart TV kunt u de NPO Start app installeren via de app-winkel van uw televisie.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/netflix" className="text-senior-base font-bold text-primary hover:underline">Netflix gebruiken →</Link></li>
              <li><Link href="/uitleg/youtube-tv" className="text-senior-base font-bold text-primary hover:underline">YouTube kijken op tv →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
