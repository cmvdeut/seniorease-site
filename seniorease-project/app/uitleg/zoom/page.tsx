import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://seniorease.nl/uitleg/zoom" },
    { "@type": "ListItem", "position": 3, "name": "Zoom gebruiken", "item": "https://seniorease.nl/uitleg/zoom" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Deelnemen aan een Zoom-vergadering",
  "description": "Stap voor stap Zoom installeren en deelnemen aan een videogesprek.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Zoom installeren", "text": "Open de App Store of Play Store, zoek op 'Zoom' en tik op Installeren." },
    { "@type": "HowToStep", "position": 2, "name": "Link of code ontvangen", "text": "U ontvangt een uitnodiging via e-mail of WhatsApp met een link of een Meeting ID en wachtwoord." },
    { "@type": "HowToStep", "position": 3, "name": "Deelnemen via de link", "text": "Tik op de link in de uitnodiging. Zoom opent vanzelf en vraagt of u wilt deelnemen. Tik op 'Deelnemen'." },
    { "@type": "HowToStep", "position": 4, "name": "Microfoon en camera inschakelen", "text": "Tik onderin op het microfoon- en camera-icoontje om uzelf hoorbaar en zichtbaar te maken." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Moet ik een account aanmaken voor Zoom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee. Als u alleen deelneemt aan een vergadering van iemand anders, heeft u geen account nodig. U tikt gewoon op de link en voert eventueel uw naam in."
      }
    },
    {
      "@type": "Question",
      "name": "Is Zoom gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Zoom is gratis te gebruiken voor deelnemers. De organisator van een vergadering kan gratis gesprekken houden tot 40 minuten met meerdere deelnemers."
      }
    },
    {
      "@type": "Question",
      "name": "Ze kunnen mij niet zien of horen. Wat doe ik?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Controleer onderin het scherm of het microfoon- en camera-icoontje niet doorgestreept zijn. Tik erop om ze in te schakelen. Geef Zoom toestemming voor microfoon en camera als uw telefoon daarom vraagt."
      }
    },
  ],
};

export const metadata = {
  title: "Zoom gebruiken voor senioren – videobellen stap voor stap",
  description: "Hoe doet u mee aan een Zoom-vergadering? Eenvoudige uitleg voor senioren: installeren, deelnemen via een link en uw microfoon en camera instellen.",
};

export default function ZoomPage() {
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
              Zoom gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Deelnemen aan een videogesprek via Zoom — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is Zoom */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is Zoom?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Zoom is een app om met meerdere mensen tegelijk te videobellen.
              U ziet iedereen op uw scherm en zij zien u. Handig voor een gesprek met de familie,
              een vergadering, of contact met uw huisarts of specialist op afstand.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              U hoeft zelf geen vergadering aan te maken. Als iemand anders u uitnodigt,
              tikt u gewoon op de link — en u bent er al.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "👨‍👩‍👧‍👦", label: "Met meerdere mensen tegelijk" },
                { icon: "🔗", label: "Deelnemen via een link" },
                { icon: "💻", label: "Op telefoon, tablet of computer" },
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
              Stap 1: Zoom installeren
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-blue-900 mb-3">📱 Op Android</h3>
                <ol className="space-y-2 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>Play Store</strong>.</li>
                  <li>Zoek op <strong>Zoom</strong>.</li>
                  <li>Tik op <strong>Installeren</strong> bij &quot;Zoom - One Platform to Connect&quot;.</li>
                </ol>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-gray-900 mb-3">🍎 Op iPhone of iPad</h3>
                <ol className="space-y-2 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>App Store</strong>.</li>
                  <li>Zoek op <strong>Zoom</strong>.</li>
                  <li>Tik op <strong>Krijg</strong> en bevestig met uw vingerafdruk of wachtwoord.</li>
                </ol>
              </div>
            </div>
            <p className="text-senior-sm text-gray-500 mt-4">
              U hoeft geen account aan te maken als u alleen deelneemt aan iemand anders zijn vergadering.
            </p>
          </section>

          {/* Deelnemen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Stap 2: Deelnemen aan een Zoom-gesprek
            </h2>
            <p className="text-senior-base text-gray-700 mb-6">
              U ontvangt een uitnodiging via e-mail of WhatsApp. Daarin staat een link of een Meeting ID met wachtwoord.
            </p>
            <ol className="space-y-6">
              {[
                {
                  stap: "Deelnemen via de link",
                  uitleg: "Tik op de blauwe link in uw e-mail of WhatsApp-bericht. Zoom opent vanzelf. Tik op 'Deelnemen aan vergadering' of 'Join'.",
                  tip: "Werkt de link niet? Zie hieronder hoe u kunt deelnemen met een Meeting ID.",
                },
                {
                  stap: "Uw naam invoeren",
                  uitleg: "Zoom vraagt hoe u wilt heten in het gesprek. Typ uw naam (bijvoorbeeld 'Oma Corrie') zodat de anderen weten wie u bent.",
                },
                {
                  stap: "Microfoon en camera inschakelen",
                  uitleg: "Kijk onderin het scherm. Als het microfoon-icoontje doorgestreept is, tik erop om het aan te zetten. Doe hetzelfde met het camera-icoontje zodat de anderen u kunnen zien.",
                },
                {
                  stap: "U bent verbonden!",
                  uitleg: "U ziet nu de andere deelnemers op uw scherm. Praat gewoon — de anderen horen u.",
                  tip: "Zit u in een ruimte met veel achtergrondgeluid? Schakel uw microfoon uit als u niet spreekt. Tik erop om het geluid te dempen.",
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

          {/* Meeting ID */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Deelnemen met een Meeting ID
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Heeft u een Meeting ID en wachtwoord gekregen in plaats van een link? Doe dan het volgende:
            </p>
            <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
              <li>Open de Zoom-app.</li>
              <li>Tik op <strong>Deelnemen aan vergadering</strong> (of &quot;Join a Meeting&quot;).</li>
              <li>Voer het <strong>Meeting ID</strong> in — een reeks cijfers zoals 123 456 7890.</li>
              <li>Tik op <strong>Deelnemen</strong> en voer het wachtwoord in als daar om gevraagd wordt.</li>
            </ol>
          </section>

          {/* FAQ */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Moet ik een account aanmaken?</p>
                <p className="text-senior-base text-gray-700">Nee. Als u alleen deelneemt, heeft u geen account nodig. Tik op de link en u bent er al.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Ze kunnen mij niet zien of horen. Wat doe ik?</p>
                <p className="text-senior-base text-gray-700">Kijk of het microfoon- en camera-icoontje onderin niet doorgestreept zijn. Tik erop om ze in te schakelen. Geef Zoom toestemming als uw telefoon daarom vraagt.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is Zoom gratis?</p>
                <p className="text-senior-base text-gray-700">Ja, deelnemen is altijd gratis. De organisator kan gratis gesprekken houden tot 40 minuten.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over videobellen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/facetime" className="text-senior-base font-bold text-primary hover:underline">FaceTime gebruiken (iPhone/iPad) →</Link></li>
              <li><Link href="/uitleg/videobellen" className="text-senior-base font-bold text-primary hover:underline">Videobellen via WhatsApp →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
