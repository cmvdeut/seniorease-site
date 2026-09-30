/**
 * Stripe Payment Links voor SeniorEase – Praktisch werken met ChatGPT.
 * Apart van A–H (lib/lesmateriaal-checkout.ts).
 *
 * Env:
 *   NEXT_PUBLIC_STRIPE_CHATGPT_EEN
 *   NEXT_PUBLIC_STRIPE_CHATGPT_COMPLEET
 *   NEXT_PUBLIC_STRIPE_CHATGPT_ORG
 *
 * Success URL (Stripe Dashboard): …/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}
 */

import {
  getChatgptSku,
  isChatgptReferenceId,
  type ChatgptReferenceId,
} from '@/lib/chatgpt-fulfillment';

export type ChatgptPaymentLinkKind = 'een' | 'compleet' | 'organisatie';

const ENV_BY_KIND: Record<ChatgptPaymentLinkKind, string> = {
  een: 'NEXT_PUBLIC_STRIPE_CHATGPT_EEN',
  compleet: 'NEXT_PUBLIC_STRIPE_CHATGPT_COMPLEET',
  organisatie: 'NEXT_PUBLIC_STRIPE_CHATGPT_ORG',
};

function normalizePaymentLink(value: string | undefined): string | null {
  const base = value?.trim();
  if (base?.startsWith('https://buy.stripe.com/')) return base;
  return null;
}

export function chatgptLinkKindForReference(
  referenceId: ChatgptReferenceId,
): ChatgptPaymentLinkKind {
  if (referenceId === 'chatgpt_b_compleet') return 'compleet';
  if (referenceId === 'chatgpt_c_organisatie') return 'organisatie';
  return 'een';
}

export function getChatgptPaymentLinkBase(kind: ChatgptPaymentLinkKind): string | null {
  return normalizePaymentLink(process.env[ENV_BY_KIND[kind]]);
}

export function isChatgptCheckoutEnabled(kind: ChatgptPaymentLinkKind = 'een'): boolean {
  return getChatgptPaymentLinkBase(kind) !== null;
}

export function buildChatgptCheckoutUrl(params: {
  referenceId: string;
  email: string;
  /** Doorgeven vanaf server — client heeft env niet altijd */
  paymentLinkBase?: string | null;
}): string | null {
  const { email, paymentLinkBase } = params;
  if (!isChatgptReferenceId(params.referenceId)) return null;
  const referenceId = params.referenceId;

  const kind = chatgptLinkKindForReference(referenceId);
  const base =
    paymentLinkBase && paymentLinkBase.startsWith('https://buy.stripe.com/')
      ? paymentLinkBase
      : getChatgptPaymentLinkBase(kind);
  if (!base) return null;

  const trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) return null;

  // Stripe Payment Links: alleen [A-Za-z0-9_-] in client_reference_id
  const sku = getChatgptSku(referenceId);
  if (!sku) return null;

  const url = new URL(base);
  url.searchParams.set('prefilled_email', trimmed);
  url.searchParams.set('client_reference_id', referenceId);
  return url.toString();
}

export const CHATGPT_CHECKOUT_SESSION_KEY = 'seniorease-chatgpt-checkout';

export type ChatgptCheckoutSession = {
  email: string;
  referenceId: ChatgptReferenceId;
  label: string;
  price: number;
  at: string;
};

export function saveChatgptCheckoutSession(
  data: Omit<ChatgptCheckoutSession, 'at'>,
): void {
  if (typeof window === 'undefined') return;
  const payload: ChatgptCheckoutSession = { ...data, at: new Date().toISOString() };
  sessionStorage.setItem(CHATGPT_CHECKOUT_SESSION_KEY, JSON.stringify(payload));
}

export function readChatgptCheckoutSession(): ChatgptCheckoutSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CHATGPT_CHECKOUT_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChatgptCheckoutSession;
  } catch {
    return null;
  }
}
