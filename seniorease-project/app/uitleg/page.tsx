import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alle uitleg | SeniorEase',
  description: 'Overzicht van alle stap-voor-stap uitleg voor senioren: videobellen, streaming, online winkelen, reizen en meer.',
};

const clusters = [
  {
    titel: '📺 Streaming & TV',
    omschrijving: 'Films, series en programma\'s kijken op uw tablet of tv.',
    paginas: [
      { href: '/uitleg/netflix', label: 'Netflix gebruiken' },
      { href: '/uitleg/npo-start', label: 'NPO Start – gratis tv terugkijken' },
      { href: '/uitleg/youtube-tv', label: 'YouTube kijken' },
    ],
  },
  {
    titel: '📞 Videobellen',
    omschrijving: 'Familie en vrienden zien terwijl u belt.',
    paginas: [
      { href: '/uitleg/videobellen', label: 'Videobellen via WhatsApp' },
      { href: '/uitleg/zoom', label: 'Zoom gebruiken' },
      { href: '/uitleg/facetime', label: 'FaceTime (iPhone/iPad)' },
    ],
  },
  {
    titel: '🛒 Online winkelen',
    omschrijving: 'Veilig bestellen en thuis laten bezorgen.',
    paginas: [
      { href: '/uitleg/bol-com', label: 'Bestellen bij Bol.com' },
      { href: '/uitleg/boodschappen-bestellen', label: 'Online boodschappen bestellen' },
      { href: '/uitleg/online-retourneren', label: 'Iets terugsturen' },
    ],
  },
  {
    titel: '✈️ Reizen',
    omschrijving: 'Handige apps voor onderweg en op vakantie.',
    paginas: [
      { href: '/uitleg/google-maps', label: 'Google Maps gebruiken' },
      { href: '/uitleg/google-translate', label: 'Google Translate – vertalen op reis' },
      { href: '/uitleg/9292', label: '9292 OV-app – trein en bus plannen' },
    ],
  },
  {
    titel: '📱 Smartphone basics',
    omschrijving: 'De basis van uw smartphone of tablet.',
    paginas: [
      { href: '/uitleg/whatsapp-basis', label: 'WhatsApp – eerste stappen' },
      { href: '/uitleg/wifi', label: 'WiFi instellen' },
      { href: '/uitleg/qr-code', label: 'QR-code scannen' },
      { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
      { href: '/uitleg/wachtwoorden', label: 'Wachtwoorden beheren' },
    ],
  },
  {
    titel: '📷 Foto\'s',
    omschrijving: 'Foto\'s maken, bewaren en ordenen.',
    paginas: [
      { href: '/uitleg/fotos-maken', label: 'Foto\'s maken met uw telefoon' },
      { href: '/uitleg/fotos-ordenen', label: 'Foto\'s ordenen en bewaren' },
    ],
  },
  {
    titel: '🎵 Muziek & e-books',
    omschrijving: 'Muziek luisteren en e-boeken lezen.',
    paginas: [
      { href: '/uitleg/muziek-radio', label: 'Muziek en radio op uw telefoon' },
      { href: '/uitleg/ebooks', label: 'E-books lezen' },
    ],
  },
  {
    titel: '🚲 Hobby & vrije tijd',
    omschrijving: 'Handige uitleg voor uw hobby\'s.',
    paginas: [
      { href: '/uitleg/e-bike', label: 'E-bike app gebruiken' },
      { href: '/uitleg/hoofdtelefoon', label: 'Hoofdtelefoon instellen' },
    ],
  },
];

export default function UitlegOverzichtPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Alle uitleg
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Stap-voor-stap uitleg over technologie — rustig, duidelijk, zonder gedoe.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {clusters.map((cluster, i) => (
            <section key={i} className="bg-white rounded-2xl shadow-sm border-2 border-neutral-stone p-8">
              <h2 className="text-senior-xl font-bold text-primary mb-1">{cluster.titel}</h2>
              <p className="text-senior-sm text-gray-500 mb-5">{cluster.omschrijving}</p>
              <ul className="space-y-2">
                {cluster.paginas.map((p, j) => (
                  <li key={j}>
                    <Link
                      href={p.href}
                      className="flex items-center gap-3 text-senior-base font-semibold text-primary hover:text-primary-dark hover:underline py-1.5"
                    >
                      <span className="text-primary">→</span>
                      {p.label}
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
