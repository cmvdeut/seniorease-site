import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CategoryHub from '@/app/components/CategoryHub';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/computer',
  title: 'Computer hulp',
  description:
    "Uitleg over e-mail bijlagen, bestanden vinden, computer traag oplossen en foto's op de pc. Stap voor stap voor senioren.",
  keywords: ['computer senioren', 'e-mail bijlage', 'bestanden vinden'],
});

const artikelen = [
  { title: 'E-mail bijlage openen en opslaan', href: '/uitleg/email-bijlage' },
  { title: 'Bestanden vinden op uw computer', href: '/uitleg/bestanden-vinden' },
  { title: 'Computer traag of vastgelopen', href: '/uitleg/computer-traag' },
  { title: 'Screenshot maken op computer', href: '/uitleg/screenshot-pc' },
  { title: 'Letters groter maken op computer', href: '/uitleg/letters-groter-pc' },
  { title: 'Programma installeren op computer', href: '/uitleg/programma-installeren' },
  { title: "Foto's van telefoon naar computer", href: '/uitleg/fotos-naar-computer' },
  { title: 'Googelen voor beginners', href: '/digitale-hulp/googelen-google-zoeken' },
  { title: 'E-mail openen', href: '/digitale-hulp/e-mail-openen' },
  { title: 'Wat is de cloud?', href: '/digitale-hulp/wat-is-de-cloud' },
];

const collectionSchema = buildCollectionPageSchema(
  'Computer hulp voor senioren',
  "Uitleg over e-mail, bestanden, een trage pc en foto's op de computer.",
  '/digitale-hulp/computer',
  artikelen.map((a) => ({ name: a.title, path: a.href })),
);

export default function ComputerCategoriePage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <CategoryHub
        title="Computer hulp"
        description="E-mail bijlagen, bestanden vinden, traagheid oplossen en meer — stap voor stap op uw pc."
        intro="Werkt u op een laptop of desktop? Hier vindt u rustige uitleg over dagelijkse computervragen — zonder moeilijke termen."
        articles={artikelen}
        tip={
          <>
            Staat uw vraag er niet bij? Gebruik de zoekbalk op{' '}
            <Link href="/digitale-hulp" className="font-semibold text-gold hover:text-gold-light underline">
              Digitale hulp
            </Link>
            .
          </>
        }
      />
    </>
  );
}
