# PAKKET H — AI IN HET DAGELIJKS LEVEN  
# INHOUDSARCHITECTUUR V2.0

**Status:** 🔒 **PAKKET H INHOUDSARCHITECTUUR V2.0 — GOEDGEKEURD & BEVROREN**  
**Datum:** 2026-09-13 · fase 1B · 1C · **freeze 1D**  
**Goedgekeurd / bevroren:** 2026-09-13  
**Kwaliteitsniveau:** SeniorEase-methode (`SENIOREASE-DIDACTIEK.md`)  
**Referentiestandaard (werkwijze · kwaliteit):** frozen Pakket D · E · **F** · **G — Internet op telefoon & tablet** (vooral F/G)  
**Inhoudelijk bronmateriaal (niet de productiestandaard):** `lesmateriaal/G-ai/` · G1–G4 v1.1  

Dit document is **uitsluitend inhoudsarchitectuur**.  
De architectuur is **GOEDGEKEURD & BEVROREN** 🔒.  
Lesinhoud volgt per les (eerst H1) — **niet** vanuit deze freeze starten zonder aparte opdracht.

**Niet doen vanuit deze bevroren architectuur:**
- geen H1–H4-inhoud of -productie zonder aparte opdracht  
- geen PDF / beamer / deelnemerskaart / screenshots / iconen / generators  
- geen bestaande G-AI-bestanden verwijderen of hernoemen  
- geen technische migratie (canonical slug `pakket-h-ai` · legacy `pakket-g` · codes G1–G4 · `g*` fileIds · storage `pakket-g/` · Stripe · checkout · fulfillment · redirects · shop · sitemap)  
- geen H5 toevoegen  
- geen inhoudelijke herontwerp van bevroren keuzes  

**Bouwvolgorde (na deze freeze · aparte opdrachten):**  
H1 inhoud → review → H1 productie → review → H2 → H3 → H4.

---

## 0. Freeze-verklaring (fase 1D · definitief)

De producteigenaar heeft deze inhoudsarchitectuur goedgekeurd.  
Onderstaande keuzes zijn **definitief** en mogen niet stilzwijgend worden heropend:

| Onderdeel | Status |
|-----------|--------|
| Pakketbelofte | **Definitief** |
| H1–H4 titels · functies · kernroutes | **Definitief** |
| H1/H2-hard gate (ontdekken vs bedienen) | **Definitief** |
| Gemini-web als primaire concrete oefenomgeving | **Definitief** |
| Leverancier-onafhankelijk karakter (Gemini = oefenmiddel) | **Definitief** |
| Fallback A–D | **Definitief** |
| H3 drie-vragenstructuur + “Nog niet tevreden? Vraag gerust verder.” | **Definitief** |
| H4-kapstok **DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS** | **Definitief** |
| Woorden/tekens/iconen-ontwerpregels (§9a) | **Definitief** |
| Scheiding echte UI-iconen vs SeniorEase-herkenningsiconen | **Definitief** |
| Eindmissies ca. 10–12 min (inhoud · zelfstandigheid leidend) | **Definitief** |
| Geen H5 | **Definitief** |
| Toekomstige ChatGPT-les buiten Pakket H | **Definitief** |
| Zesdelige F/G-productstructuur | **Definitief** |
| Technische G/H-migratie volledig buiten deze architectuur | **Definitief** |

Open punten in §15 zijn **latere uitvoeringsbeslissingen**. Zij blokkeren deze freeze **niet**.

---

## 1. Pakketbelofte

**Pakket (klantgericht):** H — AI in het dagelijks leven  
**Ondertitel:** Leer AI gebruiken, betere vragen stellen en antwoorden verstandig beoordelen.  
**Apparaten:** eigen telefoon, tablet of computer (waar praktisch mogelijk)  
**Duur:** 4 × ca. 90 minuten (inloop **buiten** de lestijd)  
**Groep:** max. ca. 8–10 · begeleider + bij voorkeur helper

### Definitieve kernbelofte

> Ik kan AI gebruiken voor gewone vragen en taken, betere vragen stellen, doorvragen, en belangrijke antwoorden verstandig controleren.

| Onderdeel belofte | Waargemaakt in |
|-------------------|----------------|
| AI gebruiken voor gewone vragen/taken | H1 (ervaren) + H2 (bedienen) |
| Betere vragen stellen | H3 |
| Doorvragen | H2 (verder praten werkt) → H3 (gericht bijsturen) |
| Belangrijke antwoorden verstandig controleren | H4 |

### Wat Pakket H wél is

- Leverancier-onafhankelijk **AI-vaardigheidspakket** voor het dagelijks leven.  
- Leren door **zelf doen** met een concrete AI-chat als oefenmiddel.  
- Overdraagbaar naar ChatGPT, Microsoft Copilot en vergelijkbare assistenten.  
- Kant-en-klaar voor een **niet-technische begeleider**.

### Wat Pakket H níet is

- Geen Google Gemini-cursus / geen producttraining.  
- Geen technisch AI-college · geen geschiedenis van AI · geen soorten-AI-theorie.  
- Geen prompt engineering.  
- Geen ChatGPT-handleiding (→ toekomstige losse les).  
- Geen fraude-/phishingles (D) · geen DigiD/overheid (E) · geen internetzoekles (F/G).  
- Geen H5.

---

## 2. Doelgroep en twee gebruikers

| Onderdeel | Vast |
|-----------|------|
| Doelgroep | Oudere volwassenen die digitaal zelfstandiger willen worden; AI-kennis niet vereist |
| Toon | Volwassen · rustig · praktisch · niet schools · niet betuttelend |
| Rollen | **Begeleider** + **helper** — nooit “docent” |
| Tempo | Geen haast · fouten maken is normaal |
| Inloop | Buiten de 90 minuten |

### Gewenst gevoel

| Deelnemer | Begeleider / organisatie |
|-----------|--------------------------|
| “Ik heb het zelf gedaan. Ik weet ongeveer hoe het werkt. En ik durf het thuis nog een keer.” | “Met dit materiaal kan ik deze les geven. Ik weet wat ik moet zeggen, laten zien en laten doen. Als iemand vastloopt, weet ik wat mijn volgende stap is.” |

**Organisaties:** bibliotheken · buurthuizen/wijkcentra · welzijnsorganisaties · seniorenorganisaties · vrijwilligers.

### Helper-volgorde (vast · F/G-lijn)

1. “Wat ziet u nu?”  
2. Uitleggen waarnaar te kijken.  
3. Aanwijzen.  
4. Deelnemer doet **zelf**.  
5. Alleen als laatste redmiddel kort overnemen.

Afwijkend apparaat mag de groep niet stilleggen.  
Na ca. **2 minuten** individueel probleem: helper 1-op-1 of parkeren.

### Methode (begeleidersdocs)

**ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN**  
— ontwerpprincipe; **niet** als faselabels op deelnemersdia’s.

Les start bij een **dagelijkse situatie**, niet bij theorie.

---

## 3. Positie binnen SeniorEase

| Pakket | Eigenaarschap | Relatie tot H |
|--------|---------------|---------------|
| **A** | Toestel · apps · wifi | Nuttige vooropleiding; niet verplicht |
| **B** | Computer · bestanden | H mag computer; geen B-herles |
| **C** | WhatsApp | H mag tekst **helpen schrijven**; geen C-bediening |
| **D** | Stop · verdacht bericht · links/QR · helpdesk · betalen | H4 ≠ D; alleen korte doorverwijzing |
| **E** | DigiD · MijnOverheid | Regel “overheid → deskundige/officieel”; geen DigiD-oefening |
| **F** | Internet computer | Zoeken/websites ≠ AI-chat; H4 mag officiële site openen om te checken |
| **G** | Internet telefoon/tablet | Idem mobiel |
| **H** | AI in het dagelijks leven | Dit pakket |

**Shop/techniek (context · níet wijzigen):**  
Canonical `pakket-h-ai` · legacy `pakket-g` · storage `pakket-g/` · technische codes G1–G4 / `g*` fileIds blijven.  
Klantgericht: **Pakket H · H1–H4**.  
Shopcopy “AI voor dagelijks gebruik” → “AI in het dagelijks leven” = latere copy-opdracht.

---

## 4. Rol van Gemini · leverancier-onafhankelijk ontwerp

### Vaste zin (materiaal + begeleider)

> In deze lessen gebruiken we Google Gemini als praktisch voorbeeld.  
> Andere AI-assistenten, zoals ChatGPT en Copilot, werken op veel punten vergelijkbaar.

### Onderscheid (hard)

| Laag | Inhoud | Mag niet worden |
|------|--------|-----------------|
| **Vaardigheid** | Vragen · doorvragen · betere vragen · controleren · privacy | “Gemini-training” |
| **Bediening voorbeeldproduct** | Openen · typvak · versturen · antwoord · nieuw gesprek *(in H2)* | Drie parallelle cursussen per platform |

### Primaire oefenomgeving (vast)

**Google Gemini webversie** = primaire concrete oefenomgeving.  
Voorkeur: **browser → Gemini**.  
Geen app-installatie nodig.  
Geen aparte volledige Android- · iPhone- · of computer-route.  
Zelfde vaardigheid centraal; alleen noodzakelijke schermverschillen tonen.  
Vaste geruststelling: “Uw scherm kan er iets anders uitzien. Dat is normaal.”  
Fallback A–D blijft intact (§6).

### Ontwerpgevolgen

- Gemini = **oefenmiddel**, niet het product.  
- Kern = handeling/bedoeling (bestand tegen schermwijzigingen).  
- Screenshots later: actueel · platformgetrouw · groot · één handeling · één annotatie.  
- iPhone / Android / computer: **zelfde route**; verschillen alleen waar nodig.  
- “Uw scherm kan er iets anders uitzien. Dat is normaal.”  
- Browser → Gemini · **geen** app-installatie als lesvoorwaarde.

---

## 5. Relatie met toekomstige losse ChatGPT-les

**Geen H5.**  
Later waarschijnlijk:

> **EXTRA LES — Aan de slag met ChatGPT**

| Pakket H leert | Losse ChatGPT-les leert |
|----------------|-------------------------|
| AI-**vaardigheden** (vragen · bijsturen · controleren) | ChatGPT **bedienen en gebruiken** |
| ChatGPT kort noemen als alternatief | ChatGPT openen / inloggen |
| Gemini als hoofdvoorbeeld | ChatGPT-interface · knoppen · app vs browser |
| Overdraagbare gespreksvaardigheden | Nieuw gesprek **in ChatGPT** · gesprekken terugvinden |
| — | Specifieke ChatGPT-functies |
| — | Foto’s/bestanden toevoegen waar beschikbaar |
| H compleet zonder ChatGPT | Geen “H1–H4 opnieuw met ChatGPT” |

Kannibalisatie vermijden: ChatGPT-les = productbediening, niet dezelfde vaardigheidsleerlijn opnieuw.

---

## 6. Privacy · veiligheid · account (pakketbreed · hard)

### Privacy — hard rule

Succesvol zonder: DigiD · wachtwoorden · verificatiecodes · BSN · bankgegevens · echte medische gegevens · persoonlijke dossiers · privébrieven met herkenbare persoonsgegevens.

**Wel:** fictieve situaties · neutrale SeniorEase-teksten · veilige eigen onderwerpen.  
Deelnemers hoeven **niets persoonlijks** klassikaal te delen.

### Veiligheid zonder angst

Niet: “AI is gevaarlijk.”  
Wel: “AI is handig, maar niet alles wat het zegt hoeft te kloppen.”

- H1–H3: nieuwsgierigheid · bruikbaarheid · korte privacy-tip **vóór typen**.  
- H4: controlevaardigheid + privacy uitwerken.  
- Fraude/phishing blijft bij **D**.

### Regel (behouden uit G-AI)

> Bij belangrijke beslissingen over gezondheid, geld, recht of overheid: controleer bij een deskundige of officiële bron.

**Hard:** AI vragen “Weet u het zeker?” is **geen** onafhankelijke controle.  
**Sterke controlevraag (H4):** “Waar kan ik dit nog controleren?”  
**Belangrijke aankopen:** mag als **praktische voorbeeldsituatie** — **niet** automatisch toevoegen aan de vaste vier categorieën (gezondheid · geld · recht · overheid).

### Account / inloggen — hard rule

| Mag niet | Mag |
|----------|-----|
| Klassikaal Google-account aanmaken | Browser gebruiken zonder app |
| Wachtwoorden verzamelen of op beamer | Vooraf klaargezet **zaaltoestel** (organisatie logt zelf in · buiten les) |
| Begeleider die wachtwoorden overneemt | Paarsgewijs: één werkend scherm · twee deelnemers |
| App verplicht | Meekijk-/stuurroute op beamer (deelnemer **kiest** wat er gebeurt) |
| Les stilleggen tot iedereen is ingelogd | Parkeren na ~2 min · les loopt door |

#### Uitvoerbaar fallbackmodel (niet: “de begeleider helpt”)

**Route A — normaal**  
Deelnemer op eigen apparaat (browser · URL op A4).

**Route B — zaaltoestel**  
Organisatie heeft vóór de les (of inloop) één of meer toestellen al geopend op de AI-chat.  
Geen wachtwoord in de leszaal. Deelnemer/duo oefent daarop.

**Route C — stuur-meekijk**  
Begeleider deelt Gemini op de beamer. Deelnemer **kiest en dicteert** de vraag / vervolgvraag / controleplan. Begeleider typt alleen wat de deelnemer zegt.  
Lesvaardigheid blijft bij de deelnemer (kiezen · beoordelen · bijsturen · controleren).

**Route D — H4-specifiek zonder AI-login**  
AI-antwoord staat op beamer (of A4). Deelnemer opent **zelf** de officiële website en vergelijkt.  
Controle-vaardigheid vereist geen AI-account.

START HIER + Hulp bij vastlopen moeten A–D later **concreet** uitwerken per les.

---

## 7. Overzicht H1–H4

| Les | Titel | Functie | Hoofdvraag | Kernroute |
|-----|-------|---------|------------|-----------|
| **H1** | Wat kan AI voor mij doen? | **ONTDEKKEN** | Waar kan AI mij in het dagelijks leven bij helpen? | **SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN** |
| **H2** | Een AI-assistent gebruiken | **BEDIENEN** | Hoe voer ik zelf een gesprek met een AI-assistent? | **OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN** *(+ nieuw gesprek)* |
| **H3** | Betere vragen stellen aan AI | **VERBETEREN** | Hoe krijg ik een antwoord waar ik meer aan heb? | **WAT WILT U? → GEEF WAT INFORMATIE → ZEG HOE U HET WILT** |
| **H4** | AI-antwoorden controleren en veilig gebruiken | **CONTROLEREN EN VEILIG BESLISSEN** | Wanneer kan ik een AI-antwoord gebruiken en wanneer moet ik eerst controleren? | **DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS** |

### Rode draad H1–H4 (didactisch · niet letterlijk op iedere dia)

| Les | Rode draad |
|-----|------------|
| **H1** | AI kan mij helpen. |
| **H2** | Ik kan AI zelf gebruiken. |
| **H3** | Ik kan betere antwoorden krijgen. |
| **H4** | Ik gebruik AI verstandig. |

Dit is de pakketbrede progressie voor begeleider/draaiboek.  
Het hoeft **niet** letterlijk op iedere beamerdia te verschijnen.

### Productstructuur per les (later · F/G-standaard)

1. START HIER — begeleider (~1 A4 · 10–15 min voorbereiding)  
2. Draaiboek  
3. Beamer-PDF  
4. Hulp bij vastlopen  
5. Deelnemerskaart  
6. Zaalchecklist  

**Geen** `oefentaken.md` als klantproduct.  
**Geen** aparte nazorgkaart.  
Eindmissie: **circa 10–12 minuten** — inhoud en zelfstandigheid leidend; bij tijdnood eindmissie beschermen. Als een les inhoudelijk 12 minuten nodig heeft, mag dat zo worden gepland. Geen dogma “exact 12”.

### Geselecteerde voorbeelden (sterke set · variatie)

Korte set — geen eindeloze lijst. **Niet** alleen “AI schrijft teksten”:

| Toepassing | Voorbeeldrichting | Lessen |
|------------|-------------------|--------|
| Eenvoudiger uitleggen | **Fictieve** SeniorEase-demotekst (moeilijke briefzin · geen PII) | H1 (primair) · H3 |
| Bericht helpen formuleren | Vriendelijk WhatsAppje (fictief) | H1 · H3 |
| Uitnodiging | Verjaardagsuitnodiging helpen formuleren | H1 · H3 |
| Ideeën / opties | Cadeau-ideeën · drie mogelijkheden | H1 · H3 |
| Maaltijd / planning | Koelkastvraag · boodschappenlijstje *(tweede, lichtere toepassing)* | H1 · H2 |
| Stap-voor-stap | “Maak er 5 stappen van” / grotere letters | H2 · H3 |
| Bijsturen | Korter · eenvoudiger · vriendelijker | H2 (kort) · H3 (kern) |
| Controleren | Openingstijden museum → officiële site | H4 |

**Niet meenemen als kern:** classificatiespel “is dit AI?” · lange AI-in-foto’s/spraak/aanbevelingen-theorie · stereotiep “alleen voor ouderen” · echte deelnemersbrieven.

---

## 8. HARD GATE — H1 versus H2

Dit is het belangrijkste architectuurpunt. Overlap is **niet** verdoezeld; de routes zijn aangescherpt.

### Vergelijking

| | **H1 — Ontdekken** | **H2 — Bedienen** |
|--|--------------------|-------------------|
| Hoofdvraag | Waar kan AI mij bij helpen? | Hoe voer ik zelf een gesprek? |
| Succesgevoel | “Dit is nuttig — ik heb het gezien/geprobeerd.” | “Ik weet waar ik moet zijn en kan de stappen zelf.” |
| Kernroute | SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN | OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN (+ nieuw gesprek) |
| Gemini-rol | Live demo-resultaten tonen | Concrete bediening oefenen |
| Diepte chat | Max. **één** korte eigen interactie | Volledige korte gespreksroute + nieuw gesprek |

### Wat deelnemer concreet doet

**H1**
1. Herkent 3–4 dagelijkse situaties (uitleg · schrijven · ideeën · stappen).  
2. Ziet live een AI-antwoord op de beamer.  
3. Ziet **één** korte bijsturing (“Maak het eenvoudiger”) — ervaren, niet trainen.  
4. Kiest één veilige oefenvraag uit een kleine lijst (of meekijk/stuur-route).  
5. Leest het antwoord rustig.  
6. Noemt één eigen (veilige) thuisvraag.  

**H2**
1. Opent zelf de AI-chat (browser · URL).  
2. Vindt typvak · typt · verstuurt.  
3. Herkent waar het antwoord staat · leest.  
4. Stelt in hetzelfde gesprek twee functionele vervolgvragen (bijv. “voor 2 personen” · “boodschappenlijstje”).  
5. Start een **nieuw gesprek** · controleert leeg typvak · stelt een andere eenvoudige vraag.  
6. Eindmissie: openen → vraag → vervolg → nieuw gesprek **zonder voordoen**.

### Minimale bediening in H1 (alleen om te ervaren)

- Optioneel: één keer typen/versturen **van een voorbereide of gekozen oefenvraag**, of Route C (dicteren).  
- **Geen** training “waar open ik Gemini”.  
- **Geen** nieuw gesprek.  
- **Geen** driestap-zelfstandigheid.  
- Wie niet kan openen: Route B/C — H1-succes blijft gelden.

### Bewust bewaard voor H2

- Openen / URL / browserpad  
- Typvak betrouwbaar vinden  
- Verstuurknop / wachten op antwoord  
- Verder praten als **bedieningsvaardigheid**  
- Nieuw gesprek vs verder praten  
- Cookies/inloggen als storingsafhandeling (niet als leskern)

### Waarom H2 na H1 nog een nieuwe les voelt

Na H1 weet de deelnemer **waarom** AI interessant is en heeft hooguit één keer “geproefd”.  
H2 leert de **route op het eigen scherm**: openen → typen → lezen → verder praten → nieuw gesprek — alsof je leert een apparaat te bedienen nadat je hebt gezien wat het kan.

### Routekeuze H1 (behouden · fase 1C)

Architectuurroute blijft:

> **SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN**

| Stap | H1-betekenis |
|------|----------------|
| SITUATIE | Herkenbare behoefte eerst — **niet** “Wat is AI?” |
| ANTWOORD ZIEN | Resultaat centraal (niet de knoppen) |
| KORT BIJSTUREN | Eén demostap — “verder praten bestaat” |
| ZELF ERVAREN | Eén lichte proef · geen bedieningscursus |

**Optionele deelnemersgeheugensteun (alleen ter verheldering · geen bedieningsroute):**

> **VRAAG → KIJK → PROBEER**

| | |
|--|--|
| VRAAG | Wat wilt u weten of gedaan krijgen? |
| KIJK | Bekijk het antwoord |
| PROBEER | Probeer één keer zelf (of meekijk/stuur) |

Dit mag op deelnemerskaart/beamer als **korte geheugensteun**.  
Het vervangt **niet** de architectuurroute en mag **niet** uitgroeien tot openen/typvak/nieuw-gesprek-training (dat is H2).

### Is ~90 minuten per les zinvol zonder opvulling?

| Les | Oordeel | Risico bij slechte uitvoering |
|-----|---------|--------------------------------|
| H1 | **Ja** — situaties + live demo + één ervaring + eigen vraag + afronding | Te veel theorie / te veel bediening → wordt H2 |
| H2 | **Ja** — openen + driestap + nieuw gesprek + eindmissie (zoals oude G2) | Opnieuw “waarvoor AI” uitleggen |
| H3 | **Ja** — situaties + drie stappen + vervolgvragen + eindmissie | Prompt-jargon / perfecte vragen |
| H4 | **Ja** — privacy + echt controleren + situaties + eindmissie | Bangmakerij / D-herhaling |

Geen theorie toevoegen om tijd te vullen. Bij tijdnood: eindmissie behouden.

---

## 9. Per les

---

### H1 — Wat kan AI voor mij doen?

**Functie:** ONTDEKKEN  
**Hoofdvraag:** Waar kan AI mij in het dagelijks leven bij helpen?  
**Rode draad:** AI kan mij helpen.

#### Beginsituatie (primair openingsanker · vast)

H1 begint **niet** met “Wat is AI?”  
H1 begint met een herkenbare behoefte:

> “Stel: u krijgt een tekst die u moeilijk vindt. Zou AI kunnen helpen om die tekst eenvoudiger uit te leggen?”

**Privacy (hard):** gebruik **geen** echte brief van een deelnemer.  
Gebruik een korte **fictieve SeniorEase-demotekst** zonder naam · adres · BSN · medische gegevens · dossiernummer · andere persoonsgegevens.  
Voorbeeldrichting: neutrale moeilijke zin uit een fictieve gemeentelijke of organisatorische brief.

**Pas ná de ervaring** kort benoemen:

> “Dit is één van de dingen waarbij AI kan helpen.”

**Tweede, lichtere toepassing:** koelkast / maaltijdidee — zelfde ontdekdoel, ander nut.

#### Lesbelofte

> Ik heb ervaren waar een AI-assistent mij bij kan helpen — en ik heb één eenvoudige, veilige interactie gezien of zelf gedaan.

#### Leerdoelen

- In gewone taal 2–3 nuttige toepassingen noemen (uitleg · schrijven · ideeën · stappen · uitnodiging).  
- Een AI-antwoord hebben gezien en rustig gelezen.  
- Weten dat je kort kunt bijsturen (één demostap).  
- Eén veilige eigen vraag kunnen noemen voor thuis.  
- Korte tip: typ geen geheimen (geen H4-les).

#### Kernroute (architectuur · behouden)

**SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN**

Optioneel voor deelnemers: **VRAAG → KIJK → PROBEER** (§8) — geen chat-bedieningsroute.

#### Indicatieve 90-minutenopbouw

| Blok | Min | Inhoud |
|------|-----|--------|
| Opening + moeilijke demotekst | 10 | Beginsituatie · belofte · geen “Wat is AI?” |
| Live demo + één bijsturing | 18 | Demotekst eenvoudiger · “Maak het eenvoudiger” · daarna: “één van de dingen…” |
| Beamer: 2–3 andere nut-situaties | 15 | Bericht · ideeën/uitnodiging · koelkast (licht) — één dia per gedachte |
| Pauze | 5 | |
| Zelf ervaren (of Route B/C) | 18 | Eén oefenvraag uit korte lijst |
| Eigen vraag noemen | 8 | Thuiswaarde · geen geheimen |
| Eindmissie | 10–12 | Zelfstandig bewijs · geen voordoen |
| Afronding | 2 | Brug naar H2 |

#### Wat deelnemer zelf doet

- Meekijken · kiezen · (indien mogelijk) één vraag versturen of dicteren · antwoord lezen · eigen vraag noemen.

#### Wat bewust NIET in H1 zit

- Openen/URL/typvak-training · nieuw gesprek · driestap-chat · drie vraagstappen (H3) · controleprotocol (H4) · AI-definitiecollege · classificatiespel · account aanmaken · echte deelnemersbrieven.

#### Account / fallback

- Route A indien mogelijk.  
- Anders B of C.  
- H1-succes **vereist geen** eigen inlog.

#### Veiligheid / privacy

- Alleen fictieve SeniorEase-demotekst.  
- Tip vóór typen: geen geheimen.  
- Toon: nieuwsgierig, niet angstig.

#### Eindmissie (circa 10–12 min)

| | |
|--|--|
| **Situatie** | Kies uit twee veilige kaarten (bijv. “eenvoudiger uitleg” of “ideeën / uitnodiging”) — of eigen veilige variant |
| **Zelfstandig** | Formuleer de vraag · ervaar het antwoord (zelf / zaaltoestel / dicteren) · zeg in één zin waar AI hierbij hielp |
| **Succes** | Vraag + antwoord gezien + nut in eigen woorden |
| **Begeleider/helper** | Geen voordoen van de missie · helper: “Wat ziet u nu?” · geen vraag invullen voor de deelnemer |

#### Relatie

Start leerlijn → H2 leert bedienen.

---

### H2 — Een AI-assistent gebruiken

**Functie:** BEDIENEN  
**Hoofdvraag:** Hoe voer ik zelf een gesprek met een AI-assistent?  
**Rode draad:** Ik kan AI zelf gebruiken.

#### Primaire oefenroute (vast)

**Browser → Google Gemini (webversie).**  
Eén primaire route voor alle apparaten. Geen aparte Android-/iPhone-/computer-cursus.  
Geen app-installatie. Fallback A–D blijft.  
“Uw scherm kan er iets anders uitzien. Dat is normaal.”

#### Beginsituatie

> “U wilt zelf een AI-assistent openen, een gewone vraag typen, het antwoord lezen, en daarna iets bijsturen — net zoals u verder praat in een bericht.”

#### Lesbelofte

> Ik kan een AI-assistent openen, een vraag stellen, het antwoord lezen, een vervolgvraag stellen, en een nieuw gesprek starten.

#### Leerdoelen

- Openen via browser (Gemini-web · URL op A4).  
- Typvak · typen · versturen *(icoon+woord+betekenis — zie §9a)*.  
- Antwoord herkennen en lezen.  
- In hetzelfde gesprek doorvragen (context in dat gesprek).  
- Verschil verder praten vs **nieuw gesprek**.  
- Cookies/inloggen: alleen als storing — geen leskern.

#### Kernroute

**OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN**  
*(Plus: nieuw gesprek.)*

#### Indicatieve 90-minutenopbouw

| Blok | Min | Inhoud |
|------|-----|--------|
| Retrieval uit H1 | 5 | Doen — zie §11 |
| Openen + typvak (beamer → nadoen) | 18 | Gemini **web** · kaderzin één keer · icoon+woord bij versturen/typvak |
| Driestap-gesprek | 20 | Vraag → “voor 2 personen” → “boodschappenlijstje” (of veilig equivalent) |
| Pauze | 5 | |
| Nieuw gesprek | 15 | Leeg typvak · andere eenvoudige vraag |
| Herhalen / hulp | 13 | Helper 1-op-1 · Route B/C |
| Eindmissie | 10–12 | Volledige bedieningsketen |
| Afronding | 2 | Brug naar H3 |

#### Wat deelnemer zelf doet

- Openen · typen · versturen · lezen · twee vervolgen · nieuw gesprek · eindmissie.

#### Wat bewust NIET in H2 zit

- Catalogus “waarvoor AI” (H1).  
- Drie-stappen geheugensteun (H3).  
- Officiële-bron-controle (H4).  
- ChatGPT-interface.  
- Prompt-theorie.  
- App-installatietraject · parallelle platformcursussen.

#### Account / fallback

- Route A primair (browser → Gemini).  
- Route B: zelfde handelingen op zaaltoestel.  
- Route C: deelnemer dicteert elke stap (“open … typ … verstuur … nieuw gesprek”) terwijl begeleider alleen uitvoert wat gezegd wordt; deelnemer wijst op beamer aan waar typvak/antwoord/nieuw gesprek zit.  
- Les loopt door zonder klassikaal account.

#### Veiligheid / privacy

- Geen geheimen.  
- Neutrale voorbeelden (koken · planning · grotere letters).

#### Eindmissie (circa 10–12 min)

| | |
|--|--|
| **Situatie** | “Voer zelf een kort gesprek en start daarna een nieuw gesprek.” |
| **Zelfstandig** | Openen → vraag → vervolgvraag → nieuw gesprek → andere korte vraag |
| **Succes** | Alle stappen herkenbaar uitgevoerd (of Route B/C met deelnemer als stuurder) |
| **Begeleider/helper** | Geen herdemonstratie · helper alleen vaste methode |

#### Relatie

Retrieval H1 → H3 gebruikt dezelfde bediening voor betere vragen.

#### Deelnemerskaart — woordenblok (richting)

Klein blok **WOORDEN EN TEKENS DIE U TEGENKOMT** (ca. 3–5):

| Begrip | Betekenis |
|--------|-----------|
| Typvak | De plek waar u uw vraag schrijft. |
| Versturen | Hiermee stuurt u uw vraag naar AI. |
| Nieuw gesprek | Hiermee begint u met een ander onderwerp. |

---

### H3 — Betere vragen stellen aan AI

**Functie:** VERBETEREN  
**Hoofdvraag:** Hoe krijg ik een antwoord waar ik meer aan heb?  
**Rode draad:** Ik kan betere antwoorden krijgen.

#### Beginsituatie

> “Stel: u wilt een vriendelijk WhatsAppje, of een korte uitleg van een moeilijke zin. De eerste vraag is zelden perfect — u mag verder praten tot het bruikbaar is.”

#### Lesbelofte

> Ik kan duidelijker vragen wat ik wil, wat belangrijke informatie is, en hoe ik het antwoord wil — en ik stuur bij met eenvoudige vervolgvragen.

#### Leerdoelen

- Beginnen bij een gewone situatie.  
- Drie kernvragen gebruiken (zie geheugensteun).  
- Eerste antwoord hoeft niet perfect.  
- Vervolgvragen: korter · eenvoudiger · vriendelijker · voorbeeld · drie mogelijkheden.  
- Verder praten i.p.v. steeds opnieuw beginnen.  
- Bij brieftekst: geen persoonsgegevens · alleen fictieve/veilige tekst.

#### Kernroute + geheugensteun (vast)

**Drie vragen (kern H3):**

1. **Wat wil ik?**  
2. **Wat moet AI weten?**  
3. **Hoe wil ik het antwoord?**

**Gekoppeld aan de route:**

**WAT WILT U? → GEEF WAT INFORMATIE → ZEG HOE U HET WILT**  
*(Daarna: gericht bijsturen.)*

**Vaste take-home (later op deelnemerskaart H3):**

> **NOG NIET TEVREDEN?**  
> Vraag gerust verder.

Voorbeelden: Maak het korter. · Leg het eenvoudiger uit. · Maak het vriendelijker. · Geef een voorbeeld. · Geef mij drie mogelijkheden.

Geen “prompt engineering” voor deelnemers. Term bij voorkeur ook niet in begeleidersmateriaal.

#### Indicatieve 90-minutenopbouw

| Blok | Min | Inhoud |
|------|-----|--------|
| Retrieval uit H2 | 5 | Open · korte vraag · één vervolg |
| Situaties eerst | 15 | Bericht · uitnodiging · moeilijke zin · opties — vóór de geheugensteun |
| Geheugensteun + oefening 1 | 18 | Drie vragen · vraag opbouwen · versturen |
| Vervolgvragen (kern) | 18 | Minstens drie gerichte vervolgen · “nog niet tevreden?” |
| Pauze | 5 | |
| Zelfstandig oefenen | 15 | Eigen veilige weekvraag |
| Eindmissie | 10–12 | Doel + info + vorm + twee vervolgen |
| Afronding | 2 | Brug naar H4 |

#### Wat deelnemer zelf doet

- Situatie kiezen · vraag opbouwen · versturen · minstens drie vervolgen · eindmissie.

#### Wat bewust NIET in H3 zit

- Open-/nieuw-gesprek-training als hoofdles.  
- Museumcontrole als hoofdoefening.  
- Perfecte formuleringen eisen.  
- Jargon “prompt”.

#### Account / fallback

- Route A/B/C.  
- Bij C: deelnemer bouwt hardop de drie stappen en kiest elke vervolgvraag; typen mag helper/begeleider alleen als laatste redmiddel.

#### Veiligheid / privacy

- Brief: één moeilijke zin uit fictieve demotekst, zonder naam/adres/BSN.  
- Geen medische/financiële dossiers.

#### Eindmissie (circa 10–12 min)

| | |
|--|--|
| **Situatie** | Iets uit de komende week (veilig: reis · hobby · bericht · uitnodiging · planning) |
| **Zelfstandig** | Vraag met doel + info + gewenste vorm · twee vervolgvragen tot bruikbaarder |
| **Succes** | Zichtbaar verschil tussen eerste en bijgestuurd antwoord |
| **Begeleider/helper** | Geen invullen van de drie stappen · geen voordoen vervolgvragen |

#### Relatie

Retrieval H2 → H4: bruikbaar ≠ automatisch betrouwbaar genoeg.

---

### H4 — AI-antwoorden controleren en veilig gebruiken

**Functie:** CONTROLEREN EN VEILIG BESLISSEN  
**Hoofdvraag:** Wanneer kan ik een AI-antwoord gebruiken en wanneer moet ik eerst controleren?  
**Rode draad:** Ik gebruik AI verstandig.

#### Beginsituatie

> “Stel: AI noemt openingstijden. Het klinkt zeker — maar klopt het? En wat deelt u wél of niet met AI?”

#### Lesbelofte

> Ik deel geen gevoelige gegevens met AI, ik controleer belangrijke informatie bij een andere betrouwbare bron, en ik baseer belangrijke beslissingen niet alleen op een AI-antwoord.

#### Leerdoelen

- Overtuigend kan toch fout zijn.  
- Privacy: geen geheimen · geen upload paspoort/bankafschrift/belastingbrief/medisch document.  
- Controleren = zelf andere bron — niet “Weet u het zeker?” aan AI.  
- Sterke vraag: **“Waar kan ik dit nog controleren?”**  
- Regel gezondheid/geld/recht/overheid.  
- Belangrijke aankopen: alleen als voorbeeld, niet als vijfde vaste categorie.  
- Korte doorverwijzing D (fraude) en E (DigiD/overheid regelen).

#### Kernroute (behouden) + latere visuele kapstok

**DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS**

Later (productie) **visueel herkenbaar**, bijvoorbeeld:

| | |
|--|--|
| *[privacy-herkenningsicoon]* | **DEEL NIET ALLES** |
| *[controle-herkenningsicoon]* | **CONTROLEER WAT BELANGRIJK IS** |

**Hard:** in deze architectuur **geen** willekeurige emoji als definitieve UI-iconen.  
Productie kiest later eenvoudige, duidelijke **SeniorEase-herkenningsiconen** (uitleg — zie §9a).  
Nooit presenteren alsof dat exact de knop in Gemini is.

| Alternatief | Oordeel |
|-------------|---------|
| STOP → CONTROLEER → BESLIS | **Afgewezen** als hoofdkapstok — te dicht bij Pakket D |
| DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS | **Gekozen** — privacy én betrouwbaarheid zonder D te kopiëren |

#### Indicatieve 90-minutenopbouw

| Blok | Min | Inhoud |
|------|-----|--------|
| Retrieval uit H3 | 5 | Zwakke vraag verbeteren of “maak het eenvoudiger” |
| Kapstok + privacy | 15 | DEEL NIET ALLES · uploads · geen geheimen |
| Betrouwbaarheid + demo | 20 | Openingstijden → “Waar kan ik dit nog controleren?” → officiële site |
| Pauze | 5 | |
| Situaties mag/niet/controleren | 15 | Stamppot · brief+BSN · openingstijden · behandeling · ev. aankoop-voorbeeld |
| Herhalen | 8 | Helper |
| Eindmissie | 10–12 | Privacy-oordeel + echt controleren + regel toepassen |
| Afronding | 2 | Pakket H compleet · thuisproef |

#### Wat deelnemer zelf doet

- AI-feit zien · zelf officiële bron openen · vergelijken · situaties beoordelen · eindmissie.

#### Wat bewust NIET in H4 zit

- Phishing · QR · helpdesk · betalen (D).  
- DigiD/MijnOverheid openen (E).  
- Vraagtechniek hertrainen (H3).  
- “AI is gevaarlijk”-college.

#### Account / fallback

- **Route D sterk:** AI-antwoord op beamer → deelnemer controleert op officiële site (geen AI-login nodig).  
- Route A/B voor wie wél AI kan gebruiken.  
- Wie geen browser aankan: meekijken + hardop zeggen wat te controleren en waarom.

#### Veiligheid / privacy

- Kern van de les · geen angsttoon · geen echte fraude-links.

#### Eindmissie (circa 10–12 min)

| | |
|--|--|
| **Situatie** | Nieuw checkbaar feit (museum/bibliotheek-achtig · exacte bron bij productie) + één privacy-situatiekaart |
| **Zelfstandig** | (1) zeg wat u níet deelt · (2) controleer het feit bij een andere bron · (3) pas regel gezondheid/geld/recht/overheid toe op een korte kaart |
| **Succes** | Andere bron geraadpleegd · privacy-keuze juist · regel toegepast |
| **Begeleider/helper** | Controle niet vóórdoen · geen “juiste antwoord” voorspiegelen vóór de deelnemer kiest |

#### Relatie

Sluit Pakket H. Thuis: kleine veilige proef + “belangrijk? → elders checken”.

---

## 9a. Woorden · tekens · iconen (pakketbrede ontwerpregel · H)

### Regel: woord + betekenis + handeling

> Een onbekend digitaal woord of teken wordt de eerste keren gekoppeld aan **betekenis én handeling**.

Niet alleen een icoon tonen. Wel bijvoorbeeld:

> *[icoon]* **Versturen**  
> Hiermee stuurt u uw vraag naar AI.

Doel: deelnemers hoeven de betekenis van digitale symbolen niet te raden.

### Formule (waar het echt helpt)

**HERKENNINGSICOON + WOORD + KORTE BETEKENIS**

Voorbeelden van begrippen (niet allemaal in elke les):

Gesprek · Typen / typvak · Versturen · Praten / microfoon · Toevoegen / bijlage · Nieuw gesprek · Controleren · Privé

**Maximaal enkele** relevante nieuwe woorden/tekens per les.  
Rust blijft belangrijker dan volledigheid.

### Hard onderscheid: echte UI vs SeniorEase-iconen

| | **A. Echte bediening** | **B. Uitleg / geheugensteun** |
|--|------------------------|-------------------------------|
| Wanneer | Deelnemer moet een knop in Gemini herkennen | Begrippen · privacy · controleren · deelnemerskaart |
| Wat tonen | Het **werkelijke actuele** pictogram/scherm | Eenvoudige **SeniorEase-herkenningsiconen** |
| Mag niet | Vervangen door emoji of verzonnen “leuk” symbool | Presenteren alsof dat exact de Gemini-knop is |

### Deelnemerskaart — “WOORDEN EN TEKENS DIE U TEGENKOMT”

Waar nodig: klein blok met ca. **3–5** relevante begrippen die zelfstandigheid vergroten.  
Geen traditioneel technisch woordenboek voor deelnemers.

### START HIER — klein begeleiderswoordenboek (waar nuttig)

Praktische, niet-technische steun — **geen** theorieblok voor deelnemers:

| Begrip | Betekenis |
|--------|-----------|
| AI | Een computerprogramma/systeem dat bijvoorbeeld antwoorden, uitleg en ideeën kan geven. |
| Chat / gesprek | Een gesprek met een AI-assistent. |
| Vraag | Wat u aan AI schrijft of zegt. |
| Antwoord | Wat de AI-assistent teruggeeft. |
| Vervolgvraag | Een volgende vraag binnen hetzelfde gesprek. |

**Niet gebruiken:** LLM · tokens · machine learning-uitleg · prompt engineering · technische modelarchitectuur.

### Consistente SeniorEase-herkenning binnen H

Zelfde betekenis → zoveel mogelijk dezelfde SeniorEase-visuele herkenning (privacy · controleren · typen · …).  

Eisen: rustig · volwassen · niet kinderachtig · geen iconenregen · iconen ondersteunen tekst (vervangen tekst niet) · leesbaarheid > versiering.  

Alleen voor **Pakket H** vastleggen in deze architectuur.  
**Niet** andere pakketten nu aanpassen. Kan later een bredere SeniorEase-standaard worden.

## 10. Voorbeelden uit G-AI — selectiebesluit

| Uit G-AI | Besluit | Reden |
|----------|---------|-------|
| Koelkast / koken | **Behouden** | Herkenbaar · veilig · goed voor H1/H2 |
| WhatsApp vriendelijk / bedanken | **Behouden** | Praktisch · H1/H3 · geen C-bediening |
| Moeilijke briefzin zonder persoonsgegevens | **Behouden / versterken** | Primair H1-anker · alleen **fictieve** SeniorEase-demotekst |
| Verjaardagsuitnodiging | **Toevoegen** | Variatie · niet alleen “tekstschrijver”-gevoel |
| Maastricht meeneemlijst / uitje | **Behouden** (licht) | Planning · ideeën |
| Grotere letters op telefoon | **Behouden** in H2 als eenvoudige “andere vraag” | Bedieningsoefening · niet A-herles |
| Cadeau-ideeën tuinieren | **Behouden** | Ideeën · opties |
| Van Gogh openingstijden + officiële check | **Behouden** | Sterkste H4-controlevoorbeeld |
| Classificatie “is dit AI?” | **Verwijderen** | Theorie · niet SeniorEase-doen |
| Lange AI-in-foto’s/spraak/aanbevelingen | **Verwijderen** als kern | Te veel uitleg · weinig handeling |
| “Weet u het zeker?” als controle | **Verwijderen** | Misleidend — expliciet afwijzen in H4 |

---

## 11. Retrieval (DOEN · niet quizzen)

Niet: “Wie weet nog…?”  
Wel: “Probeert u nog eens…”

| Start les | Retrieval (ca. 3–5 min) | Bewijst |
|-----------|-------------------------|---------|
| **H2** | Kies één nut uit H1 · ervaar één eenvoudige veilige vraag (zelf / B / C) | Ontdekking zit nog |
| **H3** | Open AI · korte vraag · één vervolg in hetzelfde gesprek | Bediening zit nog |
| **H4** | Verbeter één zwakke vraag met de drie stappen **of** stuur bij met “eenvoudiger/korter” | Vraagvaardigheid zit nog |

---

## 12. Migratiematrix G-AI → H

| Oud | Nieuw | Kernverschuiving |
|-----|-------|------------------|
| G1 Wat is AI? | H1 Wat kan AI voor mij doen? | Definitie → **ontdekken nut** |
| G2 AI openen en gebruiken | H2 Een AI-assistent gebruiken | Behouden bediening · scherp gescheiden van H1 |
| G3 Goede vragen stellen | H3 Betere vragen stellen aan AI | Structuur behouden · modernere toon |
| G4 AI veilig gebruiken | H4 … controleren en veilig gebruiken | Privacy + controle · geen D-kopie |

### Per les — BEHOUDEN / AANPASSEN / VERPLAATSEN / VERWIJDEREN

#### G1 → H1

| Actie | Onderdeel | Reden |
|-------|-----------|-------|
| BEHOUDEN | Live antwoord · koelkast · eigen vraag · 8–10 · 90 min · geen account klassikaal | Werkt didactisch |
| AANPASSEN | Titel/belofte · begeleider · inloop buiten 90 · productstructuur F/G · meekijk-succes · route hernoemd | Moderne standaard |
| VERPLAATSEN | Driestap-chat · open-training | → H2 |
| VERWIJDEREN | Classificatiespel · lange AI-soortenreeks · definitiecollege | Niet SeniorEase-doen |

#### G2 → H2

| Actie | Onderdeel | Reden |
|-------|-----------|-------|
| BEHOUDEN | Openen · typvak · versturen · verder praten · nieuw gesprek · driestap koken | Sterke bedieningskern |
| AANPASSEN | H1/H2-scheiding · retrieval · Gemini-kaderzin · uitvoerbare fallback A–C · begeleider | Overlap + account hard gate |
| VERPLAATSEN | Gerichte vervolgvarianten als kerntraining | → H3 |
| VERWIJDEREN | Gemini/ChatGPT-productles-sfeer | H is vaardigheidspakket |

#### G3 → H3

| Actie | Onderdeel | Reden |
|-------|-----------|-------|
| BEHOUDEN | Drie stappen · situaties eerst · vervolglijst · brief zonder PII · “niet perfect” | Sterkste G-AI-inhoud |
| AANPASSEN | Route-labels · titel “Betere…” · retrieval · F/G-productset | Standaard |
| VERPLAATSEN | Diepe “klopt dit?”-controle | → H4 |
| VERWIJDEREN | Prompt-jargon · oefentaken.md als product | Toon + productstructuur |

#### G4 → H4

| Actie | Onderdeel | Reden |
|-------|-----------|-------|
| BEHOUDEN | Drie regels · museumcheck · upload-waarschuwing · situaties A–D · gezondheid/geld/recht/overheid · D/E-verwijzing | Essentieel |
| AANPASSEN | Kapstok DEEL NIET… · eindmissie = doen · geen hardop-regels-toets · toon zonder angst | F/G-eindmissie · geen D-echo |
| VERPLAATSEN | — | — |
| VERWIJDEREN | Fraude-/DigiD-oefenneiging · “zeker weten?” als controle | Hard rules |

---

## 13. Overlapcontrole binnen H en met andere pakketten

### Binnen H

| Risico | Mitigatie |
|--------|-----------|
| H1 ≈ H2 | Andere routes · H1 max. één lichte ervaring · H2 = volledige bedieningsketen + nieuw gesprek |
| H2 ≈ H3 | H2: verder praten werkt · H3: gerichte verbetering + geheugensteun |
| H3 ≈ H4 | H3: formuleren zonder PII · H4: waarom niet delen + elders controleren |
| H4 ≈ D | H4 = AI-output + privacy; D = verdacht verzoek / link / helpdesk / betalen |

### Met andere pakketten

| Thema | Eigenaar | In H |
|-------|----------|------|
| Verdacht bericht · phishing · QR · helpdesk · betalen | **D** | Alleen doorverwijzing |
| DigiD · MijnOverheid | **E** | Alleen beslissingsregel |
| Zoeken · websites · QR · formulier | **F / G** | H4 mag officiële site openen; geen zoek-/tabbladles |
| WhatsApp-bediening | **C** | Alleen tekst helpen schrijven |
| ChatGPT-productbediening | **Losse les** | Alleen noemen |

---

## 14. Productievoorwaarden (latere fase · F/G-werkwijze)

Architectuur is **bevroren**. Productie start pas na aparte opdracht per les.

1. Per les eerst **inhoudsdocument** (zoals G1/F1-inhoud v2) → review  
2. Daarna productie: START HIER · draaiboek · beamer · Hulp · deelnemerskaart · zaalchecklist  
3. Generators naar voorbeeld F/G (`_pdf_base` · `pdf_base_shared` · build_pdf/beamer · render-QA)  
4. Screenshots alleen waar bediening wordt geleerd — **echte actuele UI-pictogrammen** (§9a-A)  
5. SeniorEase-herkenningsiconen alleen voor uitleg/geheugensteun (§9a-B) — geen emoji als definitieve UI; geen verwarring met Gemini-knoppen  
6. Zelfde betekenis → zoveel mogelijk dezelfde SeniorEase-herkenning binnen H  
7. Account/fallback A–D in START HIER + Hulp  
8. Privacy: fictieve SeniorEase-demotekst voor briefzin · museumvoorbeeld actualiseren vóór productie  
9. Geen `oefentaken.md` · geen nazorgkaart · terminologie **begeleider**  
10. Retrieval + eindmissie **circa 10–12 min** (inhoud leidend · bij tijdnood beschermen)  
11. Deelnemerskaart: waar nuttig blok **WOORDEN EN TEKENS DIE U TEGENKOMT** (ca. 3–5)  
12. START HIER: waar nuttig klein **begeleiderswoordenboek** (§9a) — geen LLM/tokens/prompt engineering  
13. Visuele review van **gerenderde** PDF’s · daarna GOEDGEKEURD / distributie  
14. **Geen** technische G/H-migratie vanuit lesproductie · **geen** andere pakketten aanpassen voor iconen  
15. Bouwvolgorde: H1 → H2 → H3 → H4  

### START HIER — vaste koppen

Doel · benodigdheden · voorbereiding 10–15 min · groepsopstelling · helper · privacy · account/fallback · stopregels · wat absoluut niet in deze les · (optioneel) klein begeleiderswoordenboek.

---

## 15. Latere uitvoeringsbeslissingen

Deze punten blokkeerden de freeze **niet**.  
Zij worden afgehandeld bij H1-inhoud · productiefase · of aparte copy/content-opdracht — **zonder** de bevroren architectuurkeuzes te heropenen.

| # | Uitvoeringsbeslissing | Wanneer | Impact |
|---|----------------------|---------|--------|
| 1 | Exacte tekst van de fictieve SeniorEase-demobriefzin (H1) | Bij H1-inhoud · geen PII | Laag · inhoudsfase |
| 2 | H4-controlevoorbeeld: Van Gogh behouden / actualiseren | Bij H4-inhoud of -productie | Laag |
| 3 | Shopcopy hernoemen naar “AI in het dagelijks leven” | Aparte copy-opdracht | Copy only |
| 4 | Websitegidsen `/wat-is-ai` e.d. herijken | Later contentopdracht | Later |
| 5 | Concrete SeniorEase-iconenset voor privacy/controleren/typen | Productiefase | Productie |

**Architectuurgesloten (niet heropenen):** pakketbelofte · H1–H4 · H1/H2-hard gate · Gemini-web · leverancier-onafhankelijk · fallback A–D · H3 drie vragen + “nog niet tevreden?” · H4-kapstok · woorden/iconenregels · UI vs SeniorEase-iconen · eindmissie ca. 10–12 min · geen H5 · ChatGPT buiten H · zesdelige productstructuur · technische migratie buiten scope.

---

## 16. Eindcontrole (fase 1B + 1C · bevestigd bij freeze 1D)

| # | Vraag | Antwoord |
|---|-------|----------|
| 1 | H = AI-vaardigheidspakket, geen Gemini-cursus? | **Ja** |
| 2 | Gemini toch concreet genoeg om te oefenen? | **Ja** — **webversie** als primaire oefenroute |
| 3 | H1 en H2 echt verschillend? | **Ja** — ontdekken vs bedienen; architectuurroute behouden |
| 4 | H3 praktisch, geen prompt engineering? | **Ja** — drie vragen + “nog niet tevreden?” |
| 5 | H4 AI-veiligheid, geen kopie van D? | **Ja** — DEEL NIET ALLES → CONTROLEER… |
| 6 | Serie zonder klassikale accountcreatie? | **Ja** |
| 7 | Uitvoerbare fallback? | **Ja** — Routes A–D |
| 8 | Zonder gevoelige persoonsgegevens? | **Ja** — fictieve demotekst |
| 9 | Elke les praktisch genoeg voor ~90 min? | **Ja** |
| 10 | Elke les echte zelfstandige eindmissie? | **Ja** — ca. 10–12 min · inhoud leidend |
| 11 | Toekomstige ChatGPT-les onderscheidend? | **Ja** |
| 12 | Moderne F/G-standaard gevolgd? | **Ja** |
| 13 | Geen technische G/H-migratiewijzigingen? | **Ja** — alleen dit document |
| 14 | Echte UI-iconen vs SeniorEase-iconen gescheiden? | **Ja** — §9a |
| 15 | Geen emoji als definitieve UI vastgelegd? | **Ja** |

---

## 17. Freeze-status

**PAKKET H INHOUDSARCHITECTUUR V2.0 — GOEDGEKEURD & BEVROREN** 🔒

Geen H1-inhoud vanuit deze freeze.  
Geen PDF’s · beamers · screenshots · iconen · generators · shop/Stripe/fulfillment · technische migratie.

Volgende stap vereist **aparte opdracht:**

> H1 — Wat kan AI voor mij doen? · INHOUD V2.0
