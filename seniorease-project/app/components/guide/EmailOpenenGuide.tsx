import Link from 'next/link';
import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import { MailBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'E-mailapp openen' },
  { id: 'stap-2', label: 'Inloggen' },
  { id: 'stap-3', label: 'Een bericht lezen' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/internet-email', label: 'Internet & e-mail' },
  { href: '/uitleg/email-bijlage', label: 'E-mail bijlage openen' },
  { href: '/digitale-hulp/phishing-mail-herkennen', label: 'Phishing mail herkennen' },
  { href: '/digitale-hulp/veilig-wachtwoord-maken', label: 'Veilig wachtwoord maken' },
  { href: '/uitleg/wifi', label: 'WiFi instellen' },
] as const;

const LEARN_ITEMS = [
  'E-mail openen op telefoon of computer',
  'Inloggen met uw account',
  'Berichten lezen in uw postvak',
  'Voorzichtig zijn met vreemde mails',
];

export default function EmailOpenenGuide() {
  return (
    <GuideLayout
      title="E-mail Basis Gids"
      badge={<MailBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp/veilig-internet"
          prevLabel="Vorige gids"
          nextHref="/digitale-hulp"
          nextLabel="Alle artikelen"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="E-mailapp openen"
        imageSrc="/images/guides/email/step-1-nl.png"
        imageAlt="Beginscherm met gouden markering om de Gmail-app"
        deviceImage
      >
        <p>
          Zoek op uw telefoon de app Gmail, Outlook of E-mail. Tik erop om te openen.
        </p>
        <p>
          Op de computer: open Chrome of Edge en ga naar gmail.com of outlook.com. Nog geen account? Maak er gratis één aan.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Inloggen"
        tip="Gebruik een sterk wachtwoord. Deel het nooit per mail of WhatsApp."
        imageSrc="/images/guides/email/step-2-nl.png"
        imageAlt="Inlogscherm met markering bij de knop Inloggen"
        deviceImage
      >
        <p>
          Vul uw e-mailadres en wachtwoord in als dat wordt gevraagd. Tik of klik op Inloggen.
        </p>
        <p>
          Daarna ziet u uw postvak (inbox). De nieuwste berichten staan vaak bovenaan.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Een bericht lezen"
        imageSrc="/images/guides/email/step-3-nl.png"
        imageAlt="Postvak met gouden markering en pijl bij een e-mail"
        deviceImage
      >
        <p>
          Tik of klik op een bericht om het te openen en te lezen.
        </p>
        <p>
          Klik nooit op links in vreemde e-mails die om uw wachtwoord vragen. Dat is vaak oplichting.
        </p>
      </GuideStep>

      <p className="text-navy/70 text-senior-sm leading-relaxed">
        Meer over nepmails:{' '}
        <Link href="/digitale-hulp/phishing-mail-herkennen" className="text-gold hover:text-gold-light font-semibold">
          Phishing mail herkennen
        </Link>
        . Wachtwoord tips:{' '}
        <Link href="/digitale-hulp/veilig-wachtwoord-maken" className="text-gold hover:text-gold-light font-semibold">
          Veilig wachtwoord maken
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
