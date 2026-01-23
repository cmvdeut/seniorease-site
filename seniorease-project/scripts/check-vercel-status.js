#!/usr/bin/env node
/**
 * Check Vercel Status - Quick Status Check
 */

const { listProjects, listDeployments, listDomains } = require('./vercel-helper');

async function checkStatus() {
  console.log('🔍 Checking Vercel Status...\n');

  // Find seniorease projects
  const projects = await listProjects();
  const senioreaseProjects = projects.filter(p => 
    p.name.includes('seniorease')
  );

  console.log(`📦 Found ${senioreaseProjects.length} SeniorEase project(s):\n`);

  for (const project of senioreaseProjects) {
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📦 ${project.name}`);
    console.log(`   ID: ${project.id}`);
    console.log(`   Framework: ${project.framework || 'Unknown'}`);

    // Get recent deployments
    const deployments = await listDeployments(project.id, 5);
    console.log(`\n   🚀 Recent Deployments (${deployments.length}):`);
    deployments.forEach((d, i) => {
      const state = d.state === 'READY' ? '✅' : d.state === 'ERROR' ? '❌' : '⏳';
      const date = new Date(d.createdAt).toLocaleString('nl-NL');
      console.log(`      ${i + 1}. ${state} ${d.url || d.id}`);
      console.log(`         State: ${d.state} | Created: ${date}`);
    });

    // Get domains
    const domains = await listDomains(project.id);
    if (domains.length > 0) {
      console.log(`\n   🌐 Domains (${domains.length}):`);
      domains.forEach(d => {
        const verified = d.verified ? '✅' : '❌';
        console.log(`      - ${verified} ${d.name}`);
      });
    }

    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Status check complete!');
}

checkStatus().catch(console.error);








