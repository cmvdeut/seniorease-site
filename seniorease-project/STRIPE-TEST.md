# 🧪 Stripe Configuratie Test Plan

## ✅ Stap 1: Lokaal Testen

### 1.1 Start Development Server
```bash
npm run dev
```

### 1.2 Test Betalingspagina
1. Ga naar: `http://localhost:3001/betalen`
2. Vul een test email in (bijv. `test@example.com`)
3. Klik op "Betaal € 2,99"
4. ✅ **Verwachting**: Je wordt doorgestuurd naar Stripe Payment Link

### 1.3 Test Success Pagina (zonder Stripe)
1. Ga direct naar: `http://localhost:3001/betalen/success`
2. ✅ **Verwachting**: 
   - Licentie wordt automatisch gegenereerd
   - Licentie code wordt getoond
   - Link naar bibliotheek is zichtbaar

### 1.4 Test Licentie Check
1. Na stap 1.3, ga naar: `http://localhost:3001/bibliotheek`
2. ✅ **Verwachting**: Bibliotheek app opent zonder licentie blokkade

---

## 🌐 Stap 2: Stripe Dashboard Configuratie

### 2.1 Vind je Vercel URL
1. Ga naar [Vercel Dashboard](https://vercel.com/dashboard)
2. Open je `seniorease-site` project
3. Kopieer je deployment URL (bijv. `seniorease-site.vercel.app`)

### 2.2 Configureer Success URL in Stripe
1. Ga naar [Stripe Dashboard](https://dashboard.stripe.com)
2. Zorg dat je in **Test Mode** bent (toggle rechtsboven)
3. Ga naar **Products** → **Payment Links**
4. Klik op je Payment Link: `cNi3co3yC45O70b4NM6c000`
5. Klik op **Settings** (⚙️)
6. Scroll naar **After payment**
7. Bij **Success page URL** vul in:
   ```
   https://seniorease-site.vercel.app/betalen/success
   ```
   (Vervang met jouw echte Vercel URL)

8. Klik **Save**

---

## 💳 Stap 3: Echte Stripe Test Betaling

### 3.1 Test Betalingsflow
1. Ga naar je live site: `https://jouw-vercel-url.vercel.app/betalen`
2. Vul een test email in
3. Klik "Betaal € 2,99"
4. Je wordt doorgestuurd naar Stripe

### 3.2 Test Betaling (Test Mode)
Gebruik deze test credit cards in Stripe:

**✅ Succesvolle betaling:**
```
Card number: 4242 4242 4242 4242
Expiry: 12/34 (of elke toekomstige datum)
CVC: 123 (of elke 3 cijfers)
ZIP: 12345 (of elke 5 cijfers)
```

**❌ Geweigerde betaling:**
```
Card number: 4000 0000 0000 0002
```

### 3.3 Verificatie Na Betaling
Na succesvolle test betaling:
1. ✅ Je wordt automatisch doorgestuurd naar `/betalen/success`
2. ✅ Licentie code wordt getoond
3. ✅ Link naar bibliotheek werkt
4. ✅ Bibliotheek app is toegankelijk

---

## 🔍 Stap 4: Debug Checklist

Als iets niet werkt, check:

- [ ] Development server draait (`npm run dev`)
- [ ] Success URL is correct geconfigureerd in Stripe
- [ ] Stripe Payment Link is in **Test Mode**
- [ ] Vercel deployment is up-to-date
- [ ] Browser console heeft geen errors (F12)
- [ ] `sessionStorage` bevat email (DevTools → Application → Storage)

---

## 🐛 Veelvoorkomende Problemen

### Probleem: Success pagina laadt niet na betaling
**Oplossing:**
- Check of Success URL exact overeenkomt met Vercel URL
- Zorg dat URL met `https://` begint
- Test eerst lokaal: `http://localhost:3001/betalen/success`

### Probleem: Licentie wordt niet geactiveerd
**Oplossing:**
- Open DevTools → Console
- Check voor errors
- Open DevTools → Application → Local Storage
- Check of `seniorease-licentie` bestaat

### Probleem: Email wordt niet opgeslagen
**Oplossing:**
- Check `sessionStorage` in DevTools
- Zorg dat email wordt ingevuld voor klikken op "Betaal"
- Check of browser cookies/storage niet geblokkeerd is

---

## 📊 Test Resultaten

Gebruik dit schema om resultaten bij te houden:

| Test | Status | Opmerkingen |
|------|--------|-------------|
| Lokaal betalingspagina | ⬜ | |
| Lokaal success pagina | ⬜ | |
| Stripe redirect werkt | ⬜ | |
| Test betaling succesvol | ⬜ | |
| Licentie activatie | ⬜ | |
| Bibliotheek toegankelijk | ⬜ | |

---

## 🎯 Volgende Stappen Na Succesvolle Test

1. ✅ Schakel over naar **Live Mode** in Stripe
2. ✅ Update Success URL naar productie domein (als anders)
3. ✅ Test nogmaals met echte betaling (klein bedrag)
4. ✅ Monitor Stripe Dashboard voor betalingen
5. ✅ Optioneel: Setup webhook voor extra verificatie

---

**Klaar om te testen?** Start met Stap 1! 🚀

