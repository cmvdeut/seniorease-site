import 'dotenv/config';
import fetch from 'node-fetch';

const userToken = process.argv[2];

if (!userToken || !userToken.startsWith('EAA')) {
  console.error('❌ Geen geldige User Token opgegeven.');
  console.error('Gebruik: node get-page-token-auto.js EAAxxxxx...');
  process.exit(1);
}

async function getPageToken() {
  console.log('🔑 Facebook Page Token Ophalen\n');
  console.log('📡 Ophalen van je pagina\'s...\n');
  
  try {
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
    
    // Gebruik de eerste pagina (of zoek naar SeniorEase)
    let selectedPage = data.data[0];
    
    // Zoek naar SeniorEase als die er is
    const senioreasePage = data.data.find(page => 
      page.name.toLowerCase().includes('seniorease') || 
      page.name.toLowerCase().includes('senior')
    );
    
    if (senioreasePage) {
      selectedPage = senioreasePage;
      console.log(`📌 SeniorEase pagina gevonden: ${selectedPage.name}\n`);
    } else {
      console.log(`📌 Eerste pagina geselecteerd: ${selectedPage.name}\n`);
    }
    
    console.log('📋 Update je .env file met:');
    console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${selectedPage.access_token}`);
    console.log(`FACEBOOK_PAGE_ID=${selectedPage.id}\n`);
    
    console.log('✅ Klaar! Je Page Token is opgehaald.\n');
    console.log('💡 Kopieer deze regels naar je .env bestand!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getPageToken();



