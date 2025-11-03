# 🔧 Stripe Payment Link Test Mode Fix

## ❌ Probleem
- Dashboard staat op Test Mode (oranje balk ✅)
- Maar betaalpagina blijft in Live Mode ❌
- Test cards worden geweigerd

**Oorzaak:** Payment Link zelf staat op Live Mode!

## ✅ Oplossing: Payment Link Test Mode Checken

### Stap 1: Ga naar Payment Links in Test Mode

1. **Stripe Dashboard openen** → Zorg dat **Test Mode aan staat** (oranje balk)
2. Ga naar: **Products** → **Payment Links**
3. Je ziet je Payment Link: `cNi3co3yC45O70b4NM6c000`

### Stap 2: Check Payment Link Mode

**Belangrijk:** In Test Mode zie je alleen **test Payment Links**!

- Als je Payment Link **niet zichtbaar is** in Test Mode
- → Je Payment Link is gemaakt in **Live Mode**
- → Je moet een **nieuwe Payment Link maken** in Test Mode

### Stap 3: Maak Nieuwe Payment Link in Test Mode

1. Zorg dat **Test Mode aan staat** (oranje balk)
2. Ga naar: **Products** → **Payment Links**
3. Klik op **"+ Create payment link"** of **"+ Nieuwe payment link"**
4. Selecteer je product (of maak nieuw product aan)
5. Prijs: **€ 2,99**
6. Klik **Create** of **Aanmaken**
7. **Kopieer de nieuwe Payment Link URL**

### Stap 4: Update Code met Test Payment Link

De nieuwe Payment Link URL ziet er zo uit:
```
https://buy.stripe.com/test_xxxxxxxxxxxxxxxxx
```

Let op het **"test_"** in de URL!

### Stap 5: Test Opnieuw

1. Gebruik de nieuwe test Payment Link URL
2. Test met: `4242 4242 4242 4242`
3. Nu zou het moeten werken! ✅

## 🔄 Alternatief: Check Bestaande Payment Link

Als je Payment Link WEL zichtbaar is in Test Mode:

1. **Klik op de Payment Link** in Test Mode
2. Check **Settings** → **General**
3. Kijk of er iets zegt over **"Mode"**
4. Als de link live is, kopieer de **test versie URL**

## 💡 Belangrijk: Twee Aparte Links

**Stripe maakt automatisch:**
- **Test Payment Link**: `buy.stripe.com/test_xxxxx` (voor Test Mode)
- **Live Payment Link**: `buy.stripe.com/xxxxx` (voor Live Mode)

**Dezelfde link kan niet beide modes gebruiken!**

## 🎯 Quick Fix

1. **Stripe Dashboard** → Test Mode aan (oranje balk)
2. **Products** → **Payment Links**
3. Als link niet zichtbaar → **Maak nieuwe link** in Test Mode
4. Kopieer nieuwe **test Payment Link URL**
5. Update code met nieuwe URL (of gebruik beide - test en live)

## 📝 Code Aanpassen (Optioneel)

Je kunt ook beide links gebruiken:
- Test Mode: `buy.stripe.com/test_xxxxx`
- Live Mode: `buy.stripe.com/xxxxx`

En dan in code detecteren welke mode actief is, maar dat is complexer.

**Simpelste oplossing:** Maak nieuwe Payment Link in Test Mode en gebruik die voor testen!

