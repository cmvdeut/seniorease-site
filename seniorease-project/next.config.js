/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Voorkom dat Next de parent-monorepo als workspace-root kiest (Vercel seniorease-project vs seniorease-site).
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
  },
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/heart-logo.png' }];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  // Note: WebSocket errors in console are harmless - they're from Next.js dev mode
  // and don't affect production functionality
  // Security: React 19.2.1 + Next.js 16.0.7 (CVE-2025-55182 fixed)
  // RSC: Ensure proper React Server Components support
  experimental: {
    // Ensure RSC is properly configured
  },
}

module.exports = nextConfig
