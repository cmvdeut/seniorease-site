'use client';

import { useState } from 'react';
import {
  TEMPLATE_PACKS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  VAKANTIE_PACK_ORDER,
  type TemplatePack,
} from './templates';

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-navy/10 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full min-h-[52px] px-3 py-3 flex items-center justify-between gap-2 text-left touch-manipulation hover:bg-slate/60"
        aria-expanded={open}
      >
        <span className="text-senior-sm font-bold text-navy">{title}</span>
        <span className="text-navy text-xl font-bold flex-shrink-0" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? <div className="px-3 pb-3 space-y-2 border-t border-navy/8 pt-3">{children}</div> : null}
    </div>
  );
}

function packsForCategory(cat: TemplatePack['category']): TemplatePack[] {
  const packs = TEMPLATE_PACKS.filter((p) => p.category === cat);
  if (cat !== 'vakantie') return packs;

  const order = VAKANTIE_PACK_ORDER as readonly string[];
  return [...packs].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

type Props = {
  onCreate: (packs: TemplatePack[], label: string) => void;
  alreadyHasListNames: Set<string>;
};

export default function ChecklistPicker({ onCreate, alreadyHasListNames }: Props) {
  const [openCategory, setOpenCategory] = useState<TemplatePack['category'] | null>('vakantie');

  const isPackAdded = (pack: TemplatePack) =>
    pack.lists.every((l) => alreadyHasListNames.has(l.name));

  return (
    <div className="space-y-3">
      <p className="text-senior-xs text-gray-500 text-center m-0 leading-snug">
        Klap <strong>Vakantie & wegwezen</strong> open — Weekendje weg staat bovenaan.
      </p>

      {CATEGORY_ORDER.map((cat) => {
        const packs = packsForCategory(cat);
        return (
          <AccordionSection
            key={cat}
            title={CATEGORY_LABELS[cat]}
            open={openCategory === cat}
            onToggle={() => setOpenCategory((cur) => (cur === cat ? null : cat))}
          >
            {packs.map((pack) => {
              const done = isPackAdded(pack);
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => onCreate([pack], pack.title)}
                  title={pack.description}
                  className={`w-full min-h-[52px] px-3 py-2.5 rounded-xl text-senior-sm font-bold border-2 text-left touch-manipulation transition-all
                    ${
                      done
                        ? 'bg-green-50 text-green-900 border-green-400 hover:bg-green-100'
                        : 'bg-white text-navy border-navy/15 hover:border-gold'
                    }`}
                >
                  <span className="block">{done ? `✓ Open ${pack.title}` : `+ ${pack.title}`}</span>
                  <span
                    className={`block text-senior-xs font-normal mt-1 leading-snug ${
                      done ? 'text-green-800/80' : 'text-navy/55'
                    }`}
                  >
                    {pack.description}
                  </span>
                </button>
              );
            })}
          </AccordionSection>
        );
      })}
    </div>
  );
}
