# 🔧 .eslintrc.json Toevoegen aan GitHub Desktop

**Probleem:** `.eslintrc.json` wordt niet getoond in GitHub Desktop.

**Oplossing:** Voeg het bestand handmatig toe via GitHub Desktop of PowerShell.

---

## ✅ Optie 1: Via GitHub Desktop

**Stap voor stap:**

1. **Open GitHub Desktop**
2. **Selecteer repository:** `seniorease-project` (linksboven)
3. **Klik op "Repository"** in de menubalk
4. **Kies "Show in Explorer"** (of "Reveal in Finder" op Mac)
5. **Check of `.eslintrc.json` bestaat** in de folder
6. **Ga terug naar GitHub Desktop**
7. **Klik op "Repository"** → **"Refresh"** (of druk `Ctrl+R`)
8. **Check links:** Nu zou je `.eslintrc.json` moeten zien met een **groene +**

**Als je het nog steeds niet ziet:**

9. **Klik rechts op `.eslintrc.json`** in de file list (als het er is)
10. **Kies "Add to Git"** of **"Stage"**

---

## ✅ Optie 2: Via PowerShell (Sneller)

**Run deze commands:**

```powershell
cd d:\MAUREEN\DEV\Seniorease\seniorease-project

# Check of bestand bestaat
Test-Path .eslintrc.json

# Voeg toe aan git
git add .eslintrc.json

# Check status
git status
```

**Verwacht:** Je zou `.eslintrc.json` moeten zien in de output.

**Daarna in GitHub Desktop:**
- Refresh (Ctrl+R)
- Je zou het bestand nu moeten zien

---

## ✅ Optie 3: Add Alle Changes

**Als je alle bestanden wilt toevoegen:**

```powershell
cd d:\MAUREEN\DEV\Seniorease\seniorease-project

# Add alle changes
git add .

# Check status
git status
```

**Dit voegt toe:**
- `.eslintrc.json`
- `package.json` (ESLint versie)
- `app/contact/page.tsx` (contact formulier)
- `app/api/contact/route.ts` (API route)
- `app/not-found.tsx` (404 pagina)
- `app/bibliotheek/page.tsx` (error handling)

**Daarna:**
- Refresh GitHub Desktop (Ctrl+R)
- Alle bestanden zouden zichtbaar moeten zijn

---

## ✅ Commit en Push

**Na het toevoegen:**

1. **In GitHub Desktop:**
   - Typ commit message: `Fix: Add ESLint config, contact form, 404 page, and improve error handling`
   - Klik **"Commit to main"**
   - Klik **"Push origin"**

2. **Of via PowerShell:**
   ```powershell
   git commit -m "Fix: Add ESLint config, contact form, 404 page, and improve error handling"
   git push origin main
   ```

---

## 🔍 Verificatie

**Check of het werkt:**

1. **GitHub Desktop:** Zie je `.eslintrc.json` in de file list?
2. **Na push:** Ga naar `https://github.com/cmvdeut/seniorease-site`
3. **Check:** Zie je `.eslintrc.json` in de repository?

---

**Laat me weten of je het bestand nu ziet in GitHub Desktop!** 🔍


