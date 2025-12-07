# 🚨 Strato Probleem Diagnose - Demo Mode Fix

**Probleem:** Demo mode elementen zijn nog steeds zichtbaar, er wordt niets gedeployed

**Vermoeden:** Website draait op Strato hosting in plaats van Vercel

---

## 🔍 Stap 1: Check Waar Website Draait

### Test 1: DNS Check
```powershell
# In PowerShell:
Resolve-DnsName www.seniorease.nl -Type A
```

**Wat zie je?**
- **Vercel IP** (76.76.x.x of 216.198.x.x) → Website draait op Vercel ✅
- **Strato IP** (andere IP) → Website draait op Strato ❌
- **Geen resultaat** → DNS probleem

### Test 2: Browser Console
1. Ga naar: `https://www.seniorease.nl/bibliotheek`
2. Open **F12** (Developer Tools)
3. Ga naar tab: **Network**
4. Refresh pagina
5. Klik op eerste request
6. Check **Response Headers:**
   - Zie je `x-vercel-id`? → Vercel ✅
   - Zie je `server: Strato`? → Strato ❌

### Test 3: Vercel URL Direct
1. Ga naar Vercel Dashboard
2. Klik op project: `seniorease-site`
3. Klik op laatste deployment
4. Kopieer de **Vercel URL** (bijv. `seniorease-site-xxxxx.vercel.app`)
5. Ga naar: `https://[vercel-url]/bibliotheek`
6. **Zie je demo mode?**
   - **Nee** → Code is goed, DNS/Strato probleem ✅
   - **Ja** → Code probleem (maar we hebben het al gefixt)

---

## ⚠️ Als Website op Strato Draait

**Probleem:** Strato serveert een **oude versie** van de website

**Oplossing:** DNS moet naar Vercel wijzen, niet naar Strato

---

## 🔧 Stap 2: Fix DNS bij Strato

### In Strato Dashboard:
1. **Log in:** https://www.strato.nl
2. **Ga naar:** Domainbeheer → `seniorease.nl` → DNS beheer

### Check Huidige DNS Records:
**Wat staat er nu?**
- A record voor `@` → Welk IP?
- CNAME voor `www` → Waar wijst het naar?

### Update naar Vercel:
1. **Haal Vercel DNS records op:**
   - Ga naar: https://vercel.com/dashboard
   - Project: `seniorease-site`
   - Settings → Domains
   - Klik "Edit" bij `www.seniorease.nl`
   - **Kopieer de DNS records**

2. **Update in Strato:**
   - **Verwijder oude A records** (als die naar Strato wijzen)
   - **Voeg Vercel A record toe:**
     - Type: A
     - Name: `@` (of leeg)
     - Value: [Vercel IP - uit Vercel dashboard]
   - **Voeg Vercel CNAME toe:**
     - Type: CNAME
     - Name: `www`
     - Value: [Vercel CNAME - uit Vercel dashboard]

3. **Sla op en wacht:**
   - 5-10 minuten voor eerste propagatie
   - 1-2 uur voor volledige propagatie

---

## 🎯 Stap 3: Verificatie

### Check DNS Propagatie:
1. Ga naar: https://dnschecker.org
2. Voer in: `www.seniorease.nl`
3. Check of A record naar Vercel IP wijst

### Check Vercel Status:
1. Vercel Dashboard → Settings → Domains
2. Status van `www.seniorease.nl`:
   - 🟢 **Valid** → DNS klopt ✅
   - 🟡 **Pending** → Wacht op propagatie
   - 🔴 **Invalid** → DNS records kloppen niet

### Test Website:
1. **Hard refresh:** `Ctrl + Shift + R`
2. **Check demo mode:** Zie je nog gele banner?
3. **Check console:** Open F12, check voor errors

---

## 🆘 Als Het Nog Steeds Niet Werkt

### Mogelijke Oorzaken:

1. **Strato serveert oude HTML bestanden**
   - Oplossing: Verwijder oude bestanden uit Strato hosting
   - Of: Zorg dat DNS naar Vercel wijst (niet naar Strato)

2. **Browser cache**
   - Oplossing: Incognito window
   - Of: Clear browser cache volledig

3. **CDN cache**
   - Oplossing: Wacht 10-15 minuten
   - Of: Clear Vercel cache (Redeploy zonder cache)

4. **Service Worker**
   - Oplossing: Unregister service worker
   - F12 → Application → Service Workers → Unregister

---

## 📋 Checklist

- [ ] Check waar website draait (DNS lookup)
- [ ] Test Vercel URL direct (bypass DNS)
- [ ] Check browser console (F12)
- [ ] Check Vercel deployment status
- [ ] Update DNS bij Strato naar Vercel
- [ ] Wacht op DNS propagatie
- [ ] Test op www.seniorease.nl
- [ ] Hard refresh (Ctrl + Shift + R)

---

## 💡 Belangrijk

**Als website op Strato draait:**
- Next.js kan niet direct op Strato draaien
- Strato heeft geen Node.js support (meestal)
- **Oplossing:** DNS moet naar Vercel wijzen

**Als DNS naar Vercel wijst:**
- Vercel serveert automatisch de nieuwste versie
- Geen upload naar Strato nodig
- Automatische deployments van GitHub

---

**Laat weten wat je ziet bij de DNS check!** 🔍

