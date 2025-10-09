// Importaciones necesarias para el componente
import React from 'react'
import Link from 'next/link'  // Componente de navegación de Next.js para SPA routing

// Componente Footer principal que renderiza el pie de página del sitio
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Contenedor principal con padding y responsive grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Grid responsive que se adapta de 1 columna en móvil a 4 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Primera columna: Información de la empresa y redes sociales */}
          <div>
            {/* Logo principal con colores de marca */}
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary-400">Llamativo</span>
              <span className="text-secondary-400">.co</span>
            </h3>
            {/* Descripción de la empresa */}
            <p className="text-gray-400 mb-4">
              Tu tienda de moda online favorita en Colombia. Calidad, estilo y los mejores precios.
            </p>
            {/* Iconos de redes sociales con enlaces externos */}
            <div className="flex space-x-4">
              {/* Enlaces a redes sociales con iconos SVG y efectos hover */}
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.523 14.29c.517.428 1.18.685 1.926.685 1.67 0 3.023-1.353 3.023-3.023S9.12 8.929 7.45 8.929c-.746 0-1.409.257-1.926.685L4.122 8.213c.88-.807 2.031-1.297 3.328-1.297 2.726 0 4.939 2.213 4.939 4.939s-2.213 4.939-4.939 4.939z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Segunda columna: Navegación de productos por categorías */}
          <div>
            {/* Título de sección con icono */}
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Productos
            </h4>
            {/* Lista de categorías de productos con navegación interna */}
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=moda-femenina" className="text-gray-400 hover:text-white transition-colors">
                  Moda Femenina
                </Link>
              </li>
              <li>
                <Link href="/products?category=moda-masculina" className="text-gray-400 hover:text-white transition-colors">
                  Moda Masculina
                </Link>
              </li>
              <li>
                <Link href="/products?category=accesorios" className="text-gray-400 hover:text-white transition-colors">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/products?category=zapatos" className="text-gray-400 hover:text-white transition-colors">
                  Zapatos
                </Link>
              </li>
              <li>
                <Link href="/products?category=deportiva" className="text-gray-400 hover:text-white transition-colors">
                  Ropa Deportiva
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Tercera columna: Enlaces de ayuda y soporte al cliente */}
          <div>
            {/* Título de sección con icono de ayuda */}
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ayuda
            </h4>
            {/* Lista de páginas de ayuda y soporte */}
            <ul className="space-y-2">
              <li>
                <Link href="/help/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Envíos a Colombia
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-gray-400 hover:text-white transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/help/sizing" className="text-gray-400 hover:text-white transition-colors">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/help/payment" className="text-gray-400 hover:text-white transition-colors">
                  Medios de Pago
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cuarta columna: Información de contacto y horarios */}
          <div>
            {/* Título de sección con icono de teléfono */}
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contacto
            </h4>
            {/* Información de contacto con iconos descriptivos */}
            <div className="space-y-2 text-gray-400">
              {/* Email de contacto */}
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hola@llamativo.co
              </p>
              {/* Número de teléfono */}
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +57 (1) 234-5678
              </p>
              {/* Ubicación física */}
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bogotá, Colombia
              </p>
            </div>
            
            {/* Sección de horarios de atención al cliente */}
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Horarios de Atención</h5>
              <p className="text-gray-400 text-sm">
                Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                Sábados: 9:00 AM - 5:00 PM<br />
                Domingos: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>
        
        {/* Sección inferior del footer con copyright y enlaces legales */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Layout responsive que apila en móvil y se distribuye en desktop */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright y créditos */}
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2025 Llamativo.co - Todos los derechos reservados. Hecho con ❤️ en Colombia
            </p>
            {/* Enlaces legales importantes */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Exporta el componente para uso en el layout principal
export default Footer