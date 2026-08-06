import Link from 'next/link';

export type GuideTocItem = {
  id: string;
  label: string;
};

export type GuideRelatedItem = {
  href: string;
  label: string;
};

type GuideSidebarProps = {
  toc: GuideTocItem[];
  related: GuideRelatedItem[];
};

export default function GuideSidebar({ toc, related }: GuideSidebarProps) {
  return (
    <div className="space-y-8 text-navy">
      <div>
        <h2 className="font-serif text-navy text-senior-base font-semibold mb-4">
          Inhoudsopgave
        </h2>
        <ol className="space-y-2.5">
          {toc.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-navy/80 hover:text-gold transition-colors text-senior-sm leading-snug inline-flex gap-2 min-h-[44px] items-center"
              >
                <span className="font-semibold tabular-nums text-navy/55">{i + 1}.</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="font-serif text-navy text-senior-base font-semibold mb-4">
          Gerelateerde onderwerpen
        </h2>
        <ul className="space-y-2.5">
          {related.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-navy/80 hover:text-gold transition-colors text-senior-sm leading-snug inline-flex min-h-[44px] items-center"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
