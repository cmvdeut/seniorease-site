# 📺 YouTube Automatische Posting Setup

## ✅ Wat is er gemaakt?

Er is een nieuwe endpoint gemaakt: `/api/post-all-platforms` die automatisch:
1. ✅ **Facebook** post (screenshot met tekst)
2. ✅ **YouTube** video upload (als ingeschakeld)

Deze wordt automatisch aangeroepen op **Ma/Wo/Vr om 10:00** via Vercel cron job.

---

## 🚀 Setup voor YouTube Automatische Posting

### STAP 1: YouTube Credentials Toevoegen aan Vercel

1. **Ga naar Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Selecteer je project: `seniorease-content-agent`

2. **Ga naar Settings → Environment Variables**

3. **Voeg deze variabelen toe:**

#### A. YouTube Inschakelen
```
YOUTUBE_ENABLED = true
```

#### B. YouTube Credentials (vanuit credentials.json)
```
YOUTUBE_CREDENTIALS = {"installed":{"client_id":"...","client_secret":"...","redirect_uris":["..."]}}
```
**Let op:** Dit moet een JSON string zijn! Kopieer de volledige inhoud van `credentials.json` en zet het tussen quotes.

#### C. YouTube Token (vanuit tokens.json)
```
YOUTUBE_TOKEN = {"access_token":"...","refresh_token":"...","scope":"...","token_type":"...","expiry_date":...}
```
**Let op:** Dit moet een JSON string zijn! Kopieer de volledige inhoud van `tokens.json` en zet het tussen quotes.

#### D. Video Pad (optioneel - alleen als je automatisch wilt uploaden)
```
YOUTUBE_VIDEO_PATH = /path/to/video.mp4
```
**Let op:** Voor Vercel moet dit een publiek toegankelijk pad zijn, of je moet video's uploaden naar een cloud storage (S3, Cloudinary, etc.)

#### E. Video Metadata (optioneel)
```
YOUTUBE_TITLE = Mijn Video Titel
YOUTUBE_DESCRIPTION = Video beschrijving hier
YOUTUBE_TAGS = SeniorEase,Boeken,Bibliotheek
YOUTUBE_PRIVACY = unlisted
YOUTUBE_CATEGORY = 27
YOUTUBE_PLAYLIST_ID = PLAYLIST_ID_HIER
```

---

## 📋 Hoe krijg je de credentials?

### 1. YouTube Credentials (credentials.json)

```bash
cd Agent/youtube-automation
cat credentials.json
```

Kopieer de volledige JSON en plak in Vercel als `YOUTUBE_CREDENTIALS`.

### 2. YouTube Token (tokens.json)

```bash
cd Agent/youtube-automation
cat tokens.json
```

Kopieer de volledige JSON en plak in Vercel als `YOUTUBE_TOKEN`.

**Let op:** Tokens verlopen na verloop van tijd. Je moet ze periodiek vernieuwen.

---

## ⚠️ Belangrijke Opmerkingen

### Video Upload Probleem

**YouTube video upload vereist een video bestand.** Dit is lastig in een serverless omgeving zoals Vercel:

1. **Vercel heeft geen permanente file storage**
2. **Video bestanden zijn groot** (>100MB)
3. **Upload duurt lang** (kan timeout geven)

### Oplossingen:

#### Optie A: YouTube Metadata Only (Aanbevolen voor nu)
- Upload video's handmatig via YouTube Studio
- Gebruik de automatische workflow alleen voor metadata updates
- Of: gebruik alleen Facebook automatisch, YouTube handmatig

#### Optie B: Cloud Storage
- Upload video's naar S3, Cloudinary, of Google Cloud Storage
- Zet `YOUTUBE_VIDEO_PATH` naar de cloud URL
- YouTube API kan video's uploaden vanaf een URL

#### Optie C: Externe Service
- Gebruik een externe service die video's uploadt
- Roep die service aan vanuit de cron job

---

## 🎯 Aanbeveling

**Voor nu:**
1. ✅ **Facebook** - Volledig automatisch (werkt perfect)
2. ⏸️ **YouTube** - Handmatig uploaden, automatisch metadata bijwerken (later)

**Later (als je cloud storage hebt):**
- Upload video's naar cloud storage
- Zet `YOUTUBE_VIDEO_PATH` naar cloud URL
- Dan werkt alles automatisch!

---

## ✅ Testen

### Test de endpoint handmatig:

```bash
curl -X POST https://jouw-app.vercel.app/api/post-all-platforms \
  -H "Authorization: Bearer JOUW_CRON_SECRET"
```

Of via Vercel Dashboard:
1. Ga naar Functions
2. Klik op `/api/post-all-platforms`
3. Klik "Invoke Function"

---

## 📊 Resultaat

Na setup krijg je automatisch op **Ma/Wo/Vr om 10:00**:

```json
{
  "success": true,
  "results": {
    "facebook": {
      "success": true,
      "postId": "..."
    },
    "youtube": {
      "success": true,
      "videoId": "...",
      "videoUrl": "..."
    }
  }
}
```

---

## 🆘 Problemen?

### "YOUTUBE_CREDENTIALS niet gevonden"
- Check of je de volledige JSON hebt gekopieerd
- Check of het tussen quotes staat in Vercel

### "YOUTUBE_TOKEN expired"
- Genereer nieuwe token: `npm run setup-playlists` in youtube-automation folder
- Kopieer nieuwe token naar Vercel

### "Video upload faalt"
- Check video pad (moet publiek toegankelijk zijn)
- Check video grootte (< 100MB aanbevolen)
- Overweeg handmatige upload + automatische metadata

---

**Klaar!** 🎉 Maandag om 10:00 gaat alles automatisch!








