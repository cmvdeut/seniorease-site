# 🚀 Deploy Nu naar Vercel - 5 Minuten

## ✅ Je bent al klaar met:

- ✅ Facebook token geconfigureerd
- ✅ Eerste screenshot handmatig gepost
- ✅ Post script werkt lokaal

---

## 🎯 Nu: Automatiseer met Vercel

### Stap 1: Prep Screenshots (30 seconden)

```powershell
cd Agent\seniorease-content-agent

# Kopieer screenshots voor deployment
npm run prepare-deploy
```

**Output:**
```
📦 Preparing for Vercel Deployment
===================================

✅ Created public/ directory
✅ Created public/screenshots/ directory

📸 Copying 5 screenshots...

   ✅ Screenshot_1.png
   ✅ Screenshot_2.png
   ✅ Screenshot_3.png
   ✅ Screenshot_4.png
   ✅ Screenshot_5.png

✅ All screenshots copied!
```

---

### Stap 2: Vercel Login (1 minuut)

```powershell
# Als je Vercel CLI nog niet hebt:
npm install -g vercel

# Login
vercel login
```

Volg de instructies in je browser.

---

### Stap 3: Environment Variables (2 minuten)

```powershell
# Facebook Token
vercel env add FACEBOOK_PAGE_ACCESS_TOKEN
```
**Plak:** `EAAb0NgbtBVsBQCBniBZAs2HLtPFS57ZCvIZAZAeWdZAelEL4hN4zqnrAleeJh4Ak1PGDVPzQSKOCGtjNzzYhVTOmFO9QCpqgAst8ElvTIjNagktZClZBoN3CzCCRqZAWu8XBn5ZC9k3ZCK5ekeJWIVB4zyuORfzlBaquUCuSXvM5zENClQ3aHciQrflpKzp57I4LKbhh9mMLSq95RyXFYNbFx4X2uQkIpgfV9nXoyJ5cbt`

**Environment:** Selecteer alle 3 (Production, Preview, Development)

```powershell
# Facebook Page ID
vercel env add FACEBOOK_PAGE_ID
```
**Waarde:** `898268823367107`

```powershell
# Current Post Index (start bij post 2)
vercel env add CURRENT_POST_INDEX
```
**Waarde:** `1`

---

### Stap 4: Deploy! (1 minuut)

```powershell
# Deploy naar production
vercel --prod
```

**OF gebruik de makkelijke command:**
```powershell
npm run deploy
```

**Output:**
```
🔍  Inspect: https://vercel.com/.../seniorease-content-agent/...
✅  Production: https://seniorease-content-agent.vercel.app [2s]
```

---

## ✅ Test de Deployment

### Optie 1: Wacht op eerste automatische post

**Volgende run:**
- Als vandaag maandag is: vandaag 10:00
- Als vandaag woensdag is: vandaag 10:00
- Als vandaag vrijdag is: vandaag 10:00
- Anders: volgende ma/wo/vr om 10:00

**Check:** https://www.facebook.com/senioreasenl

### Optie 2: Trigger nu handmatig

```powershell
# Via curl (test):
curl "https://seniorease-content-agent.vercel.app/api/post-screenshot"
```

**Of via browser:**
https://seniorease-content-agent.vercel.app/api/post-screenshot

---

## 📅 Posting Schema

Na deployment draait het automatisch:

| Dag | Tijd | Actie |
|-----|------|-------|
| **Maandag** | 10:00 | Post volgende screenshot |
| Dinsdag | - | - |
| **Woensdag** | 10:00 | Post volgende screenshot |
| Donderdag | - | - |
| **Vrijdag** | 10:00 | Post volgende screenshot |
| Weekend | - | - |

### Post volgorde:

```
✅ Post 1 - Al gepost (handmatig)
⏰ Post 2 - Eerste automatische (volgende ma/wo/vr)
⏰ Post 3 - Tweede automatische
⏰ Post 4 - Derde automatische
⏰ Post 5 - Vierde automatische
🔄 Post 2 - Herhaalt (cyclus start opnieuw)
```

---

## 📊 Monitoring

### Check Vercel Logs

1. Ga naar: https://vercel.com/dashboard
2. Klik op **seniorease-content-agent** project
3. Ga naar **Deployments** → kies laatste deployment
4. Klik **Functions** → `/api/post-screenshot`
5. Bekijk **Logs**

**Na elke ma/wo/vr 10:00 zie je:**
```
🤖 Automated Facebook Screenshot Poster - Starting...
📸 Posting: Feature - Barcode Scanner (Post 2)
📂 Using public screenshot (production)
📤 Posting to Facebook...
✅ Posted! Post ID: 122105470629126305
```

### Check Facebook

**Direct link:** https://www.facebook.com/senioreasenl

Posts verschijnen elke ma/wo/vr om ~10:00-10:05

---

## 🔧 Na Deployment

### ✅ Klaar!

Je hoeft niets meer te doen! Het systeem post nu automatisch.

### 📧 Optioneel: Email Notificaties

Wil je een email krijgen na elke post?

```powershell
vercel env add NOTIFICATION_EMAIL
```
**Waarde:** je@email.com

### 🔄 Token Renewal (over 60 dagen)

Zet een reminder in je agenda:
**23 Januari 2026** - "Vernieuw Facebook Token"

Dan run je:
```powershell
vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production
vercel env add FACEBOOK_PAGE_ACCESS_TOKEN
# Plak nieuwe token
```

Geen redeploy nodig!

---

## 🛠️ Commands Reference

### Lokaal testen:
```powershell
cd Agent\seniorease-content-agent

# Test Facebook connectie
npm run test-facebook

# Post handmatig lokaal
npm run post 2

# Check schema
npm run reminder
```

### Deployment:
```powershell
# Prep + Deploy
npm run deploy

# Of apart:
npm run prepare-deploy
vercel --prod

# Check status
vercel ls
```

### Vercel Management:
```powershell
# Logs bekijken
vercel logs seniorease-content-agent

# Environment variables
vercel env ls
vercel env pull   # Download naar .env.local

# Info
vercel inspect
```

---

## ❓ Troubleshooting

### "Screenshot niet gevonden"
**Oplossing:**
```powershell
npm run prepare-deploy
vercel --prod
```

### Posts worden niet geplaatst
**Check:**
1. Vercel Dashboard → Cron Jobs → Is actief?
2. Logs → Zie je errors?
3. Token nog geldig?

### Verkeerde post wordt geplaatst
**Reset index:**
```powershell
vercel env rm CURRENT_POST_INDEX production
vercel env add CURRENT_POST_INDEX
# Vul correcte index in
```

---

## 🎯 Samenvatting

**Wat je nu hebt:**
- ✅ Vercel deployment live
- ✅ Cron job draait ma/wo/vr 10:00
- ✅ Automatische Facebook posts
- ✅ State tracking
- ✅ Logs in dashboard

**Volgende post:**
- 📅 Volgende ma/wo/vr om 10:00
- 📸 Post 2: Barcode Scanner
- 🔗 Check: https://www.facebook.com/senioreasenl

**Maintenance:**
- 🔄 Token renewal over 60 dagen
- 📊 Check logs weekly
- 👀 Monitor engagement

---

🎉 **Je bent helemaal klaar! Sit back en laat het systeem werken!**

**Vercel Dashboard:** https://vercel.com/dashboard  
**Facebook Pagina:** https://www.facebook.com/senioreasenl  

_Eerste automatische post: Volgende ma/wo/vr om 10:00_ ⏰


