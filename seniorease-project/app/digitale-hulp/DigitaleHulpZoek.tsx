'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import type { Artikel } from './artikelen';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matches(artikel: Artikel, query: string): boolean {
  if (!query) return true;
  const q = normalize(query);
  const title = normalize(artikel.title);
  const desc = normalize(artikel.description);
  return title.includes(q) || desc.includes(q);
}

interface DigitaleHulpZoekProps {
  artikelen: Artikel[];
  initialQuery?: string;
}

export function DigitaleHulpZoek({ artikelen, initialQuery = '' }: DigitaleHulpZoekProps) {
  const [zoek, setZoek] = useState(initialQuery);

  const gefilterd = useMemo(() => {
    return artikelen.filter((a) => matches(a, zoek));
  }, [artikelen, zoek]);

  return (
    <>
      <label htmlFor="digitale-hulp-zoek" className="sr-only">
        Zoek in digitale hulp artikelen
      </label>
      <input
        id="digitale-hulp-zoek"
        type="search"
        value={zoek}
        onChange={(e) => setZoek(e.target.value)}
        placeholder="Waarmee kunnen we u helpen?"
        className="w-full text-senior-base md:text-senior-lg px-5 py-4 rounded-xl border-2 border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 mb-8"
        aria-describedby="zoek-hint"
      />
      <p id="zoek-hint" className="text-senior-sm text-gray-600 -mt-6 mb-6">
        Typ bijvoorbeeld: WhatsApp, foto&apos;s, wifi, e-mail, wachtwoord, Bluetooth
      </p>

      <h2 className="text-senior-xl font-bold text-primary mb-6">
        Artikelen
      </h2>

      {gefilterd.length === 0 ? (
        <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 text-center">
          <p className="text-senior-base text-gray-700 mb-2">
            Geen artikelen gevonden voor &quot;{zoek}&quot;.
          </p>
          <p className="text-senior-sm text-gray-600">
            Probeer een ander woord, bijvoorbeeld: WhatsApp, foto&apos;s, wifi of wachtwoord.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {gefilterd.map((artikel) => (
            <li key={artikel.slug}>
              <Link
                href={`/digitale-hulp/${artikel.slug}`}
                className="block bg-neutral-cream hover:bg-primary/10 border-2 border-primary/30 hover:border-primary rounded-xl p-5 transition-colors"
              >
                <h3 className="text-senior-lg font-bold text-primary mb-1">
                  {artikel.title}
                </h3>
                <p className="text-senior-base text-gray-700">
                  {artikel.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {gefilterd.length > 0 && (
        <p className="text-senior-sm text-gray-600 mt-8">
          Meer stap-voor-stap uitleg vindt u bij{' '}
          <Link href="/" className="font-bold text-primary hover:text-primary-dark underline">
            onze uitleg over WhatsApp, WiFi, wachtwoorden en meer
          </Link>
          .
        </p>
      )}
    </>
  );
}
