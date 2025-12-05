#!/usr/bin/env node

/**
 * Interactive Photo Description Updater
 * ======================================
 * 
 * Helpt je interactief beschrijvingen toevoegen aan Facebook foto's
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';

const DESCRIPTIONS = {
  1: {
    title: 'Bibliotheek Hoofdscherm',
    description: `📚 Je Persoonlijke Bibliotheek in Één Oogopslag!

Met SeniorEase Bibliotheek zie je direct welke boeken je hebt, welke je al gelezen hebt, en welke je nog wilt lezen.

✨ FEATURES DIE JE ZIET:
• Overzichtelijke lijst met alle boeken
• Zoekfunctie om snel te vinden wat je zoekt
• Filter op type (boeken, muziek, etc.)
• "Gelezen" en "In bezit" vinkjes
• Speciaal ontworpen voor senioren - groot en duidelijk!

💡 WAAROM HANDIG:
Nooit meer vergeten welke boeken je al hebt. Perfect voor iedereen die van lezen houdt en graag overzicht houdt.

👉 Download gratis: seniorease.nl

#SeniorEase #Bibliotheek #Boeken #Lezen #Senioren #Nederland #Gebruiksvriendelijk`
  },
  2: {
    title: 'Barcode Scanner',
    description: `🔍 Boeken Toevoegen in 3 Seconden!

Gewoon de barcode scannen met je telefoon en klaar! De app vult automatisch in:
• 📖 Titel van het boek
• ✍️ Auteur
• 🔢 ISBN code
• 📷 Boekomslag (automatisch!)

✨ WAAROM DIT GEWELDIG IS:
Geen gedoe met handmatig typen. Scan, klaar! Ook als je geen barcode hebt, kun je handmatig invoeren - jij kiest wat makkelijker is.

💡 TIP:
Houd je telefoon camera boven de barcode op de achterkant van het boek. De app doet de rest!

👉 Probeer het nu gratis: seniorease.nl

#SeniorEase #BarcodeScan #Slim #TechVoorSenioren #Gebruiksvriendelijk #Bibliotheek`
  },
  3: {
    title: 'Meertalig',
    description: `🌍 SeniorEase Spreekt Jouw Taal!

Kies tussen Nederlands, Engels of een andere taal. De app past zich aan aan jouw voorkeur.

✨ PERFECT VOOR:
• Nederlandstaligen in het buitenland
• Internationale families
• Mensen die meerdere talen spreken
• Iedereen die zich comfortabeler voelt in een andere taal

💡 WAAROM BELANGRIJK:
Technologie moet toegankelijk zijn voor iedereen. Daarom biedt SeniorEase meertalige ondersteuning - omdat iedereen het verdient om apps te gebruiken in hun eigen taal.

👉 Download: seniorease.nl

#SeniorEase #Meertalig #Inclusief #Nederlands #Engels #Toegankelijkheid #Diversiteit`
  },
  4: {
    title: 'Google Integratie',
    description: `💡 Slimme Technologie, Simpele App!

SeniorEase Bibliotheek vindt automatisch de boekomslag voor je via Google Afbeeldingen. Zo zie je direct welk boek het is - perfect voor een mooi visueel overzicht!

✨ WAT JE ZIET:
De app zoekt automatisch naar de juiste boekomslag wanneer je een boek toevoegt. Geen gedoe met foto's uploaden, de app doet het werk voor jou.

💡 WAAROM DIT HANDIG IS:
Visueel overzicht maakt het makkelijker om je boeken te herkennen. Je ziet direct welke boeken je hebt zonder alles te hoeven lezen.

👉 Probeer gratis: seniorease.nl

#SeniorEase #SmartTechnology #GoogleIntegratie #Automatisch #Gebruiksvriendelijk #Bibliotheek`
  },
  5: {
    title: 'Backup & Privacy',
    description: `🔒 Jouw Gegevens, Jouw Controle!

SeniorEase Bibliotheek biedt uitgebreide opties om je data veilig te houden:

✅ BACKUP MAKEN
Nooit meer je bibliotheek kwijt! Maak een backup en sla deze op waar jij wilt.

✅ EXPORTEREN
Exporteer je lijst naar CSV (Excel) of PDF. Perfect om te delen of te printen.

✅ PRIVACY BESCHERMING
Jouw gegevens blijven privé. Offline gebruik mogelijk - geen internet nodig!

✅ STATISTIEKEN
Zie hoeveel boeken je hebt, hoeveel je gelezen hebt, en meer inzichten.

💡 WAAROM BELANGRIJK:
Jouw boekcollectie is waardevol. Daarom geven we je volledige controle over je data.

👉 Download nu: seniorease.nl

#SeniorEase #Privacy #Veiligheid #Backup #DataProtectie #Controle #Bibliotheek`
  }
};

class PhotoHelper {
  constructor(pageAccessToken, pageId) {
    this.pageAccessToken = pageAccessToken || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    this.pageId = pageId || process.env.FACEBOOK_PAGE_ID;
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  async getPagePhotos() {
    const url = `${this.baseUrl}/${this.pageId}/photos?fields=id,name,created_time,link&access_token=${this.pageAccessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Facebook API Error: ${data.error.message}`);
      }
      
      return data.data || [];
    } catch (error) {
      throw new Error(`Failed to get photos: ${error.message}`);
    }
  }

  async updatePhotoDescription(photoId, description) {
    const url = `${this.baseUrl}/${photoId}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: description,
          access_token: this.pageAccessToken
        })
      });

      const data = await response.json();
      
      if (data.error) {
        return { success: false, error: data.error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n📸 Interactive Facebook Foto Beschrijvingen Helper\n');
  console.log('==================================================\n');

  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN || !process.env.FACEBOOK_PAGE_ID) {
    console.error('❌ ERROR: Facebook credentials niet gevonden!');
    console.error('   Zorg dat FACEBOOK_PAGE_ACCESS_TOKEN en FACEBOOK_PAGE_ID in .env staan\n');
    process.exit(1);
  }

  const helper = new PhotoHelper();

  try {
    console.log('📡 Ophalen foto\'s van Facebook pagina...\n');
    const photos = await helper.getPagePhotos();
    
    if (photos.length === 0) {
      console.log('⚠️  Geen foto\'s gevonden op de pagina.\n');
      process.exit(0);
    }

    console.log(`✅ ${photos.length} foto(s) gevonden\n`);
    console.log('📋 Beschikbare beschrijvingen:\n');
    
    Object.entries(DESCRIPTIONS).forEach(([num, desc]) => {
      console.log(`   ${num}. ${desc.title}`);
    });
    
    console.log('\n' + '='.repeat(50) + '\n');

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      
      console.log(`\n📸 Foto ${i + 1} van ${photos.length}`);
      console.log(`   ID: ${photo.id}`);
      console.log(`   Link: ${photo.link || 'N/A'}`);
      console.log(`   Naam: ${photo.name || '(geen naam)'}`);
      console.log(`   Gemaakt: ${photo.created_time || 'N/A'}\n`);
      
      console.log('Welke beschrijving wil je toevoegen?');
      console.log('(Kies nummer 1-5, of "s" om over te slaan, of "q" om te stoppen)\n');
      
      const answer = await question('> ');
      
      if (answer.toLowerCase() === 'q') {
        console.log('\n👋 Gestopt door gebruiker.\n');
        break;
      }
      
      if (answer.toLowerCase() === 's') {
        console.log('⏭️  Overgeslagen\n');
        continue;
      }
      
      const descNum = parseInt(answer);
      if (!DESCRIPTIONS[descNum]) {
        console.log('❌ Ongeldige keuze, overgeslagen\n');
        continue;
      }
      
      const selectedDesc = DESCRIPTIONS[descNum];
      
      console.log(`\n📝 Beschrijving: ${selectedDesc.title}`);
      console.log('\nToevoegen aan deze foto? (j/n)\n');
      
      const confirm = await question('> ');
      
      if (confirm.toLowerCase() !== 'j' && confirm.toLowerCase() !== 'y') {
        console.log('⏭️  Overgeslagen\n');
        continue;
      }
      
      console.log('\n📤 Beschrijving toevoegen...');
      const result = await helper.updatePhotoDescription(photo.id, selectedDesc.description);
      
      if (result.success) {
        console.log('✅ Beschrijving succesvol toegevoegd!\n');
      } else {
        console.log(`❌ Fout: ${result.error}\n`);
        console.log('💡 TIP: Kopieer de beschrijving handmatig en plak in Facebook:\n');
        console.log(selectedDesc.description);
        console.log('\n');
      }
      
      // Wacht even
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n✅ Klaar!\n');
    console.log('📱 Check je Facebook pagina:');
    console.log(`   https://www.facebook.com/${process.env.FACEBOOK_PAGE_ID}/photos\n`);

  } catch (error) {
    console.error('\n❌ Fout:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();


