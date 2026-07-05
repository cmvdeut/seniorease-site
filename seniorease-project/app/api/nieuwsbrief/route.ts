import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getBrevoApiKey(): string | undefined {
  const candidates = [
    process.env.BREVO_API_KEY,
    process.env.BREVO_KEY,
    process.env.SENDINBLUE_API_KEY,
  ];

  for (const value of candidates) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }

  return undefined;
}

function getBrevoWelcomeTemplateId(): number | undefined {
  const raw = process.env.BREVO_WELCOME_TEMPLATE_ID?.trim();
  if (!raw) return 13;

  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

async function sendWelcomeEmail(apiKey: string, email: string): Promise<void> {
  const templateId = getBrevoWelcomeTemplateId();
  if (!templateId) return;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      to: [{ email }],
      templateId,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    console.error('Brevo welkomstmail mislukt:', response.status, data);
  }
}

function getBrevoListId(): number | undefined {
  const raw = process.env.BREVO_LIST_ID?.trim();
  if (!raw) return undefined;

  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export async function GET() {
  const apiKey = getBrevoApiKey();
  const listId = getBrevoListId();

  return NextResponse.json({
    ok: Boolean(apiKey),
    brevoApiKey: apiKey ? 'configured' : 'missing',
    brevoListId: listId ? 'configured' : 'missing',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Ongeldig verzoek' },
        { status: 400 }
      );
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'E-mailadres is verplicht' },
        { status: 400 }
      );
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    const apiKey = getBrevoApiKey();
    if (!apiKey) {
      console.error('Brevo API key ontbreekt. Gecontroleerde variabelen: BREVO_API_KEY, BREVO_KEY, SENDINBLUE_API_KEY');
      return NextResponse.json(
        { success: false, error: 'Nieuwsbrief is tijdelijk niet beschikbaar. Probeer het later opnieuw.' },
        { status: 503 }
      );
    }

    const payload: {
      email: string;
      updateEnabled: boolean;
      listIds?: number[];
    } = {
      email,
      updateEnabled: true,
    };

    const listId = getBrevoListId();
    if (listId) {
      payload.listIds = [listId];
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201 || response.status === 204) {
      await sendWelcomeEmail(apiKey, email);
      return NextResponse.json({
        success: true,
        message: 'Aanmelding gelukt',
      });
    }

    const data = await response.json().catch(() => null);
    console.error('Brevo API fout:', response.status, data);

    return NextResponse.json(
      { success: false, error: 'Aanmelden mislukt. Controleer uw e-mailadres en probeer het opnieuw.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Nieuwsbrief API error:', error);
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    );
  }
}
