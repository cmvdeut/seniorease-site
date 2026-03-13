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
    slug: "whatsapp-videobellen-uitleg",
    title: "WhatsApp videobellen uitleg",
    description: "Hoe videobelt u via WhatsApp? Stap voor stap: gesprek openen, videoknop tikken, bellen. Eenvoudige uitleg voor senioren.",
  },
  {
    slug: "telefoon-sneller-maken",
    title: "Telefoon sneller maken",
    description: "Uw telefoon wordt traag? Eenvoudige tips om uw telefoon weer sneller te maken.",
  },
  {
    slug: "telefoon-langzaam-oplossen",
    title: "Telefoon langzaam oplossen",
    description: "Uw telefoon is traag of reageert niet goed? Opslag vol, apps sluiten en opnieuw starten – stap voor stap.",
  },
  {
    slug: "phishing-herkennen",
    title: "Phishing herkennen",
    description: "Wat is phishing en hoe herkent u valse e-mails en berichten? Bescherm uzelf tegen oplichting.",
  },
  {
    slug: "phishing-mail-herkennen",
    title: "Phishing mail herkennen",
    description: "Hoe herkent u een nep e-mail? Wat is phishing en wat moet u doen? Eenvoudige uitleg voor senioren.",
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
  {
    slug: "wat-is-de-cloud",
    title: "Wat is de cloud?",
    description: "Wat betekent 'in de cloud' en waarom hoor u het over foto's en bestanden? Eenvoudige uitleg voor senioren.",
  },
  {
    slug: "screenshot-en-schermopname-telefoon",
    title: "Screenshot en schermopname maken op telefoon",
    description: "Hoe maakt u een foto van uw scherm (screenshot) of een filmpje (schermopname)? Stap voor stap voor Android en iPhone.",
  },
];

export function getArtikelBySlug(slug: string): Artikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
