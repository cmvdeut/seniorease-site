# 🌐 Nameservers Configureren voor seniorease.nl

## ✅ Wat Je Ziet
Vercel vraagt om **nameservers** te wijzigen. Dit is **eenvoudiger** dan individuele DNS records!

**Nameservers die je nodig hebt:**
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

---

## 🔧 Stap 1: Waar is seniorease.nl Geregistreerd?

Waar heb je `seniorease.nl` geregistreerd?
- **Strato.nl** ← Meest waarschijnlijk
- **TransIP**
- **Openprovider**
- **Mijndomein.nl**
- **Andere provider**

---

## 🔧 Stap 2: Nameservers Wijzigen

### **Strato.nl:**

#### 2.1 Log In
1. Ga naar [Strato.nl](https://www.strato.nl)
2. Klik op **"Inloggen"** (rechtsboven)
3. Log in met je Strato account

#### 2.2 Ga naar Domain Beheer
1. In je dashboard, klik op **"Domains"** of **"Domainbeheer"**
2. Zoek en klik op **`seniorease.nl`**

#### 2.3 Vind Nameserver Instellingen
1. Zoek naar **"Nameserver"**, **"Nameserver-Einstellungen"** of **"DNS Nameserver"**
2. Klik hierop

#### 2.4 Wijzig Nameservers
1. Kies **"Eigen Nameserver gebruiken"** of **"Custom Nameservers"**
2. Voeg toe:
   - **Nameserver 1**: `ns1.vercel-dns.com`
   - **Nameserver 2**: `ns2.vercel-dns.com`
3. **Sla op** of **"Speichern"**

**⚠️ Belangrijk:** Verwijder oude nameservers (als die er zijn)!

---

### **TransIP:**

#### 2.1 Log In
1. Ga naar [TransIP](https://www.transip.nl)
2. Log in met je account

#### 2.2 Ga naar Domains
1. Ga naar **"Mijn Producten"** → **"Domains"**
2. Klik op **`seniorease.nl`**

#### 2.3 Wijzig Nameservers
1. Ga naar **"Nameservers"** tab
2. Kies **"Aangepaste nameservers"**
3. Voeg toe:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. **Sla op**

---

### **Openprovider / Mijndomein.nl:**

#### 2.1 Log In
1. Log in bij je provider

#### 2.2 Vind Nameserver Instellingen
1. Ga naar **Domainbeheer** → **Nameservers**
2. Of: **DNS Beheer** → **Nameservers**

#### 2.3 Wijzig Nameservers
1. Kies **"Custom Nameservers"** of **"Eigen Nameservers"**
2. Voeg toe:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. **Sla op**

---

### **Andere Provider:**

Gebruik dezelfde principes:
1. Log in bij je provider
2. Ga naar **Domainbeheer** of **DNS Settings**
3. Zoek **"Nameservers"** of **"DNS Nameservers"**
4. Wijzig naar:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
5. Sla op

---

## ⏱️ Stap 3: Wachten op Nameserver Propagatie

Na het wijzigen van nameservers:

### Tijdlijn:
- **Minimaal**: 15-30 minuten
- **Meestal**: 1-4 uur
- **Maximaal**: 48 uur (meestal binnen 24 uur)

**⚠️ Belangrijk:** Nameserver propagatie duurt **langer** dan DNS record propagatie!

---

## ✅ Stap 4: Check Status in Vercel

### 4.1 Check Domain Status
1. Ga naar Vercel → Project → **Settings** → **Domains**
2. Klik op **"Refresh"** bij `seniorease.nl`
3. Status zou moeten veranderen:
   - 🔴 → 🟡 → 🟢

### 4.2 Status Betekenis
- 🟢 **Valid** = Nameservers zijn actief, domain werkt! ✅
- 🟡 **Pending** = Nameserver propagatie bezig (wacht langer)
- 🔴 **Invalid Configuration** = Nameservers nog niet actief (wacht langer)

---

## 🧪 Stap 5: Test Nameserver Propagatie

### Online Tool:
Gebruik: **[dnschecker.org](https://dnschecker.org)**

1. Ga naar dnschecker.org
2. Selecteer: **"NS"** (Nameserver)
3. Voer in: `seniorease.nl`
4. Check of je ziet:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

**Als beide zichtbaar zijn → Nameservers zijn actief!**

---

## 🎯 Voordelen van Nameservers

### ✅ Eenvoudiger:
- **1 keer configureren** (nameservers)
- **Geen individuele DNS records** nodig
- **Vercel beheert alles** automatisch

### ✅ Automatisch:
- Vercel configureert DNS records automatisch
- SSL certificaat wordt automatisch geactiveerd
- Geen handmatige DNS record updates nodig

---

## 🐛 Problemen Oplossen

### Probleem: Nameservers worden niet geaccepteerd
**Oplossing:**
1. Check of je beide nameservers hebt ingevoerd
2. Check of er geen typfouten zijn
3. Verwijder oude nameservers eerst
4. Sla op en wacht 15-30 minuten

### Probleem: Nameserver propagatie duurt lang
**Oplossing:**
- Dit is normaal, kan tot 48 uur duren
- Check met [dnschecker.org](https://dnschecker.org)
- Vercel toont ook live status

### Probleem: Domain werkt nog niet na nameserver wijziging
**Oplossing:**
1. Wacht minimaal 30 minuten
2. Check nameserver propagatie met dnschecker.org
3. Refresh status in Vercel
4. Test op `seniorease.nl` (niet www)

---

## ✅ Checklist

- [ ] Nameservers gewijzigd bij provider
- [ ] Oude nameservers verwijderd
- [ ] Beide Vercel nameservers toegevoegd:
  - [ ] `ns1.vercel-dns.com`
  - [ ] `ns2.vercel-dns.com`
- [ ] Wijzigingen opgeslagen bij provider
- [ ] Gewacht op nameserver propagatie (15 min - 48 uur)
- [ ] Status gecheckt in Vercel → Settings → Domains
- [ ] Nameserver propagatie getest met dnschecker.org
- [ ] Domain werkt op `seniorease.nl`

---

## 💡 Tips

- **Nameserver propagatie duurt langer** dan DNS record propagatie
- **Gebruik Vercel URL tijdelijk** terwijl je wacht
- **Check status regelmatig** in Vercel dashboard
- **Beide nameservers zijn nodig** - voeg beide toe!

---

## 🎯 Volgende Stappen

1. **Wijzig nameservers** bij je provider (zie hierboven)
2. **Wacht op propagatie** (15 min - 48 uur)
3. **Check status** in Vercel → Settings → Domains
4. **Test domain** op `seniorease.nl`

---

**Wijzig nu de nameservers bij je provider en laat weten wanneer het klaar is!** 🌐




