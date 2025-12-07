# 🚀 Vercel Automatisering - Complete Setup

**Doel:** Zoveel mogelijk Vercel taken automatiseren via scripts

---

## ✅ Wat Is Er Gemaakt

### 1. Vercel Helper Script (`scripts/vercel-helper.js`)
**Functionaliteit:**
- ✅ List alle projecten
- ✅ Get project details
- ✅ List deployments
- ✅ Get deployment details
- ✅ Get deployment logs
- ✅ List domains
- ✅ Redeploy deployments

### 2. Status Check Script (`scripts/check-vercel-status.js`)
**Functionaliteit:**
- ✅ Check alle SeniorEase projecten
- ✅ Toon recente deployments
- ✅ Toon domains
- ✅ Status overzicht

### 3. Redeploy Script (`scripts/redeploy-vercel.js`)
**Functionaliteit:**
- ✅ Redeploy specifiek project
- ✅ Clean build optie
- ✅ Deployment status

---

## 🚀 Gebruik

### Basis Commands

**Check status:**
```bash
npm run vercel:status
```

**List projecten:**
```bash
npm run vercel:projects
```

**List deployments:**
```bash
npm run vercel:deployments
# Of specifiek project:
npm run vercel:deployments seniorease-site
```

**List domains:**
```bash
npm run vercel:domains
# Of specifiek project:
npm run vercel:domains seniorease-site
```

### Geavanceerde Commands

**Get deployment logs:**
```bash
node scripts/vercel-helper.js logs <deployment-id>
```

**Get project status:**
```bash
node scripts/vercel-helper.js status seniorease-site
```

---

## 🔧 Setup

### Stap 1: Environment Variable

**Maak een `.env.local` bestand in de project root:**
```
VERCEL_TOKEN=YOUR_TOKEN_HERE
```

**⚠️ Waar krijg je de token?**
1. Ga naar: https://vercel.com/account/tokens
2. Klik op "Create Token"
3. Geef een naam (bijv. "Local Development")
4. Kopieer de token en plak in `.env.local`

**Of set handmatig (tijdelijk):**
```bash
# Windows PowerShell
$env:VERCEL_TOKEN="YOUR_TOKEN_HERE"

# Mac/Linux
export VERCEL_TOKEN="YOUR_TOKEN_HERE"
```

**⚠️ BELANGRIJK:**
- `.env.local` staat al in `.gitignore` - commit dit bestand NOOIT!
- Gebruik NOOIT hardcoded tokens in code

### Stap 2: Test Scripts

**Test status check:**
```bash
npm run vercel:status
```

**Verwacht output:**
```
🔍 Checking Vercel Status...

📦 Found 2 SeniorEase project(s):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 seniorease-site
   ID: prj_xxxxx
   Framework: nextjs

   🚀 Recent Deployments (5):
      1. ✅ https://seniorease-site.vercel.app
         State: READY | Created: ...
...
```

---

## 📋 Wat Ik Nu Kan Doen

**Via scripts:**
- ✅ Check deployment status
- ✅ Bekijk logs
- ✅ List projecten en domains
- ✅ Monitor deployments

**Via terminal (met jouw goedkeuring):**
- ✅ Scripts uitvoeren
- ✅ Status checks
- ✅ Logs analyseren

**Limitaties:**
- ❌ Directe redeploy (vereist Vercel CLI of GitHub push)
- ❌ Environment variables aanpassen (vereist Vercel Dashboard)
- ❌ Domains toevoegen (vereist Vercel Dashboard)

---

## 🎯 Automatisering Workflow

**Dagelijks:**
```bash
npm run vercel:status  # Check alles
```

**Bij problemen:**
```bash
npm run vercel:deployments  # Check laatste deployments
node scripts/vercel-helper.js logs <deployment-id>  # Bekijk logs
```

**Voor deployment:**
- Push naar GitHub → Vercel deployt automatisch
- Of: `vercel --prod` (lokaal)

---

## 🔒 Security

**Token beveiliging:**
- ✅ Opgeslagen in `.env.local` (niet in git)
- ✅ `.env.local` staat in `.gitignore`
- ✅ Scripts gebruiken environment variable

**Best practices:**
- ❌ Deel token niet publiekelijk
- ✅ Rotate token regelmatig
- ✅ Gebruik alleen lokaal

---

## ✅ Test Nu

**Run dit commando:**
```bash
npm run vercel:status
```

**Dit toont:**
- Alle SeniorEase projecten
- Recente deployments
- Domains
- Status van alles

---

**Ik kan nu veel meer Vercel taken overnemen!** 🚀

