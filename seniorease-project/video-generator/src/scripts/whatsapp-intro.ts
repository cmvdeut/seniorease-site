import { VideoScript } from "../types";

export const whatsappIntroScript: VideoScript = {
  videoTitle: "Wat is WhatsApp?",
  slides: [
    {
      title: "Wat is WhatsApp?",
      points: [
        "Een gratis app om berichten te sturen",
        "Bellen en videobellen is ook gratis",
        "Populair bij familie en vrienden",
      ],
      durationInSeconds: 6,
      phoneScreen: { type: "chat-list" },
    },
    {
      title: "Wat heb u nodig?",
      points: [
        "Een smartphone (iPhone of Android)",
        "Een internetverbinding (WiFi of mobiele data)",
        "WhatsApp is gratis te downloaden",
      ],
      durationInSeconds: 7,
    },
    {
      title: "WhatsApp downloaden",
      points: [
        "iPhone: ga naar de App Store",
        "Android: ga naar de Play Store",
        "Zoek op 'WhatsApp' en tik op 'Installeren'",
      ],
      durationInSeconds: 7,
    },
    {
      title: "Wat kunt u doen met WhatsApp?",
      points: [
        "✉️ Berichten versturen",
        "📷 Foto's delen",
        "📞 Bellen en videobellen",
        "Alles gratis via internet",
      ],
      durationInSeconds: 7,
      phoneScreen: { type: "chat" },
    },
  ],
};
