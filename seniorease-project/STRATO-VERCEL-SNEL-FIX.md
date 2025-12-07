# 🚨 Strato & Vercel Instellingen - Snel Fix

**Probleem:** Website `seniorease.nl` is offline  
**Oplossing:** DNS records bij Strato moeten naar Vercel wijzen

---

## ⚡ Snelle Diagnose (2 minuten)

### Test 1: Werkt Vercel URL?
1. **Open Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Klik op project: **`seniorease-site`**
3. Klik op laatste deployment
4. **Kopieer de Vercel URL** (bijv. `seniorease-site-xxxxx.vercel.app`)
5. Open die URL in je browser: `https://[vercel-url]`

**Resultaat:**
- ✅ **Website werkt op Vercel URL** → DNS probleem (ga naar Stap 2)
- ❌ **Website werkt NIET op Vercel URL** → Vercel deployment probleem (ga naar Stap 5)

---

## 🔧 Stap 2: Vercel Domain Configuratie (5 minuten)

### 2.1 Check of Domain Gekoppeld Is
1. In Vercel Dashboard → **`seniorease-site`** → **Settings** → **Domains**
2. **Zie je `www.seniorease.nl` in de lijst?**
   - ✅ **Ja** → Ga naar Stap 2.2
   - ❌ **Nee** → Ga naar Stap 2.3

### 2.2 Als Domain Al Gekoppeld Is
**Check de status:**
- 🟢 **Valid** → DNS klopt, maar website werkt niet? (ga naar Stap 4)
- 🟡 **Pending** → Wacht op DNS propagatie (5 min - 2 uur)
- 🔴 **Invalid** → DNS records kloppen niet (ga naar Stap 3)

**Klik op het domain om DNS records te zien:**
- Noteer het **A record IP** voor `@`
- Noteer het **CNAME** voor `www`

### 2.3 Als Domain NIET Gekoppeld Is
1. Klik **"Add Domain"**
2. Voer in: `www.seniorease.nl`
3. Klik **Add**
4. **Vercel toont nu DNS records - KOPIEER DEZE!**

**Voorbeeld DNS records die Vercel geeft:**
```
Type: A
Name: @
Value: 76.76.21.21  ← Dit IP adres

Type: CNAME
Name: www
Value: cname.vercel-dns.com  ← Deze CNAME waarde
```

**⚠️ BELANGRIJK:** Gebruik de **exacte** waarden die Vercel voor JOUW project geeft!

---

## 🌐 Stap 3: Strato DNS Aanpassen (10 minuten)

### 3.1 Log In bij Strato
1. Ga naar: [https://www.strato.nl](https://www.strato.nl)
2. Log in
3. Ga naar: **"Mijn Producten"** → **"Domainbeheer"** of **"DNS"**

### 3.2 Vind DNS Beheer voor seniorease.nl
1. Zoek in de lijst naar: **`seniorease.nl`**
2. Klik erop
3. Ga naar: **"DNS beheer"**, **"DNS Management"**, of **"DNS Records"**

### 3.3 Check Huidige Records
**Noteer wat er NU staat:**

**Voor Root Domain (`@` of leeg):**
- Type: `____` (A of CNAME)
- Waarde: `_________________`

**Voor WWW:**
- Type: `____` (A of CNAME)
- Waarde: `_________________`

### 3.4 Update naar Vercel

**⚠️ Maak eerst een screenshot van je huidige DNS records als backup!**

#### Voor Root Domain (`@`):
1. **Verwijder** oude A record (als die naar Strato IP wijst, bijv. `81.169.x.x`)
2. **Voeg toe** nieuwe A record:
   - **Type:** A
   - **Name:** `@` (of leeg laten, afhankelijk van Strato interface)
   - **Value:** [Vercel IP uit Stap 2.2 of 2.3]
   - **TTL:** `3600` (of Auto)

#### Voor WWW Subdomain:
1. **Verwijder** oude A of CNAME record voor `www`
2. **Voeg toe** nieuwe CNAME record:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** [Vercel CNAME uit Stap 2.2 of 2.3] (bijv. `cname.vercel-dns.com`)
   - **TTL:** `3600` (of Auto)

**⚠️ Let op:**
- Gebruik **GEEN** A record voor `www` als je CNAME gebruikt!
- Sommige DNS providers ondersteunen geen CNAME voor root `@` - gebruik dan A record
- **Sla op** na het aanpassen!

### 3.5 Strato Interface Hints
**Als je in Strato niet direct "DNS beheer" ziet:**
- Zoek naar: **"Geavanceerd"**, **"Advanced"**, **"Expert Mode"**
- Of: **"Nameservers"** → **"DNS Records"**
- Of: **"Webhosting"** → **"DNS"**

**Als Strato vraagt om Nameservers:**
- Laat de nameservers op Strato staan (meestal `ns1.strato.de`, `ns2.strato.de`)
- Je hoeft nameservers **NIET** te wijzigen naar Vercel!

---

## ⏱️ Stap 4: Wachten op DNS Propagatie

### 4.1 Direct Check (PowerShell)
Open PowerShell en voer uit:
```powershell
Resolve-DnsName www.seniorease.nl -Type A
```

**Verwacht resultaat:**
- Moet wijzen naar Vercel IP (uit Stap 2)
- **NIET** naar Strato IP (bijv. `81.169.x.x`)

### 4.2 Online Check
1. Ga naar: [https://dnschecker.org](https://dnschecker.org)
2. Voer in: `www.seniorease.nl`
3. Selecteer: **A record**
4. Klik **Search**

**Check:**
- 🟢 **Groen wereldwijd** → DNS werkt! (wacht 5-10 min, test website)
- 🟡 **Gemengd (groen + rood)** → Propagatie bezig (wacht 30 min - 2 uur)
- 🔴 **Rood wereldwijd** → DNS niet correct (check Stap 3 opnieuw)

### 4.3 Vercel Status Check
1. Ga naar Vercel → Settings → Domains
2. Check status van `www.seniorease.nl`:
   - 🟢 **Valid** → Klaar! Test website
   - 🟡 **Pending** → Wacht nog (5 min - 2 uur)
   - 🔴 **Invalid** → DNS records kloppen niet (check Stap 3)

**DNS propagatie duurt:**
- **Minimaal:** 5 minuten
- **Gemiddeld:** 30 minuten - 2 uur
- **Maximaal:** 48 uur (meestal binnen 24 uur)

---

## 🎯 Stap 5: Test Website

### 5.1 Test in Browser
1. Open: `https://www.seniorease.nl`
2. **Hard refresh:** `Ctrl + Shift + R` (of `Cmd + Shift + R` op Mac)
3. **Werkt de website?**
   - ✅ **Ja** → Klaar! 🎉
   - ❌ **Nee** → Ga naar Stap 5.2

### 5.2 Browser Console Check
1. Open website: `https://www.seniorease.nl`
2. Druk **F12** (Developer Tools)
3. Ga naar tab: **Network**
4. Refresh pagina (F5)
5. Klik op eerste request (meestal `www.seniorease.nl`)
6. Klik op tab: **Headers**
7. Scroll naar **Response Headers**

**Check:**
- ✅ Zie je `x-vercel-id`? → Website draait op Vercel! (cache probleem?)
- ❌ Zie je `server: Strato`? → DNS wijst nog naar Strato (wacht langer)
- ❌ Zie je error? → Noteer error en check Stap 6

### 5.3 Als Website Nog Offline

**Mogelijke oorzaken:**
1. **DNS propagatie nog niet klaar**
   - Oplossing: Wacht 1-2 uur, test opnieuw
   - Check: [dnschecker.org](https://dnschecker.org)

2. **Browser cache**
   - Oplossing: Incognito window of clear cache volledig
   - Of: Test op andere browser/device

3. **DNS records niet correct**
   - Oplossing: Check Stap 3 opnieuw
   - Gebruik **exacte** Vercel records uit Stap 2

4. **Vercel deployment probleem**
   - Oplossing: Check Stap 6

---

## 🚨 Stap 6: Vercel Deployment Probleem

**Als website ook NIET werkt op Vercel URL:**

### 6.1 Check Deployment Status
1. Vercel Dashboard → **`seniorease-site`** → **Deployments**
2. Check laatste deployment:
   - ✅ **Ready** → Deployment OK, check domain configuratie
   - ⏳ **Building** → Wacht tot klaar
   - ❌ **Error** → Klik op deployment, check error logs

### 6.2 Force Redeploy
1. Vercel Dashboard → **Deployments**
2. Klik **"..."** bij laatste deployment
3. Kies **"Redeploy"**
4. **Zet "Use existing Build Cache" = OFF** ⚠️
5. Klik **"Redeploy"**
6. Wacht 2-3 minuten

### 6.3 Check Build Logs
1. Klik op deployment
2. Ga naar **"Build Logs"** tab
3. Scroll naar beneden
4. **Zoek naar errors** (rode tekst)
5. Noteer errors: `_________________`

---

## 📋 Checklist Samenvatting

### ✅ Vercel:
- [ ] Project `seniorease-site` bestaat
- [ ] Laatste deployment is "Ready"
- [ ] Vercel URL werkt (test direct)
- [ ] Domain `www.seniorease.nl` is gekoppeld
- [ ] Domain status is "Valid" of "Pending"

### ✅ Strato DNS:
- [ ] A record voor `@` wijst naar Vercel IP
- [ ] CNAME voor `www` wijst naar Vercel CNAME
- [ ] Oude Strato records zijn verwijderd
- [ ] DNS is opgeslagen

### ✅ Verificatie:
- [ ] DNS check (dnschecker.org) toont Vercel IP
- [ ] Browser test (hard refresh)
- [ ] Browser console toont `x-vercel-id` header
- [ ] Website werkt op `www.seniorease.nl`

---

## 🆘 Hulp Nodig?

**Als je vastloopt, noteer:**
1. **Vercel project naam:** `_________________`
2. **Vercel URL:** `https://_________________.vercel.app`
3. **Vercel DNS records:**
   - A record IP: `_________________`
   - CNAME waarde: `_________________`
4. **Strato huidige DNS records:**
   - Root `@`: `_________________`
   - WWW: `_________________`
5. **Error messages:** `_________________`

**Contact:**
- **Strato Support:** [https://www.strato.nl/contact](https://www.strato.nl/contact)
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)

---

**Start met Stap 1 en laat me weten wat je ziet!** 🔍
