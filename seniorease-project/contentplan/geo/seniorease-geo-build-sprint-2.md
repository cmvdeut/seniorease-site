# SeniorEase — GEO Build Sprint 2

**Trust & citability — DigiD + Veiligheid**  
**Status:** FINAL COPY TER REVIEW  
**Datum:** 14 september 2026  
**Commit:** nee  
**Deploy:** nee

---

## 1. Changed files

Sprint-wijzigingen (bewust):

- `app/uitleg/digid/page.tsx`
- `app/uitleg/veiligheid/page.tsx`
- `lib/uitleg-schema-data.ts` (alleen `veiligheid` HowTo-sync)
- `contentplan/geo/seniorease-geo-build-sprint-2.md` (dit rapport)

---

## 2. git diff --stat

```
seniorease-project/app/uitleg/digid/page.tsx      | 65 +++++++++++++++++++++--
seniorease-project/app/uitleg/veiligheid/page.tsx | 62 +++++++++++++++++----
seniorease-project/lib/uitleg-schema-data.ts      |  4 +-
 3 files changed, 116 insertions(+), 15 deletions(-)
```

(Plus dit rapportbestand.)

---

## 3. Officiële bronverificatie

| Paginatitel | Organisatie | Definitieve URL | Gecontroleerde claim(s) |
|---|---|---|---|
| DigiD aanvragen | DigiD (Logius) | https://www.digid.nl/aanvragen-en-activeren/digid-aanvragen | Aanvraag via digid.nl; brief met activeringscode binnen 5 werkdagen; DigiD is persoonlijk |
| DigiD app | DigiD (Logius) | https://www.digid.nl/inlogmethodes/digid-app | DigiD app als veilige inlogmethode; activeren/inloggen via officiële app |
| Contact | DigiD (Logius) | https://www.digid.nl/contact | Telefoon **088 123 65 55** / +31 88 123 65 55 (**lokaal tarief**); werkdagen 8.00–22.00, zaterdag 9.00–17.00 |
| Fraude of misbruik | DigiD (Logius) | https://www.digid.nl/veiligheid/fraude-misbruik | Helpdesk 088 123 65 55; bij phishing/fraude contact Fraudehelpdesk; wachtwoord wijzigen |
| Herken oplichting | MijnOverheid | https://mijn.overheid.nl/herken-oplichting/ | Nooit inloggegevens via telefoon/e-mail/WhatsApp/sms; controleer echte website; DigiD-inlog op echte DigiD-site |
| Home | Fraudehelpdesk | https://www.fraudehelpdesk.nl | Nationaal meldpunt; nummer **088 - 7867372** op homepage |
| Contact | Fraudehelpdesk | https://www.fraudehelpdesk.nl/contact/ | **088-786 7372** bevestigd |
| Wat kan ik doen tegen phishing? | Rijksoverheid | https://www.rijksoverheid.nl/vraag-en-antwoord/cybercrime-en-cybersecurity/phishing | Phishing via e-mail/sms/WhatsApp/telefoon; waarschuw Fraudehelpdesk; geen vertrouwen op verdachte links |
| Ik ben opgelicht | Politie | https://www.politie.nl/aangifte-of-melding-doen/aangifte-van-oplichting.html | Niet-spoed: **0900-8844**; spoed 112 |

**Niet behouden als “.nl = veilig”:** geen officiële bron ondersteunt dat een `.nl`-domein op zich veilig/officieel is. MijnOverheid adviseert juist: controleer of u op de echte officiële site bent (o.a. DigiD-inlog).

**Banknummers ING/Rabobank:** niet opnieuw geverifieerd voor evergreen-pagina; verwijderd ter voorkoming van verouderde nummers.

---

## 4. Exacte gewijzigde claims

### DigiD

| Was | Wordt |
|---|---|
| Alleen inloggen op websites die eindigen op `.nl` van bekende instanties | Alleen inloggen op de echte officiële website; typ zelf o.a. digid.nl / mijnoverheid.nl |
| Bel DigiD … (gratis nummer van de overheid) | Bel DigiD: 088 - 123 65 55 (**lokaal tarief**) + link Contact op digid.nl |
| Bij twijfel: ophangen en zelf digid.nl bellen | Bij twijfel: ophangen en zelf contact via gegevens op digid.nl |
| (geen bronnenblok / controledatum) | Bronnenblok + “Laatst inhoudelijk gecontroleerd: 14 september 2026” |

### Veiligheid

| Was | Wordt |
|---|---|
| 1 op de 5 senioren krijgt ermee te maken… | Online oplichting komt vaak voor. Wie de signalen herkent… |
| meest gebruikte truc bij senioren | een veel voorkomende truc |
| Echte berichten … zijn foutloos geschreven | Taalfouten = waarschuwing; foutloos ≠ automatisch echt |
| Echte bank/instantie belt u terug… | Definitieve gouden tip: onverwacht link-verzoek → niet meteen klikken; zelf naar officiële app/website of bekende gegevens |
| ING 020 / Rabobank 0900 in nummersblok | Verwijderd; algemeen bankcontact-advies |
| (geen bronnenblok / controledatum) | Bronnenblok + “Laatst inhoudelijk gecontroleerd: 14 september 2026” |

---

## 5. Schema-sync

Bestand: `lib/uitleg-schema-data.ts` — entry `veiligheid.howTo.steps` alleen.

| Stap | Oud | Nieuw |
|---|---|---|
| Bel zelf uw bank | Zoek zelf het telefoonnummer van uw bank op en bel zelf. | Beëindig zelf het gesprek. Neem contact op via de officiële bankapp, website of het nummer dat u zelf van uw bank kent. |
| Meld verdachte berichten | Stuur verdachte SMS of e-mail door naar Fraudehelpdesk: 088 - 786 7372. | Neem contact op met de Fraudehelpdesk: 088 - 786 7372. |

**DigiD-schema:** geen wijziging (zichtbare `.nl`-claim stond niet in schema).

**Niet toegevoegd:** Article, datePublished, dateModified, nieuwe schema-types.

---

## 6. QA

| Check | Resultaat |
|---|---|
| TypeScript | PASS (`npx tsc --noEmit`) |
| Alleen goedgekeurde bestanden in sprint-diff | PASS (3 code + rapport) |
| DigiD title/meta/H1 | Ongewijzigd PASS |
| Veiligheid title/meta/H1 | Ongewijzigd PASS |
| Geen nieuwe statistiek | PASS |
| Geen “.nl = veilig” | PASS |
| Geen “meest gebruikte truc” | PASS |
| Geen absolute “echte bank belt…” | PASS |
| Banknummers verwijderd | PASS |
| DigiD-nummer officieel geverifieerd + link | PASS |
| Fraudehelpdesk / politie geverifieerd | PASS |
| Bronlinks bereikbaar & passend | PASS |
| Zichtbaar ↔ schema sync waar relevant | PASS |
| Geen date-schema | PASS |

---

## 7. Freeze gates

| Gate | Status |
|---|---|
| GEO Sprint 1 (HOME FAQ, digitale-hulp FAQ, ORGANIZATION_DESCRIPTION, FAQ details, DEFAULT_DESCRIPTION, websiteSchema.description) | NIET AANGERAAKT |
| CTR Sprint 1 (google-maps, whatsapp-fotos-opslaan, wifi, whatsapp-basis) | NIET AANGERAAKT |
| SEO/AEO lesmateriaal Sprint 2 | NIET AANGERAAKT |
| /wat-is-ai, AI-child pages, Pakket H, PDF’s | NIET AANGERAAKT |
| llms.txt, ai.txt, robots, sitemap, Product, Kijk & Help, Person, buildArticleSchema, WebApplication price, manifest, routes, redirects, canonicals, checkout/Stripe/Brevo | NIET AANGERAAKT |

---

## 8. Onverwachte wijzigingen

- **Sprint-scope zelf:** geen. Alleen DigiD, Veiligheid, veiligheid-schema-sync, dit rapport.
- **Working tree (buiten sprint):** er staan al langer andere dirty/untracked bestanden in de repo (o.a. lesmateriaal, Agent, sitemap.ts). Die zijn **niet** onderdeel van deze sprint en worden niet gecommit.

---

## Letterlijke copy — DIGID

### Oude .nl-tekst

```
✅ Alleen inloggen op websites die eindigen op .nl van bekende instanties
```

### Nieuwe tekst

```
✅ Alleen inloggen op de echte officiële website. Typ zelf het adres, bijvoorbeeld digid.nl of mijnoverheid.nl. Klik niet op een link in een e-mail of sms als u niet zeker weet of die echt is.
```

### Definitieve telefoon/contacttekst

```
Heeft u hulp nodig bij het aanvragen? Bel DigiD: 088 - 123 65 55 (lokaal tarief). Actuele tijden en andere contactmogelijkheden: Contact op digid.nl.
```

(Linktekst “Contact op digid.nl” → https://www.digid.nl/contact)

### Fraudekader (gewijzigde regels)

Oud:

```
✅ Alleen inloggen op websites die eindigen op .nl van bekende instanties
✅ Bij twijfel: ophangen en zelf digid.nl bellen
```

Nieuw:

```
✅ Alleen inloggen op de echte officiële website. Typ zelf het adres, bijvoorbeeld digid.nl of mijnoverheid.nl. Klik niet op een link in een e-mail of sms als u niet zeker weet of die echt is.
✅ Bij twijfel: ophangen en zelf contact opnemen via de gegevens op digid.nl
```

(Overige ❌-regels ongewijzigd.)

### Laatst inhoudelijk gecontroleerd

```
Laatst inhoudelijk gecontroleerd: 14 september 2026
```

### Volledig bronnenblok

```
Bronnen en verder lezen

Officiële informatie van de overheid — handig om zelf na te kijken.

• DigiD — DigiD aanvragen
  → https://www.digid.nl/aanvragen-en-activeren/digid-aanvragen

• DigiD — DigiD app
  → https://www.digid.nl/inlogmethodes/digid-app

• MijnOverheid — Herken oplichting
  → https://mijn.overheid.nl/herken-oplichting/

Laatst inhoudelijk gecontroleerd: 14 september 2026
```

---

## Letterlijke copy — VEILIGHEID

### Oude 1-op-5-tekst

```
1 op de 5 senioren krijgt ermee te maken. Maar wie de signalen kent, trapt er niet in.
```

### Definitieve vervanging

```
Online oplichting komt vaak voor. Wie de signalen herkent, kan sneller stoppen en controleren.
```

### Oude / nieuwe “meest gebruikte”-tekst

Oud:

```
Dit is de meest gebruikte truc bij senioren. U krijgt een WhatsApp-bericht van een onbekend nummer:
```

Nieuw:

```
Dit is een veel voorkomende truc. U krijgt een WhatsApp-bericht van een onbekend nummer:
```

### Oude / nieuwe spellingstekst

Oud:

```
"Uw account heeft problemen ondervonden. Klik hier om te verifiëren." Echte berichten van banken en overheid zijn foutloos geschreven.
```

Nieuw:

```
"Uw account heeft problemen ondervonden. Klik hier om te verifiëren." Taalfouten kunnen een waarschuwing zijn. Maar een foutloos bericht is niet automatisch echt — berichten zien er soms precies uit als van de bank of de overheid.
```

### Oude / nieuwe bank-beltekst

Oud (stap 2):

```
Zoek zelf het telefoonnummer van uw bank op (op de achterkant van uw bankpas of via google.nl) en bel zelf.
```

Nieuw (stap 2):

```
Beëindig zelf het gesprek of negeer het bericht. Neem daarna zelf contact op met uw bank via de officiële bankapp, website of het nummer dat u zelf van uw bank kent — niet via een nummer dat de beller geeft.
```

Oud (gouden tip, pre-sprint):

```
Een echte bank of instantie belt u terug als er echt iets aan de hand is. U hoeft nooit zelf ergens op te klikken om iets te bevestigen.
```

Tussenversie (te absoluut — gecorrigeerd):

```
U hoeft nooit op een link te klikken om iets te bevestigen. Hang op of negeer het bericht, en bel of mail zelf via een adres of nummer dat u al kent.
```

Definitieve gouden tip (micro-correctie):

```
Krijgt u onverwacht een verzoek om via een link iets te bevestigen? Klik dan niet meteen. Ga zelf naar de officiële app of website, of neem contact op via gegevens die u zelf kent.
```

### Definitieve nummers / contactinformatie

```
Fraudehelpdesk — 088 - 786 7372 — Meld verdachte berichten
Politie (niet-spoed) — 0900 - 8844 — Aangifte van oplichting

Contact met uw bank? Gebruik de officiële bankapp, website of het nummer dat u zelf van uw bank kent (bijvoorbeeld op de achterkant van uw bankpas). Gebruik geen nummer uit een verdacht bericht of telefoontje.
```

(ING- en Rabobank-nummers verwijderd.)

### Laatst inhoudelijk gecontroleerd

```
Laatst inhoudelijk gecontroleerd: 14 september 2026
```

### Volledig bronnenblok

```
Bronnen en verder lezen

Officiële informatie om zelf verder te lezen of een melding te doen.

• Fraudehelpdesk
  → https://www.fraudehelpdesk.nl

• Rijksoverheid — Wat kan ik doen tegen phishing?
  → https://www.rijksoverheid.nl/vraag-en-antwoord/cybercrime-en-cybersecurity/phishing

• MijnOverheid — Herken oplichting
  → https://mijn.overheid.nl/herken-oplichting/

Laatst inhoudelijk gecontroleerd: 14 september 2026
```

---

## SCHEMA — exacte wijzigingen

```ts
// veiligheid.howTo.steps — Bel zelf uw bank
// WAS:
{ name: 'Bel zelf uw bank', text: 'Zoek zelf het telefoonnummer van uw bank op en bel zelf.' },
// WORDT:
{ name: 'Bel zelf uw bank', text: 'Beëindig zelf het gesprek. Neem contact op via de officiële bankapp, website of het nummer dat u zelf van uw bank kent.' },

// WAS:
{ name: 'Meld verdachte berichten', text: 'Stuur verdachte SMS of e-mail door naar Fraudehelpdesk: 088 - 786 7372.' },
// WORDT:
{ name: 'Meld verdachte berichten', text: 'Neem contact op met de Fraudehelpdesk: 088 - 786 7372.' },
```

DigiD-schema: geen wijziging.
