'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtected from '@/components/AdminProtected'

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter()
  const [orderId, setOrderId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  // Resolve params
  useEffect(() => {
    params.then((resolvedParams) => {
      setOrderId(resolvedParams.id)
      loadOrder(resolvedParams.id)
    })
  }, [params])

  // Datos de ejemplo para simular carga desde API
  const mockOrders: { [key: string]: any } = {
    'ORD-001': {
      id: 'ORD-001',
      customer: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+57 300 123 4567',
      date: '2025-10-08',
      status: 'Pendiente',
      total: 234800,
      subtotal: 197143,
      tax: 37657,
      shippingAddress: {
        street: 'Calle 85 #12-34',
        city: 'Bogotá',
        state: 'Cundinamarca',
        zipCode: '110221',
        country: 'Colombia'
      },
      items: [
        {
          id: 'product-0',
          name: 'Camiseta Básica Premium',
          quantity: 2,
          price: 89900,
          total: 179800,
          variant: { color: 'Negro', size: 'M' }
        },
        {
          id: 'product-1',
          name: 'Vestido Elegante',
          quantity: 1,
          price: 124900,
          total: 124900,
          variant: { color: 'Rojo', size: 'L' }
        }
      ],
      timeline: [
        { date: '2025-10-08 14:30', status: 'Pendiente', description: 'Pedido recibido' },
        { date: '2025-10-08 14:35', status: 'Confirmado', description: 'Pago confirmado' }
      ]
    },
    'ORD-002': {
      id: 'ORD-002',
      customer: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+57 301 987 6543',
      date: '2025-10-07',
      status: 'Procesando',
      total: 456700,
      subtotal: 383781,
      tax: 72919,
      shippingAddress: {
        street: 'Carrera 15 #45-67',
        city: 'Medellín',
        state: 'Antioquia',
        zipCode: '050001',
        country: 'Colombia'
      },
      items: [
        {
          id: 'product-2',
          name: 'Pantalón Casual Denim',
          quantity: 1,
          price: 156900,
          total: 156900,
          variant: { color: 'Azul', size: 'L' }
        },
        {
          id: 'product-3',
          name: 'Chaqueta Deportiva',
          quantity: 1,
          price: 189900,
          total: 189900,
          variant: { color: 'Negro', size: 'XL' }
        }
      ],
      timeline: [
        { date: '2025-10-07 10:15', status: 'Pendiente', description: 'Pedido recibido' },
        { date: '2025-10-07 10:20', status: 'Confirmado', description: 'Pago confirmado' },
        { date: '2025-10-07 16:45', status: 'Procesando', description: 'En preparación' }
      ]
    }
  }

  const loadOrder = async (id: string) => {
    try {
      // Simular carga de datos del pedido
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const orderData = mockOrders[id]
      if (orderData) {
        setOrder(orderData)
      } else {
        alert('Pedido no encontrado')
        router.push('/admin?tab=orders')
      }
    } catch (error) {
      console.error('Error al cargar pedido:', error)
      alert('Error al cargar el pedido')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800'
      case 'Procesando': return 'bg-yellow-100 text-yellow-800'
      case 'Enviado': return 'bg-blue-100 text-blue-800'
      case 'Pendiente': return 'bg-gray-100 text-gray-800'
      case 'Confirmado': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Detalle del Pedido</h1>
              <p className="text-gray-600 mt-2">Pedido #{order.id} - {order.customer}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Estado del Pedido */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Estado del Pedido</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {order.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === order.timeline.length - 1 ? 'bg-primary-600' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{event.description}</span>
                          <span className="text-xs text-gray-500">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productos */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Productos</h2>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center border-b pb-4 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.variant.color} - Talla {item.variant.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
                <div className="text-gray-600">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Información del Cliente */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Cliente</h2>
                <div className="space-y-2">
                  <p><strong>Nombre:</strong> {order.customer}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Teléfono:</strong> {order.phone}</p>
                  <p><strong>Fecha:</strong> {order.date}</p>
                </div>
              </div>

              {/* Resumen del Pedido */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (19%):</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-primary-600">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Acciones</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => router.push(`/admin/orders/process/${order.id}`)}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Procesar Pedido
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Imprimir Factura
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Contactar Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  )
}