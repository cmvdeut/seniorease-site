/**
 * Preview-only Brevo allowlist voor lesmateriaal-fulfillment.
 * Actief uitsluitend als VERCEL_ENV=preview — nooit in Production.
 */

export type MailGuardEnv = Record<string, string | undefined>;

export function isPreviewMailGuardActive(
  env: MailGuardEnv = process.env,
): boolean {
  return env.VERCEL_ENV === 'preview';
}

export function getLesmateriaalTestEmail(
  env: MailGuardEnv = process.env,
): string | null {
  const raw = env.LESMATERIAAL_TEST_EMAIL?.trim().toLowerCase() || '';
  if (!raw || !raw.includes('@')) return null;
  return raw;
}

export function normalizeMailAddress(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Mag deze ontvanger een Brevo-mail krijgen?
 * Production / non-preview: altijd true (ongewijzigde flow).
 * Preview: alleen exact LESMATERIAAL_TEST_EMAIL.
 */
export function isLesmateriaalMailAllowed(
  recipientEmail: string,
  env: MailGuardEnv = process.env,
): boolean {
  if (!isPreviewMailGuardActive(env)) return true;
  const allowed = getLesmateriaalTestEmail(env);
  if (!allowed) return false;
  return normalizeMailAddress(recipientEmail) === allowed;
}

export type PreviewMailDecision =
  | { allowed: true; reason: 'guard_inactive' | 'allowlist_match' }
  | {
      allowed: false;
      reason: 'preview_missing_test_email' | 'preview_recipient_not_allowlisted';
    };

export function evaluateLesmateriaalMailAllowlist(
  recipientEmail: string,
  env: MailGuardEnv = process.env,
): PreviewMailDecision {
  if (!isPreviewMailGuardActive(env)) {
    return { allowed: true, reason: 'guard_inactive' };
  }
  const allowed = getLesmateriaalTestEmail(env);
  if (!allowed) {
    return { allowed: false, reason: 'preview_missing_test_email' };
  }
  if (normalizeMailAddress(recipientEmail) === allowed) {
    return { allowed: true, reason: 'allowlist_match' };
  }
  return { allowed: false, reason: 'preview_recipient_not_allowlisted' };
}
