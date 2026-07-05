import { createHash } from 'crypto';

export function normalizeBrevoApiKey(raw: string): string {
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

export function getBrevoApiKeyCandidates(): string[] {
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

export function getBrevoListId(): number | undefined {
  const raw = process.env.BREVO_LIST_ID?.trim();
  if (!raw) return undefined;

  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function getBrevoApiKey(): string | undefined {
  return getBrevoApiKeyCandidates()[0];
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

export function getBrevoEnvDiagnostics() {
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

export async function verifyBrevoApiKey(apiKey: string): Promise<{ ok: boolean; status: number }> {
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
