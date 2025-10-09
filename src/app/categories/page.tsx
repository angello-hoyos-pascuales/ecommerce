import React from 'react'
import Link from 'next/link'

// Configuración estática de categorías de productos con metadatos completos
const categories = [
  {
    id: 'moda-femenina',
    name: 'Moda Femenina',
    description: 'Encuentra las últimas tendencias en moda para mujer',
    image: '/api/placeholder/300/200',
    count: 45,
    icon: '👗'
  },
  {
    id: 'moda-masculina',
    name: 'Moda Masculina',
    description: 'Estilo y elegancia para el hombre moderno',
    image: '/api/placeholder/300/200',
    count: 38,
    icon: '👔'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Complementa tu look con nuestros accesorios únicos',
    image: '/api/placeholder/300/200',
    count: 28,
    icon: '👜'
  },
  {
    id: 'zapatos',
    name: 'Zapatos',
    description: 'Calzado de calidad para toda ocasión',
    image: '/api/placeholder/300/200',
    count: 32,
    icon: '👠'
  },
  {
    id: 'deportiva',
    name: 'Ropa Deportiva',
    description: 'Comodidad y estilo para tus entrenamientos',
    image: '/api/placeholder/300/200',
    count: 25,
    icon: '🏃‍♀️'
  },
  {
    id: 'jovenes',
    name: 'Moda Joven',
    description: 'Tendencias frescas para la nueva generación',
    image: '/api/placeholder/300/200',
    count: 22,
    icon: '🦄'
  },
  {
    id: 'ofertas',
    name: 'Ofertas Especiales',
    description: 'Los mejores descuentos y promociones',
    image: '/api/placeholder/300/200',
    count: 18,
    icon: '🏷️'
  },
  {
    id: 'marcas-premium',
    name: 'Marcas Premium',
    description: 'Lujo y exclusividad en cada prenda',
    image: '/api/placeholder/300/200',
    count: 15,
    icon: '💎'
  }
]

// Página principal de categorías: navegación organizada del catálogo de productos
export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado descriptivo de la página de categorías */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Categorías</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora nuestra amplia selección de productos organizados por categorías. 
          Moda colombiana con estilo internacional.
        </p>
      </div>

      {/* Grid responsivo de tarjetas de categorías con efectos hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Mapeo de categorías generando tarjetas interactivas con navegación */}
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Área visual de la categoría con icono representativo */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <span className="text-6xl">{category.icon}</span>
            </div>
            {/* Contenido informativo de la categoría */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              {/* Footer con contador de productos y indicador de navegación */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {category.count} productos
                </span>
                <span className="text-primary-600 font-medium group-hover:text-primary-700 flex items-center">
                  Ver productos
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sección de búsqueda alternativa para productos específicos */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-gray-600 mb-6">
          Usa nuestro buscador para encontrar productos específicos
        </p>
        {/* Campo de búsqueda integrado para navegación alternativa */}
        <div className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="bg-primary-600 text-white px-6 py-2 rounded-r-md hover:bg-primary-700 transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}