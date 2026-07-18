import Link from 'next/link';
import Image from 'next/image';
import MobileDownload from '../components/MobileDownload';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/download',
  title: 'Download Mijn Bibliotheek',
  description: 'Download de Mijn Bibliotheek app via Google Play Store voor Android.',
  keywords: ['download Mijn Bibliotheek', 'Android app', 'Google Play'],
});

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.maureen.biblitoheek';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-2xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Download Mijn Bibliotheek
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Beschikbaar in de Google Play Store voor Android.
        </p>

        {/* Play Store knop */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6 text-center">
          <p className="text-gray-700 mb-6" style={{ fontSize: '1.15rem' }}>
            Klik op de knop hieronder om de app te openen in de Google Play Store:
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="/images/google-play-badge-nl.png"
              alt="Beschikbaar in Google Play"
              width={200}
              height={60}
              className="mx-auto"
            />
          </a>
          <div className="mt-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold text-white py-4 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: '#8B5E3C', fontSize: '1.15rem' }}
            >
              Naar Google Play Store →
            </a>
          </div>
        </div>

        {/* QR code */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.5rem' }}>
            Of scan de QR-code
          </h2>
          <p className="text-gray-500 mb-6" style={{ fontSize: '1.1rem' }}>
            Open de camera-app op uw telefoon en richt op de code.
          </p>
          <MobileDownload />
        </div>

        {/* Stappenplan */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
            Hoe installeert u de app?
          </h2>
          <ol className="space-y-3">
            {[
              'Open de Google Play Store op uw Android telefoon of tablet.',
              'Zoek op "Mijn Bibliotheek SeniorEase" of gebruik de knop of QR-code hierboven.',
              'Tik op "Installeren" en wacht tot de download klaar is.',
              'Open de app en begin met het bijhouden van uw boeken.',
            ].map((stap, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700" style={{ fontSize: '1.15rem' }}>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5"
                  style={{ background: '#8B5E3C' }}
                >
                  {i + 1}
                </span>
                <span>{stap}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* iPhone/iPad info */}
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
