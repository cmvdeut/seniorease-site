// Interactive script om Page Token te verkrijgen
console.log('🔑 Page Token Verkrijgen - Interactieve Guide\n');
console.log('='.repeat(60));

console.log('\n📋 STAP 1: Open Graph API Explorer');
console.log('   URL: https://developers.facebook.com/tools/explorer/\n');

console.log('📋 STAP 2: Klik "Generate Access Token"');
console.log('   → Er opent een popup\n');

console.log('📋 STAP 3: Selecteer ALLE deze permissions:');
console.log('   ✓ public_profile');
console.log('   ✓ pages_show_list');
console.log('   ✓ pages_read_engagement');  
console.log('   ✓ pages_manage_posts');
console.log('   ✓ pages_read_user_content');
console.log('   ✓ pages_manage_metadata\n');

console.log('📋 STAP 4: Klik "Generate Token" / "Continue"');
console.log('   → Accepteer alle permissions\n');

console.log('📋 STAP 5: In Graph API Explorer, typ in query veld:');
console.log('   me/accounts\n');

console.log('📋 STAP 6: Klik "Submit"\n');

console.log('📋 VERWACHT RESULTAAT:');
console.log(`
{
  "data": [
    {
      "name": "SeniorEase",
      "id": "61583148466074",
      "access_token": "EAAG...dit-is-de-page-token...",
      "category": "...",
      "tasks": [...]
    }
  ]
}
`);

console.log('\n📋 STAP 7: Copy de "access_token" van SeniorEase');
console.log('   → Dit is je PAGE TOKEN (niet de User Token bovenaan!)');
console.log('   → Plak deze in ENV-TEMPLATE.txt\n');

console.log('='.repeat(60));
console.log('\n💡 TIP: Als je GEEN pagina\'s ziet:');
console.log('   1. Check of je permissions correct hebt gegeven');
console.log('   2. Probeer uit te loggen en opnieuw in te loggen');
console.log('   3. Check Settings → Business Integrations');
console.log('      → Verwijder "Graph API Explorer" en probeer opnieuw\n');

console.log('='.repeat(60));
console.log('\n🎯 Als je de Page Token hebt, run dan:');
console.log('   npm run test-facebook\n');



