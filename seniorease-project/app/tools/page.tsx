'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ToolsPage() {
  const tools = [
    {
      title: 'Rekenmachine',
      description: 'Grote knoppen en duidelijk display. Eenvoudig rekenen.',
      icon: '🔢',
      href: '/rekenmachine',
      category: 'Tools'
    },
    {
      title: 'Afvinken maar!',
      description: 'Lijstjes maken en eenvoudig afvinken. Niets vergeten!',
      icon: '✅',
      href: '/afvinken',
      category: 'Tools'
    },
    {
      title: 'Verjaardagskalender',
      description: 'Verjaardagen bijhouden met filters voor kinderen, kleinkinderen, vrienden en familie.',
      icon: '📅',
      href: '/kalender',
      category: 'Tools'
    },
    {
      title: 'Grote Klok',
      description: 'Duidelijke weergave van tijd en datum met extra grote cijfers.',
      icon: '🕐',
      href: '/klok',
      category: 'Tools'
    },
    {
      title: 'Dagelijkse Puzzel',
      description: 'Elke dag een nieuwe puzzel! Sudoku, woordzoeker en meer.',
      icon: '🧩',
      href: '/puzzels',
      category: 'Ontspanning'
    },
    {
      title: 'Mijn Bibliotheek',
      description: 'Beheer uw boeken en muziek collectie. Scan barcodes met uw camera.',
      icon: '📚',
      href: '/bibliotheek',
      category: 'Apps'
    }
  ];

  const categories = ['Alle', 'Tools', 'Apps', 'Ontspanning'];
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredTools = selectedCategory === 'Alle' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span className="text-2xl">←</span>
              <span className="text-senior-base">Terug</span>
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={50} 
                height={50}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-senior-2xl font-bold text-primary mb-0.5">
                  Handige Tools
                </h1>
                <p className="text-senior-sm text-gray-600">
                  Overzicht van alle beschikbare tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Categorie Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl text-senior-base font-bold transition-all
                    ${selectedCategory === category
                      ? 'bg-primary text-white border-4 border-primary shadow-lg'
                      : 'bg-white text-primary border-4 border-neutral-stone hover:border-primary'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                         border-4 border-neutral-stone hover:border-primary overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-4xl">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-senior-lg font-bold text-gray-800 mb-1 leading-tight">
                        {tool.title === 'Verjaardagskalender' ? (
                          <>
                            Verjaardags-<br />kalender
                          </>
                        ) : (
                          tool.title
                        )}
                      </h3>
                      <span className="text-senior-xs text-gray-500 bg-neutral-cream px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-senior-sm text-gray-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all">
                    <span className="text-senior-sm">Open</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-senior-base font-bold text-blue-900 mb-3 text-center">
              💡 Meer tools komen eraan!
            </h3>
            <p className="text-senior-sm text-blue-800 text-center">
              We werken continu aan nieuwe handige tools. Kom regelmatig terug om te zien wat er nieuw is!
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

