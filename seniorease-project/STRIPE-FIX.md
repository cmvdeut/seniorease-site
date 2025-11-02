# 🔧 Stripe Success Pagina Fix

## Probleem
Na betaling zie je alleen "Bedankt voor je betaling" van Stripe, niet onze custom success pagina.

## Oplossing: Stripe Success URL configureren

### Stap 1: Stripe Dashboard
1. Ga naar [Stripe Dashboard](https://dashboard.stripe.com)
2. Zorg dat je in **TEST MODE** bent (toggle rechtsboven) voor testen
3. Ga naar **Products** → **Payment Links**
4. Klik op je Payment Link: `cNi3co3yC45O70b4NM6c000`
5. Klik op **Settings** (⚙️) of "Instellingen"

### Stap 2: Success URL instellen
1. Scroll naar beneden naar **After payment**
2. Bij **Success page URL** vul in:
   ```
   https://seniorease-site.vercel.app/betalen/success
   ```
   (Vervang `seniorease-site.vercel.app` met jouw echte Vercel URL)
   
3. Bij **Cancel page URL** (optioneel):
   ```
   https://seniorease-site.vercel.app/betalen
   ```

4. Klik **Save** of "Opslaan"

### Stap 3: Test
1. Doe een nieuwe testbetaling
2. Na betaling zou je nu naar `/betalen/success` moeten gaan
3. Je ziet licentie code en installatie-instructies

## Alternatieve oplossing (als Stripe config niet werkt)
Na betaling op Stripe, ga handmatig naar:
```
https://jouw-vercel-url.vercel.app/betalen/success
```

De licentie wordt dan automatisch geactiveerd als je dezelfde browser gebruikt (sessionStorage wordt gebruikt).

## Belangrijk
- De Success URL moet **exact** overeenkomen (inclusief `https://`)
- Test eerst in Test Mode voordat je naar Live Mode gaat
- Voor Live Mode: herhaal de stappen en gebruik je productie URL

