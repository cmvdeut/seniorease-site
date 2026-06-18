'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { searchSite, SEARCH_SUGGESTIONS, type SiteSearchItem } from '@/lib/site-search';

interface DigitaleHulpZoekProps {
  initialQuery?: string;
}

export function DigitaleHulpZoek({ initialQuery = '' }: DigitaleHulpZoekProps) {
  const [zoek, setZoek] = useState(initialQuery);

  const resultaten = useMemo(() => searchSite(zoek), [zoek]);

  return (
    <>
      <label htmlFor="digitale-hulp-zoek" className="sr-only">
        Zoek op de hele website
      </label>
      <input
        id="digitale-hulp-zoek"
        type="search"
        value={zoek}
        onChange={(e) => setZoek(e.target.value)}
        placeholder="Waarmee kunnen we u helpen?"
        className="w-full text-senior-base md:text-senior-lg px-5 py-4 rounded-xl border-2 border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
        aria-describedby="zoek-hint"
      />
      <p id="zoek-hint" className="text-senior-sm text-gray-600 mb-6">
        Zoek op trefwoord — bijvoorbeeld: Google, googelen, WhatsApp, wifi, ChatGPT, wachtwoord, foto, e-mail, bibliotheek
      </p>

      {!zoek.trim() && (
        <div className="flex flex-wrap gap-2 mb-8">
          {SEARCH_SUGGESTIONS.map((suggestie) => (
            <button
              key={suggestie}
              type="button"
              onClick={() => setZoek(suggestie)}
              className="text-senior-sm font-semibold rounded-full px-4 py-2 border-2 border-primary/30 text-primary bg-white hover:bg-primary/10 transition-colors"
            >
              {suggestie}
            </button>
          ))}
        </div>
      )}

      <h2 className="text-senior-xl font-bold text-primary mb-6">
        {zoek.trim() ? `Resultaten voor “${zoek.trim()}”` : 'Populaire onderwerpen'}
      </h2>

      {resultaten.length === 0 ? (
        <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 text-center">
          <p className="text-senior-base text-gray-700 mb-2">
            Geen resultaten gevonden voor &quot;{zoek}&quot;.
          </p>
          <p className="text-senior-sm text-gray-600 mb-4">
            Probeer een ander woord, bijvoorbeeld: Google, WhatsApp, wifi of ChatGPT.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SEARCH_SUGGESTIONS.slice(0, 6).map((suggestie) => (
              <button
                key={suggestie}
                type="button"
                onClick={() => setZoek(suggestie)}
                className="text-senior-sm font-semibold rounded-full px-4 py-2 border-2 border-primary/30 text-primary bg-white hover:bg-primary/10 transition-colors"
              >
                {suggestie}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {resultaten.map((item) => (
            <li key={item.href}>
              <SearchResultLink item={item} />
            </li>
          ))}
        </ul>
      )}

      {resultaten.length > 0 && (
        <p className="text-senior-sm text-gray-600 mt-8">
          {resultaten.length} {resultaten.length === 1 ? 'resultaat' : 'resultaten'} gevonden.
          Meer uitleg staat ook op{' '}
          <Link href="/uitleg" className="font-bold text-primary hover:text-primary-dark underline">
            alle uitleg-pagina&apos;s
          </Link>
          .
        </p>
      )}
    </>
  );
}

function SearchResultLink({ item }: { item: SiteSearchItem }) {
  return (
    <Link
      href={item.href}
      className="block bg-neutral-cream hover:bg-primary/10 border-2 border-primary/30 hover:border-primary rounded-xl p-5 transition-colors"
    >
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-senior-xs font-bold uppercase tracking-wide text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
          {item.category}
        </span>
      </div>
      <h3 className="text-senior-lg font-bold text-primary mb-1">{item.title}</h3>
      <p className="text-senior-base text-gray-700">{item.description}</p>
    </Link>
  );
}
