/**
 * Regressie: klantgerichte lestitels/labels volgen PDF-inhoud;
 * technische fileIds blijven stabiel; E3-bronnaam blijft synchroon.
 *
 * Run: npx --yes tsx scripts/verify-catalog-title-consistency.ts
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getPakketBySlug,
  lessonDisplayCode,
  listRoutablePakketten,
  listShopPakketten,
} from '../app/lesmateriaal/lesmateriaal-data';
import { resolveCheckoutCatalogEntry } from '../lib/lesmateriaal-checkout-catalog';
import {
  assetsForSlug,
  parseClientReferenceId,
  resolveFulfillmentOrder,
} from '../lib/lesmateriaal-fulfillment';

const root = process.cwd();

function expectedTitles(): Array<{
  slug: string;
  techCode: string;
  displayCode: string;
  title: string;
}> {
  return [
    {
      slug: 'pakket-a',
      techCode: 'A1',
      displayCode: 'A1',
      title: 'Weer thuis op mijn telefoon',
    },
    {
      slug: 'pakket-g-telefoon',
      techCode: 'Ft1',
      displayCode: 'G1',
      title: 'Zoeken op internet',
    },
    {
      slug: 'pakket-g-telefoon',
      techCode: 'Ft2',
      displayCode: 'G2',
      title: 'Websites en tabbladen gebruiken',
    },
    {
      slug: 'pakket-g-telefoon',
      techCode: 'Ft3',
      displayCode: 'G3',
      title: 'Een website openen vanaf een QR-code',
    },
    {
      slug: 'pakket-g-telefoon',
      techCode: 'Ft4',
      displayCode: 'G4',
      title: 'Online formulieren invullen',
    },
    {
      slug: 'pakket-h-ai',
      techCode: 'G1',
      displayCode: 'H1',
      title: 'Wat kan AI voor mij doen?',
    },
  ];
}

function extractPrintNames(source: string): Map<string, string> {
  const map = new Map<string, string>();
  const re =
    /code:\s*'([^']+)'[\s\S]*?printName:\s*'([^']+)'[\s\S]*?beamerName:\s*'([^']+)'/g;
  for (const m of source.matchAll(re)) {
    map.set(m[1], m[2]);
  }
  return map;
}

function extractSyncPrintNames(source: string): Map<string, string> {
  const map = new Map<string, string>();
  const re =
    /\['([^']+)',\s*'[^']+',\s*'([^']+)',\s*'([^']+)'(?:,\s*'[^']+')?\]/g;
  for (const m of source.matchAll(re)) {
    map.set(m[1], m[2]);
  }
  return map;
}

function main() {
  // 1) Shop + legacy catalogustitels
  for (const row of expectedTitles()) {
    const shop = getPakketBySlug(row.slug);
    assert.ok(shop, `missing package ${row.slug}`);
    const les = shop!.lessons.find((l) => l.code === row.techCode);
    assert.ok(les, `missing lesson ${row.techCode} on ${row.slug}`);
    assert.equal(lessonDisplayCode(les!), row.displayCode);
    assert.equal(les!.title, row.title);
  }

  const legacyMobile = getPakketBySlug('pakket-f-telefoon');
  assert.ok(legacyMobile);
  assert.equal(
    legacyMobile!.lessons.find((l) => l.code === 'Ft1')?.title,
    'Zoeken op internet',
  );
  assert.equal(
    lessonDisplayCode(legacyMobile!.lessons.find((l) => l.code === 'Ft1')!),
    'G1',
  );

  // 2) Fulfillment order labels (Brevo/bedankt) gebruiken displayCode
  const a1 = resolveFulfillmentOrder({
    ...parseClientReferenceId('los_a1')!,
    email: 'audit@example.com',
  });
  assert.equal(a1?.label, 'Losse les — A1: Weer thuis op mijn telefoon');

  const ft1 = resolveFulfillmentOrder({
    ...parseClientReferenceId('los_ft1')!,
    email: 'audit@example.com',
  });
  assert.equal(ft1?.label, 'Losse les — G1: Zoeken op internet');
  assert.ok(ft1?.assets.every((a) => a.fileId.startsWith('ft1-')));

  const g1 = resolveFulfillmentOrder({
    ...parseClientReferenceId('los_g1')!,
    email: 'audit@example.com',
  });
  assert.equal(g1?.label, 'Losse les — H1: Wat kan AI voor mij doen?');
  assert.ok(g1?.assets.every((a) => a.fileId.startsWith('g1-')));
  assert.ok(g1?.assets.some((a) => a.label.startsWith('H1 —')));

  // 3) Checkout catalog labels (Sessions) blijven displayCode + nieuwe titel
  assert.equal(
    resolveCheckoutCatalogEntry('los_a1')?.productLabel,
    'Losse les A1: Weer thuis op mijn telefoon',
  );
  assert.equal(
    resolveCheckoutCatalogEntry('los_ft1')?.productLabel,
    'Losse les G1: Zoeken op internet',
  );
  assert.equal(
    resolveCheckoutCatalogEntry('los_g1')?.productLabel,
    'Losse les H1: Wat kan AI voor mij doen?',
  );

  // 4) Interne refs stabiel: alle shop lessen blijven resolvebaar
  for (const p of listShopPakketten()) {
    for (const les of p.lessons) {
      const ref = `los_${les.code.toLowerCase()}`;
      const order = resolveFulfillmentOrder({
        ...parseClientReferenceId(ref)!,
        email: 'audit@example.com',
      });
      assert.ok(order, `unresolved ${ref}`);
      assert.equal(order!.assets.length, 2);
      assert.match(order!.label, new RegExp(`^Losse les — ${lessonDisplayCode(les)}:`));
    }
  }

  // 5) E3 printName sync ↔ fulfillment + bronbestand
  const fulSrc = fs.readFileSync(
    path.join(root, 'lib/lesmateriaal-fulfillment.ts'),
    'utf8',
  );
  const syncSrc = fs.readFileSync(
    path.join(root, 'scripts/sync-lesmateriaal-downloads.js'),
    'utf8',
  );
  assert.match(fulSrc, /SeniorEase-E3-Iets-Regelen-v2\.pdf/);
  assert.doesNotMatch(fulSrc, /SeniorEase-E3-Gemeente-Belastingdienst-v2\.pdf/);
  assert.match(syncSrc, /SeniorEase-E3-Iets-Regelen-v2\.pdf/);

  const fulPrint = extractPrintNames(fulSrc);
  const syncPrint = extractSyncPrintNames(syncSrc);
  for (const [code, printName] of fulPrint) {
    assert.equal(
      syncPrint.get(code),
      printName,
      `printName drift for ${code}: fulfillment=${printName} sync=${syncPrint.get(code)}`,
    );
  }

  const e3Source = path.join(
    root,
    'lesmateriaal/E-digid/E3-gemeente-belastingdienst/pdf/SeniorEase-E3-Iets-Regelen-v2.pdf',
  );
  assert.equal(fs.existsSync(e3Source), true, 'E3 print source missing');

  // 6) Print/beamer private pairs aanwezig voor gecorrigeerde lessen
  for (const slug of ['pakket-a', 'pakket-g-telefoon', 'pakket-h-ai', 'pakket-e']) {
    const assets = assetsForSlug(slug);
    assert.ok(assets.length >= 8, `${slug} should have print+beamer assets`);
    for (const asset of assets) {
      const abs = path.join(root, 'private/lesmateriaal-downloads', asset.relativePath);
      assert.equal(fs.existsSync(abs), true, `missing private asset ${asset.relativePath}`);
    }
  }

  // 7) Geen regressie: routable catalogus blijft A–H + legacy
  assert.ok(listRoutablePakketten().length >= listShopPakketten().length);

  console.log('PASS  catalog titles match PDF-facing names (A1, G1–G4, H1)');
  console.log('PASS  fulfillment/checkout labels use lessonDisplayCode');
  console.log('PASS  fileIds unchanged (ft*/g*)');
  console.log('PASS  E3 printName aligned across fulfillment + sync');
}

main();
