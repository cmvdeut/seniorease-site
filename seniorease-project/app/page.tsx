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
              width={60} 
              height={60}
              className="w-16 h-16"
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
              
              {/* Rechter deel - 40% (2/5) - Feature highlights horizontaal */}
              <div className="md:col-span-2 bg-white p-6 md:p-8 flex items-end">
                <div className="grid grid-cols-3 gap-3 w-full">
                  <div className="text-center p-3 bg-neutral-cream rounded-xl">
                    <div className="text-3xl mb-1">📚</div>
                    <h3 className="text-senior-xs font-bold text-gray-800 mb-0.5">Boeken</h3>
                    <p className="text-senior-xs text-gray-600">Bewaar</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-cream rounded-xl">
                    <div className="text-3xl mb-1">💿</div>
                    <h3 className="text-senior-xs font-bold text-gray-800 mb-0.5">Muziek</h3>
                    <p className="text-senior-xs text-gray-600">Albums</p>
                  </div>
                  <div className="text-center p-3 bg-neutral-cream rounded-xl">
                    <div className="text-3xl mb-1">📷</div>
                    <h3 className="text-senior-xs font-bold text-gray-800 mb-0.5">Barcode</h3>
                    <p className="text-senior-xs text-gray-600">Scan</p>
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
              
              {/* Rechter deel - 40% (2/5) - QR Code en features */}
              <div className="md:col-span-2 bg-white p-6 md:p-8 flex items-center">
                <div className="w-full space-y-4">
                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-gray-200">
                      <MobileDownload />
                    </div>
                  </div>
                  
                  {/* Features lijst */}
                  <div className="bg-neutral-cream rounded-xl p-4 border-2 border-gray-200">
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-2 text-center">
                      Wat krijgt u?
                    </h3>
                    <ul className="space-y-1.5 text-senior-xs text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Volledige app</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Barcode scanner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Offline werken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Levenslang</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Andere activiteiten - Kleiner en secundair */}
          <div className="mb-6">
            <h3 className="text-senior-lg font-bold text-gray-700 mb-4 text-center">
              Andere activiteiten
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Grote Klok */}
              <Link 
                href="/klok" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
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
                    Duidelijke weergave van tijd en datum met extra grote cijfers.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      🧩
                    </div>
                    <h3 className="text-senior-base font-bold text-gray-800">
                      Dagelijkse Puzzel
                    </h3>
                  </div>
                  <p className="text-senior-xs text-gray-600 leading-relaxed">
                    Elke dag een nieuwe puzzel! Sudoku, woordzoeker en meer.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-3">
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
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-senior-xs mb-1">
              © 2025 SeniorEase.nl
            </p>
            <p className="text-senior-xs text-gray-400">
              Handige technologie zonder gedoe
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
