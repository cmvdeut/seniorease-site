# YouTube groei — Studio checklist + Facebook/Shorts-plan

**Datum:** 2026-08-21  
**Kanaal:** https://www.youtube.com/@SeniorEaseNL  
**Doel:** views/abonnees + brug naar seniorease.nl

---

## Deel A — YouTube Studio (handmatig, vandaag/morgen)

Pas **titel + beschrijving** aan (eerste 100 tekens van de beschrijving = belangrijk). Zet in elke beschrijving:

1. Eén zin wat de kijker leert  
2. Link naar de bijpassende pagina op seniorease.nl  
3. Link naar het kanaal / playlist  

| Video | Voorgestelde titel | Site-link in beschrijving |
|-------|--------------------|---------------------------|
| Google Maps | Waar ben ik nu? Google Maps locatie en route — senioren | https://www.seniorease.nl/uitleg/google-maps |
| Oplichting | Oplichting herkennen: 5 waarschuwingstekens | https://www.seniorease.nl/uitleg/veiligheid |
| Foto's maken | Betere foto's maken met uw smartphone — 5 tips | https://www.seniorease.nl/uitleg/fotos-maken |
| Videobellen | Videobellen via WhatsApp — stap voor stap | https://www.seniorease.nl/uitleg/videobellen |
| ChatGPT | ChatGPT voor senioren — stap voor stap | https://www.seniorease.nl/wat-is-ai/chatgpt |

**Ook in Studio per video:**  
- Eindscherm: 1 gerelateerde video + “abonneren”  
- Kaarten (cards): link naar site-pagina op ±20s  
- Playlist: juiste playlist (WhatsApp / Tips / AI)

---

## Deel B — Site (code, deze week gedaan)

- **VideoObject** JSON-LD op pagina’s met embed (Maps, veiligheid, foto’s, videobellen, ChatGPT)  
- **YouTube-CTA’s** op wifi, QR, DigiD, WhatsApp-foto’s, youtube-tv-pagina  
- Pad → YouTube mapping uitgebreid in `lib/youtube-videos.ts`

---

## Deel C — Facebook + Shorts (content, volgende stap)

### Ritme (2 weken)

| Dag | Facebook (SeniorEase-pagina) | YouTube Short |
|-----|------------------------------|---------------|
| Di | Post + link naar **bestaande** lange YT-video | — |
| Do | Reel/clip (of herhaal Short) + link YT | Short 30–45s |
| Za | Optioneel: “bekijk de playlist” | Short of skip |

### Shorts-ideeën (knip uit bestaande of HyperFrames)

1. **Maps:** “Tik op het blauwe rondje = u bent hier” (15–30s) → link lange Maps-video  
2. **Oplichting:** “Druk = gevaar” (1 tip) → lange veiligheid-video  
3. **WhatsApp foto:** “Pijl omlaag = opslaan in galerij” → playlist WhatsApp  
4. **Wifi:** “Wachtwoord staat op de sticker van de router” → site / Tips-playlist  
5. **QR:** “Camera openen, richten, tikken — geen aparte app” → site

### Short-regels

- Eerste 3 seconden: probleem of resultaat op het scherm  
- Geen TikTok-watermerk (native upload of her-export)  
- Beschrijving: keyword + link naar lange video + site  
- Related video: altijd de bijpassende lange uitleg koppelen  

### Facebook-copy (voorbeeld)

```
Nieuw of bekend: Google Maps op de telefoon.

In deze rustige video ziet u hoe u “waar ben ik?” gebruikt.

🎥 YouTube: [link]
📄 Meelezen: seniorease.nl/uitleg/google-maps
```

---

## Volgorde

1. ✅ Site embeds + VideoObject (code)  
2. ⬜ Studio-titels/beschrijvingen (jij in YouTube Studio)  
3. ⬜ Eerste 2 Shorts + 2 Facebook-posts plannen in Blotato  
