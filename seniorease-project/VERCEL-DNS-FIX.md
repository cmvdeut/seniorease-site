# 🔧 Vercel DNS Configuration Fix - Invalid Configuration

Je ziet "Invalid Configuration" voor beide domains. Dit betekent dat de DNS records niet correct zijn geconfigureerd.

## 📍 Stap 1: Vind de DNS Records in Vercel

### In Vercel Dashboard:
1. Je ziet `seniorease.nl` en `www.seniorease.nl` beide met rood waarschuwingsicoon
2. Klik op **"Learn more"** naast "Invalid Configuration"
3. Of klik op **"Edit"** bij een van de domains

### Vercel toont dan de DNS records die je nodig hebt:
- Voor `seniorease.nl` (root): Meestal een **A record** of **CNAME**
- Voor `www.seniorease.nl`: Meestal een **CNAME record**

**📋 Kopieer deze exacte records!**

---

## 🔧 Stap 2: DNS Records Configureren bij Domain Provider

Waar heb je `seniorease.nl` geregistreerd?

### Veelvoorkomende Providers:

#### **TransIP**
1. Log in bij TransIP
2. Ga naar **Mijn Producten** → **Domains**
3. Klik op `seniorease.nl`
4. Ga naar **DNS**
5. Verwijder oude records (als die er zijn)
6. Voeg nieuwe records toe:
   - **Voor root domain (`@`)**:
     - Type: A (of CNAME zoals Vercel aangeeft)
     - Naam: `@` of leeg laten
     - Waarde: [het IP/CNAME dat Vercel geeft]
   
   - **Voor www**:
     - Type: CNAME
     - Naam: `www`
     - Waarde: [het CNAME dat Vercel geeft, bijv. `cname.vercel-dns.com`]

7. Sla op

#### **Openprovider / Mijndomein.nl**
1. Log in bij je provider
2. Ga naar **DNS Beheer** of **DNS Management**
3. Voeg de records toe zoals hierboven
4. Sla op

#### **Andere Provider**
Gebruik dezelfde principes:
- Voeg A record toe voor root domain (`@`)
- Voeg CNAME toe voor `www`

---

## ⏱️ Stap 3: Wachten op DNS Propagatie

Na het toevoegen van de records:
1. Wacht 5-10 minuten
2. Klik op **"Refresh"** bij het domain in Vercel
3. Status zou moeten veranderen van "Invalid Configuration" naar "Valid Configuration"

**DNS propagatie kan duren:**
- Minimaal: 5-10 minuten
- Meestal: 30 minuten - 2 uur
- Maximaal: 48 uur (meestal binnen 24 uur)

---

## ✅ Stap 4: Verificatie

### In Vercel:
1. Klik op **"Refresh"** bij beide domains
2. Status zou moeten veranderen:
   - Van: 🔴 **Invalid Configuration**
   - Naar: 🟢 **Valid Configuration** (zoals bij `seniorease-site.vercel.app`)

### Online Test:
Test of DNS actief is:
- [dnschecker.org](https://dnschecker.org) - voer `seniorease.nl` in
- Check of de records kloppen met wat Vercel verwacht

---

## 🆘 Als het niet werkt

### Probleem: Status blijft "Invalid Configuration"
**Mogelijke oorzaken:**
1. DNS records zijn niet exact zoals Vercel aangeeft
   - Check spelling, hoofdletters, punten
   - A record moet exact IP zijn
   - CNAME moet exact de waarde zijn die Vercel geeft

2. DNS propagatie duurt langer
   - Wacht nog wat langer (tot 24 uur)
   - Check met dnschecker.org of records live zijn

3. Verkeerde domain provider
   - Zorg dat je bij de juiste provider bent
   - Check wie je domain registrar is

### Probleem: Ik zie de DNS records niet in Vercel
**Oplossing:**
1. Klik op **"Edit"** bij `seniorease.nl`
2. Of klik op **"Learn more"** bij "Invalid Configuration"
3. Vercel toont altijd de benodigde records

---

## 💡 Tips

- **Redirect zichtbaar**: Je hebt al een 307 redirect van `seniorease.nl` → `www.seniorease.nl`
  - Dit is goed! Beide moeten wel "Valid" worden

- **Beide domains configureren**: 
  - Configureer DNS voor **beide** domains
  - `seniorease.nl` (root)
  - `www.seniorease.nl` (www)

- **SSL Certificaat**: 
  - Wordt automatisch door Vercel aangemaakt zodra DNS klopt
  - Duurt meestal 1-2 uur na DNS propagatie

---

## 📞 Hulp Nodig?

Vertel me:
1. Bij welke provider heb je `seniorease.nl` geregistreerd?
2. Welke DNS records zie je wanneer je op "Edit" klikt bij het domain in Vercel?
3. Heb je al DNS records toegevoegd bij je provider?

Dan kan ik je preciezer helpen! 🚀

