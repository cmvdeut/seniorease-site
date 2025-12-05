import 'dotenv/config';

async function checkPageAccess() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  console.log('🔍 Checking access to SeniorEase page...\n');
  console.log(`Page ID: ${pageId}\n`);
  
  // Try to get page info
  console.log('1️⃣ Trying to read page info...');
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=name,id,access_token&access_token=${token}`);
    const data = await response.json();
    
    if (data.error) {
      console.log('   ❌ Cannot access page');
      console.log('   Error:', data.error.message);
      console.log('   Code:', data.error.code);
      
      if (data.error.code === 190) {
        console.log('\n💡 Token issue - try regenerating token with correct permissions');
      } else if (data.error.code === 100 || data.error.code === 803) {
        console.log('\n💡 You are probably not Admin/Editor of this page');
        console.log('   Check: https://www.facebook.com/profile.php?id=61583148466074');
      }
    } else {
      console.log('   ✅ Page accessible!');
      console.log('   Name:', data.name);
      console.log('   ID:', data.id);
      
      if (data.access_token) {
        console.log('   ✅ Page Token available!');
        console.log(`   Token: ${data.access_token.substring(0, 30)}...`);
        console.log('\n🎉 This is your PAGE TOKEN! Update your .env with this token!');
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Check if we can see page roles
  console.log('\n2️⃣ Checking your role on the page...');
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/roles?access_token=${token}`);
    const data = await response.json();
    
    if (data.error) {
      console.log('   ❌ Cannot check roles');
      console.log('   Error:', data.error.message);
    } else if (data.data && data.data.length > 0) {
      console.log('   ✅ Roles found:');
      data.data.forEach(role => {
        console.log(`   - ${role.name}: ${role.role}`);
      });
    } else {
      console.log('   ⚠️ No roles data available');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  // List all pages user manages
  console.log('\n3️⃣ Listing all pages you manage...');
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`);
    const data = await response.json();
    
    if (data.error) {
      console.log('   ❌ Cannot list pages');
      console.log('   Error:', data.error.message);
    } else if (data.data && data.data.length > 0) {
      console.log('   ✅ Pages you manage:');
      data.data.forEach(page => {
        console.log(`\n   📄 ${page.name}`);
        console.log(`      ID: ${page.id}`);
        console.log(`      Page Token: ${page.access_token.substring(0, 30)}...`);
        
        if (page.id === pageId) {
          console.log('      🎯 THIS IS SENIOREASE!');
        }
      });
    } else {
      console.log('   ⚠️ No pages found');
      console.log('\n💡 This means:');
      console.log('   - You are not Admin/Editor of any Facebook pages');
      console.log('   - Or the page was created differently (personal profile page)');
      console.log('\n📋 Next steps:');
      console.log('   1. Go to: https://www.facebook.com/profile.php?id=61583148466074');
      console.log('   2. Check if you are Admin/Editor');
      console.log('   3. If not, ask the page owner to add you as Admin');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
}

checkPageAccess();



