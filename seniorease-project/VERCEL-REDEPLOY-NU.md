# 🚀 Vercel Redeploy - Test Wijzigingen

**Doel:** Website opnieuw deployen om te testen of wijzigingen correct doorgevoerd worden.

---

## ✅ Optie 1: Via Vercel Dashboard (Snelste Methode)

### Stap 1: Ga naar Vercel Dashboard
1. Open: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Log in
3. Klik op project: **`seniorease-site`**

### Stap 2: Trigger Redeploy
1. Ga naar tab: **"Deployments"**
2. Klik op de **laatste deployment** (bovenaan)
3. Klik op **"..."** (drie puntjes menu) rechtsboven
4. Kies: **"Redeploy"**
5. **BELANGRIJK:** Zet **"Use existing Build Cache"** = **OFF** ❌
   - Dit zorgt voor een schone build
6. Klik **"Redeploy"**

### Stap 3: Wacht op Deployment
- **Status:** "Building" → "Ready"
- **Tijd:** 2-3 minuten
- **Check:** Refresh de pagina om status te zien

### Stap 4: Test Website
1. Wacht tot status **"Ready"** is (groen)
2. Test: `https://www.seniorease.nl`
3. **Hard refresh:** `Ctrl + Shift + R` (om cache te omzeilen)

---

## ✅ Optie 2: Via GitHub Push (Automatisch)

### Stap 1: Maak Lege Commit
```powershell
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
git commit --allow-empty -m "Redeploy: Test DNS fix en wijzigingen"
git push origin main
```

### Stap 2: Wacht op Automatische Deployment
- Vercel detecteert automatisch de push
- Nieuwe deployment start binnen 1-2 minuten
- Check Vercel Dashboard → Deployments

### Stap 3: Test Website
- Wacht tot deployment "Ready" is
- Test: `https://www.seniorease.nl`

---

## ✅ Optie 3: Via Vercel CLI (Als Geïnstalleerd)

### Stap 1: Check of Vercel CLI Geïnstalleerd Is
```powershell
vercel --version
```

**Als niet geïnstalleerd:**
```powershell
npm install -g vercel
```

### Stap 2: Deploy
```powershell
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
vercel --prod --force
```

**`--force`** = Force clean build (geen cache)

---

## 🔍 Verificatie Na Deployment

### 1. Check Deployment Status
**In Vercel Dashboard:**
- [ ] Status: **"Ready"** (groen)
- [ ] Geen errors in build logs
- [ ] Deployment tijd: [noteer tijd]

### 2. Test Website Functionaliteit
**Test deze pagina's:**
- [ ] Homepage: `https://www.seniorease.nl`
- [ ] Bibliotheek: `https://www.seniorease.nl/bibliotheek`
- [ ] Contact: `https://www.seniorease.nl/contact`
- [ ] Hulp: `https://www.seniorease.nl/hulp`

**Check:**
- [ ] Website laadt correct
- [ ] Geen 404 errors
- [ ] Alle functionaliteit werkt
- [ ] Styling is correct

### 3. Check Browser Console
1. Open website: `https://www.seniorease.nl`
2. Druk **F12** (Developer Tools)
3. Ga naar tab: **Console**
4. **Check voor errors:**
   - [ ] Geen rode errors
   - [ ] Alleen normale warnings (OK)

### 4. Check Network Headers
1. Open website: `https://www.seniorease.nl`
2. Druk **F12** → Tab: **Network**
3. Refresh pagina (F5)
4. Klik op eerste request
5. Check **Response Headers:**
   - [ ] Zie je `x-vercel-id`? → Website draait op Vercel ✅
   - [ ] Zie je `server: Vercel`? → Correct ✅

---

## 🎯 Wat Te Testen

### DNS Fix Verificatie:
- [ ] Website werkt op `www.seniorease.nl`
- [ ] Website werkt op `seniorease.nl` (redirect naar www)
- [ ] Geen DNS errors in console

### Functionaliteit:
- [ ] Alle pagina's laden
- [ ] Contact formulier werkt (als aanwezig)
- [ ] Navigatie werkt
- [ ] Links werken

### Performance:
- [ ] Website laadt snel
- [ ] Geen lange laadtijden
- [ ] Afbeeldingen laden correct

---

## 🆘 Als Deployment Faalt

### Check Build Logs:
1. Vercel Dashboard → Project → **Deployments**
2. Klik op gefaalde deployment
3. Ga naar **"Build Logs"** tab
4. Scroll naar beneden
5. **Zoek naar errors** (rode tekst)
6. Noteer error messages

### Veelvoorkomende Problemen:

1. **Build Error:**
   - Oplossing: Check build logs voor specifieke error
   - Fix de error in code
   - Push opnieuw

2. **Deployment Timeout:**
   - Oplossing: Wacht 5 minuten, probeer opnieuw
   - Of: Check of build niet te lang duurt

3. **Environment Variables Missing:**
   - Oplossing: Check Vercel → Settings → Environment Variables
   - Voeg ontbrekende variabelen toe

---

## 📋 Checklist

**Voor Deployment:**
- [ ] Gekozen welke methode (Dashboard/GitHub/CLI)
- [ ] Klaar om te deployen

**Tijdens Deployment:**
- [ ] Deployment gestart
- [ ] Status: "Building"
- [ ] Wacht op "Ready"

**Na Deployment:**
- [ ] Status: "Ready" ✅
- [ ] Website getest
- [ ] Geen errors
- [ ] Functionaliteit werkt

---

## 💡 Tips

1. **Gebruik Hard Refresh:**
   - `Ctrl + Shift + R` (Windows)
   - `Cmd + Shift + R` (Mac)
   - Om browser cache te omzeilen

2. **Test in Incognito:**
   - Open incognito/private window
   - Test website daar
   - Zeker weten dat cache geen probleem is

3. **Check Meerdere Pagina's:**
   - Test niet alleen homepage
   - Test verschillende pagina's
   - Check of alles werkt

4. **Wacht op Propagatie:**
   - Na DNS fix kan het 5-10 minuten duren
   - Na deployment kan het 1-2 minuten duren
   - Wees geduldig

---

**Kies een optie en start de deployment! Laat me weten wat je ziet!** 🚀
