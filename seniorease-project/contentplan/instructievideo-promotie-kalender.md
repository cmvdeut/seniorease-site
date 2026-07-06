# Instructievideo's — promotiekalender

**Periode:** juli–augustus 2026  
**Doel:** vier nieuwe uitlegvideo's bekend maken via nieuwsbrief, Facebook-groepen en (optioneel) eigen kanalen.  
**Taal:** Nederlands, formeel **u**, geruststellend — geen reclame-look.

---

## Video's en links

| Onderwerp | Uitlegpagina | YouTube | Lokaal MP4 |
|-----------|--------------|---------|------------|
| Oplichting herkennen | [seniorease.nl/uitleg/veiligheid](https://www.seniorease.nl/uitleg/veiligheid) | [watch?v=uprzSjDAeUg](https://www.youtube.com/watch?v=uprzSjDAeUg) | `video-generator/out/oplichting-herkennen-reels.mp4` (9:16) |
| Foto's maken | [seniorease.nl/uitleg/fotos-maken](https://www.seniorease.nl/uitleg/fotos-maken) | [watch?v=4yEKPemRm6U](https://www.youtube.com/watch?v=4yEKPemRm6U) | `hyperframes-prototype/storyboards/Betere_foto_s_met_telefoon (1).mp4` |
| Videobellen | [seniorease.nl/uitleg/videobellen](https://www.seniorease.nl/uitleg/videobellen) | [watch?v=hxIVYqSSflU](https://www.youtube.com/watch?v=hxIVYqSSflU) | `hyperframes-prototype/storyboards/videobellen-notebooklm.mp4` |
| Google Maps | [seniorease.nl/uitleg/google-maps](https://www.seniorease.nl/uitleg/google-maps) | [watch?v=QYKisb9t5gg](https://www.youtube.com/watch?v=QYKisb9t5gg) | `hyperframes-prototype/storyboards/google-maps-notebooklm.mp4` |

**YouTube-playlist Tips & Tricks:** `PLw97JnScZym8Ae4tlW7j38EfvMKMRIBem`

---

## Nieuwsbrief (automatisch)

Bron: `lib/nieuwsbrief-tips.ts` — elke maandag 09:00 NL, roterende tip.

| Week (maandag) | Tip-slug | Video-link in mail? |
|----------------|----------|---------------------|
| 7 jul 2026 | googelen-google-zoeken | nee |
| 14 jul | whatsapp-uitleg-beginners | nee |
| 21 jul | **phishing-herkennen** | ja (oplichting) |
| 28 jul | wifi-werkt-niet-oplossen | nee |
| 4 aug | letters-groter-maken-telefoon | nee |
| 11 aug | **google-maps** | ja |
| 18 aug | **fotos-maken-telefoon** | ja |
| 25 aug | **videobellen-whatsapp** | ja |
| 1 sep | veilig-wachtwoord-maken | nee |
| 8 sep | wat-is-ai-simpel-uitgelegd | nee |

Daarna herhaalt de cyclus (10 tips).

---

## Facebook-groepen (handmatig)

Teksten: `contentplan/facebook-groepen-berichten.md`  
**Max. 1–2 posts per week**, niet dezelfde tekst in meerdere groepen op één dag.

### Voorstel: 4 weken, 1 instructievideo per week

| Week | Maandag–vrijdag | Bericht # | Onderwerp | Video uploaden? |
|------|-----------------|-----------|-----------|-----------------|
| **1** (7–11 jul) | bijv. woensdag | **5** | Oplichting | ja — 9:16 Reel (kort, mobielvriendelijk) |
| **2** (14–18 jul) | bijv. dinsdag | **6** | Foto's maken | optioneel — 16:9 lang; link naar site volstaat |
| **3** (21–25 jul) | bijv. donderdag | **7** | Videobellen | optioneel |
| **4** (28 jul–1 aug) | bijv. maandag | **8** | Google Maps | optioneel |

**Tip:** plan bericht **3** (foto *versturen* via WhatsApp) vóór bericht **6** (foto's *maken*) — anders verwarrend.

---

## Eigen Facebook-pagina / Instagram (optioneel)

Kortere posts, zelfde toon:

**Week 1 — Oplichting**  
> Kreeg u wel eens een bericht dat van uw bank leek? In ±1 minuut: 5 signalen om nepberichten te herkennen. Gratis op seniorease.nl/uitleg/veiligheid

**Week 2 — Foto's**  
> Wazige foto's? Meestal helpt één ding: licht op uw onderwerp. Vijf rustige tips + video: seniorease.nl/uitleg/fotos-maken

**Week 3 — Videobellen**  
> Uw kleinkind zien én horen — via WhatsApp, gratis met wifi. Stap voor stap: seniorease.nl/uitleg/videobellen

**Week 4 — Google Maps**  
> De weg kwijt? Google Maps legt het rustig uit. seniorease.nl/uitleg/google-maps

---

## LinkedIn

Het bestaande plan (`contentplan/linkedin-postplan.md`) is Engels / building in public. Optioneel later: korte post over "shipped 4 Dutch explainer videos for seniors" met link in eerste comment naar seniorease.nl — niet verplicht voor deze campagne.

---

## Checklist na elke week

- [ ] Facebook-groep: post geplaatst (tekst uit `facebook-groepen-berichten.md`)
- [ ] Nieuwsbrief: automatisch verstuurd (Brevo cron `/api/nieuwsbrief-weektip`)
- [ ] YouTube: video staat in playlist **Instructievideo's** / **Tips & Tricks**
- [ ] Site: embed werkt op uitlegpagina
- [ ] Reacties in groepen beantwoorden (vriendelijk, geen verkooppraat)
