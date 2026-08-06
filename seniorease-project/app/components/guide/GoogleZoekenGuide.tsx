import Link from 'next/link';
import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import GuideVideoCta from './GuideVideoCta';
import { GoogleBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'Google openen' },
  { id: 'stap-2', label: 'Uw vraag typen' },
  { id: 'stap-3', label: 'Een resultaat kiezen' },
  { id: 'stap-4', label: 'AI-modus gebruiken' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/whatsapp-uitleg-beginners', label: 'WhatsApp basis' },
  { href: '/uitleg/inspreken', label: 'Inspreken op uw telefoon' },
  { href: '/uitleg/google-maps', label: 'Google Maps gebruiken' },
  { href: '/digitale-hulp/veilig-internet', label: 'Veilig internetten' },
  { href: '/wat-is-ai/chatgpt', label: 'Wat is ChatGPT?' },
] as const;

const LEARN_ITEMS = [
  'Google openen op telefoon of computer',
  'Een vraag typen en zoeken',
  'Advertenties herkennen',
  'AI-modus: vragen in gewone taal',
];

export default function GoogleZoekenGuide() {
  return (
    <GuideLayout
      title="Google Basis Gids"
      badge={<GoogleBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp"
          prevLabel="Vorige stap"
          nextHref="/digitale-hulp/whatsapp-uitleg-beginners"
          nextLabel="Volgende gids"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="Google openen"
        imageSrc="/images/guides/google/step-1-nl.png"
        imageAlt="Browser met Google-startpagina en markering bij de adresbalk"
        deviceImage
      >
        <p>
          Open Chrome of Safari op uw telefoon of computer. Tik of klik in de balk bovenaan.
        </p>
        <p>
          Typ <strong className="text-navy">google.nl</strong> en druk op Enter. U ziet de Google-startpagina met een groot zoekvak.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Uw vraag typen"
        tip="Ziet u een microfoon-knop? Dan mag u uw vraag ook hardop stellen."
        imageSrc="/images/guides/google/step-2-nl.png"
        imageAlt="Google-zoekvak met getypte vraag en markering bij zoeken"
        deviceImage
      >
        <p>
          Tik in het zoekvak in het midden. Typ wat u wilt weten, bijvoorbeeld &quot;weer morgen&quot; of &quot;openingstijden bibliotheek&quot;.
        </p>
        <p>
          Tik op het vergrootglas of druk op Enter. Google toont dan een lijst met websites.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Een resultaat kiezen"
        imageSrc="/images/guides/google/step-3-nl.png"
        imageAlt="Google-zoekresultaten met markering bij het eerste resultaat"
        deviceImage
      >
        <p>
          Tik op een regel om die pagina te openen. Gebruik meerdere woorden voor betere resultaten — &quot;buslijn Enschede&quot; is preciezer dan alleen &quot;bus&quot;.
        </p>
        <p>
          Let op: bovenaan staan soms regels met het label &quot;Advertentie&quot;. Betrouwbare sites eindigen vaak op .nl of .gov.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-4"
        number={4}
        title="AI-modus gebruiken"
        tip="Ziet u AI-modus niet? Dan is die in uw land of account nog niet beschikbaar. Gewoon googelen werkt dan nog steeds."
      >
        <p>
          Na het zoeken ziet u links bovenaan vaak knoppen zoals <strong className="text-navy">Alle</strong>,{' '}
          <strong className="text-navy">Afbeeldingen</strong> en <strong className="text-navy">AI-modus</strong>.
        </p>
        <p>
          Tik op <strong className="text-navy">AI-modus</strong>. Dan kunt u in gewone taal vragen stellen — gratis, via Google. Handig voor een snelle uitleg of een ideetje.
        </p>
        <p>
          Belangrijk: vertrouw AI niet voor 100%. Controleer belangrijke feiten, vooral bij gezondheid, geld of overheidszaken. Meer over AI:{' '}
          <Link href="/digitale-hulp/ai" className="text-gold hover:text-gold-light font-semibold">
            AI &amp; ChatGPT
          </Link>
          .
        </p>
      </GuideStep>

      <GuideVideoCta
        description="Bekijk onze uitlegvideo over googelen op YouTube — rustig tempo, grote letters."
        href="https://www.youtube.com/playlist?list=PLw97JnScZym8Ae4tlW7j38EfvMKMRIBem"
        linkLabel="Bekijk tips-video's op YouTube"
      />

      <p className="text-navy/70 text-senior-sm leading-relaxed">
        Twijfelt u over een website? Lees meer over{' '}
        <Link href="/digitale-hulp/veilig-internet" className="text-gold hover:text-gold-light font-semibold">
          veilig internetten
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
