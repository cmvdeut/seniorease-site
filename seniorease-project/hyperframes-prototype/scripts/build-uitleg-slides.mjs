/**
 * Genereert tekst-slide HTML-composities (oplichting-sjabloon).
 * node scripts/build-uitleg-slides.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'compositions');

const VIDEOS = [
  {
    id: 'online-bankieren',
    subtitle: 'Veilig online bankieren',
    sitePath: 'seniorease.nl/uitleg/online-bankieren',
    learn: [
      'Bankadres zelf typen — niet klikken in berichten',
      'Alleen inloggen via uw echte bank',
      'Saldo en afschrijvingen even controleren',
    ],
    steps: [
      {
        badge: 'Stap 1',
        title: 'Typ het bankadres zelf',
        points: [
          'Ga naar ing.nl, rabobank.nl of abnamro.nl',
          'Typ het adres zelf in de browser',
          'Klik niet op links in e-mail of sms',
        ],
      },
      {
        badge: 'Stap 2',
        title: 'Inloggen zoals u kent',
        points: [
          'Paslezer, bank-app of code — volg uw bank',
          'Alleen op het scherm van uw eigen bank',
          'Nooit instructies van een beller of WhatsApp',
        ],
      },
      {
        badge: 'Stap 3',
        title: 'Controleer uw afschrijvingen',
        points: [
          'Kijk of u herkenbare betalingen ziet',
          'Kleine vreemde bedragen? Noteer de datum',
          'Twijfelt u? Bel uw bank via het nummer op uw pas',
        ],
      },
      {
        badge: 'Let op',
        title: 'iDEAL: controleer vóór u betaalt',
        points: [
          'Controleer bedrag en ontvanger',
          'Onbekend bedrijf? Stop even',
          'Vraag gerust hulp aan iemand die u vertrouwt',
        ],
      },
    ],
  },
  {
    id: 'veilig-wachtwoord',
    subtitle: 'Veilig wachtwoord maken',
    sitePath: 'seniorease.nl/uitleg/wachtwoorden',
    learn: [
      'Wat een sterk wachtwoord is',
      'Hoe u er één onthoudt',
      'Waarom u niet overal hetzelfde gebruikt',
    ],
    steps: [
      {
        badge: 'Tip 1',
        title: 'Lang is sterker dan kort',
        points: [
          'Liever een zin van 4 woorden dan “Welkom01”',
          'Bijvoorbeeld: KoffieTuinFietsBlauw',
          'Geen geboortedatum of huisdiernaam alleen',
        ],
      },
      {
        badge: 'Tip 2',
        title: 'Niet overal hetzelfde',
        points: [
          'Als één account gelekt raakt, blijven de anderen veilig',
          'Bank en e-mail: altijd uniek',
          'Schrijf ze op in een notitieboekje thuis — of vraag hulp',
        ],
      },
      {
        badge: 'Tip 3',
        title: 'Nooit doorgeven',
        points: [
          'Uw bank vraagt nooit om uw wachtwoord via telefoon',
          'Ook niet “om te controleren”',
          'Twijfelt u? Hang op en bel zelf terug',
        ],
      },
      {
        badge: 'Tip 4',
        title: 'Bij vastlopen',
        points: [
          'Gebruik “wachtwoord vergeten” op de echte site',
          'Typ het webadres zelf — klik niet in een mail',
          'Meer uitleg op seniorease.nl',
        ],
      },
    ],
  },
  {
    id: 'email-bijlage',
    subtitle: 'E-mailbijlage openen',
    sitePath: 'seniorease.nl/uitleg/email-bijlage',
    learn: [
      'Wat een bijlage is',
      'Hoe u die veilig opent',
      'Wanneer u beter niet klikt',
    ],
    steps: [
      {
        badge: 'Stap 1',
        title: 'Open de e-mail van iemand die u kent',
        points: [
          'Kijk wie de afzender is',
          'Verwacht u deze bijlage?',
          'Onbekend + druk? Liever niet openen',
        ],
      },
      {
        badge: 'Stap 2',
        title: 'Tik of klik op de bijlage',
        points: [
          'Vaak een papierclip of bestandsnaam onderaan',
          'PDF, foto of Word — dat komt vaak voor',
          'Uw telefoon of computer opent het bestand',
        ],
      },
      {
        badge: 'Stap 3',
        title: 'Opslaan als u wilt bewaren',
        points: [
          'Kies Opslaan of Delen → Bestanden',
          'Zo vindt u het later terug',
          'Ziet het er anders uit? Dat kan per app',
        ],
      },
      {
        badge: 'Let op',
        title: 'Verdachte bijlage?',
        points: [
          '“.exe” of rare namen: niet openen',
          'Vraag eerst aan de afzender',
          'Bij twijfel: Digi-Hulplijn 0800 1508',
        ],
      },
    ],
  },
  {
    id: 'letters-groter-telefoon',
    subtitle: 'Letters groter op telefoon',
    sitePath: 'seniorease.nl/digitale-hulp/letters-groter-maken-telefoon',
    learn: [
      'Tekst groter maken in Instellingen',
      'Werkt op iPhone én Android',
      'Meteen zichtbaar resultaat',
    ],
    steps: [
      {
        badge: 'iPhone',
        title: 'Tekstgrootte aanpassen',
        points: [
          'Open Instellingen → Scherm en helderheid',
          'Tik op Tekstgrootte',
          'Schuif naar rechts tot het prettig leest',
        ],
      },
      {
        badge: 'Android',
        title: 'Lettergrootte aanpassen',
        points: [
          'Open Instellingen → Scherm (of Display)',
          'Zoek Lettergrootte of Tekstgrootte',
          'Kies Groter of schuif naar rechts',
        ],
      },
      {
        badge: 'Extra',
        title: 'Nog groter nodig?',
        points: [
          'Sommige telefoons hebben “Vette tekst”',
          'Of “Toegankelijkheid” → grotere weergave',
          'Ziet het er anders uit? Vraag de helper',
        ],
      },
      {
        badge: 'Klaar',
        title: 'Controleer',
        points: [
          'Open WhatsApp of berichten — leest het beter?',
          'Te groot? Schuif iets terug',
          'Meer tips op seniorease.nl',
        ],
      },
    ],
  },
  {
    id: 'apps-installeren',
    subtitle: 'Een app installeren',
    sitePath: 'seniorease.nl/digitale-hulp/apps-installeren',
    learn: [
      'App Store of Play Store openen',
      'Zoeken en installeren',
      'De app terugvinden op het startscherm',
    ],
    steps: [
      {
        badge: 'Stap 1',
        title: 'Open de winkel-app',
        points: [
          'iPhone: App Store (blauwe A)',
          'Android: Play Store (driehoekje)',
          'Alleen deze winkels — geen rare links',
        ],
      },
      {
        badge: 'Stap 2',
        title: 'Zoek de app',
        points: [
          'Tik op Zoeken',
          'Typ de naam, bijv. WhatsApp',
          'Kies de app van de bekende maker',
        ],
      },
      {
        badge: 'Stap 3',
        title: 'Tik op Installeren / Haal',
        points: [
          'Wacht tot de download klaar is',
          'Soms vraagt uw telefoon om Face ID of pincode',
          'Dat is normaal — het is uw eigen toestel',
        ],
      },
      {
        badge: 'Stap 4',
        title: 'Open de app',
        points: [
          'Tik op Openen, of zoek het icoon op het startscherm',
          'Niet gevonden? Veeg door de pagina’s',
          'Meer rustige uitleg op seniorease.nl',
        ],
      },
    ],
  },
];

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(v) {
  const stepCount = v.steps.length;
  const totalSlides = 2 + stepCount; // learn + steps + more help
  // Timing: intro 3, learn 6, steps 7 each, help 6, outro 5
  const introDur = 3;
  const learnDur = 6;
  const stepDur = 7;
  const helpDur = 6;
  const outroDur = 5;
  const helpStart = introDur + learnDur + stepCount * stepDur;
  const outroStart = helpStart + helpDur;
  const total = outroStart + outroDur;

  let t = introDur;
  const learnStart = t;
  t += learnDur;

  const stepBlocks = v.steps.map((step, i) => {
    const start = t;
    t += stepDur;
    const n = i + 2;
    const sid = i + 2;
    return { start, n, sid, step };
  });

  const helpSlideNum = totalSlides;

  let slidesHtml = '';
  // Learn slide
  slidesHtml += `
      <div class="clip slide" data-start="${learnStart}" data-duration="${learnDur}" data-track-index="0">
        <img class="slide-watermark" src="assets/heart-logo.png" alt="" />
        <div class="slide-counter">1 / ${totalSlides}</div>
        <div class="slide-layout">
          <div class="slide-left full">
            <div id="s1-title" class="slide-title full">Wat gaan we leren?</div>
            <div class="points">
              ${v.learn
                .map(
                  (p, i) =>
                    `<div id="s1-p${i}" class="point"><div class="point-dot"></div><div class="point-text full">${esc(p)}</div></div>`,
                )
                .join('\n              ')}
            </div>
          </div>
        </div>
      </div>`;

  for (const { start, n, sid, step } of stepBlocks) {
    slidesHtml += `
      <div class="clip slide" data-start="${start}" data-duration="${stepDur}" data-track-index="0">
        <img class="slide-watermark" src="assets/heart-logo.png" alt="" />
        <div class="slide-counter">${n} / ${totalSlides}</div>
        <div class="slide-layout">
          <div class="slide-left full">
            <div id="s${sid}-badge" class="alert-badge">${esc(step.badge)}</div>
            <div id="s${sid}-title" class="slide-title full">${esc(step.title)}</div>
            <div class="points">
              ${step.points
                .map(
                  (p, i) =>
                    `<div id="s${sid}-p${i}" class="point"><div class="point-dot"></div><div class="point-text full">${esc(p)}</div></div>`,
                )
                .join('\n              ')}
            </div>
          </div>
        </div>
      </div>`;
  }

  slidesHtml += `
      <div class="clip slide" data-start="${helpStart}" data-duration="${helpDur}" data-track-index="0">
        <img class="slide-watermark" src="assets/heart-logo.png" alt="" />
        <div class="slide-counter">${helpSlideNum} / ${totalSlides}</div>
        <div class="slide-layout">
          <div class="slide-left full">
            <div id="sHelp-title" class="slide-title full">Meer hulp nodig?</div>
            <div class="points">
              <div id="sHelp-p0" class="point"><div class="point-dot"></div><div class="point-text full">Uitgebreide uitleg op seniorease.nl</div></div>
              <div id="sHelp-p1" class="point"><div class="point-dot"></div><div class="point-text full">Gratis, in begrijpelijke taal</div></div>
              <div id="sHelp-p2" class="point"><div class="point-dot"></div><div class="point-text full">${esc(v.sitePath)}</div></div>
            </div>
          </div>
        </div>
      </div>`;

  let scriptParts = `
      hfAddIntro(tl, "#intro-logo", "#intro-title-wrap");

      hfAddTitle(tl, "#s1-title", ${learnStart});
      ${v.learn.map((_, i) => `hfAddPoint(tl, "#s1-p${i}", ${learnStart}, ${i});`).join('\n      ')}
`;

  for (const { start, sid } of stepBlocks) {
    scriptParts += `
      hfAddBadge(tl, "#s${sid}-badge", ${start});
      hfAddTitle(tl, "#s${sid}-title", ${start});
      hfAddPoint(tl, "#s${sid}-p0", ${start}, 0);
      hfAddPoint(tl, "#s${sid}-p1", ${start}, 1);
      hfAddPoint(tl, "#s${sid}-p2", ${start}, 2);
`;
  }

  scriptParts += `
      hfAddTitle(tl, "#sHelp-title", ${helpStart});
      hfAddPoint(tl, "#sHelp-p0", ${helpStart}, 0);
      hfAddPoint(tl, "#sHelp-p1", ${helpStart}, 1);
      hfAddPoint(tl, "#sHelp-p2", ${helpStart}, 2);

      hfAddOutro(tl, "#outro-inner", "#outro-buttons", ${outroStart});
`;

  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <link rel="stylesheet" href="compositions/shared.css" />
    <script src="assets/vendor/gsap.min.js"></script>
    <script src="compositions/shared-timeline.js"></script>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="${v.id}"
      data-start="0"
      data-duration="${total}"
      data-fps="30"
      data-width="1920"
      data-height="1080"
    >
      <div class="clip intro" data-start="0" data-duration="${introDur}" data-track-index="0">
        <img id="intro-logo" class="intro-logo" src="assets/heart-logo.png" alt="" />
        <div id="intro-title-wrap" class="intro-title-wrap">
          <div class="intro-brand">SeniorEase</div>
          <div class="intro-subtitle">${esc(v.subtitle)}</div>
        </div>
      </div>
${slidesHtml}
      <div class="clip outro" data-start="${outroStart}" data-duration="${outroDur}" data-track-index="0">
        <div id="outro-inner" class="outro-inner">
          <img class="outro-logo" src="assets/heart-logo.png" alt="" />
          <div class="outro-domain">seniorease.nl</div>
          <div class="outro-tagline">Technologie zonder gedoe</div>
          <div id="outro-buttons" class="outro-buttons">
            <div class="outro-btn like">👍 Like</div>
            <div class="outro-btn subscribe">🔔 Abonneer</div>
          </div>
        </div>
      </div>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
${scriptParts}
      window.__timelines["${v.id}"] = tl;
    </script>
  </body>
</html>
`;
}

mkdirSync(outDir, { recursive: true });
for (const v of VIDEOS) {
  const path = join(outDir, `${v.id}.html`);
  writeFileSync(path, buildHtml(v), 'utf8');
  console.log('Wrote', path);
}
console.log('Done', VIDEOS.length);
