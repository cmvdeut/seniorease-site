/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Optimalisaties voor snellere laadtijden
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Compressie (standaard aan in Next.js 16)
  compress: true,
}

module.exports = nextConfig
