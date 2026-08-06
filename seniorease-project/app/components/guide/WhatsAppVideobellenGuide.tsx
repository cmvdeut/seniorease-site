import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import { WhatsAppBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'Gesprek openen' },
  { id: 'stap-2', label: 'Videogesprek starten' },
  { id: 'stap-3', label: 'Gesprek beëindigen' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/whatsapp-uitleg-beginners', label: 'WhatsApp basis' },
  { href: '/digitale-hulp/whatsapp-fotos-opslaan', label: "WhatsApp foto's opslaan" },
  { href: '/uitleg/videobellen', label: 'Videobellen uitgebreid' },
  { href: '/uitleg/wifi', label: 'WiFi instellen' },
] as const;

const LEARN_ITEMS = [
  'Een videogesprek starten',
  'Elkaar zien tijdens het bellen',
  'Het gesprek netjes beëindigen',
  'Tips voor een stabiele verbinding',
];

export default function WhatsAppVideobellenGuide() {
  return (
    <GuideLayout
      title="WhatsApp Videobellen"
      badge={<WhatsAppBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp/whatsapp-fotos-opslaan"
          prevLabel="Vorige gids"
          nextHref="/digitale-hulp/veilig-internet"
          nextLabel="Volgende gids"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="Gesprek openen"
        imageSrc="/images/guides/whatsapp-video/step-1-nl.png"
        imageAlt="WhatsApp-chat met groene markering om het videocamera-icoon"
        deviceImage
      >
        <p>
          Open WhatsApp en tik op het gesprek met de persoon die u wilt zien.
        </p>
        <p>
          Bovenin het scherm ziet u een videocamera-icoon. Beide hebben WhatsApp en internet nodig.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Videogesprek starten"
        tip="Gebruik wifi als dat kan — dan blijft het beeld vaak stabieler."
        imageSrc="/images/guides/whatsapp-video/step-2-nl.png"
        imageAlt="Inkomend of uitgaand WhatsApp-videogesprek"
        deviceImage
      >
        <p>
          Tik op het videocamera-icoon. De ander krijgt een melding.
        </p>
        <p>
          Als hij of zij opneemt, ziet u elkaar op het scherm. U kunt ook wisselen naar alleen geluid via het telefoon-icoon.
        </p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Gesprek beëindigen"
        imageSrc="/images/guides/whatsapp-video/step-3-nl.png"
        imageAlt="Actief videogesprek met markering bij de rode ophangknop"
        deviceImage
      >
        <p>
          Klaar met bellen? Tik op de rode telefoonknop onderaan om te stoppen.
        </p>
        <p>
          Valt het gesprek weg? Controleer of wifi of mobiele data aanstaat.
        </p>
      </GuideStep>
    </GuideLayout>
  );
}
