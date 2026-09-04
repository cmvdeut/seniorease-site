import { getBrevoApiKeyCandidates } from '@/lib/brevo';
import {
  buildDownloadUrl,
  createDownloadToken,
  getSiteBaseUrl,
  zipBundleLabel,
  zipFileIdForOrder,
  type FulfillmentOrder,
} from '@/lib/lesmateriaal-fulfillment';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSender() {
  return {
    email: process.env.BREVO_SENDER_EMAIL?.trim() || 'info@seniorease.nl',
    name: process.env.BREVO_SENDER_NAME?.trim() || 'SeniorEase',
  };
}

export async function sendLesmateriaalFulfillmentEmail(params: {
  order: FulfillmentOrder;
  orderId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { order, orderId } = params;
  const apiKeys = getBrevoApiKeyCandidates();
  if (apiKeys.length === 0) {
    return { ok: false, error: 'BREVO_API_KEY ontbreekt' };
  }

  const baseUrl = getSiteBaseUrl();
  const links: { label: string; url: string; primary?: boolean }[] = [];

  const zipId = zipFileIdForOrder(order);
  if (zipId) {
    const token = createDownloadToken({
      fileId: zipId,
      orderId,
      email: order.email,
    });
    links.push({
      label: zipBundleLabel(zipId),
      url: buildDownloadUrl(baseUrl, token),
      primary: true,
    });
  }

  for (const asset of order.assets) {
    const token = createDownloadToken({
      fileId: asset.fileId,
      orderId,
      email: order.email,
    });
    links.push({
      label: asset.label,
      url: buildDownloadUrl(baseUrl, token),
    });
  }

  const primary = links.find((l) => l.primary);
  const rest = links.filter((l) => !l.primary);

  const primaryHtml = primary
    ? `<p style="margin:0 0 16px;"><a href="${escapeHtml(primary.url)}" style="display:inline-block;background:#c49a4a;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">${escapeHtml(primary.label)}</a></p>
    <p style="margin:0 0 12px;line-height:1.5;font-size:14px;color:#5a6570;">Liever losse PDF’s? Die staan hieronder.</p>`
    : '';

  const linkHtml = rest
    .map(
      (l) =>
        `<li style="margin:0 0 10px;"><a href="${escapeHtml(l.url)}" style="color:#1a365d;font-weight:600;">${escapeHtml(l.label)}</a></li>`,
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="nl">
<body style="font-family:Georgia,serif;background:#f7f4ef;color:#1a365d;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #e8e2d8;">
    <p style="margin:0 0 8px;color:#c49a4a;font-size:14px;letter-spacing:0.04em;">SENIOREASE</p>
    <h1 style="margin:0 0 16px;font-size:22px;">Uw lesmateriaal is klaar</h1>
    <p style="margin:0 0 12px;line-height:1.5;">Bedankt voor uw bestelling van <strong>${escapeHtml(order.label)}</strong>.</p>
    <p style="margin:0 0 16px;line-height:1.5;">Downloadlinks werken ongeveer <strong>7 dagen</strong>. Sla de bestanden op uw computer op.</p>
    ${primaryHtml}
    ${rest.length > 0 ? `<ul style="padding-left:18px;margin:0 0 20px;">${linkHtml}</ul>` : ''}
    <p style="margin:0 0 12px;line-height:1.5;font-size:14px;color:#5a6570;">Komt een link niet open? Controleer uw map ongewenste e-mail, of mail <a href="mailto:info@seniorease.nl">info@seniorease.nl</a>.</p>
    <p style="margin:0;font-size:14px;color:#5a6570;">Heeft u een <strong>officiële factuur</strong> nodig op naam van uw organisatie? Laat het ons weten — het Stripe-betalingsbewijs is geen formele factuur.</p>
  </div>
</body>
</html>`.trim();

  const textLines = [
    'SeniorEase — Uw lesmateriaal is klaar',
    '',
    `Bestelling: ${order.label}`,
    '',
    'Downloadlinks (geldig ±7 dagen):',
    ...links.map((l) => `- ${l.label}: ${l.url}`),
    '',
    'Vragen of factuur nodig? info@seniorease.nl',
  ];

  const payload = {
    sender: getSender(),
    to: [{ email: order.email }],
    subject: `SeniorEase lesmateriaal — ${order.label}`,
    htmlContent: html,
    textContent: textLines.join('\n'),
  };

  let lastError = '';
  for (const apiKey of apiKeys) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true };
    const body = await response.text().catch(() => '');
    lastError = `Brevo ${response.status}: ${body.slice(0, 200)}`;
    console.error('Lesmateriaal fulfillment mail failed:', lastError);
  }

  return { ok: false, error: lastError || 'Brevo verzenden mislukt' };
}
