import GuideLayout from './GuideLayout';
import GuideLearnBox from './GuideLearnBox';
import GuideStep from './GuideStep';
import GuideSidebar from './GuideSidebar';
import GuideStepNav from './GuideStepNav';
import { WhatsAppBadge } from '@/app/components/GuideTopicBadge';

const TOC = [
  { id: 'stap-1', label: 'Foto openen' },
  { id: 'stap-2', label: 'Foto opslaan' },
  { id: 'stap-3', label: 'Terugvinden in Galerij' },
  { id: 'faq', label: 'Veelgestelde vragen' },
] as const;

const RELATED = [
  { href: '/digitale-hulp/whatsapp-uitleg-beginners', label: 'WhatsApp basis' },
  { href: '/uitleg/fotos-maken', label: "Foto's maken" },
  { href: '/uitleg/wifi', label: 'Wifi instellen' },
  { href: '/uitleg/qr-code', label: 'QR-code scannen' },
  { href: '/digitale-hulp/whatsapp-videobellen-uitleg', label: 'WhatsApp videobellen' },
] as const;

const LEARN_ITEMS = [
  'Een foto in WhatsApp openen',
  'De foto opslaan op uw telefoon',
  'De foto terugvinden in Galerij',
  'Meerdere foto’s tegelijk opslaan',
];

const FAQ = [
  {
    vraag: 'Waar staat de foto na het opslaan?',
    antwoord:
      'In de app Foto’s of Galerij. Vaak in een map “WhatsApp” of bij Recente. Op iPhone staat die meestal bij “Recente” of “Bibliotheek”.',
  },
  {
    vraag: 'Werkt dit op Android én iPhone?',
    antwoord:
      'Ja. Open de foto in WhatsApp, tik op downloaden of opslaan, en zoek hem daarna in Galerij of Foto’s. De knoppen zien er iets anders uit, de stappen zijn hetzelfde.',
  },
  {
    vraag: 'Ik zie geen knop om op te slaan — wat nu?',
    antwoord:
      'Tik eerst op de foto zodat die groot opent. De downloadknop zit meestal rechtsboven (pijl naar beneden of schijf). Op sommige telefoons: tik op de drie puntjes en kies Opslaan.',
  },
  {
    vraag: 'Kan ik meerdere foto’s tegelijk bewaren?',
    antwoord:
      'Ja. Houd één foto in de chat even ingedrukt, tik daarna op andere foto’s, en kies Opslaan of Downloaden.',
  },
] as const;

export default function WhatsAppFotosGuide() {
  return (
    <GuideLayout
      title="WhatsApp-foto opslaan in galerij"
      subtitle="Foto uit WhatsApp bewaren? Open de foto, tik op downloaden of opslaan, en vind hem terug in Galerij — op Android en iPhone."
      badge={<WhatsAppBadge size="md" />}
      learnBox={<GuideLearnBox items={[...LEARN_ITEMS]} />}
      sidebar={<GuideSidebar toc={[...TOC]} related={[...RELATED]} />}
      stepNav={
        <GuideStepNav
          prevHref="/digitale-hulp/whatsapp-uitleg-beginners"
          prevLabel="Vorige gids"
          nextHref="/digitale-hulp/whatsapp-videobellen-uitleg"
          nextLabel="Volgende gids"
        />
      }
    >
      <GuideStep
        id="stap-1"
        number={1}
        title="Foto openen"
        imageSrc="/images/guides/whatsapp-fotos/step-1-nl.png"
        imageAlt="WhatsApp-chat met markering om een ontvangen foto"
        deviceImage
      >
        <p>
          Open het gesprek waarin de foto staat. Tik op de foto in het chatbericht.
        </p>
        <p>De foto opent groot op het scherm, zodat u alles goed kunt zien.</p>
      </GuideStep>

      <GuideStep
        id="stap-2"
        number={2}
        title="Foto opslaan"
        tip="U kunt meerdere foto’s tegelijk opslaan: houd een foto even ingedrukt, tik op andere foto’s en kies Opslaan."
        imageSrc="/images/guides/whatsapp-fotos/step-2-nl.png"
        imageAlt="Grote foto-weergave met markering bij de downloadknop"
        deviceImage
      >
        <p>
          Zoek het icoontje voor download of opslaan — vaak een pijl naar beneden of een schijf. Tik erop.
        </p>
        <p>U krijgt soms een melding &quot;Opgeslagen&quot;. Dan staat de foto op uw telefoon, klaar voor de galerij.</p>
      </GuideStep>

      <GuideStep
        id="stap-3"
        number={3}
        title="Terugvinden in Galerij"
        imageSrc="/images/guides/whatsapp-fotos/step-3-nl.png"
        imageAlt="Foto's-app met markering om de opgeslagen WhatsApp-foto"
        deviceImage
      >
        <p>
          Open de app Foto&apos;s of Galerij. De foto staat meestal in een map zoals &quot;WhatsApp&quot; of bij Recente.
        </p>
        <p>Open alleen foto&apos;s van mensen die u kent, om veilig te blijven.</p>
      </GuideStep>

      <section id="faq" className="scroll-mt-24 space-y-5">
        <h2 className="font-serif text-senior-xl font-semibold text-navy">
          Veelgestelde vragen
        </h2>
        {FAQ.map((item) => (
          <div key={item.vraag} className="border-b border-navy/10 pb-5 last:border-0 last:pb-0">
            <h3 className="text-senior-base font-bold text-navy mb-2">{item.vraag}</h3>
            <p className="text-senior-base text-navy/80 leading-relaxed">{item.antwoord}</p>
          </div>
        ))}
      </section>
    </GuideLayout>
  );
}
