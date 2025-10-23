import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCart from '@/components/FloatingCart'
import CartInitializer from '@/components/CartInitializer'
import { AuthProvider } from '@/context/AuthContext'

// Configuración de la fuente Inter de Google Fonts optimizada para Next.js
// Utiliza subconjunto latino para reducir el tamaño del archivo y mejorar rendimiento
const inter = Inter({ subsets: ['latin'] })

// Metadatos globales de la aplicación para SEO y redes sociales
// Define título y descripción que aparecen en pestañas del navegador y resultados de búsqueda
export const metadata = {
  title: 'Llamativo.co - Moda Colombiana Online',
  description: 'La mejor moda colombiana con envíos a todo el país. Descubre las últimas tendencias en ropa, zapatos y accesorios.',
}

// Layout raíz de la aplicación Next.js que define la estructura base de todas las páginas
// Proporciona el wrapper HTML fundamental con providers globales y componentes comunes
// Recibe children que representa el contenido dinámico de cada página específica
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Elemento HTML raíz con idioma español de Colombia para accesibilidad y SEO
    <html lang="es-CO">
      {/* Body con clase de fuente Inter aplicada globalmente */}
      <body className={inter.className}>
        {/* Provider de autenticación que envuelve toda la aplicación */}
        {/* Proporciona estado de usuario y funciones de auth a todos los componentes hijos */}
        <AuthProvider>
          {/* Inicializador del carrito para manejar migración de datos */}
          <CartInitializer />
          {/* Contenedor principal con altura mínima completa y layout flexbox */}
          {/* Establece la estructura base: header fijo, contenido flexible, footer */}
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header de navegación fijo en la parte superior */}
            <Header />
            {/* Contenedor principal del contenido dinámico con espaciado responsivo */}
            {/* flex-grow permite que este elemento ocupe el espacio disponible */}
            {/* Padding top para compensar header fijo, padding bottom para espacio del footer */}
            <main className="flex-grow pt-16 pb-24 md:pb-8">
              {children}
            </main>
            {/* Carrito flotante que se mantiene visible en todas las páginas */}
            <FloatingCart />
            {/* Footer con información de la empresa y enlaces importantes */}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}