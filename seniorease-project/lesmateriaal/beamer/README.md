# Beamer-slides (optioneel)

De **print** blijft de basis: deelnemerskaart + oefentaken op tafel. Dat werkt in **elk** clubhuis.

Sommige zalen hebben wél een beamer. Dan kunt u de oefentaken **groot op het scherm** tonen — deelnemers volgen de stappen terwijl ze op hun eigen toestel oefenen.

## Twee zaaltypes

| Zaal | Wat u doet |
|------|------------|
| **Zonder beamer** (standaard) | Print oefentaken (1 per deelnemer of 1 per tafel). Begeleider voordoet op eigen toestel. |
| **Met beamer** (extra) | Open het **beamer-PDF** op laptop → beamer. 1 slide = 1 oefentaak. Page Down voor volgende stap. |

**Regel:** neem **altijd print mee**, ook als er een beamer is. Storing, slecht leesbaar, of deelnemer ver van scherm — dan heeft iedereen papier.

## Waar staan de bestanden?

Per les, naast het normale PDF:

```
G-ai/G1-wat-is-ai/beamer/SeniorEase-G1-Beamer-v1.pdf
```

Pakket **G** heeft beamer-PDF’s (pilot). Andere pakketten volgen.

## Bouwen

```bash
python lesmateriaal/G-ai/build_beamer_all.py
```

Of per les: `python lesmateriaal/G-ai/G1-wat-is-ai/build_beamer.py`

## Tips voor de begeleider

- **Eén oefentaak tegelijk** op het scherm — wacht tot de groep klaar is.  
- **Niet voorlezen** wat er staat; deelnemers lezen mee (grote letters).  
- **Geen presentatie** nodig: geen PowerPoint, geen wifi voor slides — offline PDF opent overal.  
- Sluit aan bij didactiek: **Kijken** (beamer + demo) → **Doen** (eigen toestel) → **Controleren** → **Pauzeren**.

## Later

- Beamer-PDF’s voor pakketten A–F  
- Optioneel: webpagina op seniorease.nl (zelfde tekst, voor tablet aan beamer)
