# HyperFrames — SeniorEase video's

HTML → MP4 voor YouTube-uitlegvideo's. Vervangt geleidelijk Remotion (`video-generator/`).

## Vereisten

- Node.js 18+
- **FFmpeg** op PATH ([ffmpeg.org](https://ffmpeg.org/download.html))

## Composities

| Bestand | Onderwerp | Duur |
|---------|-----------|------|
| `index.html` | WhatsApp foto's versturen | ~37s |
| `compositions/oplichting-herkennen.html` | Oplichting herkennen (5 signalen) | ~65s |

## Commando's

```bash
cd hyperframes-prototype
npm run dev              # preview in browser (index = WhatsApp foto's)
npm run check            # lint + validate + layout inspect
npm run render:whatsapp-fotos
npm run render:oplichting
npm run render             # beide MP4's naar out/
```

Output: `out/whatsapp-fotos.mp4`, `out/oplichting-herkennen.mp4`

## Assets

- `assets/heart-logo.png` — SeniorEase logo (van seniorease.nl)
- `assets/vendor/gsap.min.js` — lokaal (geen CDN; snellere/deterministische renders)

## Nieuwe video toevoegen

1. Kopieer `compositions/oplichting-herkennen.html` als sjabloon (tekst-only) of `index.html` (met phone mockup).
2. Pas slides, `data-duration` en GSAP-timeline aan.
3. Voeg script toe in `package.json`: `"render:mijn-video": "npx hyperframes render -c compositions/mijn-video.html -o out/mijn-video.mp4"`

## Upload naar YouTube

Handmatig via YouTube Studio, of via bestaande Blotato-flow. Link in beschrijving naar het bijbehorende artikel op seniorease.nl.

## Remotion → HyperFrames

Bestaande Remotion-scripts staan in `video-generator/src/scripts/`. HyperFrames heeft een migratie-skill: `npx skills add heygen-com/hyperframes` → `/remotion-to-hyperframes`.
