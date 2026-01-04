// Quick test of Vercel API
const fetch = require('node-fetch');

// Load .env.local automatically
require('dotenv').config({ path: '.env.local' });

// VERCEL_TOKEN moet via environment variable worden ingesteld
// NOOIT hardcoden in de code!
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
if (!VERCEL_TOKEN) {
  console.error('❌ ERROR: VERCEL_TOKEN environment variable is required!');
  console.error('   Set it via: $env:VERCEL_TOKEN="your-token" (PowerShell)');
  console.error('   Or: export VERCEL_TOKEN="your-token" (Linux/Mac)');
  process.exit(1);
}

async function test() {
  try {
    console.log('🔍 Testing Vercel API connection...');
    console.log(`Token: ${VERCEL_TOKEN.substring(0, 10)}...\n`);
    
    const response = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
      },
    });

    console.log(`HTTP Status: ${response.status} ${response.statusText}\n`);
    
    if (response.ok) {
      const data = await response.json();
      const projectCount = data.projects?.length || 0;
      console.log(`✅ Connected! Found ${projectCount} projects\n`);
      
      if (data.projects && data.projects.length > 0) {
        console.log('📦 Projects:');
        data.projects.forEach(p => {
          console.log(`  - ${p.name} (${p.id})`);
        });
      }
    } else {
      const errorText = await response.text();
      console.log(`❌ API Error:`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${errorText.substring(0, 200)}`);
    }
  } catch (error) {
    console.error('❌ Connection error:');
    console.error(`   ${error.message}`);
    if (error.stack) {
      console.error(`   Stack: ${error.stack.split('\n')[1]}`);
    }
  }
}

test();

