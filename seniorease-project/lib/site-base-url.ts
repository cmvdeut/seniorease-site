/**
 * Basis-URL voor success/cancel/download-links.
 * Geen fs/private imports — voorkomt dat serverless functions PDF’s mee-bundelen.
 */

export type SiteBaseUrlEnv = Record<string, string | undefined>;

/**
 * Preview: altijd https://$VERCEL_URL (niet Production).
 * Production/local: bestaande NEXT_PUBLIC_SITE_URL / SITE_URL / fallback.
 */
export function getSiteBaseUrl(env: SiteBaseUrlEnv = process.env): string {
  if (env.VERCEL_ENV === 'preview') {
    const vercelUrl = env.VERCEL_URL?.trim();
    if (vercelUrl) {
      const host = vercelUrl.replace(/^https?:\/\//i, '').replace(/\/$/, '');
      if (host) return `https://${host}`;
    }
  }

  const configured =
    env.NEXT_PUBLIC_SITE_URL?.trim() ||
    env.SITE_URL?.trim() ||
    'https://www.seniorease.nl';
  return configured.replace(/\/$/, '') || 'https://www.seniorease.nl';
}
