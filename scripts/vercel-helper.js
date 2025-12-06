#!/usr/bin/env node
/**
 * Vercel Helper Script
 * Automatiseert Vercel taken met API token
 */

// Use node-fetch for Node.js compatibility
const fetch = require('node-fetch');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || 'tvugyhAcGEjY1y8badtOv03K';
const VERCEL_API = 'https://api.vercel.com';

async function vercelAPI(endpoint, options = {}) {
  const url = `${VERCEL_API}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vercel API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// List all projects
async function listProjects() {
  try {
    const data = await vercelAPI('/v9/projects');
    return data.projects || [];
  } catch (error) {
    console.error('Error listing projects:', error.message);
    return [];
  }
}

// Get project details
async function getProject(projectId) {
  try {
    return await vercelAPI(`/v9/projects/${projectId}`);
  } catch (error) {
    console.error(`Error getting project ${projectId}:`, error.message);
    return null;
  }
}

// List deployments for a project
async function listDeployments(projectId, limit = 10) {
  try {
    const data = await vercelAPI(`/v6/deployments?projectId=${projectId}&limit=${limit}`);
    return data.deployments || [];
  } catch (error) {
    console.error(`Error listing deployments for ${projectId}:`, error.message);
    return [];
  }
}

// Get deployment details
async function getDeployment(deploymentId) {
  try {
    return await vercelAPI(`/v13/deployments/${deploymentId}`);
  } catch (error) {
    console.error(`Error getting deployment ${deploymentId}:`, error.message);
    return null;
  }
}

// Get deployment logs
async function getDeploymentLogs(deploymentId) {
  try {
    const data = await vercelAPI(`/v2/deployments/${deploymentId}/events`);
    return data || [];
  } catch (error) {
    console.error(`Error getting logs for ${deploymentId}:`, error.message);
    return [];
  }
}

// List domains for a project
async function listDomains(projectId) {
  try {
    const data = await vercelAPI(`/v9/projects/${projectId}/domains`);
    return data.domains || [];
  } catch (error) {
    console.error(`Error listing domains for ${projectId}:`, error.message);
    return [];
  }
}

// Redeploy a deployment
async function redeployDeployment(deploymentId, options = {}) {
  try {
    const data = await vercelAPI(`/v13/deployments/${deploymentId}`, {
      method: 'POST',
      body: JSON.stringify({
        ...options,
      }),
    });
    return data;
  } catch (error) {
    console.error(`Error redeploying ${deploymentId}:`, error.message);
    return null;
  }
}

// Main CLI interface
async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  try {
    switch (command) {
      case 'projects':
        const projects = await listProjects();
        console.log('📦 Projects:');
        projects.forEach(p => {
          console.log(`  - ${p.name} (${p.id})`);
        });
        break;

      case 'deployments':
        const projectId = args[0] || 'seniorease-site';
        const deployments = await listDeployments(projectId);
        console.log(`🚀 Deployments for ${projectId}:`);
        deployments.forEach(d => {
          console.log(`  - ${d.url} (${d.state}) - ${d.createdAt}`);
        });
        break;

      case 'logs':
        const deploymentId = args[0];
        if (!deploymentId) {
          console.error('Usage: node vercel-helper.js logs <deployment-id>');
          process.exit(1);
        }
        const logs = await getDeploymentLogs(deploymentId);
        console.log(`📋 Logs for ${deploymentId}:`);
        logs.forEach(log => {
          console.log(`  [${log.type}] ${log.payload?.text || JSON.stringify(log.payload)}`);
        });
        break;

      case 'domains':
        const projId = args[0] || 'seniorease-site';
        const domains = await listDomains(projId);
        console.log(`🌐 Domains for ${projId}:`);
        domains.forEach(d => {
          console.log(`  - ${d.name} (${d.verified ? '✅' : '❌'})`);
        });
        break;

      case 'status':
        const statusProject = args[0] || 'seniorease-site';
        const proj = await getProject(statusProject);
        if (proj) {
          console.log(`📊 Project: ${proj.name}`);
          console.log(`  ID: ${proj.id}`);
          console.log(`  Framework: ${proj.framework || 'Unknown'}`);
          const recentDeployments = await listDeployments(proj.id, 3);
          console.log(`  Recent deployments: ${recentDeployments.length}`);
          recentDeployments.forEach(d => {
            console.log(`    - ${d.state} (${d.url})`);
          });
        }
        break;

      default:
        console.log(`
Vercel Helper - Usage:

  node vercel-helper.js projects              # List all projects
  node vercel-helper.js deployments [project]  # List deployments
  node vercel-helper.js logs <deployment-id>  # Get deployment logs
  node vercel-helper.js domains [project]     # List domains
  node vercel-helper.js status [project]      # Get project status
        `);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  listProjects,
  getProject,
  listDeployments,
  getDeployment,
  getDeploymentLogs,
  listDomains,
  redeployDeployment,
};
