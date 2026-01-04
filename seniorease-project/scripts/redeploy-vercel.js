#!/usr/bin/env node
/**
 * Redeploy Vercel Project - Force Clean Build
 */

const { listProjects, listDeployments, redeployDeployment } = require('./vercel-helper');

async function redeployProject(projectName, useCache = false) {
  console.log(`🚀 Redeploying ${projectName}...\n`);

  // Find project
  const projects = await listProjects();
  const project = projects.find(p => p.name === projectName);

  if (!project) {
    console.error(`❌ Project "${projectName}" not found!`);
    console.log('Available projects:');
    projects.forEach(p => console.log(`  - ${p.name}`));
    process.exit(1);
  }

  console.log(`📦 Found project: ${project.name} (${project.id})\n`);

  // Get latest deployment
  const deployments = await listDeployments(project.id, 1);
  if (deployments.length === 0) {
    console.error('❌ No deployments found!');
    process.exit(1);
  }

  const latestDeployment = deployments[0];
  console.log(`📋 Latest deployment: ${latestDeployment.id}`);
  console.log(`   State: ${latestDeployment.state}`);
  console.log(`   URL: ${latestDeployment.url}\n`);

  console.log(`🔄 Redeploying...`);
  console.log(`   Use cache: ${useCache ? 'Yes' : 'No (clean build)'}\n`);

  // Note: Vercel API doesn't directly support redeploy with cache control
  // This would need to be done via Vercel CLI or webhook trigger
  console.log('⚠️  Note: Full redeploy with cache control requires Vercel CLI:');
  console.log(`   vercel --prod --force`);
  console.log(`\n   Or trigger via GitHub push to main branch.`);
}

const projectName = process.argv[2] || 'seniorease-site';
const useCache = process.argv[3] === '--cache';

redeployProject(projectName, useCache).catch(console.error);






