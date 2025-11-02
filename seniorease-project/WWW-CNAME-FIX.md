# 🔧 CNAME Waarde voor www.seniorease.nl

## ❌ Oude Waarde (verwijderen!)
Je ziet nu: `seniorease-app.netlify.app.`
**Dit is van Netlify - dit moet worden vervangen!**

---

## ✅ Nieuwe Waarde Uit Vercel

### Stap 1: Haal CNAME Op Uit Vercel
1. Ga naar **Vercel Dashboard** → je project → **Settings** → **Domains**
2. Klik op **"Edit"** bij `www.seniorease.nl`
3. Kijk bij **"DNS Records"** tab
4. Je ziet een CNAME record met een waarde
5. **Kopieer die exacte waarde** (bijv. `cname.vercel-dns.com`)

### Stap 2: Zet Nieuwe Waarde in Strato
1. In je Strato DNS formulier
2. Bij **"Waarde"** veld
3. Verwijder: `seniorease-app.netlify.app.`
4. Voer in: **[de CNAME waarde uit Vercel]**
5. Klik **"Opslaan"**

---

## 📝 Mogelijke Vercel CNAME Waarden

Vercel gebruikt meestal één van deze formats:
- `cname.vercel-dns.com`
- Of een specifieke waarde die Vercel genereert voor jouw project

**⚠️ Belangrijk:** Gebruik de **exacte** waarde die Vercel toont, niet een voorbeeld!

---

## 🆘 Als Je Vercel CNAME Niet Ziet

Als je in Vercel bij "Edit" van www.seniorease.nl kijkt:
1. Check of je op de **"DNS Records"** tab bent (niet "Vercel DNS")
2. Zoek naar een record met:
   - Type: **CNAME**
   - Name: `www`
   - Value: [dit is wat je nodig hebt]

---

## ✅ Checklist

- [ ] Vercel CNAME waarde gekopieerd
- [ ] Oude Netlify waarde verwijderd uit Strato
- [ ] Nieuwe Vercel waarde ingevuld
- [ ] Opgeslagen in Strato
- [ ] A record voor root domain (`@`) ook toegevoegd met `216.198.79.1`

---

**Kijk in Vercel bij "Edit" van www.seniorease.nl - wat staat daar als CNAME waarde?**

