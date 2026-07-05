import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'E-mail bijlage openen en opslaan — uitleg voor senioren',
  description:
    'Hoe opent u een bijlage in een e-mail op uw computer? En waar slaat u die foto of brief veilig op? Stap voor stap uitgelegd.',
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

export default function EmailBijlagePage() {
  const gmailStappen: Stap[] = [
    {
      stap: 'Open uw e-mail op de computer',
      uitleg: (
        <>
          Open <strong>Chrome</strong> of <strong>Edge</strong> en ga naar <strong>gmail.com</strong> (of <strong>outlook.com</strong> als u Outlook gebruikt). Log in als dat nodig is.
        </>
      ),
    },
    {
      stap: 'Open de e-mail met bijlage',
      uitleg: (
        <>
          Klik op het bericht in uw inbox. Ziet u een <strong>paperclip</strong> 📎 of een bestandsnaam onder de mail? Dan zit er een bijlage in — bijvoorbeeld een foto of pdf.
        </>
      ),
    },
    {
      stap: 'Bijlage openen',
      uitleg: (
        <>
          In <strong>Gmail</strong>: klik onderaan op de bijlage (bijv. <strong>foto.jpg</strong> of <strong>brief.pdf</strong>). De bijlage opent in een nieuw venster of tabblad.
          <br /><br />
          In <strong>Outlook</strong>: klik op de bijlage bovenaan het bericht. Kies <strong>Openen</strong> of <strong>Voorbeeld</strong>.
        </>
      ),
    },
    {
      stap: 'Bijlage opslaan op uw computer',
      uitleg: (
        <>
          Klik op het <strong>download-icoon</strong> (pijl naar beneden) of kies <strong>Opslaan</strong> / <strong>Downloaden</strong>. Kies een map die u kent — bijvoorbeeld <strong>Downloads</strong> of <strong>Afbeeldingen</strong>. Klik op <strong>Opslaan</strong>.
        </>
      ),
      tip: 'Weet u niet waar het bestand staat? Lees verderop op deze pagina de link naar Bestanden vinden op uw computer.',
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/internet-email" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Internet & e-mail
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              E-mail bijlage openen en opslaan
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Een foto of brief in uw mail — rustig openen en bewaren op uw computer.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">💻 Computer:</span>
              <span className="text-senior-sm font-bold text-primary underline">E-mail bijlage</span>
              <Link href="/uitleg/bestanden-vinden" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Bestanden vinden</Link>
              <Link href="/uitleg/computer-traag" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Computer traag</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Wat is een bijlage?</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Een bijlage is een bestand dat iemand met de e-mail meestuurt — een foto, een pdf-brief of een document. U opent de mail, klikt op de bijlage en kunt die op uw computer bewaren.
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              Nog geen e-mail op de computer? Begin bij{' '}
              <Link href="/digitale-hulp/e-mail-openen" className="font-bold text-primary hover:underline">E-mail openen</Link>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Stap voor stap — op de computer</h2>
            <StappenLijst stappen={gmailStappen} />
          </section>

          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">⚠️ Veilig: wanneer niet openen?</h2>
            <ul className="space-y-3 text-senior-base text-gray-700">
              <li className="flex gap-2"><span className="text-red-600 font-bold">✗</span>Kent u de afzender niet? Open geen bijlage.</li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">✗</span>Staat er iets als &quot;urgent, klik nu&quot; of &quot;uw rekening wordt geblokkeerd&quot;? Vaak oplichting.</li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span>Wel openen: mail van familie, uw bank (als u die verwacht), of de gemeente — als het adres klopt.</li>
            </ul>
            <p className="text-senior-base text-gray-700 mt-4">
              Meer uitleg: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/digitale-hulp/e-mail-openen" className="text-senior-base font-bold text-primary hover:underline">E-mail openen →</Link></li>
              <li><Link href="/uitleg/bestanden-vinden" className="text-senior-base font-bold text-primary hover:underline">Bestanden vinden op uw computer →</Link></li>
              <li><Link href="/uitleg/fotos-naar-computer" className="text-senior-base font-bold text-primary hover:underline">Foto&apos;s van telefoon naar computer →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
