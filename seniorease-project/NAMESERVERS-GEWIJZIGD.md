# ✅ Nameservers Gewijzigd - Volgende Stappen

## 🎉 Goed Gedaan!
Je hebt de nameservers aangepast in Strato:
- ✅ `ns1.vercel-dns.com`
- ✅ `ns2.vercel-dns.com`

---

## ⏱️ Wachten op Nameserver Propagatie

### Tijdlijn:
- **Minimaal**: 15-30 minuten
- **Meestal**: 1-4 uur
- **Maximaal**: 48 uur (meestal binnen 24 uur)

**⚠️ Belangrijk:** Nameserver propagatie duurt **langer** dan DNS record propagatie!

---

## 🔍 Stap 1: Check Status in Vercel (Nu)

### In Vercel Dashboard:
1. Ga naar je project → **Settings** → **Domains**
2. Klik op **"Refresh"** bij `seniorease.nl`
3. Check de status:
   - 🟢 **Valid** = Nameservers zijn actief! ✅
   - 🟡 **Pending** = Nameserver propagatie bezig (wacht langer)
   - 🔴 **Invalid Configuration** = Nameservers nog niet actief (wacht langer)

**Wat zie je nu?** (Waarschijnlijk nog 🟡 Pending of 🔴 Invalid)

---

## 🧪 Stap 2: Test Nameserver Propagatie (Optioneel)

### Online Tool:
Gebruik: **[dnschecker.org](https://dnschecker.org)**

1. Ga naar [dnschecker.org](https://dnschecker.org)
2. Selecteer: **"NS"** (Nameserver) in het dropdown menu
3. Voer in: `seniorease.nl`
4. Klik **"Search"**
5. Check of je ziet:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

**Als beide zichtbaar zijn wereldwijd → Nameservers zijn actief!**

**Als je ze nog niet ziet → Wacht langer (kan 1-4 uur duren)**

---

## ⏰ Stap 3: Wachten (Belangrijk!)

### Wat Nu:
1. **Wacht minimaal 15-30 minuten**
2. **Check status in Vercel** (Settings → Domains → Refresh)
3. **Als nog Pending/Invalid:** Wacht langer (1-4 uur)
4. **Check opnieuw** na 1 uur

### Tijdens Het Wachten:
- ✅ Site werkt al op **Vercel URL** (test de puzzel daar!)
- ✅ Je kunt de site gebruiken op Vercel URL
- ✅ Wacht op nameserver propagatie voor `seniorease.nl`

---

## ✅ Stap 4: Check Status Regelmatig

### Elke 30 minuten - 1 uur:
1. Ga naar Vercel → Settings → Domains
2. Klik **"Refresh"** bij `seniorease.nl`
3. Check status:
   - 🟢 **Valid** = Klaar! Domain werkt! ✅
   - 🟡 **Pending** = Nog bezig, wacht langer
   - 🔴 **Invalid** = Nog bezig, wacht langer

---

## 🎯 Stap 5: Als Status "Valid" Is

### Dan Werkt Alles!
1. ✅ Nameservers zijn actief
2. ✅ Vercel beheert DNS automatisch
3. ✅ SSL certificaat wordt automatisch geactiveerd
4. ✅ Domain werkt op `seniorease.nl`

### Test Dan:
1. Ga naar: `https://seniorease.nl`
2. Hard refresh: `Ctrl + Shift + R`
3. Test de puzzel: `/puzzels`
4. Test andere tools

---

## 🐛 Als Het Lang Duurt

### Normaal:
- Nameserver propagatie kan **tot 48 uur** duren
- Meestal binnen **1-4 uur**
- Dit is **normaal** en **niet een probleem**

### Als Na 24 Uur Nog Niet Werkt:
1. Check nameserver propagatie met [dnschecker.org](https://dnschecker.org)
2. Check of nameservers correct zijn in Strato
3. Check Vercel → Settings → Domains → Status
4. Contact Vercel support als nodig

---

## ✅ Checklist

- [x] Nameservers gewijzigd in Strato
- [x] Nameservers opgeslagen
- [ ] Gewacht op nameserver propagatie (15 min - 48 uur)
- [ ] Status gecheckt in Vercel → Settings → Domains
- [ ] Status is "Valid" (groen)
- [ ] Domain werkt op `seniorease.nl`
- [ ] Puzzel pagina werkt op `seniorease.nl`

---

## 💡 Tips

- **Gebruik Vercel URL tijdelijk** terwijl je wacht
- **Check status elke 1-2 uur** (niet te vaak)
- **Nameserver propagatie is traag** - dit is normaal
- **Wees geduldig** - kan 1-4 uur duren

---

## 🎯 Wat Nu?

### Direct:
1. **Wacht 15-30 minuten**
2. **Check status in Vercel** → Settings → Domains → Refresh
3. **Test nameserver propagatie** met dnschecker.org (optioneel)

### Over 1-2 Uur:
1. **Check status opnieuw** in Vercel
2. **Als Valid:** Test `seniorease.nl`
3. **Als nog Pending:** Wacht langer

---

## 🧪 Test Tijdelijk op Vercel URL

Terwijl je wacht, test de site op Vercel URL:

1. Ga naar Vercel → Project → **Deployments**
2. Klik op de laatste deployment
3. Klik op de **URL** (bijv. `https://seniorease-site-xxxxx.vercel.app`)
4. Test de puzzel: `/puzzels`

**Werkt de puzzel op Vercel URL?** Dan werkt alles, je wacht alleen op nameserver propagatie!

---

**Check nu de status in Vercel → Settings → Domains en laat weten wat je ziet!** 🌐




