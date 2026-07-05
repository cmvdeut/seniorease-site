import fs from 'fs';

const mcp = JSON.parse(fs.readFileSync('C:/Users/cmvde/.cursor/mcp.json', 'utf8'));
const raw = mcp.mcpServers.brevo.headers.Authorization.replace('Bearer ', '');
const key = raw.startsWith('eyJ')
  ? JSON.parse(Buffer.from(raw, 'base64').toString()).api_key
  : raw;

const tip = {
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
};

const bullets = tip.bullets
  .map((item) => `<li style="margin-bottom:10px;">${item}</li>`)
  .join('');

const html = `<!DOCTYPE html><html lang="nl"><body style="margin:0;padding:24px;background:#F5EEE6;font-family:Georgia,serif;">
<table width="600" style="max-width:600px;background:#fff;border-radius:12px;margin:0 auto;padding:32px;color:#333;font-size:18px;line-height:1.6;">
<tr><td>
<h1 style="color:#8B5E3C;margin-top:0;">${tip.title}</h1>
<p>${tip.intro}</p>
<ol>${bullets}</ol>
<p style="text-align:center;"><a href="${tip.ctaUrl}" style="display:inline-block;background:#8B5E3C;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:bold;">${tip.ctaLabel}</a></p>
</td></tr></table></body></html>`;

const create = await fetch('https://api.brevo.com/v3/emailCampaigns', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': key,
    Accept: 'application/json',
  },
  body: JSON.stringify({
    name: `Weektip 2026-W27 — ${tip.title}`,
    subject: tip.subject,
    previewText: tip.previewText,
    sender: { name: 'SeniorEase', email: 'support@seniorease.eu' },
    htmlContent: html,
    recipients: { listIds: [7] },
  }),
});

const created = await create.json();
console.log('create', create.status, JSON.stringify(created, null, 2));

if (!create.ok) process.exit(1);

const send = await fetch(`https://api.brevo.com/v3/emailCampaigns/${created.id}/sendNow`, {
  method: 'POST',
  headers: { 'api-key': key, Accept: 'application/json' },
});

console.log('send', send.status, await send.text());
