/**
 * ChatGPT fulfillment + A–H regressie (FASE 6C.4).
 * Run: npx --yes tsx scripts/verify-chatgpt-fulfillment.ts
 */
import { existsSync } from 'fs';
import path from 'path';
import {
  CHATGPT_SKUS,
  chatgptDownloadFilename,
  findChatgptAssetByFileId,
  parseChatgptClientReferenceId,
  resolveChatgptFulfillmentOrder,
} from '../lib/chatgpt-fulfillment';
import { buildChatgptCheckoutUrl } from '../lib/chatgpt-checkout';
import { resolveOrderFromClientReferenceId } from '../lib/lesmateriaal-order-resolve';
import {
  createDownloadToken,
  findAssetByFileId,
  getDownloadsRoot,
  parseClientReferenceId,
  resolveAssetAbsolutePath,
  resolveFulfillmentOrder,
  verifyDownloadToken,
} from '../lib/lesmateriaal-fulfillment';

let passed = 0;
let failed = 0;

function assert(name: string, cond: boolean, detail?: string) {
  if (cond) {
    passed += 1;
    console.log(`PASS  ${name}`);
  } else {
    failed += 1;
    console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

const EMAIL = 'verify@seniorease.test';
process.env.LESMATERIAAL_DOWNLOAD_SECRET =
  process.env.LESMATERIAAL_DOWNLOAD_SECRET?.trim() ||
  'verify-chatgpt-fulfillment-secret-do-not-use-in-prod';

process.env.NEXT_PUBLIC_STRIPE_CHATGPT_EEN =
  process.env.NEXT_PUBLIC_STRIPE_CHATGPT_EEN ||
  'https://buy.stripe.com/test_chatgpt_een';
process.env.NEXT_PUBLIC_STRIPE_CHATGPT_COMPLEET =
  process.env.NEXT_PUBLIC_STRIPE_CHATGPT_COMPLEET ||
  'https://buy.stripe.com/test_chatgpt_compleet';
process.env.NEXT_PUBLIC_STRIPE_CHATGPT_ORG =
  process.env.NEXT_PUBLIC_STRIPE_CHATGPT_ORG ||
  'https://buy.stripe.com/test_chatgpt_org';

console.log('=== ChatGPT 10 refs ===');
for (const sku of CHATGPT_SKUS) {
  const ref = sku.referenceId;
  const parsed = parseChatgptClientReferenceId(ref);
  assert(`${ref} parse`, parsed === ref);

  const order = resolveChatgptFulfillmentOrder(ref, EMAIL);
  assert(`${ref} label`, order?.label === sku.label, order?.label);
  assert(`${ref} kind chatgpt`, order?.kind === 'chatgpt');
  assert(`${ref} exactly 1 asset`, order?.assets.length === 1);
  assert(
    `${ref} ZIP path`,
    order?.assets[0]?.relativePath === `chatgpt/${sku.zipFilename}`,
    order?.assets[0]?.relativePath,
  );
  assert(`${ref} fileId`, order?.assets[0]?.fileId === sku.fileId);

  const abs = order ? resolveAssetAbsolutePath(order.assets[0]) : null;
  assert(`${ref} ZIP on disk`, Boolean(abs && existsSync(abs!)), abs ?? 'missing');

  const token = createDownloadToken({
    fileId: sku.fileId,
    orderId: `cs_test_${ref}`,
    email: EMAIL,
  });
  const verified = verifyDownloadToken(token);
  assert(`${ref} token verify`, verified?.fileId === sku.fileId);
  assert(
    `${ref} token only own asset`,
    verified?.fileId === sku.fileId &&
      findChatgptAssetByFileId(verified!.fileId)?.relativePath ===
        `chatgpt/${sku.zipFilename}`,
  );
  assert(
    `${ref} filename`,
    chatgptDownloadFilename(sku.fileId) === sku.zipFilename,
  );

  // Content-Type intent: relative path ends with .zip
  assert(
    `${ref} zip extension`,
    order!.assets[0].relativePath.toLowerCase().endsWith('.zip'),
  );

  // Checkout URL
  const url = buildChatgptCheckoutUrl({ referenceId: ref, email: EMAIL });
  assert(`${ref} checkout url`, Boolean(url?.startsWith('https://buy.stripe.com/')));
  if (url) {
    const u = new URL(url);
    assert(
      `${ref} checkout ref param`,
      u.searchParams.get('client_reference_id') === ref,
    );
    assert(
      `${ref} checkout email param`,
      u.searchParams.get('prefilled_email') === EMAIL,
    );
  }

  // Dispatch
  const dispatched = resolveOrderFromClientReferenceId(ref, EMAIL);
  assert(
    `${ref} dispatch`,
    dispatched?.kind === 'chatgpt' && dispatched.label === sku.label,
  );

  // No A–H collision: chatgpt refs must not parse as A–H
  assert(`${ref} not A-H parse`, parseClientReferenceId(ref) === null);
}

console.log('\n=== Fail-closed ===');
for (const bad of [
  'chatgpt_a9',
  'chatgpt_x',
  'chatgpt_bla',
  'chatgpt_c_compleet',
  '../chatgpt_a1',
  'chatgpt_a1/../x',
  '',
  'chatgpt_',
  'pakket_chatgpt_a1',
]) {
  assert(
    `reject ${bad || '(empty)'}`,
    parseChatgptClientReferenceId(bad) === null &&
      resolveChatgptFulfillmentOrder(bad, EMAIL) === null &&
      resolveOrderFromClientReferenceId(bad || null, EMAIL) === null,
  );
}

assert(
  'unknown fileId',
  findChatgptAssetByFileId('chatgpt-a9') === null &&
    findAssetByFileId('chatgpt-a9') === null,
);

console.log('\n=== A–H regressie ===');
for (const ref of ['los_g1', 'pakket_pakket-h-ai', 'compleet_org'] as const) {
  const parsed = parseClientReferenceId(ref);
  assert(`${ref} parse`, Boolean(parsed));
  const order = resolveFulfillmentOrder({ ...parsed!, email: EMAIL });
  assert(`${ref} resolve`, Boolean(order && order.assets.length > 0));
  assert(`${ref} not chatgpt`, order?.kind !== 'chatgpt');
  const dispatched = resolveOrderFromClientReferenceId(ref, EMAIL);
  assert(
    `${ref} dispatch A-H`,
    dispatched?.kind === order?.kind &&
      dispatched?.assets.length === order?.assets.length,
  );
}

assert(
  'A1 ZIP distinct from A2',
  CHATGPT_SKUS[0].zipFilename !== CHATGPT_SKUS[1].zipFilename &&
    CHATGPT_SKUS[0].fileId !== CHATGPT_SKUS[1].fileId,
);

const root = getDownloadsRoot();
assert(
  'downloads root exists',
  existsSync(path.join(root, 'chatgpt')),
);

console.log(`\nResult: ${passed} passed, ${failed} failed`);
process.exitCode = failed > 0 ? 1 : 0;
