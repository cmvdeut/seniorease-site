# 🎁 Demo Mode Activeren - Stap voor Stap

## ✅ Stap 1: Licentie Verwijderen (Automatisch)

Ik heb een test pagina gemaakt die automatisch de licentie verwrijderd!

### Optie A: Via Test Pagina (Eenvoudigst)
1. **Ga naar:** `http://localhost:3001/test-demo`
2. **Wacht 1 seconde** - licentie wordt automatisch verwijderd
3. **Je wordt automatisch doorgestuurd** naar `/bibliotheek`
4. **Demo banner zou nu moeten verschijnen!** 🎉

### Optie B: Handmatig in Browser Console
1. Open browser console (F12)
2. Typ: `localStorage.removeItem('seniorease-licentie')`
3. Druk Enter
4. Refresh pagina (F5)
5. Demo banner verschijnt!

### Optie C: Via Browser Developer Tools
1. Open Developer Tools (F12)
2. Ga naar **Application** tab (Chrome) of **Storage** tab (Firefox)
3. Klik op **Local Storage** → `http://localhost:3001`
4. Zoek `seniorease-licentie` en verwijder het
5. Refresh pagina

## 🧪 Testen

Na licentie verwijderen:

1. **Ga naar:** `http://localhost:3001/bibliotheek`
   - ✅ Demo banner bovenaan: "Demo Versie - 0/10 items gebruikt"
   - ✅ Gele banner met "Koop licentie (€2,99)" knop

2. **Ga naar:** `http://localhost:3001/download`
   - ✅ Demo banner: "Probeer eerst de Demo Versie Gratis!"
   - ✅ Demo features lijst
   - ✅ Installatie instructies

## 📋 Wat Werkt Nu

- ✅ Demo mode op desktop (voor testen)
- ✅ Demo mode op mobiel (zoals bedoeld)
- ✅ Demo banner zichtbaar
- ✅ Limiet van 10 items actief
- ✅ Upgrade knop naar volledige versie

## 🚀 Na Testen - Deployen

Als alles werkt:
```powershell
git add app/bibliotheek/page.tsx app/download/page.tsx app/test-demo/page.tsx
git commit -m "Fix: Enable demo mode on desktop and add test page"
git push origin main
```

---

**Status:** ✅ Test pagina gemaakt - Ga naar `/test-demo` om licentie te verwijderen!










