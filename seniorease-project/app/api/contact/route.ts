import { NextRequest, NextResponse } from 'next/server';
import { getBrevoApiKeyCandidates } from '@/lib/brevo';

const SUBJECT_LABELS: Record<string, string> = {
  algemeen: 'Algemene vraag',
  technisch: 'Technische support',
  licentie: 'Vraag over licentie',
  bug: 'Bug melding',
  suggestie: 'Suggestie',
  anders: 'Anders',
};

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
  const email =
    process.env.BREVO_SENDER_EMAIL?.trim() || 'support@seniorease.eu';
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

    const { name, email, subject, message } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json(
        { success: false, error: 'Naam is verplicht' },
        { status: 400 }
      );
    }

    if (!email || !String(email).trim()) {
      return NextResponse.json(
        { success: false, error: 'E-mailadres is verplicht' },
        { status: 400 }
      );
    }

    const emailTrimmed = String(email).trim();
    if (!emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    if (!subject || !String(subject).trim()) {
      return NextResponse.json(
        { success: false, error: 'Onderwerp is verplicht' },
        { status: 400 }
      );
    }

    if (!message || !String(message).trim() || String(message).trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Bericht moet minimaal 10 tekens bevatten' },
        { status: 400 }
      );
    }

    const nameTrimmed = String(name).trim();
    const subjectKey = String(subject).trim();
    const subjectLabel = SUBJECT_LABELS[subjectKey] || subjectKey;
    const messageTrimmed = String(message).trim();
    const sender = getContactSender();
    const inbox = getContactInbox();

    const apiKeys = getBrevoApiKeyCandidates();
    if (apiKeys.length === 0) {
      console.error('Contact form: BREVO_API_KEY ontbreekt');
      return NextResponse.json(
        {
          success: false,
          error:
            'E-mailverzending is tijdelijk niet beschikbaar. Mail ons gerust via info@seniorease.nl.',
        },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(nameTrimmed);
    const safeEmail = escapeHtml(emailTrimmed);
    const safeSubject = escapeHtml(subjectLabel);
    const safeMessage = escapeHtml(messageTrimmed).replace(/\n/g, '<br>');

    let lastError: { status: number; body: unknown } | null = null;
    let sent = false;

    for (const apiKey of apiKeys) {
      // 1) Notificatie naar SeniorEase (antwoorden gaat naar de bezoeker)
      const notify = await sendBrevoEmail(apiKey, {
        sender,
        to: [{ email: inbox, name: 'SeniorEase' }],
        replyTo: { email: emailTrimmed, name: nameTrimmed },
        subject: `Contactformulier: ${subjectLabel}`,
        htmlContent: `
          <h2>Nieuw bericht via seniorease.nl</h2>
          <p><strong>Naam:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Onderwerp:</strong> ${safeSubject}</p>
          <p><strong>Bericht:</strong></p>
          <p>${safeMessage}</p>
        `,
        tags: ['contact-form'],
      });

      if (!notify.ok) {
        lastError = { status: notify.status, body: notify.body };
        console.error('Brevo contact-notificatie mislukt:', notify.status, notify.body);
        continue;
      }

      // 2) Bevestiging naar de bezoeker — inclusief hun bericht
      const confirm = await sendBrevoEmail(apiKey, {
        sender,
        to: [{ email: emailTrimmed, name: nameTrimmed }],
        replyTo: { email: inbox, name: 'SeniorEase' },
        subject: 'Wij hebben uw bericht ontvangen — SeniorEase',
        htmlContent: `
          <p>Beste ${safeName},</p>
          <p>Bedankt voor uw bericht. Wij hebben het ontvangen en reageren zo spoedig mogelijk
          (meestal binnen 1–2 werkdagen).</p>
          <p><strong>Uw onderwerp:</strong> ${safeSubject}</p>
          <p><strong>Uw bericht:</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #8B5E3C;padding-left:12px;margin:12px 0;">${safeMessage}</p>
          <p>Met vriendelijke groet,<br>SeniorEase</p>
        `,
        textContent: [
          `Beste ${nameTrimmed},`,
          '',
          'Bedankt voor uw bericht. Wij hebben het ontvangen en reageren zo spoedig mogelijk (meestal binnen 1–2 werkdagen).',
          '',
          `Uw onderwerp: ${subjectLabel}`,
          '',
          'Uw bericht:',
          messageTrimmed,
          '',
          'Met vriendelijke groet,',
          'SeniorEase',
        ].join('\n'),
        tags: ['contact-confirmation'],
      });

      if (!confirm.ok) {
        // Notificatie is al verstuurd — geen harde fout voor de bezoeker
        console.error('Brevo bevestigingsmail mislukt:', confirm.status, confirm.body);
      }

      sent = true;
      break;
    }

    if (!sent) {
      console.error('Contact form: alle Brevo-keys faalden', lastError);
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
      message: 'Contact formulier verzonden',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
