#!/usr/bin/env node

/**
 * Post Screenshots to Facebook
 * ============================
 * 
 * Dit script post de SeniorEase app screenshots naar Facebook
 * met ready-to-use content uit de strategie.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Posts uit de strategie
const POSTS = [
  {
    screenshot: 'Screenshot_1.png',
    message: `📚 Houd je boekcollectie overzichtelijk met SeniorEase Bibliotheek!

Nooit meer vergeten welke boeken je al hebt of welke je al gelezen hebt. 
Met onze app beheer je eenvoudig je persoonlijke bibliotheek.

✅ Overzichtelijke lijst
✅ Zoek- en filterfunctie
✅ "Gelezen" en "In bezit" bijhouden
✅ Speciaal ontworpen voor senioren

Probeer het gratis! 👉 https://seniorease.nl

#SeniorEase #Bibliotheek #Boeken #Lezen #Senioren #Nederland`,
    title: 'Introductie - Bibliotheek Hoofdscherm'
  },
  {
    screenshot: 'Screenshot_2.png',
    message: `🔍 Boeken toevoegen in een paar seconden!

Gewoon de barcode scannen en alle informatie wordt automatisch ingevuld:
📖 Titel
✍️ Auteur  
🔢 ISBN code

Of vul het handmatig in - jij kiest wat makkelijker is!

Download SeniorEase Bibliotheek vandaag nog 📱

Meer info: https://seniorease.nl

#SeniorEase #BarcodeScan #Gebruiksvriendelijk #TechVoorSenioren`,
    title: 'Feature - Barcode Scanner'
  },
  {
    screenshot: 'Screenshot_4.png',
    message: `💡 Slimme technologie in een simpele app!

SeniorEase Bibliotheek vindt automatisch de boekomslag voor je via Google Afbeeldingen. 
Zo zie je direct welk boek het is - perfect voor een mooi overzicht! 📚✨

Geen gedoe met foto's uploaden, de app doet het werk voor jou.

Probeer het nu gratis! 👉 https://seniorease.nl

#SeniorEase #SmarteTechnologie #Bibliotheek #Gebruiksvriendelijk`,
    title: 'Feature - Google Integratie'
  },
  {
    screenshot: 'Screenshot_5.png',
    message: `🔒 Jouw gegevens zijn veilig bij ons!

SeniorEase Bibliotheek biedt:

✅ Backup maken - nooit meer je lijst kwijt
✅ Exporteren naar CSV of PDF  
✅ Privacy bescherming
✅ Offline gebruik mogelijk

Jouw boekcollectie, jouw gegevens, jouw controle.

Download nu 📲 https://seniorease.nl

#Privacy #Veiligheid #SeniorEase #Bibliotheek #Dataprotectie`,
    title: 'Feature - Veiligheid & Privacy'
  },
  {
    screenshot: 'Screenshot_3.png',
    message: `🌍 Nederlands, Engels of een andere taal?

SeniorEase Bibliotheek spreekt jouw taal! 
Perfect voor:
• Nederlandstaligen in het buitenland
• Internationale families  
• Meertalige lezers

Één app, meerdere talen, eindeloze mogelijkheden! 📚

Probeer gratis: https://seniorease.nl

#SeniorEase #Meertalig #Inclusief #Bibliotheek #Nederlands #Engels`,
    title: 'Feature - Meertalig'
  }
];

// Config check
function checkConfig() {
  const required = ['FACEBOOK_PAGE_ACCESS_TOKEN', 'FACEBOOK_PAGE_ID'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('\n❌ ERROR: Missing required environment variables:\n');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\n📋 Setup instructies:');
    console.error('   1. Kopieer ENV-TEMPLATE.txt naar .env');
    console.error('   2. Vul je Facebook credentials in');
    console.error('   3. Run dit script opnieuw\n');
    console.error('💡 Zie: FACEBOOK-PAGE-TOKEN-FIX.md voor token instructies\n');
    process.exit(1);
  }
}

// Post photo to Facebook
async function postPhotoToFacebook(imagePath, message) {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  const url = `https://graph.facebook.com/v18.0/${pageId}/photos`;
  
  // Create FormData with file stream
  const formData = new FormData();
  formData.append('source', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: 'image/png'
  });
  formData.append('message', message);
  formData.append('access_token', pageAccessToken);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }
    
    return data;
  } catch (error) {
    throw new Error(`Failed to post photo: ${error.message}`);
  }
}

// Main function
async function main() {
  console.log('\n📸 SeniorEase Screenshot Poster\n');
  console.log('================================\n');
  
  // Check config
  checkConfig();
  
  // Get command line args
  const args = process.argv.slice(2);
  
  // Show menu if no args
  if (args.length === 0) {
    console.log('📋 Beschikbare posts:\n');
    POSTS.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
      console.log(`      Screenshot: ${post.screenshot}`);
      console.log(`      Preview: ${post.message.substring(0, 60)}...`);
      console.log('');
    });
    console.log('📖 Gebruik:\n');
    console.log('   # Post één specifieke screenshot:');
    console.log('   node post-screenshots.js 1\n');
    console.log('   # Post alle screenshots (met 30 sec pauze):');
    console.log('   node post-screenshots.js all\n');
    console.log('   # Dry run (test zonder te posten):');
    console.log('   node post-screenshots.js --dry-run 1\n');
    return;
  }
  
  const isDryRun = args.includes('--dry-run');
  const postArg = args.find(arg => !arg.startsWith('--'));
  
  // Determine which posts to make
  let postsToMake = [];
  if (postArg === 'all') {
    postsToMake = POSTS.map((post, index) => ({ ...post, index }));
  } else {
    const index = parseInt(postArg) - 1;
    if (isNaN(index) || index < 0 || index >= POSTS.length) {
      console.error(`❌ Ongeldige post nummer. Kies 1-${POSTS.length} of 'all'\n`);
      process.exit(1);
    }
    postsToMake = [{ ...POSTS[index], index }];
  }
  
  // Get screenshots base path
  const projectRoot = path.resolve(__dirname, '../..');
  const screenshotsPath = path.join(projectRoot, 'screenshots');
  
  console.log(`📂 Screenshots folder: ${screenshotsPath}\n`);
  
  // Process posts
  for (let i = 0; i < postsToMake.length; i++) {
    const post = postsToMake[i];
    const imagePath = path.join(screenshotsPath, post.screenshot);
    
    console.log(`\n📸 Post ${i + 1}/${postsToMake.length}: ${post.title}`);
    console.log(`   Screenshot: ${post.screenshot}`);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.error(`   ❌ Screenshot niet gevonden: ${imagePath}`);
      continue;
    }
    
    if (isDryRun) {
      console.log('   🔍 DRY RUN - zou deze tekst posten:\n');
      console.log('   ' + post.message.split('\n').join('\n   '));
      console.log('\n   ✅ Dry run succesvol (niet echt gepost)');
    } else {
      try {
        console.log('   📤 Posten naar Facebook...');
        const result = await postPhotoToFacebook(imagePath, post.message);
        console.log(`   ✅ Succesvol gepost! Post ID: ${result.id}`);
        console.log(`   🔗 Link: https://www.facebook.com/${result.id}`);
      } catch (error) {
        console.error(`   ❌ Fout: ${error.message}`);
      }
    }
    
    // Wait between posts to avoid rate limiting
    if (i < postsToMake.length - 1 && !isDryRun) {
      console.log('\n   ⏱️  Wachten 30 seconden...');
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
  
  console.log('\n\n✅ Klaar!\n');
  
  if (!isDryRun) {
    console.log('📊 Check je posts op:');
    console.log(`   https://www.facebook.com/senioreasenl\n`);
  }
}

// Run
main().catch(error => {
  console.error('\n❌ Onverwachte fout:', error.message);
  console.error('\n💡 Probeer:');
  console.error('   - Check je .env configuratie');
  console.error('   - Vernieuw je Facebook token');
  console.error('   - Zie: FACEBOOK-PAGE-TOKEN-FIX.md\n');
  process.exit(1);
});

