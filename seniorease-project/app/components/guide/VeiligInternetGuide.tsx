import Link from 'next/link';
import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import { ShieldBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'Nepberichten herkennen' },
  { id: 'stap-2', label: 'Niet op links klikken' },
  { id: 'stap-3', label: 'Een veilig wachtwoord' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/phishing-herkennen', label: 'Phishing herkennen' },
  { href: '/digitale-hulp/phishing-mail-herkennen', label: 'Phishing mail herkennen' },
  { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
  { href: '/digitale-hulp/veilig-wachtwoord-maken', label: 'Veilig wachtwoord maken' },
  { href: '/uitleg/wachtwoorden', label: 'Wachtwoorden beheren' },
  { href: '/uitleg/digid', label: 'DigiD — wat is het?' },
  { href: '/uitleg/online-bankieren', label: 'Veilig online bankieren' },
] as const;

const LEARN_ITEMS = [
  'Nepmails en nepberichten herkennen',
  'Veilig omgaan met links',
  'Een sterk wachtwoord maken',
  'Wat te doen bij twijfel',
];

export default function VeiligInternetGuide() {
  return (
    <GuideLayout
      title="Veilig Internetten Gids"
      badge={<ShieldBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp/whatsapp-uitleg-beginners"
          prevLabel="Vorige gids"
          nextHref="/digitale-hulp/e-mail-openen"
          nextLabel="Volgende gids"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="Nepberichten herkennen"
        imageSrc="/images/guides/veilig/step-1-nl.png"
        imageAlt="Postvak met gemarkeerde verdachte e-mail over geblokkeerd account"
        deviceImage
      >
        <p>
          Phishing is wanneer iemand via e-mail, sms of WhatsApp probeert uw wachtwoord, pincode of bankgegevens te stelen.
        </p>
        <p>
          Let op: dringende taal (&quot;Reageer binnen 24 uur&quot;), een vreemde afzender, taalfouten, of een adres dat net iets anders is dan het echte.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Niet op links klikken"
        tip="Twijfelt u? Bel de organisatie via het nummer op hun echte website — niet via de mail."
        imageSrc="/images/guides/veilig/step-2-nl.png"
        imageAlt="Nepmail met gouden markering en pijl bij een verdachte link"
        deviceImage
      >
        <p>
          Klik nooit op links in een mail of bericht dat u niet vertrouwt. Log ook niet in via zo&apos;n link.
        </p>
        <p>
          Ga zelf naar de website van uw bank of de overheid: typ het adres in, of gebruik uw bladwijzer.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Een veilig wachtwoord"
        imageSrc="/images/guides/veilig/step-3-nl.png"
        imageAlt="Wachtwoordscherm met markering bij een sterk wachtwoord"
        deviceImage
      >
        <p>
          Kies een korte zin die u onthoudt, schrijf die als één woord, en voeg een cijfer en een teken toe. Bijvoorbeeld: MijnTuinIsMooi2024!
        </p>
        <p>
          Gebruik voor elk account een ander wachtwoord. Deel het nooit per e-mail of WhatsApp.
        </p>
      </GuideStep>

      <p className="text-navy/70 text-senior-sm leading-relaxed">
        Heeft u per ongeluk gegevens ingevuld? Wijzig direct uw wachtwoord. Meer:{' '}
        <Link href="/uitleg/veiligheid" className="text-gold hover:text-gold-light font-semibold">
          Oplichting herkennen
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
