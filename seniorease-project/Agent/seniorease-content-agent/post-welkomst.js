import { FacebookPoster } from './lib/facebook.js';
import 'dotenv/config';

async function postWelkomst() {
  console.log('📝 Welkomst post maken...\n');

  const welkomstPost = `🎉 Welkom bij SeniorEase! 🎉

Fijn dat je hier bent! Wij maken technologie toegankelijk en begrijpelijk voor senioren in Nederland. Geen gedoe, gewoon handige tools die echt werken.

📱 WAT BIEDEN WIJ?

✅ Bibliotheek App - Beheer je boekencollectie met barcode scanner
✅ Verjaardagskalender - Vergeet nooit meer een verjaardag  
✅ Rekenmachine - Groot, duidelijk en makkelijk
✅ Boodschappenlijst - Simpel lijstjes maken
✅ En nog veel meer!

💡 WAAROM SENIOREASE?

• Speciaal ontworpen voor 65+
• Grote knoppen, duidelijke tekst
• Gratis tools beschikbaar
• Nederlandse interface
• Zonder ingewikkelde menus

🌐 BEZOEK ONS:
👉 https://seniorease.nl

Probeer onze gratis tools en ontdek hoe makkelijk technologie kan zijn!

Vragen? Stel ze gerust in de reacties. We helpen je graag verder! 💬

Vergeet niet onze pagina te volgen voor handige tips, nieuwe features en interessante informatie over technologie voor senioren! 👍

#SeniorEase #TechnologieVoorSenioren #HandigeTips #65Plus #Nederland #GebruiksvriendelijkeTechnologie`;

  try {
    const fb = new FacebookPoster();
    console.log('📤 Posten naar Facebook...');
    
    const result = await fb.postText(welkomstPost);
    
    if (result.success) {
      console.log('\n✅ SUCCESS! Welkomst post is live!');
      console.log(`📊 Post ID: ${result.postId}`);
      console.log('\n🎯 VOLGENDE STAP:');
      console.log('1. Ga naar je Facebook pagina');
      console.log('2. Zoek deze post');
      console.log('3. Klik op de 3 puntjes (...)');
      console.log('4. Klik "Pin to top of page"');
      console.log('5. Nu staat hij bovenaan! 🎉\n');
    } else {
      console.error('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

postWelkomst();



