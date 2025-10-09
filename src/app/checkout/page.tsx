'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

// Página de checkout: proceso de finalización de compra con formularios, cálculos y validaciones
export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, itemCount, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  
  // Estado del formulario con toda la información necesaria para el checkout
  const [formData, setFormData] = useState({
    // Información personal del cliente
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Dirección de envío completa
    address: '',
    city: '',
    department: '',
    postalCode: '',
    
    // Método de pago seleccionado
    paymentMethod: 'pse',
    
    // Consentimientos legales requeridos
    acceptTerms: false,
    acceptPrivacy: false
  })

  // Cálculos automáticos de precios, impuestos y costos de envío según regulación colombiana
  const subtotal = total
  const iva = Math.round(subtotal * 0.19)
  const impuestoConsumo = items.reduce((acc, item) => {
    if (item.price > 238000) {
      return acc + Math.round(item.price * item.quantity * 0.08)
    }
    return acc
  }, 0)
  const envio = subtotal >= 150000 ? 0 : 15000
  const totalFinal = subtotal + iva + impuestoConsumo + envio

  // Función para formatear precios en formato de moneda colombiana
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Manejador de cambios en formulario: actualiza el estado según el tipo de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Función principal de envío del formulario: validación, procesamiento y redirección
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación de términos y condiciones requeridos por ley
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      alert('Debes aceptar los términos y condiciones y la política de privacidad')
      return
    }

    setLoading(true)

    try {
      // Simulación de procesamiento de pago (en producción sería integración con pasarela)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Creación del objeto de orden con toda la información del checkout
      const orderData = {
        items,
        total: totalFinal,
        customerInfo: formData,
        orderDate: new Date().toISOString(),
        status: 'pending'
      }

      // Aquí se realizaría la llamada a la API de pago real (Stripe, PayU, etc.)
      console.log('Procesando orden:', orderData)
      
      // Limpiar carrito tras procesamiento exitoso
      clearCart()
      
      // Redirección a página de confirmación de compra
      router.push('/checkout/success')
      
    } catch (error) {
      console.error('Error procesando pago:', error)
      alert('Error procesando el pago. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Protección de ruta: redirigir si el carrito está vacío
  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <Link href="/products" className="bg-primary-600 text-white px-6 py-3 rounded-lg">
            Ver Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario principal de checkout con toda la información requerida */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sección de información personal del cliente */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección de dirección de envío para la entrega del pedido */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Calle, número, apartamento, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Departamento *
                        </label>
                        {/* Selector de departamentos colombianos para cálculo de envío */}
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Seleccionar</option>
                          <option value="antioquia">Antioquia</option>
                          <option value="atlantico">Atlántico</option>
                          <option value="bogota">Bogotá D.C.</option>
                          <option value="bolivar">Bolívar</option>
                          <option value="cundinamarca">Cundinamarca</option>
                          <option value="valle">Valle del Cauca</option>
                          <option value="santander">Santander</option>
                          <option value="risaralda">Risaralda</option>
                          <option value="caldas">Caldas</option>
                          <option value="quindio">Quindío</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección de métodos de pago disponibles en Colombia */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                  <div className="space-y-3">
                    {/* PSE: sistema de pagos electrónicos estándar en Colombia */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pse"
                        checked={formData.paymentMethod === 'pse'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium">PSE - Pago Seguro en Línea</span>
                    </label>
                    {/* Tarjetas de crédito y débito convencionales */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium">Tarjeta de Crédito/Débito</span>
                    </label>
                    {/* Contraentrega: pago al recibir el producto */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="contraentrega"
                        checked={formData.paymentMethod === 'contraentrega'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium">Contraentrega</span>
                    </label>
                  </div>
                </div>

                {/* Sección de términos y condiciones obligatorios por ley */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="space-y-3">
                    {/* Aceptación de términos y condiciones del servicio */}
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm">
                        Acepto los{' '}
                        <Link href="/terms" className="text-primary-600 hover:underline">
                          términos y condiciones
                        </Link>{' '}
                        de Llamativo.co *
                      </span>
                    </label>
                    {/* Consentimiento para tratamiento de datos personales (HABEAS DATA) */}
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="acceptPrivacy"
                        checked={formData.acceptPrivacy}
                        onChange={handleInputChange}
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm">
                        Acepto la{' '}
                        <Link href="/privacy" className="text-primary-600 hover:underline">
                          política de privacidad
                        </Link>{' '}
                        y el tratamiento de mis datos personales *
                      </span>
                    </label>
                  </div>
                </div>

                {/* Botón de confirmación de pedido con estado de carga y validaciones */}
                <button
                  type="submit"
                  disabled={loading || !formData.acceptTerms || !formData.acceptPrivacy}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Procesando...' : `Confirmar Pedido - ${formatPrice(totalFinal)}`}
                </button>
              </form>
            </div>

            {/* Panel lateral con resumen detallado del pedido y totales */}
            <div className="lg:sticky lg:top-4 lg:h-fit">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
                
                {/* Lista de productos en el carrito con detalles */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variant.color}-${item.variant.size}`} className="flex gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">👕</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-600">
                          {item.variant.color}, {item.variant.size} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desglose detallado de costos y cálculo de totales */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA (19%)</span>
                    <span>{formatPrice(iva)}</span>
                  </div>
                  {/* Impuesto al consumo aplicable a productos de lujo */}
                  {impuestoConsumo > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Imp. Consumo (8%)</span>
                      <span>{formatPrice(impuestoConsumo)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className={envio === 0 ? 'text-green-600 font-medium' : ''}>
                      {envio === 0 ? '¡Gratis!' : formatPrice(envio)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(totalFinal)}</span>
                  </div>
                </div>

                {/* Indicador de seguridad para generar confianza en el proceso de pago */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Compra 100% segura y protegida
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}