import { NextRequest, NextResponse } from 'next/server';
import { getBrevoApiKeyCandidates } from '@/lib/brevo';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getContactInbox(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.CONTACT_INBOX?.trim() ||
    'info@seniorease.nl'
  );
}

function getContactSender() {
  const email = process.env.BREVO_SENDER_EMAIL?.trim() || 'info@seniorease.nl';
  const name = process.env.BREVO_SENDER_NAME?.trim() || 'SeniorEase';
  return { email, name };
}

async function sendBrevoEmail(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, body };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, message, source, pakketSlug, pakketCode, pakketTitle } = body;

    if (!message || !String(message).trim() || String(message).trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Bericht moet minimaal 10 tekens bevatten' },
        { status: 400 }
      );
    }

    const messageTrimmed = String(message).trim();
    const nameTrimmed = name ? String(name).trim() : '';
    const emailTrimmed = email ? String(email).trim() : '';
    const sourceKey = source === 'pakket' ? 'pakket' : 'hub';
    const slug = pakketSlug ? String(pakketSlug).trim() : '';
    const code = pakketCode ? String(pakketCode).trim() : '';
    const title = pakketTitle ? String(pakketTitle).trim() : '';

    if (emailTrimmed) {
      if (!emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
        return NextResponse.json(
          { success: false, error: 'Ongeldig e-mailadres' },
          { status: 400 }
        );
      }
    }

    const apiKeys = getBrevoApiKeyCandidates();
    if (apiKeys.length === 0) {
      console.error('Lesmateriaal feedback: BREVO_API_KEY ontbreekt');
      return NextResponse.json(
        {
          success: false,
          error:
            'E-mailverzending is tijdelijk niet beschikbaar. Mail ons gerust via info@seniorease.nl.',
        },
        { status: 503 }
      );
    }

    const sender = getContactSender();
    const inbox = getContactInbox();
    const displayName = nameTrimmed || 'Anonieme bezoeker';
    const bronLabel =
      sourceKey === 'pakket'
        ? `Pakketpagina${code ? ` ${code}` : ''}${title ? ` — ${title}` : ''}${slug ? ` (${slug})` : ''}`
        : 'Lesmateriaal-hub';

    const safeName = escapeHtml(displayName);
    const safeEmail = escapeHtml(emailTrimmed || '(niet opgegeven)');
    const safeBron = escapeHtml(bronLabel);
    const safeMessage = escapeHtml(messageTrimmed).replace(/\n/g, '<br>');

    let lastError: { status: number; body: unknown } | null = null;
    let sent = false;

    for (const apiKey of apiKeys) {
      const notifyPayload: Record<string, unknown> = {
        sender,
        to: [{ email: inbox, name: 'SeniorEase' }],
        subject: `Feedback lesmateriaal: ${bronLabel}`,
        htmlContent: `
          <h2>Nieuwe feedback over lesmateriaal</h2>
          <p><strong>Bron:</strong> ${safeBron}</p>
          <p><strong>Naam:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Bericht:</strong></p>
          <p>${safeMessage}</p>
        `,
        tags: ['lesmateriaal-feedback'],
      };

      if (emailTrimmed) {
        notifyPayload.replyTo = {
          email: emailTrimmed,
          name: nameTrimmed || emailTrimmed,
        };
      }

      const notify = await sendBrevoEmail(apiKey, notifyPayload);

      if (!notify.ok) {
        lastError = { status: notify.status, body: notify.body };
        console.error('Brevo feedback-notificatie mislukt:', notify.status, notify.body);
        continue;
      }

      if (emailTrimmed) {
        const confirm = await sendBrevoEmail(apiKey, {
          sender,
          to: [{ email: emailTrimmed, name: nameTrimmed || emailTrimmed }],
          replyTo: { email: inbox, name: 'SeniorEase' },
          subject: 'Bedankt voor uw reactie — SeniorEase',
          htmlContent: `
            <p>Beste ${escapeHtml(nameTrimmed || 'lezer')},</p>
            <p>Bedankt voor uw reactie. Uw idee helpt ons om SeniorEase beter te laten
            aansluiten bij wat deelnemers en begeleiders nodig hebben.</p>
            <p><strong>Uw bericht:</strong></p>
            <p style="white-space:pre-wrap;border-left:3px solid #8B5E3C;padding-left:12px;margin:12px 0;">${safeMessage}</p>
            <p>Met vriendelijke groet,<br>SeniorEase</p>
          `,
          textContent: [
            `Beste ${nameTrimmed || 'lezer'},`,
            '',
            'Bedankt voor uw reactie. Uw idee helpt ons om SeniorEase beter te laten aansluiten bij wat deelnemers en begeleiders nodig hebben.',
            '',
            'Uw bericht:',
            messageTrimmed,
            '',
            'Met vriendelijke groet,',
            'SeniorEase',
          ].join('\n'),
          tags: ['lesmateriaal-feedback-confirmation'],
        });

        if (!confirm.ok) {
          console.error('Brevo feedback-bevestiging mislukt:', confirm.status, confirm.body);
        }
      }

      sent = true;
      break;
    }

    if (!sent) {
      console.error('Lesmateriaal feedback: alle Brevo-keys faalden', lastError);
      return NextResponse.json(
        {
          success: false,
          error:
            'Uw bericht kon niet worden verzonden. Probeer het later opnieuw of mail naar info@seniorease.nl.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback verzonden',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Lesmateriaal feedback error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
