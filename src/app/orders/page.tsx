'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Define la interfaz TypeScript para la estructura de datos de una orden
// Incluye información completa del pedido, productos, seguimiento y estado
interface Order {
  id: string
  date: string
  status: 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado'
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
    image: string
  }>
  trackingNumber?: string
  estimatedDelivery?: string
}

// Componente principal para mostrar el historial de pedidos del usuario
// Página protegida que requiere autenticación y muestra información completa de órdenes
export default function OrdersPage() {
  // Accede al estado de autenticación del usuario desde el contexto global
  const { user } = useAuth()
  // Hook para navegación programática entre páginas
  const router = useRouter()
  // Estado local para manejar la orden seleccionada (expandida)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Efecto que protege la página redirigiendo usuarios no autenticados al login
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Función utilitaria para formatear precios en moneda colombiana
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Base de datos simulada con órdenes de ejemplo para demostrar funcionalidad
  // Incluye diferentes estados, productos y información de seguimiento
  const orders: Order[] = [
    {
      id: '#ORD-001',
      date: '2025-10-09',
      status: 'Entregado',
      total: 234900,
      items: [
        { name: 'Camiseta Básica Premium', quantity: 2, price: 89900, image: '👕' },
        { name: 'Gorra Casual Unisex', quantity: 1, price: 78900, image: '🧢' }
      ],
      trackingNumber: 'TRK001234567'
    },
    {
      id: '#ORD-002',
      date: '2025-10-07',
      status: 'Enviado',
      total: 189500,
      items: [
        { name: 'Vestido Elegante', quantity: 1, price: 124900, image: '👗' },
        { name: 'Zapatos Ejecutivos', quantity: 1, price: 234900, image: '👞' }
      ],
      trackingNumber: 'TRK001234568',
      estimatedDelivery: '2025-10-12'
    },
    {
      id: '#ORD-003',
      date: '2025-10-05',
      status: 'Procesando',
      total: 298450,
      items: [
        { name: 'Chaqueta Deportiva', quantity: 1, price: 189900, image: '🧥' },
        { name: 'Pantalón Casual Denim', quantity: 1, price: 156900, image: '👖' }
      ]
    },
    {
      id: '#ORD-004',
      date: '2025-10-03',
      status: 'Cancelado',
      total: 167890,
      items: [
        { name: 'Bolso de Cuero Premium', quantity: 1, price: 167900, image: '👜' }
      ]
    }
  ]

  // Función que retorna clases CSS apropiadas según el estado de la orden
  // Proporciona codificación visual consistente para diferentes estados
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'bg-green-100 text-green-800'
      case 'Enviado': return 'bg-blue-100 text-blue-800'
      case 'Procesando': return 'bg-yellow-100 text-yellow-800'
      case 'Pendiente': return 'bg-gray-100 text-gray-800'
      case 'Cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Función que retorna emoji apropiado para representar visualmente el estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Entregado': return '✅'
      case 'Enviado': return '🚚'
      case 'Procesando': return '⏳'
      case 'Pendiente': return '📋'
      case 'Cancelado': return '❌'
      default: return '📋'
    }
  }

  // Renderiza estado de carga mientras se verifica la autenticación del usuario
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado de la página con título y descripción */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
          <p className="text-gray-600">Revisa el estado de tus pedidos y historial de compras</p>
        </div>

        {/* Tarjetas de resumen con estadísticas calculadas dinámicamente */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <span className="text-blue-600 text-lg">📦</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Pedidos</p>
              </div>
            </div>
          </div>

          {/* Tarjeta que muestra conteo de pedidos en proceso con filtrado dinámico */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <span className="text-yellow-600 text-lg">⏳</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'Procesando').length}
                </p>
                <p className="text-sm text-gray-600">En Proceso</p>
              </div>
            </div>
          </div>

          {/* Tarjeta que muestra conteo de pedidos entregados exitosamente */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'Entregado').length}
                </p>
                <p className="text-sm text-gray-600">Entregados</p>
              </div>
            </div>
          </div>

          {/* Tarjeta que calcula y muestra el total gastado acumulado */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                <span className="text-gray-600 text-lg">💰</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-600">
                  {formatPrice(orders.reduce((sum, order) => sum + order.total, 0))}
                </p>
                <p className="text-sm text-gray-600">Total Gastado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista principal de órdenes con información detallada y acciones contextuales */}
        <div className="space-y-6">
          {/* Mapeo de cada orden individual con diseño de tarjeta expandible */}
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Encabezado de la orden con información básica y estado */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">Pedido realizado el {order.date}</p>
                    {/* Información de seguimiento cuando está disponible */}
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-600">
                        Seguimiento: <span className="font-mono">{order.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                  {/* Área de estado y precio con codificación visual */}
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>

              {/* Sección de detalles expandida con productos y información adicional */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lista de productos incluidos en la orden */}
                  {/* Lista de productos incluidos en la orden */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Productos</h4>
                    <div className="space-y-3">
                      {/* Mapeo individual de cada producto con cálculos de subtotal */}
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">{item.image}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                          <p className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Panel de información adicional de la orden */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Detalles del Pedido</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span className="font-medium">{order.status}</span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Entrega estimada:</span>
                          <span className="font-medium">{order.estimatedDelivery}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Método de pago:</span>
                        <span className="font-medium">Tarjeta de crédito</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dirección de envío:</span>
                        <span className="font-medium">Calle 123 #45-67, Bogotá</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de acciones contextuales según el estado de la orden */}
                <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
                  {/* Botón de rastreo para órdenes enviadas */}
                  {order.status === 'Enviado' && (
                    <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
                      Rastrear Pedido
                    </button>
                  )}
                  {/* Botón de recompra para órdenes entregadas */}
                  {order.status === 'Entregado' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                      Recomprar
                    </button>
                  )}
                  {/* Botón universal para acceder a la factura */}
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Ver Factura
                  </button>
                  {/* Botón de cancelación para órdenes pendientes */}
                  {order.status === 'Pendiente' && (
                    <button className="border border-red-300 text-red-700 px-4 py-2 rounded hover:bg-red-50 transition-colors">
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío que se muestra cuando no hay órdenes para mostrar */}
        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tienes pedidos aún
            </h3>
            <p className="text-gray-600 mb-6">
              ¡Explora nuestro catálogo y realiza tu primera compra!
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Explorar Productos
            </Link>
          </div>
        )}

        {/* Enlace de navegación para regresar al perfil del usuario */}
        <div className="mt-8 text-center">
          <Link
            href="/profile"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Volver a Mi Perfil
          </Link>
        </div>
      </div>
    </div>
  )
}