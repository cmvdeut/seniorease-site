/**
 * Shared authentication helper for YouTube API
 * Herbruikbare authenticatie functies voor alle scripts
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// OAuth2 Client setup
export const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
export const TOKEN_PATH = path.join(__dirname, '../tokens.json');
export const CREDENTIALS_PATH = path.join(__dirname, '../credentials.json');

/**
 * Laad OAuth2 credentials
 */
export function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('❌ credentials.json niet gevonden!');
    console.log('\n📝 Maak credentials.json aan:');
    console.log('1. Ga naar Google Cloud Console');
    console.log('2. Maak OAuth2 credentials aan');
    console.log('3. Download als credentials.json');
    console.log('4. Plaats in: Agent/youtube-automation/');
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
}

/**
 * Vraag OAuth2 token aan
 */
async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('🔐 Autoriseer deze app door deze URL te bezoeken:');
  console.log(authUrl);
  console.log('\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('📋 Plak de code van de pagina hier: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error('❌ Fout bij ophalen token:', err);
          reject(err);
          return;
        }
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('✅ Token opgeslagen!');
        resolve(token);
      });
    });
  });
}

/**
 * Laad opgeslagen token of vraag nieuwe aan
 */
export async function authorize() {
  const credentials = loadCredentials();
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check of er al een token is
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    
    // Check of token nog geldig is (optioneel - refresh gebeurt automatisch)
    return oAuth2Client;
  }

  // Vraag nieuwe token aan
  await getAccessToken(oAuth2Client);
  return oAuth2Client;
}

/**
 * Get YouTube API client
 */
export async function getYouTubeClient() {
  const auth = await authorize();
  return google.youtube({ version: 'v3', auth });
}

