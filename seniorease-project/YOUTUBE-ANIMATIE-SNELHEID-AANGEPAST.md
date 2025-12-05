# ⚡ Bibliotheek Animatie - Snelheid Aangepast
## SeniorEase - Langzamer voor Senioren

---

## ✅ Wat is Aangepast

De bibliotheek animatie gaat nu **langzamer** voor betere leesbaarheid voor senioren.

### **Aanpassingen:**

1. **Scherm durations verdubbeld:**
   - Was: 2000ms (2 seconden) → Nu: 4000ms (4 seconden)
   - Was: 3000ms (3 seconden) → Nu: 5000ms (5 seconden)

2. **Cursor beweging langzamer:**
   - Was: 1 seconde → Nu: 2 seconden
   - Cursor beweegt nu rustiger

3. **Type snelheid langzamer:**
   - Was: 100ms per karakter → Nu: 150ms per karakter
   - Tekst wordt nu langzamer getypt

---

## 📊 Nieuwe Timing

**Totale animatie lengte:**
- **Voor:** ~20 seconden
- **Nu:** ~40 seconden
- **Verschil:** 2x langzamer

**Per stap:**
- Homepage: 4 seconden (was 2)
- Bibliotheek pagina: 4 seconden (was 2)
- Formulier tonen: 3 seconden (was 2)
- Titel typen: 5 seconden (was 3)
- Auteur typen: 4 seconden (was 2)
- Keuze scherm: 5 seconden (was 3)
- Barcode scanner: 5 seconden (was 3)
- Succes scherm: 5 seconden (was 3)

---

## 🎬 Testen

1. **Open animatie:**
   - Ga naar: `public/youtube-animaties/bibliotheek-animatie.html`
   - Of: `http://localhost:3001/animaties/bibliotheek`

2. **Test animatie:**
   - Klik "Start"
   - Check of snelheid nu goed is
   - Als nog te snel: laat het weten!

3. **Opnemen:**
   - Als snelheid goed is, neem op
   - Windows + G → Record
   - Klik "Start" in animatie

---

## 🔧 Verder Aanpassen (Als Nodig)

Als je de animatie **nog langzamer** wilt:

**In `bibliotheek-animatie.html`, regel ~485-551:**

Verhoog alle `duration` waarden:
- `4000` → `6000` (nog langzamer)
- `5000` → `7000` (nog langzamer)

**Cursor snelheid:**
- Regel ~572: `2s` → `3s` (nog langzamer)

**Type snelheid:**
- Regel ~603: `150` → `200` (nog langzamer typen)

---

## ✅ Klaar!

De animatie gaat nu **2x langzamer** en is beter geschikt voor senioren.

**Test het en laat weten of de snelheid nu goed is!** 🎬

---

**Laatste update:** 23 november 2025  
**Status:** Snelheid Aangepast


