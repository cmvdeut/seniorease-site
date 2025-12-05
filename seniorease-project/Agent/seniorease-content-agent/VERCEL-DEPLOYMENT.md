# 🚀 Vercel Deployment - Geautomatiseerde Facebook Posts

## 📋 Overzicht

Dit deployt je screenshot poster naar Vercel met automatische cron jobs die:
- ⏰ Elke **Maandag, Woensdag en Vrijdag om 10:00 uur** draaien
- 📸 Automatisch de volgende screenshot posten naar Facebook
- 🔄 State bijhouden (welke post is volgende)
- 📊 Logs bijhouden in Vercel dashboard

---

## 🎯 Snelle Deployment (5 minuten)

### Stap 1: Vercel CLI Installeren

```powershell
# Als je Vercel CLI nog niet hebt:
npm install -g vercel

# Login
vercel login
```

### Stap 2: Project Linken

```powershell
cd Agent\seniorease-content-agent

# Link aan je Vercel account
vercel link
```

**Vragen die je krijgt:**
- Setup and deploy? → **N** (nee, we configureren eerst)
- Which scope? → Kies je account
- Link to existing project? → **N** (nieuwe project)
- Project name? → **seniorease-content-agent** (of eigen naam)

### Stap 3: Environment Variables Instellen

```powershell
# Zet je Facebook credentials
vercel env add FACEBOOK_PAGE_ACCESS_TOKEN

# Plak je token: EAAb0NgbtBVsBQCBniBZAs2HLtPFS57ZCvIZAZAeWdZAelEL4hN4zqnrAleeJh4Ak1PGDVPzQSKOCGtjNzzYhVTOmFO9QCpqgAst8ElvTIjNagktZClZBoN3CzCCRqZAWu8XBn5ZC9k3ZCK5ekeJWIVB4zyuORfzlBaquUCuSXvM5zENClQ3aHciQrflpKzp57I4LKbhh9mMLSq95RyXFYNbFx4X2uQkIpgfV9nXoyJ5cbt

# Kies: Production, Preview, Development → Selecteer alle 3

vercel env add FACEBOOK_PAGE_ID
# Vul in: 898268823367107

vercel env add CURRENT_POST_INDEX
# Vul in: 1
# (Dit is de volgende post die gepost wordt - start bij 1 = Post 2)
```

**Optioneel** - Security (aanbevolen):
```powershell
vercel env add CRON_SECRET
# Vul een willekeurige string in bijv: jouw-geheime-key-123

vercel env add MANUAL_TRIGGER_KEY
# Voor handmatige test triggers: test-key-456
```

### Stap 4: Deploy!

```powershell
# Deploy naar production
vercel --prod
```

**Output:**
```
🔍  Inspect: https://vercel.com/jouw-account/seniorease-content-agent/...
✅  Production: https://seniorease-content-agent.vercel.app
```

---

## ✅ Verificatie

### Test de API

```powershell
# Test endpoint (met manual trigger key):
curl "https://seniorease-content-agent.vercel.app/api/post-screenshot?manual=test-key-456"
```

**Verwachte response:**
```json
{
  "success": true,
  "message": "Screenshot succesvol gepost!",
  "post": {
    "id": 2,
    "title": "Feature - Barcode Scanner",
    "screenshot": "Screenshot_2.png",
    "facebookPostId": "...",
    "link": "https://www.facebook.com/..."
  },
  "nextPost": "Feature - Google Integratie",
  "schedule": "Ma/Wo/Vr om 10:00 uur"
}
```

### Check Cron Jobs in Vercel Dashboard

1. Ga naar: https://vercel.com/dashboard
2. Selecteer je project: **seniorease-content-agent**
3. Ga naar **Settings** → **Cron Jobs**
4. Je zou moeten zien:
   ```
   /api/post-screenshot
   Schedule: 0 10 * * 1,3,5
   Status: Active ✅
   ```

### Check Logs

1. In Vercel dashboard
2. Ga naar **Deployments** → selecteer je deployment
3. Klik **Functions** → `/api/post-screenshot`
4. Bekijk **Logs** voor output

---

## 📅 Posting Schema

### Automatische Schedule

De cron job draait op:
- **Maandag 10:00** (CET/CEST)
- **Woensdag 10:00** (CET/CEST)
- **Vrijdag 10:00** (CET/CEST)

### Post Volgorde

| Week | Dag | Post | Screenshot |
|------|-----|------|------------|
| 1 | Wo | Post 2 | Barcode Scanner |
| 1 | Vr | Post 3 | Google Integratie |
| 2 | Ma | Post 4 | Veiligheid & Privacy |
| 2 | Wo | Post 5 | Meertalig |
| 2 | Vr | Post 2 | (herhaalt) |

Na post 5 begint het opnieuw bij post 2 (post 1 was de intro die je handmatig hebt gepost).

---

## 🔄 State Management

### Met Vercel KV (Optioneel, Aanbevolen)

Voor betere state persistence kun je Vercel KV toevoegen:

1. **In Vercel Dashboard:**
   - Ga naar je project
   - **Storage** → **Create Database**
   - Kies **KV** (Key-Value Store)
   - Klik **Create**

2. **Link aan je project:**
   - Vercel linkt automatisch de credentials
   - Environment variables worden toegevoegd

3. **Deploy opnieuw:**
   ```powershell
   vercel --prod
   ```

**Voordelen van KV:**
- ✅ Persistente state (blijft tussen deployments)
- ✅ Automatisch bijhouden welke posts gepost zijn
- ✅ Post history tracking
- ✅ Geen handmatige updates van env variables nodig

### Zonder KV (Environment Variables)

**Na elke deployment:**
- Check de logs om te zien welke post is gepost
- Update `CURRENT_POST_INDEX` naar de volgende:
  ```powershell
  vercel env rm CURRENT_POST_INDEX production
  vercel env add CURRENT_POST_INDEX
  # Vul de volgende index in (bijv. 2 voor post 3)
  ```

---

## 🛠️ Maintenance

### Update Facebook Token (elke 60 dagen)

1. **Verkrijg nieuwe token:**
   - https://developers.facebook.com/tools/explorer/
   - Generate Page Access Token
   - Selecteer senioreasenl pagina

2. **Update in Vercel:**
   ```powershell
   vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production
   vercel env add FACEBOOK_PAGE_ACCESS_TOKEN
   # Plak nieuwe token
   ```

3. **Geen redeploy nodig** - nieuwe token wordt meteen gebruikt!

### Pause Cron Jobs

**Tijdelijk uitschakelen:**
1. Vercel Dashboard → je project
2. Settings → Cron Jobs
3. Klik op je cron job
4. Toggle **Enabled** uit

**Opnieuw inschakelen:** Toggle weer aan

### Handmatig een Post Triggeren

**Tussen de scheduled times:**
```powershell
# Test eerst wat de volgende post is:
curl "https://seniorease-content-agent.vercel.app/api/post-screenshot?manual=test-key-456"

# Als je wilt skippen naar specifieke post, update CURRENT_POST_INDEX
```

### Reset State (Begin Opnieuw)

```powershell
# Reset naar begin (post 2):
vercel env rm CURRENT_POST_INDEX production
vercel env add CURRENT_POST_INDEX
# Vul in: 1
```

---

## 📊 Monitoring

### Check of Posts Werken

**Methode 1: Vercel Logs**
- Dashboard → Functions → `/api/post-screenshot`
- Bekijk logs na elke run (Ma/Wo/Vr 10:00)

**Methode 2: Facebook Pagina**
- https://www.facebook.com/senioreasenl
- Check of nieuwe posts verschijnen

**Methode 3: Notificaties** (Optioneel)
Voeg email notificaties toe:
```powershell
vercel env add NOTIFICATION_EMAIL
# Vul je email in
```

### Expected Logs

**Succesvolle post:**
```
🤖 Automated Facebook Screenshot Poster - Starting...
📸 Posting: Feature - Barcode Scanner (Post 2)
📤 Posting to Facebook...
✅ Posted! Post ID: 122105470629126305
📊 POST LOGGED: { ... }
```

**Error:**
```
❌ Automated Post Error: Facebook API Error: Invalid OAuth token
```
→ Token expired, verkrijg nieuwe token

---

## 🔧 Troubleshooting

### Cron Job draait niet

**Check:**
1. Is cron job enabled in dashboard?
2. Zijn environment variables ingesteld?
3. Check Vercel logs voor errors

**Oplossing:**
- Redeploy: `vercel --prod`
- Check timezone (cron gebruikt UTC, niet CET!)

### Posts worden niet geplaatst

**Check:**
1. Facebook token nog geldig? (60 dagen expiry)
2. Screenshot bestanden aanwezig in deployment?
3. Check logs voor exacte error

**Oplossing:**
- Vernieuw token (zie Maintenance)
- Check of screenshots mee-deployen:
  ```powershell
  # Voeg .vercelignore check toe
  # Screenshots NIET in .vercelignore
  ```

### Verkeerde post wordt geplaatst

**Check:**
- Wat is CURRENT_POST_INDEX?
  ```powershell
  vercel env ls
  ```

**Oplossing:**
- Update naar correcte index

### "Screenshot niet gevonden" error

**Oorzaak:** Screenshots niet geüpload naar Vercel

**Oplossing 1:** Vercel Functions hebben geen toegang tot lokale files
- Upload screenshots naar cloud storage (Cloudinary, AWS S3)
- Update image URLs in post-screenshot.js

**Oplossing 2:** Gebruik website URL's
- Plaats screenshots op je website
- Gebruik die URLs in de posts

**Oplossing 3:** Base64 encode in code (niet aanbevolen, groot)

---

## 🎯 Aanbevolen Setup

### Voor Production (Beste)

1. ✅ **Vercel KV** voor state management
2. ✅ **Cloudinary/S3** voor screenshot hosting
3. ✅ **Cron Secret** voor security
4. ✅ **Email notificaties** voor monitoring

### Setup Script

```javascript
// Upload screenshots to Cloudinary
// Update post-screenshot.js met URLs
const SCREENSHOTS = {
  1: 'https://res.cloudinary.com/.../Screenshot_1.png',
  2: 'https://res.cloudinary.com/.../Screenshot_2.png',
  // etc
};
```

### Voor Nu (Quick Start)

1. ✅ Environment variables voor state
2. ✅ Lokale screenshots (in deployment bundle)
3. ✅ Manual trigger key voor testing
4. ✅ Check logs handmatig

---

## 📞 Support

### Vercel Documentatie
- Cron Jobs: https://vercel.com/docs/cron-jobs
- Environment Variables: https://vercel.com/docs/environment-variables
- Functions: https://vercel.com/docs/functions

### Project Bestanden
- `vercel.json` - Cron configuratie
- `api/post-screenshot.js` - Main posting logic
- `lib/state-manager.js` - State tracking
- `lib/facebook.js` - Facebook API

### Commands Reference

```powershell
# Deploy
vercel --prod

# Check logs
vercel logs seniorease-content-agent

# Environment variables
vercel env ls
vercel env add [NAME]
vercel env rm [NAME] production

# Link project
vercel link

# Info
vercel --help
```

---

## ✅ Post-Deployment Checklist

- [ ] Vercel project deployed
- [ ] Environment variables ingesteld
- [ ] Cron job actief in dashboard
- [ ] Test POST via manual trigger succesvol
- [ ] Facebook post verschijnt op pagina
- [ ] State wordt correct bijgewerkt
- [ ] Logs zijn zichtbaar in dashboard
- [ ] Notificaties ingesteld (optioneel)
- [ ] Calendar reminders voor token renewal (60 dagen)

---

🎉 **Je bent klaar! De screenshots worden nu automatisch gepost op Ma/Wo/Vr om 10:00!**

**Check je Facebook:** https://www.facebook.com/senioreasenl  
**Vercel Dashboard:** https://vercel.com/dashboard

_Volgende automatische post: Maandag 10:00 uur_ 🚀


