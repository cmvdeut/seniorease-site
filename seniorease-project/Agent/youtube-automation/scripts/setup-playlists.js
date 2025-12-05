/**
 * YouTube Playlists Setup Script
 * Maakt automatisch alle playlists aan voor SeniorEase kanaal
 */

import { google } from 'googleapis';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// OAuth2 Client setup
const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
const TOKEN_PATH = path.join(__dirname, '../tokens.json');
const CREDENTIALS_PATH = path.join(__dirname, '../credentials.json');

// Playlists die aangemaakt moeten worden
const PLAYLISTS = [
  {
    title: '📚 Instructievideo\'s - SeniorEase',
    description: 'Stap-voor-stap uitleg van alle SeniorEase tools. Leer hoe je de Bibliotheek, Kalender, Rekenmachine en meer gebruikt.',
    privacyStatus: 'public'
  },
  {
    title: '💡 Tips & Tricks voor Senioren',
    description: 'Handige tips voor senioren met technologie. Van smartphone tips tot online veiligheid.',
    privacyStatus: 'public'
  },
  {
    title: '❓ Veelgestelde Vragen (FAQ)',
    description: 'Antwoorden op veelgestelde vragen over SeniorEase. Is het gratis? Werkt het op mijn telefoon?',
    privacyStatus: 'public'
  },
  {
    title: '🆕 Nieuwe Features & Updates',
    description: 'Laatste updates en nieuwe tools op SeniorEase. Blijf op de hoogte van alle nieuwe features!',
    privacyStatus: 'public'
  }
];

/**
 * Laad of vraag OAuth2 credentials
 */
function loadCredentials() {
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
async function authorize() {
  const credentials = loadCredentials();
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check of er al een token is
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // Vraag nieuwe token aan
  await getAccessToken(oAuth2Client);
  return oAuth2Client;
}

/**
 * Maak een playlist aan
 */
async function createPlaylist(youtube, playlist) {
  try {
    const response = await youtube.playlists.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: playlist.title,
          description: playlist.description,
        },
        status: {
          privacyStatus: playlist.privacyStatus,
        },
      },
    });

    console.log(`✅ Playlist aangemaakt: ${playlist.title}`);
    console.log(`   ID: ${response.data.id}`);
    console.log(`   URL: https://www.youtube.com/playlist?list=${response.data.id}\n`);
    
    return response.data;
  } catch (error) {
    console.error(`❌ Fout bij aanmaken playlist "${playlist.title}":`, error.message);
    if (error.response) {
      console.error('   Details:', error.response.data);
    }
    return null;
  }
}

/**
 * Check of playlist al bestaat
 */
async function playlistExists(youtube, title) {
  try {
    const response = await youtube.playlists.list({
      part: ['snippet'],
      mine: true,
      maxResults: 50,
    });

    return response.data.items.some(
      item => item.snippet.title === title
    );
  } catch (error) {
    console.error('❌ Fout bij checken playlists:', error.message);
    return false;
  }
}

/**
 * Hoofdfunctie
 */
async function main() {
  console.log('🎬 YouTube Playlists Setup - SeniorEase\n');
  console.log('📋 Dit script maakt automatisch alle playlists aan.\n');

  try {
    // Authorize
    const auth = await authorize();
    const youtube = google.youtube({ version: 'v3', auth });

    // Check kanaal
    const channelResponse = await youtube.channels.list({
      part: ['snippet'],
      mine: true,
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      console.error('❌ Geen YouTube kanaal gevonden!');
      console.log('   Zorg dat je ingelogd bent op het juiste Google account.');
      process.exit(1);
    }

    const channel = channelResponse.data.items[0];
    console.log(`✅ Kanaal gevonden: ${channel.snippet.title}`);
    console.log(`   Kanaal ID: ${channel.id}\n`);

    // Maak playlists aan
    console.log('📝 Playlists aanmaken...\n');
    
    for (const playlist of PLAYLISTS) {
      // Check of playlist al bestaat
      const exists = await playlistExists(youtube, playlist.title);
      
      if (exists) {
        console.log(`⏭️  Playlist bestaat al: ${playlist.title}\n`);
        continue;
      }

      // Maak playlist aan
      await createPlaylist(youtube, playlist);
      
      // Korte pauze tussen requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('✅ Klaar! Alle playlists zijn aangemaakt.');
    console.log('\n📺 Bekijk je playlists op: https://studio.youtube.com/channel/UC.../playlists');

  } catch (error) {
    console.error('❌ Fout:', error.message);
    if (error.response) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run
main();

