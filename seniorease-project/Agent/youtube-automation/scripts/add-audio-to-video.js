/**
 * Script om audio toe te voegen aan video
 * Gebruikt ffmpeg om audio en video te combineren
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Check of ffmpeg geïnstalleerd is
 */
async function checkFFmpeg() {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Combineer video en audio
 */
async function combineVideoAudio(videoPath, audioPath, outputPath) {
  const command = `ffmpeg -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest "${outputPath}"`;
  
  try {
    console.log('🎬 Audio en video combineren...');
    console.log(`   Video: ${videoPath}`);
    console.log(`   Audio: ${audioPath}`);
    console.log(`   Output: ${outputPath}\n`);
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.log(stderr);
    }
    
    console.log('✅ Video klaar met audio!');
    console.log(`   Bestand: ${outputPath}\n`);
    
    return outputPath;
  } catch (error) {
    console.error('❌ Fout bij combineren:', error.message);
    throw error;
  }
}

/**
 * Hoofdfunctie
 */
async function main() {
  console.log('🎬 Audio toevoegen aan Video - SeniorEase\n');
  
  // Check ffmpeg
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    console.error('❌ FFmpeg niet gevonden!');
    console.log('\n📝 Installeer FFmpeg:');
    console.log('1. Download: https://ffmpeg.org/download.html');
    console.log('2. Of via Chocolatey: choco install ffmpeg');
    console.log('3. Of via winget: winget install ffmpeg\n');
    console.log('💡 Alternatief: Gebruik Windows Video Editor (handmatig)\n');
    process.exit(1);
  }
  
  // Vraag bestandspaden
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (prompt) => new Promise((resolve) => {
    readline.question(prompt, resolve);
  });
  
  try {
    console.log('📁 Geef de bestandspaden op:\n');
    
    const videoPath = await question('Video bestand (bijv. C:\\Users\\...\\video.mp4): ');
    const audioPath = await question('Audio bestand (bijv. C:\\Users\\...\\audio.mp3): ');
    
    // Check of bestanden bestaan
    if (!fs.existsSync(videoPath)) {
      console.error(`❌ Video bestand niet gevonden: ${videoPath}`);
      process.exit(1);
    }
    
    if (!fs.existsSync(audioPath)) {
      console.error(`❌ Audio bestand niet gevonden: ${audioPath}`);
      process.exit(1);
    }
    
    // Output pad
    const videoDir = path.dirname(videoPath);
    const videoName = path.basename(videoPath, path.extname(videoPath));
    const outputPath = path.join(videoDir, `${videoName}-met-audio.mp4`);
    
    // Combineer
    await combineVideoAudio(videoPath, audioPath, outputPath);
    
    console.log('✅ Klaar! Video met audio is klaar voor upload.\n');
    
  } catch (error) {
    console.error('❌ Fout:', error.message);
    process.exit(1);
  } finally {
    readline.close();
  }
}

// Run
main();


