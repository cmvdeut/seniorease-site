import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alle uitleg | SeniorEase',
  description: 'Overzicht van alle stap-voor-stap uitleg voor senioren: videobellen, streaming, online winkelen, reizen en meer.',
};

const clusters = [
  {
    titel: 'Streaming & TV',
    omschrijving: 'Films, series en programma\'s kijken op uw tablet of tv.',
    paginas: [
      { href: '/uitleg/netflix', label: 'Netflix gebruiken' },
      { href: '/uitleg/npo-start', label: 'NPO Start – gratis tv terugkijken' },
      { href: '/uitleg/youtube-tv', label: 'YouTube kijken' },
    ],
  },
  {
    titel: 'Videobellen',
    omschrijving: 'Familie en vrienden zien terwijl u belt.',
    paginas: [
      { href: '/uitleg/videobellen', label: 'Videobellen via WhatsApp' },
      { href: '/uitleg/zoom', label: 'Zoom gebruiken' },
      { href: '/uitleg/facetime', label: 'FaceTime (iPhone/iPad)' },
    ],
  },
  {
    titel: 'Online winkelen',
    omschrijving: 'Veilig bestellen en thuis laten bezorgen.',
    paginas: [
      { href: '/uitleg/bol-com', label: 'Bestellen bij Bol.com' },
      { href: '/uitleg/boodschappen-bestellen', label: 'Online boodschappen bestellen' },
      { href: '/uitleg/online-retourneren', label: 'Iets terugsturen' },
    ],
  },
  {
    titel: 'Reizen',
    omschrijving: 'Handige apps voor onderweg en op vakantie.',
    paginas: [
      { href: '/uitleg/google-maps', label: 'Google Maps gebruiken' },
      { href: '/uitleg/google-translate', label: 'Google Translate – vertalen op reis' },
      { href: '/uitleg/9292', label: '9292 OV-app – trein en bus plannen' },
      { href: '/uitleg/betalen-ov', label: 'Betalen in het OV met pinpas of OV-chipkaart' },
    ],
  },
  {
    titel: 'Smartphone basics',
    omschrijving: 'De basis van uw smartphone of tablet.',
    paginas: [
      { href: '/uitleg/whatsapp-basis', label: 'WhatsApp – eerste stappen' },
      { href: '/uitleg/wifi', label: 'WiFi instellen' },
      { href: '/uitleg/qr-code', label: 'QR-code scannen' },
      { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
      { href: '/uitleg/wachtwoorden', label: 'Wachtwoorden beheren' },
      { href: '/uitleg/inspreken', label: 'Iets inspreken op uw telefoon' },
    ],
  },
  {
    titel: "Foto's",
    omschrijving: "Foto's maken, bewaren, ordenen en overzetten naar uw computer.",
    paginas: [
      { href: '/uitleg/fotos-maken', label: "Foto's maken met uw telefoon" },
      { href: '/uitleg/fotos-ordenen', label: "Foto's ordenen en bewaren" },
      { href: '/uitleg/fotos-naar-computer', label: "Foto's van telefoon naar computer" },
    ],
  },
  {
    titel: 'Computer',
    omschrijving: 'E-mail, bestanden en uw pc soepel houden.',
    paginas: [
      { href: '/uitleg/email-bijlage', label: 'E-mail bijlage openen en opslaan' },
      { href: '/uitleg/bestanden-vinden', label: 'Bestanden vinden (Downloads, Verkenner)' },
      { href: '/uitleg/computer-traag', label: 'Computer traag of vastgelopen' },
      { href: '/uitleg/screenshot-pc', label: 'Screenshot maken op computer' },
      { href: '/uitleg/letters-groter-pc', label: 'Letters groter maken op computer' },
      { href: '/uitleg/programma-installeren', label: 'Programma installeren op computer' },
      { href: '/uitleg/fotos-naar-computer', label: "Foto's van telefoon naar computer" },
      { href: '/digitale-hulp/e-mail-openen', label: 'E-mail openen' },
      { href: '/digitale-hulp/googelen-google-zoeken', label: 'Googelen voor beginners' },
    ],
  },
  {
    titel: 'DigiD & bankieren',
    omschrijving: 'Veilig inloggen bij overheid en bank — zonder angst.',
    paginas: [
      { href: '/uitleg/digid', label: 'DigiD — wat is het en hoe werkt het?' },
      { href: '/uitleg/online-bankieren', label: 'Veilig online bankieren' },
      { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
      { href: '/uitleg/wachtwoorden', label: 'Wachtwoorden beheren' },
    ],
  },
  {
    titel: 'Muziek & e-books',
    omschrijving: 'Muziek luisteren en e-boeken lezen.',
    paginas: [
      { href: '/uitleg/muziek-radio', label: 'Muziek en radio op uw telefoon' },
      { href: '/uitleg/ebooks', label: 'E-books lezen' },
    ],
  },
  {
    titel: 'Hobby & vrije tijd',
    omschrijving: "Handige uitleg voor uw hobby's.",
    paginas: [
      { href: '/uitleg/e-bike', label: 'E-bike app gebruiken' },
      { href: '/uitleg/hoofdtelefoon', label: 'Hoofdtelefoon instellen' },
    ],
  },
];

export default function UitlegOverzichtPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Alle uitleg
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Stap-voor-stap uitleg over technologie — rustig, duidelijk, zonder gedoe.
        </p>

        <div className="space-y-4">
          {clusters.map((cluster, i) => (
            <section key={i} className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-6 md:p-8">
              <h2 className="text-senior-lg font-bold text-gray-900 mb-1">{cluster.titel}</h2>
              <p className="text-senior-sm text-gray-500 mb-4">{cluster.omschrijving}</p>
              <ul className="divide-y divide-neutral-stone/30">
                {cluster.paginas.map((p, j) => (
                  <li key={j}>
                    <Link
                      href={p.href}
                      className="flex items-center justify-between text-senior-base font-semibold text-gray-800 hover:text-primary transition-colors py-3 group"
                      style={{ minHeight: 'auto' }}
                    >
                      {p.label}
                      <span className="text-gray-300 group-hover:text-primary transition-colors text-senior-base">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
