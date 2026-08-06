import JsonLd from '@/app/components/JsonLd';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import VeiligInternetGuide from '@/app/components/guide/VeiligInternetGuide';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/veilig-internet',
  title: 'Veilig internet',
  description:
    'Phishing herkennen, oplichting voorkomen, veilig wachtwoord maken. Bescherm uzelf online. Stap voor stap voor senioren.',
  keywords: ['phishing', 'veilig internet', 'oplichting senioren'],
});

const relatedArticles = [
  { title: 'Phishing herkennen', href: '/digitale-hulp/phishing-herkennen' },
  { title: 'Phishing mail herkennen', href: '/digitale-hulp/phishing-mail-herkennen' },
  { title: 'Oplichting herkennen', href: '/uitleg/veiligheid' },
  { title: 'DigiD — wat is het?', href: '/uitleg/digid' },
  { title: 'Veilig online bankieren', href: '/uitleg/online-bankieren' },
  { title: 'Veilig wachtwoord maken', href: '/digitale-hulp/veilig-wachtwoord-maken' },
  { title: 'Wachtwoorden beheren', href: '/uitleg/wachtwoorden' },
];

const collectionSchema = buildCollectionPageSchema(
  'Veilig internet voor senioren',
  'Phishing herkennen, oplichting voorkomen en veilig wachtwoorden maken.',
  '/digitale-hulp/veilig-internet',
  relatedArticles.map((a) => ({ name: a.title, path: a.href })),
);

export default function VeiligInternetCategoriePage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <VeiligInternetGuide />
    </>
  );
}
