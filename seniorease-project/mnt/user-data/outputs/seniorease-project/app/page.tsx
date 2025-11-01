import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-senior-3xl font-bold text-center">
            SeniorEase
          </h1>
          <p className="text-senior-base text-center mt-2 opacity-90">
            Digitaal gemak voor senioren
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-senior-2xl font-bold text-gray-800 mb-6">
            Welkom bij SeniorEase
          </h2>
          <p className="text-senior-base text-gray-600 mb-12 leading-relaxed">
            Wij maken technologie toegankelijk en eenvoudig voor iedereen. 
            Ontdek onze handige hulpmiddelen die speciaal voor u zijn ontworpen.
          </p>

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Grote Klok App */}
            <Link 
              href="/klok" 
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border-4 border-transparent hover:border-blue-500"
            >
              <div className="text-6xl mb-4">🕐</div>
              <h3 className="text-senior-xl font-bold text-gray-800 mb-3">
                Grote Klok
              </h3>
              <p className="text-senior-sm text-gray-600">
                Tijd en datum altijd helder in beeld
              </p>
            </Link>

            {/* Toekomstige app - placeholder */}
            <div className="bg-gray-100 rounded-2xl shadow-lg p-8 opacity-60">
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-senior-xl font-bold text-gray-800 mb-3">
                Herinnering
              </h3>
              <p className="text-senior-sm text-gray-600">
                Binnenkort beschikbaar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Over Section */}
      <section className="bg-blue-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-senior-2xl font-bold text-gray-800 mb-6">
              Over SeniorEase
            </h2>
            <p className="text-senior-base text-gray-600 leading-relaxed">
              Wij geloven dat technologie voor iedereen toegankelijk moet zijn. 
              Daarom ontwikkelen we eenvoudige, overzichtelijke hulpmiddelen 
              met extra grote knoppen en duidelijke teksten.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-senior-sm">
            &copy; 2025 SeniorEase.nl - Digitaal gemak voor senioren
          </p>
          <p className="text-senior-xs mt-2 opacity-75">
            Gemaakt met ❤️ voor een beter digitaal leven
          </p>
        </div>
      </footer>
    </main>
  );
}
