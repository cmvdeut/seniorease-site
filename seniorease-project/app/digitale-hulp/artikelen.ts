export interface Artikel {
  slug: string;
  title: string;
  description: string;
}

export const artikelen: Artikel[] = [
  {
    slug: "whatsapp-uitleg-beginners",
    title: "WhatsApp uitleg voor beginners",
    description: "Wat is WhatsApp en hoe gebruikt u het? Stap voor stap uitleg voor wie net begint met berichten en foto's sturen.",
  },
  {
    slug: "whatsapp-fotos-opslaan",
    title: "WhatsApp foto's opslaan",
    description: "Hoe bewaart u foto's die u via WhatsApp krijgt op uw telefoon? Stap voor stap uitgelegd voor senioren.",
  },
  {
    slug: "telefoon-sneller-maken",
    title: "Telefoon sneller maken",
    description: "Uw telefoon wordt traag? Eenvoudige tips om uw telefoon weer sneller te maken.",
  },
  {
    slug: "phishing-herkennen",
    title: "Phishing herkennen",
    description: "Wat is phishing en hoe herkent u valse e-mails en berichten? Bescherm uzelf tegen oplichting.",
  },
  {
    slug: "letters-groter-maken-telefoon",
    title: "Letters groter maken op telefoon",
    description: "Hoe maakt u de letters op uw telefoon groter? Eenvoudige instelling voor beter leescomfort.",
  },
  {
    slug: "wifi-werkt-niet-oplossen",
    title: "Wifi werkt niet – oplossen",
    description: "Internet werkt niet of wifi valt uit? Stap voor stap wat u kunt controleren en oplossen.",
  },
  {
    slug: "apps-installeren",
    title: "Apps installeren stap voor stap",
    description: "Hoe installeert u een app op uw telefoon of tablet? Veilig en eenvoudig uitgelegd.",
  },
  {
    slug: "fotos-kwijt-telefoon",
    title: "Foto's kwijt op telefoon",
    description: "Foto's kwijtgeraakt op uw telefoon? Waar ze kunnen zitten en hoe u ze terugvindt of herstelt.",
  },
  {
    slug: "wat-is-ai-simpel-uitgelegd",
    title: "Wat is AI – simpel uitgelegd",
    description: "Wat is kunstmatige intelligentie en gebruikt u het al? Begrijpelijke uitleg voor senioren.",
  },
  {
    slug: "veilig-wachtwoord-maken",
    title: "Veilig wachtwoord maken",
    description: "Hoe maakt u een sterk wachtwoord dat u toch kunt onthouden? Praktische tips zonder ingewikkelde termen.",
  },
  {
    slug: "e-mail-openen",
    title: "E-mail openen",
    description: "Hoe opent u e-mail op uw telefoon of computer? Stap voor stap voor beginners.",
  },
  {
    slug: "bluetooth-verbinden",
    title: "Bluetooth verbinden",
    description: "Wat is Bluetooth en hoe verbindt u een hoofdtelefoon, speaker of ander apparaat met uw telefoon? Stap voor stap uitgelegd.",
  },
];

export function getArtikelBySlug(slug: string): Artikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
