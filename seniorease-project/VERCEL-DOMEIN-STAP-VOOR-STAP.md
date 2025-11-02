# 🌐 Vercel Domain Setup - Stap voor Stap

## ⚠️ Belangrijk: Vercel ≠ GitHub

Domains worden **NIET** in GitHub geconfigureerd, maar in **Vercel Dashboard**!

---

## 📍 Stap 1: Ga naar Vercel Dashboard

### 1.1 Open Vercel
1. Ga naar: **[https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Log in met je account (meestal GitHub login)

### 1.2 Vind je Project
1. In het dashboard zie je je projecten
2. Zoek naar: **seniorease-site** (of hoe je project ook heet)
3. Klik op het project om het te openen

---

## 🔧 Stap 2: Navigeer naar Domains Settings

### 2.1 Project Pagina
Op de project pagina zie je tabs bovenaan:
- **Deployments** (actief)
- **Settings** ← **HIER!**
- **Analytics**
- **Logs**

### 2.2 Settings Menu
1. Klik op **Settings** tab
2. Links zie je een menu:
   - General
   - **Domains** ← **HIER!**
   - Environment Variables
   - Git
   - Integrations
   - etc.

3. Klik op **Domains**

---

## ➕ Stap 3: Domain Toevoegen

### 3.1 Add Domain
1. Je ziet een lijst met domains (waarschijnlijk nog leeg of alleen `.vercel.app`)
2. Klik op de knop: **Add Domain** (of "Domein toevoegen")
3. Er opent een popup/veld

### 3.2 Voer Domain In
1. Voer in: `seniorease.nl`
2. Klik op **Add** (of "Toevoegen")

### 3.3 Vercel toont DNS Records
Vercel geeft nu **twee opties**:

**Optie A: Apex Domain** (root domain)
```
Type: A
Name: @
Value: [een IP adres, bijv. 76.76.21.21]
```

**Optie B: CNAME**
```
Type: CNAME  
Name: @
Value: [een CNAME record]
```

**Of voor www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

📋 **KOPIEER DEZE RECORDS - je hebt ze nodig!**

---

## 🔍 Stap 4: Als je Domains niet ziet

### Mogelijke Oorzaken:

1. **Je bent niet ingelogd in Vercel**
   - Ga naar [vercel.com](https://vercel.com) en log in

2. **Je hebt het verkeerde project open**
   - Check of je in **seniorease-site** project bent
   - Niet in GitHub, maar Vercel!

3. **Je project staat op een ander Vercel account**
   - Check welk account je gebruikt
   - Mogelijk moet je van account wisselen

4. **Je project is nog niet gedeployed naar Vercel**
   - Dan moet je eerst het project importeren/koppelen
   - Zie "Project Setup" hieronder

---

## 🆕 Als Project Nog Niet op Vercel Staat

### Import Project:
1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Kies **Import Git Repository**
3. Selecteer: **GitHub** → **seniorease-site**
4. Klik **Import**
5. Wacht tot deployment klaar is
6. Ga dan naar Settings → Domains

---

## 📸 Visuele Hulp

### Vercel Dashboard Locatie:
```
https://vercel.com/dashboard
  └─ seniorease-site (klik hier)
      └─ Settings (tab bovenaan)
          └─ Domains (linker menu)
              └─ Add Domain (knop)
```

---

## ✅ Checklist

- [ ] Ben je op vercel.com (niet github.com)?
- [ ] Ben je ingelogd in Vercel?
- [ ] Staat je project op Vercel?
- [ ] Heb je de Settings tab gevonden?
- [ ] Zie je "Domains" in het linker menu?
- [ ] Kun je "Add Domain" klikken?

---

## 🆘 Als het nog steeds niet werkt

Laat me weten:
1. Zie je je project in Vercel Dashboard?
2. Welke tabs zie je bovenaan het project?
3. Welke opties zie je in het Settings menu?

Dan kan ik je verder helpen! 🚀

