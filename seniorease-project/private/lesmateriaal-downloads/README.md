# Private lesmateriaal-downloads

Deze map is **niet** publiek bereikbaar via de website. Downloads gaan alleen via
`/api/lesmateriaal/download?token=…` na een geldige Stripe-betaling.

## Sync

Na het bouwen van PDF’s:

```bash
npm run sync:lesmateriaal-downloads
```

Bron: `lesmateriaal/<pakket>/<les>/pdf/` en `beamer/`.  
Doel: `private/lesmateriaal-downloads/<slug>/<code>-print.pdf` en `-beamer.pdf`.

**Versie:** catalogus A–G = **v2**.  
Sync kiest `*-v2.pdf` als die bestaat; anders tijdelijk `*-v1.pdf` (tot herbouw).  
Nooit v1 als v2 naast elkaar staat. Live A + B + C1 leveren al v2.
## Productie (Vercel)

- Zorg dat gesyncte PDF’s in de deploy zitten (of later Blob/R2).
- Zet `LESMATERIAAL_DOWNLOAD_SECRET` (lang willekeurig geheim).
