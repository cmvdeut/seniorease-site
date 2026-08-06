import type { Metadata } from 'next';
import { CLIENT_PAGE_METADATA } from '@/lib/seo';

export const metadata: Metadata = {
  ...CLIENT_PAGE_METADATA.afvinken,
  manifest: '/manifest-afvinken.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Afvinken',
  },
};

export default function AfvinkenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
