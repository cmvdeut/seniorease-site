import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/digid',
  title: "DigiD — wat is het en hoe werkt het? Uitleg voor senioren",
  description: "Wat is DigiD, hoe vraagt u het aan en hoe logt u veilig in bij de overheid? Rustige uitleg zonder moeilijke termen.",
});

type Stap = { stap: string; uitleg: ReactNode; tip?: string };

function StappenLijst({ stappen }: { stappen: Stap[] }) {
  return (
    <ol className="space-y-6">
      {stappen.map((item, i) => (
        <li key={i} className="flex gap-5 items-start list-none">
          <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
            {i + 1}
          </div>
          <div className="pt-1 flex-1">
            <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
            <div className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</div>
            {item.tip && (
              <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-2">
                {item.tip}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function DigidPage() {
  const aanvragenStappen: Stap[] = [
    {
      stap: 'Ga naar de echte DigiD-website',
      uitleg: (
        <>
          Typ zelf in uw browser: <strong>digid.nl</strong> — niet via een link in een e-mail. Klik op <strong>DigiD aanvragen</strong>. U heeft uw <strong>BSN</strong> (burgerservicenummer) nodig, dat staat op uw paspoort of ID-kaart.
        </>
      ),
      tip: 'Heeft u hulp nodig bij het aanvragen? Bel DigiD op werkdagen: 088 - 123 65 55 (gratis nummer van de overheid).',
    },
    {
      stap: 'Identiteit bevestigen',
      uitleg: (
        <>
          U krijgt een brief thuis met een <strong>activeringscode</strong>, of u bevestigt via de <strong>DigiD app</strong> op uw telefoon. Volg de stappen op digid.nl rustig op — u hoeft alles niet in één keer af te maken.
        </>
      ),
    },
    {
      stap: 'Wachtwoord en inlogcode kiezen',
      uitleg: (
        <>
          U kiest een <strong>wachtwoord</strong> (lang, uniek) en een <strong>pincode</strong> voor de DigiD app. Bewaar deze op een veilige plek — niet op een post-it naast de computer. Tips:{' '}
          <Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-semibold text-gold hover:text-gold-light">Veilig wachtwoord maken</Link>.
        </>
      ),
    },
  ];

  const inloggenStappen: Stap[] = [
    {
      stap: 'Inloggen op MijnOverheid of andere overheidswebsite',
      uitleg: (
        <>
          Ga naar bijvoorbeeld <strong>mijnoverheid.nl</strong> of de website van de Belastingdienst, UWV of gemeente. Klik op <strong>Inloggen met DigiD</strong>. Vul uw gebruikersnaam en wachtwoord in.
        </>
      ),
    },
    {
      stap: 'Bevestigen met de DigiD app of sms',
      uitleg: (
        <>
          U krijgt een verzoek op uw telefoon (DigiD app) of een <strong>sms-code</strong>. Bevestig alleen als <strong>u zelf</strong> net op Inloggen heeft geklikt. Ziet u een verzoek terwijl u niets deed? <strong>Niet</strong> goedkeuren — dat kan oplichting zijn.
        </>
      ),
      tip: 'Installeert u de DigiD app? Doe dat via de officiële Play Store of App Store — zoek op &quot;DigiD&quot; van de overheid.',
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="digid" />
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/veilig-internet" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Veilig internet
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              DigiD — wat is het en hoe werkt het?
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Uw digitale sleutel voor de overheid — rustig uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Wat is DigiD?</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              <strong>DigiD</strong> staat voor Digitale Identiteit. Het is uw persoonlijke inlog voor websites van de <strong>overheid</strong>: belasting, pensioen (UWV), zorgtoeslag, gemeente, MijnOverheid. Zonder DigiD kunt u veel online zaken niet regelen — daarom is het belangrijk, maar ook iets waar u voorzichtig mee moet omgaan.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              DigiD is <strong>gratis</strong>. De overheid vraagt u nooit om geld te betalen voor DigiD via WhatsApp of e-mail.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">DigiD aanvragen — stap voor stap</h2>
            <StappenLijst stappen={aanvragenStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Inloggen met DigiD</h2>
            <StappenLijst stappen={inloggenStappen} />
          </section>

          <section className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-red-800 mb-4">DigiD-fraude — dit doet de overheid nooit</h2>
            <ul className="space-y-3 text-senior-sm md:text-senior-base text-navy/80">
              <li>❌ Vragen om uw DigiD-code via telefoon, WhatsApp of e-mail</li>
              <li>❌ Zeggen dat uw DigiD &quot;verloopt&quot; en u moet betalen</li>
              <li>❌ U doorverbinden naar iemand die uw pincode wil horen</li>
              <li>✅ Alleen inloggen op websites die eindigen op <strong>.nl</strong> van bekende instanties</li>
              <li>✅ Bij twijfel: ophangen en zelf <strong>digid.nl</strong> bellen</li>
            </ul>
            <p className="text-senior-sm md:text-senior-base text-navy/80 mt-4">
              Meer alarmsignalen:{' '}
              <Link href="/uitleg/veiligheid" className="font-semibold text-gold hover:text-gold-light">Oplichting herkennen</Link> en{' '}
              <Link href="/digitale-hulp/phishing-mail-herkennen" className="font-semibold text-gold hover:text-gold-light">Phishing mail herkennen</Link>.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/online-bankieren" className="text-senior-base font-semibold text-gold hover:text-gold-light">Veilig online bankieren →</Link></li>
              <li><Link href="/uitleg/wachtwoorden" className="text-senior-base font-semibold text-gold hover:text-gold-light">Wachtwoorden beheren →</Link></li>
              <li><Link href="/digitale-hulp/apps-installeren" className="text-senior-base font-semibold text-gold hover:text-gold-light">DigiD app installeren (telefoon) →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
