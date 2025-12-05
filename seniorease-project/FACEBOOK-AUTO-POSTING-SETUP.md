# 🤖 Facebook Automatische Posting Setup - Stap voor Stap

## 🎯 Wat Gaan We Doen?

Automatische posting instellen zodat je Facebook pagina **3x per week** automatisch posts krijgt:
- **Maandag, Woensdag, Vrijdag om 10:00**
- **Nederlandse tech tips voor senioren**
- **Gegenereerd met Claude AI**
- **Automatisch gepost naar Facebook**

---

## ✅ Stap 1: Facebook Access Token Ophalen

### 1.1 Ga naar Facebook Graph API Explorer

1. Ga naar: **[https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)**
2. Log in met je Facebook account

### 1.2 Selecteer Je Pagina

1. Klik op **"Meta App"** dropdown (bovenaan)
2. Selecteer je **SeniorEase pagina** (niet je persoonlijke account!)
3. Als je pagina niet ziet:
   - Klik op **"Get Token"** → **"Get Page Access Token"**
   - Selecteer je SeniorEase pagina

### 1.3 Genereer Access Token

1. Klik op **"Generate Access Token"** (of "Get Token")
2. **Belangrijk:** Kies deze permissions:
   - ✅ `pages_manage_posts` (om posts te maken)
   - ✅ `pages_read_engagement` (om engagement te lezen)
3. Klik **"Generate Access Token"**
4. **Kopieer de token** (begint met `EAA...`)

**⚠️ Let op:** Deze token is **kort** (1-2 uur geldig). We gaan hem straks verlengen!

---

## ✅ Stap 2: Facebook App ID en Secret Ophalen

### 2.1 Maak een Facebook App (Als Je Die Nog Niet Hebt)

1. Ga naar: **[https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)**
2. Klik **"Create App"**
3. Kies **"Business"** als type
4. Vul in:
   - **App Name:** `SeniorEase Content Agent`
   - **Contact Email:** `info@seniorease.nl`
5. Klik **"Create App"**

### 2.2 Voeg Facebook Login Product Toe

1. In je app dashboard, klik **"Add Product"**
2. Zoek **"Facebook Login"**
3. Klik **"Set Up"**
4. Kies **"Web"** platform
5. Site URL: `https://seniorease.nl`
6. Klik **"Save"**

### 2.3 Haal App ID en Secret Op

1. In je app dashboard, ga naar **"Settings"** → **"Basic"**
2. Je ziet:
   - **App ID:** Kopieer dit
   - **App Secret:** Klik **"Show"** en kopieer dit

**📋 Noteer deze:**
- App ID: `1234567890123456`
- App Secret: `abc123def456...`

---

## ✅ Stap 3: Token Verlengen (Kort → Lang)

### 3.1 Verleng Token naar 60 Dagen

**Optie A: Via Browser (Eenvoudigst)**

1. Ga naar: **[https://developers.facebook.com/tools/debug/accesstoken/](https://developers.facebook.com/tools/debug/accesstoken/)**
2. Plak je **korte token** (van Stap 1.3)
3. Klik **"Extend Access Token"**
4. **Kopieer de nieuwe token** (60 dagen geldig)

**Optie B: Via Command Line**

```bash
# Vervang:
# YOUR_SHORT_TOKEN = token van Stap 1.3
# YOUR_APP_ID = App ID van Stap 2.3
# YOUR_APP_SECRET = App Secret van Stap 2.3

curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
```

**Antwoord ziet er zo uit:**
```json
{
  "access_token": "EAAxxxxx...",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

**Kopieer de `access_token`** - dit is je **60-dagen token**!

---

## ✅ Stap 4: Page ID Vinden

### 4.1 Ga naar Je Facebook Pagina

1. Ga naar je **SeniorEase Facebook pagina**
2. Klik op **"About"** (of "Over")
3. Scroll helemaal naar beneden
4. Je ziet **"Page ID"** (bijv. `123456789012345`)

**📋 Noteer dit:**
- Page ID: `123456789012345`

---

## ✅ Stap 5: Claude API Key (Als Je Die Nog Niet Hebt)

### 5.1 Maak Anthropic Account

1. Ga naar: **[https://console.anthropic.com/](https://console.anthropic.com/)**
2. Maak een account (kan los zijn van Claude Plus)
3. Ga naar **"API Keys"**
4. Klik **"Create Key"**
5. **Kopieer de key** (begint met `sk-ant-api03-...`)

**💰 Kosten:** ~€15-30/maand voor 100+ posts

---

## ✅ Stap 6: Content Agent Lokaal Testen

### 6.1 Ga naar Content Agent Folder

```bash
cd Agent/seniorease-content-agent
```

### 6.2 Installeer Packages

```bash
npm install
```

### 6.3 Maak .env File

Maak een bestand `.env` in de `seniorease-content-agent` folder:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-jouw-key-hier
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx-jouw-60-dagen-token
FACEBOOK_PAGE_ID=123456789012345
CRON_SECRET=een-random-secret-hier
```

**Vervang:**
- `sk-ant-api03-jouw-key-hier` → Je Claude API key
- `EAAxxxxx-jouw-60-dagen-token` → Je 60-dagen Facebook token
- `123456789012345` → Je Facebook Page ID
- `een-random-secret-hier` → Een willekeurige string (bijv. `abc123xyz789`)

### 6.4 Test Content Generatie

```bash
npm run test-generate
```

**Je zou nu 3 voorbeeld posts moeten zien!** 🎉

---

## ✅ Stap 7: Test Facebook Posting

### 7.1 Maak Test Script

Maak een bestand `test-facebook.js` in de `seniorease-content-agent` folder:

```javascript
import { FacebookPoster } from './lib/facebook.js';
import 'dotenv/config';

const fb = new FacebookPoster();
const result = await fb.postText('Test post van Content Agent! 🚀', ['#SeniorEase', '#Test']);
console.log('Result:', result);
```

### 7.2 Run Test

```bash
node test-facebook.js
```

**Check je Facebook pagina** - je zou een test post moeten zien!

**Als het werkt:** ✅ Klaar voor deployment!
**Als het niet werkt:** Check token permissions en Page ID

---

## ✅ Stap 8: Deploy naar Vercel

### 8.1 Login bij Vercel

```bash
cd Agent/seniorease-content-agent
npx vercel login
```

### 8.2 Link Project

```bash
npx vercel link
```

- Kies **"Link to existing project"** of **"Create new project"**
- Project naam: `seniorease-content-agent`

### 8.3 Voeg Environment Variables Toe

```bash
# Claude API Key
npx vercel env add ANTHROPIC_API_KEY
# Plak je Claude API key

# Facebook Token
npx vercel env add FACEBOOK_PAGE_ACCESS_TOKEN
# Plak je 60-dagen Facebook token

# Facebook Page ID
npx vercel env add FACEBOOK_PAGE_ID
# Plak je Page ID

# Cron Secret
npx vercel env add CRON_SECRET
# Plak een random secret (bijv. abc123xyz789)
```

**⚠️ Belangrijk:** Voor elke variable, kies **"Production"** environment!

### 8.4 Deploy!

```bash
npx vercel --prod
```

---

## ✅ Stap 9: Cron Job Activeren

### 9.1 Check Vercel Pro Account

**⚠️ Belangrijk:** Cron jobs werken alleen met **Vercel Pro** account!

- **Gratis account:** Geen cron jobs
- **Pro account:** $20/maand, maar cron jobs inbegrepen

**Als je geen Pro account hebt:**
- Upgrade naar Pro in Vercel dashboard
- Of gebruik alternatief (zie hieronder)

### 9.2 Check Cron Configuratie

De `vercel.json` bevat al de cron configuratie:
- **Schedule:** Maandag, Woensdag, Vrijdag om 10:00
- **Path:** `/api/schedule-posts`

### 9.3 Test Cron Job (Handmatig)

Na deployment, test handmatig:

```bash
# Vervang met jouw Vercel URL
curl https://jouw-project.vercel.app/api/schedule-posts?secret=jouw-cron-secret
```

**Check je Facebook pagina** - er zou een post moeten verschijnen!

---

## ✅ Stap 10: Monitoren

### 10.1 Check Vercel Logs

1. Ga naar Vercel → Project → **Logs**
2. Check of cron jobs draaien
3. Check voor errors

### 10.2 Check Facebook Pagina

- **Maandag 10:00:** Nieuwe post?
- **Woensdag 10:00:** Nieuwe post?
- **Vrijdag 10:00:** Nieuwe post?

---

## 🐛 Troubleshooting

### Probleem: "Invalid Access Token"
**Oplossing:**
1. Check of token nog geldig is: https://developers.facebook.com/tools/debug/accesstoken/
2. Verleng token opnieuw (Stap 3)
3. Update in Vercel environment variables

### Probleem: "Page ID not found"
**Oplossing:**
1. Check of Page ID correct is (Stap 4)
2. Check of token permissions correct zijn (`pages_manage_posts`)

### Probleem: "Cron job runs niet"
**Oplossing:**
1. Check of je Vercel Pro account hebt
2. Check `vercel.json` cron configuratie
3. Test handmatig met curl (Stap 9.3)

### Probleem: "Claude API error"
**Oplossing:**
1. Check of API key correct is
2. Check of je credits hebt op Anthropic account
3. Check Vercel logs voor details

---

## ✅ Checklist

- [ ] Facebook Access Token opgehaald
- [ ] Token verlengd naar 60 dagen
- [ ] Facebook Page ID gevonden
- [ ] Claude API Key opgehaald
- [ ] Content Agent lokaal getest
- [ ] Facebook posting getest
- [ ] Gedeployed naar Vercel
- [ ] Environment variables toegevoegd
- [ ] Cron job geactiveerd
- [ ] Eerste automatische post ontvangen

---

## 🎯 Volgende Stappen

1. **Monitor eerste week** - Check of posts verschijnen
2. **Pas content aan** - Bewerk `config/topics.json` voor variatie
3. **Analytics bijhouden** - Zie welke posts het beste werken
4. **YouTube toevoegen** (later) - Zelfde systeem voor YouTube

---

**Klaar om te beginnen? Start met Stap 1!** 🚀

Laat weten als je hulp nodig hebt bij een specifieke stap!




