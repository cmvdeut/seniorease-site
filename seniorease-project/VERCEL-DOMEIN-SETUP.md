# 🌐 Vercel Custom Domain Setup - seniorease.nl

Deze gids helpt je om `seniorease.nl` te koppelen aan je Vercel deployment.

## ✅ Stap 1: Vercel Dashboard - Domain Toevoegen

### 1.1 Ga naar Vercel Project
1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik op je project: **seniorease-site** (of hoe je project ook heet)
3. Ga naar **Settings** → **Domains**

### 1.2 Voeg Domain Toe
1. Klik op **Add Domain** (of "Domein toevoegen")
2. Voer in: `seniorease.nl`
3. Klik **Add**

### 1.3 Vercel geeft DNS Records
Vercel toont nu DNS records die je moet configureren:
- **Type A record** voor root domain (`@`)
- **Type CNAME** voor www subdomain
- Of een **CNAME** voor root (moderne DNS providers)

**📋 Kopieer deze DNS records - je hebt ze nodig in stap 2!**

---

## 🔧 Stap 2: DNS Configuratie bij Domain Provider

Je moet nu de DNS records configureren bij waar je `seniorease.nl` hebt geregistreerd.

### Veelvoorkomende Providers:

#### **TransIP / Openprovider / Mijndomein.nl**
1. Log in bij je domain provider
2. Ga naar **DNS Beheer** of **DNS Management**
3. Voeg de records toe die Vercel heeft gegeven
4. Sla op

#### **Vercel DNS Records (voorbeeld):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto (of 3600)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto (of 3600)
```

**⚠️ Belangrijk:** Gebruik de **exacte** records die Vercel geeft voor jouw project!

---

## ⏱️ Stap 3: Wachten op DNS Propagatie

Na het toevoegen van de DNS records:
- **Minimaal**: 5 minuten
- **Gemiddeld**: 30 minuten - 2 uur
- **Maximaal**: 48 uur (meestal binnen 24 uur)

### Check Status:
1. Ga terug naar Vercel → Settings → Domains
2. Je ziet de status van `seniorease.nl`
3. Status kan zijn:
   - 🔴 **Invalid Configuration** = DNS records nog niet actief
   - 🟡 **Pending** = DNS propagatie bezig
   - 🟢 **Valid** = Klaar! ✅

### Test DNS Propagatie:
Je kunt ook handmatig checken:
```bash
# In terminal (of online tool: dnschecker.org)
nslookup seniorease.nl
# Of
dig seniorease.nl
```

---

## ✅ Stap 4: SSL Certificaat

Vercel activeert **automatisch** een SSL certificaat (HTTPS) zodra de DNS records correct zijn geconfigureerd.

- Dit gebeurt meestal binnen 1-2 uur na DNS propagatie
- Je ziet de status in Vercel → Settings → Domains
- Als het groen is, werkt HTTPS automatisch!

---

## 🧪 Stap 5: Test de Site

### 5.1 Check of Site Live Is
1. Ga naar `https://seniorease.nl`
2. Check ook: `https://www.seniorease.nl`
3. Beide moeten werken!

### 5.2 Test Belangrijke Pagina's
- ✅ Homepage: `https://seniorease.nl`
- ✅ Bibliotheek: `https://seniorease.nl/bibliotheek`
- ✅ Betalen: `https://seniorease.nl/betalen`
- ✅ Success: `https://seniorease.nl/betalen/success`

---

## 🔧 Problemen Oplossen

### Probleem: "Invalid Configuration"
**Oplossing:**
- Check of DNS records exact overeenkomen met Vercel
- Controleer of je de juiste domain provider hebt
- Wacht 5-10 minuten en refresh Vercel dashboard

### Probleem: DNS propagatie duurt lang
**Oplossing:**
- Dit is normaal, kan tot 48 uur duren
- Check met [dnschecker.org](https://dnschecker.org)
- Vercel toont ook live status

### Probleem: HTTPS certificaat wordt niet geactiveerd
**Oplossing:**
- Wacht 1-2 uur na DNS propagatie
- Check of DNS records correct zijn
- Vercel activeert SSL automatisch zodra DNS klopt

### Probleem: "www" subdomain werkt niet
**Oplossing:**
- Zorg dat je een CNAME record hebt voor `www`
- Of configureer redirect in Vercel → Settings → Domains

---

## 🎯 Volgende Stappen Na Live Gaan

1. ✅ Test de complete site op `seniorease.nl`
2. ✅ Update Stripe Success URL naar: `https://seniorease.nl/betalen/success`
3. ✅ Test de betalingsflow
4. ✅ Test licentie activatie
5. ✅ Test app installatie

---

## 💡 Tips

- **Dual Domain**: Je kunt zowel `seniorease.nl` als `seniorease-site.vercel.app` gebruiken tijdens de setup
- **Redirects**: Vercel kan automatisch `www` naar root redirecten (of andersom)
- **Monitoring**: Vercel dashboard toont live status van alle configuraties

---

**Klaar?** Zodra `seniorease.nl` live is, kunnen we direct testen! 🚀

