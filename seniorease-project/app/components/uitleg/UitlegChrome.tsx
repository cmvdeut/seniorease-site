import type { ReactNode } from 'react';
import Link from 'next/link';

/** Pagina-shell voor uitlegartikelen (cream, teruglink, titel). */
export function UitlegShell({
  backHref = '/uitleg',
  backLabel = '← Terug naar alle uitleg',
  title,
  lead,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href={backHref}
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          {backLabel}
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3 max-w-2xl">
          {title}
        </h1>
        {lead && (
          <p className="text-navy/70 text-senior-base mb-12 leading-relaxed max-w-2xl">{lead}</p>
        )}

        <div className="space-y-8 max-w-3xl">{children}</div>
      </div>
    </main>
  );
}

export function UitlegPanel({
  title,
  children,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9">
      {title && (
        <h2 className="font-serif text-navy text-senior-lg font-semibold mb-3">{title}</h2>
      )}
      {subtitle && (
        <p className="text-navy/55 text-senior-sm mb-5 -mt-1">{subtitle}</p>
      )}
      <div className="text-navy/80 text-senior-sm leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export function UitlegTip({ children }: { children: ReactNode }) {
  return (
    <p className="text-navy/80 text-senior-sm leading-relaxed mt-4 p-4 rounded-senior bg-paper border border-navy/10">
      <span className="font-semibold text-gold">Tip: </span>
      {children}
    </p>
  );
}

export function UitlegSteps({
  steps,
}: {
  steps: { title: string; body: ReactNode; tip?: string }[];
}) {
  return (
    <ol className="space-y-5 list-none m-0 p-0">
      {steps.map((stap, i) => (
        <li key={stap.title} className="bg-paper rounded-senior border border-navy/8 p-5">
          <p className="font-semibold text-navy text-senior-sm mb-1">
            <span className="text-gold mr-2">{i + 1}.</span>
            {stap.title}
          </p>
          <div className="text-navy/75 text-senior-sm leading-relaxed pl-6">{stap.body}</div>
          {stap.tip && (
            <p className="text-navy/70 text-senior-xs leading-relaxed mt-3 pl-6">
              <span className="font-semibold text-gold">Tip: </span>
              {stap.tip}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function UitlegRelated({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <UitlegPanel title="Meer uitleg">
      <ul className="space-y-3 m-0 p-0 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-semibold text-gold hover:text-gold-light text-senior-sm"
            >
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </UitlegPanel>
  );
}
