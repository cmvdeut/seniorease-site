# 🚨 Force Vercel Redeploy - Demo Mode Fix

**Probleem:** Live site toont nog steeds demo mode, maar lokale code heeft geen demo elementen.

**Oplossing:** Force Vercel om opnieuw te deployen zonder cache.

---

## ✅ Stap 1: Check GitHub

1. Ga naar: https://github.com/[jouw-username]/seniorease-project
2. Check of laatste commit zichtbaar is: "Test: Add visible timestamp to verify deployment - NO DEMO MODE"
3. Check of `app/bibliotheek/page.tsx` de nieuwe code heeft (geen demo elementen)

---

## ✅ Stap 2: Force Vercel Redeploy

### Optie A: Via Vercel Dashboard (Aanbevolen)

1. **Ga naar:** https://vercel.com/dashboard
2. **Selecteer project:** `seniorease-site` (of `seniorease-project`)
3. **Ga naar:** "Deployments" tab
4. **Klik op:** Laatste deployment (drie puntjes menu)
5. **Kies:** "Redeploy"
6. **BELANGRIJK:** Vink aan: "Use existing Build Cache" → **UITZETTEN** ❌
7. **Klik:** "Redeploy"
8. **Wacht:** 2-3 minuten

### Optie B: Via Vercel CLI

```bash
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
vercel --prod --force
```

### Optie C: Via GitHub Push (Trigger Automatisch)

```bash
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
git commit --allow-empty -m "Force redeploy - remove demo mode"
git push origin main
```

---

## ✅ Stap 3: Test Na Deployment

1. **Wacht 2-3 minuten** na deployment
2. **Ga naar:** `https://www.seniorease.nl/bibliotheek`
3. **Check:**
   - ✅ Zie je "Update 2025-12-06 21:15" onder de titel?
   - ✅ Is de gele demo banner weg?
   - ✅ Is "Demo (max 10 items)" label weg?
   - ✅ Is "Koop licentie" knop weg?

---

## 🔍 Als Demo Mode Nog Steeds Zichtbaar Is

**Mogelijke oorzaken:**

1. **DNS wijst naar Strato (oude versie)**
   - Oplossing: Update DNS bij Strato naar Vercel

2. **Browser cache**
   - Oplossing: Test in incognito window of hard refresh (Ctrl+Shift+R)

3. **Vercel deployment niet actief**
   - Oplossing: Check Vercel dashboard → laatste deployment status

4. **Oude build cache**
   - Oplossing: Force redeploy **zonder cache** (zie Stap 2)

---

## 📋 Checklist

- [ ] GitHub heeft nieuwe code (geen demo elementen)
- [ ] Vercel redeploy gedaan (zonder cache)
- [ ] Deployment status: "Ready" ✅
- [ ] Test timestamp zichtbaar: "Update 2025-12-06 21:15"
- [ ] Demo mode elementen weg ✅

---

**Laat weten wat je ziet na redeploy!** 🔍


