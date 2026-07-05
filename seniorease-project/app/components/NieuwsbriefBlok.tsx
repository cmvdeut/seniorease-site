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
    <section id="nieuwsbrief" className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-8 mx-auto max-w-2xl text-center scroll-mt-24">
      <div className="inline-flex rounded-xl p-2.5 bg-primary-soft mb-3">
        <Mail size={26} strokeWidth={1.75} className="text-primary" />
      </div>
      <h2 className="text-senior-xl mb-2">
        Ontvang elke week een digitale tip
      </h2>
      <p className="text-gray-600 mb-6">
        Gratis. Geen spam. Altijd opzegbaar.
      </p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-left">
          <p className="font-bold text-green-800 mb-1" style={{ fontSize: '1.15rem' }}>
            Bedankt voor uw aanmelding!
          </p>
          <p className="text-green-700" style={{ fontSize: '1.05rem' }}>
            U ontvangt binnenkort uw eerste tip per e-mail. Kijk ook even in uw spam-map als u niets ziet.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label htmlFor="nieuwsbrief-email" className="block font-bold text-gray-800 mb-2" style={{ fontSize: '1.1rem' }}>
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
              className={`w-full rounded-xl border bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-neutral-stone/60'
              }`}
              style={{ fontSize: '1.2rem', padding: '0.9rem 1.25rem' }}
            />
            {error && (
              <p className="mt-2 text-red-600" style={{ fontSize: '1rem' }}>{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold text-white py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 bg-primary"
            style={{ fontSize: '1.15rem' }}
          >
            {isSubmitting ? 'Even geduld...' : 'Meld me aan →'}
          </button>

          <p className="text-gray-500 text-center" style={{ fontSize: '0.95rem' }}>
            Eén tip per week. U kunt zich altijd uitschrijven via de link onderaan elke e-mail.
          </p>
        </form>
      )}
    </section>
  );
}
