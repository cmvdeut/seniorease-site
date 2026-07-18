import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/activeer-licentie',
  title: 'Licentie activeren',
  description: 'Activeer uw Mijn Bibliotheek-licentie.',
  noIndex: true,
});

export default function ActiveerLicentieLayout({ children }: { children: React.ReactNode }) {
  return children;
}
