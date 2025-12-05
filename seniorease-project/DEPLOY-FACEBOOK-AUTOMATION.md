# 🚀 Deploy Facebook Automatisering naar Vercel

**Status:** ✅ API werkt lokaal!  
**Doel:** Automatische posts 3x per week

---

## 📋 WAT JE GAAT DOEN

Deploy je Facebook posting agent naar Vercel voor:
- ✅ Automatische posts op Maandag, Woensdag, Vrijdag om 10:00
- ✅ Content gegenereerd met Claude AI
- ✅ Volledig hands-off operatie
- ✅ Logs en monitoring in Vercel dashboard

---

## ⚙️ STAP 1: Voeg Claude API Key Toe

Je hebt nog een Claude API key nodig voor content generatie.

**Als je die al hebt:**
Update je `.env`:
```bash
cd Agent\seniorease-content-agent

# Open .env en voeg toe:
# ANTHROPIC_API_KEY=sk-ant-jouw-key-hier
```

**Als je die nog niet hebt:**
1. Ga naar: https://console.anthropic.com/
2. Create API key
3. Copy en voeg toe aan `.env`

---

## 🚀 STAP 2: Deploy naar Vercel

```bash
cd Agent\seniorease-content-agent
vercel --prod
```

**Follow prompts:**
- Link to existing project? → No (of Yes als je al een hebt)
- Project name? → seniorease-content-agent
- Deploy? → Yes

---

## 🔐 STAP 3: Environment Variables in Vercel

**Na deploy, voeg secrets toe:**

1. Ga naar Vercel dashboard
2. Select je project
3. Settings → Environment Variables
4. Voeg toe:
   ```
   FACEBOOK_PAGE_ACCESS_TOKEN = [jouw token]
   FACEBOOK_PAGE_ID = 898268823367107
   ANTHROPIC_API_KEY = [jouw key]
   ```
5. Click "Save"

---

## ✅ STAP 4: Test Cron Job

**In Vercel dashboard:**
1. Deployments → Laatste deployment
2. Functions → `/api/schedule-posts`
3. Klik "Invoke Function"
4. Check je Facebook pagina!

---

## 📅 SCHEDULE

**Automatisch posten:**
- Maandag 10:00 CET
- Woensdag 10:00 CET  
- Vrijdag 10:00 CET

**Configuratie:** `vercel.json`
```json
{
  "crons": [{
    "path": "/api/schedule-posts",
    "schedule": "0 10 * * 1,3,5"
  }]
}
```

---

## 🎯 KLAAR!

Na deploy krijg je automatisch posts zonder dat je iets hoeft te doen! 🎉



