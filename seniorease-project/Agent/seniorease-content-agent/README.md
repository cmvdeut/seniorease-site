# SeniorEase Content Agent 🤖

Geautomatiseerde content generator voor SeniorEase social media kanalen.

## Wat doet het?

- ✅ Genereert 3x per week automatisch content met Claude AI
- ✅ Post naar Facebook (straks ook YouTube)
- ✅ Nederlandse tech tips voor senioren
- ✅ Draait op Vercel met cron jobs (maandag, woensdag, vrijdag om 10:00)

---

## 🚀 SETUP STAPPEN

### 1. Claude API Key verkrijgen

⚠️ **Let op:** Je hebt Claude Plus, maar voor de API heb je een apart account nodig!

1. Ga naar: https://console.anthropic.com/
2. Maak een account (kan los zijn van je Claude Plus)
3. Ga naar **API Keys**
4. Klik **Create Key**
5. Kopieer de key (begint met `sk-ant-api03-...`)

💰 **Kosten:** ~€15-30/maand voor 100+ posts (veel goedkoper dan Plus!)

---

### 2. Lokaal Testen

```bash
# Clone of download deze folder
cd seniorease-content-agent

# Installeer packages
npm install

# Maak .env file
cp .env.example .env

# Vul je API key in:
# ANTHROPIC_API_KEY=sk-ant-api03-jouw-key-hier
```

**Test de content generator:**
```bash
npm run test-generate
```

Je zou nu 3 voorbeeld posts moeten zien! 🎉

---

### 3. Facebook Setup

#### Stap A: Lange-termijn Access Token

1. Ga naar: https://developers.facebook.com/tools/explorer/
2. Selecteer je SeniorEase pagina
3. Klik **Generate Access Token**
4. Kies permissions: `pages_manage_posts`, `pages_read_engagement`
5. Kopieer de token

#### Stap B: Token Verlengen (60 dagen → permanent)

```bash
# Vervang YOUR_TOKEN en YOUR_APP_ID/SECRET
curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
```

Of gebruik: https://developers.facebook.com/tools/debug/accesstoken/

#### Stap C: Page ID vinden

Ga naar je Facebook pagina → About → Page ID (onderaan)

**Vul in .env:**
```
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx
FACEBOOK_PAGE_ID=123456789
```

---

### 4. Vercel Deployment

```bash
# Login bij Vercel (first time)
npx vercel login

# Link project
npx vercel link

# Voeg environment variables toe
npx vercel env add ANTHROPIC_API_KEY
npx vercel env add FACEBOOK_PAGE_ACCESS_TOKEN
npx vercel env add FACEBOOK_PAGE_ID

# Deploy!
npx vercel --prod
```

**Cron job checklist:**
- ✅ Vercel Pro account (gratis cron jobs)
- ✅ vercel.json bevat cron definitie
- ✅ Posts automatisch maandag/woensdag/vrijdag 10:00

---

## 📊 Testen

### Test content generatie:
```bash
# Lokaal
npm run test-generate

# Op Vercel (na deploy)
curl https://jouw-project.vercel.app/api/generate-content
```

### Test Facebook posting:
```javascript
// Maak test-facebook.js
import { FacebookPoster } from './lib/facebook.js';
import 'dotenv/config';

const fb = new FacebookPoster();
const result = await fb.postText('Test post! 🚀', ['#SeniorEase', '#TechTips']);
console.log(result);
```

Run: `node test-facebook.js`

---

## 🎨 Content Aanpassen

Bewerk **config/topics.json** om:
- Nieuwe categorieën toe te voegen
- Topics aan te passen
- Post stijlen te wijzigen

De AI genereert automatisch variatie binnen deze thema's.

---

## 📅 Posting Schema

Standaard: **Maandag, Woensdag, Vrijdag om 10:00**

Aanpassen in `vercel.json`:
```json
"schedule": "0 10 * * 1,3,5"
           //  │  │  │ │ │
           //  │  │  │ │ └─ Dag (1=Ma, 3=Wo, 5=Vr)
           //  │  │  │ └─── Maand
           //  │  │  └───── Dag vd maand
           //  │  └──────── Uur (10:00)
           //  └─────────── Minuut
```

---

## 🔧 Troubleshooting

**"Invalid API key"**
- Check of ANTHROPIC_API_KEY correct is (moet starten met `sk-ant-api03-`)
- Verifieer op https://console.anthropic.com/settings/keys

**"Facebook error"**
- Test token: https://developers.facebook.com/tools/debug/accesstoken/
- Check permissions: `pages_manage_posts` moet aangevinkt zijn

**"Cron job runs niet"**
- Vercel Pro account? (crons zijn alleen Pro)
- Check logs: `vercel logs jouw-project`

---

## 🎯 Volgende Stappen

1. ✅ Lokaal testen → werkt het?
2. ✅ Deploy naar Vercel
3. ✅ Eerste week monitoren
4. 🔜 YouTube integratie toevoegen
5. 🔜 Analytics bijhouden

---

## 💡 Tips

- **Content variëren:** Pas topics.json regelmatig aan
- **Timing:** Test welke post tijden beste engagement geven
- **Backup:** Clone de repo naar je eigen GitHub
- **Monitoring:** Check wekelijks of alles smooth loopt

---

Veel succes! 🚀

Vragen? Check de code comments of vraag me!
