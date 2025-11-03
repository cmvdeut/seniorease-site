# 🔒 Stripe Test Mode Blijft Aan - Oplossingen

## ❌ Probleem: Test Mode gaat automatisch uit

Stripe heeft soms een instelling die automatisch terugschakelt naar Live Mode. Hier zijn oplossingen:

## ✅ Oplossing 1: Browser Instellingen Checken

### Chrome/Edge:
1. Open **Developer Tools** (F12)
2. Ga naar **Application** tab
3. Kijk onder **Cookies** → `https://dashboard.stripe.com`
4. **Verwijder** cookies voor Stripe
5. **Log opnieuw in** en zet Test Mode aan
6. **Allow cookies** voor Stripe (niet blokkeren)

### Safari:
1. **Preferences** → **Privacy**
2. Zorg dat cookies **niet geblokkeerd** zijn
3. Verwijder Stripe cookies en log opnieuw in

## ✅ Oplossing 2: Stripe Account Instellingen

1. Ga naar **Settings** (⚙️) in Stripe Dashboard
2. Ga naar **Account settings**
3. Check of er een instelling staat voor **automatic mode switching**
4. Zet deze UIT als die er is

## ✅ Oplossing 3: Nieuw Tabblad Openen

Soms helpt het om:
1. **Stripe Dashboard te openen** in een nieuw tabblad
2. **Log opnieuw in** als nodig
3. **Zet Test Mode aan**
4. **Laat het tabblad open** tijdens testen

## ✅ Oplossing 4: Incognito/Private Mode (Tijdelijk)

Voor testen:
1. Open **Incognito/Private window** (Chrome: Ctrl+Shift+N, Edge: Ctrl+Shift+P)
2. Ga naar Stripe Dashboard
3. Log in en zet Test Mode aan
4. Test in hetzelfde incognito window
5. **Voordeel:** Geen cookie conflicts

## ✅ Oplossing 5: Bookmarks met Test Mode

Maak een bookmark aan die direct naar Test Mode gaat:

1. Ga naar Stripe Dashboard
2. Zet Test Mode aan
3. Kopieer de URL (bijv. `https://dashboard.stripe.com/test/...`)
4. Maak bookmark met naam: "Stripe Test Mode"
5. Gebruik deze bookmark om direct in Test Mode te komen

## ✅ Oplossing 6: Browser Extension Controleren

Sommige browser extensions kunnen Stripe cookies blokkeren:
1. **Disable ad blockers** tijdelijk
2. **Disable privacy extensions** (zoals Privacy Badger)
3. **Whitelist** `dashboard.stripe.com` in extensions

## 🎯 Quick Fix (Meest Effectief)

1. **Open Stripe Dashboard** in nieuw incognito window
2. **Log in** en zet **Test Mode aan**
3. **Test je betaling** in hetzelfde window
4. Test Mode blijft aan in dat window

## 💡 Waarom Gaat Het Uit?

Mogelijke redenen:
- **Browser cookies** worden gewist
- **Browser sessie** verloopt
- **Stripe update** die settings reset
- **Multiple tabs** met verschillende modes
- **Browser extension** die cookies blokkeert

## 🔍 Check Huidige Mode

Altijd checken voordat je test:
- **Oranje balk bovenaan** = Test Mode ✅
- **Geen balk** = Live Mode ❌

## 📝 Workaround Tijdens Testen

Als het blijft gebeuren:
1. **Noteer de test credit card**: `4242 4242 4242 4242`
2. **Test altijd eerst** voordat je naar klant gaat
3. **Check Stripe Dashboard** voor elke betaling
4. **Gebruik incognito mode** voor belangrijke tests

---

**Tip:** Als het blijft gebeuren, kan het een Stripe account setting zijn. Neem contact op met Stripe support als het probleem aanhoudt.

