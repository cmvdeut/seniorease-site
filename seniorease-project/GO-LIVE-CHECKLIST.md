# 🚀 Go Live Checklist - Seniorease.nl

## ✅ Pre-Launch Checklist

### 1. Stripe Setup
- [ ] **Stripe Dashboard** → Test Mode UIT (Live Mode aan)
- [ ] **Payment Link** → Live link is zichtbaar in Live Mode
- [ ] **Success URL** geconfigureerd: `https://seniorease.nl/betalen/success`
- [ ] **Test met kleine echte betaling** (€0.01 of €2,99) om te verifiëren

### 2. Code Status
- [x] ✅ Code gebruikt automatisch live link op seniorease.nl
- [x] ✅ Automatische download werkt na betaling
- [x] ✅ Licentie activatie werkt
- [x] ✅ APK download werkt
- [x] ✅ Support systeem werkt (/support en /activeer-licentie)

### 3. APK Bestand
- [ ] **APK is correct geüpload** → `public/Seniorease-Bibliotheek.apk`
- [ ] **APK is ondertekend** → Gebruik `.\check-apk-signature.ps1` om te verifiëren
- [ ] **APK is de nieuwste versie** → Check met `.\check-apk-info.ps1`
- [ ] **APK werkt** → Test installatie op Android apparaat

### 4. Domein & Deployment
- [ ] **seniorease.nl** werkt en redirect correct
- [ ] **Vercel deployment** is up-to-date
- [ ] **SSL certificaat** is actief (https)
- [ ] **DNS** is correct geconfigureerd

### 5. Functionaliteit Testen
- [ ] **Betaling flow** testen met echte kleine betaling
- [ ] **Licentie activatie** werkt na betaling
- [ ] **Download pagina** werkt (`/download`)
- [ ] **QR code** werkt en download start
- [ ] **APK installatie** werkt op Android
- [ ] **Bibliotheek app** werkt met licentie

### 6. Support Klaar
- [ ] **Support pagina** toegankelijk: `/support`
- [ ] **Activer pagina** werkt: `/activeer-licentie`
- [ ] Je weet hoe je licentie codes genereert voor klanten
- [ ] Contact informatie is up-to-date

### 7. Documentatie
- [x] ✅ Installatie instructies op `/download` pagina
- [x] ✅ Help documenten beschikbaar
- [ ] **Privacy policy** en **voorwaarden** zijn compleet

## 🎯 Stappen om Live te Gaan

### Stap 1: Stripe Live Mode
1. Ga naar [Stripe Dashboard](https://dashboard.stripe.com)
2. **Zet Test Mode UIT** (toggle rechtsboven)
3. Check dat **geen oranje balk** meer zichtbaar is
4. Je bent nu in **Live Mode** ✅

### Stap 2: Verifieer Payment Link
1. In Stripe Dashboard (Live Mode) → **Products** → **Payment Links**
2. Check dat je **live Payment Link** zichtbaar is: `cNi3co3yC45O70b4NM6c000`
3. Check **Settings** → **Success page URL**: `https://seniorease.nl/betalen/success`

### Stap 3: Test Met Echte Betaling (Optioneel maar Aanbevolen)
1. Ga naar `https://seniorease.nl/betalen`
2. Vul je eigen email in
3. Betaal €2,99 met echte credit card
4. Check of:
   - Betaling slaagt
   - Redirect naar success pagina werkt
   - Licentie wordt geactiveerd
   - Download start automatisch

### Stap 4: Verifieer Alles Werkt
1. ✅ APK download werkt
2. ✅ QR code werkt
3. ✅ Licentie systeem werkt
4. ✅ Automatische download werkt op Android

## ⚠️ Belangrijk!

### Test Cards Werken NIET in Live Mode
- ❌ `4242 4242 4242 4242` werkt **NIET** in Live Mode
- ✅ **Echte credit cards** werken wel
- ✅ **iDEAL, Bancontact** etc. werken ook

### Als Iets Niet Werkt
1. Check browser console voor errors (F12)
2. Check Stripe Dashboard → Payments voor betalingen
3. Check Vercel logs voor server errors
4. Gebruik `/support` pagina om licentie codes te genereren als backup

## 🎉 Je Bent Live!

Als alles werkt:
- ✅ Betalingen worden echt verwerkt
- ✅ Klanten krijgen licentie
- ✅ APK download werkt
- ✅ App installatie werkt

**Succes! 🚀**

---

**Tip:** Houd Stripe Dashboard open tijdens eerste echte betalingen om te monitoren.





