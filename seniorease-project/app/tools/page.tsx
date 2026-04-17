'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Camera, Calculator, CheckSquare, CalendarDays, Clock, Brain, BookOpen } from 'lucide-react';

const tools = [
  {
    title: 'Foto Archief',
    description: 'Identificeer personen op oude familiefoto\'s. Plaats nummers en voeg namen toe. Handig voor stamboom makers.',
    Icon: Camera,
    href: '/foto-archief',
    category: 'Tools',
  },
  {
    title: 'Rekenmachine',
    description: 'Grote knoppen en duidelijk display. Eenvoudig rekenen.',
    Icon: Calculator,
    href: '/rekenmachine',
    category: 'Tools',
  },
  {
    title: 'Afvinken maar!',
    description: 'Lijstjes maken en eenvoudig afvinken. Niets vergeten!',
    Icon: CheckSquare,
    href: '/afvinken',
    category: 'Tools',
  },
  {
    title: 'Verjaardagskalender',
    description: 'Verjaardagen bijhouden met filters voor kinderen, kleinkinderen, vrienden en familie.',
    Icon: CalendarDays,
    href: '/kalender',
    category: 'Tools',
  },
  {
    title: 'Grote Klok',
    description: 'Duidelijke weergave van tijd en datum met extra grote cijfers.',
    Icon: Clock,
    href: '/klok',
    category: 'Tools',
  },
  {
    title: 'Dagelijkse Puzzel',
    description: 'Elke dag een nieuwe puzzel! Sudoku, woordzoeker en meer.',
    Icon: Brain,
    href: '/puzzels',
    category: 'Ontspanning',
  },
  {
    title: 'Mijn Bibliotheek',
    description: 'Beheer uw boeken en muziek collectie. Scan barcodes met uw camera. Gratis op pc • €4,99 eenmalig op Android',
    Icon: BookOpen,
    href: '/bibliotheek',
    category: 'Apps',
  },
];

const categories = ['Alle', 'Tools', 'Apps', 'Ontspanning'];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredTools = selectedCategory === 'Alle'
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-cream">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Handige tools
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Overzicht van alle beschikbare tools
        </p>

        {/* Categorie filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl font-semibold transition-all border`}
              style={{
                fontSize: '1.05rem',
                background: selectedCategory === category ? '#8B5E3C' : '#fff',
                color: selectedCategory === category ? '#fff' : '#8B5E3C',
                borderColor: selectedCategory === category ? '#8B5E3C' : '#d6c5b5',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filteredTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl shadow-sm border border-neutral-stone/40 hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F5EEE6' }}>
                    <tool.Icon size={24} style={{ color: '#8B5E3C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 leading-tight" style={{ fontSize: '1.15rem' }}>
                      {tool.title}
                    </h3>
                    <span className="text-gray-400 bg-neutral-cream px-2 py-0.5 rounded text-sm">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3" style={{ fontSize: '1rem' }}>
                  {tool.description}
                </p>
                <span className="text-primary font-semibold group-hover:underline" style={{ fontSize: '1rem' }}>
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info box */}
        <div className="rounded-xl p-6 border border-amber-200" style={{ background: '#FFFBF0' }}>
          <p className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.1rem' }}>Meer tools komen eraan</p>
          <p className="text-gray-600" style={{ fontSize: '1rem' }}>
            We werken continu aan nieuwe handige tools. Kom regelmatig terug om te zien wat er nieuw is.
          </p>
        </div>

      </div>
    </div>
  );
}
