# SEO/AEO Lesmateriaal — Build Sprint 2

**Status:** **DEPLOYED & FROZEN** 🔒  
**Datum:** 14 september 2026  
**Bron-audit:** `contentplan/gsc/seo-aeo-lesmateriaal-audit-v1.md` (GOEDGEKEURD)  
**Final copy:** GOEDGEKEURD  
**Baseline:** 14 september 2026

| Release | Waarde |
|---------|--------|
| **Sprint build commit** | `af340a0585a6f55673f358e32f65b45123acd0c9` |
| **Final corrections commit** | `5300e4e954f12fdb81d9b510397fcb97193def90` |
| **Commit message (final)** | fix: finalize SEO/AEO lesmateriaal FAQ and Pakket H meta copy |
| **Deployment ID (final)** | `dpl_B5uqhVZy2mpdKbNTWKLqVtuq81wQ` |
| **Deployment URL** | https://seniorease-site-73g6ecp4j-cmvdeut-gmailcoms-projects.vercel.app |
| **Deployment status** | ● **Ready** (Production) |
| **Aliases** | `https://www.seniorease.nl`, `https://seniorease.nl`, … |
| **Productie-URL** | https://www.seniorease.nl |

---

## Final copy (GOEDGEKEURD)

### Hub FAQ (final corrections)

**FAQ 2 — Kan een vrijwilliger de lessen geven?**  
Ja. Het materiaal is gemaakt voor begeleiders en vrijwilligers die geen IT-docent zijn. U volgt het draaiboek stap voor stap. Daarin staat wat u laat zien, wat deelnemers zelf doen en wanneer u verdergaat.

**FAQ 3 — Moet de begeleider technisch deskundig zijn?**  
Nee. U hoeft geen IT-docent te zijn. Het draaiboek leidt u stap voor stap door de les. Ziet een scherm er anders uit? Dat is normaal. Waar beschikbaar is er ook extra hulp bij vastlopen.

**FAQ 5 — Mag ik het lesmateriaal printen voor deelnemers?**  
Ja, binnen de gebruikslicentie. Bij een themapakket of losse les: voor eigen gebruik of één lesgroep (bijv. met familie, vrienden of een kleine groep op locatie). Bij het organisatiepakket (€ 149,00): gebruik op één locatie voor meerdere lesgroepen; printen voor deelnemers op die locatie is toegestaan.  
*(Aligned met `lesmateriaal-licentie.ts` — geen nieuwe rechten.)*

### Pakket H meta (final)

> AI-lesmateriaal waarmee uw organisatie zelf een praktische AI-workshop voor senioren kan geven. Met Gemini als praktisch voorbeeld; ook toepasbaar bij andere AI-assistenten. Vier lessen, €19,95.

SERP-lengte ~194 tekens (truncatie mogelijk); betekenis goedgekeurd.

---

## Scope-check (hard)

| Check | Resultaat |
|-------|-----------|
| routes / redirects / canonicals | **NEE** |
| prijzen / lesmateriaal-data | **NEE** |
| checkout / Stripe / Brevo / fulfillment | **NEE** |
| PDF / lesinhoud | **NEE** |
| QAPage | **NEE** |
| CTR Sprint 1 onverwacht gewijzigd | **NEE** |
| TypeScript | **PASS** |
| FAQ zichtbaar ↔ schema | **PASS** |

---

## Changed-files (final corrections commit `5300e4e9`)

```
seniorease-project/app/lesmateriaal/LesmateriaalFaq.tsx
seniorease-project/app/lesmateriaal/lesmateriaal-seo-overrides.ts
seniorease-project/contentplan/gsc/seo-aeo-lesmateriaal-sprint-2-deploy.md
```

`git diff --stat` (commit):

```
3 files changed, 41 insertions(+), 94 deletions(-)
```

*(Eerdere sprint-build: 11 files, `af340a05` — hub/C/D/E/H + bruggen + overrides.)*

---

## Productie-smoke (14 sep 2026, post-final-deploy)

| URL | HTTP | Title | Meta | H1 | Opening | Canonical | Extra |
|-----|------|-------|------|----|---------|-----------|-------|
| `/lesmateriaal` | **200** | OK | OK | OK | OK | self | 6 AEO-FAQ · FAQPage · geen QAPage · geen “kijken → doen → controleren” |
| `/lesmateriaal/pakket-c` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 · C1–C4 |
| `/lesmateriaal/pakket-d` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 · D1–D4 |
| `/lesmateriaal/pakket-e` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 · E1–E4 |
| `/lesmateriaal/pakket-h-ai` | **200** | OK | OK (Gemini praktisch voorbeeld) | OK | OK | self | Product/Offer · €19,95 · H1–H4 |

**Resultaat:** ALL PASS

---

## Bruglink-smoke

| Bron → doel | Resultaat |
|-------------|-----------|
| whatsapp-uitleg-beginners → pakket-c | **PASS** |
| whatsapp-videobellen-uitleg → pakket-c | **PASS** |
| /uitleg/veiligheid → pakket-d | **PASS** |
| phishing-herkennen → pakket-d | **PASS** |
| /uitleg/digid → pakket-e | **PASS** |
| /wat-is-ai → pakket-h-ai | **PASS** |
| wat-is-ai-simpel-uitgelegd → pakket-h-ai | **PASS** |

---

## CTR Sprint 1 — FREEZE GATE

Geen inhoudelijke wijziging in Sprint 2 (build of final corrections) aan:

- `/uitleg/google-maps`
- `/digitale-hulp/whatsapp-fotos-opslaan`
- `/uitleg/wifi`
- `/uitleg/whatsapp-basis`

Live bereikbaar **200** na final deploy.

**CTR SPRINT 1 — BASELINE LOCKED & BEVROREN 🔒**  
GSC-check: 12 oktober 2026.

---

## Testresultaten

| Test | Resultaat |
|------|-----------|
| `tsc --noEmit` | PASS |
| Productie-smoke 5 URLs | PASS |
| Bruglink-smoke 7 | PASS |
| Freeze gate | PASS |

## Afwijkingen

geen

---

SEO/AEO LESMATERIAAL — SPRINT 2 DEPLOYED & FROZEN 🔒

Baseline: 14 september 2026

CTR Sprint 1 blijft afzonderlijk bevroren tot GSC-check 12 oktober 2026.
