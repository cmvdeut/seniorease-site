'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AnimatiesPage() {
  const animaties = [
    {
      id: 'bibliotheek',
      title: 'Mijn Bibliotheek',
      description: 'Leer stap-voor-stap hoe u boeken en muziek toevoegt aan uw bibliotheek. Met barcode scannen en handmatig invoeren.',
      icon: '📚',
      href: '/animaties/bibliotheek',
      category: 'Apps'
    },
    {
      id: 'rekenmachine',
      title: 'Rekenmachine',
      description: 'Leer stap-voor-stap hoe u de rekenmachine gebruikt. Grote knoppen en duidelijk display.',
      icon: '🔢',
      href: '/animaties/rekenmachine',
      category: 'Tools',
      comingSoon: false
    },
    {
      id: 'afvinken',
      title: 'Afvinken maar!',
      description: 'Leer stap-voor-stap hoe u checklists maakt. Met slimme suggesties om u te helpen.',
      icon: '✅',
      href: '/animaties/afvinken',
      category: 'Tools',
      comingSoon: false
    },
    {
      id: 'kalender',
      title: 'Verjaardagskalender',
      description: 'Leer stap-voor-stap hoe u verjaardagen toevoegt aan uw kalender. Klik op een datum om te beginnen.',
      icon: '📅',
      href: '/animaties/kalender',
      category: 'Tools',
      comingSoon: false
    },
    {
      id: 'klok',
      title: 'Grote Klok',
      description: 'Leer hoe u de grote klok gebruikt. Extra grote tijd en datum weergave, perfect om op afstand te lezen.',
      icon: '🕐',
      href: '/animaties/klok',
      category: 'Tools',
      comingSoon: false
    },
    {
      id: 'puzzels',
      title: 'Dagelijkse Puzzel',
      description: 'Leer stap-voor-stap hoe u de dagelijkse puzzel speelt. Elke dag een nieuwe puzzel!',
      icon: '🧩',
      href: '/animaties/puzzel',
      category: 'Ontspanning',
      comingSoon: false
    }
  ];

  const categories = ['Alle', 'Apps', 'Tools', 'Ontspanning'];
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredAnimaties = useMemo(() => {
    return selectedCategory === 'Alle' 
      ? animaties 
      : animaties.filter(animatie => animatie.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
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
                  Video Tutorials & Animaties
                </h1>
                <p className="text-senior-base text-gray-600 mt-2">
                  Interactieve stap-voor-stap uitleg van alle SeniorEase tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold text-senior-base transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border-2 border-primary hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Animaties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimaties.map((animatie) => (
              <div
                key={animatie.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-neutral-stone overflow-hidden flex flex-col ${
                  animatie.comingSoon ? 'opacity-75' : ''
                }`}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-6xl mb-4 text-center">{animatie.icon}</div>
                  <h3 className="text-senior-lg font-bold text-primary mb-3 text-center">
                    {animatie.title}
                  </h3>
                  <p className="text-senior-sm text-gray-600 mb-4 text-center leading-relaxed flex-1">
                    {animatie.description}
                  </p>
                  <div className="mt-auto">
                    {animatie.comingSoon ? (
                      <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-senior-sm font-semibold">
                          Binnenkort beschikbaar
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={animatie.href || '#'}
                        className="block w-full text-center bg-primary text-white py-3 px-6 rounded-lg font-semibold text-senior-base hover:bg-primary-dark transition-colors"
                      >
                        Bekijk Animatie →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-white rounded-xl shadow-md border-2 border-primary p-6 md:p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4 text-center">
              💡 Hoe werkt dit?
            </h2>
            <div className="space-y-4 text-senior-base text-gray-700">
              <p>
                <strong>Interactieve Animaties:</strong> Klik op een animatie om deze te openen. 
                De animatie loopt automatisch door alle stappen en toont precies hoe u de tool gebruikt.
              </p>
              <p>
                <strong>Stap-voor-Stap:</strong> Elke animatie toont alle stappen die u moet volgen, 
                van begin tot eind. Perfect om te leren hoe alles werkt!
              </p>
              <p>
                <strong>Altijd Beschikbaar:</strong> Deze animaties zijn altijd beschikbaar op deze pagina. 
                U kunt ze zo vaak bekijken als u wilt!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

