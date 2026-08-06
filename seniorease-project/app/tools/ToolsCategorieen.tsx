import Link from 'next/link';
import { TOOL_CATEGORIES } from './tools-data';

export function ToolsCategorieen() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {TOOL_CATEGORIES.map(({ id, titel, omschrijving, Icon }) => (
        <Link
          key={id}
          href={`/tools/thema/${id}`}
          className="bg-slate rounded-senior border border-navy/8 p-6 sm:p-7 min-h-touch hover:border-gold/40 transition-colors group flex flex-col"
        >
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-gold">
            <Icon size={28} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="font-serif text-navy text-senior-lg font-semibold mb-2 group-hover:text-gold transition-colors">
            {titel}
          </h3>
          <p className="text-navy/65 text-senior-sm leading-relaxed flex-1">{omschrijving}</p>
          <span className="mt-5 text-gold font-semibold text-senior-sm">Bekijken →</span>
        </Link>
      ))}
    </div>
  );
}
