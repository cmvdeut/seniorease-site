# H2 — Een AI-assistent gebruiken — inhoud v2.0

**Status:** 🔒 **H2 — EEN AI-ASSISTENT GEBRUIKEN · INHOUD V2.0 — GOEDGEKEURD & BEVROREN**  
**Datum:** 2026-09-13  
**Goedgekeurd / bevroren:** 2026-09-13 (fase 1B · na oefenronde-1-correctie)  
**Fase:** 1B — inhoud freeze  
**Kwaliteitsniveau:** SeniorEase-methode · Pakket H-architectuur v2.0 🔒  
**Architectuur (bindend):** `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  
**Voorafgaande les:** H1 — Wat kan AI voor mij doen? (inhoud + productie GOEDGEKEURD & BEVROREN 🔒)  
**Referentie werkwijze:** `SENIOREASE-DIDACTIEK.md` · recente F/G · H1 als retrievalbron  
**Inhoudelijk bronmateriaal (niet de blauwdruk):** `lesmateriaal/G-ai/G2-ai-gebruiken/`  
**Productievoorbereiding:** `docs/superpowers/specs/2026-09-13-h2-productievoorbereiding-v1.md`  
**Productie:** `docs/superpowers/specs/2026-09-13-h2-productie-v2.md` 🔒 · `lesmateriaal/H-ai/H2-een-ai-assistent-gebruiken/GOEDGEKEURD.md` 🔒

Dit document is **uitsluitend lesinhoud**.  
De inhoud is **GOEDGEKEURD & BEVROREN** 🔒.  
**Productie V2.0** is eveneens **GOEDGEKEURD & BEVROREN** 🔒 (2026-09-13).  

**Bevroren (hard):**
- functie **BEDIENEN**  
- hoofdroute OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN (+ nieuw gesprek aanvullend)  
- account/login-contract · fallback A/B/C · ~2-minutenregel  
- H3/H4-grenzen  
- oefeninhoud (incl. oefenronde 1: middag thuis)  
- eindmissie  
- zes productonderdelen · circa 90 minuten  

**Niet doen zonder aparte opdracht:**
- H2-inhoud of -productie wijzigen / PDF regenereren  
- H1 wijzigen of regenereren  
- H3/H4-inhoud of -productie  
- technische G/H-laag · shop · Stripe · Brevo · Vercel  
- live session/hashwerk · distributie  

---

## 1. Positie in Pakket H

| Les | Functie | Rode draad |
|-----|---------|------------|
| H1 | **ONTDEKKEN** | AI kan mij helpen. |
| **H2** | **BEDIENEN** | **Ik kan AI zelf gebruiken.** |
| H3 | VERBETEREN | Ik kan betere antwoorden krijgen. |
| H4 | CONTROLEREN | Ik gebruik AI verstandig. |

**Hoofdvraag H2:**

> Hoe voer ik zelf een gesprek met een AI-assistent?

**Centrale brug na H1:**

> Vorige keer zagen we waar AI bij kan helpen.  
> Vandaag gaat u het zelf bedienen.

**HARD:** H2 mag H1, H3 of H4 **niet** opnieuw geven.

---

## 2. Kernbelofte

**Titel:** H2 — Een AI-assistent gebruiken  

**Ondertitel:** Zelf openen, vragen, lezen, doorvragen  

**Kernbelofte (deelnemer):**

> Ik kan zelf een AI-assistent openen, een vraag stellen, het antwoord lezen, doorvragen en een nieuw gesprek beginnen.

**Niet beloven:**
- dat u “perfecte prompts” leert;  
- dat u Gemini als product volledig beheerst;  
- dat u zonder oefenen meteen alles snapt;  
- H3- of H4-vaardigheden.

---

## 3. Eindgevoel

> “Ik weet waar ik mijn vraag moet typen en ik durf zelf verder te vragen.”

Na de les: *Ik heb het zelf gedaan. Ik weet waar ik moet zijn. Ik durf het thuis nog eens.*  
Niet: *Ik heb veel theorie over AI of prompts geleerd.*

---

## 4. Afbakening H1 / H2 / H3 / H4

| | H1 | **H2** | H3 | H4 |
|--|----|--------|----|-----|
| Functie | Ontdekken | **Bedienen** | Verbeteren | Controleren |
| Kern | Waar AI helpt · één ervaring | **Openen → typen → lezen → doorvragen (+ nieuw gesprek)** | WAT / INFO / HOE | Bron · privacy-diepte |
| Vraagkwaliteit | Gewoon genoeg | **Gewone begrijpelijke vraag** | Gericht verbeteren | — |
| Doorvragen | Kort bijsturen (ervaren) | **Kernvaardigheid: verder praten werkt** | Gericht bijsturen | — |
| Nieuw gesprek | Nee | **Ja (na basisroute)** | Niet opnieuw als leskern | Niet als leskern |

### H2 ≠ opnieuw ontdekken (H1)

Geen catalogus “waarvoor AI”. Retrieval max. ~5–8 min. Daarna bediening.

### H2 ≠ betere vragen (H3)

**Geen** systematische geheugensteun:

- WAT WILT U?  
- GEEF WAT INFORMATIE  
- ZEG HOE U HET WILT  

**Geen** prompt engineering · toon/formaat-training · “waarom was die vraag beter”.  
In H2 mag doorvragen: *“Welke is het makkelijkst?”* / *“Leg nummer 2 in drie stappen uit.”* — **zonder analyse**.

### H2 ≠ controleren (H4)

Alleen lichte basis:

> Een AI-antwoord kan een fout bevatten.

**Geen** bronnen zoeken · deskundige · gezondheid/geld/recht/overheid-protocol.

---

## 5. Hoofdroute

**OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN**

**Aanvullend (niet vijfde gelijkwaardige hoofdvaardigheid):**

**NIEUW GESPREK** — pas nadat vraag → antwoord → vervolgvraag gelukt is.

### Deelnemersgeheugensteun (kaart / beamer)

```
OPENEN
→ VRAGEN
→ ANTWOORD LEZEN
→ DOORVRAGEN

Nieuw onderwerp?
→ Start een nieuw gesprek
```

Methode ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN: **alleen** in begeleidersmateriaal — **niet** op deelnemersdia’s.

---

## 6. Retrievalstart (uit H1)

**Duur:** circa 5–8 minuten.  
**Geen bediening** tijdens retrieval.

### Drie herkenbare situaties (mondeling)

1. Iets **eenvoudiger uitgelegd** krijgen.  
2. **Ideeën** bedenken.  
3. Hulp bij het **formuleren** van een bericht.

**Vraag:**

> Waar zou AI u bij kunnen helpen?

Deelnemer kiest één situatie en zegt ongeveer wat hij/zij zou willen vragen.

**Daarna (brug):**

> Vorige keer zagen we waar AI bij kan helpen.  
> Vandaag gaat u het zelf bedienen.

---

## 7. Startsituatie (nieuwe vaardigheid)

**Niet** beginnen met browser- of AI-theorie.

**Situatie (demo + eerste oefenlijn):**

> U wilt vanavond iets makkelijks koken.  
> U heeft aardappelen, broccoli en eieren in huis.  
> U wilt AI om drie eenvoudige ideeën vragen.

**Voorbeeldvraag (exact genoeg voor productie):**

> Geef mij drie eenvoudige ideeën voor een maaltijd met aardappelen, broccoli en eieren.

**Vervolgvraag (demo doorvragen):**

> Welke is het makkelijkst?

of:

> Leg nummer 2 in drie stappen uit.

**HARD:** geen medische, financiële, juridische of overheidsbeslissing als hoofdvoorbeeld.

---

## 8. Begrippen / tekens

H2 is de eerste echte bedieningsles. Circa **3–5** begrippen:

| Begrip | Betekenis (deelnemer) | Handeling |
|--------|------------------------|-----------|
| **Browser** | Het programma waarmee u websites opent. | Browser openen. |
| **Vraag** | Wat u aan AI schrijft. | Typen in het typvak. |
| **Antwoord** | Wat AI teruggeeft. | Lezen · eventueel scrollen. |
| **Vervolgvraag** | Nog iets vragen over hetzelfde onderwerp. | Opnieuw typen · versturen. |
| **Nieuw gesprek** | Opnieuw beginnen met een ander onderwerp. | Nieuw gesprek starten · leeg typvak herkennen. |

Optioneel in START HIER (begeleider): **AI-assistent** = programma waaraan u een vraag kunt stellen.

### Formule waar nuttig

**WOORD + TEKEN/PICTOGRAM + WAT DOE IK HIER?**

### UI vs SeniorEase-iconen (architectuur §9a)

| | |
|--|--|
| Echte Gemini-bediening | Alleen **actuele, platformgetrouwe** Gemini-beelden (latere productie) |
| SeniorEase-iconen | Alleen uitleg/geheugensteun — **nooit** presenteren als echte Gemini-knoppen |

---

## 9. Account / login — fallback

### HARD

De les mag **niet** mislukken omdat iemand:

- geen Google-account heeft;  
- niet is ingelogd;  
- wachtwoord niet weet;  
- geen account wil gebruiken.

| Verboden | Toegestaan |
|----------|------------|
| Klassikale accountcreatie | Browser zonder app |
| Wachtwoorden uitspreken / opschrijven / op beamer | Zaaltoestel vooraf geopend (Route B) |
| Verificatiecodes delen | Route C: deelnemer stuurt · helper/begeleider typt alleen wat gezegd wordt |
| Les stilleggen tot iedereen is ingelogd | Na ~2 min: individueel / fallback · groep gaat door |
| Login als leerdoel | Login alleen als storing |

### Routes A / B / C (H2)

| Route | Wat gebeurt er |
|-------|----------------|
| **A** | Eigen apparaat · browser → Gemini-web |
| **B** | Voorbereid les-/ruimteapparaat · al open · geen wachtwoord in de les |
| **C** | Deelnemer bepaalt inhoud en dicteert stappen · begeleider/helper voert alleen noodzakelijke bediening uit · deelnemer wijst op scherm/beamer: typvak · antwoord · nieuw gesprek |

Route D (H4-specifiek zonder AI) hoort **niet** in H2.

Als Gemini een login vraagt: **geen leerdoel** · rustig overschakelen naar B of C.

---

## 10. Volledige lesopbouw (~90 min · inloop buiten de 90)

| # | Blok | Min | Kern |
|---|------|-----|------|
| 1 | Welkom + H1-retrieval | 5–8 | Situaties kiezen · brugzin |
| 2 | Startsituatie (koken) | 5 | Herkenbare behoefte |
| 3 | OPENEN / herkennen | 10 | Browser · Gemini-web · “hier typ ik” |
| 4 | Eerste VRAGEN | 10 | Typvak · typen · kijken · versturen |
| 5 | ANTWOORD LEZEN | 7 | Antwoord herkennen · scrollen · “kan fout zijn” |
| 6 | DOORVRAGEN | 10 | Vervolgvraag · zelfde gesprek |
| 7 | NIEUW GESPREK | 7 | Ander onderwerp · leeg typvak |
| 8 | Oefenronde 1 (samen) | 12 | Zelfde veilige basis + vervolg |
| 9 | Oefenronde 2 (meer zelf) | 12 | Keuzekaarten A–D |
| 10 | Eindmissie | 10–12 | Zelfstandig · geen voordoen |
| 11 | Afronding | 4–7 | Brug naar H3 · thuis durven |

**Voorkom:** uitleg verdringt oefentijd. Bij tijdnood: **eindmissie beschermen**.

---

## 11. Demonstratie (begeleider)

### Kaderzin (één keer · vast)

> In deze les gebruiken we Gemini.  
> Andere AI-assistenten, zoals ChatGPT en Copilot, werken op een vergelijkbare manier.

H2 is **geen** Gemini-productcursus.

### Volgorde demo (ZIEN → kort NADOEN)

1. **OPENEN** — browser · route naar Gemini-web · herken: *hier kan ik mijn vraag stellen*.  
2. **VRAGEN** — typ voorbeeldvraag · kort bekijken · versturen.  
3. **ANTWOORD LEZEN** — kort, realistisch antwoord op beamer (niet enorm) · eventueel scrollen.  
4. **DOORVRAGEN** — één vervolgvraag · toon dat het bij hetzelfde gesprek hoort.  
5. Later: **NIEUW GESPREK** — ander onderwerp (cadeau) · leeg typvak.

**Schermzin (vast):**

> Uw scherm kan er iets anders uitzien. Dat is normaal.

Leer herkenning op **functie** (“Waar typ ik mijn vraag?”), niet op vaste pixelpositie.

---

## 12. OPENEN (detail)

### Drie herkenningsstappen

| | Wat | Diepte |
|--|-----|--------|
| A | Browser openen | Alleen wat nodig is |
| B | Gemini-web bereiken | Actuele route vooraf getest · URL op A4 (uitvoeringspunt) |
| C | Herkennen: “Hier kan ik mijn vraag stellen.” | Typvak vinden |

### Geen browsercursus

Geen uitgebreide uitleg over: accounts · Google-profielen · browserinstellingen · cookies · extensies · geschiedenis.

H1 leerde openen **niet** systematisch. H2 **wel** — maar dun.

---

## 13. VRAGEN (detail)

Deelnemer leert:

1. invoerveld (typvak) herkennen;  
2. vraag typen;  
3. vraag **vóór verzenden** kort bekijken;  
4. verzendknop/-teken herkennen;  
5. verzenden.

**Eén** eenvoudige voorbeeldvraag (koelkast — §7).

**HARD:** geen H3-training (context/doelgroep/toon/formaat/promptstructuur).

---

## 14. ANTWOORD LEZEN (detail)

Na verzenden: eerst **rustig kijken**.

Leer alleen:

- dit is het antwoord van AI;  
- het kan langer zijn dan één scherm;  
- rustig scrollen mag;  
- niet alles hoeft in één keer.

Licht herhalen:

> Een AI-antwoord kan handig zijn, maar het kan ook een fout bevatten.

Geen theorie over hoe AI antwoorden maakt. Geen H4-uitbouw.

---

## 15. DOORVRAGEN (essentieel H2-leerdoel)

Deelnemer ervaart:

**eerste vraag → antwoord → vervolgvraag → vervolgantwoord**

Eenvoudige uitleg:

> AI kan in hetzelfde gesprek rekening houden met wat u net heeft gevraagd.

U hoeft **niet** opnieuw vanaf nul te beginnen voor een kleine bijsturing.

**Niet** het H3-model introduceren.

---

## 16. Nieuw gesprek

**Pas** nadat vraag + antwoord + vervolgvraag gelukt zijn.

### Overgang

| | |
|--|--|
| Eerste gesprek | Maaltijdideeën |
| Nieuwe behoefte | Idee voor een verjaardagscadeau |
| Check | “Hoort dit nog bij hetzelfde onderwerp?” |
| Handeling | Nieuw gesprek starten · leeg typvak herkennen · korte nieuwe vraag |

### HARD

Geen chatgeschiedenis-beheer · opslaan · verwijderen · zijbalk · accountdata.  
Alleen: **herkennen en gebruiken** om opnieuw te beginnen.

---

## 17. Oefenronde 1 — samen

**Startvraag (iedereen hetzelfde):**

> Geef mij drie ideeën voor een gezellige middag thuis.

**Vervolgvraag:**

> Welke is het makkelijkst om te organiseren?

*(Bewust thuis / organiseren — geen locatie- of uitjesinformatie die richting H4-broncontrole trekt.)*

### Stappen deelnemer

1. bereikt AI;  
2. vindt invoerveld;  
3. typt vraag;  
4. controleert kort;  
5. verstuurt;  
6. leest antwoord;  
7. stelt vervolgvraag.

Begeleider demonstreert waar nodig. Helper: **“Wat ziet u nu?”**

---

## 18. Oefenronde 2 — meer zelf

### Keuzekaarten (veilig)

| | Thema | Startvraag | Vervolgvraag (kies één) |
|--|-------|------------|-------------------------|
| **A** | ETEN | Geef mij drie ideeën voor een eenvoudige lunch. | Maak het korter. / Welke zou u als eerste kiezen? |
| **B** | UITJE | Wat kan ik op een regenachtige middag thuis doen? | Geef nog twee ideeën. |
| **C** | BERICHT | Maak deze zin iets vriendelijker: Ik kan donderdag niet komen. | Maak het korter. |
| **D** | UITLEG | Leg uit wat een QR-code is in eenvoudige woorden. | Leg het nog eenvoudiger uit. |

**Overlap H1:** dezelfde *soorten* nut — hier alleen als **veilige inhoud** om **bediening** te oefenen, niet om nut te ontdekken.

---

## 19. Veiligheid in H2

Praktisch, niet angstig.

### In de oefening niet invoeren

- wachtwoorden · codes · BSN · bankgegevens;  
- echte medische gegevens · privébrieven · DigiD-gegevens.

### Zeggen

> Gebruik in de oefening geen privégegevens.

> Een AI-antwoord kan een fout bevatten.

Meer controle = **H4**.

---

## 20. Eindmissie (ca. 10–12 min)

**Geen** volledige stap-voor-stap-demonstratie meer.

### Missie

1. open/bereik de AI-assistent;  
2. stel één veilige gewone vraag;  
3. verstuur;  
4. lees het antwoord;  
5. stel één passende vervolgvraag;  
6. lees wat er verandert;  
7. start een nieuw gesprek;  
8. herken dat u opnieuw kunt beginnen.

Inhoud: keuzekaart of eigen **niet-privé** onderwerp.

### Succescriteria

Deelnemer kan laten zien:

- “Hier typ ik mijn vraag.”  
- vraag versturen;  
- antwoord vinden;  
- vervolgvraag stellen;  
- nieuw gesprek herkennen/starten.

Route B/C: succes als deelnemer **stuurt** (kiest · dicteert · aanwijst).

**Geen** toets · punten · geslaagd/gezakt.

---

## 21. Helperprotocol

Helper begint altijd met:

> Wat ziet u nu?

### Volgorde

1. vraag wat deelnemer ziet;  
2. laat deelnemer aanwijzen;  
3. wijs indien nodig;  
4. geef **één** kleine aanwijzing;  
5. deelnemer voert zelf uit;  
6. alleen als laatste redmiddel kort overnemen.

### Account/login

Niet klassikaal oplossen.  
> ~2 minuten: helper individueel / fallback · **groep gaat verder**.

---

## 22. Hulp-bij-vastlopen — matrix

| | Probleem | Eerst vragen | Deelnemer probeert | Vervolgstap | Fallback |
|--|----------|--------------|-------------------|-------------|----------|
| **A** | Ik zie niet waar ik mijn vraag moet typen. | Wat ziet u nu? Waar zou u iets kunnen typen? | Aanwijzen op scherm | Begeleider wijst typvak één keer | B/C |
| **B** | Ik zie geen verzendknop. | Welk teken/knop lijkt op versturen? | Zoeken · “Uw scherm kan anders uitzien” | Eén keer aanwijzen | B/C |
| **C** | Er gebeurt niets. | Heeft u al verstuurd? Ziet u een melding? | Opnieuw versturen · internetcheck | Helper checkt verbinding stil | B |
| **D** | Melding om in te loggen. | *(geen wachtwoord vragen)* | — | Direct: dit is geen lesdoel | **B of C** |
| **E** | Antwoord is heel lang. | Mag u scrollen? | Rustig scrollen · niet alles in één keer | Demo scrollen | — |
| **F** | Ik weet niet hoe ik verder kan vragen. | Wat wilt u nog weten over dit antwoord? | Typ een korte vervolgvraag | Voorbeeldzin geven | — |
| **G** | Ik wil over iets anders beginnen. | Hoort dit bij hetzelfde onderwerp? | Nieuw gesprek · leeg typvak checken | Demo nieuw gesprek | — |
| **H** | Mijn scherm ziet er anders uit. | Wat ziet u wél? Waar kunt u typen? | Functie zoeken | “Dat is normaal.” | B |

---

## 23. Deelnemerskaart — inhoud

### Hoofdroute

OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN  

### Extra

Nieuw onderwerp? → Start een nieuw gesprek  

### Woorden en tekens die u tegenkomt

Browser · vraag · antwoord · vervolgvraag · nieuw gesprek  
(+ korte betekenis · zie §8)

### Vaste zinnen

> Uw scherm kan er iets anders uitzien. Dat is normaal.

> Gebruik geen wachtwoorden, codes of andere gevoelige privégegevens in de oefening.

> Een AI-antwoord kan een fout bevatten.

### Thuis

Korte thuisproef zonder huiswerkgevoel: één gewone vraag + één vervolgvraag.

---

## 24. START HIER — begeleider (~1 A4)

| Onderdeel | Inhoud |
|-----------|--------|
| Doel H2 | Zelf bedienen: openen · vragen · lezen · doorvragen · nieuw gesprek |
| Wat deelnemers doen | Zelf typen en versturen (of sturen via B/C) |
| Groep | Max. ~8–10 + begeleider + helper aanbevolen |
| Voorbereiding 10–15 min | Wifi · beamer · **Gemini-web vooraf testen** · **actuele route/URL op A4** · fallbackapparaat · kaarten A–D · geen accountcreatie |
| Privacy | Geen privégegevens in oefening |
| Account | Geen klassikale login · fallback A/B/C · ~2 min regel |
| Helper | “Wat ziet u nu?” |
| Schermen | Kunnen verschillen |
| Miniwoordenlijst | AI-assistent · browser · vraag · antwoord · vervolgvraag · nieuw gesprek |
| Absoluut niet | Promptcollege · H3-model · H4-controleprotocol · H1-catalogus herhalen |

**Uitvoeringspunt (later productie):** exacte Gemini-webroute/URL invullen en testen vóór klantproductie.

---

## 25. Zaalchecklist

- [ ] Internet getest  
- [ ] Beamer getest  
- [ ] Browser beschikbaar  
- [ ] Gemini-web bereikbaar  
- [ ] Actuele route vooraf getest / op A4  
- [ ] Fallbackapparaat(en) indien mogelijk vooraf open  
- [ ] Geen klassikale accountcreatie gepland  
- [ ] Geen wachtwoorden/codes verzamelen  
- [ ] Deelnemers gebruiken geen privégegevens  
- [ ] Helper weet “Wat ziet u nu?” + fallback  
- [ ] Begeleider: accountproblemen niet klassikaal oplossen  
- [ ] Keuzekaarten A–D klaar  
- [ ] Eindmissie ca. 10–12 min beschermd  
- [ ] Print + beamer bij de hand  

---

## 26. Draaiboekstructuur (later productie)

Per blok:

| Veld | |
|------|--|
| Situatie | |
| Doel | |
| Ongeveer wat begeleider zegt | |
| Wat begeleider laat zien | |
| Wat begeleider demonstreert | |
| Wat deelnemer doet | |
| Tijd | |
| Korte check | |
| Helperrol | |
| Wanneer doorgaan | |
| Hulpkaart | indien relevant |

Geen technische specialist nodig.

---

## 27. Beamer-dia-architectuur (concept · nog geen PDF)

### Regels

- één gedachte/handeling per dia;  
- weinig tekst · groot · rustig;  
- screenshot = instructie (relevante crop · max. één annotatie);  
- echte Gemini-UI later · platformgetrouw;  
- geen kleine browser over heel scherm;  
- geen privégegevens;  
- geen ZIEN/NADOEN op deelnemersdia’s;  
- geen arbitrair maximum aantal dia’s.

### Indicatieve reeks (uitbreidbaar)

| Groep | Dia-ideeën |
|-------|------------|
| Opening | Titel · brug H1 → H2 |
| Retrieval | Drie situaties · “Waar zou AI u bij kunnen helpen?” |
| Situatie | Koelkastvraag |
| Openen | Browser · Gemini · “Hier typ ik” |
| Vragen | Typvak · voorbeeldvraag · versturen |
| Antwoord | Kort antwoord · scrollen · “kan fout zijn” |
| Doorvragen | Vervolgvraag · zelfde gesprek |
| Nieuw gesprek | Cadeau · leeg typvak |
| Oefenen | Ronde 1 · kaarten A–D |
| Eindmissie | Zelfstandig · succes zonder toets |
| Afronding | Thuis durven · brug H3 (één zin) |

---

## 28. Timing (samenvatting)

Circa **90 minuten** (inloop buiten). Zie tabel §10.  
Richtlijnen uit opdracht aangehouden; eindmissie 10–12 min.

---

## 29. Expliciete uitsluitingen

- H1-catalogus / ontdekken opnieuw  
- H3: WAT / INFO / HOE · prompt engineering  
- H4: broncontrole · vier zware categorieën-protocol  
- ChatGPT-interface als leskern  
- App-installatie · parallelle platformcursussen  
- Accountcreatie · wachtwoordbeheer  
- Chatgeschiedenis-beheer  
- AI-theorie / hoe generatie werkt  
- `oefentaken.md` · aparte nazorgkaart  
- Methodenaam op deelnemersbeamer  

---

## 30. Productievoorwaarden (latere fase)

Zes onderdelen:

1. START HIER — begeleider  
2. Draaiboek  
3. Beamer-PDF  
4. Hulp bij vastlopen  
5. Deelnemerskaart  
6. Zaalchecklist  

Plus later:

- actuele Gemini-screenshots (echt · geen nep-UI);  
- exacte webroute/URL getest;  
- iconen alleen als uitleg, niet als fake knoppen;  
- beamer ↔ draaiboek ↔ kaart exact gelijk;  
- H1-bestanden **niet** wijzigen.

---

## 31. Open uitvoeringspunten

1. Exacte Gemini-webroute/URL (START HIER · zaalchecklist) vóór klantproductie.  
2. Actuele Gemini-screenshots voor bedieningsdia’s (productiefase).  
3. Eventuele lichte tekstvariatie koelkast/cadeau bij productie-QA.  
4. Pakketbrede live/hash-eindcontrole later (niet in H2-inhoud).  

---

## 32. QA-antwoorden (fase 1)

| | Vraag | Antwoord |
|--|-------|----------|
| **A** | H2 = BEDIENEN, niet opnieuw ONTDEKKEN? | **JA** — retrieval kort · kern = openen/typen/lezen/doorvragen |
| **B** | Slagen zonder Google-account? | **JA** — Routes B/C · login geen leerdoel |
| **C** | Echt vraag → antwoord → vervolgvraag? | **JA** — kernleerdoel · oefenrondes + eindmissie |
| **D** | Nieuw gesprek zonder chatbeheerles? | **JA** — alleen herkennen/starten |
| **E** | H3 buiten H2? | **JA** — geen WAT/INFO/HOE · geen promptanalyse |
| **F** | H4 buiten H2? | **JA** — alleen “kan fout zijn” |
| **G** | Privacy praktisch, niet angstig? | **JA** |
| **H** | Niet-technische begeleider? | **JA** — START HIER · draaiboek · helper · fallback |
| **I** | Voldoende oefentijd? | **JA** — rondes + eindmissie zwaarder dan college |
| **J** | Eindmissie zelfstandig, niet schoolachtig? | **JA** |
| **K** | Woorden gekoppeld aan handeling? | **JA** — §8 |
| **L** | H1 ongemoeid? | **JA** — geen H1-wijziging in deze fase |

---

## Rapport-einde

**H2 — EEN AI-ASSISTENT GEBRUIKEN**  
**INHOUD V2.0 — GOEDGEKEURD & BEVROREN** 🔒

| | |
|--|--|
| functie BEDIENEN | **JA** · frozen |
| hoofdroute correct | **JA** · frozen |
| account-onafhankelijk | **JA** · frozen |
| doorvragen kernvaardigheid | **JA** · frozen |
| nieuw gesprek opgenomen | **JA** · frozen |
| H3 grens bewaakt | **JA** · frozen |
| H4 grens bewaakt | **JA** · frozen |
| zes productonderdelen | **JA** · frozen |
| circa 90 minuten | **JA** · frozen |
| oefenronde 1 | middag thuis · frozen |
| H1 gewijzigd | **NEE** |
| technische laag gewijzigd | **NEE** |
| productie gestart | **NEE** (alleen voorbereiding) |

**Inhoud frozen.** Productie wacht op aparte opdracht na productievoorbereidingsreview.
