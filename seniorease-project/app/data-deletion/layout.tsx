import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/data-deletion',
  title: 'User Data Deletion',
  description: 'Request deletion of user data for SeniorEase.',
  noIndex: true,
});

export default function DataDeletionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
