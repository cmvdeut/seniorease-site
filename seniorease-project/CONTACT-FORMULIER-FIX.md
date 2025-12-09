# 🔧 Contact Formulier Fix - Werkend Maken

**Probleem:** Contact formulier werkt nog niet

**Status:**
- ✅ Code staat op GitHub
- ✅ Formulier component bestaat
- ✅ API route bestaat
- ⚠️ Mogelijk deployment of test probleem

---

## 🔍 Diagnose

### Stap 1: Test Lokaal

**Start development server:**
```bash
npm run dev
```

**Test formulier:**
1. Ga naar: `http://localhost:3001/contact`
2. Vul formulier in
3. Klik "Verstuur bericht"
4. Check browser console (F12) voor errors

**Test API direct:**
```bash
node scripts/test-contact-api.js
```

**Of met curl:**
```powershell
curl -X POST http://localhost:3001/api/contact `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test\",\"email\":\"test@test.com\",\"subject\":\"algemeen\",\"message\":\"Dit is een test bericht van minimaal 10 tekens\"}'
```

---

### Stap 2: Check Live Site

**Test op productie:**
1. Ga naar: `https://www.seniorease.nl/contact`
2. Vul formulier in
3. Klik "Verstuur bericht"
4. Check browser console (F12) voor errors

**Test API direct:**
```powershell
curl -X POST https://www.seniorease.nl/api/contact `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test\",\"email\":\"test@test.com\",\"subject\":\"algemeen\",\"message\":\"Dit is een test bericht van minimaal 10 tekens\"}'
```

**Verwacht:** `{"success":true,"message":"Contact formulier verzonden"}`

---

## 🐛 Veelvoorkomende Problemen

### Probleem 1: API Route Niet Gevonden (404)

**Symptomen:**
- Console error: `Failed to fetch` of `404 Not Found`
- Network tab toont 404 voor `/api/contact`

**Oplossing:**
- Check of `app/api/contact/route.ts` bestaat
- Check Vercel deployment logs
- Force redeploy zonder cache

### Probleem 2: CORS Error

**Symptomen:**
- Console error: `CORS policy` of `Access-Control-Allow-Origin`
- Request faalt met CORS error

**Oplossing:**
- Next.js API routes hebben geen CORS probleem (same origin)
- Als dit voorkomt, check deployment

### Probleem 3: Formulier Niet Zichtbaar

**Symptomen:**
- Pagina laadt maar formulier is niet zichtbaar
- Alleen email links zichtbaar

**Oplossing:**
- Hard refresh: `Ctrl + Shift + R`
- Check of deployment de nieuwe versie heeft
- Check browser console voor JavaScript errors

### Probleem 4: Submit Werkt Niet

**Symptomen:**
- Formulier is zichtbaar
- Submit button doet niets
- Geen success/error message

**Oplossing:**
- Check browser console voor JavaScript errors
- Check Network tab → zie je POST naar `/api/contact`?
- Check response status (200 = goed, 400/500 = error)

---

## ✅ Verificatie Checklist

**Lokaal testen:**
- [ ] Development server draait (`npm run dev`)
- [ ] Formulier is zichtbaar op `/contact`
- [ ] Validatie werkt (lege velden tonen errors)
- [ ] Submit werkt (success message verschijnt)
- [ ] API route werkt (test script geeft success)

**Live testen:**
- [ ] Formulier is zichtbaar op `https://www.seniorease.nl/contact`
- [ ] Submit werkt
- [ ] Success message verschijnt
- [ ] Geen console errors

---

## 🔧 Quick Fixes

### Fix 1: Force Redeploy

**Als formulier niet zichtbaar is:**
1. Vercel Dashboard → `seniorease-site` → Deployments
2. Klik "..." bij laatste deployment
3. Kies "Redeploy"
4. Zet "Use existing Build Cache" = OFF
5. Klik "Redeploy"

### Fix 2: Check Deployment Logs

**Als submit niet werkt:**
1. Vercel Dashboard → Laatste deployment → Logs
2. Zoek naar errors bij `/api/contact`
3. Check of route correct is gebuild

### Fix 3: Test API Direct

**Test of API werkt:**
```bash
node scripts/test-contact-api.js https://www.seniorease.nl/api/contact
```

---

## 📋 Wat Te Checken

**1. Browser Console (F12):**
- Zie je JavaScript errors?
- Zie je network errors?
- Wat is de response van `/api/contact`?

**2. Network Tab:**
- Zie je POST request naar `/api/contact`?
- Wat is de status code? (200 = goed)
- Wat is de response body?

**3. Vercel Logs:**
- Zie je de log: `📧 Contact formulier ontvangen:`?
- Zie je errors in deployment logs?

---

**Deel de errors die je ziet en ik help verder!** 🔍


