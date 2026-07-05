import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function normalizeBrevoApiKey(raw: string): string {
  let key = raw.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }

  if (key.toLowerCase().startsWith('bearer ')) {
    key = key.slice(7).trim();
  }

  if (key.startsWith('eyJ')) {
    try {
      const decoded = Buffer.from(key, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded) as { api_key?: string };
      if (parsed.api_key?.trim()) {
        key = parsed.api_key.trim();
      }
    } catch {
      // Gebruik originele waarde als base64-decode mislukt.
    }
  }

  return key;
}

function detectKeyFormat(raw: string | undefined, normalized: string): string {
  const value = raw?.trim() ?? '';
  if (!value) return 'empty';
  if (value.toLowerCase().startsWith('bearer ')) return 'bearer_prefix';
  if (value.startsWith('eyJ') && normalized.startsWith('xkeysib-')) return 'base64_wrapper_fixed';
  if (value.startsWith('eyJ')) return 'base64_invalid';
  if (normalized.startsWith('xkeysib-')) return 'brevo_xkeysib';
  if (normalized.startsWith('re_')) return 'resend_key';
  if (normalized.startsWith('xsmtpsib-')) return 'brevo_smtp_key';
  return 'unknown';
}

function getBrevoEnvDiagnostics() {
  const vars = [
    { name: 'BREVO_API_KEY', raw: process.env.BREVO_API_KEY },
    { name: 'BREVO_KEY', raw: process.env.BREVO_KEY },
    { name: 'SENDINBLUE_API_KEY', raw: process.env.SENDINBLUE_API_KEY },
  ];

  return vars.map(({ name, raw }) => {
    const trimmed = raw?.trim();
    const normalized = trimmed ? normalizeBrevoApiKey(trimmed) : '';
    return {
      name,
      set: Boolean(trimmed),
      format: detectKeyFormat(trimmed, normalized),
      length: normalized.length || undefined,
      fingerprint: normalized
        ? createHash('sha256').update(normalized).digest('hex').slice(0, 12)
        : undefined,
    };
  });
}

function getBrevoApiKeyCandidates(): string[] {
  const seen = new Set<string>();
  const candidates: string[] = [];

  for (const value of [
    process.env.BREVO_API_KEY,
    process.env.BREVO_KEY,
    process.env.SENDINBLUE_API_KEY,
  ]) {
    if (!value?.trim()) continue;

    const normalized = normalizeBrevoApiKey(value);
    if (!normalized || seen.has(normalized)) continue;

    seen.add(normalized);
    candidates.push(normalized);
  }

  return candidates;
}

async function verifyBrevoApiKey(apiKey: string): Promise<{ ok: boolean; status: number }> {
  try {
    const response = await fetch('https://api.brevo.com/v3/account', {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'api-key': apiKey,
      },
    });

    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

async function createBrevoContact(
  apiKey: string,
  email: string,
  listId?: number
): Promise<Response> {
  const payload: {
    email: string;
    updateEnabled: boolean;
    listIds?: number[];
  } = {
    email,
    updateEnabled: true,
  };

  if (listId) {
    payload.listIds = [listId];
  }

  return fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });
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
  const apiKeys = getBrevoApiKeyCandidates();
  const listId = getBrevoListId();
  let brevoConnection: 'ok' | 'auth_failed' | 'missing' = 'missing';
  let brevoAccountStatus: number | undefined;

  for (const apiKey of apiKeys) {
    const accountCheck = await verifyBrevoApiKey(apiKey);
    brevoAccountStatus = accountCheck.status;

    if (accountCheck.ok) {
      brevoConnection = 'ok';
      break;
    }

    brevoConnection = 'auth_failed';
  }

  return NextResponse.json({
    ok: brevoConnection === 'ok',
    brevoApiKey: apiKeys.length > 0 ? 'configured' : 'missing',
    brevoListId: listId ? 'configured' : 'missing',
    brevoConnection,
    brevoAccountStatus,
    envDiagnostics: getBrevoEnvDiagnostics(),
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

    const apiKeys = getBrevoApiKeyCandidates();
    if (apiKeys.length === 0) {
      console.error('Brevo API key ontbreekt. Gecontroleerde variabelen: BREVO_API_KEY, BREVO_KEY, SENDINBLUE_API_KEY');
      return NextResponse.json(
        { success: false, error: 'Nieuwsbrief is tijdelijk niet beschikbaar. Probeer het later opnieuw.' },
        { status: 503 }
      );
    }

    const listId = getBrevoListId();
    let response: Response | null = null;
    let apiKeyUsed: string | undefined;

    for (const apiKey of apiKeys) {
      response = await createBrevoContact(apiKey, email, listId);
      apiKeyUsed = apiKey;

      if (response.status === 401) {
        console.error('Brevo API key geweigerd bij contact-aanmaak');
        response = null;
        continue;
      }

      break;
    }

    if (!response || !apiKeyUsed) {
      return NextResponse.json(
        { success: false, error: 'Nieuwsbrief is tijdelijk niet beschikbaar. Probeer het later opnieuw.' },
        { status: 503 }
      );
    }

    if (response.status === 201 || response.status === 204) {
      await sendWelcomeEmail(apiKeyUsed, email);
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
