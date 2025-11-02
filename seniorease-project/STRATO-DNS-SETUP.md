# 🌐 Strato.nl DNS Configuratie voor Vercel

Gids voor het configureren van DNS records bij Strato.nl voor `seniorease.nl`.

## 📍 Stap 1: DNS Records Ophalen in Vercel

### In Vercel Dashboard:
1. Ga naar je project → **Settings** → **Domains**
2. Klik op **"Edit"** bij `seniorease.nl`
3. Vercel toont de DNS records die je nodig hebt

**Meestal zijn dit:**
- **Voor root domain (`seniorease.nl`)**:
  - Type: **A** record met een IP adres (bijv. `76.76.21.21`)
  - OF Type: **CNAME** met een waarde (bijv. `cname.vercel-dns.com`)

- **Voor www (`www.seniorease.nl`)**:
  - Type: **CNAME**
  - Waarde: Meestal `cname.vercel-dns.com` of iets vergelijkbaars

**📋 Kopieer deze exacte waarden - je hebt ze nodig in stap 2!**

---

## 🔧 Stap 2: DNS Records Toevoegen in Strato.nl

### 2.1 Log In bij Strato
1. Ga naar **[https://www.strato.nl](https://www.strato.nl)**
2. Klik op **"Inloggen"** (rechtsboven)
3. Log in met je Strato account

### 2.2 Ga naar Domain Beheer
1. In je dashboard, klik op **"Domains"** of **"Domainbeheer"**
2. Zoek en klik op **`seniorease.nl`**
3. Klik op **"DNS beheer"** of **"DNS-Einstellungen"**

### 2.3 Configureer DNS Records

#### Option A: Als Vercel een A Record vraagt voor root domain

**Voor `seniorease.nl` (root domain):**
1. Zoek naar de sectie **"A Records"** of **"A-Einträge"**
2. Klik op **"Toevoegen"** of **"Hinzufügen"**
3. Vul in:
   - **Naam/Hostname**: `@` of laat **leeg** (voor root domain)
   - **Waarde/IP**: [het IP adres dat Vercel geeft, bijv. `76.76.21.21`]
   - **TTL**: Laat standaard staan (meestal 3600 of Auto)
4. Klik **"Opslaan"** of **"Speichern"**

**Voor `www.seniorease.nl`:**
1. Zoek naar de sectie **"CNAME Records"**
2. Klik op **"Toevoegen"**
3. Vul in:
   - **Naam/Hostname**: `www`
   - **Waarde**: [het CNAME dat Vercel geeft, bijv. `cname.vercel-dns.com`]
   - **TTL**: Laat standaard staan
4. Klik **"Opslaan"**

#### Option B: Als Vercel een CNAME vraagt voor root domain

**Sommige DNS providers (zoals Strato) ondersteunen CNAME voor root niet altijd.**
**In dat geval:**
1. Gebruik de **A record** methode (zie Option A)
2. OF vraag Vercel om de A record IP (klik op "Edit" en zoek naar A record optie)

---

## ⚠️ Belangrijke Opmerkingen voor Strato

### Mogelijke Problemen:

1. **Strato heeft soms standaard records**
   - Verwijder oude A records voor `@` als die er zijn
   - Verwijder oude CNAME records voor `www` als die er zijn
   - Maar: **WEES VOORZICHTIG** - verwijder alleen records die je zelf hebt toegevoegd

2. **Strato interface kan verschillen**
   - Nederlandse versie: "DNS beheer"
   - Duitse versie: "DNS-Einstellungen"
   - Beide werken hetzelfde

3. **TTL (Time To Live)**
   - Laat standaard staan (meestal 3600 seconden = 1 uur)
   - Of kies "Auto" als dat een optie is

---

## ✅ Stap 3: Verificatie

### In Vercel:
1. Wacht 5-10 minuten na het toevoegen van records
2. Ga terug naar Vercel → Settings → Domains
3. Klik op **"Refresh"** bij `seniorease.nl`
4. Klik op **"Refresh"** bij `www.seniorease.nl`
5. Status zou moeten veranderen:
   - Van: 🔴 **Invalid Configuration**
   - Naar: 🟢 **Valid Configuration**

### Online Test:
Test of DNS actief is:
- Ga naar [dnschecker.org](https://dnschecker.org)
- Voer `seniorease.nl` in
- Check of de A record het juiste IP toont

---

## 📝 Voorbeeld Configuratie

### Wat je waarschijnlijk ziet in Strato:

**Voor `seniorease.nl` (root):**
```
Type: A
Hostname: @ (of leeg)
Waarde: 76.76.21.21 (voorbeeld - gebruik Vercel waarde)
TTL: 3600
```

**Voor `www.seniorease.nl`:**
```
Type: CNAME
Hostname: www
Waarde: cname.vercel-dns.com (voorbeeld - gebruik Vercel waarde)
TTL: 3600
```

---

## 🆘 Problemen Oplossen

### Probleem: "Invalid Configuration" blijft
**Oplossing:**
1. Check of records **exact** overeenkomen met Vercel
2. Voor root domain: gebruik `@` of laat **leeg**
3. Wacht langer (tot 24 uur voor volledige propagatie)
4. Check met dnschecker.org of records live zijn

### Probleem: Ik zie DNS beheer niet in Strato
**Oplossing:**
1. Check of je ingelogd bent bij het juiste account
2. Controleer of je de juiste domain hebt geselecteerd
3. Mogelijk heet het "DNS-Einstellungen" (Duits) of "DNS Settings"
4. Contacteer Strato support als je het niet kunt vinden

### Probleem: CNAME voor root domain niet mogelijk
**Oplossing:**
1. Gebruik de **A record** optie
2. In Vercel, klik op "Edit" en kijk naar A record optie
3. Gebruik het IP adres dat Vercel geeft voor A record

---

## ⏱️ Tijdlijn

- **Direct**: DNS records zijn opgeslagen bij Strato
- **5-10 minuten**: Eerste DNS propagatie
- **30 minuten - 2 uur**: Meeste DNS servers wereldwijd bijgewerkt
- **24-48 uur**: Volledige propagatie (meestal binnen 24 uur)

**Na DNS propagatie:**
- **1-2 uur**: Vercel activeert automatisch SSL certificaat
- **Totaal**: Meestal binnen 2-3 uur volledig werkend

---

## 💡 Tips

- **Test beide domains**: Zorg dat zowel `seniorease.nl` als `www.seniorease.nl` werken
- **Redirect**: Je hebt al een 307 redirect ingesteld (goed!)
- **SSL**: Vercel activeert HTTPS automatisch zodra DNS klopt
- **Monitoring**: Vercel toont live status van DNS configuratie

---

## 📞 Hulp Nodig?

Als je er niet uitkomt:
1. Klik op **"Edit"** bij het domain in Vercel
2. Screenshot maaken van de DNS records die Vercel toont
3. Screenshot van je Strato DNS beheer scherm
4. Dan kan ik preciezer helpen!

---

**Start nu met Stap 1: haal de DNS records op in Vercel en voeg ze toe bij Strato!** 🚀

