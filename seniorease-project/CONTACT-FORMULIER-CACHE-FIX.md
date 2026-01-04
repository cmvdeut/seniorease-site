# 🔧 Contact Formulier Niet Zichtbaar - Cache Fix

**Probleem:** Contactformulier is niet zichtbaar na deployment

**Mogelijke Oorzaken:**
1. Browser cache
2. Vercel cache
3. Deployment gebruikt oude versie
4. Bestand niet correct gedeployed

---

## ✅ Stap 1: Hard Refresh Browser

**Probeer dit eerst:**

### Chrome/Edge:
- **Windows:** `Ctrl + Shift + R` of `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

### Firefox:
- **Windows:** `Ctrl + Shift + R` of `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

### Safari:
- **Mac:** `Cmd + Option + R`

**Of:**
1. Open Developer Tools (`F12`)
2. Rechtsklik op refresh knop
3. Kies "Empty Cache and Hard Reload"

---

## ✅ Stap 2: Check of Bestand Bestaat

**Test de API route direct:**

Open in browser:
```
https://www.seniorease.nl/api/contact
```

**Verwacht:**
- Als GET: Mogelijk 405 Method Not Allowed (normaal, API accepteert alleen POST)
- Als dit werkt, bestaat de route

**Test met curl (PowerShell):**
```powershell
curl -X POST https://www.seniorease.nl/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@test.com","subject":"algemeen","message":"Dit is een test bericht van minimaal 10 tekens"}'
```

**Verwacht:** `{"success":true,"message":"Contact formulier verzonden"}`

---

## ✅ Stap 3: Check Vercel Deployment

**In Vercel Dashboard:**

1. Ga naar: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Klik op **`seniorease-site`**
3. Ga naar **"Deployments"** tab
4. Check de **meest recente deployment:**
   - Status: **"Ready"** (groen)?
   - Commit message: Bevat "ESLint" of "contact"?
   - Timestamp: Recent (binnen laatste 30 minuten)?

5. **Klik op de deployment** → **"Source"** tab
   - Check of `app/contact/page.tsx` in de deployment zit
   - Check of `app/api/contact/route.ts` in de deployment zit

---

## ✅ Stap 4: Forceer Nieuwe Deployment

**Als deployment oud is:**

### Optie A: Redeploy
1. Vercel Dashboard → `seniorease-site` → Deployments
2. Klik op **"..."** (3 dots) bij laatste deployment
3. Kies **"Redeploy"**
4. Wacht tot deployment klaar is

### Optie B: Trigger via Git
```bash
# Maak kleine change om deployment te triggeren
git commit --allow-empty -m "Trigger: Force redeploy for contact form"
git push origin main
```

---

## ✅ Stap 5: Check Vercel Logs

**In Vercel Dashboard:**

1. Ga naar **"Logs"** tab
2. Check voor errors:
   - Build errors?
   - Runtime errors?
   - Missing files?

**Zoek naar:**
- `app/contact/page.tsx`
- `app/api/contact/route.ts`
- ESLint errors
- TypeScript errors

---

## ✅ Stap 6: Test Lokaal vs Live

**Vergelijk:**

1. **Lokaal:** `http://localhost:3001/contact`
   - Zie je het formulier? ✅
   
2. **Live:** `https://www.seniorease.nl/contact`
   - Zie je het formulier? ❌

**Als lokaal werkt maar live niet:**
- Deployment probleem
- Cache probleem
- Vercel configuratie probleem

---

## 🎯 Quick Fix: Force Cache Clear

**In Vercel Dashboard:**

1. Settings → **Build & Development Settings**
2. Check **"Clear Build Cache"** (als optie beschikbaar)
3. Of: **Redeploy** met "Clear Cache" optie

---

## 📋 Checklist

- [ ] Hard refresh gedaan (Ctrl+Shift+R)
- [ ] API route getest (`/api/contact`)
- [ ] Vercel deployment status gecheckt
- [ ] Deployment logs gecheckt
- [ ] Lokaal vs live vergeleken
- [ ] Cache gecleared

**Laat me weten wat je ziet!** 🔍






