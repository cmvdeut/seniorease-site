'use client';

import { useState } from 'react';
import DigitalDeliveryConsent from '@/app/components/DigitalDeliveryConsent';
import { DIGITAL_CONSENT_VERSION } from '@/lib/digital-delivery-consent-text';

type Props = {
  productLabel: string;
  referenceId: string;
  amountEur: number;
};

export function SessionsLiveTestClient({
  productLabel,
  referenceId,
  amountEur,
}: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [consented, setConsented] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/lesmateriaal/sessions-live-test/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; email?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || 'Toegang geweigerd.');
        return;
      }
      setSecret('');
      setEmail(data.email || email.trim().toLowerCase());
      setUnlocked(true);
    } catch {
      setError('Geen verbinding. Probeer opnieuw.');
    } finally {
      setBusy(false);
    }
  }

  async function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consented) {
      setError('Bevestig de toestemming voor digitale levering.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/lesmateriaal/create-checkout-live-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consented: true,
          consentVersion: DIGITAL_CONSENT_VERSION,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.url) {
        setError(data.error || 'Checkout kon niet worden gestart.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Geen verbinding met de betaalomgeving.');
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="mt-8 space-y-4">
        <p className="text-sm text-stone-600">
          Alleen met de server-side toegangscode en het ingestelde
          test-e-mailadres.
        </p>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-stone-800">Test-e-mail</span>
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2"
            required
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-stone-800">Toegangscode</span>
          <input
            type="password"
            autoComplete="off"
            value={secret}
            onChange={(ev) => setSecret(ev.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2"
            required
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded bg-stone-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {busy ? 'Bezig…' : 'Ontgrendel'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={startCheckout} className="mt-8 space-y-5">
      <div className="rounded border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800">
        <p>
          <strong>Product:</strong> {productLabel}
        </p>
        <p>
          <strong>Reference:</strong> {referenceId}
        </p>
        <p>
          <strong>Bedrag:</strong> €{amountEur.toFixed(2).replace('.', ',')}
        </p>
        <p>
          <strong>E-mail:</strong> {email}
        </p>
      </div>
      <DigitalDeliveryConsent
        id="sessions-live-test-consent"
        checked={consented}
        onChange={setConsented}
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={busy || !consented}
        className="rounded bg-stone-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {busy ? 'Bezig…' : 'Start LIVE Checkout Session'}
      </button>
      <p className="text-xs text-stone-500">
        Dit is een interne testroute. Gebruik alleen met het geconfigureerde
        testaccount.
      </p>
    </form>
  );
}
