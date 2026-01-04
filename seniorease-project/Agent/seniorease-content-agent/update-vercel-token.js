import 'dotenv/config';
import { execSync } from 'child_process';

const PAGE_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID;

if (!PAGE_TOKEN || !PAGE_ID) {
  console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN of FACEBOOK_PAGE_ID niet gevonden in .env');
  process.exit(1);
}

console.log('🚀 Vercel Environment Variables Updaten...\n');
console.log('📋 Nieuwe waarden:');
console.log(`   Page Token: ${PAGE_TOKEN.substring(0, 30)}...`);
console.log(`   Page ID: ${PAGE_ID}\n`);

try {
  console.log('1️⃣ Verwijderen oude FACEBOOK_PAGE_ACCESS_TOKEN...\n');
  try {
    execSync('vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (e) {
    console.log('   (Oude token bestaat niet, overslaan)\n');
  }
  
  console.log('2️⃣ Toevoegen nieuwe FACEBOOK_PAGE_ACCESS_TOKEN...\n');
  execSync(`echo "${PAGE_TOKEN}" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production`, { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n3️⃣ Verwijderen oude FACEBOOK_PAGE_ID...\n');
  try {
    execSync('vercel env rm FACEBOOK_PAGE_ID production --yes', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (e) {
    console.log('   (Oude Page ID bestaat niet, overslaan)\n');
  }
  
  console.log('4️⃣ Toevoegen nieuwe FACEBOOK_PAGE_ID...\n');
  execSync(`echo "${PAGE_ID}" | vercel env add FACEBOOK_PAGE_ID production`, { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ Vercel environment variables bijgewerkt!\n');
  console.log('💡 Volgende stap:');
  console.log('   → Deploy naar Vercel: vercel --prod\n');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error('\n💡 Probeer handmatig:');
  console.error(`   echo "${PAGE_TOKEN}" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production`);
  console.error(`   echo "${PAGE_ID}" | vercel env add FACEBOOK_PAGE_ID production`);
  process.exit(1);
}










