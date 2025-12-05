import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';
import { promisify } from 'util';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = promisify((prompt, callback) => {
  rl.question(prompt, callback);
});

async function getPageToken() {
  console.log('🔑 Facebook Page Token Ophalen\n');
  console.log('Je hebt een User Access Token nodig met deze permissions:');
  console.log('  - pages_show_list');
  console.log('  - pages_manage_posts\n');
  
  const userToken = await question('Plak je User Access Token (van Graph API Explorer): ');
  
  if (!userToken || !userToken.startsWith('EAA')) {
    console.error('❌ Ongeldige token. Token moet beginnen met EAA');
    process.exit(1);
  }

  try {
    console.log('\n📡 Ophalen van je pagina\'s...\n');
    
    // Haal alle pagina's op waar je admin van bent
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${userToken}&fields=id,name,access_token`
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error:', data.error.message);
      console.error('\n💡 Mogelijke oorzaken:');
      console.error('  - Token heeft niet de juiste permissions');
      console.error('  - Token is verlopen');
      console.error('  - Je bent geen admin van een pagina');
      process.exit(1);
    }
    
    if (!data.data || data.data.length === 0) {
      console.error('❌ Geen pagina\'s gevonden waar je admin van bent.');
      console.error('\n💡 Oplossingen:');
      console.error('  1. Zorg dat je admin bent van je Facebook pagina');
      console.error('  2. Gebruik een User Token met pages_show_list permission');
      process.exit(1);
    }
    
    console.log('✅ Gevonden pagina\'s:\n');
    
    data.data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name}`);
      console.log(`   Page ID: ${page.id}`);
      console.log(`   Page Token: ${page.access_token.substring(0, 30)}...\n`);
    });
    
    if (data.data.length === 1) {
      const page = data.data[0];
      console.log('📝 Automatisch geselecteerd (alleen 1 pagina gevonden):');
      console.log(`   Pagina: ${page.name}`);
      console.log(`   Page ID: ${page.id}\n`);
      
      console.log('📋 Update je .env file met:');
      console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${page.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${page.id}\n`);
      
      // Update Vercel?
      const updateVercel = await question('Wil je dit direct toevoegen aan Vercel? (j/n): ');
      
      if (updateVercel.toLowerCase() === 'j' || updateVercel.toLowerCase() === 'y') {
        console.log('\n🔄 Updating Vercel...');
        
        // Remove old token
        const { execSync } = await import('child_process');
        try {
          execSync(`echo "${page.access_token}" | vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes`, { stdio: 'inherit' });
        } catch (e) {
          // Ignore if doesn't exist
        }
        
        execSync(`echo "${page.access_token}" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production`, { stdio: 'inherit' });
        execSync(`echo "${page.id}" | vercel env add FACEBOOK_PAGE_ID production`, { stdio: 'inherit' });
        
        console.log('\n✅ Vercel environment variables bijgewerkt!');
        console.log('💡 Run: vercel --prod om te deployen\n');
      }
      
    } else {
      const choice = await question(`\nWelke pagina wil je gebruiken? (1-${data.data.length}): `);
      const pageIndex = parseInt(choice) - 1;
      
      if (pageIndex < 0 || pageIndex >= data.data.length) {
        console.error('❌ Ongeldige keuze');
        process.exit(1);
      }
      
      const page = data.data[pageIndex];
      console.log(`\n📋 Update je .env file met:`);
      console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${page.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${page.id}\n`);
    }
    
    console.log('✅ Klaar! Je Page Token is opgehaald.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

getPageToken();

