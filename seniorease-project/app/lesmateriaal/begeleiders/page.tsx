import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import SeniorButton from '@/app/components/SeniorButton';
import { Mail, Users } from 'lucide-react';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/begeleiders',
  title: 'Voor begeleiders en vrijwilligers',
  description:
    'Rollen docent en helper, tempo in de zaal, didactiek en veiligheid. Korte gids bij SeniorEase lesmateriaal.',
  keywords: ['begeleider', 'vrijwilliger', 'cursus', 'senioren', 'les geven'],
});

export default function BegeleidersPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/lesmateriaal"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Lesmateriaal
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-6">
          Voor begeleiders en vrijwilligers
        </h1>
        <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-10">
          Korte gids voordat u uw eerste les geeft. In elk draaiboek staat het belangrijkste
          ook samengevat.
        </p>

        <div className="space-y-8 max-w-2xl">
          <section className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-4 flex items-center gap-2">
              <Users className="text-gold" size={22} aria-hidden />
              Wie doet wat?
            </h2>
            <dl className="space-y-4 text-senior-sm text-navy/85">
              <div>
                <dt className="font-bold text-navy">Begeleider (docent)</dt>
                <dd className="mt-1 leading-relaxed">
                  Welkom, tempo, voorbeeld op eigen toestel (of beamer), pauzes, afronding.
                </dd>
              </div>
              <div>
                <dt className="font-bold text-navy">Helper (vrijwilliger)</dt>
                <dd className="mt-1 leading-relaxed">
                  Loopt rond, helpt 1-op-1 — geeft <em>geen</em> les voor de hele groep.
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-4">
              Afspraken in de zaal
            </h2>
            <ul className="space-y-2 text-navy/85 text-senior-sm leading-relaxed list-disc pl-5">
              <li>Max. 8–10 deelnemers (1 begeleider + 1 helper)</li>
              <li>Één oefening tegelijk — wacht op elkaar</li>
              <li>Hand opsteken als iets niet lukt</li>
              <li>Wachtwoorden en codes nooit hardop zeggen</li>
              <li>Print op tafel; beamer is extra, niet verplicht</li>
            </ul>
          </section>

          <section className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-4">
              Didactiek (elke les)
            </h2>
            <ol className="space-y-2 text-navy/85 text-senior-sm leading-relaxed list-decimal pl-5">
              <li>
                <strong>Kijken</strong> — u toont kort op eigen toestel of beamer
              </li>
              <li>
                <strong>Doen</strong> — iedereen op het eigen toestel
              </li>
              <li>
                <strong>Controleren</strong> — helper loopt rond (“Klaar als…”)
              </li>
              <li>
                <strong>Pauzeren</strong> — koffie, even rust
              </li>
            </ol>
          </section>

          <section className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-4">
              Bent u zelf ook senior?
            </h2>
            <p className="text-navy/85 text-senior-sm leading-relaxed">
              Dat mag — en helpt soms juist. U hoeft niet alle merken te kennen. Twijfelt u? Zeg
              eerlijk: “Even de helper erbij.” Eén stap tegelijk is belangrijker dan snelheid.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <SeniorButton href="/contact" icon={Mail}>
            Vraag over les geven
          </SeniorButton>
        </div>
      </div>
    </main>
  );
}
