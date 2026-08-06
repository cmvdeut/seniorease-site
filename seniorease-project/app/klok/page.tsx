'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Mode = 'klok' | 'aftellen';

const PRESETS = [
  { label: '1 minuut', seconds: 60 },
  { label: '5 minuten', seconds: 5 * 60 },
  { label: '10 minuten', seconds: 10 * 60 },
  { label: '15 minuten', seconds: 15 * 60 },
  { label: '30 minuten', seconds: 30 * 60 },
  { label: '1 uur', seconds: 60 * 60 },
] as const;

function formatClock(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return {
      main: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
      sub: String(sec).padStart(2, '0'),
    };
  }
  return {
    main: `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
    sub: null as string | null,
  };
}

export default function KlokPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>('klok');
  const [time, setTime] = useState<Date | null>(null);

  // Aftellen
  const [remaining, setRemaining] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endAtRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
  }, []);

  // Klok-tick (alleen in klok-modus, na mount)
  useEffect(() => {
    if (!mounted || mode !== 'klok') return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mounted, mode]);

  // Aftel-tick
  useEffect(() => {
    if (!running || mode !== 'aftellen') return;

    const tick = () => {
      if (endAtRef.current == null) return;
      const left = Math.ceil((endAtRef.current - Date.now()) / 1000);
      if (left <= 0) {
        setRemaining(0);
        setRunning(false);
        setFinished(true);
        endAtRef.current = null;
        return;
      }
      setRemaining(left);
    };

    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [running, mode]);

  const startCountdown = () => {
    if (remaining <= 0) return;
    endAtRef.current = Date.now() + remaining * 1000;
    setFinished(false);
    setRunning(true);
  };

  const pauseCountdown = () => {
    if (endAtRef.current != null) {
      setRemaining(Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000)));
    }
    endAtRef.current = null;
    setRunning(false);
  };

  const resetCountdown = (seconds?: number) => {
    endAtRef.current = null;
    setRunning(false);
    setFinished(false);
    setRemaining(seconds ?? 5 * 60);
  };

  const adjustCountdown = (delta: number) => {
    if (running) return;
    setFinished(false);
    setRemaining((r) => Math.max(0, Math.min(99 * 3600, r + delta)));
  };

  const dagen = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  const maanden = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ];

  const tabClass = (active: boolean) =>
    `flex-1 min-h-[56px] px-4 py-3 rounded-full font-semibold text-senior-sm transition-colors ${
      active
        ? 'bg-gold text-white'
        : 'bg-paper text-navy border border-navy/10 hover:border-gold/40'
    }`;

  const clockParts = time
    ? {
        uren: String(time.getHours()).padStart(2, '0'),
        minuten: String(time.getMinutes()).padStart(2, '0'),
        seconden: String(time.getSeconds()).padStart(2, '0'),
        dagNaam: dagen[time.getDay()],
        datum: `${time.getDate()} ${maanden[time.getMonth()]} ${time.getFullYear()}`,
      }
    : null;

  const countParts = formatClock(remaining);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="border-b border-navy/10 py-5">
        <div className="max-w-senior mx-auto px-5 sm:px-6 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold text-senior-sm min-h-[44px]"
          >
            ← Terug naar tools
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/heart-logo.png"
              alt=""
              width={56}
              height={56}
              className="w-14 h-14"
            />
            <h1 className="font-serif text-navy text-senior-xl font-semibold">Grote klok</h1>
          </div>
          <Link
            href="/animaties/klok"
            className="min-h-[44px] px-5 py-2 rounded-full bg-gold hover:bg-gold-light text-white font-semibold text-senior-sm inline-flex items-center"
          >
            Bekijk uitleg
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 sm:px-6 py-8 w-full max-w-5xl mx-auto">
        <div className="flex gap-3 mb-8 w-full max-w-xl" role="tablist" aria-label="Klok of aftellen">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'klok'}
            className={tabClass(mode === 'klok')}
            onClick={() => {
              setMode('klok');
              pauseCountdown();
            }}
          >
            Klok
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'aftellen'}
            className={tabClass(mode === 'aftellen')}
            onClick={() => setMode('aftellen')}
          >
            Aftellen
          </button>
        </div>

        {mode === 'klok' ? (
          <>
            <div className="bg-paper rounded-senior border border-navy/8 p-8 sm:p-16 mb-6 w-full shadow-sm">
              <div className="text-center" aria-live="polite">
                {!mounted || !clockParts ? (
                  <div className="text-[5rem] sm:text-[8rem] md:text-[11rem] font-bold text-navy/25 leading-none tracking-tight mb-4">
                    --:--
                  </div>
                ) : (
                  <>
                    <div className="text-[5rem] sm:text-[8rem] md:text-[11rem] font-bold text-navy leading-none tracking-tight mb-4">
                      {clockParts.uren}:{clockParts.minuten}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-1 w-16 sm:w-20 bg-navy/15 rounded" />
                      <div className="text-senior-2xl text-navy/55 font-medium">{clockParts.seconden}</div>
                      <div className="h-1 w-16 sm:w-20 bg-navy/15 rounded" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate rounded-senior border border-navy/8 p-8 sm:p-12 w-full">
              <div className="text-center">
                {!mounted || !clockParts ? (
                  <p className="text-senior-xl text-navy/30 m-0">—</p>
                ) : (
                  <>
                    <div className="font-serif text-senior-2xl font-semibold text-navy mb-2">
                      {clockParts.dagNaam}
                    </div>
                    <div className="text-senior-xl text-navy/75">{clockParts.datum}</div>
                  </>
                )}
              </div>
            </div>

            <p className="mt-8 text-senior-sm text-navy/60 text-center m-0">
              Tip: druk op F11 voor volledig scherm
            </p>
          </>
        ) : (
          <>
            <div
              className={`rounded-senior border p-8 sm:p-16 mb-6 w-full shadow-sm transition-colors ${
                finished
                  ? 'bg-gold/15 border-gold'
                  : 'bg-paper border-navy/8'
              }`}
            >
              <div className="text-center" aria-live="polite">
                <p className="text-senior-sm text-navy/60 mb-3 m-0 font-semibold">
                  {finished ? 'Klaar!' : running ? 'Bezig met aftellen…' : 'Aftellen'}
                </p>
                <div
                  className={`text-[5rem] sm:text-[8rem] md:text-[10rem] font-bold leading-none tracking-tight mb-2 ${
                    finished ? 'text-gold' : 'text-navy'
                  }`}
                >
                  {countParts.main}
                </div>
                {countParts.sub !== null && (
                  <div className="text-senior-2xl text-navy/55 font-medium">{countParts.sub}</div>
                )}
              </div>
            </div>

            <div className="w-full max-w-xl space-y-4 mb-6">
              <p className="text-senior-xs font-semibold text-navy/60 text-center m-0">Snel kiezen</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.seconds}
                    type="button"
                    disabled={running}
                    onClick={() => resetCountdown(p.seconds)}
                    className="min-h-[52px] rounded-full border border-navy/15 bg-paper text-navy font-semibold text-senior-sm hover:border-gold disabled:opacity-40 touch-manipulation"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <p className="text-senior-xs font-semibold text-navy/60 text-center m-0 pt-2">
                Zelf instellen
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  disabled={running}
                  onClick={() => adjustCountdown(-60)}
                  className="min-h-[52px] min-w-[100px] rounded-full bg-slate border border-navy/10 text-navy font-bold text-senior-sm disabled:opacity-40 touch-manipulation"
                >
                  − 1 min
                </button>
                <button
                  type="button"
                  disabled={running}
                  onClick={() => adjustCountdown(60)}
                  className="min-h-[52px] min-w-[100px] rounded-full bg-slate border border-navy/10 text-navy font-bold text-senior-sm disabled:opacity-40 touch-manipulation"
                >
                  + 1 min
                </button>
                <button
                  type="button"
                  disabled={running}
                  onClick={() => adjustCountdown(5 * 60)}
                  className="min-h-[52px] min-w-[100px] rounded-full bg-slate border border-navy/10 text-navy font-bold text-senior-sm disabled:opacity-40 touch-manipulation"
                >
                  + 5 min
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {!running ? (
                  <button
                    type="button"
                    disabled={remaining <= 0}
                    onClick={startCountdown}
                    className="flex-1 min-h-touch rounded-full bg-gold hover:bg-gold-light text-white font-semibold text-senior-sm disabled:opacity-40 touch-manipulation"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pauseCountdown}
                    className="flex-1 min-h-touch rounded-full bg-navy text-white font-semibold text-senior-sm touch-manipulation"
                  >
                    Pauze
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => resetCountdown(5 * 60)}
                  className="flex-1 min-h-touch rounded-full border-2 border-navy/15 bg-paper text-navy font-semibold text-senior-sm touch-manipulation"
                >
                  Reset
                </button>
              </div>
            </div>

            {finished && (
              <p className="text-senior-base text-gold font-semibold text-center m-0" role="status">
                De tijd is om.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
