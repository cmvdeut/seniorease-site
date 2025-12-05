import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { StateManager } from '../lib/state-manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Posts planning (dezelfde als in post-screenshots.js)
const POSTS = [
  {
    id: 1,
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
    title: 'Introductie - Bibliotheek Hoofdscherm',
    posted: true // Al gepost
  },
  {
    id: 2,
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
    title: 'Feature - Barcode Scanner',
    posted: false
  },
  {
    id: 3,
    screenshot: 'Screenshot_4.png',
    message: `💡 Slimme technologie in een simpele app!

SeniorEase Bibliotheek vindt automatisch de boekomslag voor je via Google Afbeeldingen. 
Zo zie je direct welk boek het is - perfect voor een mooi overzicht! 📚✨

Geen gedoe met foto's uploaden, de app doet het werk voor jou.

Probeer het nu gratis! 👉 https://seniorease.nl

#SeniorEase #SmarteTechnologie #Bibliotheek #Gebruiksvriendelijk`,
    title: 'Feature - Google Integratie',
    posted: false
  },
  {
    id: 4,
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
    title: 'Feature - Veiligheid & Privacy',
    posted: false
  },
  {
    id: 5,
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
    title: 'Feature - Meertalig',
    posted: false
  }
];

// Post photo to Facebook
async function postPhotoToFacebook(imagePath, message) {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  if (!pageAccessToken || !pageId) {
    throw new Error('Facebook credentials niet gevonden in environment variables');
  }
  
  const url = `https://graph.facebook.com/v18.0/${pageId}/photos`;
  
  // Create FormData with file stream
  const formData = new FormData();
  formData.append('source', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: 'image/png'
  });
  formData.append('message', message);
  formData.append('access_token', pageAccessToken);
  
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
}

// Get next post to publish
async function getNextPost(stateManager) {
  // Lees de current index uit state manager
  const currentIndex = await stateManager.getNextPostIndex();
  
  // Als we voorbij de laatste post zijn, begin opnieuw
  if (currentIndex >= POSTS.length) {
    return { post: POSTS[1], index: 1 }; // Start bij post 2 (post 1 was intro)
  }
  
  return { post: POSTS[currentIndex], index: currentIndex };
}

export default async function handler(req, res) {
  // Verifieer dat dit een cron job is of authorized request
  const authHeader = req.headers.authorization;
  
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Voor development: sta ook manual trigger toe via query param
    if (req.query.manual !== process.env.MANUAL_TRIGGER_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    console.log('🤖 Automated Facebook Screenshot Poster - Starting...');
    
    // Initialize state manager
    const stateManager = new StateManager();
    
    // Get next post
    const { post, index } = await getNextPost(stateManager);
    
    console.log(`📸 Posting: ${post.title} (Post ${post.id})`);
    
    // Get screenshot path - check both public (production) and local (development)
    let imagePath;
    const publicPath = path.join(__dirname, '../public/screenshots', post.screenshot);
    const localPath = path.resolve(__dirname, '../../../screenshots', post.screenshot);
    
    if (fs.existsSync(publicPath)) {
      imagePath = publicPath;
      console.log('   📂 Using public screenshot (production)');
    } else if (fs.existsSync(localPath)) {
      imagePath = localPath;
      console.log('   📂 Using local screenshot (development)');
    } else {
      throw new Error(`Screenshot niet gevonden: ${post.screenshot}\nProbeer: node prepare-deployment.js`);
    }
    
    // Post to Facebook
    console.log('📤 Posting to Facebook...');
    const result = await postPhotoToFacebook(imagePath, post.message);
    
    console.log(`✅ Posted! Post ID: ${result.id}`);
    
    // Calculate next index
    const nextIndex = index + 1;
    
    // Update state
    await stateManager.markAsPosted(post.id);
    await stateManager.setNextPostIndex(nextIndex >= POSTS.length ? 1 : nextIndex);
    
    // Log de post
    await logPost({
      postId: post.id,
      title: post.title,
      screenshot: post.screenshot,
      facebookPostId: result.id,
      postedAt: new Date().toISOString(),
      nextPostIndex: nextIndex >= POSTS.length ? 1 : nextIndex
    });
    
    return res.status(200).json({
      success: true,
      message: 'Screenshot succesvol gepost!',
      post: {
        id: post.id,
        title: post.title,
        screenshot: post.screenshot,
        facebookPostId: result.id,
        link: `https://www.facebook.com/${result.id}`
      },
      nextPost: nextIndex < POSTS.length ? POSTS[nextIndex].title : 'Alle posts gedaan! Begint opnieuw bij volgende run.',
      schedule: 'Ma/Wo/Vr om 10:00 uur'
    });

  } catch (error) {
    console.error('❌ Automated Post Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      tip: 'Check of FACEBOOK_PAGE_ACCESS_TOKEN en FACEBOOK_PAGE_ID zijn ingesteld in Vercel environment variables'
    });
  }
}

async function logPost(postData) {
  console.log('📊 POST LOGGED:', JSON.stringify(postData, null, 2));
  
  // In productie: sla dit op in database of KV store
  // Voor nu: log naar console (zichtbaar in Vercel logs)
  
  // Optioneel: stuur notificatie
  if (process.env.NOTIFICATION_EMAIL) {
    // Send email notification (implementeer later)
  }
}

export const config = {
  runtime: 'nodejs',
  maxDuration: 60
};

