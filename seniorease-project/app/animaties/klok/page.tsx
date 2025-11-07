export default function KlokAnimatiePage() {
  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <a 
              href="/animaties"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar animaties
            </a>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">🕐</div>
              <div>
                <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
                  Grote Klok Animatie
                </h1>
                <p className="text-senior-base text-gray-600 mt-2">
                  Leer hoe u de grote klok gebruikt voor extra grote tijd en datum weergave
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Info Box */}
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-50 border-4 border-yellow-400 rounded-xl p-6 mb-6">
            <p className="text-senior-base text-gray-700">
              <strong>💡 Tip:</strong> Klik op "Start" om de animatie te beginnen. 
              De animatie toont automatisch hoe de grote klok werkt en dat de tijd automatisch update.
            </p>
          </div>
        </div>
      </div>

      {/* Animation */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border-4 border-primary overflow-hidden">
            <iframe
              src="/youtube-animaties/klok-animatie.html"
              className="w-full"
              style={{ height: 'calc(100vh - 300px)', minHeight: '600px', border: 'none' }}
              title="Grote Klok Animatie"
              key="klok-animatie-static"
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/klok"
              className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-senior-base md:text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              🕐 Open Grote Klok
            </a>
            <a
              href="/animaties"
              className="bg-gray-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-senior-base md:text-senior-lg font-bold
                       hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              ← Terug naar alle animaties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

