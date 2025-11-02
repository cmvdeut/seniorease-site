# 📝 Strato.nl DNS Configuratie - Stap voor Stap

## ✅ DNS Records die je nodig hebt (uit Vercel):

**Voor `seniorease.nl` (root domain):**
- **Type**: A
- **Name**: @
- **Value**: 216.198.79.1

**Voor `www.seniorease.nl`:**
- Kijk ook even bij "Edit" voor www - waarschijnlijk een CNAME record nodig

---

## 🔧 Stap 1: Log In bij Strato

1. Ga naar **[https://www.strato.nl](https://www.strato.nl)**
2. Klik op **"Inloggen"** (rechtsboven)
3. Log in met je Strato account gegevens

---

## 🔧 Stap 2: Ga naar DNS Beheer

### 2.1 Vind je Domain
1. In je Strato dashboard, klik op **"Domains"** of **"Domainbeheer"**
2. Zoek naar **`seniorease.nl`** in de lijst
3. Klik op **`seniorease.nl`**

### 2.2 Open DNS Instellingen
1. Zoek naar **"DNS beheer"**, **"DNS-Einstellungen"** of **"DNS Settings"**
2. Klik hierop om de DNS records te bekijken

---

## ➕ Stap 3: Voeg A Record Toe voor Root Domain

### 3.1 Zoek A Records Sectie
1. In DNS beheer, scroll naar de sectie **"A Records"** of **"A-Einträge"**
2. Kijk of er al een A record is voor `@` (root domain)
   - **Als die er is**: Je moet deze aanpassen
   - **Als die er niet is**: Je moet een nieuwe toevoegen

### 3.2 Toevoegen/Bewerken A Record
1. Klik op **"Toevoegen"**, **"Hinzufügen"** of **"Edit"** (afhankelijk van Strato interface)
2. Vul in:
   - **Hostname/Naam**: `@` OF laat **leeg** (beide betekenen root domain)
   - **IP-adres/Waarde**: `216.198.79.1` (exact zoals hier!)
   - **TTL**: Laat standaard staan (meestal 3600) of kies "Auto"
3. Klik **"Opslaan"** of **"Speichern"**

---

## ➕ Stap 4: Controleer www Subdomain

### 4.1 Check Vercel voor www Record
1. Ga terug naar Vercel → Settings → Domains
2. Klik op **"Edit"** bij `www.seniorease.nl`
3. Kijk welke DNS record daar staat (waarschijnlijk CNAME)

### 4.2 Voeg CNAME Toe in Strato
1. In Strato DNS beheer, zoek naar **"CNAME Records"**
2. Klik op **"Toevoegen"**
3. Vul in:
   - **Hostname/Naam**: `www`
   - **Waarde**: [het CNAME record uit Vercel]
   - **TTL**: Laat standaard staan
4. Klik **"Opslaan"**

---

## ⚠️ Belangrijk bij Strato

### Let Op:
- **`@` of leeg**: Beide betekenen root domain (`seniorease.nl`)
- **Exacte waarde**: Gebruik precies `216.198.79.1` (geen spaties)
- **Verwijder oude records**: Als er oude A records staan die niet kloppen, verwijder die eerst
- **TTL**: Laat standaard staan, verander dit niet tenzij je weet wat je doet

---

## ✅ Stap 5: Verificatie

### 5.1 In Vercel
1. Wacht 5-10 minuten na het opslaan in Strato
2. Ga naar Vercel → Settings → Domains
3. Klik op **"Refresh"** bij `seniorease.nl`
4. Status zou moeten veranderen:
   - Van: 🔴 **Invalid Configuration**
   - Naar: 🟢 **Valid Configuration**

### 5.2 Online Test
Test of DNS werkt:
1. Ga naar [dnschecker.org](https://dnschecker.org)
2. Voer in: `seniorease.nl`
3. Check of de A record het IP `216.198.79.1` toont

---

## 🆘 Problemen

### "Invalid Configuration" blijft
- Check of de waarde exact `216.198.79.1` is (geen spaties)
- Check of je `@` hebt gebruikt (of leeg gelaten voor root)
- Wacht langer (DNS kan tot 24 uur duren, meestal 1-2 uur)

### Ik zie DNS beheer niet
- Mogelijk heet het "DNS-Einstellungen" (Duits)
- Of "DNS Settings" (Engels)
- Zoek in je Strato dashboard naar "DNS" of "Einstellungen"

### www werkt niet
- Check of je CNAME record hebt toegevoegd voor `www`
- Check Vercel voor het juiste CNAME waarde

---

## 📋 Checklist

- [ ] A record toegevoegd voor `@` met waarde `216.198.79.1`
- [ ] CNAME record toegevoegd voor `www` (met waarde uit Vercel)
- [ ] Records opgeslagen in Strato
- [ ] 5-10 minuten gewacht
- [ ] Refresh geklikt in Vercel
- [ ] Status veranderd naar "Valid Configuration"

---

**Start nu met Stap 1 en voeg de A record toe in Strato!** 🚀

