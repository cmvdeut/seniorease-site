/**
 * Regressie: Next.js past outputFileTracingExcludes ná Includes toe.
 * Een globale exclude van ./private/** wist PDF/ZIP’s weer uit de download-functions.
 *
 * Run: npx --yes tsx scripts/verify-download-tracing-config.ts
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const requireConfig = createRequire(path.join(root, 'package.json'));

function loadNextConfig(): {
  outputFileTracingExcludes?: Record<string, string[]>;
  outputFileTracingIncludes?: Record<string, string[]>;
} {
  // next.config.js is CJS
  const configPath = path.join(root, 'next.config.js');
  delete requireConfig.cache[requireConfig.resolve(configPath)];
  return requireConfig(configPath);
}

function flatten(globs: Record<string, string[]> | undefined): string[] {
  if (!globs) return [];
  return Object.values(globs).flat();
}

function main() {
  const src = fs.readFileSync(path.join(root, 'next.config.js'), 'utf8');
  const config = loadNextConfig();
  const excludes = flatten(config.outputFileTracingExcludes);
  const includes = config.outputFileTracingIncludes || {};

  // 1) Globale private-exclude mag niet terugkomen (wist includes).
  for (const g of excludes) {
    assert.notEqual(
      g.replace(/\\/g, '/'),
      './private/**',
      'outputFileTracingExcludes must not contain ./private/** (strips download includes)',
    );
    assert.equal(
      /(?:^|\/)private\/\*\*$/.test(g.replace(/\\/g, '/')),
      false,
      `outputFileTracingExcludes must not globally wipe private downloads: ${g}`,
    );
  }
  assert.doesNotMatch(src, /outputFileTracingExcludes[\s\S]*?['"]\.\/private\/\*\*['"]/);

  // 2) Includes voor lesmateriaal + ChatGPT blijven staan.
  const downloadIncludes = includes['/api/lesmateriaal/download'] || [];
  const chatgptIncludes = includes['/api/lesmateriaal/chatgpt-download'] || [];
  assert.ok(downloadIncludes.length > 0, 'download includes missing');
  assert.ok(chatgptIncludes.length > 0, 'chatgpt-download includes missing');
  assert.ok(
    downloadIncludes.some((g) => g.includes('pakket-g')),
    'download includes must cover pakket-g (H1/G1 PDFs)',
  );
  assert.ok(
    downloadIncludes.every((g) => g.startsWith('./private/lesmateriaal-downloads/')),
    'download includes must stay under private/lesmateriaal-downloads',
  );
  assert.ok(
    chatgptIncludes.every((g) => g.startsWith('./private/lesmateriaal-downloads/chatgpt')),
    'chatgpt includes must stay under private/lesmateriaal-downloads/chatgpt',
  );

  // 3) Geen publieke static export van private downloads.
  assert.doesNotMatch(src, /public\/lesmateriaal-downloads/);
  assert.match(src, /\/api\/lesmateriaal\/download/);
  assert.match(src, /\/api\/lesmateriaal\/chatgpt-download/);

  // 4) Zware bronmappen blijven wel excluded (Hobby storage).
  assert.ok(excludes.some((g) => g.includes('lesmateriaal/**')));
  assert.ok(excludes.some((g) => g.includes('contentplan/**')));

  console.log('PASS  download tracing config: private includes survive excludes');
  console.log('PASS  download/chatgpt includes scoped to private/lesmateriaal-downloads');
  console.log('PASS  no public/lesmateriaal-downloads exposure in next.config');
}

main();
