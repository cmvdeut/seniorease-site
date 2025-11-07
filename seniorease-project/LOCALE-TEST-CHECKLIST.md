# ✅ Locale Test Checklist - Rekenmachine & Homepage Updates

## 🚀 Server Starten

De development server draait op: **http://localhost:3000**

Als de server nog niet klaar is, wacht even (kan 10-30 seconden duren).

---

## 📋 Test Checklist

### **1. Homepage Testen** ✅

**URL:** http://localhost:3000

**Te controleren:**
- [ ] Homepage laadt correct
- [ ] Nieuwe sectie "🛠️ Handige Tools" is zichtbaar
- [ ] Rekenmachine card is zichtbaar (met 🔢 icoon)
- [ ] Grote Klok card is zichtbaar
- [ ] Dagelijkse Puzzel card is zichtbaar
- [ ] Alle 3 tools staan in een rij (op desktop)
- [ ] Layout ziet er goed uit (geen overlap, alles netjes)

**Problemen om te checken:**
- ❌ Geen layout breaks
- ❌ Geen missing images
- ❌ Geen console errors (F12 → Console)

---

### **2. Rekenmachine Testen** ✅

**URL:** http://localhost:3000/rekenmachine

**Te controleren:**
- [ ] Pagina laadt correct
- [ ] Display toont "0" bij start
- [ ] Grote knoppen zijn zichtbaar (minimaal 80x80px)
- [ ] Display is groot en duidelijk
- [ ] "Terug naar home" knop werkt

**Functionaliteit testen:**
- [ ] **Cijfers:** Klik 1, 2, 3 → Display toont "123"
- [ ] **Decimalen:** Klik 5, dan . (punt), dan 5 → Display toont "5.5"
- [ ] **Optellen:** 5 + 3 = → Display toont "8"
- [ ] **Aftrekken:** 10 - 4 = → Display toont "6"
- [ ] **Vermenigvuldigen:** 4 × 3 = → Display toont "12"
- [ ] **Delen:** 15 ÷ 3 = → Display toont "5"
- [ ] **Wissen:** Klik "Wissen" → Display toont "0"
- [ ] **Meerdere bewerkingen:** 5 + 3 × 2 = → Test of het correct werkt

**Design testen:**
- [ ] Knoppen hebben goede hover effect
- [ ] Display heeft goede contrast
- [ ] Alles is goed leesbaar
- [ ] Responsive op mobiel (test met F12 → Device Toolbar)

---

### **3. Navigatie Testen** ✅

**Te controleren:**
- [ ] Van homepage naar rekenmachine werkt
- [ ] Van rekenmachine terug naar homepage werkt
- [ ] Andere links werken nog (Bibliotheek, Klok, Puzzels)
- [ ] Geen 404 errors

---

### **4. Responsive Design Testen** ✅

**Test op verschillende schermformaten:**

**Desktop (1920x1080):**
- [ ] Alles ziet er goed uit
- [ ] Tools staan in 3 kolommen

**Tablet (768x1024):**
- [ ] Tools staan in 2-3 kolommen
- [ ] Alles past nog op scherm

**Mobiel (375x667):**
- [ ] Tools staan onder elkaar (1 kolom)
- [ ] Rekenmachine knoppen zijn nog groot genoeg
- [ ] Alles is goed leesbaar

**Hoe testen:**
1. Druk F12 (Developer Tools)
2. Druk Ctrl+Shift+M (Device Toolbar)
3. Kies verschillende apparaten

---

### **5. Browser Compatibiliteit** ✅

**Test in verschillende browsers:**
- [ ] Chrome/Edge (moderne browser)
- [ ] Firefox (als je die hebt)
- [ ] Safari (als je Mac hebt)

**Te controleren:**
- [ ] Rekenmachine werkt in alle browsers
- [ ] Geen JavaScript errors
- [ ] Styling ziet er hetzelfde uit

---

### **6. Performance Testen** ✅

**Te controleren:**
- [ ] Pagina laadt snel (< 3 seconden)
- [ ] Rekenmachine reageert snel op klikken
- [ ] Geen lag bij berekeningen
- [ ] Geen memory leaks (check met F12 → Performance)

---

## 🐛 Bekende Problemen om te Checken

### **Rekenmachine:**
- ❌ Display wordt niet gereset na "="
- ❌ Decimalen werken niet goed
- ❌ Delen door 0 geeft error (moet "0" geven of foutmelding)
- ❌ Meerdere bewerkingen achter elkaar werken niet

### **Homepage:**
- ❌ Layout breekt op kleine schermen
- ❌ Rekenmachine card is niet zichtbaar
- ❌ Sectie titel is niet zichtbaar

---

## ✅ Als Alles Werkt

**Dan kunnen we:**
1. ✅ Git commit maken
2. ✅ Push naar GitHub
3. ✅ Vercel deployt automatisch
4. ✅ Testen op live site (seniorease.nl)

---

## 🆘 Als Er Problemen Zijn

**Noteer:**
- Welke pagina
- Wat het probleem is
- Screenshot (als mogelijk)
- Browser console errors (F12 → Console)

**Dan kunnen we het fixen voordat we deployen!**

---

## 📝 Test Resultaten

**Datum:** _____________  
**Tester:** _____________  

**Homepage:**
- [ ] Werkt correct
- [ ] Problemen: ________________

**Rekenmachine:**
- [ ] Werkt correct
- [ ] Problemen: ________________

**Navigatie:**
- [ ] Werkt correct
- [ ] Problemen: ________________

**Responsive:**
- [ ] Werkt correct
- [ ] Problemen: ________________

**Algemeen:**
- [ ] Klaar voor deploy
- [ ] Nog problemen om op te lossen

---

**Succes met testen! 🧪**


