import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/uitleg/whatsapp-deel2',
  title: 'WhatsApp deel 2 — groepen, status en meer',
  description:
    'WhatsApp verder leren: groepsgesprekken, status plaatsen en stemberichten. Stap-voor-stap uitleg voor senioren.',
  keywords: ['WhatsApp groepen', 'WhatsApp status', 'WhatsApp senioren'],
});

export default function WhatsappDeel2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
