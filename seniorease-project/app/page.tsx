import Link from 'next/link';
import Image from 'next/image';

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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-senior-2xl font-bold text-gray-800 mb-6">
              Welkom bij SeniorEase
            </h2>
            <p className="text-senior-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Wij maken technologie toegankelijk en eenvoudig. 
              Ontdek onze handige hulpmiddelen met overzichtelijke interfaces 
              en extra grote teksten voor optimaal gebruiksgemak.
            </p>
          </div>

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Grote Klok App */}
            <Link 
              href="/klok" 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-neutral-stone hover:border-primary overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-4xl">
                    🕐
                  </div>
                  <h3 className="text-senior-xl font-bold text-gray-800">
                    Grote Klok
                  </h3>
                </div>
                <p className="text-senior-sm text-gray-600 leading-relaxed mb-6">
                  Duidelijke weergave van tijd en datum met extra grote cijfers. 
                  Ideaal voor wandmontage of als bureauklok.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                  <span className="text-senior-sm">Open applicatie</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </Link>

            {/* Toekomstige app */}
            <div className="bg-white rounded-xl shadow-md border-2 border-dashed border-neutral-warm overflow-hidden opacity-75">
              <div className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    💊
                  </div>
                  <h3 className="text-senior-xl font-bold text-gray-500">
                    Medicatie Manager
                  </h3>
                </div>
                <p className="text-senior-sm text-gray-500 leading-relaxed mb-6">
                  Herinneringen voor medicijninname en overzicht van uw medicatieschema.
                </p>
                <div className="inline-block bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-semibold">
                  Binnenkort beschikbaar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t-2 border-neutral-stone">
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
                  🔒
                </div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-3">
                  Betrouwbaar
                </h3>
                <p className="text-senior-sm text-gray-600 leading-relaxed">
                  Werkt op alle apparaten zonder ingewikkelde installaties
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
