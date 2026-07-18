import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/gebruik-mijn-bibliotheek',
  title: 'Gebruik Mijn Bibliotheek',
  description: 'Start met Mijn Bibliotheek op uw apparaat.',
  noIndex: true,
});

export default function GebruikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
