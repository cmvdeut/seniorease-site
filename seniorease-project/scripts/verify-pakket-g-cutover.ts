/**
 * Pakket G cutover verification (C1–C25) — read-only t.o.v. PDF/private assets.
 * Run: npx --yes tsx scripts/verify-pakket-g-cutover.ts
 */
import path from 'path';
import { createRequire } from 'module';
import {
  assetsForSlug,
  assetsForZipBundle,
  entitlementForPackageSlug,
  findAssetByFileId,
  parseClientReferenceId,
  resolveFulfillmentOrder,
  type DownloadAsset,
} from '../lib/lesmateriaal-fulfillment';
import { buildLesmateriaalCheckoutUrl } from '../lib/lesmateriaal-checkout';
import {
  getPakketBySlug,
  lessonDisplayCode,
  LESMATERIAAL_PAKKETTEN,
  listRoutablePakketten,
  listShopPakketten,
} from '../app/lesmateriaal/lesmateriaal-data';

const require = createRequire(path.join(process.cwd(), 'scripts/verify-pakket-g-cutover.ts'));
const nextConfig = require('../next.config.js') as {
  redirects: () => Promise<Array<{ source: string; destination: string; permanent?: boolean }>>;
};

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

async function main() {
  const shop = listShopPakketten();
  const mobileCard = shop.find((p) => p.slug === 'pakket-g-telefoon');
  const aiCard = shop.find((p) => p.slug === 'pakket-h-ai');

  // C1 shop mobile card → pakket-g-telefoon
  assert(
    'C1 shop mobile card → pakket-g-telefoon',
    !!mobileCard &&
      mobileCard.code === 'G' &&
      mobileCard.title === 'Internet — telefoon/tablet' &&
      mobileCard.lessons.map(lessonDisplayCode).join(',') === 'G1,G2,G3,G4',
  );

  // C2 shop AI card → pakket-h-ai
  assert(
    'C2 shop AI card → pakket-h-ai',
    !!aiCard &&
      aiCard.code === 'H' &&
      aiCard.title === 'AI voor dagelijks gebruik' &&
      aiCard.lessons.map((l) => l.code).join(',') === 'G1,G2,G3,G4',
  );

  // C3 no duplicate legacy cards
  assert(
    'C3 shop geen legacy duplicaten',
    !shop.some((p) => p.slug === 'pakket-f-telefoon') &&
      !shop.some((p) => p.slug === 'pakket-g') &&
      shop.filter((p) => p.slug === 'pakket-g-telefoon').length === 1 &&
      shop.filter((p) => p.slug === 'pakket-h-ai').length === 1,
  );

  // C4–C6 redirects (Next.js config)
  const redirects = await nextConfig.redirects();

  const redirF = redirects.find((r) => r.source === '/lesmateriaal/pakket-f-telefoon');
  const redirG = redirects.find((r) => r.source === '/lesmateriaal/pakket-g');
  const redirGPhone = redirects.find((r) => r.source === '/lesmateriaal/pakket-g-telefoon');
  const redirH = redirects.find((r) => r.source === '/lesmateriaal/pakket-h-ai');

  assert(
    'C4 /pakket-f-telefoon → pakket-g-telefoon',
    !!redirF &&
      redirF.destination === '/lesmateriaal/pakket-g-telefoon' &&
      redirF.permanent === true,
  );
  assert(
    'C5 /pakket-g → pakket-h-ai',
    !!redirG &&
      redirG.destination === '/lesmateriaal/pakket-h-ai' &&
      redirG.permanent === true,
  );
  assert(
    'C6 /pakket-g redirect NOOIT naar mobiel',
    !!redirG && !redirG.destination.includes('pakket-g-telefoon'),
  );

  // C7–C8 canonical catalog
  assert(
    'C7 /pakket-g-telefoon → canonical MOBILE_G',
    !!getPakketBySlug('pakket-g-telefoon') &&
      entitlementForPackageSlug('pakket-g-telefoon') === 'MOBILE_G' &&
      !redirGPhone,
  );
  assert(
    'C8 /pakket-h-ai → canonical AI_H',
    !!getPakketBySlug('pakket-h-ai') &&
      entitlementForPackageSlug('pakket-h-ai') === 'AI_H' &&
      !redirH,
  );

  // C9–C10 canonical checkout
  assert(
    'C9 canonical mobile checkout → pakket_pakket-g-telefoon',
    checkoutRef('pakket-g-telefoon') === 'pakket_pakket-g-telefoon',
  );
  assert(
    'C10 canonical AI checkout → pakket_pakket-h-ai',
    checkoutRef('pakket-h-ai') === 'pakket_pakket-h-ai',
  );

  // C11–C12 legacy fulfillment
  {
    const r = resolveRef('pakket_pakket-f-telefoon');
    assert(
      'C11 legacy mobile fulfillment → MOBILE_G',
      r.entitlement === 'MOBILE_G' &&
        !!r.order &&
        r.order.assets.every((a) => a.fileId.startsWith('ft')),
    );
  }
  {
    const r = resolveRef('pakket_pakket-g');
    assert(
      'C12 legacy AI fulfillment → AI_H',
      r.entitlement === 'AI_H' &&
        !!r.order &&
        r.order.assets.every((a) => a.fileId.startsWith('g')),
    );
  }

  // C13–C16 loose lessons
  {
    const p = getPakketBySlug('pakket-g-telefoon')!;
    const first = p.lessons[0];
    assert(
      'C13 mobile loose first → los_ft1',
      first?.code === 'Ft1' &&
        lessonDisplayCode(first) === 'G1' &&
        losRef('Ft1') === 'los_ft1',
    );
  }
  {
    const p = getPakketBySlug('pakket-h-ai')!;
    assert(
      'C14 AI loose first → los_g1',
      p.lessons[0]?.code === 'G1' && losRef('G1') === 'los_g1',
    );
  }
  assert(
    'C15 geen mobile los_g*',
    getPakketBySlug('pakket-g-telefoon')!.lessons.every(
      (l) =>
        losRef(l.code) === `los_${l.code.toLowerCase()}` &&
        !losRef(l.code)!.startsWith('los_g'),
    ),
  );
  assert(
    'C16 geen AI ft*',
    getPakketBySlug('pakket-h-ai')!.lessons.every((l) => l.code.startsWith('G')) &&
      assetsForSlug('pakket-h-ai').every((a) => a.fileId.startsWith('g')),
  );

  // C17 compleet_org no duplicates + both entitlements once
  {
    const order = resolveFulfillmentOrder(parseClientReferenceId('compleet_org')!)!;
    const ids = order.assets.map((a) => a.fileId);
    const ft = ids.filter((id) => id.startsWith('ft'));
    const g = ids.filter((id) => id.startsWith('g'));
    assert(
      'C17 compleet_org geen duplicates',
      ids.length === new Set(ids).size && ft.length === 8 && g.length === 8,
    );
  }

  // C18–C19 signed fileIds still resolve
  assert(
    'C18 oude ft* fileId resolveert',
    findAssetByFileId('ft1-print')?.relativePath === 'pakket-f-telefoon/ft1-print.pdf',
  );
  assert(
    'C19 oude g* fileId resolveert',
    findAssetByFileId('g1-print')?.relativePath === 'pakket-g/g1-print.pdf',
  );

  // C20 four ZIP identifiers
  const mobileAssets = assetsForSlug('pakket-f-telefoon');
  const aiAssets = assetsForSlug('pakket-g');
  assert(
    'C20 vier ZIP-identifiers correct',
    sameAssets(assetsForZipBundle('zip-pakket-f-telefoon'), mobileAssets) &&
      sameAssets(assetsForZipBundle('zip-pakket-g-telefoon'), mobileAssets) &&
      sameAssets(assetsForZipBundle('zip-pakket-g'), aiAssets) &&
      sameAssets(assetsForZipBundle('zip-pakket-h-ai'), aiAssets),
  );

  // C21 unknown slug
  assert('C21 unknown slug veilig', getPakketBySlug('pakket-onbestaand-xyz') === undefined);

  // C22 pakket-a regressie
  assert(
    'C22 pakket-a regressie',
    !!getPakketBySlug('pakket-a') && checkoutRef('pakket-a') === 'pakket_pakket-a',
  );

  // C23 compleet_org regressie
  {
    const order = resolveFulfillmentOrder(parseClientReferenceId('compleet_org')!)!;
    assert(
      'C23 compleet_org regressie',
      order.kind === 'compleet' &&
        order.assets.some((a) => a.fileId.startsWith('a')) &&
        order.assets.some((a) => a.fileId.startsWith('ft')) &&
        order.assets.some((a) => a.fileId.startsWith('g')),
    );
  }

  // C24 canonical routes geen redirect-loop
  assert(
    'C24 canonical routes geen redirect-loop',
    !redirGPhone &&
      !redirH &&
      redirF?.destination === '/lesmateriaal/pakket-g-telefoon' &&
      redirG?.destination === '/lesmateriaal/pakket-h-ai' &&
      !redirects.some(
        (r) =>
          r.source === '/lesmateriaal/pakket-g-telefoon' ||
          r.source === '/lesmateriaal/pakket-h-ai',
      ),
  );

  // C25 legacy fulfillment onafhankelijk van webredirect
  {
    const legacyMobile = resolveRef('pakket_pakket-f-telefoon');
    const legacyAi = resolveRef('pakket_pakket-g');
    assert(
      'C25 legacy fulfillment onafhankelijk van webredirect',
      legacyMobile.entitlement === 'MOBILE_G' &&
        legacyAi.entitlement === 'AI_H' &&
        !!getPakketBySlug('pakket-f-telefoon') &&
        !!getPakketBySlug('pakket-g') &&
        listRoutablePakketten().some((p) => p.slug === 'pakket-f-telefoon') &&
        !LESMATERIAAL_PAKKETTEN.some((p) => p.slug === 'pakket-f-telefoon'),
    );
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
