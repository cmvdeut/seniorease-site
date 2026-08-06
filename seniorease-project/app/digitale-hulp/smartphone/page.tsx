import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CategoryHub from '@/app/components/CategoryHub';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/smartphone',
  title: 'Smartphone hulp',
  description:
    'Uitleg over WhatsApp, telefoon sneller maken, letters groter zetten en QR-code scannen. Stap voor stap voor senioren.',
  keywords: ['smartphone senioren', 'WhatsApp', 'telefoon hulp'],
});

const artikelen = [
  { title: 'WhatsApp uitleg voor beginners', href: '/digitale-hulp/whatsapp-uitleg-beginners' },
  { title: "WhatsApp foto's opslaan", href: '/digitale-hulp/whatsapp-fotos-opslaan' },
  { title: "Foto's van telefoon naar computer", href: '/uitleg/fotos-naar-computer' },
  { title: 'Letters groter maken op telefoon', href: '/digitale-hulp/letters-groter-maken-telefoon' },
  { title: 'Letters groter maken op computer', href: '/uitleg/letters-groter-pc' },
  { title: 'Screenshot op telefoon', href: '/digitale-hulp/screenshot-en-schermopname-telefoon' },
  { title: 'QR-code scannen', href: '/uitleg/qr-code' },
  { title: 'Telefoon langzaam oplossen', href: '/digitale-hulp/telefoon-langzaam-oplossen' },
];

const collectionSchema = buildCollectionPageSchema(
  'Smartphone hulp voor senioren',
  'Uitleg en tips voor uw telefoon: WhatsApp, scherm, snelheid en meer.',
  '/digitale-hulp/smartphone',
  artikelen.map((a) => ({ name: a.title, path: a.href })),
);

export default function SmartphoneCategoriePage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <CategoryHub
        title="Smartphone hulp"
        description="Uitleg en tips voor uw telefoon: WhatsApp, scherm, snelheid en meer. Stap voor stap."
        intro="Komt u ergens niet uit met uw smartphone? Hier vindt u artikelen over veelgestelde vragen: berichten en foto's sturen met WhatsApp, letters groter zetten, een trage telefoon sneller maken en een QR-code scannen."
        articles={artikelen}
        tip={
          <>
            Staat uw vraag er niet bij? Gebruik de zoekbalk op{' '}
            <Link href="/digitale-hulp" className="font-semibold text-gold hover:text-gold-light underline">
              Digitale hulp
            </Link>{' '}
            of kijk bij de andere categorie&apos;s.
          </>
        }
      />
    </>
  );
}
