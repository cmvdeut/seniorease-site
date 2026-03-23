import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://seniorease.nl/uitleg/facetime" },
    { "@type": "ListItem", "position": 3, "name": "FaceTime gebruiken", "item": "https://seniorease.nl/uitleg/facetime" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "FaceTime gebruiken op iPhone of iPad",
  "description": "Stap voor stap videobellen via FaceTime op uw iPhone of iPad.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "FaceTime openen", "text": "Tik op het groene FaceTime-icoontje op uw iPhone of iPad. Het ziet eruit als een videocamera." },
    { "@type": "HowToStep", "position": 2, "name": "Persoon kiezen", "text": "Tik op het plusje rechtsboven. Typ de naam van de persoon die u wilt bellen. Die persoon moet ook een iPhone, iPad of Mac hebben." },
    { "@type": "HowToStep", "position": 3, "name": "Videobellen starten", "text": "Tik op 'Video' om een FaceTime-gesprek te starten. De ander krijgt een melding en kan opnemen." },
    { "@type": "HowToStep", "position": 4, "name": "Gesprek beëindigen", "text": "Tik op het rode telefoonknopje om het gesprek te beëindigen." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Werkt FaceTime ook op Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FaceTime is een Apple-dienst en werkt alleen op iPhone, iPad en Mac. Heeft de andere persoon een Android-telefoon? Gebruik dan WhatsApp videobellen of Zoom."
      }
    },
    {
      "@type": "Question",
      "name": "Is FaceTime gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, FaceTime is volledig gratis. U heeft alleen wifi of mobiele data nodig. Er zijn geen bel- of sms-kosten."
      }
    },
    {
      "@type": "Question",
      "name": "Ik zie mezelf ondersteboven. Hoe los ik dat op?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Draai uw telefoon rechtop. FaceTime past het beeld automatisch aan. Zet uw telefoon neer met het scherm naar u toe en leun iets achterover voor een prettige kijkhoek."
      }
    },
  ],
};

export const metadata = {
  title: "FaceTime gebruiken op iPhone of iPad – uitleg voor senioren",
  description: "Hoe belt u gratis via FaceTime op uw iPhone of iPad? Stap-voor-stap uitleg voor senioren. Familie en vrienden zien terwijl u belt.",
};

export default function FaceTimePage() {
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
              FaceTime gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Gratis videobellen op uw iPhone of iPad — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is FaceTime */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-4">
              Wat is FaceTime?
            </h2>
            <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
              FaceTime is een gratis app van Apple waarmee u kunt videobellen met familie en vrienden.
              U ziet elkaar tijdens het bellen — alsof u tegenover elkaar zit.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              FaceTime staat al op uw iPhone of iPad — u hoeft niets te installeren.
              De andere persoon heeft ook een iPhone, iPad of Mac nodig.
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
              <p className="text-senior-base font-bold text-gray-800">📱 Heeft de andere persoon een Android?</p>
              <p className="text-senior-base text-gray-700 mt-1">Gebruik dan <Link href="/uitleg/videobellen" className="text-primary font-bold hover:underline">WhatsApp videobellen</Link> of <Link href="/uitleg/zoom" className="text-primary font-bold hover:underline">Zoom</Link> — die werken op alle telefoons.</p>
            </div>
          </section>

          {/* Hoe werkt het */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
              Videobellen via FaceTime
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "FaceTime openen",
                  uitleg: "Zoek het groene icoontje met een witte videocamera op uw iPhone of iPad. Tik erop om FaceTime te openen.",
                  tip: "Staat FaceTime er niet op? Ga naar Instellingen → FaceTime en zet het aan.",
                },
                {
                  stap: "Persoon kiezen",
                  uitleg: "Tik rechtsboven op het plusje (+). Typ de naam van de persoon die u wilt bellen — uw telefoon zoekt automatisch in uw contactenlijst.",
                },
                {
                  stap: "Tik op 'Video'",
                  uitleg: "U ziet twee knoppen: 'Audio' (alleen geluid) en 'Video' (met beeld). Tik op 'Video' voor een videogesprek. De ander krijgt nu een melding op zijn telefoon.",
                },
                {
                  stap: "Wachten tot de ander opneemt",
                  uitleg: "U hoort een beltoon. Zodra de ander opneemt, ziet u hem of haar op uw scherm. U ziet uzelf klein in een hoekje.",
                },
                {
                  stap: "Gesprek beëindigen",
                  uitleg: "Tik op het rode telefoonknopje (met het rode rondje) om op te hangen.",
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

          {/* FaceTime ontvangen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-4">
              Een FaceTime-gesprek ontvangen
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Als iemand u belt via FaceTime, verschijnt er een melding op uw scherm met de naam van de beller.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-center bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <span className="text-4xl">✅</span>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Opnemen</p>
                  <p className="text-senior-base text-gray-700">Tik op de groene knop of veeg omhoog op de melding.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <span className="text-4xl">❌</span>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Weigeren</p>
                  <p className="text-senior-base text-gray-700">Tik op de rode knop als u nu niet kunt praten.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Handige tips */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">Handige tips</h2>
            <ul className="space-y-4">
              {[
                { tip: "Zet uw telefoon neer op een tafel en leun iets achterover — zo hoeft u hem niet vast te houden en ziet de ander uw gezicht goed." },
                { tip: "Gebruik wifi voor de beste beeldkwaliteit. Via mobiele data kan het beeld soms haperen." },
                { tip: "Spreek normaal — u hoeft niet hard te praten. De microfoon van uw iPhone vangt uw stem prima op." },
                { tip: "Zit met uw rug naar het licht (raam of lamp). Dan ziet uw gezicht er helder uit voor de ander." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1 text-xl">💡</span>
                  <span>{item.tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Werkt FaceTime ook op Android?</p>
                <p className="text-senior-base text-gray-700">Nee, FaceTime werkt alleen op iPhone, iPad en Mac. Heeft de ander een Android? Gebruik dan <Link href="/uitleg/videobellen" className="text-primary font-bold hover:underline">WhatsApp videobellen</Link>.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is FaceTime gratis?</p>
                <p className="text-senior-base text-gray-700">Ja, FaceTime is volledig gratis. U heeft alleen internet nodig.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Ik zie mezelf ondersteboven. Hoe los ik dat op?</p>
                <p className="text-senior-base text-gray-700">Draai uw telefoon rechtop. FaceTime past het beeld automatisch aan.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over videobellen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/zoom" className="text-senior-base font-bold text-primary hover:underline">Zoom gebruiken →</Link></li>
              <li><Link href="/uitleg/videobellen" className="text-senior-base font-bold text-primary hover:underline">Videobellen via WhatsApp →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
