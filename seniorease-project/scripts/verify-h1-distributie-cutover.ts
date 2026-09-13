/**
 * H1 distributie-cutover regressie — fase 4C.
 * Run: npx --yes tsx scripts/verify-h1-distributie-cutover.ts
 *
 * Vereist: lokale sync al gedraaid (private g1-* = H1-hashes).
 */
import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import {
  assetsForSlug,
  assetsForZipBundle,
  entitlementForPackageSlug,
  findAssetByFileId,
  listAllSourceSpecs,
  parseClientReferenceId,
  resolveAssetAbsolutePath,
  resolveFulfillmentOrder,
  resolveStoragePackageSlug,
} from '../lib/lesmateriaal-fulfillment';
import {
  getPakketBySlug,
  lessonDisplayCode,
  listShopPakketten,
} from '../app/lesmateriaal/lesmateriaal-data';

const H1_PRINT =
  '3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52';
const H1_BEAMER =
  'a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489';

const ROOT = process.cwd();

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

function sha256File(abs: string): string | null {
  if (!existsSync(abs)) return null;
  return createHash('sha256').update(readFileSync(abs)).digest('hex');
}

function countFileId(assets: { fileId: string }[], id: string): number {
  return assets.filter((a) => a.fileId === id).length;
}

// --- Source mapping ---
{
  const printSpec = listAllSourceSpecs().find((s) => s.fileId === 'g1-print');
  const beamerSpec = listAllSourceSpecs().find((s) => s.fileId === 'g1-beamer');
  const norm = (p: string) => p.replace(/\\/g, '/');
  assert(
    '1 g1-print source → H-ai/H1 print',
    !!printSpec &&
      norm(printSpec.sourceRel) ===
        'H-ai/H1-wat-kan-ai-voor-mij-doen/pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf',
  );
  assert(
    '2 g1-beamer source → H-ai/H1 beamer',
    !!beamerSpec &&
      norm(beamerSpec.sourceRel) ===
        'H-ai/H1-wat-kan-ai-voor-mij-doen/beamer/SeniorEase-H1-Beamer-v2.pdf',
  );
  assert(
    '3 g1 dest blijft pakket-g/g1-*',
    printSpec?.destRel.replace(/\\/g, '/') === 'pakket-g/g1-print.pdf' &&
      beamerSpec?.destRel.replace(/\\/g, '/') === 'pakket-g/g1-beamer.pdf',
  );
}

// --- Entitlements ---
assert('4 pakket-h-ai → AI_H', entitlementForPackageSlug('pakket-h-ai') === 'AI_H');
assert('5 pakket-g → AI_H', entitlementForPackageSlug('pakket-g') === 'AI_H');
assert(
  '6 pakket-g-telefoon → MOBILE_G',
  entitlementForPackageSlug('pakket-g-telefoon') === 'MOBILE_G',
);
assert(
  '7 storage h-ai → pakket-g',
  resolveStoragePackageSlug('pakket-h-ai') === 'pakket-g',
);
assert(
  '8 pakket-g NEVER MOBILE_G',
  entitlementForPackageSlug('pakket-g') !== 'MOBILE_G',
);

// --- Shop display ---
{
  const shop = listShopPakketten().find((p) => p.slug === 'pakket-h-ai');
  const first = shop?.lessons[0];
  assert('9 tech code G1', first?.code === 'G1');
  assert('10 displayCode H1', !!first && lessonDisplayCode(first) === 'H1');
  assert(
    '11 titel Wat kan AI voor mij doen?',
    first?.title === 'Wat kan AI voor mij doen?',
  );
  assert(
    '12 shop toont geen G1 als display voor eerste AI-les',
    !!first && lessonDisplayCode(first) !== 'G1',
  );
}

// --- Bron PDF hashes ---
{
  const printSrc = path.join(
    ROOT,
    'lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf',
  );
  const beamerSrc = path.join(
    ROOT,
    'lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/beamer/SeniorEase-H1-Beamer-v2.pdf',
  );
  assert('13 H1 bron print hash', sha256File(printSrc) === H1_PRINT);
  assert('14 H1 bron beamer hash', sha256File(beamerSrc) === H1_BEAMER);
}

// --- Private g1 hashes ---
{
  const printAsset = findAssetByFileId('g1-print')!;
  const beamerAsset = findAssetByFileId('g1-beamer')!;
  const printAbs = resolveAssetAbsolutePath(printAsset);
  const beamerAbs = resolveAssetAbsolutePath(beamerAsset);
  assert('15 private g1-print aanwezig', !!printAbs);
  assert('16 private g1-beamer aanwezig', !!beamerAbs);
  assert(
    '17 private g1-print = H1 hash',
    !!printAbs && sha256File(printAbs) === H1_PRINT,
  );
  assert(
    '18 private g1-beamer = H1 hash',
    !!beamerAbs && sha256File(beamerAbs) === H1_BEAMER,
  );
}

// --- los_g1 ---
{
  const order = resolveFulfillmentOrder(parseClientReferenceId('los_g1')!)!;
  const ids = order.assets.map((a) => a.fileId).sort();
  assert(
    '19 los_g1 → g1-print + g1-beamer',
    ids.join(',') === 'g1-beamer,g1-print',
  );
  assert(
    '20 los_g1 label H1',
    order.assets.every((a) => a.label.startsWith('H1')),
  );
}

// --- pakket orders ---
{
  const h = resolveFulfillmentOrder(parseClientReferenceId('pakket_pakket-h-ai')!)!;
  const g = resolveFulfillmentOrder(parseClientReferenceId('pakket_pakket-g')!)!;
  assert('21 pakket-h-ai heeft g1-print', countFileId(h.assets, 'g1-print') === 1);
  assert('22 pakket-h-ai heeft 8 g* assets', h.assets.filter((a) => a.fileId.startsWith('g')).length === 8);
  assert('23 legacy pakket-g werkt', !!g && g.assets.length === h.assets.length);
  assert(
    '24 geen MOBILE_G assets in AI pakket',
    h.assets.every((a) => a.fileId.startsWith('g')),
  );
}

// --- compleet / zip dedupe ---
{
  const compleet = resolveFulfillmentOrder(parseClientReferenceId('compleet_org')!)!;
  assert(
    '25 compleet_org g1-print één keer',
    countFileId(compleet.assets, 'g1-print') === 1,
  );
  assert(
    '26 compleet_org g1-beamer één keer',
    countFileId(compleet.assets, 'g1-beamer') === 1,
  );
  const zipH = assetsForZipBundle('zip-pakket-h-ai');
  const zipG = assetsForZipBundle('zip-pakket-g');
  assert('27 zip-pakket-h-ai g1-print één keer', countFileId(zipH, 'g1-print') === 1);
  assert('28 zip-pakket-g g1-print één keer', countFileId(zipG, 'g1-print') === 1);
  assert(
    '29 zip-h-ai === assetsForSlug h-ai',
    zipH.length === assetsForSlug('pakket-h-ai').length,
  );
}

// --- G2–G4 ongewijzigd (hashes van private, vastgelegd in 4C) ---
const G24_EXPECTED: Record<string, string> = {
  'g2-print': '091ca37ad2a98ccc7ef1eb87bb49b0f9c334d0024c8b1e8b8f691bb14a026760',
  'g2-beamer': '522bf077bfcaaaec7d744c09a50dcc0f3bc9563d82cd9c325b4fb7b5713c65ef',
  'g3-print': 'd40dcebffe4f201ab92159e4910bad916891b38293017551de0156618224b8fc',
  'g3-beamer': '0eb5ffb86ced6aba39a57e98d4a626a0e9411b148efaf5ef333053715ff00fa4',
  'g4-print': 'bf3d5f963134824a1c07bc46663e6b33dc1031622fcdc0d62a8047afffc7fb7a',
  'g4-beamer': '5af7827115bf4058035c670e036ca35ac9cd933c92f4170293000495ee92fc77',
};
for (const [fileId, expected] of Object.entries(G24_EXPECTED)) {
  const abs = resolveAssetAbsolutePath(findAssetByFileId(fileId)!);
  assert(`30 ${fileId} ongewijzigd`, !!abs && sha256File(abs) === expected);
}

// --- Labels canonical ---
{
  const a = assetsForSlug('pakket-h-ai').find((x) => x.fileId === 'g1-print');
  assert('31 download-label H1 print', !!a && a.label.startsWith('H1 —'));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
