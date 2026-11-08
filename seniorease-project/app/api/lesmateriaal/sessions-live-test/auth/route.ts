import { NextRequest, NextResponse } from 'next/server';
import {
  SESSIONS_LIVE_TEST_COOKIE,
  authorizeSessionsLiveTestUnlock,
  clearSessionsLiveTestUnlockRateLimit,
  createSessionsLiveTestAuthCookieValue,
  getSessionsLiveTestSecret,
  getSessionsLiveTestUnlockRateLimit,
  isSessionsLiveTestEnabled,
  recordSessionsLiveTestUnlockFailure,
} from '@/lib/lesmateriaal-sessions-live-test';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return `ip:${first}`;
  }
  return 'ip:unknown';
}

/**
 * Zet httpOnly auth-cookie voor de afgeschermde live-testpagina.
 * Secret wordt alleen server-side vergeleken (nooit gelogd).
 * Create-pad: uit bij ontbrekend secret. Webhook-fulfillment gebruikt Neon apart.
 */
export async function POST(request: NextRequest) {
  if (!isSessionsLiveTestEnabled()) {
    return NextResponse.json(
      { ok: false, error: 'Live-testvoorziening is uitgeschakeld.' },
      { status: 404 },
    );
  }

  const rateKey = clientKey(request);
  const rate = getSessionsLiveTestUnlockRateLimit(rateKey);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Te veel pogingen. Probeer later opnieuw.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const providedSecret = typeof data.secret === 'string' ? data.secret : '';
  const providedEmail = typeof data.email === 'string' ? data.email : '';

  const auth = authorizeSessionsLiveTestUnlock({
    providedSecret,
    providedEmail,
  });
  if (!auth.ok) {
    recordSessionsLiveTestUnlockFailure(rateKey);
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const secret = getSessionsLiveTestSecret();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'Live-testvoorziening is uitgeschakeld.' },
      { status: 404 },
    );
  }

  clearSessionsLiveTestUnlockRateLimit(rateKey);

  const cookie = createSessionsLiveTestAuthCookieValue({
    secret,
    email: auth.email,
  });

  const res = NextResponse.json({ ok: true, email: auth.email });
  res.cookies.set(SESSIONS_LIVE_TEST_COOKIE, cookie.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: cookie.maxAge,
  });
  return res;
}

/** Wis auth-cookie (uitschakelen / uitloggen). */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSIONS_LIVE_TEST_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
