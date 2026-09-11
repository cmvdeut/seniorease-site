# Stripe — lesmateriaal bestellen + automatische PDF-levering



Online bestellen werkt via **3 Stripe Payment Links** (niet per pakket A–G apart).

Na betaling: **webhook** → **Brevo-mail met beveiligde downloadlinks** + download op de bedanktpagina.



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

- **After payment** → Success page URL (met sessie-id):

  ```

  https://www.seniorease.nl/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}

  ```

  (lokaal: `http://localhost:3001/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}`)



In Stripe: gebruik de placeholder `{CHECKOUT_SESSION_ID}` letterlijk; Stripe vult die in.



## 2. Environment variables



In `.env.local` (en Vercel → Environment Variables):



```env

NEXT_PUBLIC_STRIPE_LESMATERIAAL_PAKKET=https://buy.stripe.com/...

NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS=https://buy.stripe.com/...

NEXT_PUBLIC_STRIPE_LESMATERIAAL_COMPLEET=https://buy.stripe.com/...



STRIPE_SECRET_KEY=sk_test_...          # of sk_live_...

STRIPE_WEBHOOK_SECRET=whsec_...



LESMATERIAAL_DOWNLOAD_SECRET=          # lang willekeurig geheim (openssl rand -hex 32)

NEXT_PUBLIC_SITE_URL=https://www.seniorease.nl



BREVO_API_KEY=xkeysib-...

BREVO_SENDER_EMAIL=info@seniorease.nl

BREVO_SENDER_NAME=SeniorEase

```



Herstart `npm run dev` na toevoegen.



## 3. Webhook



1. Stripe Dashboard → **Developers** → **Webhooks** → Add endpoint  

2. URL: `https://www.seniorease.nl/api/stripe-webhook`  

3. Event: `checkout.session.completed`  

4. Kopieer signing secret → `STRIPE_WEBHOOK_SECRET`



Lokaal testen:



```bash

stripe listen --forward-to localhost:3001/api/stripe-webhook

```



## 4. PDF’s klaarzetten voor download



```bash

npm run sync:lesmateriaal-downloads

```



Kopieert print- + beamer-PDF’s naar `private/lesmateriaal-downloads/`.  

Bij `npm run build` gebeurt dit automatisch (prebuild).



## 5. Fulfillment-flow



1. Klant betaalt Payment Link (`client_reference_id`: zie tabel hieronder).

2. Stripe stuurt `checkout.session.completed` → `/api/stripe-webhook`.

3. Server stuurt Brevo-mail met signed links (TTL ±7 dagen).

4. Klant landt op `/lesmateriaal/bedankt?session_id=…` → optioneel dezelfde downloads.



| Type | Formaat | Voorbeeld |

|------|---------|-----------|

| Pakket | `pakket_{slug}` | `pakket_pakket-g` |

| Losse les | `los_{lescode}` | `los_g1` |

| Compleet | `compleet_org` | `compleet_org` |



Alleen letters, cijfers, `-` en `_` (Stripe dropt `|` / `@` / `.` stil). E-mail komt uit de Checkout-sessie (`prefilled_email`).



Code: [`lib/lesmateriaal-fulfillment.ts`](lib/lesmateriaal-fulfillment.ts), mail: [`lib/lesmateriaal-fulfillment-email.ts`](lib/lesmateriaal-fulfillment-email.ts).



## 6. Factuur (op verzoek)



Organisaties die een **officiële factuur** willen: template in [`docs/factuur/`](docs/factuur/).  

Stripe-bewijs ≠ factuur.



## 7. Checklist



- [ ] 3 Payment Links + success URL met `{CHECKOUT_SESSION_ID}`

- [ ] Env-vars lokaal + Vercel (secret key, webhook secret, download secret, Brevo)

- [ ] Webhook endpoint live

- [ ] `npm run sync:lesmateriaal-downloads` (of build) — PDF’s aanwezig

- [ ] Testbestelling per producttype (testmodus)

- [ ] Live links bij go-live


