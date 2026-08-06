import { Heart, RotateCcw, Clock3, type LucideIcon } from 'lucide-react';

const ITEMS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Heart,
    title: 'U kunt niets kapotmaken',
    desc: 'Echt niet. Uitproberen kan altijd veilig.',
  },
  {
    Icon: RotateCcw,
    title: 'Fouten maken mag',
    desc: 'Zo leert iedereen — ook wij deden dat.',
  },
  {
    Icon: Clock3,
    title: 'In uw eigen tempo',
    desc: 'Geen haast. Stap voor stap, zo vaak als u wilt.',
  },
];

/**
 * Open geruststellingsband onder de hero — copy/iconen van live homepage.
 */
export default function TrustStrip() {
  return (
    <section
      aria-label="Waarom SeniorEase veilig voelt"
      className="bg-cream border-y border-navy/8"
    >
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12 md:py-16">
        {/* Telefoon + tablet: gestapeld. Pas vanaf lg: drie kolommen. */}
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 list-none m-0 p-0">
          {ITEMS.map(({ Icon, title, desc }) => (
            <li
              key={title}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="rounded-full p-3.5 bg-primary-soft">
                <Icon
                  size={26}
                  strokeWidth={1.75}
                  className="text-primary"
                  aria-hidden
                />
              </div>
              <h2 className="font-serif text-navy text-senior-sm font-semibold leading-snug m-0">
                {title}
              </h2>
              <p className="text-navy/70 text-senior-xs leading-relaxed m-0 max-w-sm">
                {desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
