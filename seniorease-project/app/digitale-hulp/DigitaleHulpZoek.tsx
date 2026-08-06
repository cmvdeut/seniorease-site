'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { searchSite, type SiteSearchItem } from '@/lib/site-search';

interface DigitaleHulpZoekProps {
  initialQuery?: string;
}

/**
 * Alleen zoeken — resultaten verschijnen bij typen.
 * Categorieën en populaire links staan buiten dit component.
 */
export function DigitaleHulpZoek({ initialQuery = '' }: DigitaleHulpZoekProps) {
  const [zoek, setZoek] = useState(initialQuery);
  const heeftZoek = zoek.trim().length > 0;
  const resultaten = useMemo(() => (heeftZoek ? searchSite(zoek) : []), [zoek, heeftZoek]);

  return (
    <div>
      <label htmlFor="digitale-hulp-zoek" className="sr-only">
        Zoek op de hele website
      </label>
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
          size={24}
          strokeWidth={2}
          aria-hidden
        />
        <input
          id="digitale-hulp-zoek"
          type="search"
          value={zoek}
          onChange={(e) => setZoek(e.target.value)}
          placeholder="Bijvoorbeeld: WhatsApp, Google, wifi…"
          className="w-full min-h-touch pl-14 pr-5 py-4 rounded-senior border-2 border-navy/12 bg-paper text-navy text-senior-sm placeholder:text-navy/40 shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
          aria-describedby="zoek-hint"
        />
      </div>
      <p id="zoek-hint" className="text-senior-sm text-navy/60 mt-3">
        Typ een woord.
      </p>

      {heeftZoek && (
        <div className="mt-6">
          <h2 className="font-serif text-navy text-senior-xl font-semibold mb-5">
            Resultaten voor “{zoek.trim()}”
          </h2>

          {resultaten.length === 0 ? (
            <div className="bg-paper border border-navy/10 rounded-senior p-6 text-center">
              <p className="text-senior-base text-navy mb-2">
                Geen resultaten voor &quot;{zoek}&quot;.
              </p>
              <p className="text-senior-sm text-navy/70 mb-4">
                Probeer een ander woord, of kies een onderwerp hieronder.
              </p>
              <button
                type="button"
                onClick={() => setZoek('')}
                className="min-h-[44px] text-senior-sm font-semibold rounded-full px-5 py-2 bg-gold text-white hover:bg-gold-light transition-colors"
              >
                Zoekopdracht wissen
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {resultaten.map((item) => (
                <li key={item.href}>
                  <SearchResultLink item={item} />
                </li>
              ))}
            </ul>
          )}

          {resultaten.length > 0 && (
            <p className="text-senior-sm text-navy/60 mt-6">
              {resultaten.length} {resultaten.length === 1 ? 'resultaat' : 'resultaten'}. Meer staat
              ook bij{' '}
              <Link href="/uitleg" className="font-semibold text-gold hover:text-gold-light underline">
                alle uitleg
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SearchResultLink({ item }: { item: SiteSearchItem }) {
  return (
    <Link
      href={item.href}
      className="block bg-paper hover:bg-cream border border-navy/10 hover:border-gold/40 rounded-senior px-5 py-4 min-h-touch transition-colors"
    >
      <span className="text-senior-xs font-bold uppercase tracking-wide text-gold">
        {item.category}
      </span>
      <h3 className="font-serif text-senior-base font-semibold text-navy mt-1 mb-0.5">
        {item.title}
      </h3>
      <p className="text-senior-sm text-navy/65 leading-snug">{item.description}</p>
    </Link>
  );
}
