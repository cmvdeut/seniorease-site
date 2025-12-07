# 🔍 Strato & Vercel Instellingen Checklist

**Domein:** `seniorease.nl`  
**Status:** Website is offline ❌  
**Datum:** $(Get-Date -Format "yyyy-MM-dd HH:mm")

---

## 📋 Stap 1: Vercel Status Checken

### 1.1 Vercel Dashboard Openen
1. Ga naar: **[https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Log in met je account
3. Zoek naar project: **`seniorease-site`**

### 1.2 Check Project Status
**Vul in:**
- [ ] **Project naam:** `_________________`
- [ ] **Laatste deployment:** `_________________`
- [ ] **Deployment status:** 
  - [ ] ✅ Ready
  - [ ] ⏳ Building
  - [ ] ❌ Error
- [ ] **Vercel URL:** `https://_________________.vercel.app`

### 1.3 Test Vercel URL Direct
1. Open de Vercel URL in je browser
2. **Werkt de website daar?**
   - [ ] ✅ Ja, website werkt op Vercel URL
   - [ ] ❌ Nee, website werkt ook niet op Vercel URL

**Als website WEL werkt op Vercel URL maar NIET op seniorease.nl:**
→ **Probleem is DNS/Strato configuratie** ✅

**Als website NIET werkt op Vercel URL:**
→ **Probleem is Vercel deployment** ❌

---

## 🌐 Stap 2: Vercel Domain Configuratie

### 2.1 Ga naar Domain Settings
1. In Vercel Dashboard → **`seniorease-site`** project
2. Klik op tab: **Settings**
3. Klik in menu links: **Domains**

### 2.2 Check Gekoppelde Domains
**Vul in wat je ziet:**
- [ ] **Aantal domains:** `____`
- [ ] **Domain 1:** `_________________`
  - Status: [ ] ✅ Valid [ ] 🟡 Pending [ ] ❌ Invalid
- [ ] **Domain 2:** `_________________`
  - Status: [ ] ✅ Valid [ ] 🟡 Pending [ ] ❌ Invalid

### 2.3 Als Domain Niet Gekoppeld Is
**Als `seniorease.nl` of `www.seniorease.nl` NIET in de lijst staat:**

1. Klik op **"Add Domain"** (of "Domein toevoegen")
2. Voer in: `www.seniorease.nl`
3. Klik **Add**
4. Vercel toont nu **DNS records** die je nodig hebt
5. **📋 KOPIEER DEZE RECORDS!**

**Vercel DNS Records (voorbeeld):**
```
Type: A
Name: @
Value: [IP ADRES] → _________________

Type: CNAME
Name: www
Value: [CNAME WAARDE] → _________________
```

---

## 🔧 Stap 3: Strato DNS Configuratie

### 3.1 Log In bij Strato
1. Ga naar: **[https://www.strato.nl](https://www.strato.nl)**
2. Log in met je account
3. Ga naar: **Domainbeheer** of **Mijn Domains**

### 3.2 Vind DNS Beheer
1. Zoek naar: **`seniorease.nl`**
2. Klik op het domain
3. Ga naar: **DNS beheer** of **DNS Management**

### 3.3 Check Huidige DNS Records
**Noteer wat er NU staat:**

**A Records:**
- [ ] A record voor `@` (root):
  - IP: `_________________`
  - TTL: `_________________`
- [ ] A record voor `www`:
  - IP: `_________________`
  - TTL: `_________________`

**CNAME Records:**
- [ ] CNAME voor `www`:
  - Waarde: `_________________`
  - TTL: `_________________`

**Andere Records:**
- [ ] MX records: `_________________`
- [ ] TXT records: `_________________`

### 3.4 Update DNS naar Vercel

**⚠️ BELANGRIJK: Maak eerst een backup van je huidige DNS records!**

**Voor Root Domain (`@` of leeg):**
1. **Verwijder** oude A record (als die naar Strato IP wijst)
2. **Voeg toe** nieuwe A record:
   - Type: **A**
   - Name: `@` (of leeg laten)
   - Value: **[Vercel IP uit stap 2.3]**
   - TTL: `3600` (of Auto)

**Voor WWW Subdomain:**
1. **Verwijder** oude A of CNAME record voor `www`
2. **Voeg toe** nieuwe CNAME record:
   - Type: **CNAME**
   - Name: `www`
   - Value: **[Vercel CNAME uit stap 2.3]** (bijv. `cname.vercel-dns.com`)
   - TTL: `3600` (of Auto)

**⚠️ Let op:**
- **NIET** beide A en CNAME voor `www` tegelijk!
- Gebruik **CNAME** voor `www` (aanbevolen door Vercel)
- Gebruik **A record** voor root `@` (of CNAME als Vercel dat aangeeft)

### 3.5 Sla Op
1. Klik **Opslaan** of **Save**
2. **Noteer tijd:** `_________________`
3. DNS propagatie duurt: **5 minuten - 2 uur**

---

## 🔍 Stap 4: DNS Propagatie Checken

### 4.1 Direct Check (PowerShell)
```powershell
Resolve-DnsName www.seniorease.nl -Type A
Resolve-DnsName seniorease.nl -Type A
```

**Vul in wat je ziet:**
- [ ] `www.seniorease.nl` wijst naar: `_________________`
- [ ] `seniorease.nl` wijst naar: `_________________`

**Verwacht:**
- Moet wijzen naar Vercel IP (uit stap 2.3)
- **NIET** naar Strato IP

### 4.2 Online DNS Checker
1. Ga naar: **[https://dnschecker.org](https://dnschecker.org)**
2. Voer in: `www.seniorease.nl`
3. Selecteer: **A record**
4. Klik **Search**

**Check resultaten:**
- [ ] Wereldwijd wijst naar Vercel IP? ✅
- [ ] Sommige locaties nog Strato IP? ⏳ (wacht op propagatie)
- [ ] Alle locaties nog Strato IP? ❌ (DNS niet correct geconfigureerd)

### 4.3 Vercel Domain Status
1. Ga terug naar Vercel → Settings → Domains
2. Check status van `www.seniorease.nl`:
   - [ ] 🟢 **Valid** → DNS klopt! ✅
   - [ ] 🟡 **Pending** → Wacht op propagatie (5 min - 2 uur)
   - [ ] 🔴 **Invalid** → DNS records kloppen niet ❌

---

## 🎯 Stap 5: Test Website

### 5.1 Test in Browser
1. Open: **`https://www.seniorease.nl`**
2. **Werkt de website?**
   - [ ] ✅ Ja, website werkt!
   - [ ] ❌ Nee, nog steeds offline

### 5.2 Als Website Nog Offline Is

**Check Browser Console:**
1. Open website: `https://www.seniorease.nl`
2. Druk **F12** (Developer Tools)
3. Ga naar tab: **Network**
4. Refresh pagina (F5)
5. Klik op eerste request
6. Check **Response Headers:**
   - [ ] Zie je `x-vercel-id`? → Website draait op Vercel ✅
   - [ ] Zie je `server: Strato`? → Website draait nog op Strato ❌
   - [ ] Zie je error? → Noteer error: `_________________`

**Mogelijke Oorzaken:**
1. **DNS propagatie nog niet klaar**
   - Oplossing: Wacht 1-2 uur, test opnieuw
2. **Browser cache**
   - Oplossing: Hard refresh (`Ctrl + Shift + R`) of incognito window
3. **DNS records niet correct**
   - Oplossing: Check stap 3.4 opnieuw, gebruik exacte Vercel records
4. **Vercel deployment probleem**
   - Oplossing: Check stap 1.2, force redeploy in Vercel

---

## 📋 Samenvatting Checklist

### Vercel:
- [ ] Project `seniorease-site` bestaat en is "Ready"
- [ ] Vercel URL werkt (test direct)
- [ ] Domain `www.seniorease.nl` is gekoppeld in Vercel
- [ ] Domain status is "Valid" of "Pending"

### Strato DNS:
- [ ] A record voor `@` wijst naar Vercel IP
- [ ] CNAME voor `www` wijst naar Vercel CNAME
- [ ] Oude Strato records zijn verwijderd
- [ ] DNS is opgeslagen

### Verificatie:
- [ ] DNS propagatie check (dnschecker.org)
- [ ] Browser test (hard refresh)
- [ ] Browser console check (F12 → Network → Headers)
- [ ] Website werkt op `www.seniorease.nl`

---

## 🆘 Als Niets Helpt

**Contact Informatie:**
- **Strato Support:** [https://www.strato.nl/contact](https://www.strato.nl/contact)
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)

**Wat te vermelden:**
- Domein: `seniorease.nl`
- Vercel project: `seniorease-site`
- Huidige DNS records (uit stap 3.3)
- Vercel DNS records (uit stap 2.3)
- Error messages (uit stap 5.2)

---

## 📝 Notities

**Tijd DNS aangepast:** `_________________`  
**Tijd eerste test:** `_________________`  
**Tijd laatste test:** `_________________`  
**Resultaat:** `_________________`

**Problemen/Opmerkingen:**
```
_________________
_________________
_________________
```

---

**Laat me weten wat je ziet bij elke stap!** 🔍
