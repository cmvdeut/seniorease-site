import Link from 'next/link';
import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import GuideVideoCta from './GuideVideoCta';
import { WhatsAppBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'WhatsApp openen' },
  { id: 'stap-2', label: 'Een chat starten' },
  { id: 'stap-3', label: 'Een bericht typen en verzenden' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/googelen-google-zoeken', label: 'Google gebruiken' },
  { href: '/digitale-hulp/whatsapp-fotos-opslaan', label: "Foto's en video's delen" },
  { href: '/digitale-hulp/veilig-internet', label: 'Veilig internetten' },
  { href: '/digitale-hulp/e-mail-openen', label: 'E-mail instellen' },
  { href: '/digitale-hulp/whatsapp-uitleg-beginners#stap-2', label: 'Contacten toevoegen' },
] as const;

const LEARN_ITEMS = [
  'Berichten versturen en ontvangen',
  "Foto's en video's delen",
  'Groepschats gebruiken',
  'Contacten toevoegen',
];

export default function WhatsAppBeginnersGuide() {
  return (
    <GuideLayout
      title="WhatsApp Basis Gids"
      badge={<WhatsAppBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp/googelen-google-zoeken"
          prevLabel="Vorige gids"
          nextHref="/digitale-hulp/whatsapp-fotos-opslaan"
          nextLabel="Volgende gids"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="WhatsApp openen"
        imageSrc="/images/guides/whatsapp/step-1-nl.png"
        imageAlt="Telefoon beginscherm met groene markering om het WhatsApp-icoon"
        deviceImage
      >
        <p>
          Zoek op het beginscherm van uw telefoon het groene WhatsApp-icoontje. Tik erop om de app te openen.
        </p>
        <p>
          Ziet u het icoon niet? Open de appwinkel, zoek op &quot;WhatsApp&quot; en installeer de app eerst. U heeft wifi of mobiele data nodig.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Een chat starten"
        imageSrc="/images/guides/whatsapp/step-2-nl.png"
        imageAlt="WhatsApp-chats met groene markering om de knop voor een nieuw gesprek"
        deviceImage
      >
        <p>
          Tik op het icoontje voor een nieuw gesprek (vaak rechtsboven of onderaan: een spraakballon of potlood).
        </p>
        <p>
          Zoek de persoon op naam of nummer, of typ het telefoonnummer. Tik op het contact om het gesprek te openen.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Een bericht typen en verzenden"
        tip="Houd de microfoonknop ingedrukt om een spraakbericht op te nemen!"
        imageSrc="/images/guides/whatsapp/step-3-nl.png"
        imageAlt="WhatsApp-chat met gouden markering en pijl bij de verstuurknop"
        deviceImage
      >
        <p>
          Tik op het tekstveld onderaan, typ uw bericht en tik op de groene pijl om te versturen.
        </p>
        <p>
          Wilt u een foto sturen? Tik naast het tekstveld op het paperclip- of camera-icoontje, kies een foto en tik op versturen.
        </p>
      </GuideStep>

      <GuideVideoCta
        description="We hebben 5 korte animatievideo's gemaakt — van installeren tot veilig gebruik. Stap voor stap, rustig tempo."
        href="https://www.youtube.com/playlist?list=PLw97JnScZym_83xf1Ypz_npeXj308wRN6"
        linkLabel="Bekijk onze WhatsApp-video's op YouTube"
      />

      <p className="text-navy/70 text-senior-sm leading-relaxed">
        Let op oplichting via WhatsApp: stuur nooit geld of gegevens naar onbekenden. Meer:{' '}
        <Link href="/uitleg/veiligheid" className="text-gold hover:text-gold-light font-semibold">
          Oplichting herkennen
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
