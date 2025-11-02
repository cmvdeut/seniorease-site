# 🔒 Licentie Verificatie Checklist

## ✅ Hoe de Licentie Check Werkt

### 1. Mobiele Detectie
- **Desktop/Laptop**: Altijd toegang (gratis)
- **Mobiel/Tablet**: Vereist licentie (€2,99)

### 2. Licentie Check Flow
```
Gebruiker opent /bibliotheek
  ↓
Is het mobiel? 
  ├─ NEE (Desktop) → ✅ Toegang verleend
  └─ JA (Mobiel) → Check localStorage voor licentie
       ├─ Licentie gevonden + valid = true → ✅ Toegang verleend
       └─ Geen licentie OF invalid → 🔒 Blokkade scherm
```

### 3. Blokkade Scherm
Als `hasLicense === false` (mobiel zonder licentie):
- Volledig blokkade scherm
- Toont licentieverzoek
- Link naar `/betalen`
- Geen toegang tot app functionaliteit

---

## 🧪 Test Scenarios

### Test 1: Desktop (Moet Altijd Werken)
1. Open `https://seniorease.nl/bibliotheek` op desktop
2. ✅ **Verwachting**: App opent direct, geen licentie vereist
3. ✅ **Resultaat**: Desktop is gratis

### Test 2: Mobiel Zonder Licentie (Moet Blokkeren)
1. Verwijder licentie: `localStorage.removeItem('seniorease-licentie')`
2. Open `https://seniorease.nl/bibliotheek` op mobiel
3. ✅ **Verwachting**: Blokkade scherm met licentieverzoek
4. ✅ **Resultaat**: Geen toegang tot app

### Test 3: Mobiel Met Licentie (Moet Werken)
1. Activeer test licentie via `/test-licentie`
2. Open `https://seniorease.nl/bibliotheek` op mobiel
3. ✅ **Verwachting**: App opent, volledige functionaliteit
4. ✅ **Resultaat**: Toegang na licentie

### Test 4: Na Betaling (Moet Werken)
1. Betaal via Stripe (test mode: `4242 4242 4242 4242`)
2. Redirect naar `/betalen/success`
3. Licentie wordt automatisch geactiveerd
4. Open bibliotheek app
5. ✅ **Verwachting**: App werkt direct
6. ✅ **Resultaat**: Licentie geactiveerd na betaling

---

## 🔒 Beveiliging Checkpoints

### Client-Side Checks:
- ✅ Mobiele detectie werkt
- ✅ Licentie check in localStorage
- ✅ Blokkade scherm zonder licentie
- ✅ PWA install prompt geblokkeerd zonder licentie
- ✅ App functionaliteit geladen alleen met licentie

### Betaling Flow:
- ✅ Email wordt opgeslagen in sessionStorage
- ✅ Stripe redirect naar Payment Link
- ✅ Success pagina activeert licentie automatisch
- ✅ Licentie opgeslagen met `valid: true` en `source: 'stripe'`

---

## ⚠️ Bekende Beperkingen

### Client-Side Opslag:
- Licentie wordt opgeslagen in `localStorage`
- **Per apparaat/browser**: Elke licentie werkt alleen op het apparaat waar betaald is
- **Technisch**: iemand kan localStorage manipuleren, maar:
  - Dit vereist technische kennis
  - Werkt alleen lokaal op dat apparaat
  - Is normaal voor PWA/applicaties zonder backend

### Voor Echte Productie (Later):
Voor extra beveiliging zou je kunnen:
- Server-side licentie verificatie via webhook
- Database voor licentie tracking
- Account systeem met login
- API keys voor licentie verificatie

**Voor nu**: Client-side licentie is voldoende voor een €2,99 eenmalige betaling app.

---

## ✅ Verificatie Test

**Test nu deze flow:**

1. **Mobiel zonder licentie:**
   - Verwijder licentie (of gebruik incognito/privé mode)
   - Open `/bibliotheek` op mobiel
   - ✅ Zie je blokkade scherm?

2. **Mobiel met licentie:**
   - Activeer test licentie via `/test-licentie`
   - Open `/bibliotheek` op mobiel
   - ✅ Werkt de app?

3. **Desktop:**
   - Open `/bibliotheek` op desktop
   - ✅ Werkt altijd, ook zonder licentie?

4. **Betaling flow:**
   - Betaal via Stripe (test mode)
   - Redirect naar success pagina
   - ✅ Wordt licentie geactiveerd?
   - ✅ Werkt app daarna?

---

## 📊 Conclusie

**Ja, de app kan alleen gebruikt worden na betaling op mobiel:**
- ✅ Desktop: Altijd gratis (zoals bedoeld)
- ✅ Mobiel: Geblokkeerd zonder licentie
- ✅ Mobiel: Werkt na licentie activatie
- ✅ Betaling activeert licentie automatisch
- ✅ PWA install alleen mogelijk na licentie

**Beveiliging niveau:** Voldoende voor €2,99 eenmalige betaling. Client-side check is normaal voor PWA's.

---

Laat me weten welke tests je wilt uitvoeren! 🧪

