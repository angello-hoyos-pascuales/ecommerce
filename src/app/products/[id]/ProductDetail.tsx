'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

// Define la interfaz para las propiedades del componente de detalle del producto
interface ProductDetailProps {
  productId: string
}

// Componente principal para mostrar los detalles completos de un producto específico
// Permite al usuario ver información detallada, seleccionar variantes y agregar al carrito
export default function ProductDetail({ productId }: ProductDetailProps) {
  // Accede a la función para agregar elementos al carrito global
  const { addItem } = useCartStore()
  // Hook para navegación programática entre páginas
  const router = useRouter()
  
  // Base de datos estática de productos con información completa incluida
  // variantes de color/talla, precios, características y metadata del producto
  const products = [
    {
      id: 'product-0',
      name: 'Camiseta Básica Premium',
      price: 89900,
      originalPrice: 109900,
      description: 'Camiseta de algodón 100% premium, perfecta para uso diario. Corte moderno y cómodo.',
      images: ['👕', '👔', '🎽', '👗'],
      colors: [
        { name: 'Negro', value: '#000000', available: true },
        { name: 'Blanco', value: '#FFFFFF', available: true },
        { name: 'Gris', value: '#808080', available: true },
        { name: 'Azul', value: '#0066CC', available: false }
      ],
      sizes: [
        { name: 'XS', available: true },
        { name: 'S', available: true },
        { name: 'M', available: true },
        { name: 'L', available: true },
        { name: 'XL', available: false }
      ],
      features: ['100% Algodón', 'Corte Regular', 'Lavable en máquina', 'Resistente al desgaste'],
      category: 'Camisetas',
      brand: 'Llamativo',
      sku: 'CAM-BAS-001',
      stock: 45,
      rating: 4.5,
      reviews: 127
    },
    {
      id: 'product-1',
      name: 'Vestido Elegante',
      price: 124900,
      originalPrice: 149900,
      description: 'Vestido elegante perfecto para ocasiones especiales. Diseño moderno y cómodo.',
      images: ['👗', '💃', '🌟', '✨'],
      colors: [
        { name: 'Negro', value: '#000000', available: true },
        { name: 'Rojo', value: '#CC0000', available: true },
        { name: 'Azul', value: '#0066CC', available: true }
      ],
      sizes: [
        { name: 'XS', available: true },
        { name: 'S', available: true },
        { name: 'M', available: true },
        { name: 'L', available: true },
        { name: 'XL', available: true }
      ],
      features: ['Tela Premium', 'Diseño Elegante', 'Cómodo', 'Perfecto para Eventos'],
      category: 'Vestidos',
      brand: 'Llamativo',
      sku: 'VES-ELE-001',
      stock: 23,
      rating: 4.8,
      reviews: 89
    },
    {
      id: 'product-2',
      name: 'Pantalón Casual Denim',
      price: 156900,
      originalPrice: 189900,
      description: 'Pantalón casual de denim de alta calidad, perfecto para el día a día.',
      images: ['👖', '🦵', '💪', '🔥'],
      colors: [
        { name: 'Azul Oscuro', value: '#1a1a2e', available: true },
        { name: 'Azul Claro', value: '#4dabf7', available: true },
        { name: 'Negro', value: '#000000', available: false }
      ],
      sizes: [
        { name: 'S', available: true },
        { name: 'M', available: true },
        { name: 'L', available: true },
        { name: 'XL', available: true },
        { name: 'XXL', available: false }
      ],
      features: ['Denim Premium', 'Ajuste Perfecto', 'Resistente', 'Estilo Casual'],
      category: 'Pantalones',
      brand: 'Llamativo',
      sku: 'PAN-DEN-001',
      stock: 8,
      rating: 4.3,
      reviews: 156
    }
  ]

  // Busca el producto específico por ID o usa el primer producto como fallback
  const product = products.find(p => p.id === productId) || products[0]

  // Estados para manejar las selecciones del usuario en la página del producto
  // Inicializa con la primera opción disponible de cada variante
  const [selectedColor, setSelectedColor] = useState(product.colors.find(c => c.available)?.name || product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.available)?.name || product.sizes[0].name)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Formatea números a moneda colombiana con formato localizado
  // Formatea números a moneda colombiana con formato localizado
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Función para agregar el producto configurado al carrito de compras
  // Crea un objeto con toda la información necesaria para el carrito
  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      variant: {
        color: selectedColor,
        size: selectedSize
      }
    }

    addItem(cartItem)
    alert(`¡${product.name} agregado al carrito!\nColor: ${selectedColor}, Talla: ${selectedSize}, Cantidad: ${quantity}`)
  }

  // Función de compra rápida que agrega al carrito y navega directamente al checkout
  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/cart')
  }

  // Calcula el porcentaje de descuento basado en precio original vs precio actual
  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return 0
  }

  const discount = calculateDiscount()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb - Navegación jerárquica para mostrar la ubicación actual del producto */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-primary-600">Inicio</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link href="/products" className="hover:text-primary-600">Productos</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link href={`/products?category=${product.category}`} className="hover:text-primary-600">{product.category}</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-400">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería de Imágenes - Sección izquierda con imagen principal y miniaturas */}
        <div className="space-y-4">
          {/* Imagen principal del producto con badge de descuento opcional */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                -{discount}%
              </div>
            )}
            <span className="text-9xl transform hover:scale-110 transition-transform duration-300">
              {product.images[selectedImage]}
            </span>
          </div>
          
          {/* Grid de miniaturas para navegación entre imágenes del producto */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors ${
                  selectedImage === index ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {image}
              </button>
            ))}
          </div>
        </div>

        {/* Información del Producto - Sección derecha con detalles, precios y controles de compra */}
        <div className="space-y-6">
          {/* Encabezado con nombre del producto y sistema de valoraciones */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            </div>
          </div>

          {/* Precio - Muestra precio actual, precio original y cálculo de descuentos */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-green-600 font-medium">
                ¡Ahorra {formatPrice(product.originalPrice - product.price)}! ({discount}% de descuento)
              </p>
            )}
          </div>

          {/* Información del Producto - Metadata técnica como SKU, marca y stock */}
          <div className="border-t border-b py-4 space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>SKU:</strong> {product.sku}</div>
              <div><strong>Marca:</strong> {product.brand}</div>
              <div><strong>Categoría:</strong> {product.category}</div>
              <div><strong>Stock:</strong> {product.stock} unidades</div>
            </div>
          </div>

          {/* Descripción - Texto descriptivo del producto para información del cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Características - Lista de beneficios y propiedades del producto */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Selecciones - Controles interactivos para personalizar el producto antes de comprar */}
          <div className="space-y-4">
            {/* Color - Selector visual de colores disponibles con indicadores de disponibilidad */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`w-10 h-10 rounded-full border-2 relative ${
                      selectedColor === color.name ? 'border-primary-500' : 'border-gray-300'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name + (color.available ? '' : ' (No disponible)')}
                  >
                    {selectedColor === color.name && (
                      <svg className="w-6 h-6 text-white absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {!color.available && (
                      <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Talla - Selector de tallas con estados habilitado/deshabilitado según disponibilidad */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Talla: <span className="font-normal text-gray-600">{selectedSize}</span></h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size.name
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : size.available
                        ? 'border-gray-300 hover:border-primary-400'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad - Control numérico para seleccionar cantidad con límites de stock */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} disponibles
                </span>
              </div>
            </div>
          </div>

          {/* Botones de Acción - Controles principales para compra inmediata o agregar al carrito */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Comprar Ahora - {formatPrice(product.price * quantity)}
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              Agregar al Carrito
            </button>
          </div>

          {/* Información Adicional - Beneficios y garantías de la compra para generar confianza */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Envío gratis en compras superiores a $150.000
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Devoluciones gratuitas dentro de 30 días
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Garantía de satisfacción 100%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}