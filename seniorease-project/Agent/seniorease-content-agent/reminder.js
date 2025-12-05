#!/usr/bin/env node

/**
 * Facebook Posting Reminder
 * ==========================
 * 
 * Toont welke post als volgende moet worden geplaatst
 */

import 'dotenv/config';

const POSTS = [
  {
    number: 1,
    title: 'Introductie - Bibliotheek Hoofdscherm',
    screenshot: 'Screenshot_1.png',
    status: 'GEPOST ✅',
    postId: '122105470629126305',
    date: new Date().toLocaleDateString('nl-NL')
  },
  {
    number: 2,
    title: 'Feature - Barcode Scanner',
    screenshot: 'Screenshot_2.png',
    status: 'TE POSTEN ⏳',
    recommendedDay: 'Ma/Wo/Vr',
    daysFromNow: getNextPostingDay()
  },
  {
    number: 3,
    title: 'Feature - Google Integratie',
    screenshot: 'Screenshot_4.png',
    status: 'TE POSTEN ⏳',
    recommendedDay: 'Ma/Wo/Vr',
    daysFromNow: 'Na post 2'
  },
  {
    number: 4,
    title: 'Feature - Veiligheid & Privacy',
    screenshot: 'Screenshot_5.png',
    status: 'TE POSTEN ⏳',
    recommendedDay: 'Ma/Wo/Vr',
    daysFromNow: 'Na post 3'
  },
  {
    number: 5,
    title: 'Feature - Meertalig',
    screenshot: 'Screenshot_3.png',
    status: 'TE POSTEN ⏳',
    recommendedDay: 'Ma/Wo/Vr',
    daysFromNow: 'Na post 4'
  }
];

function getNextPostingDay() {
  const today = new Date();
  const currentDay = today.getDay(); // 0=zondag, 1=maandag, etc.
  
  // Ma (1), Wo (3), Vr (5)
  const postingDays = [1, 3, 5];
  
  // Find next posting day
  let daysUntilNext = 0;
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7;
    if (postingDays.includes(checkDay) && i > 0) {
      daysUntilNext = i;
      break;
    }
  }
  
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + daysUntilNext);
  return nextDay.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function showReminder() {
  console.log('\n📅 Facebook Screenshots Posting Schema\n');
  console.log('=' .repeat(50));
  console.log('');
  
  // Find next post to make
  const nextPost = POSTS.find(p => p.status.includes('TE POSTEN'));
  
  if (!nextPost) {
    console.log('🎉 Alle screenshots zijn gepost!\n');
    console.log('💡 Volgende stappen:');
    console.log('   - Analyseer de resultaten in Facebook Insights');
    console.log('   - Plan nieuwe content of herhaal populaire posts');
    console.log('   - Check FACEBOOK-SCREENSHOTS-STRATEGIE.md voor ideeën\n');
    return;
  }
  
  console.log('🔔 VOLGENDE POST:\n');
  console.log(`   📸 Post ${nextPost.number}: ${nextPost.title}`);
  console.log(`   📅 Aanbevolen: ${nextPost.daysFromNow}`);
  console.log(`   🕐 Beste tijd: 09:00 - 11:00 uur`);
  console.log(`   📁 Screenshot: ${nextPost.screenshot}`);
  console.log('');
  console.log('   💻 Command:');
  console.log(`      node post-screenshots.js ${nextPost.number}`);
  console.log('');
  console.log('   🔍 Test eerst (dry-run):');
  console.log(`      node post-screenshots.js --dry-run ${nextPost.number}`);
  console.log('');
  console.log('─'.repeat(50));
  console.log('');
  
  // Show all posts status
  console.log('📊 COMPLETE OVERZICHT:\n');
  
  POSTS.forEach(post => {
    const statusIcon = post.status.includes('GEPOST') ? '✅' : '⏳';
    console.log(`${statusIcon} Post ${post.number}: ${post.title}`);
    
    if (post.status.includes('GEPOST')) {
      console.log(`   📅 Gepost: ${post.date}`);
      console.log(`   🔗 Post ID: ${post.postId}`);
    } else {
      console.log(`   📅 Plan: ${post.daysFromNow}`);
      console.log(`   💻 node post-screenshots.js ${post.number}`);
    }
    console.log('');
  });
  
  console.log('─'.repeat(50));
  console.log('');
  console.log('💡 TIPS:\n');
  console.log('   • Posts worden AUTOMATISCH geplaatst op Ma/Wo/Vr om 10:00!');
  console.log('   • Deploy naar Vercel: npm run deploy');
  console.log('   • Check Vercel logs na elke post');
  console.log('   • Monitor engagement na 24 uur');
  console.log('   • Reageer op comments binnen 1 uur\n');
  
  console.log('📚 DOCUMENTATIE:\n');
  console.log('   • Snelle deploy: DEPLOY-NU.md');
  console.log('   • Vercel guide: VERCEL-DEPLOYMENT.md');
  console.log('   • Post strategie: FACEBOOK-SCREENSHOTS-STRATEGIE.md');
  console.log('   • Handmatig posten: node post-screenshots.js\n');
}

showReminder();

