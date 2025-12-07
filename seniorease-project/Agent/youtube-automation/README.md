# 🤖 YouTube Automatisering - SeniorEase

Scripts voor het automatiseren van YouTube kanaal taken.

---

## 📋 Vereisten

1. **Google Cloud Project** met YouTube Data API v3 ingeschakeld
2. **OAuth2 Credentials** (Client ID en Client Secret)
3. **Node.js** 18+ geïnstalleerd

---

## 🚀 Setup

### Stap 1: Google Cloud Project

1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. Maak een nieuw project: "SeniorEase YouTube"
3. Schakel **YouTube Data API v3** in
4. Maak **OAuth2 credentials** aan:
   - Application type: **Desktop app**
   - Download credentials als `credentials.json`

### Stap 2: Installatie

```bash
cd Agent/youtube-automation
npm install
```

### Stap 3: Environment Variables

Maak `.env` bestand:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
YOUTUBE_CHANNEL_ID=your-channel-id
```

### Stap 4: Eerste Authenticatie

```bash
npm run setup-playlists
```

Dit opent een browser voor OAuth2 authenticatie. Log in en geef toestemming.

---

## 📝 Scripts

### 1. Playlists Aanmaken

```bash
npm run setup-playlists
```

Maakt automatisch alle playlists aan:
- 📚 Instructievideo's - SeniorEase
- 💡 Tips & Tricks voor Senioren
- ❓ Veelgestelde Vragen (FAQ)
- 🆕 Nieuwe Features & Updates

### 2. Video Uploaden

```bash
npm run upload-video -- --video="path/to/video.mp4" --title="Video Titel" --description="Beschrijving"
```

**Opties:**
- `--video` of `--videopath`: Pad naar video bestand
- `--title`: Video titel (verplicht)
- `--description`: Video beschrijving
- `--tags`: Tags (komma gescheiden)
- `--privacy`: Privacy status (public/unlisted/private, default: private)
- `--category`: Categorie ID (default: 27 = Education)

**Voorbeeld:**
```bash
npm run upload-video -- --video="C:\\Users\\...\\video.mp4" --title="Mijn Video" --privacy=unlisted
```

⚠️ **Let op:** Voor grote bestanden (>100MB) is handmatige upload via YouTube Studio aanbevolen.

### 3. Video Metadata Bijwerken

```bash
npm run update-video -- --video-id=VIDEO_ID --title="Nieuwe Titel" --description="Nieuwe beschrijving"
```

**Opties:**
- `--video-id`: YouTube video ID (verplicht)
- `--title`: Nieuwe titel
- `--description`: Nieuwe beschrijving
- `--tags`: Tags (komma gescheiden)
- `--category`: Categorie ID
- `--privacy`: Privacy status

**Voorbeeld:**
```bash
npm run update-video -- --video-id=dQw4w9WgXcQ --title="Bijgewerkte Titel" --privacy=public
```

### 4. Video Toevoegen aan Playlist

```bash
npm run add-to-playlist -- --video-id=VIDEO_ID --playlist-name="📚 Instructievideo's - SeniorEase"
```

**Opties:**
- `--video-id`: YouTube video ID (verplicht)
- `--playlist-id`: Playlist ID
- `--playlist-name`: Playlist naam (alternatief voor ID)

**Voorbeeld:**
```bash
npm run add-to-playlist -- --video-id=dQw4w9WgXcQ --playlist-name="📚 Instructievideo's - SeniorEase"
```

### 5. Analytics Ophalen

```bash
npm run get-analytics
```

Toont kanaal statistieken en laatste video's.

**Met video statistieken:**
```bash
npm run get-analytics -- --video-id=VIDEO_ID
```

### 6. Complete Workflow (Alles in één!)

```bash
npm run complete-workflow -- --video="path/to/video.mp4" --title="Titel" --playlist="Playlist Naam"
```

**Volledige automatische workflow:**
1. Video uploaden
2. Metadata bijwerken
3. Toevoegen aan playlist

**Opties:**
- `--video`: Pad naar video bestand
- `--title`: Video titel (verplicht)
- `--description`: Video beschrijving
- `--tags`: Tags (komma gescheiden)
- `--playlist`: Playlist naam
- `--privacy`: Privacy status (default: private)

**Voorbeeld:**
```bash
npm run complete-workflow -- --video="video.mp4" --title="Nieuwe Video" --playlist="📚 Instructievideo's - SeniorEase" --privacy=unlisted
```

### 7. Audio Toevoegen aan Video

```bash
npm run add-audio
```

Combineert video en audio bestanden (vereist FFmpeg).

---

## ⚠️ Beperkingen

YouTube Data API heeft beperkingen:
- ❌ Kanaalbeschrijving wijzigen (vereist handmatig)
- ❌ Banner/profielfoto uploaden (vereist handmatig)
- ❌ Links toevoegen (vereist handmatig)
- ✅ Playlists aanmaken
- ✅ Video metadata bijwerken
- ✅ Video's uploaden (werkt, maar voor grote bestanden handmatig aanbevolen)
- ✅ Video's toevoegen aan playlists
- ✅ Analytics ophalen

## 🚀 Volledige Automatische Workflow

Je kunt nu een volledige automatische workflow gebruiken:

```bash
npm run complete-workflow -- \
  --video="path/to/video.mp4" \
  --title="Mijn Video Titel" \
  --description="Video beschrijving met links" \
  --tags="SeniorEase,Boeken,Bibliotheek" \
  --playlist="📚 Instructievideo's - SeniorEase" \
  --privacy=unlisted
```

Dit doet automatisch:
1. ✅ Video uploaden naar YouTube
2. ✅ Metadata instellen (titel, beschrijving, tags)
3. ✅ Video toevoegen aan playlist
4. ✅ Klaar voor publicatie!

**Tip:** Start altijd met `--privacy=private` of `--privacy=unlisted` om eerst te controleren voordat je publiceert.

---

## 🔒 Veiligheid

- **NOOIT** commit `credentials.json` of `.env` naar Git
- Gebruik `.gitignore` voor gevoelige bestanden
- OAuth2 tokens worden lokaal opgeslagen

---

## 📚 Documentatie

- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client)

---

## 🚀 Quick Start

**Eerste keer gebruiken?** Zie `QUICK-START.md` voor een stap-voor-stap guide!

---

## 🆘 Hulp

- **Quick Start:** `QUICK-START.md` - Eerste keer gebruiken
- **Setup:** `SETUP-GUIDE.md` - Complete setup instructies
- **Troubleshooting:** `YOUTUBE-AUTOMATISERING-OPLOSSING.md` - Problemen oplossen


