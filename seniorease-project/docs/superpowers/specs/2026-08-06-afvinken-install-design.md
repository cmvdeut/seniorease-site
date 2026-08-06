# SeniorEase — Afvinken: makkelijker op telefoon zetten

**Status:** Approved for implementation (brainstorm 2026-08-06)  
**Date:** 2026-08-06  
**Scope:** `/afvinken` install-UX + dedicated PWA manifest for Afvinken

---

## Goal

Minder stappen en minder tekst om Afvinken op het beginscherm te zetten.  
Android: bij voorkeur **één tik**. iPhone: alleen de **drie onvermijdelijke Safari-stappen**, groot en met icoontjes.

Success: senioren snappen binnen enkele seconden wat ze moeten doen; beginscherm-icoon opent direct Afvinken.

---

## Placement

- Nieuwe install-band **bovenaan** de Afvinken-pagina (direct onder header/titel).
- Het lange groene instructieblok **onderaan** verwijderen (of vervangen door één discrete “Hulp nodig?”-link die naar dezelfde stappen scrollt — optioneel; default: verwijderen).

---

## Behaviour per situatie

| Situatie | UI |
|----------|-----|
| Al geïnstalleerd (standalone) | Korte bevestiging: “Staat al op uw beginscherm.” Geen install-knop. |
| Android Chrome + `beforeinstallprompt` | Grote knop “Zet op beginscherm” → native installprompt. |
| Android zonder prompt | Korte fallback: drie puntjes → App installeren / Toevoegen aan beginscherm (max. 3 regels). |
| iPhone/iPad in Safari | Geen nep-installknop. Drie grote stappen met icoontjes: Deel → Zet op beginscherm → Voeg toe. |
| iPhone/iPad in Chrome (of andere browser) | “Open deze pagina in Safari” + knop “Kopieer link” (Safari kan PWA toevoegen; Chrome op iOS niet). |
| Desktop | Tip: “Open deze pagina op uw telefoon om hem daar te zetten.” |

---

## Copy (kort)

- Band-titel: **Zet Afvinken op uw telefoon**
- Ondersteunende zin: **Dan opent u het met één tik, zoals een app.**
- Knop (Android): **Zet op beginscherm**
- Bevestiging: **Staat al op uw beginscherm.**

iPhone-stappen (labels):

1. Tik op **Deel** (□↑)
2. Kies **Zet op beginscherm**
3. Tik op **Voeg toe**

---

## PWA / manifest

- Nieuw bestand: `public/manifest-afvinken.json`
  - `name` / `short_name`: **Afvinken**
  - `start_url`: `/afvinken`
  - `scope`: `/afvinken` (of `/` als scope te smal blijkt voor assets — voorkeur smal houden zodat icoon Afvinken is)
  - `display`: `standalone`
  - Icons: bestaande `/icon-192.png` en `/icon-512.png` (geen nieuwe assets verplicht)
- Op `/afvinken`: via layout metadata / `<link rel="manifest">` dit manifest gebruiken i.p.v. site-breed `manifest.json`.
- Bestaande site-PWA (`manifest.json`) blijft voor de rest van de site.

Noot: iOS gebruikt vooral “Zet op beginscherm”; het aparte manifest helpt vooral Android-installnaam en start-URL.

---

## Componenten

- Uitbreiden of vervangen van `AddToHomeScreen`:
  - Detectie: iOS, Safari vs andere iOS-browser, standalone, desktop vs mobile.
  - Prominentere knop styling in lijn met SeniorEase (navy/gold/cream), geen emoji-overload.
- Afvinken-pagina: install-band bovenaan; onderaan-blok opruimen.

---

## Out of scope

- Play Store / App Store app
- QR-code vanaf desktop
- Wijzigingen aan andere tools (rekenmachine, kalender, …)
- Nieuwe illustratie-assets (tenzij later gewenst)

---

## Acceptance checks

1. Op Android Chrome (waar mogelijk): één tik op knop opent installprompt; na install opent icoon `/afvinken`.
2. Op iPhone Safari: drie duidelijke stappen zichtbaar bovenaan; geen dode “installeer”-knop.
3. Op iPhone Chrome: duidelijke Safari-melding + kopieer-link.
4. In standalone-modus: bevestigingstekst, geen install-UI.
5. Lange dubbele instructiekolommen onderaan zijn weg.
