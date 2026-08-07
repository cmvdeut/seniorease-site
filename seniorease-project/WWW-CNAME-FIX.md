# CNAME voor www.seniorease.nl (Vercel)

Hosting loopt via **Vercel**. Zet in Strato geen oude hosting-CNAME meer.

## Nieuwe waarde uit Vercel

1. Vercel Dashboard → project → **Settings** → **Domains**
2. **Edit** bij `www.seniorease.nl`
3. Kopieer de CNAME-waarde (vaak `cname.vercel-dns.com`, of de exacte waarde die Vercel toont)
4. In Strato DNS: veld **Waarde** → die Vercel-CNAME → **Opslaan**

## Checklist

- [ ] Vercel CNAME gekopieerd
- [ ] Strato `www` wijst naar Vercel (niet naar een andere host)
- [ ] A-record voor root (`@`) volgens Vercel/Strato-instructies
- [ ] https://www.seniorease.nl bereikbaar
