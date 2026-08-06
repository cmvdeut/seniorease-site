'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Mode = 'rekenen' | 'valuta';

const CURRENCIES = [
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'USD', label: 'Amerikaanse dollar (USD)' },
  { code: 'GBP', label: 'Britse pond (GBP)' },
  { code: 'CHF', label: 'Zwitserse frank (CHF)' },
  { code: 'TRY', label: 'Turkse lira (TRY)' },
  { code: 'PLN', label: 'Poolse zloty (PLN)' },
  { code: 'CAD', label: 'Canadese dollar (CAD)' },
  { code: 'AUD', label: 'Australische dollar (AUD)' },
  { code: 'THB', label: 'Thaise baht (THB)' },
  { code: 'SEK', label: 'Zweedse kroon (SEK)' },
  { code: 'ZAR', label: 'Zuid-Afrikaanse rand (ZAR)' },
] as const;

type CurrencyCode = (typeof CURRENCIES)[number]['code'];

function formatNl(n: number, maxFrac = 4) {
  return new Intl.NumberFormat('nl-NL', {
    maximumFractionDigits: maxFrac,
    minimumFractionDigits: 0,
  }).format(n);
}

function CalcButton({
  onClick,
  children,
  className = '',
  wide,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[72px] sm:min-h-[80px] rounded-senior border border-navy/10 font-bold text-navy text-senior-xl sm:text-senior-2xl hover:bg-slate transition-colors active:scale-[0.98] flex items-center justify-center bg-paper ${
        wide ? 'col-span-2' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default function RekenmachinePage() {
  const [mode, setMode] = useState<Mode>('rekenen');

  // Calculator
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Currency
  const [amount, setAmount] = useState('100');
  const [fromCur, setFromCur] = useState<CurrencyCode>('EUR');
  const [toCur, setToCur] = useState<CurrencyCode>('USD');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const calculate = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }
    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const convert = useCallback(async () => {
    const value = parseFloat(amount.replace(',', '.'));
    if (!Number.isFinite(value) || value < 0) {
      setError('Vul een geldig bedrag in.');
      setResult(null);
      return;
    }
    if (fromCur === toCur) {
      setResult(value);
      setRate(1);
      setRateDate(null);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // api.frankfurter.app redirect mist CORS — gebruik het canonieke .dev-endpoint
      const url = `https://api.frankfurter.dev/v1/latest?from=${fromCur}&to=${toCur}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Koers ophalen mislukt');
      const data = (await res.json()) as {
        date?: string;
        rates?: Record<string, number>;
      };
      const r = data.rates?.[toCur];
      if (typeof r !== 'number') throw new Error('Valuta niet beschikbaar');
      setRate(r);
      setResult(value * r);
      setRateDate(data.date ?? null);
    } catch {
      setError('De wisselkoers kon niet worden opgehaald. Probeer het zo opnieuw.');
      setResult(null);
      setRate(null);
    } finally {
      setLoading(false);
    }
  }, [amount, fromCur, toCur]);

  useEffect(() => {
    if (mode !== 'valuta') return;
    const t = setTimeout(() => {
      void convert();
    }, 300);
    return () => clearTimeout(t);
  }, [mode, convert]);

  const swapCurrencies = () => {
    setFromCur(toCur);
    setToCur(fromCur);
  };

  const tabClass = (active: boolean) =>
    `flex-1 min-h-[56px] px-4 py-3 rounded-full font-semibold text-senior-sm transition-colors ${
      active
        ? 'bg-gold text-white'
        : 'bg-paper text-navy border border-navy/10 hover:border-gold/40'
    }`;

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
              src="/images/tools/rekenmachine.png"
              alt=""
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <h1 className="font-serif text-navy text-senior-xl font-semibold">Rekenmachine</h1>
          </div>
          <div className="w-[140px] hidden sm:block" aria-hidden />
        </div>
      </header>

      <main className="flex-1 max-w-senior mx-auto px-5 sm:px-6 py-8 w-full">
        <div className="max-w-xl mx-auto">
          <div className="flex gap-3 mb-8" role="tablist" aria-label="Rekenmachine of valuta">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'rekenen'}
              className={tabClass(mode === 'rekenen')}
              onClick={() => setMode('rekenen')}
            >
              Rekenen
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'valuta'}
              className={tabClass(mode === 'valuta')}
              onClick={() => setMode('valuta')}
            >
              Valuta omrekenen
            </button>
          </div>

          {mode === 'rekenen' ? (
            <div className="bg-slate rounded-senior border border-navy/8 p-5 sm:p-7">
              <div
                className="bg-paper rounded-senior border border-navy/8 p-5 mb-5 min-h-[100px] flex items-center justify-end"
                aria-live="polite"
              >
                <p className="font-bold text-navy font-mono text-right break-all text-[2.5rem] sm:text-[3.25rem] leading-tight m-0">
                  {display}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <CalcButton onClick={clear} wide className="bg-navy text-white border-navy hover:bg-navy-light">
                  Wissen
                </CalcButton>
                <CalcButton
                  onClick={() => performOperation('÷')}
                  className="bg-gold text-white border-gold hover:bg-gold-light"
                >
                  ÷
                </CalcButton>
                <CalcButton
                  onClick={() => performOperation('×')}
                  className="bg-gold text-white border-gold hover:bg-gold-light"
                >
                  ×
                </CalcButton>

                <CalcButton onClick={() => inputNumber('7')}>7</CalcButton>
                <CalcButton onClick={() => inputNumber('8')}>8</CalcButton>
                <CalcButton onClick={() => inputNumber('9')}>9</CalcButton>
                <CalcButton
                  onClick={() => performOperation('-')}
                  className="bg-gold text-white border-gold hover:bg-gold-light"
                >
                  −
                </CalcButton>

                <CalcButton onClick={() => inputNumber('4')}>4</CalcButton>
                <CalcButton onClick={() => inputNumber('5')}>5</CalcButton>
                <CalcButton onClick={() => inputNumber('6')}>6</CalcButton>
                <CalcButton
                  onClick={() => performOperation('+')}
                  className="bg-gold text-white border-gold hover:bg-gold-light"
                >
                  +
                </CalcButton>

                <CalcButton onClick={() => inputNumber('1')}>1</CalcButton>
                <CalcButton onClick={() => inputNumber('2')}>2</CalcButton>
                <CalcButton onClick={() => inputNumber('3')}>3</CalcButton>
                <CalcButton
                  onClick={handleEquals}
                  className="row-span-2 bg-gold text-white border-gold hover:bg-gold-light"
                >
                  =
                </CalcButton>

                <CalcButton onClick={() => inputNumber('0')} wide>
                  0
                </CalcButton>
                <CalcButton onClick={inputDecimal}>.</CalcButton>
              </div>
            </div>
          ) : (
            <div className="bg-slate rounded-senior border border-navy/8 p-5 sm:p-7 space-y-5">
              <div>
                <label htmlFor="valuta-bedrag" className="block font-semibold text-navy text-senior-sm mb-2">
                  Bedrag
                </label>
                <input
                  id="valuta-bedrag"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full min-h-touch rounded-senior border-2 border-navy/12 bg-paper text-navy text-senior-lg px-5 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
              </div>

              <div>
                <label htmlFor="valuta-van" className="block font-semibold text-navy text-senior-sm mb-2">
                  Van
                </label>
                <select
                  id="valuta-van"
                  value={fromCur}
                  onChange={(e) => setFromCur(e.target.value as CurrencyCode)}
                  className="w-full min-h-touch rounded-senior border-2 border-navy/12 bg-paper text-navy text-senior-sm px-4 py-3 focus:outline-none focus:border-gold"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={swapCurrencies}
                  className="min-h-[48px] min-w-[48px] px-5 rounded-full bg-paper border border-navy/10 text-gold font-semibold text-senior-sm hover:border-gold"
                  aria-label="Valuta omdraaien"
                >
                  ↕ Omdraaien
                </button>
              </div>

              <div>
                <label htmlFor="valuta-naar" className="block font-semibold text-navy text-senior-sm mb-2">
                  Naar
                </label>
                <select
                  id="valuta-naar"
                  value={toCur}
                  onChange={(e) => setToCur(e.target.value as CurrencyCode)}
                  className="w-full min-h-touch rounded-senior border-2 border-navy/12 bg-paper text-navy text-senior-sm px-4 py-3 focus:outline-none focus:border-gold"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => void convert()}
                disabled={loading}
                className="w-full min-h-touch rounded-full bg-gold hover:bg-gold-light text-white font-semibold text-senior-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Even geduld…' : 'Omrekenen'}
              </button>

              {error && (
                <p className="text-red-700 text-senior-sm m-0" role="alert">
                  {error}
                </p>
              )}

              {result !== null && !error && (
                <div
                  className="bg-paper rounded-senior border border-navy/8 p-5 text-center"
                  aria-live="polite"
                >
                  <p className="text-navy/60 text-senior-sm mb-2 m-0">Resultaat</p>
                  <p className="font-serif text-navy text-[1.75rem] sm:text-[2.1rem] font-semibold m-0 leading-tight">
                    {formatNl(result, 2)} {toCur}
                  </p>
                  {rate !== null && (
                    <p className="text-navy/65 text-senior-xs mt-3 m-0">
                      Koers: 1 {fromCur} = {formatNl(rate, 4)} {toCur}
                      {rateDate
                        ? ` · ${new Date(rateDate).toLocaleDateString('nl-NL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}`
                        : ''}
                    </p>
                  )}
                </div>
              )}

              <p className="text-navy/55 text-senior-xs leading-relaxed m-0">
                Koersen via de Europese Centrale Bank (Frankfurter). Dit is een indicatie — uw bank
                kan een iets andere koers gebruiken.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
