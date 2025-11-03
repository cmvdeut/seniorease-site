# 🔗 Nieuwe Stripe Payment Link Maken (Test Mode)

## 📋 Stap-voor-Stap Instructies

### Stap 1: Zorg dat Test Mode AAN staat
1. Ga naar [dashboard.stripe.com](https://dashboard.stripe.com)
2. Check rechtsboven → **Oranje balk** moet zichtbaar zijn: "Test mode"
3. Als niet → Klik toggle rechtsboven om Test Mode aan te zetten

### Stap 2: Ga naar Payment Links
1. Klik op **Products** (linker menu)
2. Klik op **Payment Links** (submenu)

### Stap 3: Maak Nieuwe Payment Link
1. Klik op **"+ Create payment link"** of **"+ Nieuwe payment link"** (rechtsboven)
2. Je krijgt een wizard/formulier

### Stap 4: Configureer Payment Link

**Optie A: Nieuw Product Maken**
1. Klik **"+ Create new product"** of **"+ Nieuw product"**
2. **Product name**: "SeniorEase Bibliotheek App"
3. **Description** (optioneel): "Mobiele bibliotheek app licentie"
4. Scroll naar beneden
5. Bij **Pricing**:
   - **Price**: `2.99`
   - **Currency**: `EUR` (€)
   - **Billing**: **One time** (eenmalig, geen abonnement)
6. Klik **Save** of **Create product**

**Optie B: Bestaand Product Gebruiken**
- Als je al een product hebt, selecteer die

### Stap 5: Payment Link Instellingen
1. **After payment** sectie:
   - **Success page URL**: `https://seniorease.nl/betalen/success`
   - (Of je Vercel URL als die anders is)
2. **Cancel page URL** (optioneel): `https://seniorease.nl/betalen`
3. **Customer information**: Vink **Email** aan (verplicht)

### Stap 6: Create & Kopieer URL
1. Klik **Create payment link** of **Aanmaken**
2. Je krijgt een **nieuwe Payment Link URL**
3. **KOPIEER DEZE URL** - deze ziet er zo uit:
   ```
   https://buy.stripe.com/test_xxxxxxxxxxxxxxxxx
   ```
4. **Let op:** URL begint met `buy.stripe.com/test_` - dat is goed! ✅

### Stap 7: URL Bewaren
- Kopieer de volledige URL
- Deze heb je nodig om de code te updaten
- Bijvoorbeeld: `https://buy.stripe.com/test_a1b2c3d4e5f6g7h8i9j0`

## ✅ Check of Het Goed Is

**Goede Test Payment Link:**
- ✅ Begint met `https://buy.stripe.com/test_`
- ✅ Zichtbaar in Stripe Dashboard wanneer Test Mode aan staat
- ✅ Werkt met test cards: `4242 4242 4242 4242`

**Foute Payment Link (Live):**
- ❌ Begint met `https://buy.stripe.com/` (geen "test_")
- ❌ Niet zichtbaar in Test Mode
- ❌ Test cards worden geweigerd

---

**Na het maken:** Geef de nieuwe URL door, dan update ik de code! 🚀

