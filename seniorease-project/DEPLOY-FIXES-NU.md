# 🚀 Deploy Fixes - Stap voor Stap

**Datum:** 2025-01-27  
**Status:** ✅ Code is klaar voor deployment

---

## ✅ Wat is er gefixed?

1. ✅ **404 pagina** (`app/not-found.tsx`)
2. ✅ **Contact formulier** (`app/contact/page.tsx` + `app/api/contact/route.ts`)
3. ✅ **Error handling** (`app/bibliotheek/page.tsx` - 29 alerts vervangen)

---

## 🚀 Deploy naar Vercel

### Optie 1: Automatische Deploy (als Vercel gekoppeld is aan GitHub)

**Als je Vercel al hebt gekoppeld aan je GitHub repo:**

1. **Push naar GitHub:**
   ```bash
   git add .
   git commit -m "Fix: Add 404 page, contact form, and improve error handling"
   git push origin main
   ```

2. **Vercel deployt automatisch** binnen 1-2 minuten

3. **Check Vercel Dashboard:**
   - Ga naar: [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Zoek je project (waarschijnlijk `seniorease-site` of `seniorease-project`)
   - Check of nieuwe deployment bezig is
   - Wacht tot status **"Ready"** is (groen)

---

### Optie 2: Handmatige Deploy via Vercel CLI

**Als je Vercel CLI hebt geïnstalleerd:**

```bash
# In project folder
cd d:\MAUREEN\DEV\Seniorease\seniorease-project

# Deploy naar productie
vercel --prod
```

**Als je nog niet gelinkt bent:**
```bash
vercel link
vercel --prod
```

---

### Optie 3: Via Vercel Dashboard (Handmatig)

**Als Vercel nog niet gekoppeld is:**

1. **Ga naar Vercel:**
   - [https://vercel.com/new](https://vercel.com/new)

2. **Import GitHub Repository:**
   - Klik "Import Git Repository"
   - Selecteer je repository (bijv. `cmvdeut/seniorease-site`)
   - Klik "Import"

3. **Configureer Project:**
   - Framework: **Next.js** (automatisch gedetecteerd)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `./` (of leeg)

4. **Deploy!**
   - Klik "Deploy"
   - Wacht 1-2 minuten

---

## ✅ Verificatie na Deployment

### Test de Nieuwe Features:

1. **404 Pagina:**
   - Ga naar: `https://jouw-site.vercel.app/onbestaande-pagina`
   - **Verwacht:** Custom 404 pagina (niet standaard Next.js)

2. **Contact Formulier:**
   - Ga naar: `https://jouw-site.vercel.app/contact`
   - **Test:**
     - Leeg formulier → errors
     - Correct invullen → success message
     - Check console (F12) → zie je log: `📧 Contact formulier ontvangen`

3. **Bibliotheek Error Handling:**
   - Ga naar: `https://jouw-site.vercel.app/bibliotheek`
   - **Test:**
     - Voeg 11e boek toe (demo) → rode error banner (geen alert!)
     - Export PDF → groene success message (geen alert!)

---

## 🔍 Check Vercel Logs

Als er problemen zijn:

1. Ga naar Vercel Dashboard
2. Klik op je project
3. Klik op de deployment
4. Klik op **"Logs"** tab
5. Check voor errors

**Veelvoorkomende problemen:**
- Build errors → Check TypeScript errors
- Module not found → Check `package.json` dependencies
- Environment variables → Check Vercel Settings → Environment Variables

---

## 📋 Deployment Checklist

- [ ] Code is gepusht naar GitHub
- [ ] Vercel project is gekoppeld aan GitHub repo
- [ ] Deployment is gestart (automatisch of handmatig)
- [ ] Deployment status is "Ready" (groen)
- [ ] 404 pagina werkt: `/onbestaande-pagina`
- [ ] Contact formulier werkt: `/contact`
- [ ] Bibliotheek heeft geen alerts meer: `/bibliotheek`
- [ ] Geen errors in Vercel logs

---

## 🎉 Klaar!

**Na deployment:**
- ✅ 404 pagina: Custom design
- ✅ Contact formulier: Volledig werkend
- ✅ Error handling: Geen alerts meer

**Test alles live en laat weten of het werkt!** 🚀

---

## 📝 Notities

**Email Service (Later):**
- Contact formulier logt nu alleen in console
- Later kun je Resend/SendGrid/Nodemailer toevoegen
- Zie `app/api/contact/route.ts` voor TODO comment

**Domain:**
- Als je `seniorease.nl` al gekoppeld hebt, werkt het automatisch
- Als niet: Zie `VERCEL-DOMEIN-STAP-VOOR-STAP.md` voor setup






