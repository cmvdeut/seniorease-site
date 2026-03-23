import Link from 'next/link';
import Image from 'next/image';
import MobileDownload from './components/MobileDownload';
import DemoDownload from './components/DemoDownload';
import GebruikMijnBibliotheekButton from './components/GebruikMijnBibliotheekButton';
import LanguageSwitcher from './components/LanguageSwitcher';
import NieuwsbriefBlok from './components/NieuwsbriefBlok';
import { artikelen } from './digitale-hulp/artikelen';

// Social Media URLs
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/SeniorEaseNL';
const FACEBOOK_GROEP_URL = 'https://www.facebook.com/SeniorEaseNL'; // Gebruik FACEBOOK_PAGE_URL; vervang door groep-URL zodra u een Facebook-groep heeft

const NIEUWSTE_TIPS_AANTAL = 4;

export default function Home() {
  const nieuwsteTips = artikelen.slice(-NIEUWSTE_TIPS_AANTAL);

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
    "description": "Handige technologie zonder gedoe voor senioren",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://seniorease.nl/contact"
    }
  };

  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Structured Data voor SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      {/* Header – hulpcentrum-uitstraling */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Hero: duidelijke hoofdboodschap */}
            <div className="flex items-center justify-between gap-6 flex-wrap py-6">
              <div className="flex items-center gap-4">
                <Link href="/over-ons" title="Wie zijn wij?">
                  <Image
                    src="/heart-logo.png"
                    alt="SeniorEase logo - Digitale hulp voor senioren"
                    width={100}
                    height={100}
                    className="w-32 h-32 hover:opacity-80 transition-opacity"
                    priority
                  />
                </Link>
                <div>
                  <h1 className="text-senior-2xl font-bold text-primary mb-1">
                    Digitale hulp voor senioren
                  </h1>
                  <p className="text-senior-base font-semibold text-gray-800 mb-0.5">
                    Technologie simpel uitgelegd – stap voor stap.
                  </p>
                  <p className="text-senior-sm text-gray-600">
                    Leer omgaan met smartphone, computer, internet en AI zonder stress.
                  </p>
                </div>
              </div>
              
              {/* Social Media Links & Language Switcher */}
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-senior-base font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  aria-label="Volg ons op Facebook"
                >
                  <span className="text-xl">📘</span>
                  <span className="hidden sm:inline">Volg ons op Facebook</span>
                  <span className="sm:hidden">Facebook</span>
                </a>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-senior-base font-bold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  aria-label="Abonneer op ons YouTube kanaal"
                >
                  <span className="text-xl">📺</span>
                  <span className="hidden sm:inline">Abonneer op YouTube</span>
                  <span className="sm:hidden">YouTube</span>
                </a>
              </div>
            </div>

            {/* Zoekgerichte introductie – visueel opvallend */}
            <div className="w-full py-6 border-t-2 border-neutral-stone">
              <p className="text-senior-lg font-bold text-primary mb-3" id="waarmee-helpen">
                Waarmee kunnen we u helpen?
              </p>
              <p className="text-senior-sm text-gray-700 mb-4">
                Typ hieronder uw onderwerp. U komt dan bij uitleg die bij u past.
              </p>
            </div>
            <form action="/digitale-hulp" method="get" className="w-full pb-6 border-b-2 border-neutral-stone" aria-labelledby="waarmee-helpen">
              <label htmlFor="home-zoek" className="sr-only">
                Zoek naar een onderwerp (bijv. WhatsApp, wifi, foto&apos;s)
              </label>
              <input
                id="home-zoek"
                type="search"
                name="q"
                placeholder="Waarmee kunnen we u helpen?"
                className="w-full text-senior-base md:text-senior-lg px-5 py-4 rounded-xl border-2 border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-gray-800 placeholder-gray-500"
                aria-describedby="home-zoek-hint"
              />
              <p id="home-zoek-hint" className="text-senior-sm text-gray-600 mt-2">
                Zoek op trefwoorden, bijv. cloud, wifi, fiets, WhatsApp, e-mail, wachtwoord
              </p>
            </form>

            {/* Categorieën digitale hulp – vijf keuzes */}
            <div className="py-6 border-t-2 border-neutral-stone">
              <h2 className="text-senior-base font-bold text-gray-700 mb-4 sr-only">
                Kies een onderwerp
              </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" aria-label="Categorieën digitale hulp">
              <Link
                href="/digitale-hulp/smartphone"
                className="flex items-center justify-center gap-2 text-senior-base font-bold text-primary bg-white border-2 border-primary/50 hover:border-primary hover:bg-primary/10 rounded-xl px-4 py-4 transition-colors min-h-[56px]"
              >
                <span className="text-2xl" aria-hidden>📱</span>
                Smartphone hulp
              </Link>
              <Link
                href="/digitale-hulp/computer"
                className="flex items-center justify-center gap-2 text-senior-base font-bold text-primary bg-white border-2 border-primary/50 hover:border-primary hover:bg-primary/10 rounded-xl px-4 py-4 transition-colors min-h-[56px]"
              >
                <span className="text-2xl" aria-hidden>💻</span>
                Computer hulp
              </Link>
              <Link
                href="/digitale-hulp/internet-email"
                className="flex items-center justify-center gap-2 text-senior-base font-bold text-primary bg-white border-2 border-primary/50 hover:border-primary hover:bg-primary/10 rounded-xl px-4 py-4 transition-colors min-h-[56px]"
              >
                <span className="text-2xl" aria-hidden>🌐</span>
                Internet &amp; e-mail
              </Link>
              <Link
                href="/digitale-hulp/veilig-internet"
                className="flex items-center justify-center gap-2 text-senior-base font-bold text-primary bg-white border-2 border-primary/50 hover:border-primary hover:bg-primary/10 rounded-xl px-4 py-4 transition-colors min-h-[56px]"
              >
                <span className="text-2xl" aria-hidden>🔐</span>
                Veilig internet
              </Link>
              <Link
                href="/digitale-hulp/ai"
                className="flex items-center justify-center gap-2 text-senior-base font-bold text-primary bg-white border-2 border-primary/50 hover:border-primary hover:bg-primary/10 rounded-xl px-4 py-4 transition-colors min-h-[56px]"
              >
                <span className="text-2xl" aria-hidden>🤖</span>
                AI uitleg
              </Link>
            </div>
            </div>

            {/* Ontdek SeniorEase – wat kan ik op de site doen (digitale hulp staat hierboven al in de 5 categorieknoppen) */}
            <section className="py-8 border-t-2 border-neutral-stone" aria-labelledby="ontdek-seniorease-titel">
              <h2 id="ontdek-seniorease-titel" className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
                Ontdek SeniorEase
              </h2>
              <p className="text-senior-base text-gray-700 mb-6">
                Praktische hulp, inspiratie en handige tools voor senioren.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/hobbys"
                  className="flex flex-col rounded-xl border-2 border-primary/50 bg-white p-4 text-left hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl mb-2" aria-hidden>🎨</span>
                  <h3 className="text-senior-base font-bold text-primary mb-1">Hobby&apos;s</h3>
                  <p className="text-senior-sm text-gray-700 leading-relaxed">
                    Tips voor muziek luisteren, foto&apos;s ordenen, e-books lezen en apps voor uw e-bike.
                  </p>
                </Link>
                <Link
                  href="/extras"
                  className="flex flex-col rounded-xl border-2 border-primary/50 bg-white p-4 text-left hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl mb-2" aria-hidden>🛠️</span>
                  <h3 className="text-senior-base font-bold text-primary mb-1">Handige tools</h3>
                  <p className="text-senior-sm text-gray-700 leading-relaxed">
                    Kalender, rekenmachine, afvinklijst en andere hulpmiddelen — altijd bij de hand.
                  </p>
                </Link>
                <div className="flex flex-col rounded-xl border-4 border-primary bg-white p-4 shadow-md">
                  <span className="text-2xl mb-2" aria-hidden>📚</span>
                  <h3 className="text-senior-base font-bold text-primary mb-1">Mijn Bibliotheek</h3>
                  <p className="text-senior-sm text-gray-700 leading-relaxed mb-3">
                    Weet altijd welke boeken u al heeft. Gratis op de pc, uitproberen op telefoon of tablet.
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <GebruikMijnBibliotheekButton variant="small" />
                    <a
                      href={YOUTUBE_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-primary border-2 border-primary px-3 py-1.5 rounded-lg text-senior-sm font-bold hover:bg-primary/10 transition-all text-center"
                    >
                      ▶️ Uitlegvideo
                    </a>
                  </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-senior-sm font-bold text-primary hover:text-primary-dark list-none flex items-center gap-1">
                      <span>ℹ️ Wat is het?</span>
                    </summary>
                    <div className="mt-3 space-y-4 text-senior-sm text-gray-700 border-t border-primary/20 pt-3">
                      <div>
                        <p className="font-bold text-primary mb-1">Herkent u dit?</p>
                        <p>U staat in de boekhandel en twijfelt: <strong>"Heb ik dit boek al, of niet?"</strong> Met Mijn Bibliotheek ziet u het meteen — thuis op de pc, of onderweg op uw telefoon.</p>
                      </div>
                      <div>
                        <p className="font-bold text-primary mb-1">Hoe werkt het?</p>
                        <p>• <strong>Pc:</strong> volledig gratis, zonder beperking.</p>
                        <p>• <strong>Telefoon/tablet:</strong> eerst gratis proberen (10 boeken). Daarna kunt u de volledige versie eenmalig aanschaffen voor € 2,99. Geen abonnement.</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            {/* Populaire onderwerpen – waar anderen naar zoeken */}
            <div className="py-6 border-t-2 border-neutral-stone">
              <h2 className="text-senior-lg font-bold text-primary mb-4">
                Populaire uitleg
              </h2>
              <p className="text-senior-sm text-gray-600 mb-4">
                Waar anderen vaak naar zoeken:
              </p>
              <ul className="space-y-2" aria-label="Populaire uitleg onderwerpen">
                <li>
                  <Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline block py-1.5">
                    WhatsApp uitleg
                  </Link>
                </li>
                <li>
                  <Link href="/uitleg/qr-code" className="text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline block py-1.5">
                    QR-code scannen
                  </Link>
                </li>
                <li>
                  <Link href="/uitleg/wifi" className="text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline block py-1.5">
                    WiFi instellen
                  </Link>
                </li>
                <li>
                  <Link href="/uitleg/veiligheid" className="text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline block py-1.5">
                    Oplichting herkennen
                  </Link>
                </li>
                <li>
                  <Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline block py-1.5">
                    Foto&apos;s opslaan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nieuwste artikelen – dynamisch uit artikelen; later eventueel uit CMS */}
            <div className="py-6 border-t-2 border-neutral-stone">
              <h2 className="text-senior-lg font-bold text-primary mb-4">
                Nieuwste uitleg
              </h2>
              <p className="text-senior-sm text-gray-600 mb-4">
                Recent toegevoegde uitleg:
              </p>
              <ul className="space-y-3" aria-label="Nieuwste artikelen">
                {nieuwsteTips.map((artikel) => (
                      <li key={artikel.slug}>
                        <Link
                          href={`/digitale-hulp/${artikel.slug}`}
                          className="block bg-white border-2 border-primary/30 hover:border-primary hover:bg-primary/5 rounded-xl p-4 transition-colors"
                        >
                          <span className="text-senior-base font-bold text-primary block mb-1">
                            {artikel.title}
                          </span>
                          <span className="text-senior-sm text-gray-700">
                            {artikel.description}
                          </span>
                        </Link>
                      </li>
                ))}
              </ul>
            </div>

            {/* Vertrouwen – betrouwbaarheid voor senioren */}
            <div className="py-6 border-t-2 border-neutral-stone">
              <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed">
                <strong className="text-primary">SeniorEase</strong> helpt senioren om technologie makkelijker te gebruiken. Duidelijke uitleg, stap voor stap, in uw eigen tempo.
              </p>
            </div>

            {/* Community-verwijzing – Facebook voor tips en hulp */}
            <div className="py-6 border-t-2 border-neutral-stone">
              <h2 className="text-senior-lg font-bold text-primary mb-3">
                Vragen? Stel ze in onze community
              </h2>
              <p className="text-senior-base text-gray-800 mb-3">
                Heeft u een digitale vraag? Volg SeniorEase op Facebook voor tips en hulp.
              </p>
              <p className="text-senior-sm text-gray-700 mb-4">
                Veel mensen stellen hier hun vraag. U krijgt tips van ons en van andere senioren.
              </p>
              <a
                href={FACEBOOK_GROEP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-senior-base font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] border-2 border-[#1877F2] rounded-xl px-6 py-4 transition-colors min-h-[56px] mb-6"
                aria-label="Ga naar onze Facebook-pagina om uw vraag te stellen"
              >
                <span aria-hidden>📘</span>
                Stel uw vraag op onze Facebook-pagina
              </a>
              <p className="text-senior-sm font-semibold text-gray-600 mb-3">
                Recente vragen in de groep:
              </p>
              <ul className="space-y-3" aria-label="Voorbeelden van vragen in de Facebook groep">
                <li className="bg-white border-2 border-neutral-stone rounded-xl p-4">
                  <p className="text-senior-base text-gray-800">&quot;Hoe bewaar ik foto&apos;s die ik via WhatsApp krijg?&quot;</p>
                  <p className="text-senior-sm text-gray-500 mt-1">— Gerrit, 2 dagen geleden</p>
                </li>
                <li className="bg-white border-2 border-neutral-stone rounded-xl p-4">
                  <p className="text-senior-base text-gray-800">&quot;Mijn wifi werkt niet meer. Waar moet ik kijken?&quot;</p>
                  <p className="text-senior-sm text-gray-500 mt-1">— Elena, 1 week geleden</p>
                </li>
                <li className="bg-white border-2 border-neutral-stone rounded-xl p-4">
                  <p className="text-senior-base text-gray-800">&quot;Hoe maak ik de letters op mijn telefoon groter?&quot;</p>
                  <p className="text-senior-sm text-gray-500 mt-1">— Ria, 1 week geleden</p>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </header>

      {/* Hero Section - Bibliotheek */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Tools Sectie */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-senior-lg font-bold text-gray-700">
                🛠️ Handige Tools
              </h3>
              <Link 
                href="/tools"
                className="text-senior-base text-primary hover:text-primary-dark font-semibold hover:underline"
              >
                Bekijk alle tools →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
              {/* Foto Archief */}
              <Link 
                href="/foto-archief" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      📷
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Foto Archief
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Identificeer personen op oude familiefoto's. Handig voor stamboom makers.
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Rekenmachine */}
              <Link 
                href="/rekenmachine" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🔢
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Rekenmachine
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Grote knoppen en duidelijk display. Eenvoudig rekenen.
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Afvinken maar! */}
              <Link 
                href="/afvinken" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Afvinken maar!
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Lijstjes maken en eenvoudig afvinken. Niets vergeten!
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Verjaardagskalender */}
              <Link 
                href="/kalender" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      📅
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Verjaardags-<br />kalender
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Verjaardagen bijhouden met filters.
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Grote Klok */}
              <Link 
                href="/klok" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🕐
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Grote Klok
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Duidelijke weergave van tijd en datum met extra grote cijfers.
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>

              {/* Dagelijkse Puzzel */}
              <Link 
                href="/puzzels" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🧩
                    </div>
                    <h3 className="text-senior-sm font-bold text-gray-800 text-center leading-tight">
                      Dagelijkse Puzzel
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed text-center">
                    Elke dag een nieuwe puzzel! Sudoku, woordzoeker en meer.
                  </p>
                  <div className="flex items-center justify-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
                    <span className="text-senior-xs">Speel</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-8 border-t-2 border-neutral-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl">
                    📘
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                    Op onze Facebookpagina delen we tips,<br />
                    uitleg en antwoorden op vragen.
                  </p>
                  <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-6">
                    Veel mensen vinden het prettig<br />
                    om daar eerst mee te lezen.
                  </p>
                  <a 
                    href={FACEBOOK_PAGE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                             hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    👉 Volg SeniorEase op Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mx-auto px-6">
        <NieuwsbriefBlok />
      </div>

      <section className="bg-white py-6 border-t-2 border-neutral-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4 text-center">
              Waarom SeniorEase?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                  👁️
                </div>
                <h3 className="text-senior-base font-bold text-gray-800 mb-2">
                  Extra Leesbaar
                </h3>
                <p className="text-senior-xs text-gray-600 leading-relaxed">
                  Grote teksten en duidelijke knoppen voor optimaal leescomfort
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                  ✓
                </div>
                <h3 className="text-senior-base font-bold text-gray-800 mb-2">
                  Eenvoudig
                </h3>
                <p className="text-senior-xs text-gray-600 leading-relaxed">
                  Intuïtieve interfaces zonder ingewikkelde menu's of verborgen functies
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                  📱
                </div>
                <h3 className="text-senior-base font-bold text-gray-800 mb-2">
                  Overal te gebruiken
                </h3>
                <p className="text-senior-xs text-gray-600 leading-relaxed">
                  Werkt op computer, tablet en telefoon. Installeer Mijn Bibliotheek!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-4">
              <div className="text-center sm:text-left">
                <h3 className="text-senior-base font-bold mb-2">Privacybeleid</h3>
                <Link href="/privacy" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Lees ons privacybeleid
                </Link>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-senior-base font-bold mb-2">Hulp</h3>
                <Link href="/hulp" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Veelgestelde vragen
                </Link>
                <Link href="/digitale-hulp" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Digitale hulp voor senioren
                </Link>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-senior-base font-bold mb-2">Contact</h3>
                <Link href="/contact" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Neem contact op
                </Link>
                <Link href="/over-ons" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Over ons
                </Link>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-senior-base font-bold mb-2">Video's</h3>
                <a 
                  href={YOUTUBE_CHANNEL_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2"
                >
                  📺 Bekijk op YouTube
                </a>
                <p className="text-senior-xs text-gray-400 mt-1">
                  Instructievideo's beschikbaar
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4 text-center">
              <p className="text-senior-xs mb-1">
                © 2025 SeniorEase.nl
              </p>
              <p className="text-senior-xs text-gray-400">
                Handige technologie zonder gedoe
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
