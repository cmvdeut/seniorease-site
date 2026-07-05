'use client';

import Link from 'next/link';

export default function ExtrasPage() {
  const extras = [
    {
      title: 'Foto Archief',
      description: 'Identificeer personen op oude familiefoto\'s. Plaats nummers en voeg namen toe. Handig voor stamboom makers.',
      href: '/foto-archief'
    },
    {
      title: 'Grote klok',
      description: 'Duidelijke weergave van tijd en datum met extra grote cijfers.',
      href: '/klok'
    },
    {
      title: 'Rekenmachine',
      description: 'Grote knoppen en duidelijk display. Eenvoudig rekenen.',
      href: '/rekenmachine'
    },
    {
      title: 'Verjaardagskalender',
      description: 'Verjaardagen bijhouden met filters voor kinderen, kleinkinderen, vrienden en familie.',
      href: '/kalender'
    }
  ];

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
              Handige extra's
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12 mb-8">
            <div className="text-center md:text-left space-y-4">
              <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                Dit zijn eenvoudige hulpmiddelen binnen SeniorEase.
              </p>
              <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                Sommige mensen vinden ze prettig naast Mijn Bibliotheek.
              </p>
              <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                U hoeft hier niets mee.
              </p>
              <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                Mijn Bibliotheek blijft altijd de hoofdzaak.
              </p>
            </div>
          </div>

          {/* Extras lijst */}
          <div className="space-y-4 mb-8">
            {extras.map((extra, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-senior-lg md:text-senior-xl font-bold text-primary mb-2">
                      {extra.title}
                    </h2>
                    <p className="text-senior-base text-gray-700 leading-relaxed">
                      {extra.description}
                    </p>
                  </div>
                  <Link
                    href={extra.href}
                    className="text-senior-base font-bold text-primary hover:text-primary-dark transition-colors px-4 py-2 rounded-lg hover:bg-primary/10 whitespace-nowrap"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Link naar alle extra's */}
          <div className="text-center">
            <Link
              href="/tools"
              className="text-senior-base text-primary hover:text-primary-dark transition-colors underline"
            >
              Bekijk alle extra's
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


