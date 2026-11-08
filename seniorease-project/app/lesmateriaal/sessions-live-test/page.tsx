import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getSessionsLiveTestEmail,
  isSessionsLiveTestEnabled,
  resolveSessionsLiveTestCatalog,
} from '@/lib/lesmateriaal-sessions-live-test';
import { SessionsLiveTestClient } from './SessionsLiveTestClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Sessions live-test (intern)',
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Afgeschermde testpagina. Zonder live-test secret-env → 404.
 * Geen secrets in HTML/URL.
 */
export default function SessionsLiveTestPage() {
  if (!isSessionsLiveTestEnabled()) {
    notFound();
  }

  const catalog = resolveSessionsLiveTestCatalog();
  const email = getSessionsLiveTestEmail();
  if (!catalog || !email) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">
        Sessions live-test (intern)
      </h1>
      <p className="mt-3 text-stone-700">
        Gecontroleerde Checkout Sessions-keten voor één vaste losse les. De
        publieke webshop blijft Payment Links.
      </p>
      <SessionsLiveTestClient
        productLabel={catalog.productLabel}
        referenceId={catalog.referenceId}
        amountEur={catalog.amountEur}
      />
    </main>
  );
}
