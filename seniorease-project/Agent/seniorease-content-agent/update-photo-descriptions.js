#!/usr/bin/env node

/**
 * Update Facebook Photo Descriptions
 * ====================================
 * 
 * Voegt automatisch beschrijvingen toe aan bestaande foto's in je Facebook album
 */

import 'dotenv/config';
import fetch from 'node-fetch';

// Beschrijvingen voor elke screenshot
const DESCRIPTIONS = {
  'Screenshot_1': `📚 Je Persoonlijke Bibliotheek in Één Oogopslag!

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

#SeniorEase #Bibliotheek #Boeken #Lezen #Senioren #Nederland #Gebruiksvriendelijk`,

  'Screenshot_2': `🔍 Boeken Toevoegen in 3 Seconden!

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

#SeniorEase #BarcodeScan #Slim #TechVoorSenioren #Gebruiksvriendelijk #Bibliotheek`,

  'Screenshot_3': `🌍 SeniorEase Spreekt Jouw Taal!

Kies tussen Nederlands, Engels of een andere taal. De app past zich aan aan jouw voorkeur.

✨ PERFECT VOOR:
• Nederlandstaligen in het buitenland
• Internationale families
• Mensen die meerdere talen spreken
• Iedereen die zich comfortabeler voelt in een andere taal

💡 WAAROM BELANGRIJK:
Technologie moet toegankelijk zijn voor iedereen. Daarom biedt SeniorEase meertalige ondersteuning - omdat iedereen het verdient om apps te gebruiken in hun eigen taal.

👉 Download: seniorease.nl

#SeniorEase #Meertalig #Inclusief #Nederlands #Engels #Toegankelijkheid #Diversiteit`,

  'Screenshot_4': `💡 Slimme Technologie, Simpele App!

SeniorEase Bibliotheek vindt automatisch de boekomslag voor je via Google Afbeeldingen. Zo zie je direct welk boek het is - perfect voor een mooi visueel overzicht!

✨ WAT JE ZIET:
De app zoekt automatisch naar de juiste boekomslag wanneer je een boek toevoegt. Geen gedoe met foto's uploaden, de app doet het werk voor jou.

💡 WAAROM DIT HANDIG IS:
Visueel overzicht maakt het makkelijker om je boeken te herkennen. Je ziet direct welke boeken je hebt zonder alles te hoeven lezen.

👉 Probeer gratis: seniorease.nl

#SeniorEase #SmartTechnology #GoogleIntegratie #Automatisch #Gebruiksvriendelijk #Bibliotheek`,

  'Screenshot_5': `🔒 Jouw Gegevens, Jouw Controle!

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
};

class FacebookPhotoUpdater {
  constructor(pageAccessToken, pageId) {
    this.pageAccessToken = pageAccessToken || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    this.pageId = pageId || process.env.FACEBOOK_PAGE_ID;
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  // Haal alle foto's van de pagina op
  async getPagePhotos() {
    const url = `${this.baseUrl}/${this.pageId}/photos?fields=id,name,created_time&access_token=${this.pageAccessToken}`;
    
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

  // Update beschrijving van een foto
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
        throw new Error(`Facebook API Error: ${data.error.message}`);
      }
      
      return { success: true, photoId };
    } catch (error) {
      return { success: false, photoId, error: error.message };
    }
  }

  // Match foto's met beschrijvingen op basis van naam
  matchPhotoToDescription(photoName) {
    // Probeer te matchen op screenshot naam
    for (const [key, description] of Object.entries(DESCRIPTIONS)) {
      if (photoName && photoName.toLowerCase().includes(key.toLowerCase().replace('_', ''))) {
        return { key, description };
      }
    }
    return null;
  }
}

async function main() {
  console.log('\n📸 Facebook Foto Beschrijvingen Updater\n');
  console.log('========================================\n');

  // Check config
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN || !process.env.FACEBOOK_PAGE_ID) {
    console.error('❌ ERROR: Facebook credentials niet gevonden!');
    console.error('   Zorg dat FACEBOOK_PAGE_ACCESS_TOKEN en FACEBOOK_PAGE_ID in .env staan\n');
    process.exit(1);
  }

  const updater = new FacebookPhotoUpdater();

  try {
    console.log('📡 Ophalen foto\'s van Facebook pagina...\n');
    const photos = await updater.getPagePhotos();
    
    if (photos.length === 0) {
      console.log('⚠️  Geen foto\'s gevonden op de pagina.');
      console.log('   Upload eerst je screenshots naar Facebook!\n');
      process.exit(0);
    }

    console.log(`✅ ${photos.length} foto(s) gevonden\n`);
    console.log('🔍 Zoeken naar foto\'s die beschrijvingen nodig hebben...\n');

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const photo of photos) {
      const match = updater.matchPhotoToDescription(photo.name || '');
      
      if (match) {
        console.log(`📸 Foto gevonden: ${photo.id}`);
        console.log(`   Match: ${match.key}`);
        console.log(`   Updating beschrijving...`);
        
        const result = await updater.updatePhotoDescription(photo.id, match.description);
        
        if (result.success) {
          console.log(`   ✅ Beschrijving toegevoegd!\n`);
          updated++;
        } else {
          console.log(`   ❌ Fout: ${result.error}\n`);
          errors++;
        }
        
        // Wacht even om rate limits te vermijden
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log(`⏭️  Foto ${photo.id} - geen match gevonden (skip)\n`);
        skipped++;
      }
    }

    console.log('\n📊 RESULTATEN:\n');
    console.log(`   ✅ Bijgewerkt: ${updated}`);
    console.log(`   ⏭️  Overgeslagen: ${skipped}`);
    console.log(`   ❌ Fouten: ${errors}\n`);

    if (updated > 0) {
      console.log('🎉 Beschrijvingen succesvol toegevoegd!\n');
      console.log('📱 Check je Facebook pagina:');
      console.log(`   https://www.facebook.com/${process.env.FACEBOOK_PAGE_ID}/photos\n`);
    }

    if (skipped > 0) {
      console.log('💡 TIP: Als foto\'s niet gematcht werden, controleer of de foto namen');
      console.log('   "Screenshot_1", "Screenshot_2", etc. bevatten.\n');
    }

  } catch (error) {
    console.error('\n❌ Fout:', error.message);
    console.error('\n💡 Mogelijke oplossingen:');
    console.error('   - Check of je token nog geldig is');
    console.error('   - Check of je admin rechten hebt op de pagina');
    console.error('   - Check of de foto\'s op de pagina staan\n');
    process.exit(1);
  }
}

main();


