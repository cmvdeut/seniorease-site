#!/usr/bin/env node
/**
 * Genereer één SeniorEase uitlegartikel via AI.
 * Gebruik: node generate-article.js "Onderwerp"
 * Of:     npm run generate-article -- "WhatsApp groep aanmaken"
 *
 * Vereist: .env met ANTHROPIC_API_KEY (zelfde als content-agent).
 */
import 'dotenv/config';
import { ArticleGenerator } from './lib/article-generator.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const topic = process.argv.slice(2).join(' ').trim();
if (!topic) {
  console.log('Gebruik: node generate-article.js "Onderwerp"');
  console.log('Voorbeeld: node generate-article.js "WhatsApp groep aanmaken"');
  process.exit(1);
}

async function main() {
  console.log('Genereren artikel voor:', topic);
  const gen = new ArticleGenerator();
  const article = await gen.generateArticle(topic);

  const outDir = join(process.cwd(), 'output');
  mkdirSync(outDir, { recursive: true });
  const slug = article.slug || topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const jsonPath = join(outDir, `artikel-${slug}.json`);
  writeFileSync(jsonPath, JSON.stringify(article, null, 2), 'utf8');
  console.log('Opgeslagen:', jsonPath);

  console.log('\n--- Preview ---');
  console.log('Slug:', article.slug);
  console.log('Title:', article.title);
  console.log('Description:', article.description);
  console.log('\nVoeg toe aan app/digitale-hulp/artikelen.ts en [slug]/page.tsx.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
