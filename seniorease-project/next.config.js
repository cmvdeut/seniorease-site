/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/heart-logo.png' }];
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
