/**
 * YouTube Playlists Setup Script
 * Maakt automatisch alle playlists aan voor SeniorEase kanaal
 */

import { google } from 'googleapis';
import 'dotenv/config';
import { getYouTubeClient } from './auth-helper.js';

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
  },
  {
    title: '📱 WhatsApp Uitleg voor Beginners',
    description: 'Leer WhatsApp stap voor stap met animaties! Van installeren tot berichten sturen, bellen en veilig gebruik — speciaal voor senioren, in begrijpelijke taal. Meer hulp op seniorease.nl',
    privacyStatus: 'public'
  }
];


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
    // Get YouTube client
    const youtube = await getYouTubeClient();

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

