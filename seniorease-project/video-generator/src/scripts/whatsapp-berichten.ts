import { VideoScript } from "../types";

export const whatsappBerichtenScript: VideoScript = {
  videoTitle: "WhatsApp berichten versturen",
  slides: [
    {
      title: "Wat gaan we leren?",
      points: [
        "Hoe u een tekstbericht naar iemand stuurt",
        "Welk scherm u waar ziet op uw telefoon",
        "Stap voor stap — in rustig tempo",
      ],
      durationInSeconds: 6,
    },
    {
      title: "Stap 1 — WhatsApp openen",
      points: [
        "Op uw beginscherm zoekt u het groene icoon met het telefoontje",
        "Tik erop: de app opent",
        "U ziet nu dit scherm: uw lijst met gesprekken (Chats)",
      ],
      durationInSeconds: 9,
      phoneScreen: { type: "chat-list" },
    },
    {
      title: "Stap 2 — Een gesprek kiezen",
      points: [
        "Scroll zo nodig door de lijst",
        "Zoek de naam van de persoon die u een bericht wilt sturen",
        "Tik op die regel — het gesprek opent",
      ],
      durationInSeconds: 9,
      phoneScreen: { type: "chat-list", tapElement: "chat-item", tapDelay: 42 },
    },
    {
      title: "Of: een nieuw gesprek",
      points: [
        "Wilt u iemand een eerste bericht sturen die nog niet in de lijst staat?",
        "Tik op het groene ronde knopje rechtsonder met het potlood (✏️)",
        "Kies daarna een contact uit uw adresboek",
      ],
      durationInSeconds: 9,
      phoneScreen: { type: "chat-list", tapElement: "new-chat-fab", tapDelay: 38 },
    },
    {
      title: "Stap 3 — Typen",
      points: [
        "Onderaan het scherm zit het witte veld met het woord 'Bericht'",
        "Tik in dat veld: uw toetsenbord komt tevoorschijn",
        "Typ uw zin; de letters verschijnen in het vak (zoals in de animatie)",
      ],
      durationInSeconds: 10,
      phoneScreen: { type: "chat", tapElement: "type-field", tapDelay: 44 },
    },
    {
      title: "Stap 4 — Versturen en vinkjes",
      points: [
        "Is uw bericht klaar? Tik op de groene ronde knop met het pijltje (➤)",
        "Uw bericht gaat naar de ander — in het gesprek verschijnt het in het groen",
        "Twee grijze vinkjes = bij de ander afgeleverd · Twee blauwe vinkjes = gelezen",
      ],
      durationInSeconds: 10,
      phoneScreen: { type: "chat", tapElement: "send-button", tapDelay: 32 },
    },
    {
      title: "Meer hulp nodig?",
      points: [
        "Op seniorease.nl staat nog meer uitleg over WhatsApp",
        "Alles in begrijpelijke taal, gratis te gebruiken",
      ],
      durationInSeconds: 6,
    },
  ],
};
