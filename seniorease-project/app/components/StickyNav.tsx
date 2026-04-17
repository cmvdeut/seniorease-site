'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function StickyNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-stone shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ minHeight: 'auto' }}
          onClick={() => setOpen(false)}
        >
          <Image src="/heart-logo.png" alt="SeniorEase" width={36} height={36} className="w-9 h-9" />
          <span className="text-senior-sm font-bold text-primary hidden sm:block">SeniorEase</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/digitale-hulp"
            className="px-3 py-2 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            style={{ minHeight: 'auto' }}
          >
            Digitale hulp
          </Link>
          <Link
            href="/uitleg"
            className="px-3 py-2 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            style={{ minHeight: 'auto' }}
          >
            Uitleg
          </Link>
          <Link
            href="/tools"
            className="px-3 py-2 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            style={{ minHeight: 'auto' }}
          >
            Tools
          </Link>
          <Link
            href="/over-ons"
            className="px-3 py-2 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            style={{ minHeight: 'auto' }}
          >
            Over ons
          </Link>
          <Link
            href="/contact"
            className="ml-2 px-4 py-2 text-senior-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors shadow-sm"
            style={{ minHeight: 'auto' }}
          >
            Contact
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-stone/50 transition-colors text-gray-700"
          style={{ minHeight: 'auto', minWidth: 'auto' }}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          {open ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-neutral-stone px-4 pb-4 space-y-1">
          <Link href="/digitale-hulp" className="block px-3 py-3 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" style={{ minHeight: 'auto' }} onClick={() => setOpen(false)}>Digitale hulp</Link>
          <Link href="/uitleg" className="block px-3 py-3 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" style={{ minHeight: 'auto' }} onClick={() => setOpen(false)}>Uitleg</Link>
          <Link href="/tools" className="block px-3 py-3 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" style={{ minHeight: 'auto' }} onClick={() => setOpen(false)}>Tools</Link>
          <Link href="/over-ons" className="block px-3 py-3 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" style={{ minHeight: 'auto' }} onClick={() => setOpen(false)}>Over ons</Link>
          <Link href="/contact" className="block px-3 py-3 text-senior-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors text-center" style={{ minHeight: 'auto' }} onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
