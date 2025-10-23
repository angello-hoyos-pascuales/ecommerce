/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/ecommerce' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecommerce/' : '',
  
  // Optimizaciones de imágenes
  images: {
    unoptimized: true, // Necesario para static export
    domains: ['localhost', 'cloudinary.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
  },
  
  // Compresión y optimizaciones
  compress: true,
  poweredByHeader: false,
  
  // Optimizaciones experimentales
  experimental: {
    scrollRestoration: true,
  },
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers de caché optimizados
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
}

module.exports = nextConfig