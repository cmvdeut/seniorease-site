# 🎬 Audio Toevoegen aan Bibliotheek Animatie
## SeniorEase - ElevenLabs Audio

---

## 📋 Wat Je Hebt

- ✅ **Animatie video:** Bibliotheek animatie (opgenomen of HTML)
- ✅ **Audio:** ElevenLabs audio (MP3)

**Doel:** Audio toevoegen aan video

---

## 🎯 Optie 1: Windows Video Editor (AANBEVOLEN - MAKKELIJKST)

### **Stap 1: Video Opnemen (als nog niet gedaan)**

1. **Open animatie:**
   - Ga naar: `public/youtube-animaties/bibliotheek-animatie.html`
   - Of open in browser: `http://localhost:3001/animaties/bibliotheek`
   - Druk F11 voor volledig scherm

2. **Start screen recording:**
   - Druk `Windows + G`
   - **BELANGRIJK:** Zet microfoon UIT (geen audio opnemen)
   - Klik record knop
   - Klik "Start" in de animatie
   - Wacht tot animatie klaar is
   - Stop opname

3. **Video staat in:** `Videos/Captures/`

---

### **Stap 2: Audio en Video Combineren**

1. **Open Windows Video Editor:**
   - Zoek "Video Editor" in Windows
   - Of: Start menu → "Video Editor"

2. **Nieuw project:**
   - Klik "New video project"
   - Naam: "Bibliotheek Animatie"

3. **Import bestanden:**
   - Klik "Add" → "From this PC"
   - Selecteer je video (screen recording)
   - Klik "Add" → "From this PC"
   - Selecteer je ElevenLabs audio (MP3)

4. **Sleep naar timeline:**
   - Sleep video naar onderste balk
   - Sleep audio naar onderste balk (onder video)
   - **BELANGRIJK:** Zorg dat audio en video tegelijk starten

5. **Sync audio:**
   - Luister naar audio
   - Check of video timing klopt met wat er gezegd wordt
   - Verschuif video indien nodig (sleep)

6. **Knippen (optioneel):**
   - Als video te lang is: Klik op video → "Split" → Knip einde af
   - Als audio te lang is: Klik op audio → "Split" → Knip einde af
   - Als video te kort is: Voeg zwart scherm toe aan einde

7. **Export video:**
   - Klik "Finish video" (rechtsboven)
   - Kies kwaliteit: "1080p" (aanbevolen)
   - Klik "Export"
   - Wacht tot video klaar is
   - Video staat in: `Videos/`

**✅ Check:** Je hebt nu een complete video met ElevenLabs audio!

---

## 🎯 Optie 2: FFmpeg Script (AUTOMATISCH)

### **Stap 1: FFmpeg Installeren**

**Via Winget (Windows):**
```bash
winget install ffmpeg
```

**Of download:**
- Ga naar: https://ffmpeg.org/download.html
- Download Windows versie
- Installeer
- Voeg toe aan PATH

### **Stap 2: Script Gebruiken**

1. **Ga naar folder:**
   ```bash
   cd Agent/youtube-automation
   ```

2. **Run script:**
   ```bash
   node scripts/add-audio-to-video.js
   ```

3. **Volg instructies:**
   - Geef video pad op (bijv. `C:\Users\...\video.mp4`)
   - Geef audio pad op (bijv. `C:\Users\...\audio.mp3`)
   - Script combineert automatisch

4. **Output:**
   - Video met audio: `video-met-audio.mp4`

---

## 🎯 Optie 3: Online Tool (GEEN INSTALLATIE)

### **Clideo (GRATIS):**

1. **Ga naar:** https://clideo.com/merge-video-and-audio

2. **Upload bestanden:**
   - Upload video
   - Upload audio (MP3)

3. **Combine:**
   - Klik "Merge"
   - Wacht tot klaar is
   - Download video

**Voordelen:**
- ✅ Geen installatie
- ✅ Werkt in browser
- ✅ Gratis

**Nadelen:**
- ⚠️ Video wordt geüpload naar cloud
- ⚠️ Beperkte video lengte in gratis versie

---

## 🎯 Optie 4: Canva (ONLINE)

1. **Ga naar:** https://canva.com

2. **Nieuw video project:**
   - Kies "Video" → "YouTube Video"

3. **Upload bestanden:**
   - Upload video
   - Upload audio

4. **Combine:**
   - Sleep video naar timeline
   - Sleep audio naar timeline
   - Sync indien nodig

5. **Export:**
   - Klik "Download"
   - Kies MP4 formaat

---

## 📋 Stap-voor-Stap: Complete Workflow

### **1. Animatie Opnemen**
- Open `bibliotheek-animatie.html` in browser
- Windows + G → Record (microfoon UIT)
- Klik "Start" in animatie
- Stop opname

### **2. Audio Voorbereiden**
- Zorg dat ElevenLabs audio klaar is (MP3)
- Check lengte (moet ongeveer overeenkomen met video)

### **3. Combineren**
- Windows Video Editor
- Import video + audio
- Sync
- Export

### **4. Uploaden**
- YouTube Studio → Upload
- Titel: "Hoe gebruik ik de SeniorEase Bibliotheek App?"
- Beschrijving: Zie `YOUTUBE-VIDEO-2-BIBLIOTHEEK.md`
- Playlist: "📚 Instructievideo's - SeniorEase"

---

## 🆘 Problemen?

### **Audio te lang/kort:**
- **Te lang:** Knip einde af in editor
- **Te kort:** Voeg stilte toe aan einde, of herhaal laatste zin

### **Audio en video niet synchroon:**
- Verschuif audio in editor
- Of knip video bij

### **Video kwaliteit laag:**
- Check opname instellingen (1080p)
- Export in hogere kwaliteit

---

## 💡 Tips

1. **Test eerst** - Maak korte test video
2. **Timing** - Neem video iets langer op dan audio
3. **Kwaliteit** - Gebruik beste kwaliteit (1080p)
4. **Sync** - Check sync meerdere keren
5. **Export** - Export in MP4 (H.264 codec)

---

## 🚀 Snel Starten

**Windows Video Editor (5 minuten):**
1. Open Video Editor
2. Import video + audio
3. Sleep naar timeline
4. Sync
5. Export

**Klaar!** 🎬

---

**Welke optie wil je gebruiken? Ik help je stap-voor-stap!** 🎤

---

**Laatste update:** 23 november 2025  
**Status:** Audio Toevoegen Guide


