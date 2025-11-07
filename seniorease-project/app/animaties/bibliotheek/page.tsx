import Link from 'next/link';
import Image from 'next/image';

export default function BibliotheekAnimatiePage() {
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
                  Mijn Bibliotheek - Stap-voor-Stap Uitleg
                </h1>
                <p className="text-senior-base text-gray-600 mt-2">
                  Leer hoe u boeken en muziek toevoegt aan uw bibliotheek
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
                De animatie toont alle stappen die u moet volgen om een boek of album toe te voegen aan uw bibliotheek.
              </p>
              <p>
                <strong>Herstarten:</strong> U kunt de animatie opnieuw bekijken door op "Reset" te klikken 
                en daarna op "Start".
              </p>
              <p>
                <strong>Stap-voor-Stap:</strong> Elke stap wordt duidelijk getoond, inclusief barcode scannen 
                en handmatig invoeren.
              </p>
            </div>
          </div>

          {/* Animatie iframe */}
          <div className="bg-white rounded-xl shadow-lg border-4 border-primary overflow-hidden" style={{ height: 'calc(100vh - 400px)', minHeight: '600px' }}>
            <iframe
              src="/youtube-animaties/bibliotheek-animatie.html"
              className="w-full h-full"
              style={{ 
                border: 'none',
                display: 'block'
              }}
              title="Bibliotheek Animatie"
              allowFullScreen
              scrolling="no"
            />
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/bibliotheek"
              className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-senior-base md:text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              📚 Open Mijn Bibliotheek
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
