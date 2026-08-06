'use client';

import { MAX_PUZZLES_PER_HOUR } from './puzzle-limit';

type Props = {
  title?: string;
  detail?: string;
  socialTip: string;
  puzzlesLeftThisHour: number;
  minutesUntilNext?: number;
};

export default function PuzzleDoneBanner({
  title = 'Goed gedaan!',
  detail,
  socialTip,
  puzzlesLeftThisHour,
  minutesUntilNext = 0,
}: Props) {
  return (
    <div className="rounded-senior border border-navy/10 bg-slate p-6 sm:p-8 text-center space-y-4">
      <p className="font-serif text-navy text-senior-xl font-semibold m-0">{title}</p>
      {detail ? <p className="text-senior-sm text-navy/75 m-0">{detail}</p> : null}

      <div className="rounded-xl bg-paper border border-gold/30 p-5 text-left">
        <p className="text-senior-sm font-semibold text-navy m-0 mb-2">Nu iets anders doen</p>
        <p className="text-senior-sm text-navy/80 m-0 leading-relaxed">
          Puzzelen is leuk — daarna is het goed om even iets <strong>sociaals</strong> te doen.
        </p>
        <p className="text-senior-sm text-gold font-semibold m-0 mt-3 leading-relaxed">
          Tip: {socialTip}
        </p>
      </div>

      {puzzlesLeftThisHour > 0 ? (
        <p className="text-senior-xs text-navy/60 m-0">
          U mag dit uur nog {puzzlesLeftThisHour} puzzel
          {puzzlesLeftThisHour === 1 ? '' : 's'} spelen.
        </p>
      ) : (
        <p className="text-senior-xs text-navy/60 m-0">
          U heeft dit uur al {MAX_PUZZLES_PER_HOUR} puzzels gedaan. Over ongeveer{' '}
          {minutesUntilNext} minuut{minutesUntilNext === 1 ? '' : 'en'} mag u weer puzzelen —
          tot die tijd: even iets sociaals!
        </p>
      )}
    </div>
  );
}
