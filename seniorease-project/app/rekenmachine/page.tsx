'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RekenmachinePage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
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

  const Button = ({ onClick, children, className = '' }: { onClick: () => void; children: React.ReactNode; className?: string }) => {
    // Base classes for all buttons
    const baseClasses = 'border-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg min-h-[80px] min-w-[80px] flex items-center justify-center text-senior-2xl';
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-cream flex flex-col">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center gap-3 text-primary hover:text-primary-dark transition-colors font-semibold"
            >
              <span className="text-3xl">←</span>
              <span className="text-senior-base">Terug naar home</span>
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={100} 
                height={100}
                className="w-32 h-32"
              />
              <div>
                <h1 className="text-senior-xl font-bold text-primary">Rekenmachine</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Calculator */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8">
            
            {/* Display */}
            <div className="bg-neutral-cream rounded-xl p-6 mb-6 border-4 border-primary">
              <div className="text-right">
                <div className="text-senior-4xl font-bold text-primary font-mono break-all min-h-[100px] flex items-center justify-end">
                  {display}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-4">
              {/* Row 1 */}
              <Button onClick={clear} className="col-span-2 bg-secondary text-white border-secondary hover:bg-secondary-dark">
                Wissen
              </Button>
              <Button onClick={() => performOperation('÷')} className="bg-primary text-white border-primary hover:bg-primary-dark text-senior-3xl">
                ÷
              </Button>
              <Button onClick={() => performOperation('×')} className="bg-primary text-white border-primary hover:bg-primary-dark text-senior-3xl">
                ×
              </Button>

              {/* Row 2 */}
              <Button onClick={() => inputNumber('7')}>7</Button>
              <Button onClick={() => inputNumber('8')}>8</Button>
              <Button onClick={() => inputNumber('9')}>9</Button>
              <Button onClick={() => performOperation('-')} className="bg-primary text-white border-primary hover:bg-primary-dark text-senior-3xl">
                −
              </Button>

              {/* Row 3 */}
              <Button onClick={() => inputNumber('4')}>4</Button>
              <Button onClick={() => inputNumber('5')}>5</Button>
              <Button onClick={() => inputNumber('6')}>6</Button>
              <Button onClick={() => performOperation('+')} className="bg-primary text-white border-primary hover:bg-primary-dark text-senior-3xl">
                +
              </Button>

              {/* Row 4 */}
              <Button onClick={() => inputNumber('1')}>1</Button>
              <Button onClick={() => inputNumber('2')}>2</Button>
              <Button onClick={() => inputNumber('3')}>3</Button>
              <Button onClick={handleEquals} className="row-span-2 bg-primary text-white border-primary hover:bg-primary-dark">
                =
              </Button>

              {/* Row 5 */}
              <Button onClick={() => inputNumber('0')} className="col-span-2">0</Button>
              <Button onClick={inputDecimal}>.</Button>
            </div>

            {/* Info */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="text-senior-sm text-blue-900 text-center">
                💡 Tip: Gebruik grote knoppen voor eenvoudig rekenen
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

