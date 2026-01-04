# 📧 Contact Formulier Werkend Maken - Complete Gids

**Status:** Code staat op GitHub, maar formulier werkt mogelijk nog niet op live site

---

## ✅ Wat Is Er Al Gedaan

**Code:**
- ✅ Contact formulier component (`app/contact/page.tsx`)
- ✅ API route (`app/api/contact/route.ts`)
- ✅ Validatie (client-side en server-side)
- ✅ Error handling
- ✅ Success/error messages

**Deployment:**
- ✅ Code gepusht naar GitHub
- ⚠️ Mogelijk nog niet correct gedeployed

---

## 🔍 Diagnose - Wat Werkt Niet?

### Test 1: Is Formulier Zichtbaar?

**Check:**
1. Ga naar: `https://www.seniorease.nl/contact`
2. Zie je het formulier? (naam, email, onderwerp, bericht velden)
3. Of zie je alleen email links?

**Als formulier niet zichtbaar:**
- Hard refresh: `Ctrl + Shift + R`
- Check Vercel deployment
- Force redeploy zonder cache

---

### Test 2: Werkt Submit?

**Check:**
1. Vul formulier in
2. Klik "Verstuur bericht"
3. Wat gebeurt er?
   - Success message verschijnt? ✅
   - Error message verschijnt? ❌
   - Niets gebeurt? ❌

**Als niets gebeurt:**
- Open browser console (F12)
- Check voor JavaScript errors
- Check Network tab → zie je POST naar `/api/contact`?

---

### Test 3: Werkt API Route?

**Test direct:**
```powershell
curl -X POST https://www.seniorease.nl/api/contact `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test\",\"email\":\"test@test.com\",\"subject\":\"algemeen\",\"message\":\"Dit is een test bericht van minimaal 10 tekens\"}'
```

**Verwacht:**
```json
{"success":true,"message":"Contact formulier verzonden"}
```

**Als 404:**
- API route is niet gedeployed
- Force redeploy

**Als 500:**
- Check Vercel logs voor errors
- Mogelijk server-side error

---

## 🔧 Oplossingen

### Oplossing 1: Force Redeploy (Als Formulier Niet Zichtbaar)

1. **Vercel Dashboard:**
   - Project: `seniorease-site`
   - Deployments → Laatste deployment
   - Klik "..." → "Redeploy"
   - **Zet "Use existing Build Cache" = OFF** ⚠️
   - Klik "Redeploy"

2. **Wacht 2-3 minuten**

3. **Test opnieuw:**
   - Hard refresh: `Ctrl + Shift + R`
   - Check of formulier zichtbaar is

---

### Oplossing 2: Check Browser Console

**Als submit niet werkt:**

1. **Open Developer Tools:**
   - Druk `F12`
   - Ga naar **Console** tab

2. **Vul formulier in en submit**

3. **Check errors:**
   - Zie je rode errors?
   - Kopieer de error message

4. **Check Network tab:**
   - Ga naar **Network** tab
   - Submit formulier
   - Zoek naar `/api/contact` request
   - Check status code (200 = goed, 404/500 = error)
   - Check response body

---

### Oplossing 3: Test Lokaal

**Als live site niet werkt, test lokaal:**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test formulier:**
   - Ga naar: `http://localhost:3001/contact`
   - Vul formulier in
   - Submit
   - Werkt dit? ✅

3. **Als lokaal werkt maar live niet:**
   - Deployment probleem
   - Force redeploy

---

## 📋 Checklist

**Voor live site:**
- [ ] Formulier is zichtbaar op `/contact`
- [ ] Alle velden zijn zichtbaar (naam, email, onderwerp, bericht)
- [ ] Validatie werkt (lege velden tonen errors)
- [ ] Submit button werkt
- [ ] Success message verschijnt na submit
- [ ] Geen console errors
- [ ] API route geeft 200 status

**Als iets niet werkt:**
- [ ] Check browser console voor errors
- [ ] Check Network tab voor API response
- [ ] Check Vercel logs voor server errors
- [ ] Test lokaal om te bevestigen dat code werkt

---

## 🎯 Volgende Stappen

**Deel met mij:**
1. **Is formulier zichtbaar?** (ja/nee)
2. **Werkt submit?** (ja/nee/niets gebeurt)
3. **Console errors?** (kopieer errors)
4. **Network tab:** Wat is status code van `/api/contact`?

**Dan kan ik precies zien wat er mis is en het oplossen!** 🔍

---

## 💡 Snelle Test

**Test API direct:**
```bash
node scripts/test-contact-api.js https://www.seniorease.nl/api/contact
```

**Of met curl:**
```powershell
curl -X POST https://www.seniorease.nl/api/contact -H "Content-Type: application/json" -d '{\"name\":\"Test\",\"email\":\"test@test.com\",\"subject\":\"algemeen\",\"message\":\"Dit is een test bericht van minimaal 10 tekens\"}'
```

**Verwacht:** `{"success":true,"message":"Contact formulier verzonden"}`

---

**Laat me weten wat je ziet en ik help het oplossen!** 🔧






