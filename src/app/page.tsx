'use client'

import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

// Componente principal de la página de inicio del ecommerce
// Renderiza la landing page con hero section, productos destacados y secciones promocionales
export default function HomePage() {
  // Obtiene la función addItem del store global del carrito
  // Permite agregar productos al carrito desde cualquier parte del componente
  const { addItem } = useCartStore()

  // Función optimizada para agregar productos al carrito de compras
  // Recibe un producto y su índice, transforma los datos y los añade al store global
  // Incluye notificación toast temporal para confirmar la acción al usuario
  const handleAddToCart = useCallback((product: any, index: number) => {
    // Construye el objeto del item del carrito con formato estándar
    // Convierte el precio de string a número y asigna variantes por defecto
    const cartItem = {
      productId: `featured-${index}`,
      name: product.name,
      price: parseInt(product.price.replace('$', '').replace('.', '')),
      quantity: 1,
      image: '',
      variant: {
        color: 'default',
        size: 'M'
      }
    }
    // Agrega el item al store global del carrito
    addItem(cartItem)
    
    // Crea y muestra una notificación toast de confirmación
    // Solo se ejecuta en el cliente (browser) para evitar errores de SSR
    if (typeof window !== 'undefined') {
      const toast = document.createElement('div')
      toast.textContent = `${product.name} agregado al carrito!`
      toast.className = 'fixed top-20 right-4 bg-green-500 text-white p-3 rounded-lg z-50'
      document.body.appendChild(toast)
      
      // Remueve automáticamente la notificación después de 3 segundos
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 3000)
    }
  }, [addItem])

  // Array memoizado de productos destacados para la sección principal
  // Utiliza useMemo para evitar recrear el array en cada render
  // Incluye datos estáticos de productos con precios, emojis y etiquetas promocionales
  const featuredProducts = useMemo(() => [
    { name: 'Vestido Veraniego', price: '$124.900', emoji: '👗', tag: 'Nuevo' },
    { name: 'Camisa Guayabera', price: '$89.900', emoji: '👔', tag: 'Bestseller' },
    { name: 'Jeans Premium', price: '$156.900', emoji: '👖', tag: '30% OFF' },
    { name: 'Zapatos Casuales', price: '$199.900', emoji: '👟', tag: 'Trending' }
  ], [])

  return (
    // Contenedor principal de la página con altura mínima completa
    <div className="min-h-screen">
      {/* Sección hero principal con gradiente de fondo y call-to-actions */}
      {/* Incluye título principal, descripción y botones de navegación prominentes */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a Llamativo.co!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre las ultimas tendencias de moda colombiana con envios gratis a toda Colombia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Ver Productos
            </Link>
            <Link 
              href="/categories" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Explorar Categorias
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de productos destacados con grid responsivo */}
      {/* Mapea el array de productos y crea cards interactivas con botones de acción */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.tag}
                  </span>
                  <span className="text-5xl">{product.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-primary-600 mb-3">{product.price} COP</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(product, index)}
                      className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors"
                    >
                      Carrito
                    </button>
                    <Link 
                      href="/products" 
                      className="flex-1 border border-primary-600 text-primary-600 py-2 rounded hover:bg-primary-600 hover:text-white transition-colors text-center"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
