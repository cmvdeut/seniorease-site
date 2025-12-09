import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import FormData from 'form-data';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Demo download URL
const DEMO_URL = 'https://www.seniorease.nl/tiktok-download';

// Facebook post message
const FACEBOOK_MESSAGE = `📲 Probeer SeniorEase GRATIS!

Demo voor Android 📱

✔️ Scan boeken met barcode
✔️ Zoekfunctie  
✔️ Max. 10 boeken opslaan

👉 Download de demo nu via de link in bio!

Of scan de QR code hieronder! 📱

#SeniorEase #Bibliotheek #Demo #Gratis #Android #Boeken #Senioren #Nederland`;

async function generateQRCode() {
  console.log('🔲 QR code genereren...');
  
  const qrPath = path.join(__dirname, 'public', 'qr-demo.png');
  
  // Zorg dat public folder bestaat
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Genereer QR code als PNG
  await QRCode.toFile(qrPath, DEMO_URL, {
    width: 1000,
    margin: 2,
    color: {
      dark: '#8B5E3C',  // Primary color
      light: '#FFFFFF'
    }
  });
  
  console.log(`✅ QR code opgeslagen: ${qrPath}`);
  return qrPath;
}

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
  
  console.log('📤 Posten naar Facebook...');
  
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

async function main() {
  console.log('\n📱 SeniorEase Demo QR Code Poster\n');
  console.log('==================================\n');
  
  // Check config
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN || !process.env.FACEBOOK_PAGE_ID) {
    console.error('❌ FOUT: Facebook credentials niet gevonden!');
    console.error('\nZorg dat je .env bestand heeft:');
    console.error('  FACEBOOK_PAGE_ACCESS_TOKEN=...');
    console.error('  FACEBOOK_PAGE_ID=...');
    process.exit(1);
  }
  
  try {
    // Genereer QR code
    const qrPath = await generateQRCode();
    
    // Post naar Facebook
    const result = await postPhotoToFacebook(qrPath, FACEBOOK_MESSAGE);
    
    console.log('\n✅ SUCCESS!');
    console.log(`📱 Post ID: ${result.id}`);
    console.log(`🔗 Bekijk op: https://www.facebook.com/${process.env.FACEBOOK_PAGE_ID}/posts/${result.id.split('_')[1]}`);
    console.log('\n🎉 QR code is gepost naar Facebook!');
    
  } catch (error) {
    console.error('\n❌ FOUT:', error.message);
    process.exit(1);
  }
}

main();






