# 🧪 Lokaal Testen - Demo Elementen Verwijderen

**Doel:** Eerst lokaal testen voordat we deployen.

---

## 🚀 Stap 1: Start Lokale Server

```powershell
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
npm run dev
```

**Wacht tot je ziet:**
```
✓ Ready in X seconds
○ Local: http://localhost:3001
```

---

## 🔍 Stap 2: Test Bibliotheek Pagina

1. **Open browser:** `http://localhost:3001/bibliotheek`

2. **Check wat je ziet:**
   - [ ] Gele banner bovenaan met "Demo Versie - 0/10 items gebruikt"?
   - [ ] "Demo (max 10 items)" tag naast "Mijn Bibliotheek"?
   - [ ] "Koop licentie" knop?
   - [ ] "0/10 gebruikt" tekst?

3. **Noteer wat je ziet:**
   - Welke demo elementen zijn nog zichtbaar?
   - Waar staan ze precies?

---

## 🔧 Stap 3: Als Demo Elementen Nog Zichtbaar Zijn

**Als je nog demo elementen ziet, moeten we ze verwijderen:**

1. **Gele banner bovenaan** → Moet worden verwijderd
2. **"Demo (max 10 items)" tag** → Moet worden verwijderd
3. **"Koop licentie" knop** → Moet worden verwijderd
4. **"0/10 gebruikt" tekst** → Moet worden verwijderd

**Laat me weten wat je ziet, dan pas ik de code aan!**

---

## ✅ Stap 4: Als Geen Demo Elementen Zichtbaar Zijn

**Als je GEEN demo elementen meer ziet:**

1. ✅ Code is al aangepast
2. ✅ Test functionaliteit:
   - Kun je items toevoegen?
   - Werkt barcode scanner?
   - Werken alle knoppen?
3. ✅ Als alles werkt → Klaar voor deployment!

---

## 📋 Checklist

**Voor Lokaal Testen:**
- [ ] Dev server gestart (`npm run dev`)
- [ ] Browser geopend: `http://localhost:3001/bibliotheek`
- [ ] Gecheckt welke demo elementen zichtbaar zijn
- [ ] Functionaliteit getest

**Na Lokaal Testen:**
- [ ] Demo elementen verwijderd (als nodig)
- [ ] Alles werkt correct
- [ ] Klaar voor deployment

---

**Start de dev server en laat me weten wat je ziet!** 🧪
