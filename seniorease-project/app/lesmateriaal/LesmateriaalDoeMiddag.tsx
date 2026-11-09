import { BookOpen, Coffee } from 'lucide-react';

/**
 * Gebruiksvormen van bestaand lesmateriaal — geen apart product of SE-event.
 */
export function LesmateriaalDoeMiddag() {
  return (
    <section
      aria-labelledby="lesmateriaal-doe-middag-heading"
      className="mb-14 md:mb-16"
    >
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Flexibel inzetten
      </p>
      <h2
        id="lesmateriaal-doe-middag-heading"
        className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold leading-tight mb-4 max-w-2xl"
      >
        Van computerles tot gezellige Doe-Middag
      </h2>
      <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
        Met hetzelfde kant-en-klare activiteiten- en lesmateriaal kiest u wat past: een rustige
        lesreeks, of een gezellige Doe-Middag. Eén bijeenkomst of meerdere middagen — u bepaalt
        het tempo. Inclusief downloadbare PDF’s met draaiboek en oefentaken.
      </p>

      <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
        <li className="rounded-senior bg-paper border border-navy/8 p-5 sm:p-6 flex gap-4">
          <BookOpen className="text-gold shrink-0 mt-0.5" size={22} aria-hidden />
          <div>
            <h3 className="font-serif text-navy font-semibold text-senior-base mb-2">
              Als les of cursus
            </h3>
            <ul className="space-y-1.5 text-navy/65 text-senior-sm leading-relaxed list-disc pl-4 m-0">
              <li>Gestructureerd leren in meerdere bijeenkomsten</li>
              <li>Duidelijke uitleg en praktische oefeningen</li>
              <li>Geschikt voor begeleiders en vrijwilligers</li>
            </ul>
          </div>
        </li>
        <li className="rounded-senior bg-paper border border-navy/8 p-5 sm:p-6 flex gap-4">
          <Coffee className="text-gold shrink-0 mt-0.5" size={22} aria-hidden />
          <div>
            <h3 className="font-serif text-navy font-semibold text-senior-base mb-2">
              Als Doe-Middag
            </h3>
            <ul className="space-y-1.5 text-navy/65 text-senior-sm leading-relaxed list-disc pl-4 m-0">
              <li>Een gezellige, laagdrempelige groepsactiviteit</li>
              <li>Samen ontdekken en direct uitproberen</li>
              <li>Deelnemers oefenen met hun eigen apparaten</li>
              <li>Geschikt voor buurthuizen, wijkcentra en seniorenverenigingen</li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}
