import type { ReactNode } from 'react';

type GuideLayoutProps = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  learnBox?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  stepNav?: ReactNode;
};

/**
 * Gids-layout: lichte cream (live huisstijl), 2 kolommen.
 */
export default function GuideLayout({
  title,
  subtitle,
  badge,
  learnBox,
  sidebar,
  children,
  stepNav,
}: GuideLayoutProps) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-14">
        <div className="flex items-start gap-4 mb-8 md:mb-10">
          {badge && (
            <span className="shrink-0 mt-1 opacity-90" aria-hidden>
              {badge}
            </span>
          )}
          <div className="min-w-0">
            <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] lg:text-senior-2xl font-semibold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-senior-base text-navy/70 mt-2 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12 items-start">
          <div className="min-w-0 space-y-10 md:space-y-14">
            {learnBox}
            {children}
            {stepNav && <div className="pt-2">{stepNav}</div>}
          </div>

          {sidebar && (
            <aside className="lg:sticky lg:top-24 space-y-8 order-first lg:order-last">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
