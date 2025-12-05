# 📱 QR Code Demo Post naar Facebook - Voor Morgen

## 🎯 Wat Dit Script Doet

Dit script:
1. ✅ Genereert een QR code voor de demo download pagina
2. ✅ Post de QR code naar Facebook met een mooie boodschap
3. ✅ Klaar om morgen te draaien!

---

## 🚀 Hoe Te Gebruiken (Morgen)

### Optie 1: Lokaal Draaien

```bash
cd Agent/seniorease-content-agent
npm run post-qr-demo
```

### Optie 2: Via Vercel API (Automatisch)

Je kunt dit ook als Vercel API endpoint maken zodat het automatisch kan draaien.

---

## 📋 Wat Je Nodig Hebt

1. ✅ Facebook Page Access Token (in `.env`)
2. ✅ Facebook Page ID (in `.env`)
3. ✅ QR code package geïnstalleerd (`npm install qrcode`)

---

## 📝 Facebook Post Boodschap

De post bevat:
- 📲 "Probeer SeniorEase GRATIS!"
- Demo voor Android 📱
- Features: Scan boeken, Zoekfunctie, Max. 10 boeken
- 👉 Download de demo nu via de link in bio!
- QR code afbeelding

---

## 🔧 Setup Check

**Check of alles klaar is:**

```bash
cd Agent/seniorease-content-agent

# Check .env
cat .env | grep FACEBOOK

# Test script
npm run post-qr-demo
```

---

## ⏰ Voor Morgen

**Actie:** Run het script morgen wanneer je klaar bent:

```bash
npm run post-qr-demo
```

**Of:** Laat het automatisch draaien via een cron job (zie hieronder).

---

## 🤖 Automatisch Draaien (Optioneel)

Als je dit automatisch wilt laten draaien, maak een Vercel API endpoint:

**File:** `Agent/seniorease-content-agent/api/post-qr-demo.js`

```javascript
import { handler } from '../post-qr-demo.js';

export default async function(req, res) {
  // Check auth
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  await handler();
  res.json({ success: true });
}
```

**Vercel Cron:**
```json
{
  "crons": [{
    "path": "/api/post-qr-demo",
    "schedule": "0 10 * * *"  // Elke dag om 10:00
  }]
}
```

---

## ✅ Klaar!

Het script is klaar om morgen te draaien! 🎉



