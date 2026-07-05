'use client';

import Link from 'next/link';
import GebruikMijnBibliotheekButton from '../components/GebruikMijnBibliotheekButton';

export default function ZoWerktHetPage() {
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
              Zo werkt Mijn Bibliotheek
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12 space-y-8">
            
            {/* Stap 1 */}
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-senior-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-senior-xl font-bold text-primary mb-3">
                    Stap 1
                  </h2>
                  <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                    U opent Mijn Bibliotheek op de pc<br />
                    of op uw telefoon of tablet.
                  </p>
                </div>
              </div>
            </div>

            {/* Stap 2 */}
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-senior-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-senior-xl font-bold text-primary mb-3">
                    Stap 2
                  </h2>
                  <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-3">
                    U voegt een boek toe.<br />
                    Dat kan door de barcode te scannen of in te typen.
                  </p>
                </div>
              </div>
            </div>

            {/* Stap 3 */}
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-senior-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-senior-xl font-bold text-primary mb-3">
                    Stap 3
                  </h2>
                  <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
                    Uw boeken blijven overzichtelijk bewaard.<br />
                    U kunt ze altijd terugvinden.
                  </p>
                </div>
              </div>
            </div>

            {/* Afsluitende geruststelling */}
            <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 mt-8">
              <p className="text-senior-sm md:text-senior-base text-gray-800 leading-relaxed font-bold text-center">
                U kunt niets kapot maken.<br />
                U mag alles rustig proberen.
              </p>
            </div>

            {/* Call to action */}
            <div className="text-center pt-4">
              <GebruikMijnBibliotheekButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


