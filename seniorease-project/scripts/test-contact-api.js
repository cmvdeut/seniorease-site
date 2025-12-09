// Test contact form API
const fetch = require('node-fetch');

const API_URL = process.argv[2] || 'http://localhost:3001/api/contact';

const testData = {
  name: 'Test Gebruiker',
  email: 'test@seniorease.nl',
  subject: 'algemeen',
  message: 'Dit is een test bericht om te controleren of het contact formulier werkt.'
};

async function testContactAPI() {
  console.log('🧪 Testing Contact Form API...\n');
  console.log(`URL: ${API_URL}\n`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log(`HTTP Status: ${response.status} ${response.statusText}\n`);

    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ SUCCESS!');
      console.log(`   Message: ${data.message}`);
      console.log('\n✅ Contact formulier API werkt correct!');
    } else {
      console.log('❌ ERROR:');
      console.log(`   Response:`, JSON.stringify(data, null, 2));
      console.log('\n❌ Contact formulier API heeft een probleem.');
    }
  } catch (error) {
    console.error('❌ Connection error:');
    console.error(`   ${error.message}`);
    console.log('\n💡 Tip: Zorg dat de development server draait:');
    console.log('   npm run dev');
  }
}

testContactAPI();


