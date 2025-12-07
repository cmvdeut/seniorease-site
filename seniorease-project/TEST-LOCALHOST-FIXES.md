# 🧪 Test de Nieuwe Fixes op Localhost

## ✅ Wat is er gefixed?

1. ✅ **404 pagina** - Custom not-found pagina
2. ✅ **Contact formulier** - Volledig werkend formulier met validatie
3. ✅ **Error handling** - Geen alerts meer, inline error messages

---

## 🚀 Test op Localhost

### Stap 1: Start Development Server

```bash
npm run dev
```

Of als je in de project folder bent:
```bash
cd d:\MAUREEN\DEV\Seniorease\seniorease-project
npm run dev
```

**Verwachte output:**
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

---

## 🧪 Test Checklist

### 1. Test 404 Pagina ✅

**URL:** `http://localhost:3000/onbestaande-pagina`

**Wat moet je zien:**
- ✅ Custom 404 pagina (niet de standaard Next.js 404)
- ✅ SeniorEase logo
- ✅ "Pagina niet gevonden" bericht
- ✅ "Terug naar home" knop
- ✅ Links naar Bibliotheek, Tools, Hulp

**Test:**
1. Ga naar: `http://localhost:3000/test-404`
2. Check of je de custom 404 ziet
3. Klik op "Terug naar home" → moet naar homepage gaan

---

### 2. Test Contact Formulier ✅

**URL:** `http://localhost:3000/contact`

**Wat moet je zien:**
- ✅ Contact formulier met naam, email, onderwerp, bericht velden
- ✅ Validatie (rood als veld leeg is)
- ✅ Success/error messages (geen alerts!)

**Test Scenarios:**

#### Test A: Lege Formulier (Validatie)
1. Ga naar `/contact`
2. Klik op "Verstuur bericht" zonder iets in te vullen
3. **Verwacht:** Rode error messages onder elk veld

#### Test B: Ongeldig Email
1. Vul naam in: "Test"
2. Vul email in: "geen-email" (zonder @)
3. Klik verzenden
4. **Verwacht:** "Ongeldig e-mailadres" error

#### Test C: Succesvol Verzenden
1. Vul alles correct in:
   - Naam: "Test Gebruiker"
   - Email: "test@example.com"
   - Onderwerp: "Algemene vraag"
   - Bericht: "Dit is een test bericht met minimaal 10 tekens"
2. Klik "Verstuur bericht"
3. **Verwacht:** 
   - ✅ Groene success message: "Bericht verzonden!"
   - ✅ Formulier wordt leeg gemaakt
   - ✅ In console: `📧 Contact formulier ontvangen: {...}`

#### Test D: Te Kort Bericht
1. Vul alles in, maar bericht = "kort" (minder dan 10 tekens)
2. Klik verzenden
3. **Verwacht:** "Bericht moet minimaal 10 tekens bevatten"

---

### 3. Test Error Handling in Bibliotheek ✅

**URL:** `http://localhost:3000/bibliotheek`

**Wat moet je zien:**
- ✅ Geen `alert()` popups meer!
- ✅ Inline error messages (bovenin de pagina)
- ✅ Success messages (groen)
- ✅ Error messages (rood) met sluitknop

**Test Scenarios:**

#### Test A: Demo Limiet
1. Ga naar `/bibliotheek`
2. Voeg 10 boeken toe (als demo mode)
3. Probeer 11e boek toe te voegen
4. **Verwacht:** 
   - ❌ Geen alert popup!
   - ✅ Rode error banner: "Demo limiet bereikt!"

#### Test B: PDF Download
1. Voeg een boek toe
2. Klik op menu → Export → PDF
3. **Verwacht:**
   - ✅ Groene success message: "PDF succesvol gedownload!"
   - ❌ Geen alert popup!

#### Test C: Camera Error (als HTTPS niet beschikbaar)
1. Klik op "Barcode Scannen"
2. Als camera niet werkt (HTTP in plaats van HTTPS)
3. **Verwacht:**
   - ✅ Rode error banner met duidelijke uitleg
   - ❌ Geen alert popup!

---

## 🔍 Check Console

Open browser console (F12) en check:

**Bij Contact Formulier:**
```
📧 Contact formulier ontvangen: {
  name: "Test Gebruiker",
  email: "test@example.com",
  subject: "algemeen",
  message: "Dit is een test bericht...",
  timestamp: "2025-01-27T..."
}
```

**Geen Errors:**
- ❌ Geen rode errors in console
- ✅ Alleen info logs

---

## ✅ Success Checklist

- [ ] 404 pagina werkt: `/onbestaande-pagina`
- [ ] Contact formulier validatie werkt
- [ ] Contact formulier verzenden werkt (check console)
- [ ] Bibliotheek heeft geen alerts meer
- [ ] Error messages zijn inline (bovenin pagina)
- [ ] Success messages zijn inline (groen)
- [ ] Alles werkt zonder errors in console

---

## 🐛 Als Iets Niet Werkt

### Probleem: "Cannot find module"
**Oplossing:**
```bash
npm install
```

### Probleem: Port 3000 al in gebruik
**Oplossing:**
```bash
# Stop andere processen op port 3000
# Of gebruik andere port:
npm run dev -- -p 3001
```

### Probleem: TypeScript errors
**Oplossing:**
```bash
npm run build
# Check errors en fix ze
```

### Probleem: Contact formulier geeft error
**Check:**
1. Is development server gestart? (`npm run dev`)
2. Check browser console (F12) voor errors
3. Check terminal waar `npm run dev` draait voor server errors

---

## 🎉 Klaar!

Als alles werkt:
- ✅ 404 pagina: Custom design
- ✅ Contact formulier: Volledig werkend
- ✅ Error handling: Geen alerts meer

**Volgende stap:** Deploy naar Vercel om live te testen! 🚀

