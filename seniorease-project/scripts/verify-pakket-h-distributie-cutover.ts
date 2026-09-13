/**
 * Pakket H distributie-cutover (H1–H4) — fase 3B.
 * Run: npx --yes tsx scripts/verify-pakket-h-distributie-cutover.ts
 *
 * Vereist: sync al gedraaid (private g1–g4 = frozen H1–H4 hashes).
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
  LOSSE_LES_PRIJS,
  ORG_COMPLEET_PRIJS,
  PAKKET_PRIJS,
} from '../app/lesmateriaal/lesmateriaal-data';

const FROZEN: Record<string, string> = {
  'H1-print':
    '3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52',
  'H1-beamer':
    'a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489',
  'H2-print':
    'f87db31cd768e2dcb49528a2e2e8e40b3ac1a3312a9dd21745f6c04fd6a15b2c',
  'H2-beamer':
    '216903cd1f4219c26075a1ea4eb24e214aae7f48c4c36d9415f2e2f2dd720c4f',
  'H3-print':
    '0ee16c7d67f9509986946221d1797bbda11ca25c62ef8f35cff8ebd88c9f8744',
  'H3-beamer':
    '919d426ce35aeedee453b2c6d2d2619c0d3fc9291709fac48aa0f6f9dba344f6',
  'H4-print':
    'afcf65e2c1acd9ddbc07bfc8812a1a2d63b21e01b1de8abe22d0b76390400782',
  'H4-beamer':
    'fc634a8f2f3918216bb30cd1c07c69e102c59fe59a3d59571e0c8cefa3092066',
};

const PRIVATE_EXPECTED: Record<string, string> = {
  'g1-print': FROZEN['H1-print']!,
  'g1-beamer': FROZEN['H1-beamer']!,
  'g2-print': FROZEN['H2-print']!,
  'g2-beamer': FROZEN['H2-beamer']!,
  'g3-print': FROZEN['H3-print']!,
  'g3-beamer': FROZEN['H3-beamer']!,
  'g4-print': FROZEN['H4-print']!,
  'g4-beamer': FROZEN['H4-beamer']!,
};

/** Pre-cutover G-v1 private hashes — mogen NIET meer actief zijn. */
const OLD_G_V1: Record<string, string> = {
  'g2-print': '091ca37ad2a98ccc7ef1eb87bb49b0f9c334d0024c8b1e8b8f691bb14a026760',
  'g2-beamer': '522bf077bfcaaaec7d744c09a50dcc0f3bc9563d82cd9c325b4fb7b5713c65ef',
  'g3-print': 'd40dcebffe4f201ab92159e4910bad916891b38293017551de0156618224b8fc',
  'g3-beamer': '0eb5ffb86ced6aba39a57e98d4a626a0e9411b148efaf5ef333053715ff00fa4',
  'g4-print': 'bf3d5f963134824a1c07bc46663e6b33dc1031622fcdc0d62a8047afffc7fb7a',
  'g4-beamer': '5af7827115bf4058035c670e036ca35ac9cd933c92f4170293000495ee92fc77',
};

const SOURCE_EXPECTED: Record<string, string> = {
  'g1-print':
    'H-ai/H1-wat-kan-ai-voor-mij-doen/pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf',
  'g1-beamer':
    'H-ai/H1-wat-kan-ai-voor-mij-doen/beamer/SeniorEase-H1-Beamer-v2.pdf',
  'g2-print':
    'H-ai/H2-een-ai-assistent-gebruiken/pdf/SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf',
  'g2-beamer':
    'H-ai/H2-een-ai-assistent-gebruiken/beamer/SeniorEase-H2-Beamer-v2.pdf',
  'g3-print':
    'H-ai/H3-betere-vragen-stellen-aan-ai/pdf/SeniorEase-H3-Betere-vragen-stellen-aan-AI-v2.pdf',
  'g3-beamer':
    'H-ai/H3-betere-vragen-stellen-aan-ai/beamer/SeniorEase-H3-Beamer-v2.pdf',
  'g4-print':
    'H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken/pdf/SeniorEase-H4-AI-antwoorden-controleren-en-veilig-gebruiken-v2.pdf',
  'g4-beamer':
    'H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken/beamer/SeniorEase-H4-Beamer-v2.pdf',
};

const LESSON_TITLES = [
  'Wat kan AI voor mij doen?',
  'Een AI-assistent gebruiken',
  'Betere vragen stellen aan AI',
  'AI-antwoorden controleren en veilig gebruiken',
] as const;

const H_INCLUDES = [
  'START HIER',
  'Draaiboek',
  'Beamer-PDF',
  'Hulp bij vastlopen',
  'Deelnemerskaart',
  'Zaalchecklist',
] as const;

const ROOT = process.cwd();
const norm = (p: string) => p.replace(/\\/g, '/');

let passed = 0;
let failed = 0;
let skipped = 0;

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

// --- A frozen H1–H4 source hash gates ---
{
  const paths: [string, string][] = [
    ['H1-print', 'lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf'],
    ['H1-beamer', 'lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/beamer/SeniorEase-H1-Beamer-v2.pdf'],
    ['H2-print', 'lesmateriaal/H-ai/H2-een-ai-assistent-gebruiken/pdf/SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf'],
    ['H2-beamer', 'lesmateriaal/H-ai/H2-een-ai-assistent-gebruiken/beamer/SeniorEase-H2-Beamer-v2.pdf'],
    ['H3-print', 'lesmateriaal/H-ai/H3-betere-vragen-stellen-aan-ai/pdf/SeniorEase-H3-Betere-vragen-stellen-aan-AI-v2.pdf'],
    ['H3-beamer', 'lesmateriaal/H-ai/H3-betere-vragen-stellen-aan-ai/beamer/SeniorEase-H3-Beamer-v2.pdf'],
    ['H4-print', 'lesmateriaal/H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken/pdf/SeniorEase-H4-AI-antwoorden-controleren-en-veilig-gebruiken-v2.pdf'],
    ['H4-beamer', 'lesmateriaal/H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken/beamer/SeniorEase-H4-Beamer-v2.pdf'],
  ];
  for (const [key, rel] of paths) {
    assert(
      `A frozen ${key}`,
      sha256File(path.join(ROOT, rel)) === FROZEN[key],
    );
  }
}

// --- B G/H collision: tech G* · display H* · storage pakket-g · canonical h-ai ---
assert('B1 tech codes G1-G4', getPakketBySlug('pakket-h-ai')!.lessons.every((l) => /^G[1-4]$/.test(l.code)));
assert(
  'B2 display H1-H4',
  getPakketBySlug('pakket-h-ai')!.lessons.map(lessonDisplayCode).join(',') === 'H1,H2,H3,H4',
);
assert('B3 storage h-ai → pakket-g', resolveStoragePackageSlug('pakket-h-ai') === 'pakket-g');
assert('B4 storage legacy-g → pakket-g', resolveStoragePackageSlug('pakket-g') === 'pakket-g');
assert(
  'B5 mobile storage ≠ AI',
  resolveStoragePackageSlug('pakket-g-telefoon') === 'pakket-f-telefoon',
);

// --- C canonical routes ---
assert('C1 pakket-h-ai → AI_H', entitlementForPackageSlug('pakket-h-ai') === 'AI_H');
assert(
  'C2 pakket-g-telefoon → MOBILE_G',
  entitlementForPackageSlug('pakket-g-telefoon') === 'MOBILE_G',
);
assert('C3 shop heeft pakket-h-ai', !!listShopPakketten().find((p) => p.slug === 'pakket-h-ai'));

// --- D legacy routes ---
assert('D1 pakket-g → AI_H', entitlementForPackageSlug('pakket-g') === 'AI_H');
assert('D2 pakket-g NEVER MOBILE_G', entitlementForPackageSlug('pakket-g') !== 'MOBILE_G');
assert('D3 legacy pakket-g resolveerbaar', !!getPakketBySlug('pakket-g'));
assert(
  'D4 legacy f-telefoon → MOBILE_G',
  entitlementForPackageSlug('pakket-f-telefoon') === 'MOBILE_G',
);

// --- E shop display ---
{
  const shop = listShopPakketten().find((p) => p.slug === 'pakket-h-ai')!;
  const legacy = getPakketBySlug('pakket-g')!;
  assert(
    'E1 productnaam',
    shop.title === 'Pakket H — AI in het dagelijks leven',
  );
  assert(
    'E2 H1–H4 titels',
    shop.lessons.map((l) => l.title).join('|') === LESSON_TITLES.join('|'),
  );
  assert(
    'E3 includes exact zes H-delen',
    shop.includes.join('|') === H_INCLUDES.join('|'),
  );
  assert(
    'E4 geen oefentaken/nazorg',
    !shop.includes.some((i) => /oefentaken|nazorg/i.test(i)),
  );
  assert('E5 prijzen ongewijzigd', shop.price === PAKKET_PRIJS && PAKKET_PRIJS === 19.95);
  assert('E6 losse les prijs', LOSSE_LES_PRIJS === 6.95);
  assert('E7 compleet prijs', ORG_COMPLEET_PRIJS === 149);
  assert(
    'E8 legacy customer-facing aligned',
    legacy.title === shop.title &&
      legacy.lessons.map(lessonDisplayCode).join(',') === 'H1,H2,H3,H4' &&
      legacy.lessons.map((l) => l.title).join('|') === LESSON_TITLES.join('|'),
  );
  assert(
    'E9 mobile G titel ongewijzigd',
    getPakketBySlug('pakket-g-telefoon')!.title === 'Internet — telefoon/tablet',
  );
}

// --- F los_g1–g4 ---
for (const n of [1, 2, 3, 4] as const) {
  const ref = `los_g${n}`;
  const order = resolveFulfillmentOrder(parseClientReferenceId(ref)!)!;
  const ids = order.assets.map((a) => a.fileId).sort();
  assert(
    `F${n}a ${ref} → g${n}-print+beamer`,
    ids.join(',') === `g${n}-beamer,g${n}-print`,
  );
  assert(
    `F${n}b ${ref} label H${n}`,
    order.assets.every((a) => a.label.startsWith(`H${n}`)),
  );
}

// --- G / H package refs ---
{
  const h = resolveFulfillmentOrder(parseClientReferenceId('pakket_pakket-h-ai')!)!;
  const g = resolveFulfillmentOrder(parseClientReferenceId('pakket_pakket-g')!)!;
  const gIds = h.assets.filter((a) => a.fileId.startsWith('g')).map((a) => a.fileId).sort();
  assert('G1 pakket-h-ai 8 g* assets', gIds.length === 8);
  assert(
    'G2 elke g* exact 1×',
    ['g1-print', 'g1-beamer', 'g2-print', 'g2-beamer', 'g3-print', 'g3-beamer', 'g4-print', 'g4-beamer'].every(
      (id) => countFileId(h.assets, id) === 1,
    ),
  );
  assert('H1 legacy pakket-gzelfde lengte', g.assets.length === h.assets.length);
  assert(
    'H2 geen ft* in AI pakket',
    h.assets.every((a) => a.fileId.startsWith('g') && !a.fileId.startsWith('ft')),
  );
}

// --- I ZIP exact 8 ---
{
  const zipH = assetsForZipBundle('zip-pakket-h-ai');
  const zipG = assetsForZipBundle('zip-pakket-g');
  assert('I1 zip-h-ai length 8', zipH.length === 8);
  assert('I2 zip-g length 8', zipG.length === 8);
  assert(
    'I3 zip-h === assetsForSlug h-ai',
    zipH.length === assetsForSlug('pakket-h-ai').length,
  );
  assert(
    'I4 geen ft* in AI zip',
    zipH.every((a) => a.fileId.startsWith('g')),
  );
  for (const id of Object.keys(PRIVATE_EXPECTED)) {
    assert(`I5 zip-h ${id} 1×`, countFileId(zipH, id) === 1);
  }
}

// --- J complete dedupe ---
{
  const compleet = resolveFulfillmentOrder(parseClientReferenceId('compleet_org')!)!;
  for (const id of Object.keys(PRIVATE_EXPECTED)) {
    assert(`J1 compleet ${id} 1×`, countFileId(compleet.assets, id) === 1);
  }
  for (const id of ['ft1-print', 'ft1-beamer', 'ft4-print', 'ft4-beamer']) {
    assert(`J2 compleet ${id} 1×`, countFileId(compleet.assets, id) === 1);
  }
  assert(
    'J3 compleet g* count 8',
    compleet.assets.filter((a) => /^g[1-4]-(print|beamer)$/.test(a.fileId)).length === 8,
  );
}

// --- K entitlement resolution ---
assert('K1 AI_H', entitlementForPackageSlug('pakket-h-ai') === 'AI_H');
assert('K2 legacy AI_H', entitlementForPackageSlug('pakket-g') === 'AI_H');
assert('K3 MOBILE_G', entitlementForPackageSlug('pakket-g-telefoon') === 'MOBILE_G');

// --- L PACKAGE_SOURCE H-ai · geen G2–G4 v1 fallback path ---
{
  const specs = listAllSourceSpecs();
  for (const [fileId, expectedRel] of Object.entries(SOURCE_EXPECTED)) {
    const spec = specs.find((s) => s.fileId === fileId);
    assert(
      `L1 ${fileId} source → H-ai`,
      !!spec && norm(spec.sourceRel) === expectedRel,
      spec ? norm(spec.sourceRel) : 'missing',
    );
    assert(
      `L2 ${fileId} dest pakket-g`,
      !!spec && norm(spec.destRel) === `pakket-g/${fileId}.pdf`,
    );
    assert(
      `L3 ${fileId} geen G-ai path`,
      !!spec && !norm(spec.sourceRel).includes('G-ai/'),
    );
  }
}

// --- Private hashes = frozen · old G-v1 gone ---
for (const [fileId, expected] of Object.entries(PRIVATE_EXPECTED)) {
  const abs = resolveAssetAbsolutePath(findAssetByFileId(fileId)!);
  const hash = abs ? sha256File(abs) : null;
  assert(`N private ${fileId} = frozen H`, hash === expected);
  if (OLD_G_V1[fileId]) {
    assert(`N ${fileId} niet meer oude G-v1`, hash !== OLD_G_V1[fileId]);
  }
}

// --- M mobile ft* unchanged vs snapshot file if present ---
{
  const snapPath = path.join(ROOT, '.tmp-h-cutover-snapshot.json');
  if (!existsSync(snapPath)) {
    skipped += 1;
    console.log('SKIP  M mobile ft* snapshot (.tmp-h-cutover-snapshot.json ontbreekt)');
  } else {
    const snap = JSON.parse(readFileSync(snapPath, 'utf8')) as {
      'pakket-f-telefoon'?: Record<string, string>;
    };
    const expectedFt = snap['pakket-f-telefoon'] ?? {};
    const ftDir = path.join(ROOT, 'private/lesmateriaal-downloads/pakket-f-telefoon');
    const names = Object.keys(expectedFt).sort();
    assert('M1 ft* snapshot heeft 8', names.length === 8);
    for (const name of names) {
      const abs = path.join(ftDir, name);
      assert(`M2 ${name} unchanged`, sha256File(abs) === expectedFt[name]);
    }
  }
}

// --- O no forbidden config drift (spot-check known success URL + sync mirror) ---
{
  const syncSrc = readFileSync(path.join(ROOT, 'scripts/sync-lesmateriaal-downloads.js'), 'utf8');
  assert(
    'O1 sync maps G2→H2',
    syncSrc.includes("H2-een-ai-assistent-gebruiken") &&
      syncSrc.includes('SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf'),
  );
  assert(
    'O2 sync maps G3→H3',
    syncSrc.includes('H3-betere-vragen-stellen-aan-ai'),
  );
  assert(
    'O3 sync maps G4→H4',
    syncSrc.includes('H4-ai-antwoorden-controleren-en-veilig-gebruiken'),
  );
  assert(
    'O4 mobile Ft mapping ongewijzigd in sync',
    syncSrc.includes("['Ft1', 'Ft1-zoeken', 'SeniorEase-G1-Zoeken-internet-v2.pdf'") &&
      syncSrc.includes("['Ft4', 'Ft4-formulieren-downloads', 'SeniorEase-G4-Online-formulieren-v2.pdf'"),
  );
  // Stripe success URL contract — bedankt client leest session_id (niet wijzigen)
  const bedanktClient = path.join(ROOT, 'app/lesmateriaal/bedankt/BedanktClient.tsx');
  if (!existsSync(bedanktClient)) {
    skipped += 1;
    console.log('SKIP  O5 bedankt client ontbreekt');
  } else {
    const txt = readFileSync(bedanktClient, 'utf8');
    assert('O5 bedankt blijft session_id contract', /session_id/.test(txt));
  }
}

console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);
if (failed > 0) process.exit(1);
