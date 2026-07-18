/**
 * Live URL van de Kijk & Help-app (aparte Vercel-deploy).
 * Later: eventueel kijk.seniorease.nl of rewrite onder /kijk-en-help/app.
 */
export const KIJK_EN_HELP_APP_URL =
  process.env.NEXT_PUBLIC_KIJK_EN_HELP_URL ||
  'https://seniorease-kijk-help.vercel.app';
