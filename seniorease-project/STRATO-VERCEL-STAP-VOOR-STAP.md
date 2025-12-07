# 🌐 Strato & Vercel Instellingen - Stap voor Stap Gids

**Domein:** `seniorease.nl`  
**Status:** Website offline ❌  
**Doel:** DNS bij Strato naar Vercel wijzen

---

## 🎯 Overzicht

Je hebt:
- ✅ **Domein** `seniorease.nl` bij **Strato**
- ✅ **Website** gehost op **Vercel** (project: `seniorease-site`)

**Probleem:** DNS bij Strato wijst nog niet naar Vercel, daarom is website offline.

**Oplossing:** Update DNS records bij Strato om naar Vercel te wijzen.

---

## 📋 STAP 1: Vercel Dashboard - Domain Check (5 min)

### 1.1 Open Vercel
1. Ga naar: **[https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Log in
3. Klik op project: **`seniorease-site`**

### 1.2 Check Domain Configuratie
1. Klik op tab: **Settings** (bovenaan)
2. Klik in menu links: **Domains**
3. **Zie je `www.seniorease.nl` in de lijst?**

**Als JA:**
- Noteer de **status** (Valid/Pending/Invalid)
- Klik op het domain
- **Kopieer de DNS records** die Vercel toont:
  - A record IP voor `@`: `_________________`
  - CNAME voor `www`: `_________________`

**Als NEE:**
1. Klik **"Add Domain"**
2. Voer in: `www.seniorease.nl`
3. Klik **Add**
4. Vercel toont DNS records - **KOPIEER DEZE!**

### 1.3 Test Vercel URL
1. Ga naar tab: **Deployments**
2. Klik op laatste deployment
3. **Kopieer de Vercel URL** (bijv. `seniorease-site-xxxxx.vercel.app`)
4. Open die URL in browser: `https://[vercel-url]`

**Werkt de website daar?**
- ✅ **Ja** → DNS probleem, ga naar Stap 2
- ❌ **Nee** → Vercel deployment probleem, check deployment logs

---

## 🔧 STAP 2: Strato DNS Aanpassen (10 min)

### 2.1 Log In bij Strato
1. Ga naar: **[https://www.strato.nl](https://www.strato.nl)**
2. Log in met je account
3. Ga naar: **"Mijn Producten"** of **"Dashboard"**

### 2.2 Vind Domain Beheer
**Mogelijke paden in Strato:**
- **Optie A:** Mijn Producten → Domainbeheer → `seniorease.nl`
- **Optie B:** Domains → `seniorease.nl` → DNS beheer
- **Optie C:** Webhosting → Domains → `seniorease.nl` → DNS

**Als je het niet vindt:**
- Zoek naar: **"DNS"**, **"DNS beheer"**, **"DNS Management"**
- Of: **"Geavanceerd"**, **"Advanced Settings"**

### 2.3 Check Huidige DNS Records
**Maak een screenshot als backup!**

**Noteer wat er NU staat:**

**Voor Root Domain (`@` of leeg):**
```
Type: [  ] A  [  ] CNAME
Name: @ (of leeg)
Value: _________________
TTL: _________________
```

**Voor WWW:**
```
Type: [  ] A  [  ] CNAME
Name: www
Value: _________________
TTL: _________________
```

### 2.4 Update DNS Records

#### A. Root Domain (`@` of leeg):
1. **Verwijder** oude A record (als die naar Strato IP wijst)
2. **Voeg toe** nieuwe A record:
   - **Type:** A
   - **Name:** `@` (of leeg laten)
   - **Value:** [Vercel IP uit Stap 1.2]
   - **TTL:** `3600` (of Auto)

#### B. WWW Subdomain:
1. **Verwijder** oude A of CNAME record voor `www`
2. **Voeg toe** nieuwe CNAME record:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** [Vercel CNAME uit Stap 1.2] (bijv. `cname.vercel-dns.com`)
   - **TTL:** `3600` (of Auto)

**⚠️ BELANGRIJK:**
- Gebruik **exacte** waarden uit Vercel dashboard!
- **Sla op** na het aanpassen!
- Wacht 5-10 minuten voor eerste propagatie

### 2.5 Strato Interface Tips

**Als je dropdown ziet voor "Type":**
- Kies **A** voor root `@`
- Kies **CNAME** voor `www`

**Als je "Host" of "Subdomain" ziet:**
- Voor root: Laat leeg of gebruik `@`
- Voor www: Gebruik `www`

**Als je "Waarde" of "Value" ziet:**
- Voor A record: IP adres (bijv. `76.76.21.21`)
- Voor CNAME: CNAME waarde (bijv. `cname.vercel-dns.com`)

**Als je "TTL" ziet:**
- Gebruik `3600` (1 uur) of kies "Auto"

---

## ⏱️ STAP 3: Wachten op DNS Propagatie

### 3.1 Direct Check (PowerShell)
Open PowerShell en voer uit:
```powershell
Resolve-DnsName www.seniorease.nl -Type A
```

**Verwacht:**
- Moet wijzen naar Vercel IP (uit Stap 1.2)
- **NIET** naar Strato IP (bijv. `81.169.x.x`)

### 3.2 Online DNS Checker
1. Ga naar: **[https://dnschecker.org](https://dnschecker.org)**
2. Voer in: `www.seniorease.nl`
3. Selecteer: **A record**
4. Klik **Search**

**Resultaat:**
- 🟢 **Groen wereldwijd** → DNS werkt! (wacht 5-10 min, test website)
- 🟡 **Gemengd** → Propagatie bezig (wacht 30 min - 2 uur)
- 🔴 **Rood** → DNS niet correct (check Stap 2 opnieuw)

### 3.3 Vercel Status Check
1. Ga naar Vercel → Settings → Domains
2. Check status van `www.seniorease.nl`:
   - 🟢 **Valid** → Klaar! Test website
   - 🟡 **Pending** → Wacht nog (5 min - 2 uur)
   - 🔴 **Invalid** → DNS records kloppen niet (check Stap 2)

**DNS propagatie tijd:**
- **Minimaal:** 5 minuten
- **Gemiddeld:** 30 minuten - 2 uur
- **Maximaal:** 48 uur (meestal binnen 24 uur)

---

## 🎯 STAP 4: Test Website

### 4.1 Browser Test
1. Open: `https://www.seniorease.nl`
2. **Hard refresh:** `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)
3. **Werkt de website?**
   - ✅ **Ja** → Klaar! 🎉
   - ❌ **Nee** → Ga naar Stap 4.2

### 4.2 Browser Console Check
1. Open website: `https://www.seniorease.nl`
2. Druk **F12** (Developer Tools)
3. Ga naar tab: **Network**
4. Refresh pagina (F5)
5. Klik op eerste request (meestal `www.seniorease.nl`)
6. Klik op tab: **Headers**
7. Scroll naar **Response Headers**

**Check:**
- ✅ Zie je `x-vercel-id`? → Website draait op Vercel! (mogelijk cache)
- ❌ Zie je `server: Strato`? → DNS wijst nog naar Strato (wacht langer)
- ❌ Zie je error? → Noteer error

### 4.3 Als Website Nog Offline

**Mogelijke oorzaken:**

1. **DNS propagatie nog niet klaar**
   - Oplossing: Wacht 1-2 uur, test opnieuw
   - Check: [dnschecker.org](https://dnschecker.org)

2. **Browser cache**
   - Oplossing: Incognito window
   - Of: Clear browser cache volledig

3. **DNS records niet correct**
   - Oplossing: Check Stap 2 opnieuw
   - Gebruik **exacte** Vercel records

4. **Vercel deployment probleem**
   - Oplossing: Check Vercel dashboard → Deployments → Logs

---

## 📋 Checklist

### ✅ Vercel:
- [ ] Project `seniorease-site` bestaat
- [ ] Domain `www.seniorease.nl` is gekoppeld
- [ ] DNS records zijn gekopieerd (A record IP + CNAME)
- [ ] Vercel URL werkt (test direct)

### ✅ Strato:
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

**Noteer deze informatie:**

1. **Vercel project:** `seniorease-site`
2. **Vercel URL:** `https://_________________.vercel.app`
3. **Vercel DNS records:**
   - A record IP: `_________________`
   - CNAME: `_________________`
4. **Strato huidige DNS:**
   - Root `@`: `_________________`
   - WWW: `_________________`
5. **Error messages:** `_________________`

**Contact:**
- **Strato Support:** [https://www.strato.nl/contact](https://www.strato.nl/contact)
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)

---

## 💡 Belangrijke Tips

1. **Gebruik exacte waarden uit Vercel dashboard**
   - Elke Vercel project heeft unieke DNS records
   - Kopieer-pakken is het veiligst

2. **Maak backup van huidige DNS**
   - Screenshot van Strato DNS records
   - Voor het geval je terug moet

3. **Wacht op DNS propagatie**
   - Kan 5 minuten tot 2 uur duren
   - Gebruik [dnschecker.org](https://dnschecker.org) om te checken

4. **Test in incognito window**
   - Browser cache kan oude versie tonen
   - Incognito omzeilt cache

5. **Check Vercel domain status**
   - Vercel toont of DNS correct is
   - Status "Valid" = DNS klopt

---

**Start met STAP 1 en laat me weten wat je ziet bij elke stap!** 🔍
