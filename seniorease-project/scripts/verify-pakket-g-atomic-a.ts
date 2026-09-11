/**
 * ATOMIC A verification — read-only t.o.v. PDF/private assets.
 * Run: npx --yes tsx scripts/verify-pakket-g-atomic-a.ts
 */
import {
  assetsForSlug,
  assetsForZipBundle,
  entitlementForPackageSlug,
  findAssetByFileId,
  parseClientReferenceId,
  resolveFulfillmentOrder,
  resolveStoragePackageSlug,
  type DownloadAsset,
} from '../lib/lesmateriaal-fulfillment';
import { buildLesmateriaalCheckoutUrl as buildCheckout } from '../lib/lesmateriaal-checkout';
import { LESMATERIAAL_PAKKETTEN, getPakketBySlug, listShopPakketten } from '../app/lesmateriaal/lesmateriaal-data';

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

function allStartWith(assets: DownloadAsset[], prefix: string): boolean {
  return assets.length > 0 && assets.every((a) => a.fileId.startsWith(prefix));
}

function noneStartWith(assets: DownloadAsset[], prefix: string): boolean {
  return assets.every((a) => !a.fileId.startsWith(prefix));
}

function resolveRef(ref: string) {
  const parsed = parseClientReferenceId(ref);
  const order = parsed ? resolveFulfillmentOrder(parsed) : null;
  const entitlement =
    parsed?.kind === 'pakket' && parsed.slug
      ? entitlementForPackageSlug(parsed.slug)
      : null;
  return { parsed, order, entitlement };
}

function sameAssets(a: DownloadAsset[], b: DownloadAsset[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x.fileId.localeCompare(y.fileId));
  const sb = [...b].sort((x, y) => x.fileId.localeCompare(y.fileId));
  return sa.every(
    (x, i) =>
      x.fileId === sb[i].fileId &&
      x.relativePath === sb[i].relativePath &&
      x.label === sb[i].label,
  );
}

// --- T1–T4 entitlements via references ---
{
  const t1 = resolveRef('pakket_pakket-f-telefoon');
  assert('T1 pakket_pakket-f-telefoon → MOBILE_G', t1.entitlement === 'MOBILE_G' && !!t1.order);
}
{
  const t2 = resolveRef('pakket_pakket-g-telefoon');
  assert('T2 pakket_pakket-g-telefoon → MOBILE_G', t2.entitlement === 'MOBILE_G' && !!t2.order);
}
{
  const t3 = resolveRef('pakket_pakket-g');
  assert('T3 pakket_pakket-g → AI_H', t3.entitlement === 'AI_H' && !!t3.order);
}
{
  const t4 = resolveRef('pakket_pakket-h-ai');
  assert('T4 pakket_pakket-h-ai → AI_H', t4.entitlement === 'AI_H' && !!t4.order);
}

// --- T5–T8 assets ---
const legacyMobile = assetsForSlug('pakket-f-telefoon');
const canonicalMobile = assetsForSlug('pakket-g-telefoon');
const legacyAi = assetsForSlug('pakket-g');
const canonicalAi = assetsForSlug('pakket-h-ai');

assert('T5 legacy mobiel alleen ft*', allStartWith(legacyMobile, 'ft') && noneStartWith(legacyMobile, 'g'));
assert('T6 canonical mobiel = legacy ft* assets', sameAssets(legacyMobile, canonicalMobile));
assert('T7 legacy AI alleen g*', allStartWith(legacyAi, 'g') && noneStartWith(legacyAi, 'ft'));
assert('T8 canonical AI = legacy g* assets', sameAssets(legacyAi, canonicalAi));

assert(
  'T6b canonical mobiel private paths onder pakket-f-telefoon',
  canonicalMobile.every((a) => a.relativePath.startsWith('pakket-f-telefoon/')),
);
assert(
  'T8b canonical AI private paths onder pakket-g',
  canonicalAi.every((a) => a.relativePath.startsWith('pakket-g/')),
);

// --- T9–T10 los ---
{
  const r = resolveRef('los_ft1');
  assert(
    'T9 los_ft1 → Ft1 mobiel',
    !!r.order &&
      r.order.kind === 'los' &&
      allStartWith(r.order.assets, 'ft1') &&
      noneStartWith(r.order.assets, 'g'),
  );
}
{
  const r = resolveRef('los_g1');
  assert(
    'T10 los_g1 → AI G1',
    !!r.order &&
      r.order.kind === 'los' &&
      allStartWith(r.order.assets, 'g1') &&
      noneStartWith(r.order.assets, 'ft'),
  );
}

// --- T11 compleet ---
{
  const r = resolveRef('compleet_org');
  assert('T11 compleet_org resolveert', !!r.order && r.order.kind === 'compleet' && r.order.assets.length > 0);
}

// --- T12–T13 checkout refs unchanged ---
{
  const url = buildCheckout({
    productType: 'pakket',
    email: 'test@example.nl',
    slug: 'pakket-f-telefoon',
    paymentLinkBase: 'https://buy.stripe.com/test_example',
  });
  assert(
    'T12 checkout mobiel → pakket_pakket-f-telefoon',
    !!url && new URL(url).searchParams.get('client_reference_id') === 'pakket_pakket-f-telefoon',
  );
}
{
  const url = buildCheckout({
    productType: 'pakket',
    email: 'test@example.nl',
    slug: 'pakket-g',
    paymentLinkBase: 'https://buy.stripe.com/test_example',
  });
  assert(
    'T13 checkout AI → pakket_pakket-g',
    !!url && new URL(url).searchParams.get('client_reference_id') === 'pakket_pakket-g',
  );
}

// --- Negatief T14–T20 ---
assert(
  'T14 pakket_pakket-g NEVER MOBILE_G',
  entitlementForPackageSlug('pakket-g') === 'AI_H' &&
    resolveRef('pakket_pakket-g').entitlement !== 'MOBILE_G',
);
assert(
  'T15 pakket-g NEVER ft* assets',
  noneStartWith(assetsForSlug('pakket-g'), 'ft'),
);
assert(
  'T16 pakket-g-telefoon NEVER g* assets',
  noneStartWith(assetsForSlug('pakket-g-telefoon'), 'g') &&
    allStartWith(assetsForSlug('pakket-g-telefoon'), 'ft'),
);
assert(
  'T17 pakket-h-ai NEVER ft* assets',
  noneStartWith(assetsForSlug('pakket-h-ai'), 'ft') &&
    allStartWith(assetsForSlug('pakket-h-ai'), 'g'),
);
{
  const r = resolveRef('los_g1');
  assert('T18 los_g1 NEVER mobiel ft*', !!r.order && noneStartWith(r.order.assets, 'ft'));
}
{
  const r = resolveRef('los_ft1');
  assert('T19 los_ft1 NEVER AI g*', !!r.order && noneStartWith(r.order.assets, 'g'));
}
{
  const parsed = parseClientReferenceId('pakket_pakket-onbestaand-xyz');
  const order = parsed ? resolveFulfillmentOrder(parsed) : null;
  assert(
    'T20 onbekende package reference → geen order',
    !!parsed && parsed.slug === 'pakket-onbestaand-xyz' && order === null,
  );
}

// --- ZIP dual ---
assert(
  'ZIP zip-pakket-f-telefoon = mobile assets',
  sameAssets(assetsForZipBundle('zip-pakket-f-telefoon'), legacyMobile),
);
assert(
  'ZIP zip-pakket-g-telefoon = mobile assets',
  sameAssets(assetsForZipBundle('zip-pakket-g-telefoon'), legacyMobile),
);
assert(
  'ZIP zip-pakket-g = AI assets',
  sameAssets(assetsForZipBundle('zip-pakket-g'), legacyAi),
);
assert(
  'ZIP zip-pakket-h-ai = AI assets',
  sameAssets(assetsForZipBundle('zip-pakket-h-ai'), legacyAi),
);

// --- Storage aliases ---
assert(
  'storage alias g-telefoon → f-telefoon',
  resolveStoragePackageSlug('pakket-g-telefoon') === 'pakket-f-telefoon',
);
assert(
  'storage alias h-ai → g',
  resolveStoragePackageSlug('pakket-h-ai') === 'pakket-g',
);
assert(
  'storage pakket-g blijft pakket-g',
  resolveStoragePackageSlug('pakket-g') === 'pakket-g',
);

// --- Shop catalog: visible list remains legacy-only (ATOMIC B may add routable aliases) ---
assert(
  'shop heeft geen pakket-g-telefoon',
  !listShopPakketten().some((p) => p.slug === 'pakket-g-telefoon') &&
    !LESMATERIAAL_PAKKETTEN.some((p) => p.slug === 'pakket-g-telefoon'),
);
assert(
  'shop heeft geen pakket-h-ai',
  !listShopPakketten().some((p) => p.slug === 'pakket-h-ai') &&
    !LESMATERIAAL_PAKKETTEN.some((p) => p.slug === 'pakket-h-ai'),
);
assert('shop heeft nog pakket-f-telefoon', !!getPakketBySlug('pakket-f-telefoon'));
assert('shop heeft nog pakket-g (AI)', !!getPakketBySlug('pakket-g'));

// --- findAssetByFileId ---
assert('findAsset ft1-print', findAssetByFileId('ft1-print')?.relativePath === 'pakket-f-telefoon/ft1-print.pdf');
assert('findAsset g1-print', findAssetByFileId('g1-print')?.relativePath === 'pakket-g/g1-print.pdf');

// --- regressie andere pakketten ---
assert('pakket-a assets aanwezig', assetsForSlug('pakket-a').some((a) => a.fileId === 'a1-print'));
{
  const r = resolveRef('pakket_pakket-a');
  assert('pakket_pakket-a resolveert', !!r.order && r.order.assets.some((a) => a.fileId.startsWith('a')));
}
{
  const r = resolveRef('los_a1');
  assert('los_a1 resolveert', !!r.order && allStartWith(r.order.assets, 'a1'));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
