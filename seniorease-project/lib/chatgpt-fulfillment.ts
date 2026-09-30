/**
 * SeniorEase ChatGPT fulfillment — APART van A–H / LESMATERIAAL_PAKKETTEN / PACKAGE_SOURCE.
 *
 * client_reference_id → één frozen ZIP onder private/lesmateriaal-downloads/chatgpt/
 *
 * Geen Node fs/path hier: deze module kan via checkout-helpers in de client-bundel
 * meegenomen worden. Bestandsbestaan checkt resolveAssetAbsolutePath (server-only).
 */

import type { DownloadAsset, FulfillmentOrder } from '@/lib/lesmateriaal-fulfillment';
import {
  CHATGPT_COMPLEET_PRIJS,
  CHATGPT_EEN_PRIJS,
  CHATGPT_ORG_PRIJS,
  type ChatgptReferenceId,
} from '@/app/lesmateriaal/chatgpt/chatgpt-data';

export type { ChatgptReferenceId };

export type ChatgptSku = {
  referenceId: ChatgptReferenceId;
  /** Stabiele fileId in tokens (geen pad) */
  fileId: string;
  zipFilename: string;
  label: string;
  price: number;
};

const CHATGPT_PRIVATE_DIR = 'chatgpt';

/** Exacte mapping — server-side bron van waarheid */
export const CHATGPT_SKUS: readonly ChatgptSku[] = [
  {
    referenceId: 'chatgpt_a1',
    fileId: 'chatgpt-a1',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-1.zip',
    label: 'Praktisch werken met ChatGPT — Mijn eerste gesprek met ChatGPT',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a2',
    fileId: 'chatgpt-a2',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-2.zip',
    label: 'Praktisch werken met ChatGPT — ChatGPT helpt bij gewone dingen',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a3',
    fileId: 'chatgpt-a3',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-3.zip',
    label: 'Praktisch werken met ChatGPT — Zo krijgt u een beter antwoord',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a4',
    fileId: 'chatgpt-a4',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-4.zip',
    label: 'Praktisch werken met ChatGPT — Schrijven met ChatGPT',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a5',
    fileId: 'chatgpt-a5',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-5.zip',
    label: 'Praktisch werken met ChatGPT — Samen iets plannen',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a6',
    fileId: 'chatgpt-a6',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-6.zip',
    label: 'Praktisch werken met ChatGPT — Moeilijke informatie begrijpelijk maken',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a7',
    fileId: 'chatgpt-a7',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-7.zip',
    label: 'Praktisch werken met ChatGPT — Uitzoeken, vergelijken en kiezen',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_a8',
    fileId: 'chatgpt-a8',
    zipFilename: 'SeniorEase-ChatGPT-Een-praktische-uitleg-Les-8.zip',
    label: 'Praktisch werken met ChatGPT — ChatGPT voor míjn leven',
    price: CHATGPT_EEN_PRIJS,
  },
  {
    referenceId: 'chatgpt_b_compleet',
    fileId: 'chatgpt-b-compleet',
    zipFilename: 'SeniorEase-ChatGPT-Compleet-uitlegpakket.zip',
    label: 'Praktisch werken met ChatGPT — Compleet uitlegpakket',
    price: CHATGPT_COMPLEET_PRIJS,
  },
  {
    referenceId: 'chatgpt_c_organisatie',
    fileId: 'chatgpt-c-organisatie',
    zipFilename: 'SeniorEase-ChatGPT-Organisatiepakket-een-locatie.zip',
    label: 'Praktisch werken met ChatGPT — Organisatiepakket · één locatie',
    price: CHATGPT_ORG_PRIJS,
  },
] as const;

const SKU_BY_REF = new Map(CHATGPT_SKUS.map((s) => [s.referenceId, s]));
const SKU_BY_FILE = new Map(CHATGPT_SKUS.map((s) => [s.fileId, s]));

export function isChatgptReferenceId(value: string): value is ChatgptReferenceId {
  return SKU_BY_REF.has(value as ChatgptReferenceId);
}

export function getChatgptSku(referenceId: string): ChatgptSku | null {
  return SKU_BY_REF.get(referenceId as ChatgptReferenceId) ?? null;
}

export function chatgptAssetForSku(sku: ChatgptSku): DownloadAsset {
  return {
    fileId: sku.fileId,
    relativePath: `${CHATGPT_PRIVATE_DIR}/${sku.zipFilename}`,
    label: `Download ZIP — ${sku.zipFilename.replace(/^SeniorEase-ChatGPT-/, '').replace(/\.zip$/i, '')}`,
  };
}

export function findChatgptAssetByFileId(fileId: string): DownloadAsset | null {
  const sku = SKU_BY_FILE.get(fileId);
  if (!sku) return null;
  return chatgptAssetForSku(sku);
}

export function chatgptDownloadFilename(fileId: string): string | null {
  return SKU_BY_FILE.get(fileId)?.zipFilename ?? null;
}

/**
 * Fail-closed: alleen exact bekende chatgpt_* refs.
 * Geen chatgpt_a9, chatgpt_x, pad-segmenten, etc.
 */
export function parseChatgptClientReferenceId(
  raw: string | null | undefined,
): ChatgptReferenceId | null {
  if (!raw?.trim()) return null;
  const value = raw.trim();
  if (!/^chatgpt_[a-z0-9_]+$/.test(value)) return null;
  if (!isChatgptReferenceId(value)) return null;
  return value;
}

export function resolveChatgptFulfillmentOrder(
  raw: string | null | undefined,
  email: string,
): FulfillmentOrder | null {
  const ref = parseChatgptClientReferenceId(raw);
  if (!ref) return null;
  const sku = getChatgptSku(ref);
  if (!sku) return null;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed.includes('@')) return null;

  return {
    kind: 'chatgpt',
    email: trimmed,
    label: sku.label,
    price: sku.price,
    assets: [chatgptAssetForSku(sku)],
  };
}

export function listChatgptSourceZipSpecs(): {
  referenceId: ChatgptReferenceId;
  fileId: string;
  zipFilename: string;
  relativePath: string;
}[] {
  return CHATGPT_SKUS.map((s) => ({
    referenceId: s.referenceId,
    fileId: s.fileId,
    zipFilename: s.zipFilename,
    relativePath: `${CHATGPT_PRIVATE_DIR}/${s.zipFilename}`,
  }));
}
