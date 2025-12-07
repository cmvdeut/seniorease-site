# 🔍 Vercel DNS Records Bekijken - Volgende Stap

**Status:** `www.seniorease.nl` heeft "Valid Configuration" ✅ in Vercel  
**Probleem:** Website is nog steeds offline

---

## 📋 Stap 1: Bekijk DNS Records in Vercel

### 1.1 Klik op "View DNS Records"
In je Vercel dashboard (zoals in de screenshot):
1. Bij `www.seniorease.nl` → Klik op: **"View DNS Records & More for seniorease.nl →"**
2. Vercel toont nu de **exacte DNS records** die je nodig hebt

### 1.2 Noteer de DNS Records
**Kopieer deze waarden:**

**Voor Root Domain (`@`):**
- Type: `A`
- Name: `@` (of leeg)
- Value: `_________________` ← **Dit IP adres**

**Voor WWW:**
- Type: `CNAME`
- Name: `www`
- Value: `_________________` ← **Deze CNAME waarde**

**⚠️ BELANGRIJK:** Kopieer deze **exacte** waarden - je hebt ze nodig voor Strato!

---

## 🔧 Stap 2: Check Strato DNS Records

### 2.1 Log In bij Strato
1. Ga naar: [https://www.strato.nl](https://www.strato.nl)
2. Log in
3. Ga naar: **Mijn Producten** → **Domainbeheer** → **`seniorease.nl`** → **DNS beheer**

### 2.2 Vergelijk DNS Records
**Check of de Strato records MATCHEN met Vercel records:**

**Voor Root Domain (`@`):**
- [ ] Type: `A`
- [ ] Name: `@` (of leeg)
- [ ] Value: Moet **exact** hetzelfde zijn als Vercel IP

**Voor WWW:**
- [ ] Type: `CNAME`
- [ ] Name: `www`
- [ ] Value: Moet **exact** hetzelfde zijn als Vercel CNAME

**Als ze NIET matchen:**
→ Update Strato records naar Vercel waarden (zie Stap 3)

**Als ze WEL matchen:**
→ DNS is correct, maar mogelijk propagatie/cache probleem (zie Stap 4)

---

## 🔄 Stap 3: Update Strato DNS (Als Nodig)

### 3.1 Update Root Domain (`@`)
1. **Verwijder** oude A record (als die niet klopt)
2. **Voeg toe** nieuwe A record:
   - Type: `A`
   - Name: `@` (of leeg)
   - Value: [Vercel IP uit Stap 1.2]
   - TTL: `3600` (of Auto)

### 3.2 Update WWW
1. **Verwijder** oude A of CNAME record voor `www`
2. **Voeg toe** nieuwe CNAME record:
   - Type: `CNAME`
   - Name: `www`
   - Value: [Vercel CNAME uit Stap 1.2]
   - TTL: `3600` (of Auto)

### 3.3 Sla Op
- Klik **Opslaan** of **Save**
- Wacht 5-10 minuten voor eerste propagatie

---

## ⏱️ Stap 4: Test & Verificatie

### 4.1 Test Vercel URL Direct
1. In Vercel Dashboard → **Deployments**
2. Klik op laatste deployment
3. **Kopieer Vercel URL** (bijv. `seniorease-site-xxxxx.vercel.app`)
4. Open in browser: `https://[vercel-url]`

**Werkt de website daar?**
- ✅ **Ja** → DNS/Strato probleem (ga naar Stap 4.2)
- ❌ **Nee** → Vercel deployment probleem (check deployment logs)

### 4.2 DNS Propagatie Check
1. Open PowerShell
2. Voer uit:
```powershell
Resolve-DnsName www.seniorease.nl -Type A
```

**Check resultaat:**
- Wijst naar Vercel IP? → DNS klopt ✅
- Wijst naar Strato IP? → DNS nog niet geüpdatet ❌

### 4.3 Online DNS Checker
1. Ga naar: [https://dnschecker.org](https://dnschecker.org)
2. Voer in: `www.seniorease.nl`
3. Selecteer: **A record**
4. Klik **Search**

**Resultaat:**
- 🟢 **Groen wereldwijd** → DNS werkt! (test website)
- 🟡 **Gemengd** → Propagatie bezig (wacht 30 min - 2 uur)
- 🔴 **Rood** → DNS niet correct (check Strato opnieuw)

### 4.4 Test Website
1. Open: `https://www.seniorease.nl`
2. **Hard refresh:** `Ctrl + Shift + R`
3. **Werkt de website?**
   - ✅ **Ja** → Klaar! 🎉
   - ❌ **Nee** → Check browser console (F12 → Network → Headers)

---

## 🎯 Mogelijke Oorzaken

### Als Vercel "Valid Configuration" toont maar website offline is:

1. **DNS Propagatie Nog Niet Klaar**
   - Oplossing: Wacht 1-2 uur, check opnieuw
   - Verificatie: [dnschecker.org](https://dnschecker.org)

2. **Browser Cache**
   - Oplossing: Incognito window of clear cache
   - Test: `Ctrl + Shift + R` (hard refresh)

3. **Strato DNS Records Niet Correct**
   - Oplossing: Check Stap 2, update naar Vercel waarden
   - Verificatie: Vergelijk Strato met Vercel records

4. **Vercel Deployment Probleem**
   - Oplossing: Check Vercel → Deployments → Logs
   - Test: Vercel URL direct (bypass DNS)

5. **Local DNS Cache**
   - Oplossing: Flush DNS cache:
   ```powershell
   ipconfig /flushdns
   ```

---

## 📋 Checklist

- [ ] DNS records bekeken in Vercel (via "View DNS Records")
- [ ] DNS records genoteerd (A record IP + CNAME)
- [ ] Strato DNS records gecheckt
- [ ] Strato records vergeleken met Vercel records
- [ ] Strato records geüpdatet (als nodig)
- [ ] Vercel URL getest (werkt die?)
- [ ] DNS propagatie gecheckt (dnschecker.org)
- [ ] Website getest (hard refresh)
- [ ] Browser console gecheckt (F12 → Network → Headers)

---

**Start met Stap 1: Klik op "View DNS Records" in Vercel en kopieer de waarden!** 🔍
