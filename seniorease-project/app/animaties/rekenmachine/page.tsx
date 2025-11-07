import Link from 'next/link';
import Image from 'next/image';

export default function RekenmachineAnimatiePage() {
  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Link 
              href="/animaties"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar alle animaties
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={100} 
                height={100}
                className="w-32 h-32"
              />
              <div>
                <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
                  Rekenmachine - Stap-voor-Stap Uitleg
                </h1>
                <p className="text-senior-base text-gray-600 mt-2">
                  Leer hoe u de rekenmachine gebruikt met grote knoppen
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Info Box */}
          <div className="bg-white rounded-xl shadow-md border-2 border-primary p-6 mb-6">
            <h2 className="text-senior-xl font-bold text-primary mb-4 text-center">
              💡 Hoe werkt dit?
            </h2>
            <div className="space-y-3 text-senior-base text-gray-700">
              <p>
                <strong>Interactieve Animatie:</strong> Klik op "Start" om de animatie te bekijken. 
                De animatie toont hoe u een berekening maakt met de rekenmachine.
              </p>
              <p>
                <strong>Grote Knoppen:</strong> Alle knoppen zijn extra groot gemaakt voor eenvoudig gebruik.
              </p>
              <p>
                <strong>Duidelijk Display:</strong> Het resultaat wordt groot en duidelijk getoond.
              </p>
            </div>
          </div>

          {/* Animatie iframe */}
          <div className="bg-white rounded-xl shadow-lg border-4 border-primary overflow-hidden" style={{ height: 'calc(100vh - 400px)', minHeight: '600px' }}>
            <iframe
              src="/youtube-animaties/rekenmachine-animatie.html"
              className="w-full h-full"
              style={{ 
                border: 'none',
                display: 'block'
              }}
              title="Rekenmachine Animatie"
              allowFullScreen
              scrolling="no"
            />
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/rekenmachine"
              className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-senior-base md:text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              🔢 Open Rekenmachine
            </Link>
            <Link
              href="/animaties"
              className="bg-gray-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-senior-base md:text-senior-lg font-bold
                       hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              ← Terug naar alle animaties
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

