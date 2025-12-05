// Test script voor Zapier Facebook posting via MCP
// Dit script test verschillende manieren om de page parameter te sturen

const tests = [
  {
    name: "Test 1: Met Page ID (aanbevolen)",
    config: {
      instructions: "Create a test post on SeniorEase Facebook page with a friendly message",
      message: "🎉 Test Post 1 - Met Page ID\n\nDeze post gebruikt het Page ID als parameter.\n\n#SeniorEase #Test",
      page: "117953082079657"  // Page ID van SeniorEase
    }
  },
  {
    name: "Test 2: Met Page naam",
    config: {
      instructions: "Create a test post on SeniorEase Facebook page",
      message: "🎉 Test Post 2 - Met Page Naam\n\nDeze post gebruikt de page naam als parameter.\n\n#SeniorEase #Test",
      page: "SeniorEase"
    }
  },
  {
    name: "Test 3: Alleen instructions (Zapier moet default page gebruiken)",
    config: {
      instructions: "Create a test post on SeniorEase Facebook page saying 'Test 3 - Default page configuratie werkt!'",
      message: "🎉 Test Post 3 - Default Page\n\nDeze post gebruikt de default page configuratie in Zapier.\n\n#SeniorEase #Test"
    }
  }
];

console.log("🧪 Zapier Facebook Posting Tests\n");
console.log("=" .repeat(50));
console.log("\nDeze tests proberen verschillende manieren om naar Facebook te posten.\n");

console.log("📋 Testconfiguraties:");
tests.forEach((test, i) => {
  console.log(`\n${i + 1}. ${test.name}`);
  console.log(`   Message: ${test.config.message.substring(0, 50)}...`);
  console.log(`   Page: ${test.config.page || '(default from Zapier)'}`);
});

console.log("\n" + "=".repeat(50));
console.log("\n🎯 Hoe te gebruiken:");
console.log("\n1. Open Cursor");
console.log("2. Roep de Zapier MCP tool aan:");
console.log("\n   mcp_Zapier_facebook_pages_create_page_post({");
console.log('     instructions: "Post to SeniorEase Facebook page",');
console.log('     message: "Jouw bericht hier",');
console.log('     page: "117953082079657"  // ← Gebruik dit Page ID!');
console.log("   })\n");

console.log("=" .repeat(50));
console.log("\n💡 Tips:");
console.log("\n✅ Gebruik Page ID (117953082079657) in plaats van naam");
console.log("✅ Of configureer default page in Zapier dashboard:");
console.log("   → https://mcp.zapier.com/mcp/servers/779dfd48-07b3-4171-945e-83e9ce4d8fe7/config");
console.log("\n✅ Check Zapier execution history bij errors:");
console.log("   → https://mcp.zapier.com/mcp/servers/779dfd48-07b3-4171-945e-83e9ce4d8fe7/history\n");

console.log("=" .repeat(50));
console.log("\n📝 Alternatieven:");
console.log("\n1. Direct Facebook API gebruiken (zie FACEBOOK-POSTING-COMPLETE-GUIDE.md sectie B)");
console.log("2. Vercel cron job met Facebook API (automatisch posten)");
console.log("3. Hybrid approach (beide methoden als backup)\n");

export { tests };



