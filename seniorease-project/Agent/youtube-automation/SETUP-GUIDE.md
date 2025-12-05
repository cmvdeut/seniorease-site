# 🚀 YouTube Automatisering Setup Guide

## ⚡ Snelle Start (5 minuten)

### Stap 1: Google Cloud Project

1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. Klik op project dropdown → "Nieuw project"
3. Naam: **SeniorEase YouTube**
4. Klik "Maken"

### Stap 2: YouTube Data API Inschakelen

1. In Google Cloud Console, ga naar **"APIs & Services" → "Library"**
2. Zoek naar **"YouTube Data API v3"**
3. Klik erop en klik **"Enable"**

### Stap 3: OAuth2 Credentials Aanmaken

1. Ga naar **"APIs & Services" → "Credentials"**
2. Klik **"+ CREATE CREDENTIALS" → "OAuth client ID"**
3. Als eerste keer: Configureer OAuth consent screen:
   - User Type: **External**
   - App name: **SeniorEase YouTube**
   - User support email: **jouw email**
   - Developer contact: **jouw email**
   - Klik **"Save and Continue"** (skip scopes voor nu)
   - Klik **"Save and Continue"** (skip test users)
   - Klik **"Back to Dashboard"**

4. Nu credentials aanmaken:
   - Application type: **Desktop app**
   - Name: **SeniorEase YouTube Client**
   - Klik **"Create"**

5. Download credentials:
   - Klik op de credentials die je net maakte
   - Klik **"Download JSON"**
   - Hernoem naar `credentials.json`
   - Plaats in: `Agent/youtube-automation/`

### Stap 4: Script Installeren

```bash
cd Agent/youtube-automation
npm install
```

### Stap 5: Playlists Aanmaken

```bash
npm run setup-playlists
```

**Eerste keer:**
1. Script opent browser URL
2. Log in met je Google account (die bij YouTube hoort)
3. Geef toestemming
4. Kopieer de code uit de browser
5. Plak in terminal
6. ✅ Klaar!

---

## 📋 Wat het Script Doet

Het script maakt automatisch deze playlists aan:

1. **📚 Instructievideo's - SeniorEase**
2. **💡 Tips & Tricks voor Senioren**
3. **❓ Veelgestelde Vragen (FAQ)**
4. **🆕 Nieuwe Features & Updates**

---

## ⚠️ Belangrijk

- **credentials.json** bevat gevoelige informatie → NOOIT committen naar Git!
- **tokens.json** wordt automatisch aangemaakt (bevat toegangstoken)
- Beide staan in `.gitignore`

---

## 🆘 Problemen?

### "credentials.json niet gevonden"
→ Zorg dat je het bestand in `Agent/youtube-automation/` hebt geplaatst

### "OAuth2 error"
→ Check of je de juiste Google account gebruikt (die bij YouTube hoort)

### "API not enabled"
→ Zorg dat YouTube Data API v3 is ingeschakeld in Google Cloud

---

## 📚 Volgende Stappen

Na playlists aanmaken:
1. ✅ Handmatig: Kanaalbeschrijving invullen (templates klaar!)
2. ✅ Handmatig: Links toevoegen (templates klaar!)
3. ✅ Handmatig: Banner/profielfoto uploaden
4. ✅ Script: Video's toevoegen aan playlists (toekomstig)

---

**Klaar! 🎬**


