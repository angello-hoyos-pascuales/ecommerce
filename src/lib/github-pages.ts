// Configuración para GitHub Pages
export const GITHUB_PAGES_CONFIG = {
  // Base path para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/ecommerce' : '',
  
  // Asset prefix para recursos estáticos
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecommerce' : '',
  
  // Función helper para generar URLs correctas
  getUrl: (path: string) => {
    const base = process.env.NODE_ENV === 'production' ? '/ecommerce' : ''
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  },
  
  // Función para recursos estáticos
  getAssetUrl: (asset: string) => {
    const base = process.env.NODE_ENV === 'production' ? '/ecommerce' : ''
    return `${base}${asset.startsWith('/') ? asset : `/${asset}`}`
  }
}

// Hook para uso en componentes
export const useGitHubPages = () => {
  return {
    basePath: GITHUB_PAGES_CONFIG.basePath,
    getUrl: GITHUB_PAGES_CONFIG.getUrl,
    getAssetUrl: GITHUB_PAGES_CONFIG.getAssetUrl,
    isProduction: process.env.NODE_ENV === 'production'
  }
}