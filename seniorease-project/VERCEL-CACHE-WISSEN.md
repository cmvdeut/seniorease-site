# 🔧 Vercel Cache Wissen - Demo Mode Fix

**Probleem:** Demo mode elementen zijn nog steeds zichtbaar op live site ondanks fixes

**Oorzaak:** Vercel gebruikt waarschijnlijk oude build cache

---

## ✅ Oplossing: Vercel Cache Wissen

### **Stap 1: Vercel Dashboard**
1. Ga naar: https://vercel.com/dashboard
2. Klik op project: `seniorease-site` (of `seniorease-project`)

### **Stap 2: Force Redeploy Zonder Cache**
1. Ga naar tab: **"Deployments"**
2. Klik op **"..."** (drie puntjes) bij de laatste deployment
3. Kies: **"Redeploy"**
4. **BELANGRIJK:** Zet **"Use existing Build Cache"** = **OFF** ❌
5. Klik: **"Redeploy"**

### **Stap 3: Wacht op Deployment**
- Deployment duurt 2-3 minuten
- Wacht tot status = "Ready" ✅

### **Stap 4: Test**
1. Ga naar: `https://www.seniorease.nl/bibliotheek`
2. Hard refresh: `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
3. Of open in **incognito/private window**

---

## 🔍 Alternatief: Via Vercel CLI

```bash
# Installeer Vercel CLI (als je die nog niet hebt)
npm i -g vercel

# Login
vercel login

# Force redeploy zonder cache
vercel --prod --force
```

---

## ⚠️ Als Het Nog Steeds Niet Werkt

**Mogelijke oorzaken:**
1. Browser cache - probeer incognito window
2. CDN cache - wacht 5-10 minuten
3. Service Worker cache - clear browser cache volledig

**Test in:**
- Incognito/private window
- Andere browser
- Andere device

---

## 📝 Status

**Code op GitHub:** ✅ Geen demo elementen
**Laatste commit:** `Fix: Remove all demo references from comments`
**Datum:** 2025-12-06

**Als demo elementen nog steeds zichtbaar zijn na cache clear:**
- Controleer browser console voor errors
- Check of er service workers actief zijn
- Probeer andere browser/device








