import Link from 'next/link';
import Image from 'next/image';
import MobileDownload from './components/MobileDownload';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-6">
            <Image 
              src="/heart-logo.png" 
              alt="SeniorEase hartlogo" 
              width={80} 
              height={80}
              className="w-20 h-20"
            />
            <div>
              <h1 className="text-senior-3xl font-bold text-primary mb-1">
                SeniorEase
              </h1>
              <p className="text-senior-base text-gray-600">
                Handige technologie zonder gedoe
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Bibliotheek en Mobiele Download naast elkaar */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Grid layout: 60% bibliotheek, 40% mobiele download */}
          <div className="grid md:grid-cols-5 gap-6 mb-16">
            {/* Bibliotheek Hero Card - 60% (3/5) */}
            <div className="md:col-span-3 bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-8 md:p-10">
                <div className="flex flex-col items-center gap-6">
                  <div className="text-6xl md:text-7xl">📚</div>
                  <div className="text-center">
                    <h2 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-3">
                      Mijn Bibliotheek
                    </h2>
                    <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                      Beheer uw boeken en muziek collectie. Scan barcodes met uw camera of voer handmatig in.
                    </p>
                    <Link 
                      href="/bibliotheek"
                      className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                               hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      → Open Mijn Bibliotheek
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Feature highlights */}
              <div className="p-6 md:p-8 bg-white flex-1">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Boeken</h3>
                    <p className="text-senior-xs text-gray-600">Bewaar op één plek</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">💿</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Muziek</h3>
                    <p className="text-senior-xs text-gray-600">Albums & CD's</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-cream rounded-xl">
                    <div className="text-4xl mb-2">📷</div>
                    <h3 className="text-senior-sm font-bold text-gray-800 mb-1">Barcode</h3>
                    <p className="text-senior-xs text-gray-600">Scan snel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobiele Download - 40% (2/5) */}
            <div className="md:col-span-2">
              <MobileDownload />
            </div>
          </div>

          {/* Andere activiteiten - Kleiner en secundair */}
          <div className="mb-12">
            <h3 className="text-senior-xl font-bold text-gray-700 mb-6 text-center">
              Andere activiteiten
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Grote Klok */}
              <Link 
                href="/klok" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-3xl">
                      🕐
                    </div>
                    <h3 className="text-senior-lg font-bold text-gray-800">
                      Grote Klok
                    </h3>
                  </div>
                  <p className="text-senior-sm text-gray-600 leading-relaxed">
                    Duidelijke weergave van tijd en datum met extra grote cijfers.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-4">
                    <span className="text-senior-sm">Open</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>

              {/* Dagelijkse Puzzel */}
              <Link 
                href="/puzzels" 
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 
                         border-2 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-3xl">
                      🧩
                    </div>
                    <h3 className="text-senior-lg font-bold text-gray-800">
                      Dagelijkse Puzzel
                    </h3>
                  </div>
                  <p className="text-senior-sm text-gray-600 leading-relaxed">
                    Elke dag een nieuwe puzzel! Sudoku, woordzoeker en meer.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all mt-4">
                    <span className="text-senior-sm">Speel</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t-2 border-neutral-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-senior-2xl font-bold text-gray-800 mb-12 text-center">
              Waarom SeniorEase?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  👁️
                </div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-3">
                  Extra Leesbaar
                </h3>
                <p className="text-senior-sm text-gray-600 leading-relaxed">
                  Grote teksten en duidelijke knoppen voor optimaal leescomfort
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  ✓
                </div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-3">
                  Eenvoudig
                </h3>
                <p className="text-senior-sm text-gray-600 leading-relaxed">
                  Intuïtieve interfaces zonder ingewikkelde menu's of verborgen functies
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  📱
                </div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-3">
                  Overal te gebruiken
                </h3>
                <p className="text-senior-sm text-gray-600 leading-relaxed">
                  Werkt op computer, tablet en telefoon. Installeer als app!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-senior-sm mb-3">
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
