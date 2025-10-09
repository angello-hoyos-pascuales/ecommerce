'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

// Componente de página del catálogo de productos con funcionalidades completas
// Incluye filtrado por categoría, ordenamiento, paginación y agregado rápido al carrito
// Renderiza grid responsivo de productos con información detallada y acciones
export default function ProductsPage() {
  // Obtiene función para agregar items al carrito desde el store global
  const { addItem } = useCartStore()
  
  // Estados para controlar filtros, ordenamiento y paginación
  const [selectedCategory, setSelectedCategory] = useState('')  // Filtro de categoría activa
  const [sortBy, setSortBy] = useState('')                     // Criterio de ordenamiento
  const [currentPage, setCurrentPage] = useState(1)            // Página actual para paginación
  const productsPerPage = 8                                    // Cantidad de productos por página

  // Array de productos con información completa para el catálogo
  // Incluye datos de precio, imágenes, variantes, ratings y estados promocionales
  const products = [
    { 
      id: 'product-0', 
      name: 'Camiseta Básica Premium', 
      price: 89900,
      originalPrice: 109900,
      image: '👕',
      category: 'Camisetas',
      rating: 4.5,
      reviews: 127,
      colors: ['Negro', 'Blanco', 'Gris'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      discount: 18,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-1', 
      name: 'Vestido Elegante', 
      price: 124900,
      originalPrice: 149900,
      image: '👗',
      category: 'Vestidos',
      rating: 4.8,
      reviews: 89,
      colors: ['Negro', 'Rojo', 'Azul'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      discount: 17,
      isNew: true,
      isOffer: true
    },
    { 
      id: 'product-2', 
      name: 'Pantalón Casual Denim', 
      price: 156900,
      originalPrice: 189900,
      image: '👖',
      category: 'Pantalones',
      rating: 4.3,
      reviews: 156,
      colors: ['Azul', 'Negro', 'Gris'],
      sizes: ['28', '30', '32', '34', '36'],
      discount: 17,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-3', 
      name: 'Chaqueta Deportiva', 
      price: 189900,
      originalPrice: 229900,
      image: '🧥',
      category: 'Chaquetas',
      rating: 4.6,
      reviews: 203,
      colors: ['Negro', 'Azul Marino', 'Gris'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      discount: 17,
      isNew: true,
      isOffer: true
    },
    { 
      id: 'product-4', 
      name: 'Zapatos Ejecutivos', 
      price: 234900,
      originalPrice: 279900,
      image: '👞',
      category: 'Calzado',
      rating: 4.7,
      reviews: 134,
      colors: ['Negro', 'Café', 'Marrón'],
      sizes: ['38', '39', '40', '41', '42', '43'],
      discount: 16,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-5', 
      name: 'Bolso de Cuero Premium', 
      price: 167900,
      originalPrice: 199900,
      image: '👜',
      category: 'Accesorios',
      rating: 4.4,
      reviews: 78,
      colors: ['Negro', 'Café', 'Beige'],
      sizes: ['Único'],
      discount: 16,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-6', 
      name: 'Reloj Deportivo Smart', 
      price: 289900,
      originalPrice: 349900,
      image: '⌚',
      category: 'Tecnología',
      rating: 4.9,
      reviews: 267,
      colors: ['Negro', 'Plata', 'Dorado'],
      sizes: ['S/M', 'M/L'],
      discount: 17,
      isNew: true,
      isOffer: true
    },
    { 
      id: 'product-7', 
      name: 'Gafas de Sol Polarizadas', 
      price: 198900,
      originalPrice: 239900,
      image: '🕶️',
      category: 'Accesorios',
      rating: 4.2,
      reviews: 91,
      colors: ['Negro', 'Café', 'Azul'],
      sizes: ['Único'],
      discount: 17,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-8', 
      name: 'Gorra Casual Unisex', 
      price: 78900,
      originalPrice: 94900,
      image: '🧢',
      category: 'Accesorios',
      rating: 4.1,
      reviews: 145,
      colors: ['Negro', 'Blanco', 'Azul', 'Rojo'],
      sizes: ['S/M', 'M/L'],
      discount: 17,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-9', 
      name: 'Bufanda de Lana Merino', 
      price: 94900,
      originalPrice: 114900,
      image: '🧣',
      category: 'Accesorios',
      rating: 4.5,
      reviews: 67,
      colors: ['Gris', 'Beige', 'Negro', 'Azul'],
      sizes: ['Único'],
      discount: 17,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-10', 
      name: 'Camisa Formal Ejecutiva', 
      price: 134900,
      originalPrice: 159900,
      image: '👔',
      category: 'Camisas',
      rating: 4.6,
      reviews: 112,
      colors: ['Blanco', 'Azul Claro', 'Gris'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      discount: 16,
      isNew: false,
      isOffer: true
    },
    { 
      id: 'product-11', 
      name: 'Falda Moderna A-Line', 
      price: 98900,
      originalPrice: 119900,
      image: '💃',
      category: 'Faldas',
      rating: 4.3,
      reviews: 83,
      colors: ['Negro', 'Azul Marino', 'Gris'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      discount: 18,
      isNew: true,
      isOffer: true
    }
  ]

  // Función para formatear precios en pesos colombianos con formato local
  // Utiliza Intl.NumberFormat para mostrar moneda COP sin decimales
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Función para agregar producto rápidamente al carrito con variantes por defecto
  // Toma el primer color y talla disponibles y muestra confirmación al usuario
  const handleQuickAddToCart = (product: any) => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant: {
        color: product.colors[0],
        size: product.sizes[0]
      }
    }
    addItem(cartItem)
    alert(`¡${product.name} agregado al carrito!\nColor: ${product.colors[0]}, Talla: ${product.sizes[0]}`)
  }

  // Función de filtrado que aplica filtro de categoría seleccionada
  // Retorna todos los productos si no hay categoría seleccionada
  const filteredProducts = products.filter(product => 
    selectedCategory === '' || product.category === selectedCategory
  )

  // Función de ordenamiento que aplica diferentes criterios de sorting
  // Incluye ordenamiento por precio, rating y productos nuevos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.isNew ? 1 : -1
      default:
        return 0
    }
  })

  // Lógica de paginación: calcula productos a mostrar en página actual
  // Determina índices de inicio y fin para slice del array de productos
  const totalProducts = sortedProducts.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  // Función para cambiar de página y hacer scroll suave al inicio
  // Actualiza estado de página actual y mejora UX con scroll automático
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Función para navegar a página anterior con validación de límites
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  // Función para navegar a página siguiente con validación de límites
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Efecto que resetea la paginación cuando cambian los filtros
  // Evita que el usuario quede en una página vacía después de filtrar
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, sortBy])

  return (
    // Contenedor principal del catálogo con padding y centrado responsivo
    <div className="container mx-auto px-4 py-8">
      {/* Header del catálogo con título y controles de filtrado/ordenamiento */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 lg:mb-0">Catálogo de Productos 🇨🇴</h1>
        {/* Controles de filtrado: select de categorías y ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Select para filtrar por categoría */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todas las categorías</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Vestidos">Vestidos</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Chaquetas">Chaquetas</option>
            <option value="Calzado">Calzado</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Camisas">Camisas</option>
            <option value="Faldas">Faldas</option>
          </select>
          {/* Select para ordenar productos por diferentes criterios */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Ordenar por</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificación</option>
            <option value="newest">Más Recientes</option>
          </select>
        </div>
      </div>

      {/* Grid responsivo de productos con animaciones y hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          // Card individual de producto con hover effects y badges promocionales
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Link envolvente para la imagen del producto */}
            <Link href={`/products/${product.id}`}>
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden cursor-pointer">
                {/* Badges de promoción y estado del producto */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isOffer && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Nuevo
                    </span>
                  )}
                </div>
                {/* Emoji del producto con animación de escala en hover */}
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                {/* Overlay de hover con opacidad gradual */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </Link>
            
            {/* Contenido del card con información del producto */}
            <div className="p-4">
              {/* Título del producto con link y hover effect */}
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors cursor-pointer">
                  {product.name}
                </h3>
              </Link>
              
              {/* Sistema de rating con estrellas visuales y número de reseñas */}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              {/* Sección de precios con precio actual y precio original tachado */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {/* Información de variantes disponibles: colores y tallas */}
                <p className="text-xs text-gray-600">
                  Colores: {product.colors.slice(0, 3).join(', ')}{product.colors.length > 3 && '...'}
                </p>
                <p className="text-xs text-gray-600">
                  Tallas: {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 && '...'}
                </p>
              </div>

              {/* Botones de acción: ver detalles y agregar al carrito */}
              <div className="flex gap-2">
                <Link 
                  href={`/products/${product.id}`}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-center hover:bg-gray-200 transition-colors text-sm"
                >
                  Ver Detalles
                </Link>
                <button 
                  onClick={() => handleQuickAddToCart(product)}
                  className="flex-1 bg-primary-600 text-white py-2 px-3 rounded hover:bg-primary-700 transition-colors flex items-center justify-center text-sm"
                >
                  {/* Icono de carrito SVG */}
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 8.88a2 2 0 001.92 2.12h9.52c.94 0 1.76-.67 1.92-1.62L19 13m-10 0a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sistema de paginación con información de productos y controles de navegación */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center space-y-4">
          {/* Información de productos mostrados en página actual */}
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, totalProducts)} de {totalProducts} productos
          </div>
          
          {/* Controles de navegación entre páginas */}
          <div className="flex space-x-2">
            {/* Botón para página anterior con validación de límites */}
            <button 
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {/* Generación dinámica de números de página con lógica de ellipsis */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              const isCurrentPage = page === currentPage
              
              // Mostrar solo algunas páginas alrededor de la actual para mejor UX
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isCurrentPage
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              } else if (
                page === currentPage - 2 || 
                page === currentPage + 2
              ) {
                // Muestra ellipsis (...) cuando hay páginas omitidas
                return (
                  <span key={page} className="px-2 py-2 text-gray-400">
                    ...
                  </span>
                )
              }
              return null
            })}
            
            {/* Botón para página siguiente con validación de límites */}
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}