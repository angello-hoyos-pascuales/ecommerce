'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtected from '@/components/AdminProtected'

interface ProcessOrderPageProps {
  params: Promise<{ id: string }>
}

export default function ProcessOrderPage({ params }: ProcessOrderPageProps) {
  const router = useRouter()
  const [orderId, setOrderId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [formData, setFormData] = useState({
    status: '',
    trackingNumber: '',
    notes: '',
    estimatedDelivery: '',
    shippingCompany: 'Coordinadora'
  })

  // Resolve params
  useEffect(() => {
    params.then((resolvedParams) => {
      setOrderId(resolvedParams.id)
      loadOrder(resolvedParams.id)
    })
  }, [params])

  const mockOrders: { [key: string]: any } = {
    'ORD-001': {
      id: 'ORD-001',
      customer: 'María García',
      date: '2025-10-08',
      status: 'Pendiente',
      total: 234800,
      items: [
        { name: 'Camiseta Básica Premium', quantity: 2, price: 89900 },
        { name: 'Vestido Elegante', quantity: 1, price: 124900 }
      ]
    },
    'ORD-002': {
      id: 'ORD-002',
      customer: 'Carlos Rodríguez',
      date: '2025-10-07',
      status: 'Procesando',
      total: 456700,
      items: [
        { name: 'Pantalón Casual Denim', quantity: 1, price: 156900 },
        { name: 'Chaqueta Deportiva', quantity: 1, price: 189900 }
      ]
    }
  }

  const loadOrder = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const orderData = mockOrders[id]
      if (orderData) {
        setOrder(orderData)
        setFormData(prev => ({
          ...prev,
          status: orderData.status
        }))
      } else {
        alert('Pedido no encontrado')
        router.push('/admin?tab=orders')
      }
    } catch (error) {
      console.error('Error al cargar pedido:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simular procesamiento del pedido
      console.log('Procesando pedido:', { orderId, ...formData })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('¡Pedido procesado exitosamente!')
      router.push(`/admin/orders/${orderId}`)
      
    } catch (error) {
      console.error('Error al procesar pedido:', error)
      alert('Error al procesar el pedido. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (isLoading) {
    return (
      <AdminProtected>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando pedido...</p>
          </div>
        </div>
      </AdminProtected>
    )
  }

  if (!order) return null

  return (
    <AdminProtected>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Procesar Pedido</h1>
              <p className="text-gray-600 mt-2">Pedido #{order.id} - {order.customer}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de Procesamiento */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Estado del Pedido */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Actualizar Estado</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nuevo Estado *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Procesando">Procesando</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha Estimada de Entrega
                      </label>
                      <input
                        type="date"
                        name="estimatedDelivery"
                        value={formData.estimatedDelivery}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Información de Envío */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa de Envío
                      </label>
                      <select
                        name="shippingCompany"
                        value={formData.shippingCompany}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="Coordinadora">Coordinadora</option>
                        <option value="Servientrega">Servientrega</option>
                        <option value="TCC">TCC</option>
                        <option value="Deprisa">Deprisa</option>
                        <option value="Inter Rapidísimo">Inter Rapidísimo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Seguimiento
                      </label>
                      <input
                        type="text"
                        name="trackingNumber"
                        value={formData.trackingNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Ej: 123456789"
                      />
                    </div>
                  </div>
                </div>

                {/* Notas Adicionales */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Notas del Procesamiento</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios Internos
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Agregar notas sobre el procesamiento del pedido..."
                    />
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      'Actualizar Pedido'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar - Resumen del Pedido */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pedido:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente:</span>
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium">{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Productos</h2>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="border-b pb-2 last:border-b-0">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-600">
                        {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  )
}