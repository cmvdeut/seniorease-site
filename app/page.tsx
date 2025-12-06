import Link from 'next/link';
import Image from 'next/image';
import MobileDownload from './components/MobileDownload';
import DemoDownload from './components/DemoDownload';

// YouTube kanaal URL - Pas aan naar jouw kanaal URL
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL'; // Of: https://www.youtube.com/channel/YOUR_CHANNEL_ID

export default function Home() {
  // Structured Data (JSON-LD) voor SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SeniorEase",
    "description": "Handige digitale tools speciaal ontworpen voor senioren. Beheer uw boeken collectie, gebruik rekenmachine, kalender en meer.",
    "url": "https://seniorease.nl",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web, Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Web versie: gratis op alle apparaten. APK download: €2,99 eenmalig voor Android"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    },
    "featureList": [
      "Bibliotheek beheer",
      "Barcode scanner",
      "Rekenmachine",
      "Kalender",
      "Grote klok",
      "Puzzels",
      "Grote teksten en knoppen",
      "Toegankelijk voor senioren"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Senioren, Ouderen"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SeniorEase",
    "url": "https://seniorease.nl",
    "logo": "https://seniorease.nl/heart-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://seniorease.nl/contact"
    }
  };

  return (
    <>
      {/* Structured Data voor SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <main className="min-h-screen bg-neutral-cream">
        {/* Header */}
        <header className="bg-white border-b-2 border-neutral-stone py-6">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4">
              <Image
                src="/heart-logo.png"
                alt="SeniorEase logo - Handige technologie voor senioren"
                width={128}
                height={128}
                className="w-32 h-32"
                priority
              />
              <div>
                <h1 className="text-senior-2xl font-bold text-primary mb-0.5">
                  SeniorEase
                </h1>
                <p className="text-senior-sm text-gray-600">
                  Handige technologie zonder gedoe • Test update 2025-01-27
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Bibliotheek en Mobiele Download onder elkaar */}
        <section className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Bibliotheek Hero Card - 60-40 interne verdeling - BOVENAAN */}
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Linker deel - 60% (3/5) */}
                <div className="md:col-span-3 bg-gradient-to-r from-primary/20 to-primary/10 p-6 md:p-8">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-5xl md:text-6xl">📚</div>
                    <div className="text-center md:text-left">
                      <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
                        Mijn Bibliotheek
                      </h2>
                      <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-3">
                        Beheer uw boeken collectie met gemak. Scan barcodes, voeg boeken toe en houd alles bij in één overzichtelijke app.
                      </p>
                      <Link
                        href="/bibliotheek"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                                 hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        → Open Bibliotheek
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Rechter deel - 40% (2/5) - Demo Download */}
                <div className="md:col-span-2 bg-white p-6 md:p-8 flex items-center justify-center">
                  <DemoDownload />
                </div>
              </div>
            </div>

            {/* Mobiele App Download Card */}
            <div className="bg-white rounded-2xl shadow-xl border-4 border-secondary overflow-hidden">
              <MobileDownload />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-senior-2xl md:text-senior-3xl font-bold text-center text-primary mb-8">
              Alles wat u nodig heeft
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Rekenmachine */}
              <Link 
                href="/rekenmachine"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🧮
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Rekenmachine
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Grote, duidelijke rekenmachine met grote knoppen. Perfect voor dagelijkse berekeningen.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Gebruik rekenmachine</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Kalender */}
              <Link 
                href="/kalender"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      📅
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Kalender
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Overzichtelijke maandkalender met grote datums. Plan uw activiteiten en afspraken.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Bekijk kalender</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Klok */}
              <Link 
                href="/klok"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🕐
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Grote Klok
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Grote, duidelijke klok met digitale en analoge weergave. Altijd zichtbaar.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Bekijk klok</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Puzzels */}
              <Link 
                href="/puzzels"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🧩
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Puzzels
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Leuke puzzels en breinbrekers om uw geest scherp te houden. Verschillende moeilijkheidsgraden.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Speel puzzels</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Afvinken */}
              <Link 
                href="/afvinken"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Afvinklijst
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Maak takenlijsten en vink ze af. Perfect voor boodschappen, taken en herinneringen.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Maak lijst</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Nuttige Links */}
              <Link 
                href="/nuttige-links"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🔗
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Contact & Activiteiten
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Reismaatjes, buddy's en nieuwe contacten vinden. Betrouwbare manieren om uw kennissenkring uit te breiden.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Bekijk links</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/animaties"
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      📹
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Video Tutorials & Animaties
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Interactieve stap-voor-stap uitleg van alle SeniorEase tools. Leer hoe alles werkt!
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Bekijk animaties</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>
            </div>

          {/* Tools Sectie */}
          <div className="mb-6">
            <h3 className="text-senior-xl font-bold text-primary mb-4">
              Alle Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                href="/tools"
                className="bg-white rounded-xl p-4 text-center border-2 border-neutral-stone hover:border-primary transition-all shadow-md hover:shadow-lg"
              >
                <div className="text-3xl mb-2">🛠️</div>
                <p className="text-senior-xs font-bold text-gray-800">Alle Tools</p>
              </Link>
            </div>
          </div>
          </div>
        </section>

        {/* YouTube Sectie */}
        <section className="container mx-auto px-6 py-12 bg-white border-t-2 border-neutral-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
              📺 Video Tutorials
            </h2>
            <p className="text-senior-base text-gray-700 mb-6">
              Bekijk onze video tutorials op YouTube om te leren hoe u alle SeniorEase tools gebruikt.
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                       transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              → Bekijk YouTube Kanaal
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t-2 border-neutral-stone py-8 mt-12">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h3 className="text-senior-base font-bold text-primary mb-3">SeniorEase</h3>
                  <p className="text-senior-xs text-gray-600">
                    Handige digitale tools speciaal ontworpen voor senioren. Eenvoudig, duidelijk en toegankelijk.
                  </p>
                </div>
                <div>
                  <h3 className="text-senior-base font-bold text-primary mb-3">Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/hulp" className="text-senior-xs text-gray-600 hover:text-primary">
                        Hulp & Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-senior-xs text-gray-600 hover:text-primary">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-senior-xs text-gray-600 hover:text-primary">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-senior-xs text-gray-600 hover:text-primary">
                        Voorwaarden
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-senior-base font-bold text-primary mb-3">Download</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/download" className="text-senior-xs text-gray-600 hover:text-primary">
                        Mobiele App Download
                      </Link>
                    </li>
                    <li>
                      <Link href="/tiktok-download" className="text-senior-xs text-gray-600 hover:text-primary">
                        TikTok Download Link
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t-2 border-neutral-stone pt-6 text-center">
                <p className="text-senior-xs text-gray-600">
                  © {new Date().getFullYear()} SeniorEase. Alle rechten voorbehouden.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
