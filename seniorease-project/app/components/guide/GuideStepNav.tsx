import Link from 'next/link';

type GuideStepNavProps = {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
};

export default function GuideStepNav({
  prevHref = '/digitale-hulp',
  prevLabel = 'Vorige stap',
  nextHref,
  nextLabel = 'Volgende stap',
}: GuideStepNavProps) {
  const btn =
    'inline-flex items-center justify-center min-h-[56px] px-8 py-3.5 font-semibold text-white bg-gold hover:bg-gold-light rounded-2xl transition-colors text-senior-base text-center w-full';

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Link href={prevHref} className={btn}>
        {prevLabel}
      </Link>
      {nextHref ? (
        <Link href={nextHref} className={btn}>
          {nextLabel}
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden />
      )}
    </div>
  );
}
