import JsonLd from '@/app/components/JsonLd';
import {
  UitlegPanel,
  UitlegRelated,
  UitlegShell,
  UitlegSteps,
  UitlegTip,
} from '@/app/components/uitleg/UitlegChrome';
import { buildPageMetadata } from '@/lib/seo';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seniorease.nl' },
    { '@type': 'ListItem', position: 2, name: 'Uitleg', item: 'https://www.seniorease.nl/uitleg' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Betalen in het OV',
      item: 'https://www.seniorease.nl/uitleg/betalen-ov',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Betalen in het OV met uw pinpas',
  description:
    'Stap voor stap in- en uitchecken in bus of trein met uw contactloze pinpas (OVpay).',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Controleer of uw pas contactloos is',
      text: 'Kijk of er een golfje-icoontje op uw pinpas staat.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Inchecken',
      text: 'Haal de pas uit uw portemonnee en houd hem kort tegen de kaartlezer.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Uitchecken',
      text: 'Check uit met dezelfde pas bij aankomst.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Kosten controleren',
      text: 'Kosten worden achteraf (vaak de volgende dag) van uw rekening afgeschreven.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kan ik overal in het OV betalen met mijn pinpas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Via OVpay kunt u in heel Nederland in- en uitchecken met een contactloze pinpas, creditcard of telefoon — bij trein, bus, tram en metro. U hoeft niets vooraf te activeren. Met de pinpas reist u 2e klas en zonder korting of abonnement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen pinpas en OV-chipkaart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Met een pinpas betaalt u achteraf van uw bankrekening — u hoeft geen saldo op te laden. Met een OV-chipkaart laadt u van tevoren saldo op. Een OV-chipkaart blijft handig als u een abonnement of korting heeft.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat gebeurt er als ik vergeet uit te checken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er wordt een maximumtarief in rekening gebracht. Check altijd uit met dezelfde pas waarmee u bent ingecheckt. Bij de NS kunt u een vergeten uitcheck vaak laten corrigeren.',
      },
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/betalen-ov',
  title: 'Betalen in het OV met pinpas of OV-chipkaart – uitleg voor senioren',
  description:
    'Hoe checkt u in en uit in bus of trein met uw pinpas? Geen OV-chipkaart nodig voor gewone ritten. Stap-voor-stap uitleg (OVpay).',
});

export default function BetalenOvPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, howToSchema, faqSchema]} />
      <UitlegShell
        title="Betalen in het OV"
        lead="In- en uitchecken met uw contactloze pinpas — zonder aparte OV-chipkaart voor gewone ritten."
      >
        <UitlegPanel title="Pinpas of OV-chipkaart — wat is het verschil?">
          <p>
            In het openbaar vervoer checkt u in en uit door een pas tegen de kaartlezer te houden.
            Tegenwoordig kan dat met uw gewone contactloze pinpas — u heeft daarvoor geen
            OV-chipkaart meer nodig. Dat heet OVpay en werkt in heel Nederland bij trein, bus, tram
            en metro (bron: NS / OVpay).
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-paper rounded-senior border border-navy/8 p-5">
              <p className="font-semibold text-navy text-senior-sm mb-3">Pinpas (contactloos)</p>
              <ul className="space-y-2 text-navy/75 text-senior-xs m-0 pl-0 list-none">
                <li>• Niets vooraf activeren of opladen</li>
                <li>• Kosten achteraf van uw rekening</li>
                <li>• Trein, bus, tram en metro in heel NL</li>
                <li>• Altijd 2e klas, zonder korting</li>
              </ul>
            </div>
            <div className="bg-paper rounded-senior border border-navy/8 p-5">
              <p className="font-semibold text-navy text-senior-sm mb-3">OV-chipkaart</p>
              <ul className="space-y-2 text-navy/75 text-senior-xs m-0 pl-0 list-none">
                <li>• Saldo van tevoren opladen</li>
                <li>• Handig bij abonnement of korting</li>
                <li>• Nog nodig voor sommige extra’s (bijv. OV-fiets)</li>
                <li>• Aparte kaart, los van uw bankpas</li>
              </ul>
            </div>
          </div>
          <UitlegTip>
            Haal uw pinpas uit de portemonnee bij het in- en uitchecken. Gebruik altijd dezelfde
            pas. Zo voorkomt u dat een andere kaart meedoet of dat u dubbel betaalt.
          </UitlegTip>
        </UitlegPanel>

        <UitlegPanel title="Betalen met uw pinpas" subtitle="Inchecken en uitchecken — stap voor stap">
          <UitlegSteps
            steps={[
              {
                title: 'Controleer of uw pas contactloos is',
                body: 'Kijk op uw pinpas: staat er een klein golfje-icoontje op? Dan kunt u contactloos betalen in het OV.',
              },
              {
                title: 'Inchecken bij de kaartlezer',
                body: 'Haal de pas uit uw portemonnee. Houd hem kort tegen de gele of witte kaartlezer. U hoort een piepje en ziet een groen vinkje — u bent ingecheckt.',
                tip: 'Houd de pas slechts even tegen de lezer. U hoeft hem niet lang vast te houden.',
              },
              {
                title: 'Reizen',
                body: 'Tijdens de rit hoeft u niets te doen.',
              },
              {
                title: 'Uitchecken bij aankomst',
                body: 'Houd opnieuw dezelfde pas tegen de kaartlezer bij de uitgang. U hoort weer een piepje en ziet een groen vinkje.',
                tip: 'Rood kruis? Probeer opnieuw. Lukt het niet? Vraag de chauffeur of een medewerker om hulp.',
              },
              {
                title: 'Kosten worden achteraf afgeschreven',
                body: 'Meestal worden de kosten van die dag de volgende dag in één keer afgeschreven. U ziet ze terug in uw bankapp. Op OVpay.nl of via Mijn NS kunt u reizen terugzien.',
              },
            ]}
          />
        </UitlegPanel>

        <UitlegPanel title="OV-chipkaart opladen">
          <p>
            Gebruikt u een OV-chipkaart? Dan moet u van tevoren saldo opladen. Zonder voldoende
            saldo kunt u niet inchecken.
          </p>
          <ul className="space-y-2 m-0 pl-0 list-none">
            <li>• Bij een NS-automaat op het station</li>
            <li>• Bij de servicebalie of in de bus</li>
            <li>• Via ov-chipkaart.nl</li>
            <li>• Bij sommige supermarkten en kiosken</li>
          </ul>
          <UitlegTip>
            Zorg dat u voldoende saldo heeft. Bij te weinig saldo kunt u niet meer inchecken.
          </UitlegTip>
        </UitlegPanel>

        <UitlegPanel title="Veelvoorkomende problemen">
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-navy mb-1">De lezer geeft een rood kruis</p>
              <p className="text-navy/75 m-0">
                Probeer opnieuw, iets rustiger. Haal de pas uit de portemonnee — meerdere
                contactloze kaarten tegelijk kunnen storing geven.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Ik ben vergeten uit te checken</p>
              <p className="text-navy/75 m-0">
                Er wordt een maximumtarief gerekend. Bij de NS kunt u dit vaak laten corrigeren via
                ns.nl of de klantenservice.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Ik weet niet of mijn pas contactloos is</p>
              <p className="text-navy/75 m-0">
                Zoek het golfje-icoontje op de pas. Twijfelt u? Bel uw bank of kijk op hun website.
              </p>
            </div>
          </div>
        </UitlegPanel>

        <UitlegPanel title="Veelgestelde vragen">
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-navy mb-1">
                Kan ik overal in het OV betalen met mijn pinpas?
              </p>
              <p className="text-navy/75 m-0">
                Ja. Met een contactloze pinpas (of creditcard/telefoon) kunt u in heel Nederland
                in- en uitchecken. U hoeft niets vooraf te regelen. Met de pinpas reist u wel altijd
                2e klas en zonder korting — voor een abonnement blijft de OV-chipkaart of OV-pas
                nodig.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Wat als ik vergeet uit te checken?</p>
              <p className="text-navy/75 m-0">
                Er wordt een maximumtarief berekend. Check altijd uit met dezelfde pas. Bij de NS
                kunt u dit vaak laten corrigeren via ns.nl of de klantenservice.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy mb-1">Kan ik ook betalen met mijn telefoon?</p>
              <p className="text-navy/75 m-0">
                Ja, als u Apple Pay of Google Pay heeft ingesteld, kunt u daarmee inchecken — net
                als met uw pinpas.
              </p>
            </div>
          </div>
        </UitlegPanel>

        <UitlegRelated
          links={[
            { href: '/uitleg/mobiel-parkeren', label: 'Mobiel parkeren met uw telefoon' },
            { href: '/uitleg/9292', label: '9292 OV-app — reis plannen' },
            { href: '/uitleg/google-maps', label: 'Google Maps gebruiken' },
          ]}
        />
      </UitlegShell>
    </>
  );
}
