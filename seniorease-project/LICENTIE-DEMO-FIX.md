# 🔧 Licentie Check Fix - Demo Mode Probleem

**Probleem:** Bibliotheek opent altijd demo versie, ook met licentie

**Oorzaak:** Licentie check was te strikt en ondersteunde niet alle licentie formaten

---

## ✅ Oplossing

**Verbeterde licentie check:**
- ✅ Ondersteunt nieuw formaat: `{ valid: true, code: "...", ... }`
- ✅ Ondersteunt oud formaat: string `"actief"`
- ✅ Auto-upgrade van oud naar nieuw formaat
- ✅ Betere error handling en logging

---

## 🔍 Wat Is Aangepast

**Bestand:** `app/bibliotheek/page.tsx`

**Voor:**
- Alleen check op `licentieData.valid === true`
- Geen ondersteuning voor oude formaten
- Geen fallback

**Na:**
- Check op nieuw formaat: `{ valid: true }`
- Check op oud formaat: string `"actief"`
- Auto-upgrade van oud naar nieuw formaat
- Console logging voor debugging

---

## 🧪 Test Nu

**Stap 1: Check licentie**
1. Open browser console (F12)
2. Ga naar: `https://www.seniorease.nl/bibliotheek`
3. Check console voor:
   - `✅ Licentie gevonden` → Licentie werkt
   - `ℹ️ Geen licentie gevonden - demo mode actief` → Geen licentie

**Stap 2: Test met licentie**
1. Als je een licentie hebt, check of deze wordt herkend
2. Als demo mode nog steeds actief is:
   - Check console voor licentie format
   - Check localStorage: `localStorage.getItem('seniorease-licentie')`

**Stap 3: Test licentie activatie**
1. Ga naar: `/betalen` of `/activeer-licentie`
2. Activeer licentie
3. Ga naar: `/bibliotheek`
4. Check of demo mode weg is

---

## 🔍 Debugging

**Check licentie in console:**
```javascript
// Check licentie waarde
localStorage.getItem('seniorease-licentie')

// Check licentie format
JSON.parse(localStorage.getItem('seniorease-licentie'))
```

**Verwachte formaten:**
```javascript
// Nieuw formaat (correct)
{
  "code": "SE-1234567890-ABC123",
  "email": "test@example.com",
  "date": "2025-01-27T...",
  "valid": true,
  "source": "stripe"
}

// Oud formaat (wordt geüpgraded)
"actief"
```

---

## ✅ Volgende Stappen

**Na deployment:**
1. Test op live site
2. Check console logs
3. Als nog steeds demo mode:
   - Deel console output
   - Deel licentie waarde (zonder gevoelige info)

---

**Fix is gepusht - test nu op live site!** 🚀








