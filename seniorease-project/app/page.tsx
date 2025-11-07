import Link from 'next/link';
import Image from 'next/image';
import MobileDownload from './components/MobileDownload';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-4">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Image 
              src="/heart-logo.png" 
              alt="SeniorEase hartlogo" 
              width={100} 
              height={100}
              className="w-32 h-32"
            />
            <div>
              <h1 className="text-senior-2xl font-bold text-primary mb-0.5">
                SeniorEase
              </h1>
              <p className="text-senior-sm text-gray-600">
                Handige technologie zonder gedoe
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Bibliotheek en Mobiele Download onder elkaar */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Bibliotheek Hero Card - 60-40 interne verdeling */}
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
                    <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-2">
                      <span className="font-bold">Gratis op de PC</span>
                    </p>
                    <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                      Beheer uw boeken en muziek collectie. Scan barcodes met uw camera of voer handmatig in.
                    </p>
                    <Link 
                      href="/bibliotheek"
                      className="inline-block bg-primary text-white px-8 py-3 rounded-xl text-senior-lg font-bold
                               hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      → Open Mijn Bibliotheek
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Rechter deel - 40% (2/5) - Feature highlights verticaal uitgelijnd */}
              <div className="md:col-span-2 bg-white p-6 md:p-8 flex items-center justify-center">
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Boeken</h3>
                    <p className="text-senior-xs text-gray-600">Bewaar al uw boeken op één plek</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">💿</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Muziek</h3>
                    <p className="text-senior-xs text-gray-600">Albums en CD's bijhouden</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">📷</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Barcode Scan</h3>
                    <p className="text-senior-xs text-gray-600">Scan snel met uw camera</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobiele Download Card - 60-40 interne verdeling */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Linker deel - 60% (3/5) */}
              <div className="md:col-span-3 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="text-5xl md:text-6xl">📱</div>
                  <div className="text-center md:text-left">
                    <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
                      Gebruik op uw telefoon of tablet
                    </h2>
                    <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-1">
                      Installeer de app op uw mobiele apparaat
                    </p>
                    <p className="text-senior-sm text-gray-600 mb-4">
                      € 2,99 eenmalig • Geen abonnement
                    </p>
                    <a
                      href="/betalen"
                      className="inline-block bg-primary text-white px-8 py-3 rounded-xl text-senior-lg font-bold
                               hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      💳 Download mobiele versie
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Rechter deel - 40% (2/5) - QR Code met instructies */}
              <div className="md:col-span-2 bg-white p-6 md:p-8 flex items-center justify-center">
                <MobileDownload />
              </div>
            </div>
          </div>

          {/* Informatie Sectie */}
          <div className="mb-6">
            <h3 className="text-senior-lg font-bold text-gray-700 mb-4 text-center">
              📖 Informatie & Links
            </h3>
            <div className="max-w-2xl mx-auto space-y-4">
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
          </div>

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

      {/* Features Section */}
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
                  Werkt op computer, tablet en telefoon. Installeer als app!
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4">
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
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-senior-base font-bold mb-2">Contact</h3>
                <Link href="/contact" className="text-senior-xs text-gray-300 hover:text-white transition-colors block py-2">
                  Neem contact op
                </Link>
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
