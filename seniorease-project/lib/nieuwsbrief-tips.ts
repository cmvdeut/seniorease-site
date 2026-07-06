export interface NieuwsbriefTip {
  slug: string;
  subject: string;
  previewText: string;
  title: string;
  intro: string;
  bullets: string[];
  ctaLabel: string;
  ctaUrl: string;
  /** Optioneel: link naar instructievideo op YouTube */
  videoUrl?: string;
  videoLabel?: string;
}

/** Eerste verzenddag: maandag 7 juli 2026, 09:00 NL-tijd */
export const NIEUWSBRIEF_START_DATE = '2026-07-07';

export const nieuwsbriefTips: NieuwsbriefTip[] = [
  {
    slug: 'googelen-google-zoeken',
    subject: 'Tip van de week: zoekt u iets op via Google?',
    previewText: 'Google openen, zoeken en betrouwbare resultaten herkennen.',
    title: 'Googelen — zo zoekt u iets op',
    intro:
      'Wilt u iets opzoeken op internet? Via Google vindt u antwoorden op bijna elke vraag. Het is makkelijker dan u denkt.',
    bullets: [
      'Open uw browser en ga naar google.nl',
      'Typ uw vraag in het zoekvak en druk op Enter',
      'Klik op een resultaat met een bekende naam (bijv. overheid.nl of seniorease.nl)',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/googelen-google-zoeken',
  },
  {
    slug: 'whatsapp-uitleg-beginners',
    subject: 'Tip van de week: WhatsApp voor beginners',
    previewText: 'Berichten en foto\'s sturen met WhatsApp — stap voor stap.',
    title: 'WhatsApp — de eerste stappen',
    intro:
      'Met WhatsApp stuurt u gratis berichten en foto\'s naar familie en vrienden. U heeft alleen internet nodig.',
    bullets: [
      'Zoek het groene WhatsApp-icoon op uw telefoon',
      'Tik op een contact om een gesprek te openen',
      'Typ uw bericht onderaan en druk op het verzend-pijltje',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners',
  },
  {
    slug: 'phishing-herkennen',
    subject: 'Tip van de week: herkent u een nepbericht?',
    previewText: 'Zo beschermt u zich tegen oplichting per telefoon of app.',
    title: 'Oplichting herkennen',
    intro:
      'Soms krijgt u een bericht dat van uw bank lijkt te komen, maar dat is het niet. Dit heet phishing. Wie de signalen kent, trapt er minder snel in.',
    bullets: [
      'Let op: wordt u onder druk gezet om snel te handelen?',
      'Banken vragen nooit per SMS of WhatsApp om uw pincode',
      'Twijfelt u? Bel de organisatie via het nummer op hun officiële website',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/uitleg/veiligheid',
    videoUrl: 'https://www.youtube.com/watch?v=uprzSjDAeUg',
    videoLabel: 'Bekijk de uitlegvideo (±1 minuut)',
  },
  {
    slug: 'wifi-werkt-niet-oplossen',
    subject: 'Tip van de week: wifi werkt niet — wat nu?',
    previewText: 'Eenvoudige stappen als internet op uw telefoon uitvalt.',
    title: 'Wifi werkt niet — oplossen',
    intro:
      'Geen internet op uw telefoon of tablet? Meestal is het snel opgelost met een paar simpele stappen.',
    bullets: [
      'Zet wifi even uit en weer aan in de instellingen',
      'Start uw telefoon opnieuw op',
      'Loop dichter bij uw router of modem',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/wifi-werkt-niet-oplossen',
  },
  {
    slug: 'letters-groter-maken-telefoon',
    subject: 'Tip van de week: letters groter op uw telefoon',
    previewText: 'Zo leest u tekst makkelijker op uw scherm.',
    title: 'Letters groter maken',
    intro:
      'Tekst te klein op uw telefoon? U kunt de letters groter zetten — dat helpt uw ogen enorm.',
    bullets: [
      'Ga naar Instellingen → Beeldscherm (of Toegankelijkheid)',
      'Zoek Lettergrootte of Tekstgrootte',
      'Schuif de balk naar rechts voor grotere letters',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/letters-groter-maken-telefoon',
  },
  {
    slug: 'google-maps',
    subject: 'Tip van de week: route plannen met Google Maps',
    previewText: 'Zo vindt u de weg naar een adres of winkel.',
    title: 'Google Maps — de weg vinden',
    intro:
      'Met Google Maps vindt u elk adres. Handig als u ergens naartoe moet en de weg niet meer weet.',
    bullets: [
      'Open de Google Maps-app (of ga naar maps.google.nl)',
      'Typ het adres in het zoekvak',
      'Tik op Route en kies Auto, Lopen of Openbaar vervoer',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/uitleg/google-maps',
    videoUrl: 'https://www.youtube.com/watch?v=QYKisb9t5gg',
    videoLabel: 'Bekijk de uitlegvideo (±7 minuten)',
  },
  {
    slug: 'fotos-maken-telefoon',
    subject: 'Tip van de week: mooiere foto\'s met uw telefoon',
    previewText: 'Eén simpele tip voor scherpere, helderdere foto\'s.',
    title: 'Foto\'s maken — licht op uw onderwerp',
    intro:
      'Veel foto\'s zijn wazig of te donker. Vaak komt dat door iets kleins dat u kunt oplossen. De belangrijkste tip: zorg dat het licht op wat u fotografeert schijnt.',
    bullets: [
      'Sta bij een raam — fotografeer met het licht vóór u, niet achter u',
      'Houd de telefoon stil: twee handen, ellebogen dicht bij uw lichaam',
      'Tik op het scherm waar u scherp wilt hebben, vóór u de foto maakt',
    ],
    ctaLabel: 'Bekijk alle 5 fototips',
    ctaUrl: 'https://www.seniorease.nl/uitleg/fotos-maken',
    videoUrl: 'https://www.youtube.com/watch?v=4yEKPemRm6U',
    videoLabel: 'Bekijk de uitlegvideo op YouTube',
  },
  {
    slug: 'videobellen-whatsapp',
    subject: 'Tip van de week: uw kleinkind zien terwijl u belt',
    previewText: 'Videobellen via WhatsApp — rustig uitgelegd.',
    title: 'Videobellen met familie',
    intro:
      'Bij videobellen ziet u de ander op uw scherm — handig als familie ver weg woont. Via WhatsApp is het gratis, zolang u wifi heeft.',
    bullets: [
      'Open WhatsApp en tik op het gesprek met de persoon die u wilt bellen',
      'Tik rechtsboven op het camera-icoontje',
      'Zit bij een raam voor goed licht op uw gezicht',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/uitleg/videobellen',
    videoUrl: 'https://www.youtube.com/watch?v=hxIVYqSSflU',
    videoLabel: 'Bekijk de uitlegvideo op YouTube',
  },
  {
    slug: 'veilig-wachtwoord-maken',
    subject: 'Tip van de week: een veilig wachtwoord maken',
    previewText: 'Sterk én onthoudbaar — zo doet u dat.',
    title: 'Veilig wachtwoord maken',
    intro:
      'Een goed wachtwoord beschermt uw gegevens. Het hoeft niet ingewikkeld te zijn om veilig te zijn.',
    bullets: [
      'Gebruik minstens 12 tekens',
      'Combineer woorden die u kunt onthouden, bijv. "Koffie-Muziek-2026!"',
      'Gebruik nooit hetzelfde wachtwoord voor alles',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/veilig-wachtwoord-maken',
  },
  {
    slug: 'wat-is-ai-simpel-uitgelegd',
    subject: 'Tip van de week: wat is AI eigenlijk?',
    previewText: 'Kunstmatige intelligentie — simpel uitgelegd voor iedereen.',
    title: 'Wat is AI?',
    intro:
      'U hoort steeds vaker over AI. Maar wat is het precies? En gebruikt u het misschien al zonder het te weten?',
    bullets: [
      'AI is software die leert van veel voorbeelden',
      'Spraakassistenten (Siri, Google) gebruiken AI',
      'U kunt AI ook gebruiken om vragen te stellen, bijv. via ChatGPT',
    ],
    ctaLabel: 'Bekijk de volledige uitleg',
    ctaUrl: 'https://www.seniorease.nl/digitale-hulp/wat-is-ai-simpel-uitgelegd',
  },
];

export function getIsoWeekId(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function getTipIndexForDate(date = new Date()): number {
  const start = new Date(`${NIEUWSBRIEF_START_DATE}T00:00:00`);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksSinceStart = Math.floor((date.getTime() - start.getTime()) / msPerWeek);

  if (weeksSinceStart < 0) return 0;

  return weeksSinceStart % nieuwsbriefTips.length;
}

export function getTipForDate(date = new Date()): NieuwsbriefTip {
  return nieuwsbriefTips[getTipIndexForDate(date)];
}

export function buildNieuwsbriefTipHtml(tip: NieuwsbriefTip): string {
  const bullets = tip.bullets
    .map((item) => `<li style="margin-bottom:10px;">${item}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EEE6;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5EEE6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
<tr><td style="background:#8B5E3C;padding:28px 32px;text-align:center;">
<h1 style="margin:0;color:#fff;font-size:28px;font-weight:bold;">SeniorEase</h1>
<p style="margin:8px 0 0;color:#F5EEE6;font-size:16px;">Tip van de week</p>
</td></tr>
<tr><td style="padding:32px;color:#333;font-size:18px;line-height:1.6;">
<p style="margin:0 0 16px;">Beste lezer,</p>
<p style="margin:0 0 16px;font-size:22px;font-weight:bold;color:#8B5E3C;">${tip.title}</p>
<p style="margin:0 0 20px;">${tip.intro}</p>
<p style="margin:0 0 8px;font-weight:bold;">Drie handige stappen:</p>
<ol style="margin:0 0 24px;padding-left:24px;">${bullets}</ol>
${tip.videoUrl ? `<p style="margin:0 0 20px;text-align:center;"><a href="${tip.videoUrl}" style="color:#8B5E3C;font-size:17px;font-weight:bold;">▶ ${tip.videoLabel ?? 'Bekijk de uitlegvideo'}</a></p>` : ''}
<p style="margin:0 0 24px;text-align:center;">
<a href="${tip.ctaUrl}" style="display:inline-block;background:#8B5E3C;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:18px;font-weight:bold;">${tip.ctaLabel}</a>
</p>
<p style="margin:0 0 8px;">Met vriendelijke groet,</p>
<p style="margin:0;font-weight:bold;">Het SeniorEase-team</p>
</td></tr>
<tr><td style="padding:20px 32px;background:#FAFAFA;color:#666;font-size:14px;line-height:1.5;text-align:center;">
<p style="margin:0;">SeniorEase · <a href="https://www.seniorease.nl" style="color:#8B5E3C;">seniorease.nl</a></p>
<p style="margin:8px 0 0;">U ontvangt deze tip omdat u zich heeft aangemeld voor onze nieuwsbrief.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}
