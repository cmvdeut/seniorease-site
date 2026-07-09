import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/uitleg/whatsapp-deel3',
  title: 'WhatsApp deel 3 — geavanceerde functies',
  description:
    'WhatsApp verder ontdekken: doorsturen, archiveren, privacy-instellingen en meer. Rustige uitleg voor senioren.',
  keywords: ['WhatsApp privacy', 'WhatsApp archiveren', 'WhatsApp senioren'],
});

export default function WhatsappDeel3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
