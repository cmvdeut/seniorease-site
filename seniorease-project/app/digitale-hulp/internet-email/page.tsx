import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CategoryHub from '@/app/components/CategoryHub';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/internet-email',
  title: 'Internet & e-mail',
  description:
    'Uitleg over wifi, e-mail openen, bijlagen en internetproblemen oplossen. Stap voor stap voor senioren.',
  keywords: ['wifi senioren', 'e-mail', 'internet hulp'],
});

const artikelen = [
  { title: 'Wifi instellen', href: '/uitleg/wifi' },
  { title: 'E-mail uitleg', href: '/digitale-hulp/e-mail-openen' },
  { title: 'E-mail bijlage openen', href: '/uitleg/email-bijlage' },
  { title: 'Internet probleem oplossen', href: '/digitale-hulp/wifi-werkt-niet-oplossen' },
];

const collectionSchema = buildCollectionPageSchema(
  'Internet & e-mail voor senioren',
  'Uitleg over wifi, e-mail en internetproblemen oplossen.',
  '/digitale-hulp/internet-email',
  artikelen.map((a) => ({ name: a.title, path: a.href })),
);

export default function InternetEmailCategoriePage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <CategoryHub
        title="Internet & e-mail"
        description="Uitleg over wifi, e-mail en internetproblemen. Stap voor stap."
        intro="Heeft u hulp nodig met internet of e-mail? Hier vindt u artikelen over wifi verbinden, e-mail openen en beheren, bijlagen openen en wat u kunt doen als internet of wifi niet werkt."
        articles={artikelen}
        tip={
          <>
            Staat uw vraag er niet bij? Gebruik de zoekbalk op{' '}
            <Link href="/digitale-hulp" className="font-semibold text-gold hover:text-gold-light underline">
              Digitale hulp
            </Link>{' '}
            of kijk bij Veilig internet als het over oplichting of wachtwoorden gaat.
          </>
        }
      />
    </>
  );
}
