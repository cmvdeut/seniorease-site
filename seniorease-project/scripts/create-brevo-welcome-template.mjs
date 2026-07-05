import fs from 'fs';

const mcp = JSON.parse(fs.readFileSync('C:/Users/cmvde/.cursor/mcp.json', 'utf8'));
const key = mcp.mcpServers.brevo.headers.Authorization.replace('Bearer ', '');

const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EEE6;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5EEE6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
<tr><td style="background:#8B5E3C;padding:28px 32px;text-align:center;">
<h1 style="margin:0;color:#fff;font-size:28px;font-weight:bold;">SeniorEase</h1>
<p style="margin:8px 0 0;color:#F5EEE6;font-size:16px;">Digitale hulp voor senioren</p>
</td></tr>
<tr><td style="padding:32px;color:#333;font-size:18px;line-height:1.6;">
<p style="margin:0 0 16px;">Beste lezer,</p>
<p style="margin:0 0 16px;">Bedankt voor uw aanmelding. Vanaf nu ontvangt u <strong>elke week één praktische digitale tip</strong> — over WhatsApp, veilig internet, uw telefoon en meer.</p>
<p style="margin:0 0 24px;">Geen spam. Altijd opzegbaar via de link onderaan elke e-mail.</p>
<p style="margin:0 0 24px;text-align:center;">
<a href="https://www.seniorease.nl/digitale-hulp" style="display:inline-block;background:#8B5E3C;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:18px;font-weight:bold;">Bekijk alle uitleg</a>
</p>
<p style="margin:0 0 8px;">Met vriendelijke groet,</p>
<p style="margin:0;font-weight:bold;">Het SeniorEase-team</p>
</td></tr>
<tr><td style="padding:20px 32px;background:#FAFAFA;color:#666;font-size:14px;line-height:1.5;text-align:center;">
<p style="margin:0;">SeniorEase · <a href="https://www.seniorease.nl" style="color:#8B5E3C;">seniorease.nl</a></p>
<p style="margin:8px 0 0;">U ontvangt deze mail omdat u zich heeft aangemeld voor onze nieuwsbrief.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

const response = await fetch('https://api.brevo.com/v3/smtp/templates', {
  method: 'POST',
  headers: {
    'api-key': key,
    'content-type': 'application/json',
    accept: 'application/json',
  },
  body: JSON.stringify({
    templateName: 'Nieuwsbrief welkom - SeniorEase NL',
    subject: 'Welkom! Uw wekelijkse digitale tip van SeniorEase',
    sender: { name: 'SeniorEase', email: 'support@seniorease.eu' },
    htmlContent: html,
    isActive: true,
    tag: 'nieuwsbrief-welkom',
  }),
});

const data = await response.json();
console.log(JSON.stringify({ status: response.status, data }, null, 2));
