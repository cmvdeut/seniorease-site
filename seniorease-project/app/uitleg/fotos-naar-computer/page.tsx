import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import type { ReactNode } from 'react';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seniorease.nl' },
    { '@type': 'ListItem', position: 2, name: 'Uitleg', item: 'https://www.seniorease.nl/uitleg' },
    { '@type': 'ListItem', position: 3, name: "Foto's naar computer", item: 'https://www.seniorease.nl/uitleg/fotos-naar-computer' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "Foto's van telefoon naar computer kopiëren",
  description: 'Stap voor stap uitleg om foto\'s van uw smartphone over te zetten naar een Windows-computer of Mac.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Kies een methode', text: 'E-mail, WhatsApp, USB-kabel, Google Foto\'s of iCloud — kies wat het makkelijkst is voor u.' },
    { '@type': 'HowToStep', position: 2, name: 'E-mail (eenvoudigst)', text: 'Open de foto op uw telefoon, tik op Delen, kies E-mail, stuur naar uw eigen adres en open de bijlage op de computer.' },
    { '@type': 'HowToStep', position: 3, name: 'Google Foto\'s of iCloud', text: 'Met back-up aan kunt u op de computer inloggen op photos.google.com of icloud.com en foto\'s downloaden.' },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/fotos-naar-computer',
  title: "Foto",
  description: "Hoe zet u foto",
});

type Stap = {
  stap: string;
  uitleg: ReactNode;
  tip?: string;
};

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
            <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
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

export default function FotosNaarComputerPage() {
  const emailStappen: Stap[] = [
    {
      stap: 'Open de foto op uw telefoon',
      uitleg: (
        <>
          Open de app <strong>Foto&apos;s</strong> (iPhone) of <strong>Galerij</strong> / <strong>Google Foto&apos;s</strong> (Android). Tik op de foto die u naar uw computer wilt.
        </>
      ),
    },
    {
      stap: 'Tik op Delen',
      uitleg: (
        <>
          Onderaan of bovenaan ziet u een <strong>deel-icoon</strong> (vaak een pijltje omhoog of drie puntjes met &quot;Delen&quot;). Tik daarop.
        </>
      ),
    },
    {
      stap: 'Kies E-mail',
      uitleg: (
        <>
          Tik op <strong>E-mail</strong> of <strong>Gmail</strong>. Kies uw eigen e-mailadres als ontvanger — bijvoorbeeld het adres dat u ook op de computer gebruikt.
        </>
      ),
      tip: 'Weet u uw e-mailadres niet? Vraag een familielid om het even op te schrijven, of kijk in Instellingen → E-mail op uw telefoon.',
    },
    {
      stap: 'Verstuur en open op de computer',
      uitleg: (
        <>
          Tik op <strong>Versturen</strong>. Ga op uw computer naar uw e-mail (bijv. Gmail in de browser). Open de mail, klik op de bijlage en sla de foto op — bijvoorbeeld in <strong>Afbeeldingen</strong> of <strong>Bureaublad</strong>.
        </>
      ),
    },
  ];

  const whatsappStappen: Stap[] = [
    {
      stap: 'Open WhatsApp',
      uitleg: 'Open het gesprek met uzelf of met iemand die u vertrouwt (bijv. uw kind of kleinkind).',
      tip: 'Op sommige telefoons kunt u een gesprek met uzelf maken door uw eigen nummer op te slaan als contact.',
    },
    {
      stap: 'Deel de foto',
      uitleg: (
        <>
          Open de foto in de Foto&apos;s-app → <strong>Delen</strong> → <strong>WhatsApp</strong> → kies het gesprek → <strong>Versturen</strong>.
        </>
      ),
    },
    {
      stap: 'Op de computer',
      uitleg: (
        <>
          Open <strong>WhatsApp Web</strong> in uw browser (<strong>web.whatsapp.com</strong>) of de WhatsApp-app op de computer. Scan de QR-code met uw telefoon als dat gevraagd wordt. Open het gesprek, klik op de foto en download deze.
        </>
      ),
    },
  ];

  const usbAndroidStappen: Stap[] = [
    {
      stap: 'Sluit uw telefoon aan',
      uitleg: (
        <>
          Gebruik de <strong>USB-kabel</strong> waarmee u uw telefoon ook oplaadt. Steek het ene uiteinde in uw telefoon, het andere in een <strong>USB-poort</strong> van uw computer.
        </>
      ),
    },
    {
      stap: 'Kies wat u wilt doen',
      uitleg: (
        <>
          Op uw telefoonscherm verschijnt vaak een vraag. Kies iets als <strong>Bestanden overbrengen</strong> of <strong>Foto&apos;s overzetten</strong> — niet alleen &quot;Opladen&quot;.
        </>
      ),
    },
    {
      stap: 'Zoek de foto\'s op de computer',
      uitleg: (
        <>
          Op een <strong>Windows-computer</strong>: open <strong>Verkenner</strong> (map-icoon). Uw telefoon staat links, bijvoorbeeld onder <strong>Deze pc</strong>. Open de map <strong>DCIM</strong> → <strong>Camera</strong>. Daar staan uw foto&apos;s. Sleep ze naar <strong>Afbeeldingen</strong> of een map op uw Bureaublad.
        </>
      ),
      tip: 'Ziet u uw telefoon niet? Ontkoppel de kabel, ontgrendel uw telefoon en sluit opnieuw aan.',
    },
  ];

  const usbIphoneStappen: Stap[] = [
    {
      stap: 'Sluit uw iPhone aan',
      uitleg: 'Gebruik een Lightning- of USB-C-kabel en sluit aan op uw computer.',
    },
    {
      stap: 'Vertrouw deze computer',
      uitleg: (
        <>
          Op uw iPhone verschijnt: <strong>&quot;Deze computer vertrouwen?&quot;</strong> Tik op <strong>Vertrouwen</strong> en voer eventueel uw pincode in.
        </>
      ),
    },
    {
      stap: 'Foto\'s importeren',
      uitleg: (
        <>
          Op een <strong>Windows-pc</strong> opent soms automatisch een venster om foto&apos;s te importeren. Kies de foto&apos;s en een map op uw computer. Op een <strong>Mac</strong> opent vaak de app <strong>Foto&apos;s</strong> — volg de stappen op het scherm.
        </>
      ),
      tip: 'Lukt het niet? Gebruik dan e-mail of iCloud — dat is voor veel mensen makkelijker.',
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/uitleg" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Alle uitleg
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Foto&apos;s van telefoon naar computer
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Op uw computer bekijken, bewaren of printen — stap voor stap, zonder gedoe.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Foto uitleg navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">📷 Foto&apos;s:</span>
              <Link href="/uitleg/fotos-maken" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">
                Foto&apos;s maken
              </Link>
              <Link href="/uitleg/fotos-ordenen" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">
                Foto&apos;s ordenen
              </Link>
              <span className="text-senior-sm font-bold text-gold underline">Naar computer</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Waarom naar de computer?</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Foto&apos;s staan mooi op uw telefoon — maar soms wilt u ze op een <strong>groter scherm</strong> bekijken, <strong>printen</strong>, veilig <strong>bewaren</strong> of delen met iemand die niet app&apos;t.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              U hoeft niet technisch te zijn. Kies één methode hieronder die bij u past. E-mail werkt bijna altijd; een kabel of de cloud kan handig zijn als u vaker foto&apos;s overzet.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '✉️', label: 'E-mail — het makkelijkst' },
                { icon: '💬', label: 'WhatsApp Web op pc' },
                { icon: '🔌', label: 'USB-kabel' },
                { icon: '☁️', label: "Google Foto's / iCloud" },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">
              Methode 1 — Via e-mail (aanbevolen om mee te beginnen)
            </h2>
            <p className="text-senior-sm text-navy/70 mb-6">
              Werkt op iPhone en Android. Handig voor een enkele foto of een paar foto&apos;s tegelijk.
            </p>
            <StappenLijst stappen={emailStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">Methode 2 — Via WhatsApp</h2>
            <p className="text-senior-sm text-navy/70 mb-6">
              Handig als u WhatsApp al gebruikt. Meer over foto&apos;s in WhatsApp:{' '}
              <Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="font-semibold text-gold hover:text-gold-light">
                WhatsApp foto&apos;s opslaan
              </Link>
              .
            </p>
            <StappenLijst stappen={whatsappStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Methode 3 — Met een USB-kabel</h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-senior-lg font-bold text-green-800 mb-4">🤖 Android-telefoon + Windows-computer</h3>
                <StappenLijst stappen={usbAndroidStappen} />
              </div>
              <div className="border-t border-navy/10/50 pt-8">
                <h3 className="text-senior-lg font-bold text-navy/75 mb-4">🍎 iPhone + computer</h3>
                <StappenLijst stappen={usbIphoneStappen} />
              </div>
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Methode 4 — Via de cloud (als back-up al aan staat)
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Heeft u <strong>Google Foto&apos;s</strong> (Android) of <strong>iCloud-foto&apos;s</strong> (iPhone) aan staan? Dan staan uw foto&apos;s ook online. Op de computer kunt u inloggen en ze downloaden. Meer uitleg:{' '}
              <Link href="/digitale-hulp/wat-is-de-cloud" className="font-semibold text-gold hover:text-gold-light">
                Wat is de cloud?
              </Link>
              .
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-green-800 mb-3">🤖 Google Foto&apos;s</h3>
                <ol className="space-y-3 list-decimal list-outside pl-5 text-senior-base text-navy/80">
                  <li>Open op uw computer <strong>Chrome</strong> of <strong>Edge</strong>.</li>
                  <li>Ga naar <strong>photos.google.com</strong> en log in met hetzelfde Google-account als op uw telefoon.</li>
                  <li>Klik op een foto → <strong>⋮</strong> (drie puntjes) → <strong>Downloaden</strong>.</li>
                </ol>
              </div>
              <div className="bg-paper border border-navy/8 rounded-xl p-6">
                <h3 className="text-senior-lg font-bold text-navy/75 mb-3">🍎 iCloud</h3>
                <ol className="space-y-3 list-decimal list-outside pl-5 text-senior-base text-navy/80">
                  <li>Open op uw computer een browser.</li>
                  <li>Ga naar <strong>icloud.com</strong> en log in met uw Apple-id.</li>
                  <li>Tik op <strong>Foto&apos;s</strong>, kies een foto en download deze.</li>
                </ol>
              </div>
            </div>
            <p className="text-senior-sm text-navy/70 mt-4">
              Back-up nog niet aan? Zie{' '}
              <Link href="/uitleg/fotos-ordenen" className="font-semibold text-gold hover:text-gold-light">
                Foto&apos;s ordenen
              </Link>{' '}
              — daar staat hoe u automatische back-up instelt.
            </p>
          </section>

          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-4">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Welke methode is het makkelijkst?</p>
                <p className="text-senior-base text-navy/80">
                  Voor de meeste mensen: <strong>e-mail naar uzelf</strong>. Eén foto, duidelijke stappen, werkt overal.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Kan ik meerdere foto&apos;s tegelijk overzetten?</p>
                <p className="text-senior-base text-navy/80">
                  Ja. Selecteer meerdere foto&apos;s op uw telefoon (lang ingedrukt houden of &quot;Selecteren&quot;) en deel ze via e-mail, of gebruik een USB-kabel en kopieer een hele map.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Verdwijnen de foto&apos;s op mijn telefoon?</p>
                <p className="text-senior-base text-navy/80">
                  Nee. U <strong>kopieert</strong> ze — een kopie op de computer, de originelen blijven op uw telefoon. Alleen als u ze op de telefoon <em>verwijdert</em>, zijn ze daar weg.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Ik kom er niet uit — wat nu?</p>
                <p className="text-senior-base text-navy/80">
                  Vraag een familielid om even mee te kijken. Of stuur de foto via WhatsApp naar iemand die u vertrouwt — die kan hem op de computer voor u opslaan.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/foto-archief" className="text-senior-base font-semibold text-gold hover:text-gold-light">
                  Foto Archief — personen labelen op groepsfoto&apos;s →
                </Link>
              </li>
              <li>
                <Link href="/uitleg/fotos-ordenen" className="text-senior-base font-semibold text-gold hover:text-gold-light">
                  Foto&apos;s ordenen en back-up →
                </Link>
              </li>
              <li>
                <Link href="/uitleg/fotos-maken" className="text-senior-base font-semibold text-gold hover:text-gold-light">
                  Betere foto&apos;s maken →
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="text-senior-base font-semibold text-gold hover:text-gold-light">
                  WhatsApp foto&apos;s opslaan →
                </Link>
              </li>
              <li>
                <Link href="/uitleg/wifi" className="text-senior-base font-semibold text-gold hover:text-gold-light">
                  WiFi instellen →
                </Link>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
