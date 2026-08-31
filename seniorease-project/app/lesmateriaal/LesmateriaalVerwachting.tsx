import Link from 'next/link';
import { CalendarHeart, Coffee, HandHeart, Sparkles, ClipboardCheck } from 'lucide-react';
import SeniorButton from '@/app/components/SeniorButton';

const EXPECTATIONS = [
  {
    Icon: CalendarHeart,
    title: 'Klaar voor vandaag',
    text: 'Het draaiboek vertelt u minuut voor minuut wat u zegt — geen losse slides of improvisatie.',
  },
  {
    Icon: Coffee,
    title: 'Rustig en sociaal',
    text: '90 minuten doen-middag: max. 8–10 deelnemers, pauzes, lachen mag. Geen toets of tempo-druk.',
  },
  {
    Icon: HandHeart,
    title: 'Eigen telefoon of tablet',
    text: 'Iedereen oefent op het toestel dat ze thuis ook gebruiken. Print ligt op tafel; beamer is extra.',
  },
  {
    Icon: Sparkles,
    title: 'Herkenbare onderwerpen',
    text: 'WhatsApp, wifi, DigiD, veilig online, AI — aansluitend bij vragen die bezoekers u al stellen.',
  },
];

export function LesmateriaalVerwachting() {
  return (
    <section aria-labelledby="lesmateriaal-verwachting-heading" className="mb-14 md:mb-16">
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Voor buurthuis, bibliotheek en clubhuis
      </p>
      <h2
        id="lesmateriaal-verwachting-heading"
        className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold leading-tight mb-4 max-w-2xl"
      >
        Wat kan ik verwachten?
      </h2>
      <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
        U hoeft geen IT-docent te zijn. SeniorEase lesmateriaal is gemaakt voor{' '}
        <strong>vrijwilligers en begeleiders</strong> die een warme, laagdrempelige middag willen
        organiseren — in het buurthuis, op de bibliotheek of bij een vereniging. Download, print,
        nodig bezoekers uit en geef les wanneer het u uitkomt.
      </p>

      <ul className="grid sm:grid-cols-2 gap-4 mb-10 list-none p-0 m-0">
        {EXPECTATIONS.map(({ Icon, title, text }) => (
          <li
            key={title}
            className="rounded-senior bg-paper border border-navy/8 p-5 flex gap-4"
          >
            <Icon className="text-gold shrink-0 mt-0.5" size={22} aria-hidden />
            <div>
              <h3 className="font-serif text-navy font-semibold text-senior-sm mb-1.5">
                {title}
              </h3>
              <p className="text-navy/65 text-senior-sm leading-relaxed">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-senior bg-slate border border-navy/8 p-6 sm:p-7 max-w-2xl">
        <div className="flex gap-4">
          <ClipboardCheck className="text-gold shrink-0 mt-0.5" size={24} aria-hidden />
          <div>
            <h3 className="font-serif text-navy font-semibold text-senior-base mb-2">
              Eerst polsen bij uw bezoekers?
            </h3>
            <p className="text-navy/70 text-senior-sm leading-relaxed mb-4">
              Twijfelt u welk thema past? Print ons{' '}
              <strong>interesseformulier</strong>, leg het in de huiskamer of deel het bij
              vrijwilligersoverleg. Binnen een week weet u waar de vraag zit — zonder meteen te
              bestellen.
            </p>
            <div className="flex flex-wrap gap-3">
              <SeniorButton href="/lesmateriaal/interessepeiling" variant="primary">
                Formulier openen en printen
              </SeniorButton>
              <Link
                href="/lesmateriaal/begeleiders"
                className="inline-flex items-center min-h-touch px-5 text-gold font-semibold text-senior-sm hover:text-gold-light"
              >
                Tips voor begeleiders →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
