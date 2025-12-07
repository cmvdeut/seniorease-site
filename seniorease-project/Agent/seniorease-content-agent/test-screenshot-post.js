#!/usr/bin/env node

/**
 * Test Screenshot Posting
 * Test of de FormData fix werkt met een echte screenshot post
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testScreenshotPost() {
  console.log('🧪 Testing Screenshot Posting met FormData Fix...\n');

  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  if (!pageAccessToken || !pageId) {
    console.error('❌ Facebook credentials niet gevonden in .env');
    process.exit(1);
  }

  // Zoek een screenshot
  const screenshotPath = path.join(__dirname, 'public/screenshots/Screenshot_1.png');
  
  if (!fs.existsSync(screenshotPath)) {
    console.error(`❌ Screenshot niet gevonden: ${screenshotPath}`);
    process.exit(1);
  }

  console.log(`✅ Screenshot gevonden: ${screenshotPath}`);
  const stats = fs.statSync(screenshotPath);
  console.log(`   Bestandsgrootte: ${(stats.size / 1024).toFixed(2)} KB\n`);

  try {
    console.log('📤 Posten naar Facebook...\n');
    
    const url = `https://graph.facebook.com/v18.0/${pageId}/photos`;
    
    // Gebruik de gefixte FormData code
    const formData = new FormData();
    formData.append('source', fs.createReadStream(screenshotPath), {
      filename: path.basename(screenshotPath),
      contentType: 'image/png'
    });
    formData.append('message', `🧪 Test: FormData Fix Werkt!\n\nDeze post test of de FormData fix correct werkt.\n\n✅ FormData package\n✅ File streams\n✅ Headers\n\n#SeniorEase #Test #FormDataFix`);
    formData.append('access_token', pageAccessToken);
    
    console.log('📋 FormData aangemaakt met:');
    console.log('   ✓ File stream');
    console.log('   ✓ Message');
    console.log('   ✓ Access token');
    console.log('   ✓ Headers:', Object.keys(formData.getHeaders()).join(', '));
    console.log('');
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Facebook API Error:', data.error.message);
      console.error('   Code:', data.error.code);
      console.error('   Type:', data.error.type);
      process.exit(1);
    }
    
    console.log('✅ SUCCESS! Screenshot gepost!');
    console.log('📊 Result:');
    console.log(`   Post ID: ${data.id}`);
    console.log(`   Link: https://www.facebook.com/${data.id}\n`);
    
    console.log('🎉 FormData Fix Werkt Perfect!');
    console.log('✅ Alle componenten werken:');
    console.log('   ✓ FormData package');
    console.log('   ✓ File streams');
    console.log('   ✓ Headers generatie');
    console.log('   ✓ Facebook API accepteert de request');
    console.log('   ✓ Screenshot succesvol geüpload\n');
    
    console.log('💡 Check je Facebook pagina om de post te zien!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

testScreenshotPost();





