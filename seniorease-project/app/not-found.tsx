'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-cream flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12 text-center">
        <div className="mb-6">
          <Image 
            src="/heart-logo.png" 
            alt="SeniorEase logo" 
            width={120} 
            height={120}
            className="mx-auto"
          />
        </div>
        
        <div className="text-6xl mb-6">🔍</div>
        
        <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
          Pagina niet gevonden
        </h1>
        
        <p className="text-senior-lg text-gray-700 mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                     hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
          >
            ← Terug naar home
          </Link>
          
          <div className="mt-6">
            <p className="text-senior-base text-gray-600 mb-4">
              Of ga naar:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/bibliotheek"
                className="bg-neutral-cream text-primary px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-primary/10 transition-all border-2 border-neutral-stone"
              >
                📚 Bibliotheek
              </Link>
              <Link
                href="/tools"
                className="bg-neutral-cream text-primary px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-primary/10 transition-all border-2 border-neutral-stone"
              >
                🛠️ Tools
              </Link>
              <Link
                href="/hulp"
                className="bg-neutral-cream text-primary px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-primary/10 transition-all border-2 border-neutral-stone"
              >
                ❓ Hulp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}








