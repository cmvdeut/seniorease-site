import { VideoScript } from "../types";

export const whatsappFotoScript: VideoScript = {
  videoTitle: "WhatsApp foto's versturen",
  slides: [
    {
      title: "Wat gaan we leren?",
      points: [
        "Een foto versturen via WhatsApp",
        "Stap voor stap uitgelegd",
        "In 5 eenvoudige stappen",
      ],
      durationInSeconds: 5,
      // geen screenshot nodig voor intro slide
    },
    {
      title: "Stap 1 & 2",
      points: [
        "Open WhatsApp op uw telefoon",
        "Open het gesprek met de ontvanger",
      ],
      durationInSeconds: 6,
      phoneScreen: { type: "chat-list", tapElement: "chat-item", tapDelay: 20 },
    },
    {
      title: "Stap 3 & 4",
      points: [
        "Tik op het paperclip-icoontje (📎)",
        "Kies 'Galerij' of 'Foto & video'",
      ],
      durationInSeconds: 6,
      phoneScreen: { type: "attachment-menu", tapElement: "attachment", tapDelay: 15 },
    },
    {
      title: "Stap 5",
      points: [
        "De foto staat klaar in uw bericht",
        "Tik op de groene verzend-knop (➤)",
        "De foto is verstuurd! ✓",
      ],
      durationInSeconds: 7,
      phoneScreen: { type: "chat", tapElement: "send-button", tapDelay: 20 },
    },
    {
      title: "Meer hulp nodig?",
      points: [
        "Bezoek seniorease.nl voor meer uitleg",
        "Alles in begrijpelijke taal",
        "Gratis te gebruiken",
      ],
      durationInSeconds: 5,
    },
  ],
};
