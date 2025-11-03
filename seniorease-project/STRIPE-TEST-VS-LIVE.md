# 🔄 Stripe Test vs Live Mode - Payment Links

## 📋 Overzicht

Je hebt **twee aparte Payment Links** nodig:
- **Test Link**: Voor testen (werkt alleen met test cards)
- **Live Link**: Voor echte betalingen (werkt met echte credit cards)

## 🔗 Je Payment Links

### Test Payment Link:
```
https://buy.stripe.com/test_cNi3co3yC45O70b4NM6c000
```
- Gebruik: Testen en development
- Werkt alleen in Stripe Test Mode
- Test cards: `4242 4242 4242 4242`

### Live Payment Link:
```
https://buy.stripe.com/cNi3co3yC45O70b4NM6c000
```
- Gebruik: Echte productie betalingen
- Werkt alleen in Stripe Live Mode
- Echte credit cards

## ⚙️ Automatische Detectie (Huidige Setup)

De code detecteert automatisch:
- **Development/Test**: Gebruikt test link (localhost of vercel.app)
- **Production**: Gebruikt live link (seniorease.nl)

**Dit betekent:**
- ✅ Testen op Vercel → gebruikt automatisch test link
- ✅ Productie op seniorease.nl → gebruikt automatisch live link
- ✅ Lokaal testen → gebruikt automatisch test link

## 🔧 Handmatig Wisselen (Als Nodig)

Als je handmatig wilt wisselen, pas dit aan in `app/betalen/page.tsx`:

**Voor Test Mode:**
```typescript
const paymentLink = 'https://buy.stripe.com/test_cNi3co3yC45O70b4NM6c000';
```

**Voor Live Mode:**
```typescript
const paymentLink = 'https://buy.stripe.com/cNi3co3yC45O70b4NM6c000';
```

## ✅ Check Lijst voor Productie

Voor echte betalingen:

1. ✅ **Stripe Dashboard** → Zet **Live Mode aan** (geen oranje balk)
2. ✅ **Code** → Gebruikt automatisch live link op seniorease.nl
3. ✅ **Payment Link** → Live link is zichtbaar in Live Mode
4. ✅ **Test** → Test met kleine echte betaling (€0.01 als mogelijk)
5. ✅ **Success URL** → Check of deze correct is in Stripe Dashboard

## 🧪 Test Checklist

Voor testen:

1. ✅ **Stripe Dashboard** → Zet **Test Mode aan** (oranje balk)
2. ✅ **Code** → Gebruikt automatisch test link op Vercel/localhost
3. ✅ **Payment Link** → Test link is zichtbaar in Test Mode
4. ✅ **Test Card** → Gebruik `4242 4242 4242 4242`
5. ✅ **Test** → Complete flow testen

## 💡 Belangrijk

- **Test Link** werkt alleen in Stripe Test Mode
- **Live Link** werkt alleen in Stripe Live Mode
- **Code detecteert automatisch** welke link te gebruiken
- **Handmatig wisselen** is niet nodig als je seniorease.nl gebruikt voor productie

## 🎯 Wat Gebeurt Er Nu?

**Op seniorease.nl (productie):**
- Code gebruikt automatisch **live link**
- Stripe moet in **Live Mode** staan
- Echte betalingen worden verwerkt

**Op Vercel/localhost (testen):**
- Code gebruikt automatisch **test link**
- Stripe moet in **Test Mode** staan
- Test betalingen worden verwerkt

---

**Je hoeft niets handmatig te wisselen!** De code doet het automatisch. ✅

