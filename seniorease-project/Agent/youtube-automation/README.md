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

### 2. Video Metadata Bijwerken

```bash
npm run update-video -- --video-id=VIDEO_ID --title="Nieuwe Titel"
```

### 3. Playlist Aanmaken

```bash
npm run create-playlist -- --name="Playlist Naam" --description="Beschrijving"
```

### 4. Analytics Ophalen

```bash
npm run get-analytics
```

---

## ⚠️ Beperkingen

YouTube Data API heeft beperkingen:
- ❌ Kanaalbeschrijving wijzigen (vereist handmatig)
- ❌ Banner/profielfoto uploaden (vereist handmatig)
- ❌ Links toevoegen (vereist handmatig)
- ✅ Playlists aanmaken
- ✅ Video metadata bijwerken
- ✅ Video's uploaden (complex)

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

## 🆘 Hulp

Zie `YOUTUBE-AUTOMATISERING-OPLOSSING.md` voor meer informatie.


