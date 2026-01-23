'use client';

import Link from 'next/link';

// Social Media URLs
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';

export default function UitlegvideoPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Uitlegvideo's
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="text-center md:text-left space-y-6">
              {/* Introtekst */}
              <div className="space-y-4">
                <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
                  In deze video's laten we rustig zien<br />
                  hoe Mijn Bibliotheek werkt.
                </p>
                <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
                  Alles wordt stap voor stap uitgelegd,<br />
                  met grote letters en een rustig tempo.
                </p>
              </div>

              {/* Knop */}
              <div className="pt-4">
                <a 
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ▶️ Bekijk de uitlegvideo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


