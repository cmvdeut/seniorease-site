# 🔍 Check: Draait Website op Strato of Vercel?

**Probleem:** Demo mode elementen zijn nog steeds zichtbaar

**Vraag:** Waar draait de website echt?

---

## ✅ Snel Check

### Test 1: Vercel URL Direct
1. Ga naar Vercel Dashboard: https://vercel.com/dashboard
2. Klik op project: `seniorease-site`
3. Klik op laatste deployment
4. Kopieer de **Vercel URL** (bijv. `seniorease-site-xxxxx.vercel.app`)
5. Ga naar: `https://[vercel-url]/bibliotheek`
6. **Zie je demo mode?**
   - **Nee** → Code is goed! DNS/Strato probleem ✅
   - **Ja** → Code probleem (maar we hebben het al gefixt)

### Test 2: Browser Console
1. Ga naar: `https://www.seniorease.nl/bibliotheek`
2. Open **F12** (Developer Tools)
3. Ga naar tab: **Network**
4. Refresh pagina (F5)
5. Klik op eerste request (meestal `bibliotheek`)
6. Klik op tab: **Headers**
7. Scroll naar **Response Headers**
8. **Zoek naar:**
   - `x-vercel-id` → Website draait op Vercel ✅
   - `server: Strato` → Website draait op Strato ❌
   - Geen van beide → Check andere headers

---

## 🔧 Als Website op Strato Draait

**Probleem:** Strato serveert een oude versie

**Oplossing:** DNS moet naar Vercel wijzen

### In Strato Dashboard:
1. Log in: https://www.strato.nl
2. Ga naar: **Domainbeheer** → `seniorease.nl` → **DNS beheer**
3. **Check huidige A records:**
   - Staat er een A record voor `@`?
   - Welk IP adres staat er?

4. **Update naar Vercel:**
   - **Verwijder** oude A records (als die naar Strato wijzen)
   - **Voeg Vercel A record toe:**
     - Type: **A**
     - Name: `@` (of leeg)
     - Value: **[Vercel IP - haal op uit Vercel dashboard]**

### Vercel IP Ophalen:
1. Vercel Dashboard → Project → Settings → Domains
2. Klik "Edit" bij `www.seniorease.nl`
3. Vercel toont DNS records
4. **Kopieer het A record IP adres**

---

## 🎯 Als Website op Vercel Draait

**Probleem:** Vercel cache of deployment

**Oplossing:**
1. **Force redeploy zonder cache:**
   - Vercel Dashboard → Deployments
   - Klik "..." → "Redeploy"
   - Zet "Use existing Build Cache" = **OFF**
   - Klik "Redeploy"

2. **Wacht 2-3 minuten**

3. **Test:**
   - Hard refresh: `Ctrl + Shift + R`
   - Of incognito window

---

## 📋 Wat Moet Je Doen?

### Stap 1: Check Waar Website Draait
- [ ] Test Vercel URL direct
- [ ] Check browser console (F12 → Network → Headers)
- [ ] Noteer wat je ziet

### Stap 2: Als op Strato
- [ ] Log in bij Strato
- [ ] Check DNS records
- [ ] Update DNS naar Vercel IP
- [ ] Wacht op propagatie (5-10 min)

### Stap 3: Als op Vercel
- [ ] Force redeploy zonder cache
- [ ] Wacht op deployment
- [ ] Hard refresh testen

---

**Laat weten wat je ziet bij Test 1 en Test 2!** 🔍

