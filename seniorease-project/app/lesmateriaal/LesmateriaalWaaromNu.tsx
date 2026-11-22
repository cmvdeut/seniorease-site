import Link from 'next/link';

const STATS = [
  {
    figure: '69%',
    text: 'van de Nederlandse ouderen is bang om digitaal fouten te maken. Leren in een kleine groep, met geduldige uitleg, helpt.',
    sourceHref:
      'https://www.vodafoneziggo.nl/nieuws/nederland-is-digitaal-actief-maar-zelfvertrouwen-blijft-achter/',
    sourceLabel: 'VodafoneZiggo',
  },
  {
    figure: '40–45%',
    text: 'van de 65-plussers heeft moeite met de basis: inloggen, navigeren, begrijpen wat een scherm vraagt.',
    sourceHref:
      'https://www.utwente.nl/nl/centrumdigitaleinclusie/nieuws/2026/4/897581/hoe-steeds-meer-mensen-vastlopen-in-de-digitale-wereld.-en-nee-het-gaat-niet-alleen-om-ouderen',
    sourceLabel: 'Universiteit Twente',
  },
  {
    figure: '5%',
    text: 'van de onderzochte trainingen voor digitale veiligheid richt zich vooral op ouderen — en meestal op kennis, niet op oefenen.',
    sourceHref:
      'https://www.uva.nl/nieuws/2026/nederlanders-voelen-zich-digitaal-vaardig-maar-veilig-gedrag-blijft-achter',
    sourceLabel: 'Universiteit van Amsterdam',
  },
] as const;

export function LesmateriaalWaaromNu() {
  return (
    <section
      aria-labelledby="lesmateriaal-waarom-nu-heading"
      className="mb-14 md:mb-16"
    >
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Voor coördinatoren en bestuur
      </p>
      <h2
        id="lesmateriaal-waarom-nu-heading"
        className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold leading-tight mb-3 max-w-2xl"
      >
        Waarom nu?
      </h2>
      <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
        Drie cijfers die helpen om intern uit te leggen waarom een digitale Doe-Middag
        past — op het eigen toestel, in een kleine groep, zonder schoolgevoel.
      </p>

      <ul className="grid sm:grid-cols-3 gap-4 mb-8 list-none p-0 m-0">
        {STATS.map(({ figure, text, sourceHref, sourceLabel }) => (
          <li
            key={figure}
            className="rounded-senior bg-paper border border-navy/8 p-5 flex flex-col"
          >
            <p className="font-serif text-navy text-[1.65rem] font-semibold leading-none mb-3">
              {figure}
            </p>
            <p className="text-navy/70 text-senior-sm leading-relaxed flex-1 mb-4">{text}</p>
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold text-senior-xs hover:text-gold-light"
            >
              Bron: {sourceLabel} →
            </a>
          </li>
        ))}
      </ul>

      <p className="text-navy/75 text-senior-sm leading-relaxed max-w-2xl mb-6">
        Daarom: kijken → doen → controleren → zelf proberen. Geen dikke theorie — wel
        houvast voor de begeleider en oefening voor de deelnemer.
      </p>

      <div className="rounded-senior bg-slate border border-navy/8 p-5 sm:p-6 max-w-2xl">
        <h3 className="font-serif text-navy font-semibold text-senior-base mb-2">
          Verder hulp in de buurt
        </h3>
        <p className="text-navy/70 text-senior-sm leading-relaxed mb-3">
          SeniorEase is lesmateriaal voor uw organisatie — geen vervanging van lokale
          hulppunten. Verwijs gerust door:
        </p>
        <ul className="text-navy/75 text-senior-sm leading-relaxed space-y-2 list-none p-0 m-0">
          <li>
            <strong className="text-navy">Digi-Hulplijn</strong>{' '}
            <a
              href="tel:08001508"
              className="text-gold font-semibold hover:text-gold-light"
            >
              0800 1508
            </a>{' '}
            — gratis telefonische hulp bij digitale vragen.
          </li>
          <li>
            <strong className="text-navy">Informatiepunt Digitale Overheid</strong> in
            veel bibliotheken — voor DigiD, MijnOverheid en overheidszaken.{' '}
            <Link
              href="/digitale-hulp"
              className="text-gold font-semibold hover:text-gold-light"
            >
              Gratis digitale hulp op deze site →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
