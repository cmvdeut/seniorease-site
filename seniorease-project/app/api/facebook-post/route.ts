import { NextResponse } from "next/server";

const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK_URL ?? "";

const posts: Record<string, string> = {
  "2026-03-26":
    "Wist u dat u op uw telefoon ook kunt inspreken in plaats van typen? 🎤 Bij WhatsApp, e-mail, Google — gewoon zeggen wat u wilt. Geen gedoe met kleine letters meer. Gratis uitleg: seniorease.nl/uitleg/inspreken",
  "2026-03-27":
    "Vroeger stuurden we brieven. Soms wachtte je twee weken op antwoord... 📮 Nu sturen we een appje en verwachten we binnen twee minuten reactie. 😄 Wat vond u fijner — de brief of de app?",
  "2026-03-28":
    "🧩 Zin in een lekker puzzelmoment? Onze gratis online puzzels zijn perfect voor een rustige zaterdagmiddag. Gewoon spelen, geen gedoe! seniorease.nl/puzzels",
  "2026-03-29":
    "Fijne zondagmiddag! ☀️ Hopelijk omringd door mensen die u dierbaar zijn — of met een lekke kop koffie en een goed boek. Geniet ervan! 💛",
  "2026-03-30":
    "Welke app gebruikt u het meest op uw telefoon? 📱\nA) WhatsApp\nB) Facebook\nC) Nieuws lezen\nD) Foto's bekijken\n\nLaat het weten in de reacties! 👇",
  "2026-03-31":
    "Boodschappen doen zonder de deur uit? 🛒 Dat kan gewoon! Picnic bezorgt zelfs gratis aan huis. Wij leggen stap voor stap uit hoe het werkt: seniorease.nl/uitleg/boodschappen-bestellen",
};

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const message = posts[today];

  if (!message) {
    return NextResponse.json({ status: "geen post vandaag", date: today });
  }

  const res = await fetch(ZAPIER_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return NextResponse.json({ status: "verstuurd", date: today, zapier: data });
}
