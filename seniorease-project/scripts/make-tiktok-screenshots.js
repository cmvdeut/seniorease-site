#!/usr/bin/env node
/**
 * TikTok Screenshots Generator
 * Maakt automatisch screenshots van seniorease.nl voor Invideo AI
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://seniorease.nl';
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots', 'tiktok');

// Screenshot configuratie
const screenshots = [
  {
    name: 'tiktok-1-homepage.png',
    url: BASE_URL,
    description: 'Homepage met logo',
    waitFor: 2000,
    scroll: false
  },
  {
    name: 'tiktok-2-barcode-scanner.png',
    url: `${BASE_URL}/bibliotheek`,
    description: 'Barcode scanner interface',
    waitFor: 2000,
    scroll: false,
    action: async (page) => {
      // Klik op "Nieuw Item Toevoegen" of "Barcode Scannen"
      try {
        const addButton = await page.locator('text=/Nieuw Item|Barcode Scannen|Toevoegen/i').first();
        if (await addButton.isVisible()) {
          await addButton.click();
          await page.waitForTimeout(1000);
        }
        // Klik op barcode scanner knop
        const scannerButton = await page.locator('text=/Barcode|Scannen/i').first();
        if (await scannerButton.isVisible()) {
          await scannerButton.click();
          await page.waitForTimeout(2000);
        }
      } catch (e) {
        console.log('Scanner button not found, taking screenshot of page');
      }
    }
  },
  {
    name: 'tiktok-3-zoekfunctie.png',
    url: `${BASE_URL}/bibliotheek`,
    description: 'Zoekfunctie met resultaten',
    waitFor: 2000,
    scroll: false,
    action: async (page) => {
      // Type in zoekbalk
      try {
        const searchInput = await page.locator('input[type="search"], input[placeholder*="zoek"], input[placeholder*="Zoek"]').first();
        if (await searchInput.isVisible()) {
          await searchInput.fill('Harry Potter');
          await page.waitForTimeout(1500);
        }
      } catch (e) {
        console.log('Search input not found');
      }
    }
  },
  {
    name: 'tiktok-4-bibliotheek-overzicht.png',
    url: `${BASE_URL}/bibliotheek`,
    description: 'Bibliotheek overzicht met meerdere boeken',
    waitFor: 2000,
    scroll: false
  },
  {
    name: 'tiktok-5-download-knop.png',
    url: BASE_URL,
    description: 'Download sectie op homepage',
    waitFor: 2000,
    scroll: true,
    scrollTo: 'download' // Scroll naar download sectie
  }
];

async function makeScreenshots() {
  console.log('🎬 Starting TikTok Screenshots Generator...\n');
  
  // Maak screenshots directory
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 }, // TikTok vertical format
    deviceScaleFactor: 2 // High DPI for sharp screenshots
  });
  
  const page = await context.newPage();
  
  try {
    for (let i = 0; i < screenshots.length; i++) {
      const config = screenshots[i];
      console.log(`📸 [${i + 1}/${screenshots.length}] Making screenshot: ${config.name}`);
      console.log(`   URL: ${config.url}`);
      console.log(`   Description: ${config.description}`);
      
      // Navigate to page
      await page.goto(config.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(config.waitFor);
      
      // Perform action if needed
      if (config.action) {
        console.log('   Performing action...');
        await config.action(page);
        await page.waitForTimeout(1000);
      }
      
      // Scroll if needed
      if (config.scroll) {
        if (config.scrollTo === 'download') {
          // Scroll naar download sectie
          await page.evaluate(() => {
            const downloadSection = document.querySelector('[id*="download"], [class*="download"], [id*="app"], [class*="app"]');
            if (downloadSection) {
              downloadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
          await page.waitForTimeout(1000);
        }
      }
      
      // Take screenshot
      const screenshotPath = path.join(SCREENSHOTS_DIR, config.name);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false, // Only viewport
        type: 'png'
      });
      
      console.log(`   ✅ Saved: ${screenshotPath}\n`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All screenshots created successfully!');
    console.log(`📁 Location: ${SCREENSHOTS_DIR}`);
    console.log('\n📋 Screenshots created:');
    screenshots.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.name} - ${s.description}`);
    });
    console.log('\n🎬 Ready to use in Invideo AI!');
    
  } catch (error) {
    console.error('❌ Error making screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  makeScreenshots().catch(console.error);
}

module.exports = { makeScreenshots };



