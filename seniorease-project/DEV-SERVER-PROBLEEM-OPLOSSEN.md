# 🔧 Dev Server Probleem Oplossen

**Probleem:** Geen connectie met `http://localhost:3001`

---

## ✅ Stap 1: Check of Server Draait

**In PowerShell:**
```powershell
netstat -ano | findstr :3001
```

**Als er niets staat:** Server draait niet → Ga naar Stap 2
**Als er wel iets staat:** Server draait → Check Stap 3

---

## 🚀 Stap 2: Start Dev Server

**In PowerShell:**
```powershell
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
npm run dev
```

**Wacht tot je ziet:**
```
✓ Ready in X seconds
○ Local: http://localhost:3001
```

**Als je errors ziet:**
- Noteer de error message
- Check of alle dependencies geïnstalleerd zijn: `npm install`

---

## 🔍 Stap 3: Check Browser

**Als server draait maar browser geen connectie:**

1. **Check URL:**
   - Gebruik: `http://localhost:3001/bibliotheek`
   - **NIET:** `https://localhost:3001` (geen HTTPS!)

2. **Check Firewall:**
   - Windows Firewall kan poort 3001 blokkeren
   - Probeer poort te wijzigen (zie Stap 4)

3. **Check andere processen:**
   - Misschien draait er al iets op poort 3001
   - Probeer poort te wijzigen (zie Stap 4)

---

## 🔧 Stap 4: Wijzig Poort (Als 3001 Niet Werkt)

**Optie A: Wijzig in package.json**
```json
"dev": "next dev -H 0.0.0.0 -p 3000"
```

**Optie B: Gebruik andere poort direct:**
```powershell
npx next dev -p 3000
```

**Dan open:** `http://localhost:3000/bibliotheek`

---

## 🆘 Veelvoorkomende Problemen

### Probleem 1: "Port already in use"
**Oplossing:**
```powershell
# Vind proces op poort 3001
netstat -ano | findstr :3001

# Stop proces (vervang PID met nummer uit bovenstaande)
taskkill /PID [PID] /F

# Of gebruik andere poort
npx next dev -p 3000
```

### Probleem 2: "Cannot find module"
**Oplossing:**
```powershell
npm install
```

### Probleem 3: "EADDRINUSE"
**Oplossing:**
- Stop alle Node processen
- Of gebruik andere poort

---

## 📋 Checklist

- [ ] Dev server gestart (`npm run dev`)
- [ ] Zie "Ready" bericht
- [ ] Browser geopend: `http://localhost:3001`
- [ ] Geen firewall blokkering
- [ ] Poort 3001 niet in gebruik door ander proces

---

**Laat me weten wat je ziet wanneer je `npm run dev` uitvoert!** 🔍
