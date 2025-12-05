# ✅ YouTube Setup - Live Checklist
## SeniorEaseNL - Volg deze stappen

---

## 🎯 DEEL 1: HANDMATIGE SETUP

### ✅ Stap 1: Kanaal Aanmaken ✅
- [x] Ga naar YouTube.com
- [x] Log in met je Google account
- [x] Klik rechtsboven op profielfoto → "YouTube Studio"
- [x] Kanaal aanmaken (als nog niet gedaan)
  - [x] Naam: **SeniorEaseNL**
  - [x] Bevestigd

**Status:** ✅ VOLTOOID

---

### ✅ Stap 2: Profielfoto Uploaden ✅
- [x] YouTube Studio → "Aanpassen" → "Branding"
- [x] Profielfoto uploaden
  - [x] Bestand: `public/heart-logo.png`
  - [x] 800x800 pixels (vierkant)
- [x] Geüpload en zichtbaar

**Status:** ✅ VOLTOOID

---

### ✅ Stap 3: Banner Uploaden ✅
- [x] YouTube Studio → "Aanpassen" → "Branding"
- [x] Banner uploaden
  - [x] 2048x1152 pixels
  - [x] Design met logo + tekst
- [x] Geüpload en zichtbaar

**Status:** ✅ VOLTOOID

**💡 Geen banner?** Zie `YOUTUBE-BANNER-CANVA-INSTRUCTIES.md` of maak er een in Canva.

---

### ✅ Stap 4: Watermark Uploaden ✅
- [x] YouTube Studio → "Aanpassen" → "Branding"
- [x] Watermark uploaden
  - [x] Bestand: `public/heart-logo.png` (transparant)
  - [x] 150x150 pixels
- [x] Geüpload

**Status:** ✅ VOLTOOID

---

### ✅ Stap 5: Kanaalbeschrijving ✅
- [x] YouTube Studio → "Aanpassen" → "Basisinfo"
- [x] Open: `YOUTUBE-KANAALBESCHRIJVING-KLAAR.txt`
- [x] Kopieer alle tekst
- [x] Plak in beschrijving veld
- [x] Pas aan:
  - [x] Email: `info@seniorease.nl` (of jouw email)
  - [x] Facebook: `https://www.facebook.com/senioreasenl`
- [x] Klik "Publiceren"

**Status:** ✅ VOLTOOID

---

### ✅ Stap 6: Links Toevoegen ✅
- [x] YouTube Studio → "Aanpassen" → "Links"
- [x] Link 1: Website
  - [x] Titel: `Bezoek onze website`
  - [x] URL: `https://seniorease.nl`
  - [x] Weergeven aan ✅
- [x] Link 2: Bibliotheek
  - [x] Titel: `Gratis op PC`
  - [x] URL: `https://seniorease.nl/bibliotheek`
  - [x] Weergeven aan ✅
- [x] Link 3: App
  - [x] Titel: `Download de app`
  - [x] URL: `https://seniorease.nl/betalen`
  - [x] Weergeven aan ✅
- [x] Link 4: Facebook
  - [x] Titel: `Volg ons op Facebook`
  - [x] URL: `https://www.facebook.com/senioreasenl`
  - [x] Weergeven aan ✅

**Status:** ✅ VOLTOOID

---

### ✅ Stap 7: Contact Email ✅
- [x] YouTube Studio → "Aanpassen" → "Basisinfo"
- [x] Contact email invullen: `info@seniorease.nl`
- [x] Klik "Publiceren"

**Status:** ✅ VOLTOOID

---

## 🎉 DEEL 1 KLAAR! ✅

**Checklist:**
- [x] Kanaal aangemaakt
- [x] Profielfoto geüpload
- [x] Banner geüpload
- [x] Watermark geüpload
- [x] Beschrijving ingevuld
- [x] Links toegevoegd
- [x] Contact email ingesteld

**Volgende:** Deel 2 - Automatisch playlists aanmaken!

---

## 🎯 DEEL 2: AUTOMATISCH - PLAYLISTS

### ✅ Stap 8: Google Cloud Project ✅
- [x] Ga naar [Google Cloud Console](https://console.cloud.google.com)
- [x] Nieuw project aanmaken: "SeniorEase YouTube"
- [x] Project geselecteerd

**Status:** ✅ VOLTOOID

---

### ✅ Stap 9: YouTube Data API Inschakelen ✅
- [x] Google Cloud → "APIs & Services" → "Library"
- [x] Zoek: "YouTube Data API v3"
- [x] Klik "Enable"
- [x] API is ingeschakeld

**Status:** ✅ VOLTOOID

---

### ✅ Stap 10: OAuth2 Credentials ✅
- [x] Google Cloud → "APIs & Services" → "Credentials"
- [x] OAuth consent screen configureren (eerste keer)
  - [x] User Type: External
  - [x] App name: SeniorEase YouTube
  - [x] Email ingevuld
- [x] OAuth2 Client ID aanmaken
  - [x] Application type: Desktop app
  - [x] Name: SeniorEase YouTube Client
- [x] Credentials downloaden
  - [x] Bestand: `credentials.json`
  - [x] Geplaatst in: `Agent/youtube-automation/`

**Status:** ✅ VOLTOOID

---

### ✅ Stap 11: Script Installeren ✅
- [x] Terminal openen
- [x] Navigeer naar: `Agent/youtube-automation`
- [x] Run: `npm install`
- [x] Dependencies geïnstalleerd

**Status:** ✅ VOLTOOID

---

### ✅ Stap 12: Playlists Aanmaken ✅
- [x] Handmatig aangemaakt in YouTube Studio
- [x] Playlists aangemaakt:
  - [x] 📚 Instructievideo's - SeniorEase
  - [x] 💡 Tips & Tricks voor Senioren
  - [x] ❓ Veelgestelde Vragen (FAQ)
  - [x] 🆕 Nieuwe Features & Updates

**Status:** ✅ VOLTOOID

---

## 🎉 ALLES KLAAR! ✅

**Complete checklist:**
- [x] Alle handmatige stappen voltooid
- [x] Google Cloud project aangemaakt
- [x] YouTube Data API ingeschakeld
- [x] OAuth2 credentials gedownload
- [x] Script geïnstalleerd
- [x] Playlists handmatig aangemaakt (4 stuks)

**Volgende:** Eerste video opnemen! 🎬

---

**Laatste update:** Live tijdens setup  
**Status:** In progress

