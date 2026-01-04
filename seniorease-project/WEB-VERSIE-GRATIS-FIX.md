# 🔧 Web Versie Gratis Fix

**Probleem:** Web versie toont demo mode, maar moet altijd volledig gratis zijn

**Oplossing:** Alle demo mode checks verwijderen voor web versie

---

## ✅ Wat Moet Worden Aangepast

**Web versie (PC):**
- ✅ Altijd volledig gratis
- ✅ Geen licentie nodig
- ✅ Geen limieten
- ✅ Geen demo mode

**Mobiele APK:**
- ⚠️ Heeft licentie nodig (€2,99)
- ⚠️ Demo versie met 10 items limiet

---

## 🔍 Wijzigingen Nodig

**1. Licentie Check:**
- Web versie: `setHasLicense(true)` altijd
- Geen licentie check nodig voor web

**2. Demo Mode Checks Verwijderen:**
- Verwijder alle `hasLicense === 'demo'` checks
- Verwijder alle limiet checks (10 items)
- Verwijder demo banners
- Verwijder upgrade knoppen

**3. UI Aanpassingen:**
- Verwijder demo banners
- Verwijder "Demo Versie" labels
- Verwijder upgrade knoppen
- Toon alleen "Volledige Versie" of niets

---

## 📝 Bestanden Te Aanpassen

**`app/bibliotheek/page.tsx`:**
- Regel ~39-48: Licentie check → altijd `true` voor web
- Regel ~90-95: Demo limiet bij laden → verwijderen
- Regel ~112-121: Demo limiet bij opslaan → verwijderen
- Regel ~150-155: Demo limiet bij toevoegen → verwijderen
- Regel ~435-460: Demo limiet bij import → verwijderen
- Regel ~1468-1486: Demo banner → verwijderen
- Regel ~1502-1506: Demo label in titel → verwijderen
- Regel ~1510-1514: Demo counter → verwijderen
- Regel ~1517-1525: Upgrade knop → verwijderen
- Regel ~1700-1720: Demo waarschuwingen → verwijderen
- Regel ~1726-1729: Demo check bij toevoegen → verwijderen
- Regel ~1743-1746: Demo check bij scanner → verwijderen
- Regel ~1749: Demo disabled check → verwijderen
- Regel ~2173-2190: Koop licentie sectie → verwijderen

---

**Fix wordt nu toegepast!** 🚀






