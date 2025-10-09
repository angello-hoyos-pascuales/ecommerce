'use client'

import React from 'react'
import { useCartStore } from '@/store/cartStore'

// Base de datos estática simulada con productos de ejemplo
// Contiene información completa de productos para demostrar funcionalidad del carrito
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 5499000,
    description: 'El smartphone más avanzado',
    image: '/api/placeholder/400/400',
    category: 'electronics',
    stock: 10,
    featured: true
  },
  {
    id: '2',
    name: 'AirPods Pro',
    price: 899000,
    description: 'Auriculares inalámbricos premium',
    image: '/api/placeholder/400/400',
    category: 'electronics',
    stock: 15,
    featured: true
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    price: 8999000,
    description: 'Laptop profesional de última generación',
    image: '/api/placeholder/400/400',
    category: 'electronics',
    stock: 5,
    featured: true
  }
]

// Componente principal de la página de productos premium
// Muestra una colección curada de productos con funcionalidad de carrito integrada
export default function ProductosPage() {
  // Accede a la función para agregar elementos al estado global del carrito
  const { addItem } = useCartStore()

  // Función para procesar la adición de productos al carrito de compras
  // Transforma el producto seleccionado al formato requerido por el store
  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant: {
        color: 'default',
        size: 'default'
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado de la página con título y descripción promocional */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Productos Premium
          </h1>
          <p className="text-lg text-gray-600">
            Descubre nuestros productos más exclusivos
          </p>
        </div>

        {/* Grid responsivo de productos con efectos hover y animaciones premium */}
        {/* Grid responsivo de productos con efectos hover y animaciones premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapeo de productos individuales con card interactiva y efectos visuales */}
          {mockProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Área de imagen del producto con gradiente y efectos de hover */}
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Placeholder visual del producto usando inicial del nombre */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Sección de información del producto con detalles y controles de compra */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                
                {/* Área de pricing y información de stock con formato localizado */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-black text-primary-600">
                    ${product.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </div>
                </div>
                
                {/* Botón de acción principal para agregar producto al carrito */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-primary-600 hover:to-secondary-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sección informativa sobre funcionalidades del carrito flotante para testing */}
        <div className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">
            🛒 Prueba el Carrito Flotante
          </h2>
          <p className="text-yellow-700 mb-4">
            Agrega productos al carrito para ver el nuevo botón flotante en dispositivos móviles
          </p>
          {/* Tags informativos sobre características del carrito móvil */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-yellow-600">
            <span className="bg-yellow-100 px-3 py-1 rounded-full">📱 Solo visible en móviles</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full">✨ Animaciones premium</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full">🎯 Posición fija inferior</span>
          </div>
        </div>
      </div>
    </div>
  )
}