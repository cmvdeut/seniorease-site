import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Koop Mijn Bibliotheek | SeniorEase',
  description: 'Koop de Mijn Bibliotheek app via Google Play Store voor Android. Eenmalig €4,99.',
};

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.maureen.biblitoheek';

export default function BetalenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-2xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Mijn Bibliotheek kopen
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Eenmalig €4,99 — geen abonnement, levenslange licentie.
        </p>

        {/* Wat krijgt u */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
            Inbegrepen bij uw aankoop
          </h2>
          <ul className="space-y-3">
            {[
              'Onbeperkt boeken en muziek bijhouden',
              'Barcode scanner voor boeken',
              'Backup maken en terugzetten',
              'Offline werken mogelijk',
              'Toekomstige updates inbegrepen',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700" style={{ fontSize: '1.15rem' }}>
                <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#8B5E3C' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Play Store knop */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6 text-center">
          <p className="text-gray-700 mb-6" style={{ fontSize: '1.15rem' }}>
            Betaling gaat via de Google Play Store — veilig en vertrouwd.
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
            <Image
              src="/images/google-play-badge-nl.png"
              alt="Beschikbaar in Google Play"
              width={200}
              height={60}
              className="mx-auto"
            />
          </a>
          <div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold text-white py-4 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: '#8B5E3C', fontSize: '1.15rem' }}
            >
              Koop via Google Play Store →
            </a>
          </div>
          <p className="text-gray-400 mt-4" style={{ fontSize: '1rem' }}>
            iDEAL, creditcard en meer betaalmethoden beschikbaar
          </p>
        </div>

        {/* iPhone info */}
        <div className="rounded-xl p-6 border border-amber-200" style={{ background: '#FFFBF0' }}>
          <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.2rem' }}>
            iPhone of iPad?
          </h3>
          <p className="text-gray-700" style={{ fontSize: '1.1rem' }}>
            De app is momenteel alleen beschikbaar voor Android. Op iPhone en iPad kunt u{' '}
            <Link href="/bibliotheek" className="text-primary hover:underline font-medium">
              Mijn Bibliotheek gratis gebruiken via de browser
            </Link>
            .
          </p>
        </div>

      </div>
    </main>
  );
}
