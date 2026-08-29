import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import BedanktClient from './BedanktClient';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/bedankt',
  title: 'Bedankt voor uw bestelling',
  description: 'Uw lesmateriaal-bestelling is ontvangen. U krijgt de PDF per e-mail.',
  noIndex: true,
});

export default function LesmateriaalBedanktPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/lesmateriaal"
          className="text-gold hover:text-gold-light font-semibold mb-10 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Lesmateriaal
        </Link>
        <BedanktClient />
      </div>
    </main>
  );
}
