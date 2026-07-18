import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/probeer-mijn-bibliotheek',
  title: 'Probeer Mijn Bibliotheek',
  description: 'Probeer Mijn Bibliotheek gratis.',
  noIndex: true,
});

export default function ProbeerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
