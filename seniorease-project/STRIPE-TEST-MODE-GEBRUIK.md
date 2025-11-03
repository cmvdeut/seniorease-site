# 🧪 Stripe Test Mode Gebruik

## 📍 Waar Vind Je Test Mode?

### Locatie in Stripe Dashboard:

1. **Ga naar:** [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. **Kijk rechtsboven** in de header
3. **Je ziet een toggle/switch** met "Test mode" of "Live mode"

**Of:**

1. Klik op **je account naam** (linksboven)
2. In het dropdown menu zie je: **"Switch to test mode"** of **"Testmodus"**

## 🔄 Test Mode In/Uitschakelen

### Test Mode AAN zetten:
- Klik op de toggle rechtsboven
- Of klik op account naam → "Switch to test mode"
- Je ziet nu een **oranje balk** bovenaan: "Test mode. You're viewing test data"

### Test Mode UIT zetten (Live Mode):
- Klik op de toggle rechtsboven weer
- Of klik op account naam → "Switch to live mode"
- De oranje balk verdwijnt

## 💳 Test Credit Cards

Wanneer je in **Test Mode** bent, gebruik deze test credit cards:

### ✅ Succesvolle Betaling:
```
Kaartnummer: 4242 4242 4242 4242
Vervaldatum: 12/34 (of elke toekomstige datum)
CVC: 123 (of elke 3 cijfers)
ZIP/Postcode: 12345 (of elke 5 cijfers)
```

### ❌ Geweigerde Betaling (testen foutmelding):
```
Kaartnummer: 4000 0000 0000 0002
Vervaldatum: 12/34
CVC: 123
ZIP: 12345
```

### 💳 Andere Test Cards:

**3D Secure vereist:**
```
Kaartnummer: 4000 0027 6000 3184
```

**Insufficient funds:**
```
Kaartnummer: 4000 0000 0000 9995
```

## 🎯 Waarom Test Mode Gebruiken?

1. **Geen echte betalingen** - Test zoveel je wilt zonder kosten
2. **Veilig testen** - Test alle scenario's zonder risico
3. **Test data** - Zie test betalingen in dashboard
4. **Payment Links werken** - Zelfde als live, maar met test data

## 📊 Test Betalingen Zien

1. Ga naar **Payments** in Stripe Dashboard
2. Je ziet alle test betalingen (met "TEST MODE" label)
3. Klik op een betaling om details te zien
4. Test betalingen hebben geen echte waarde

## ⚠️ Belangrijk!

- **Test Mode = Test Data**: Geen echte transacties
- **Live Mode = Echte Betalingen**: Echte credit cards, echte kosten
- **Always test eerst** in Test Mode voordat je naar Live gaat
- **Payment Links** hebben aparte test/live versies

## 🔗 Payment Link Test vs Live

Wanneer je een Payment Link maakt:
- In **Test Mode** → Link is voor test betalingen
- In **Live Mode** → Link is voor echte betalingen
- **Zelfde link, verschillende modes**

## 🧪 Test Flow Compleet

1. **Zet Test Mode aan** in Stripe Dashboard
2. **Ga naar** je betaal pagina: `https://seniorease.nl/betalen`
3. **Vul email in** en klik "Betaal € 2,99"
4. **Gebruik test card**: `4242 4242 4242 4242`
5. **Complete betaling** in Stripe checkout
6. **Wordt doorgestuurd** naar `/betalen/success`
7. **Licentie wordt geactiveerd** en download start automatisch
8. **Check Stripe Dashboard** → Payments → zie test betaling

## 🚀 Na Testen: Switch naar Live

Als alles werkt in Test Mode:

1. **Zet Test Mode UIT** (switch naar Live Mode)
2. **Update Success URL** naar productie domein (als nodig)
3. **Test met kleine echte betaling** (€0.01 als mogelijk)
4. **Monitor betalingen** in dashboard
5. **Go live!** 🎉

---

**Tip:** Houd Test Mode aan tijdens ontwikkeling, switch alleen naar Live voor productie!

