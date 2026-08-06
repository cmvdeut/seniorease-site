import type { ReactNode } from 'react';
import Link from 'next/link';

export type CategoryArticle = {
  title: string;
  href: string;
};

type CategoryHubProps = {
  title: string;
  description: string;
  intro: string;
  articles: CategoryArticle[];
  tip?: ReactNode;
};

/**
 * Categorie-hub — Stitch: cream pagina, zand paneel, off-white links.
 */
export default function CategoryHub({
  title,
  description,
  intro,
  articles,
  tip,
}: CategoryHubProps) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/digitale-hulp"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Terug naar Digitale hulp
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-4">
          {title}
        </h1>
        <p className="text-navy/70 text-senior-base mb-10 leading-relaxed max-w-2xl">
          {description}
        </p>

        <div className="bg-slate rounded-senior border border-navy/8 shadow-sm p-7 sm:p-9">
          <p className="text-navy/85 text-senior-sm sm:text-senior-base leading-relaxed mb-8">
            {intro}
          </p>

          <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-5">Artikelen</h2>
          <ul className="space-y-3" aria-label="Artikelen in deze categorie">
            {articles.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 min-h-touch rounded-senior bg-paper border border-navy/8 hover:border-gold px-5 py-4 text-senior-base font-semibold text-navy hover:text-gold transition-colors"
                >
                  <span>{item.title}</span>
                  <span className="text-gold shrink-0" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {tip && (
            <p className="text-senior-sm text-navy/70 mt-8 pt-6 border-t border-navy/10 leading-relaxed">
              <span className="font-semibold text-gold">Tip: </span>
              {tip}
            </p>
          )}

          <p className="mt-6 pt-4 border-t border-navy/10">
            <Link
              href="/digitale-hulp"
              className="text-senior-sm font-semibold text-gold hover:text-gold-light"
            >
              ← Alle artikelen Digitale hulp
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
