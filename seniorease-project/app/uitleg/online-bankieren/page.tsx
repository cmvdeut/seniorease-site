import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Veilig online bankieren — uitleg voor senioren',
  description:
    'Hoe bankiert u veilig via internet? Inloggen, iDEAL betalen en verdachte afschrijvingen herkennen. Rustige uitleg voor senioren.',
};

type Stap = { stap: string; uitleg: ReactNode; tip?: string };

function StappenLijst({ stappen }: { stappen: Stap[] }) {
  return (
    <ol className="space-y-6">
      {stappen.map((item, i) => (
        <li key={i} className="flex gap-5 items-start list-none">
          <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
            {i + 1}
          </div>
          <div className="pt-1 flex-1">
            <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
            <div className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</div>
            {item.tip && (
              <p className="text-senior-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                💡 {item.tip}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function OnlineBankierenPage() {
  const veiligStappen: Stap[] = [
    {
      stap: 'Typ het bankadres zelf',
      uitleg: (
        <>
          Ga naar uw bank via een adres dat u kent — bijv. <strong>ing.nl</strong>, <strong>rabobank.nl</strong>, <strong>abnamro.nl</strong>. Typ het zelf in de browser. Klik niet op links in e-mails of sms&apos;jes die zeggen dat u moet inloggen.
        </>
      ),
      tip: 'Let op het webadres: moet eindigen op de echte banknaam, niet op iets als bank-beveiliging.com.',
    },
    {
      stap: 'Inloggen met paslezer, app of code',
      uitleg: (
        <>
          Elke bank werkt iets anders: soms een <strong>paslezer</strong> (digipas), soms de <strong>bank-app</strong> op uw telefoon, soms een code via sms. Volg alleen de stappen op het scherm van uw <strong>eigen</strong> bankwebsite — nooit instructies van een beller of WhatsApp-bericht.
        </>
      ),
    },
    {
      stap: 'Controleer uw saldo en afschrijvingen',
      uitleg: (
        <>
          Log regelmatig in en kijk of u <strong>herkenbare afschrijvingen</strong> ziet. Kleine bedragen die u niet kent? Of betalingen aan vreemde webshops? Noteer de datum en bel uw bank als u twijfelt.
        </>
      ),
    },
  ];

  const idealStappen: Stap[] = [
    {
      stap: 'Wat is iDEAL?',
      uitleg: (
        <>
          <strong>iDEAL</strong> is de manier om in Nederland veilig online te betalen — direct van uw bankrekening. U ziet het bij webshops als knop <strong>Betalen met iDEAL</strong>. U kiest uw bank, logt in zoals gewoonlijk, en keurt de betaling goed.
        </>
      ),
    },
    {
      stap: 'Zo werkt een iDEAL-betaling',
      uitleg: (
        <>
          Kies iDEAL → kies uw bank → u wordt doorgestuurd naar de bankomgeving → controleer <strong>bedrag</strong> en <strong>ontvanger</strong> → bevestig met pas, app of code. Pas op: betaalt u aan een <strong>onbekend</strong> bedrijf? Stop even en vraag hulp.
        </>
      ),
      tip: 'Betaalt u voor het eerst online? Vraag een familielid mee te kijken — dat geeft rust.',
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/veilig-internet" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Veilig internet
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Veilig online bankieren
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Inloggen, betalen met iDEAL en oplichting voorkomen — stap voor stap.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Bang om online te bankieren?</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              Dat is heel begrijpelijk. Miljoenen Nederlanders bankieren veilig via internet — mits u een paar regels volgt. Uw bank vraagt <strong>nooit</strong> om uw pincode, wachtwoord of DigiD via telefoon of WhatsApp. Onthoud dat, dan bent u al een stuk veiliger.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veilig inloggen bij uw bank</h2>
            <StappenLijst stappen={veiligStappen} />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Betalen met iDEAL</h2>
            <StappenLijst stappen={idealStappen} />
          </section>

          <section className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-red-800 mb-4">Verdacht? Dit kunt u doen</h2>
            <ul className="space-y-3 text-senior-sm md:text-senior-base text-gray-700">
              <li><strong>Bel direct uw bank</strong> — het nummer staat op uw bankpas of op de echte website</li>
              <li><strong>Blokkeer uw pas</strong> als u denkt dat iemand meekijkt of u per ongeluk gegevens heeft gedeeld</li>
              <li><strong>Doe aangifte</strong> bij politie bij oplichting — uw bank kan u hierbij helpen</li>
              <li><strong>Deel nooit</strong> scherm, pincode of inlogcodes met &quot;helpdeskmedewerkers&quot; die u bellen</li>
            </ul>
            <p className="text-senior-sm md:text-senior-base text-gray-700 mt-4">
              Herkenning van nepberichten:{' '}
              <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link>,{' '}
              <Link href="/uitleg/digid" className="font-bold text-primary hover:underline">DigiD veilig gebruiken</Link>.
            </p>
          </section>

          <section className="bg-neutral-cream border-2 border-primary/20 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Online boodschappen of bestellen</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              Veel webshops werken met iDEAL. Zie ook{' '}
              <Link href="/uitleg/bol-com" className="font-bold text-primary hover:underline">Bestellen bij Bol.com</Link> en{' '}
              <Link href="/uitleg/boodschappen-bestellen" className="font-bold text-primary hover:underline">Online boodschappen bestellen</Link>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/digid" className="text-senior-base font-bold text-primary hover:underline">DigiD uitleg →</Link></li>
              <li><Link href="/digitale-hulp/veilig-wachtwoord-maken" className="text-senior-base font-bold text-primary hover:underline">Veilig wachtwoord maken →</Link></li>
              <li><Link href="/digitale-hulp/phishing-mail-herkennen" className="text-senior-base font-bold text-primary hover:underline">Phishing mail herkennen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
