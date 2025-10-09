'use client'

import React from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCartStore()

  const subtotal = total
  // IVA del 19% sobre productos gravados (la mayoría de productos de moda)
  const iva = Math.round(subtotal * 0.19)
  
  // Impuesto al consumo solo aplica a productos de lujo (>$238.000 en 2025)
  // Solo aplicamos a productos individuales que superen este valor
  const impuestoConsumo = items.reduce((acc, item) => {
    const precioUnitario = item.price
    if (precioUnitario > 238000) { // Umbral para impuesto al consumo
      return acc + Math.round(item.price * item.quantity * 0.08)
    }
    return acc
  }, 0)
  
  const totalFinal = subtotal + iva + impuestoConsumo

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
              <p className="text-gray-600 mb-6">
                ¡Descubre nuestros increíbles productos y agrega algunos a tu carrito!
              </p>
              <Link 
                href="/products" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras ({itemCount} productos)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Productos en tu carrito
                  </h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${item.variant.color}-${item.variant.size}`} className="p-6 flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👕</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Color: {item.variant.color}, Talla: {item.variant.size}
                      </p>
                      <p className="text-lg font-semibold text-primary-600 mt-2">
                        {formatPrice(item.price)} COP
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.variant)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (19%)</span>
                  <span className="font-semibold">{formatPrice(iva)}</span>
                </div>
                {impuestoConsumo > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Imp. Consumo (8%)*</span>
                    <span className="font-semibold">{formatPrice(impuestoConsumo)}</span>
                  </div>
                )}
                {subtotal >= 150000 && (
                  <div className="flex justify-between text-green-600">
                    <span>Envío</span>
                    <span className="font-semibold">¡Gratis!</span>
                  </div>
                )}
                {subtotal < 150000 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-semibold">$15.000</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {formatPrice(totalFinal + (subtotal < 150000 ? 15000 : 0))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  href="/checkout"
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center block"
                >
                  Proceder al Pago
                </Link>
                <Link 
                  href="/products" 
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
                >
                  Seguir Comprando
                </Link>
              </div>

              {/* Métodos de Pago */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Métodos de Pago Aceptados</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    PSE
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Visa/Mastercard
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Contraentrega
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Transferencia
                  </div>
                </div>
              </div>

              {/* Envío */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Envío gratis en compras superiores a $150.000
                </div>
                {impuestoConsumo > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    * Impuesto al consumo aplica solo a productos superiores a $238.000
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}