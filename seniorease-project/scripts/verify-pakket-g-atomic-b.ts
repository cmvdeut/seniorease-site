/**
 * ATOMIC B verification — read-only t.o.v. PDF/private assets.
 * Run: npx --yes tsx scripts/verify-pakket-g-atomic-b.ts
 */
import {
  assetsForSlug,
  entitlementForPackageSlug,
  parseClientReferenceId,
  resolveFulfillmentOrder,
} from '../lib/lesmateriaal-fulfillment';
import { buildLesmateriaalCheckoutUrl } from '../lib/lesmateriaal-checkout';
import {
  getPakketBySlug,
  lessonDisplayCode,
  LESMATERIAAL_PAKKETTEN,
  listRoutablePakketten,
  listShopPakketten,
} from '../app/lesmateriaal/lesmateriaal-data';

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

function checkoutRef(slug: string): string | null {
  const url = buildLesmateriaalCheckoutUrl({
    productType: 'pakket',
    email: 'test@example.nl',
    slug,
    paymentLinkBase: 'https://buy.stripe.com/test_example',
  });
  return url ? new URL(url).searchParams.get('client_reference_id') : null;
}

function losRef(lessonCode: string): string | null {
  const url = buildLesmateriaalCheckoutUrl({
    productType: 'los',
    email: 'test@example.nl',
    lessonCode,
    paymentLinkBase: 'https://buy.stripe.com/test_example',
  });
  return url ? new URL(url).searchParams.get('client_reference_id') : null;
}

// B1–B4 routes (catalog lookup = page availability)
assert('B1 legacy mobile routeable', !!getPakketBySlug('pakket-f-telefoon'));
assert('B2 canonical mobile routeable', !!getPakketBySlug('pakket-g-telefoon'));
assert('B3 legacy AI routeable', !!getPakketBySlug('pakket-g'));
assert('B4 canonical AI routeable', !!getPakketBySlug('pakket-h-ai'));

// B5–B8 checkout refs
assert('B5 legacy mobile checkout', checkoutRef('pakket-f-telefoon') === 'pakket_pakket-f-telefoon');
assert('B6 canonical mobile checkout', checkoutRef('pakket-g-telefoon') === 'pakket_pakket-g-telefoon');
assert('B7 legacy AI checkout', checkoutRef('pakket-g') === 'pakket_pakket-g');
assert('B8 canonical AI checkout', checkoutRef('pakket-h-ai') === 'pakket_pakket-h-ai');

// B9 display G1 + fulfillment Ft1
{
  const p = getPakketBySlug('pakket-g-telefoon')!;
  const g1 = p.lessons.find((l) => lessonDisplayCode(l) === 'G1');
  assert(
    'B9 display G1 + tech Ft1',
    !!g1 && g1.code === 'Ft1' && losRef('Ft1') === 'los_ft1',
  );
}

// B10 AI los g1
{
  const p = getPakketBySlug('pakket-h-ai')!;
  const first = p.lessons[0];
  assert(
    'B10 canonical AI first lesson → los_g1',
    first?.code === 'G1' && losRef('G1') === 'los_g1',
  );
}

// B11 / B12 entitlements
assert('B11 pakket-g remains AI_H', entitlementForPackageSlug('pakket-g') === 'AI_H');
assert(
  'B11b pakket-g assets g* only',
  assetsForSlug('pakket-g').every((a) => a.fileId.startsWith('g')),
);
assert('B12 pakket-g-telefoon MOBILE_G', entitlementForPackageSlug('pakket-g-telefoon') === 'MOBILE_G');
assert(
  'B12b pakket-g-telefoon ft* only',
  assetsForSlug('pakket-g-telefoon').every((a) => a.fileId.startsWith('ft')),
);

// B13 compleet_org no duplicate ft*/g*
{
  const parsed = parseClientReferenceId('compleet_org')!;
  const order = resolveFulfillmentOrder(parsed)!;
  const ids = order.assets.map((a) => a.fileId);
  const unique = new Set(ids);
  assert('B13 compleet_org no duplicate fileIds', ids.length === unique.size && ids.length > 0);
  const ft = ids.filter((id) => id.startsWith('ft'));
  const g = ids.filter((id) => id.startsWith('g'));
  assert('B13b compleet has 8 ft*', ft.length === 8);
  assert('B13c compleet has 8 g*', g.length === 8);
}

// Shop no duplicates
assert(
  'shop list excludes canonical mobile',
  !listShopPakketten().some((p) => p.slug === 'pakket-g-telefoon'),
);
assert(
  'shop list excludes canonical AI',
  !listShopPakketten().some((p) => p.slug === 'pakket-h-ai'),
);
assert(
  'shop list still has legacy mobile + AI',
  listShopPakketten().some((p) => p.slug === 'pakket-f-telefoon') &&
    listShopPakketten().some((p) => p.slug === 'pakket-g'),
);
assert(
  'LESMATERIAAL_PAKKETTEN === shop list length',
  LESMATERIAAL_PAKKETTEN.length === listShopPakketten().length,
);

// B15 pakket-a
assert('B15 pakket-a unchanged', !!getPakketBySlug('pakket-a') && checkoutRef('pakket-a') === 'pakket_pakket-a');

// B16 unknown
assert('B16 unknown slug', getPakketBySlug('pakket-onbestaand-xyz') === undefined);

// Routable includes four
const routable = listRoutablePakketten().map((p) => p.slug);
assert(
  'routable has four migration slugs',
  ['pakket-f-telefoon', 'pakket-g-telefoon', 'pakket-g', 'pakket-h-ai'].every((s) =>
    routable.includes(s),
  ),
);

// Mobile display codes G1-G4, tech Ft*
{
  const p = getPakketBySlug('pakket-g-telefoon')!;
  assert(
    'mobile display G1-G4',
    p.lessons.map(lessonDisplayCode).join(',') === 'G1,G2,G3,G4',
  );
  assert(
    'mobile tech Ft1-Ft4',
    p.lessons.map((l) => l.code).join(',') === 'Ft1,Ft2,Ft3,Ft4',
  );
}

// AI no H1-H4 lesson codes
{
  const p = getPakketBySlug('pakket-h-ai')!;
  assert(
    'AI lessons remain G1-G4 (no H*)',
    p.lessons.every((l) => l.code.startsWith('G') && !l.code.startsWith('H')),
  );
}

// Canonical mobile never los_g
assert('mobile G1 display never implies los_g1', losRef('G1') === 'los_g1'); // AI tech
assert('mobile checkout uses Ft codes only for los', losRef('Ft1') === 'los_ft1');

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
