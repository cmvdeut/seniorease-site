import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/betalen/success',
  title: 'Betaling geslaagd',
  description: 'Uw aankoop van Mijn Bibliotheek is gelukt.',
  noIndex: true,
});

export default function BetalenSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
