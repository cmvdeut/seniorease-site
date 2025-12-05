# 🎬 YouTube Kanaal Setup - Complete Stap-voor-Stap
## SeniorEaseNL - Handmatig + Automatisch

---

## 📋 Overzicht

**Deel 1: Handmatig (15 min)** - Basis kanaal setup  
**Deel 2: Automatisch (10 min)** - Playlists via script

**Totaal: ~25 minuten**

---

# DEEL 1: HANDMATIGE SETUP (15 minuten)

## ✅ Stap 1: Kanaal Aanmaken (2 min)

1. Ga naar [YouTube.com](https://www.youtube.com)
2. Klik rechtsboven op je **profielfoto**
3. Kies **"YouTube Studio"**
4. Als je nog geen kanaal hebt:
   - Klik **"Kanaal maken"**
   - Kies **"Gebruik een bedrijfsnaam of andere naam"**
   - Voer in: **SeniorEaseNL**
   - Bevestig

**✅ Check:** Je hebt nu een YouTube kanaal!

---

## ✅ Stap 2: Profielfoto Uploaden (2 min)

1. In YouTube Studio, klik **"Aanpassen"** (links menu)
2. Klik **"Branding"** tab
3. Bij **"Profielfoto"**, klik **"Uploaden"**
4. Upload: `public/heart-logo.png`
   - **Afmeting:** 800x800 pixels (vierkant)
   - **Tip:** Als je logo niet vierkant is, maak een versie met witte achtergrond

**✅ Check:** Profielfoto is zichtbaar op je kanaal!

---

## ✅ Stap 3: Banner Uploaden (3 min)

1. In YouTube Studio → **"Aanpassen"** → **"Branding"**
2. Bij **"Banner"**, klik **"Uploaden"**
3. Upload je banner (2048x1152px)

**💡 Geen banner?** Maak er een:
- Gebruik Canva (zie `YOUTUBE-BANNER-CANVA-INSTRUCTIES.md`)
- Of gebruik template uit `YOUTUBE-SETUP-QUICK-START.md`

**Banner design:**
```
┌─────────────────────────────────────────┐
│ [Logo]  SeniorEaseNL                    │
│                                         │
│    Handige technologie zonder gedoe     │
│                                         │
│    seniorease.nl                        │
│                                         │
│    [Cream achtergrond #F5EEE6]          │
└─────────────────────────────────────────┘
```

**✅ Check:** Banner is zichtbaar op je kanaal!

---

## ✅ Stap 4: Watermark Uploaden (1 min)

1. In YouTube Studio → **"Aanpassen"** → **"Branding"**
2. Bij **"Watermark"**, klik **"Uploaden"**
3. Upload: `public/heart-logo.png` (transparant PNG, 150x150px)

**✅ Check:** Watermark wordt getoond in video's!

---

## ✅ Stap 5: Kanaalbeschrijving Invullen (3 min)

1. In YouTube Studio → **"Aanpassen"** → **"Basisinfo"**
2. Bij **"Beschrijving"**, open: `YOUTUBE-KANAALBESCHRIJVING-KLAAR.txt`
3. **Kopieer alle tekst**
4. **Plak in het beschrijving veld**
5. **⚠️ BELANGRIJK:** Pas aan:
   - Email: `info@seniorease.nl` (of jouw email)
   - Facebook: `https://www.facebook.com/senioreasenl` (of jouw pagina)
6. Klik **"Publiceren"**

**✅ Check:** Beschrijving is zichtbaar op je kanaal!

---

## ✅ Stap 6: Links Toevoegen (4 min)

1. In YouTube Studio → **"Aanpassen"** → **"Links"**
2. Klik **"Links toevoegen"**

**Voeg deze links toe (in deze volgorde!):**

| # | Titel | URL |
|---|-------|-----|
| 1 | Bezoek onze website | `https://seniorease.nl` |
| 2 | Gratis op PC | `https://seniorease.nl/bibliotheek` |
| 3 | Download de app | `https://seniorease.nl/betalen` |
| 4 | Volg ons op Facebook | `https://www.facebook.com/senioreasenl` |

**Voor elke link:**
- Klik **"Links toevoegen"**
- Vul **Titel** in
- Vul **URL** in
- Zet **"Weergeven op kanaal"** aan ✅
- Klik **"Opslaan"**

**💡 Tip:** Link 1 wordt het grootst getoond!

**✅ Check:** Links zijn zichtbaar op je kanaal!

---

## ✅ Stap 7: Contact Email (1 min)

1. In YouTube Studio → **"Aanpassen"** → **"Basisinfo"**
2. Bij **"Contact"**, voer in: `info@seniorease.nl` (of jouw email)
3. Klik **"Publiceren"**

**✅ Check:** Email is ingesteld!

---

## 🎉 DEEL 1 KLAAR!

**Checklist:**
- [ ] Kanaal aangemaakt
- [ ] Profielfoto geüpload
- [ ] Banner geüpload
- [ ] Watermark geüpload
- [ ] Beschrijving ingevuld
- [ ] Links toegevoegd
- [ ] Contact email ingesteld

**Volgende:** Deel 2 - Automatisch playlists aanmaken!

---

# DEEL 2: AUTOMATISCH - PLAYLISTS (10 minuten)

## ✅ Stap 8: Google Cloud Setup (5 min)

### 8.1 Project Aanmaken

1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. Klik op **project dropdown** (bovenaan) → **"Nieuw project"**
3. **Naam:** `SeniorEase YouTube`
4. Klik **"Maken"**
5. Wacht tot project klaar is (10-30 seconden)

### 8.2 YouTube Data API Inschakelen

1. In Google Cloud Console, ga naar **"APIs & Services"** → **"Library"**
2. Zoek naar: **"YouTube Data API v3"**
3. Klik erop
4. Klik **"Enable"** (of "Inschakelen")
5. Wacht tot API ingeschakeld is

### 8.3 OAuth2 Credentials Aanmaken

1. Ga naar **"APIs & Services"** → **"Credentials"**
2. Klik **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**

**Als eerste keer (OAuth consent screen):**
- **User Type:** External
- **App name:** `SeniorEase YouTube`
- **User support email:** Jouw email
- **Developer contact:** Jouw email
- Klik **"Save and Continue"**
- Klik **"Save and Continue"** (skip scopes)
- Klik **"Save and Continue"** (skip test users)
- Klik **"Back to Dashboard"**

**Nu credentials:**
- **Application type:** Desktop app
- **Name:** `SeniorEase YouTube Client`
- Klik **"Create"**

**Download:**
- Klik op de credentials die je net maakte
- Klik **"Download JSON"**
- Hernoem bestand naar: `credentials.json`
- **Plaats in:** `Agent/youtube-automation/`

**✅ Check:** `Agent/youtube-automation/credentials.json` bestaat!

---

## ✅ Stap 9: Script Installeren (2 min)

1. Open terminal/PowerShell
2. Navigeer naar project:

```bash
cd Agent/youtube-automation
```

3. Installeer dependencies:

```bash
npm install
```

**✅ Check:** `node_modules/` folder is aangemaakt!

---

## ✅ Stap 10: Playlists Aanmaken (3 min)

1. Run het script:

```bash
npm run setup-playlists
```

**Eerste keer (OAuth authenticatie):**
1. Script toont een URL
2. **Kopieer de URL** en open in browser
3. **Log in** met je Google account (die bij YouTube hoort!)
4. **Geef toestemming** aan de app
5. Je krijgt een **code** (bijvoorbeeld: `4/0Aean...`)
6. **Kopieer de code**
7. **Plak in terminal** waar het script wacht
8. Druk Enter

**✅ Script maakt automatisch aan:**
- 📚 Instructievideo's - SeniorEase
- 💡 Tips & Tricks voor Senioren
- ❓ Veelgestelde Vragen (FAQ)
- 🆕 Nieuwe Features & Updates

**✅ Check:** Playlists zijn zichtbaar in YouTube Studio!

---

## 🎉 ALLES KLAAR!

**Complete checklist:**
- [ ] Kanaal aangemaakt
- [ ] Profielfoto geüpload
- [ ] Banner geüpload
- [ ] Watermark geüpload
- [ ] Beschrijving ingevuld
- [ ] Links toegevoegd
- [ ] Contact email ingesteld
- [ ] Google Cloud project aangemaakt
- [ ] YouTube Data API ingeschakeld
- [ ] OAuth2 credentials gedownload
- [ ] Script geïnstalleerd
- [ ] Playlists automatisch aangemaakt

---

## 🚀 Volgende Stappen

**Nu je kanaal klaar is:**

1. ✅ **Eerste video opnemen**
   - Script: `YOUTUBE-EERSTE-VIDEO-SCRIPT.md`

2. ✅ **Thumbnail maken**
   - Gebruik Canva of template

3. ✅ **Video uploaden**
   - YouTube Studio → Content → Upload

4. ✅ **Video toevoegen aan playlist**
   - Bij upload: kies juiste playlist
   - Of later: video → Details → Playlists

5. ✅ **Delen op Facebook**
   - Link naar video delen

---

## 🆘 Problemen?

### "credentials.json niet gevonden"
→ Zorg dat je het bestand in `Agent/youtube-automation/` hebt geplaatst

### "OAuth2 error"
→ Check of je de juiste Google account gebruikt (die bij YouTube hoort)

### "API not enabled"
→ Zorg dat YouTube Data API v3 is ingeschakeld in Google Cloud

### "Playlist bestaat al"
→ Geen probleem! Script slaat bestaande playlists over

---

## 📚 Gerelateerde Documenten

- `YOUTUBE-KANAAL-SETUP-COMPLEET.md` - Uitgebreide handmatige guide
- `YOUTUBE-SETUP-QUICK-START.md` - Snelle handmatige start
- `Agent/youtube-automation/SETUP-GUIDE.md` - Script setup details
- `YOUTUBE-KANAALBESCHRIJVING-KLAAR.txt` - Beschrijving template

---

**Succes met je YouTube kanaal! 🎬**

---

**Laatste update:** 23 november 2025  
**Status:** Complete Setup Guide - Klaar voor gebruik


