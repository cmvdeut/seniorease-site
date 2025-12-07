# 🚀 YouTube Automatisering - Quick Start Guide

## Eerste Keer Gebruiken - Stap voor Stap

Deze guide helpt je om je eerste video automatisch te uploaden naar YouTube.

---

## ✅ Voorbereiding

### 1. Check of alles geïnstalleerd is

```bash
cd Agent/youtube-automation
npm install
```

### 2. Check of credentials.json bestaat

```bash
# In Agent/youtube-automation folder
ls credentials.json
```

**Als het bestand niet bestaat:**
- Volg de setup in `SETUP-GUIDE.md`
- Of zie: `YOUTUBE-SETUP-LIVE-CHECKLIST.md`

### 3. Test je connectie

```bash
npm run get-analytics
```

Als dit werkt, ben je klaar! ✅

---

## 🎬 Eerste Video Uploaden

### Optie A: Complete Workflow (Aanbevolen)

**Dit doet alles automatisch: upload + metadata + playlist**

```bash
npm run complete-workflow -- \
  --video="C:\pad\naar\je\video.mp4" \
  --title="Mijn Eerste Automatische Video" \
  --description="Dit is mijn eerste video via de automatische workflow!" \
  --tags="SeniorEase,Test,Automatisch" \
  --playlist="📚 Instructievideo's - SeniorEase" \
  --privacy=unlisted
```

**Wat gebeurt er:**
1. ✅ Video wordt geüpload
2. ✅ Titel, beschrijving en tags worden ingesteld
3. ✅ Video wordt toegevoegd aan playlist
4. ✅ Klaar!

---

### Optie B: Stap voor Stap (Meer Controle)

#### Stap 1: Video Uploaden

```bash
npm run upload-video -- \
  --video="C:\pad\naar\je\video.mp4" \
  --title="Mijn Video Titel" \
  --description="Video beschrijving hier" \
  --tags="Tag1,Tag2,Tag3" \
  --privacy=unlisted
```

**Output:** Je krijgt een Video ID (bijv. `dQw4w9WgXcQ`)

#### Stap 2: Toevoegen aan Playlist

```bash
npm run add-to-playlist -- \
  --video-id=JE_VIDEO_ID_HIER \
  --playlist-name="📚 Instructievideo's - SeniorEase"
```

**Klaar!** ✅

---

## 📝 Interactieve Modus

Als je geen command-line arguments gebruikt, vraagt het script alles interactief:

```bash
npm run complete-workflow
```

Het script vraagt dan:
- 📁 Video bestand pad
- 📝 Titel
- 📄 Beschrijving
- 🏷️  Tags
- 📚 Playlist naam

---

## 🎯 Praktische Voorbeelden

### Voorbeeld 1: Instructievideo

```bash
npm run complete-workflow -- \
  --video="bibliotheek-tutorial.mp4" \
  --title="Hoe gebruik ik de SeniorEase Bibliotheek App? - Stap voor stap uitleg" \
  --description="📚 In deze video laat ik u zien hoe u de SeniorEase Bibliotheek app gebruikt.

U leert:
✅ Boeken toevoegen
✅ Muziek toevoegen
✅ Barcodes scannen
✅ Collectie beheren

🔗 Links:
- Website: https://seniorease.nl
- Bibliotheek: https://seniorease.nl/bibliotheek

#SeniorEase #Bibliotheek #Boeken #Senioren" \
  --tags="SeniorEase,Bibliotheek,Boeken,Senioren,Instructie,Tutorial" \
  --playlist="📚 Instructievideo's - SeniorEase" \
  --privacy=unlisted
```

### Voorbeeld 2: Tips & Tricks Video

```bash
npm run complete-workflow -- \
  --video="tips-video.mp4" \
  --title="5 Handige Tips voor Senioren met Technologie" \
  --description="💡 In deze video deel ik 5 handige tips voor senioren met technologie.

#SeniorEase #Tips #Senioren #Technologie" \
  --tags="SeniorEase,Tips,Senioren,Technologie" \
  --playlist="💡 Tips & Tricks voor Senioren" \
  --privacy=unlisted
```

### Voorbeeld 3: FAQ Video

```bash
npm run complete-workflow -- \
  --video="faq-video.mp4" \
  --title="Veelgestelde Vragen over SeniorEase - Is het gratis?" \
  --description="❓ In deze video beantwoord ik veelgestelde vragen over SeniorEase.

#SeniorEase #FAQ #VeelgesteldeVragen" \
  --tags="SeniorEase,FAQ,VeelgesteldeVragen" \
  --playlist="❓ Veelgestelde Vragen (FAQ)" \
  --privacy=unlisted
```

---

## 🔒 Privacy Instellingen

**Start altijd met `--privacy=unlisted` of `--privacy=private`**

- `private` - Alleen jij kunt het zien
- `unlisted` - Iedereen met de link kan het zien (aanbevolen voor testen)
- `public` - Iedereen kan het zien (gebruik pas na controle!)

**Later publiceren:**

```bash
npm run update-video -- --video-id=JE_VIDEO_ID --privacy=public
```

---

## 📊 Na Uploaden

### Check je video

```bash
npm run get-analytics -- --video-id=JE_VIDEO_ID
```

Dit toont:
- 👀 Aantal views
- 👍 Likes
- 💬 Comments
- ⭐ Favorieten

### Check kanaal statistieken

```bash
npm run get-analytics
```

---

## ⚠️ Belangrijke Tips

### 1. Video Grootte

- **< 100MB:** Automatische upload werkt prima
- **> 100MB:** Overweeg handmatige upload via YouTube Studio

### 2. Test Eerst

- Start altijd met `--privacy=unlisted`
- Check de video op YouTube
- Maak dan pas publiek

### 3. Beschrijving Template

Gebruik deze template voor consistentie:

```
📚 [VIDEO TITEL]

[Korte beschrijving van wat je leert]

⏱️ Tijdlijn:
0:00 - Introductie
[X:XX] - [Onderwerp]

🔗 Links:
- Website: https://seniorease.nl
- Bibliotheek: https://seniorease.nl/bibliotheek
- Download: https://seniorease.nl/betalen
- Facebook: https://www.facebook.com/senioreasenl

💡 Abonneer je voor meer instructievideo's!

#SeniorEase #[RelevanteHashtags]
```

### 4. Tags

Gebruik altijd deze basis tags:
- `SeniorEase`
- `Senioren`
- `Nederland`

Voeg specifieke tags toe per video type:
- Instructievideo: `Instructie`, `Tutorial`, `Uitleg`
- Tips: `Tips`, `Tricks`, `Handig`
- FAQ: `FAQ`, `VeelgesteldeVragen`

---

## 🆘 Problemen Oplossen

### "credentials.json niet gevonden"

```bash
# Volg setup guide
cat SETUP-GUIDE.md
```

### "Token expired"

```bash
# Verwijder tokens.json en run opnieuw
rm tokens.json
npm run setup-playlists
```

### "Video upload faalt"

- Check video formaat (MP4, H.264)
- Check video grootte (< 100MB voor automatisch)
- Check internet verbinding
- Probeer handmatige upload via YouTube Studio

### "Playlist niet gevonden"

```bash
# Check beschikbare playlists
npm run setup-playlists
```

---

## 📚 Volgende Stappen

Na je eerste upload:

1. ✅ **Test de workflow** - Upload een test video
2. ✅ **Check resultaat** - Bekijk op YouTube
3. ✅ **Maak publiek** - Als alles goed is: `npm run update-video -- --video-id=ID --privacy=public`
4. ✅ **Deel op Facebook** - Gebruik `YOUTUBE-VIDEO-FACEBOOK-DELEN.md`

---

## 🎉 Klaar!

Je hebt nu een volledige automatische YouTube workflow! 

**Veel succes met je eerste upload!** 🚀

---

**Hulp nodig?** Check:
- `README.md` - Volledige documentatie
- `SETUP-GUIDE.md` - Setup instructies
- `YOUTUBE-AUTOMATISERING-OPLOSSING.md` - Troubleshooting

