/**
 * Dispatch: chatgpt_* → ChatGPT fulfillment; anders A–H.
 * Fail-closed: onbekende refs → null.
 */

import {
  parseClientReferenceId,
  resolveFulfillmentOrder,
  type FulfillmentOrder,
} from '@/lib/lesmateriaal-fulfillment';
import { resolveChatgptFulfillmentOrder } from '@/lib/chatgpt-fulfillment';

export function resolveOrderFromClientReferenceId(
  raw: string | null | undefined,
  email: string,
): FulfillmentOrder | null {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail.includes('@')) return null;

  const chatgpt = resolveChatgptFulfillmentOrder(raw, trimmedEmail);
  if (chatgpt) return chatgpt;

  const parsed = parseClientReferenceId(raw);
  if (!parsed) return null;
  return resolveFulfillmentOrder({ ...parsed, email: trimmedEmail });
}
