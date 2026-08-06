'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NieuwsbriefBlok() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('idle');

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Vul uw e-mailadres in');
      return;
    }
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Dit e-mailadres lijkt niet te kloppen');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/nieuwsbrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setError(data.error || 'Aanmelden mislukt. Probeer het opnieuw.');
      }
    } catch {
      setStatus('error');
      setError('Er ging iets mis. Controleer uw internetverbinding en probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="nieuwsbrief"
      className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9 max-w-2xl scroll-mt-24"
    >
      <div className="inline-flex rounded-2xl p-3 bg-paper text-gold mb-4">
        <Mail size={26} strokeWidth={1.75} aria-hidden />
      </div>
      <h2 className="font-serif text-navy text-senior-lg font-semibold mb-2">
        Ontvang elke week een digitale tip
      </h2>
      <p className="text-navy/70 text-senior-sm mb-6 leading-relaxed">
        Gratis. Geen spam. Altijd opzegbaar.
      </p>

      {status === 'success' ? (
        <div className="bg-paper border border-navy/10 rounded-senior p-5 text-left">
          <p className="font-semibold text-navy text-senior-sm mb-1">Bedankt voor uw aanmelding!</p>
          <p className="text-navy/75 text-senior-sm leading-relaxed m-0">
            U ontvangt binnenkort uw eerste tip per e-mail. Kijk ook even in uw spam-map als u
            niets ziet.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label
              htmlFor="nieuwsbrief-email"
              className="block font-semibold text-navy text-senior-sm mb-2"
            >
              Uw e-mailadres
            </label>
            <input
              id="nieuwsbrief-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
                if (status === 'error') setStatus('idle');
              }}
              placeholder="bijvoorbeeld@email.nl"
              autoComplete="email"
              className={`w-full min-h-touch rounded-senior border-2 bg-paper text-navy text-senior-sm placeholder:text-navy/40 px-5 py-3.5 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 ${
                error ? 'border-red-300 bg-red-50' : 'border-navy/12'
              }`}
            />
            {error && <p className="mt-2 text-red-700 text-senior-xs">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-touch font-semibold text-white text-senior-sm py-3.5 rounded-full bg-gold hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Even geduld...' : 'Meld me aan →'}
          </button>

          <p className="text-navy/55 text-senior-xs text-center leading-relaxed m-0">
            Eén tip per week. U kunt zich altijd uitschrijven via de link onderaan elke e-mail.
          </p>
        </form>
      )}
    </section>
  );
}
