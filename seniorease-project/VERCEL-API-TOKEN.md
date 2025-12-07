# 🔑 Vercel API Token - Configuratie

**⚠️ BELANGRIJK:** 
- **NOOIT** tokens hardcoden in code of documentatie!
- Gebruik **ALTIJD** environment variables
- Bewaar tokens veilig en lokaal (niet in git)

---

## 🔒 Security

**Wat deze token kan:**
- ✅ Deployments bekijken
- ✅ Projecten beheren
- ✅ Logs lezen
- ✅ Domains configureren
- ⚠️ **Volledige toegang tot je Vercel account**

**Beveiliging:**
- ❌ Deel deze token **NIET** publiekelijk
- ❌ Commit deze token **NIET** naar GitHub
- ✅ Bewaar lokaal (niet in git)
- ✅ Rotate token regelmatig

---

## 🚀 Gebruik

### Optie 1: Vercel CLI (Aanbevolen)

**Installeer Vercel CLI:**
```bash
npm install -g vercel
```

**Login met token:**
```bash
# Vervang YOUR_TOKEN_HERE met je echte token
vercel login --token YOUR_TOKEN_HERE
```

**Of set als environment variable:**
```bash
# Windows PowerShell
$env:VERCEL_TOKEN="YOUR_TOKEN_HERE"

# Windows CMD
set VERCEL_TOKEN=YOUR_TOKEN_HERE

# Mac/Linux
export VERCEL_TOKEN="YOUR_TOKEN_HERE"
```

**⚠️ Waar krijg je de token?**
1. Ga naar: https://vercel.com/account/tokens
2. Klik op "Create Token"
3. Geef een naam (bijv. "Local Development")
4. Kopieer de token (alleen één keer zichtbaar!)
5. Gebruik deze token in bovenstaande commando's

**Dan kan je gebruiken:**
```bash
vercel ls                    # List projects
vercel inspect [deployment] # View deployment details
vercel logs [deployment]     # View logs
```

---

### Optie 2: Direct API Calls

**Met curl:**
```bash
# Gebruik environment variable (aanbevolen)
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v2/deployments

# Of direct (niet aanbevolen - token zichtbaar in history)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://api.vercel.com/v2/deployments
```

**Met Node.js script:**
```javascript
// ALTIJD via environment variable - NOOIT hardcoden!
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
if (!VERCEL_TOKEN) {
  throw new Error('VERCEL_TOKEN environment variable is required');
}

const response = await fetch('https://api.vercel.com/v2/deployments', {
  headers: {
    'Authorization': `Bearer ${VERCEL_TOKEN}`
  }
});
```

---

## 📋 Wat Ik Kan Doen Met Deze Token

**Via terminal commands:**
- ✅ Deployment status checken
- ✅ Logs bekijken
- ✅ Projecten lijsten
- ✅ Domains checken

**Maar:**
- ❌ Ik heb geen directe Vercel MCP tools
- ✅ Ik kan je helpen met commands die je lokaal kunt uitvoeren
- ✅ Of scripts maken die de token gebruiken

---

## 🎯 Aanbeveling

**Voor nu:**
- Bewaar token lokaal (niet in git)
- Gebruik Vercel CLI voor automatisering
- Ik help met commands/scripts

**Als Vercel MCP later beschikbaar is:**
- Dan kunnen we de token in MCP configuratie zetten
- Dan kan ik direct Vercel beheren

---

**🔒 Security Best Practices:**
- ✅ Gebruik environment variables
- ✅ Bewaar tokens in `.env.local` (staat in `.gitignore`)
- ✅ Rotate tokens regelmatig
- ✅ Verwijder oude tokens direct
- ❌ NOOIT tokens in code committen
- ❌ NOOIT tokens in documentatie zetten

