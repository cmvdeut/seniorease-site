/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Disable development features in production
  reactStrictMode: true,
  // Suppress WebSocket errors in production
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Remove WebSocket client code in production
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    return config;
  },
}

module.exports = nextConfig
