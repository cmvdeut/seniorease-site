# ✅ Stripe Test Mode Controleren - Checklist

## ❌ Foutmelding die je krijgt:
"Je kaart is geweigerd. Je aanvraag vond plaats in de livemodus, maar er is een bekende testkaart gebruikt."

**Betekenis:** Je bent in **Live Mode** maar gebruikt een **test card**. Dit kan niet!

## ✅ Oplossing: Zorg dat Test Mode echt AAN staat

### Stap 1: Check Stripe Dashboard
1. Ga naar: [dashboard.stripe.com](https://dashboard.stripe.com)
2. Kijk **rechtsboven** in de header
3. Je moet zien: **"Test mode"** toggle met **ORANJE balk** bovenaan
4. Als je **geen oranje balk** ziet → Je bent in Live Mode! ❌

### Stap 2: Zet Test Mode Aan
1. Klik op de toggle rechtsboven
2. Je moet nu zien:
   - **Oranje balk bovenaan:** "Test mode. You're viewing test data"
   - Toggle staat op "Test mode"
3. **Belangrijk:** Wacht even (2-3 seconden) tot Test Mode echt actief is

### Stap 3: Verifieer Test Mode
**Check deze dingen:**
- ✅ **Oranje balk** bovenaan Stripe Dashboard
- ✅ Toggle zegt **"Test mode"** (niet "Live mode")
- ✅ In URL zie je mogelijk `/test/` in het pad
- ✅ Betaal pagina's zeggen "Test mode" bovenaan

### Stap 4: Refresh je Betaal Pagina
1. Ga naar: `https://seniorease.nl/betalen`
2. **Refresh de pagina** (F5 of Ctrl+R)
3. Dit zorgt dat de pagina de juiste mode gebruikt

### Stap 5: Test Opnieuw
1. Vul email in
2. Klik "Betaal € 2,99"
3. Gebruik test card: `4242 4242 4242 4242`
4. Nu zou het moeten werken! ✅

## 🔍 Als Het Nog Steeds Niet Werkt

### Check 1: Multiple Stripe Accounts?
- Zorg dat je op het **juiste Stripe account** bent ingelogd
- Check of je meerdere accounts hebt

### Check 2: Browser Cache
1. **Clear cache** voor Stripe (Ctrl+Shift+Delete)
2. Of gebruik **Incognito/Private mode**
3. Log opnieuw in bij Stripe
4. Zet Test Mode aan
5. Test opnieuw

### Check 3: Payment Link Settings
1. Ga naar **Products** → **Payment Links** in Stripe
2. Check of je Payment Link op **Test mode** staat
3. Payment Links hebben soms aparte test/live versies

### Check 4: Browser Extensions
- **Disable ad blockers** tijdelijk
- **Disable privacy extensions**
- Deze kunnen Stripe cookies blokkeren

## 🎯 Snelle Fix (Meest Betrouwbaar)

1. **Open Incognito/Private window** (Ctrl+Shift+N)
2. **Ga naar Stripe Dashboard** → Log in
3. **Zet Test Mode aan** → Check oranje balk
4. **Open nieuw tabblad** (nog steeds incognito)
5. **Ga naar** `seniorease.nl/betalen`
6. **Test betaling** met `4242 4242 4242 4242`
7. ✅ Zou nu moeten werken!

## 💡 Test Card Werkt Alleen in Test Mode

**Belangrijk:**
- `4242 4242 4242 4242` werkt **ALLEEN** in Test Mode
- Als deze kaart wordt geweigerd → Je bent in Live Mode
- Als deze kaart werkt → Je bent in Test Mode ✅

## ⚠️ Live Mode = Echte Betalingen

**PAS OP:**
- In Live Mode worden **echte credit cards** geaccepteerd
- Echte betalingen worden **echt afgeschreven**
- Gebruik **NOOIT** een echte credit card in Test Mode om te testen
- Gebruik **ALTIJD** test cards in Test Mode

---

**Samenvatting:** Als je deze fout krijgt, ben je in Live Mode. Zet Test Mode aan in Stripe Dashboard en refresh je betaal pagina!

