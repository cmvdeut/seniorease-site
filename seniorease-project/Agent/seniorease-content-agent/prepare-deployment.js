#!/usr/bin/env node

/**
 * Prepare for Vercel Deployment
 * ==============================
 * 
 * Kopieert screenshots naar public folder voor deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n📦 Preparing for Vercel Deployment\n');
console.log('===================================\n');

try {
  // Create public folder if it doesn't exist
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('✅ Created public/ directory');
  }

  // Create screenshots subfolder
  const publicScreenshotsDir = path.join(publicDir, 'screenshots');
  if (!fs.existsSync(publicScreenshotsDir)) {
    fs.mkdirSync(publicScreenshotsDir, { recursive: true });
    console.log('✅ Created public/screenshots/ directory');
  }

  // Copy screenshots from project root
  const sourceDir = path.resolve(__dirname, '../../screenshots');
  
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ Source screenshots directory not found:', sourceDir);
    process.exit(1);
  }

  // Get all PNG files
  const screenshots = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));
  
  console.log(`\n📸 Copying ${screenshots.length} screenshots...\n`);

  screenshots.forEach(screenshot => {
    const source = path.join(sourceDir, screenshot);
    const dest = path.join(publicScreenshotsDir, screenshot);
    
    fs.copyFileSync(source, dest);
    console.log(`   ✅ ${screenshot}`);
  });

  console.log('\n✅ All screenshots copied!\n');
  console.log('📂 Location: public/screenshots/\n');
  console.log('🚀 Je kunt nu deployen:\n');
  console.log('   vercel --prod\n');

} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}


