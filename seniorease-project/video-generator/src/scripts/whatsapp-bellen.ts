import { VideoScript } from "../types";

export const whatsappBellenScript: VideoScript = {
  videoTitle: "Bellen met WhatsApp",
  slides: [
    {
      title: "Wat gaan we leren?",
      points: [
        "Bellen via WhatsApp (gratis!)",
        "Spraakgesprek en videobellen",
        "In 3 eenvoudige stappen",
      ],
      durationInSeconds: 5,
    },
    {
      title: "Stap 1: Open het gesprek",
      points: [
        "Open WhatsApp op uw telefoon",
        "Tik op het gesprek van de persoon",
        "Die persoon moet ook WhatsApp hebben",
      ],
      durationInSeconds: 6,
      phoneScreen: { type: "chat-list", tapElement: "chat-item", tapDelay: 20 },
    },
    {
      title: "Stap 2: Kies hoe u belt",
      points: [
        "📞 Tik op het telefoon-icoontje voor een spraakgesprek",
        "📹 Tik op het camera-icoontje voor videobellen",
        "De icoontjes staan rechtsboven in het gesprek",
      ],
      durationInSeconds: 7,
      phoneScreen: { type: "chat", tapElement: "phone-icon", tapDelay: 25 },
    },
    {
      title: "Stap 3: Tijdens het gesprek",
      points: [
        "U ziet dit scherm terwijl het overgaat",
        "Spreek gewoon — net als een gewoon telefoontje",
        "Tik op de rode knop (📵) om op te hangen",
      ],
      durationInSeconds: 6,
      phoneScreen: { type: "calling", tapElement: "call-button", tapDelay: 80 },
    },
    {
      title: "Belangrijk om te weten",
      points: [
        "Bellen via WhatsApp is altijd gratis",
        "Beiden hebben internet nodig (WiFi of data)",
        "De geluidskwaliteit is vaak beter dan gewoon bellen",
      ],
      durationInSeconds: 7,
    },
  ],
};
