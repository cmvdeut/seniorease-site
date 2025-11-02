# 💳 Stripe Payment Link Setup

Deze gids legt uit hoe je de Stripe Payment Link configureert voor automatische licentie activering.

## 🔧 Stap 1: Configureer Success URL in Stripe Dashboard

1. Ga naar je [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigeer naar **Products** → **Payment Links**
3. Klik op je Payment Link: `https://buy.stripe.com/cNi3co3yC45O70b4NM6c000`
4. Ga naar **Settings** (Instellingen)
5. Zoek naar **After payment** sectie
6. Stel de **Success page URL** in op:
   ```
   https://jouw-domein.nl/betalen/success
   ```
   (Vervang `jouw-domein.nl` met je echte domein, bijv. `seniorease-site.vercel.app`)

## 📝 Stap 2: Optioneel - Webhook Setup (voor automatische verificatie)

Voor extra beveiliging kun je een webhook configureren:

1. Ga naar **Developers** → **Webhooks** in Stripe Dashboard
2. Klik op **Add endpoint**
3. Endpoint URL:
   ```
   https://jouw-domein.nl/api/stripe-webhook
   ```
4. Selecteer events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Kopieer de **Signing secret** en voeg toe aan je environment variables (optioneel)

## ✅ Hoe het werkt

1. Gebruiker klikt op "Betaal € 2,99" op `/betalen`
2. Email wordt tijdelijk opgeslagen in `sessionStorage`
3. Gebruiker wordt doorgestuurd naar Stripe Payment Link
4. Na succesvolle betaling → redirect naar `/betalen/success`
5. Success pagina:
   - Haalt email op uit `sessionStorage`
   - Genereert unieke licentie code
   - Slaat licentie op in `localStorage`
   - Toont licentie code en link naar bibliotheek

## 🔒 Beveiliging

- **Client-side licentie**: Wordt opgeslagen in browser `localStorage`
- **Per apparaat**: Elke licentie werkt alleen op het apparaat waar betaald is
- **Webhook verificatie**: In productie moet je Stripe signatures verifiëren (zie `app/api/stripe-webhook/route.ts`)

## 🧪 Testen

### Test Mode
Gebruik Stripe test mode met test credit cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Productie
Zorg dat je Payment Link op **Live mode** staat voor echte betalingen.

---

**Let op**: De success URL moet exact overeenkomen met je live domein. Test eerst met Vercel preview URL voordat je naar productie gaat.

