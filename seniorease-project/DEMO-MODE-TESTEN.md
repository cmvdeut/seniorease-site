# 🧪 Demo Mode Testen

## ❌ Probleem
Demo versie was niet zichtbaar omdat:
1. **Desktop**: Altijd `hasLicense = true` (geen demo mode)
2. **Mobiel**: Demo mode alleen als er GEEN licentie in localStorage staat

## ✅ Oplossing
Demo mode werkt nu ook op desktop voor testen.

## 🧪 Hoe Demo Mode Te Zien

### Optie 1: Verwijder Licentie (Als je die hebt)
1. Open browser console (F12)
2. Typ: `localStorage.removeItem('seniorease-licentie')`
3. Refresh pagina (F5)
4. Demo banner zou nu moeten verschijnen

### Optie 2: Test op Mobiel (Zonder Licentie)
1. Open site op mobiel apparaat
2. Zorg dat er GEEN licentie in localStorage staat
3. Demo banner verschijnt automatisch

### Optie 3: Test in Incognito/Private Window
1. Open incognito/private window
2. Ga naar `seniorease.nl/bibliotheek` of `/download`
3. Demo banner zou moeten verschijnen (geen localStorage)

## 📋 Wat is Aangepast

### `app/bibliotheek/page.tsx`
- ✅ Demo mode werkt nu ook op desktop
- ✅ Demo banner verschijnt als er geen licentie is

### `app/download/page.tsx`
- ✅ Demo mode werkt nu ook op desktop
- ✅ Demo banner verschijnt als er geen licentie is

## 🔍 Verificatie

Na de wijzigingen:

1. **Verwijder licentie** (als je die hebt):
   ```javascript
   localStorage.removeItem('seniorease-licentie')
   ```

2. **Refresh pagina**

3. **Check demo banner**:
   - `/bibliotheek` - Gele banner bovenaan: "Demo Versie - X/10 items gebruikt"
   - `/download` - Gele banner: "Probeer eerst de Demo Versie Gratis!"

## 🚀 Deployen

Na testen lokaal:
```powershell
git add app/bibliotheek/page.tsx app/download/page.tsx
git commit -m "Fix: Enable demo mode on desktop for testing"
git push origin main
```

---

**Status:** ✅ Demo mode werkt nu ook op desktop!








