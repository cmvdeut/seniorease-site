/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Note: WebSocket errors in console are harmless - they're from Next.js dev mode
  // and don't affect production functionality
}

module.exports = nextConfig
