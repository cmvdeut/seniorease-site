export type UitlegCluster = {
  id: string;
  titel: string;
  omschrijving: string;
  paginas: { href: string; label: string }[];
};

export const UITLEG_CLUSTERS: UitlegCluster[] = [
  {
    id: 'streaming',
    titel: 'Streaming & TV',
    omschrijving: "Films, series en programma's kijken.",
    paginas: [
      { href: '/uitleg/netflix', label: 'Netflix gebruiken' },
      { href: '/uitleg/npo-start', label: 'NPO Start – gratis tv terugkijken' },
      { href: '/uitleg/youtube-tv', label: 'YouTube kijken' },
    ],
  },
  {
    id: 'videobellen',
    titel: 'Videobellen',
    omschrijving: 'Familie en vrienden zien terwijl u belt.',
    paginas: [
      { href: '/uitleg/videobellen', label: 'Videobellen via WhatsApp' },
      { href: '/uitleg/zoom', label: 'Zoom gebruiken' },
      { href: '/uitleg/facetime', label: 'FaceTime (iPhone/iPad)' },
    ],
  },
  {
    id: 'winkelen',
    titel: 'Online winkelen',
    omschrijving: 'Veilig bestellen en laten bezorgen.',
    paginas: [
      { href: '/uitleg/bol-com', label: 'Bestellen bij Bol.com' },
      { href: '/uitleg/boodschappen-bestellen', label: 'Online boodschappen bestellen' },
      { href: '/uitleg/online-retourneren', label: 'Iets terugsturen' },
    ],
  },
  {
    id: 'reizen',
    titel: 'Reizen',
    omschrijving: 'Apps voor onderweg en op vakantie.',
    paginas: [
      { href: '/uitleg/google-maps', label: 'Google Maps gebruiken' },
      { href: '/uitleg/google-translate', label: 'Google Translate – vertalen op reis' },
      { href: '/uitleg/9292', label: '9292 OV-app – trein en bus plannen' },
      { href: '/uitleg/betalen-ov', label: 'Betalen in het OV met pinpas of OV-chipkaart' },
      { href: '/uitleg/mobiel-parkeren', label: 'Mobiel parkeren met uw telefoon' },
    ],
  },
  {
    id: 'smartphone',
    titel: 'Smartphone',
    omschrijving: 'WhatsApp, wifi, QR-code en meer.',
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
    id: 'fotos',
    titel: "Foto's",
    omschrijving: 'Maken, bewaren, ordenen en overzetten.',
    paginas: [
      { href: '/uitleg/fotos-maken', label: "Foto's maken met uw telefoon" },
      { href: '/uitleg/fotos-ordenen', label: "Foto's ordenen en bewaren" },
      { href: '/uitleg/fotos-naar-computer', label: "Foto's van telefoon naar computer" },
      { href: '/foto-archief', label: "Foto Archief — namen op groepsfoto's" },
    ],
  },
  {
    id: 'computer',
    titel: 'Computer',
    omschrijving: 'E-mail, bestanden en een soepele pc.',
    paginas: [
      { href: '/uitleg/email-bijlage', label: 'E-mail bijlage openen en opslaan' },
      { href: '/uitleg/bestanden-vinden', label: 'Bestanden vinden (Downloads, Verkenner)' },
      { href: '/uitleg/computer-traag', label: 'Computer traag of vastgelopen' },
      { href: '/uitleg/screenshot-pc', label: 'Screenshot maken op computer' },
      { href: '/uitleg/letters-groter-pc', label: 'Letters groter maken op computer' },
      { href: '/uitleg/programma-installeren', label: 'Programma installeren op computer' },
      { href: '/digitale-hulp/e-mail-openen', label: 'E-mail openen' },
      { href: '/digitale-hulp/googelen-google-zoeken', label: 'Googelen voor beginners' },
    ],
  },
  {
    id: 'digid',
    titel: 'DigiD & bankieren',
    omschrijving: 'Veilig inloggen bij overheid en bank.',
    paginas: [
      { href: '/uitleg/digid', label: 'DigiD — wat is het en hoe werkt het?' },
      { href: '/uitleg/online-bankieren', label: 'Veilig online bankieren' },
      { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
      { href: '/uitleg/wachtwoorden', label: 'Wachtwoorden beheren' },
    ],
  },
  {
    id: 'muziek',
    titel: 'Muziek & e-books',
    omschrijving: 'Muziek luisteren en e-boeken lezen.',
    paginas: [
      { href: '/uitleg/muziek-radio', label: 'Muziek en radio op uw telefoon' },
      { href: '/uitleg/ebooks', label: 'E-books lezen' },
    ],
  },
  {
    id: 'hobby',
    titel: 'Hobby & vrije tijd',
    omschrijving: "Handige uitleg voor uw hobby's.",
    paginas: [
      { href: '/uitleg/e-bike', label: 'E-bike app gebruiken' },
      { href: '/uitleg/hoofdtelefoon', label: 'Hoofdtelefoon instellen' },
    ],
  },
];

export function getUitlegCluster(id: string) {
  return UITLEG_CLUSTERS.find((c) => c.id === id);
}
