# Stripe — lesmateriaal bestellen

Online bestellen werkt via **3 Stripe Payment Links** (niet per pakket A–G apart).

| Product | Prijs | Env-variabele |
|---------|-------|---------------|
| Themapakket (4 lessen) | €19,95 | `NEXT_PUBLIC_STRIPE_LESMATERIAAL_PAKKET` |
| Losse les | €6,95 | `NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS` |
| Compleet organisatie (A–G) | €149 | `NEXT_PUBLIC_STRIPE_LESMATERIAAL_COMPLEET` |

Legacy fallback pakket: `NEXT_PUBLIC_STRIPE_LESMATERIAAL_DEFAULT` (zelfde als PAKKET).

## 1. Payment Links aanmaken (Stripe Dashboard)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → **Producten** → **Payment Links**
2. Maak **3 links** aan (eenmalige betaling):

### Link 1 — Themapakket €19,95
- Naam: `SeniorEase lesmateriaal — themapakket`
- Prijs: **€19,95**

### Link 2 — Losse les €6,95
- Naam: `SeniorEase lesmateriaal — losse les`
- Prijs: **€6,95**

### Link 3 — Organisatie compleet €149
- Naam: `SeniorEase lesmateriaal — organisatie compleet A–G`
- Prijs: **€149,00**

Voor alle drie:
- Betaalmethoden: iDEAL, creditcard, Bancontact
- **After payment** → Success page URL:
  ```
  https://seniorease.nl/lesmateriaal/bedankt
  ```
  (lokaal testen: `http://localhost:3001/lesmateriaal/bedankt`)

## 2. Environment variables

In `.env.local` (en Vercel → Environment Variables):

```env
NEXT_PUBLIC_STRIPE_LESMATERIAAL_PAKKET=https://buy.stripe.com/test_xxxxx
NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS=https://buy.stripe.com/test_xxxxx
NEXT_PUBLIC_STRIPE_LESMATERIAAL_COMPLEET=https://buy.stripe.com/test_xxxxx
```

Herstart `npm run dev` na toevoegen.

## 3. Waar op de site

| Pagina | Knoppen |
|--------|---------|
| `/lesmateriaal/pakket-*` | Heel pakket €19,95 + losse les €6,95 (met leskeuze) |
| `/lesmateriaal` (organisatiesectie) | Compleet €149 |

Zolang env-vars leeg zijn: amber melding “binnenkort geactiveerd”.

## 4. Na betaling

- Klant ziet `/lesmateriaal/bedankt`
- Stripe stuurt bevestiging; **u** stuurt PDF-download per e-mail (handmatig tot webhook/automation)
- `client_reference_id` in Stripe (voor fulfillment):

| Type | Formaat | Voorbeeld |
|------|---------|-----------|
| Pakket | `pakket\|{slug}\|{email}` | `pakket\|pakket-g\|bib@gemeente.nl` |
| Losse les | `los\|{lescode}\|{email}` | `los\|g1\|bib@gemeente.nl` |
| Compleet | `compleet\|org\|{email}` | `compleet\|org\|bib@gemeente.nl` |

Lescode = hoofdletter + cijfer (A1, G4, …). Site stuurt lowercase; u kunt in Stripe hetzelfde lezen.

## 5. Checklist samen invullen

- [ ] 3 Payment Links in Stripe (testmodus eerst)
- [ ] URLs in `.env.local` plakken
- [ ] `npm run dev` herstarten
- [ ] Testbestelling per producttype
- [ ] Live links + env op Vercel bij go-live
