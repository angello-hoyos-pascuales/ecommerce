'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtected from '@/components/AdminProtected'
import { useAuth } from '@/context/AuthContext'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'

interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  monthlySales: number
  monthlyOrders: number
}

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    productId: string
    productName: string
    isDeleting: boolean
  }>({
    isOpen: false,
    productId: '',
    productName: '',
    isDeleting: false
  })

  // Datos de ejemplo para el dashboard
  const stats: DashboardStats = {
    totalSales: 45678900,
    totalOrders: 1234,
    totalProducts: 156,
    totalUsers: 5678,
    monthlySales: 8945600,
    monthlyOrders: 287
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const recentOrders = [
    { id: 'ORD-001', customer: 'María González', amount: 234900, status: 'Completado', date: '2025-10-09' },
    { id: 'ORD-002', customer: 'Carlos Rodríguez', amount: 189500, status: 'Procesando', date: '2025-10-09' },
    { id: 'ORD-003', customer: 'Ana López', amount: 156780, status: 'Enviado', date: '2025-10-08' },
    { id: 'ORD-004', customer: 'Luis Martínez', amount: 298450, status: 'Pendiente', date: '2025-10-08' },
    { id: 'ORD-005', customer: 'Sofia Hernández', amount: 167890, status: 'Completado', date: '2025-10-07' }
  ]

  const topProducts = [
    { name: 'Camiseta Básica Premium', sales: 145, revenue: 13060500 },
    { name: 'Vestido Elegante', sales: 89, revenue: 11116100 },
    { name: 'Pantalón Casual Denim', sales: 76, revenue: 11924400 },
    { name: 'Chaqueta Deportiva', sales: 67, revenue: 12723300 },
    { name: 'Zapatos Ejecutivos', sales: 45, revenue: 10570500 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800'
      case 'Procesando': return 'bg-yellow-100 text-yellow-800'
      case 'Enviado': return 'bg-blue-100 text-blue-800'
      case 'Pendiente': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Funciones para gestión de productos
  const handleAddProduct = () => {
    router.push('/admin/products/add')
  }

  const handleEditProduct = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`)
  }

  const handleDeleteProduct = (productId: string, productName: string) => {
    setDeleteModal({
      isOpen: true,
      productId,
      productName,
      isDeleting: false
    })
  }

  const confirmDeleteProduct = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }))
    
    try {
      // Simular eliminación (aquí conectarías con tu API)
      console.log('Eliminando producto:', deleteModal.productId)
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('¡Producto eliminado exitosamente!')
      
      // Cerrar modal
      setDeleteModal({
        isOpen: false,
        productId: '',
        productName: '',
        isDeleting: false
      })
      
      // Aquí recargarías la lista de productos o actualizarías el estado
      
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      alert('Error al eliminar el producto. Inténtalo de nuevo.')
      setDeleteModal(prev => ({ ...prev, isDeleting: false }))
    }
  }

  const cancelDeleteProduct = () => {
    setDeleteModal({
      isOpen: false,
      productId: '',
      productName: '',
      isDeleting: false
    })
  }

  // Funciones para gestión de pedidos
  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`)
  }

  const handleProcessOrder = (orderId: string) => {
    router.push(`/admin/orders/process/${orderId}`)
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración 🛠️
            </h1>
            <p className="text-gray-600">
              Bienvenido de vuelta, <span className="font-medium">{user?.name}</span>
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'dashboard', name: '📊 Dashboard', count: null },
                  { id: 'products', name: '🛍️ Productos', count: stats.totalProducts },
                  { id: 'orders', name: '📦 Pedidos', count: stats.totalOrders },
                  { id: 'users', name: '👥 Usuarios', count: stats.totalUsers },
                  { id: 'reports', name: '📈 Reportes', count: null }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                    {tab.count && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Ventas Totales</h3>
                    <p className="text-2xl font-bold text-green-600">{formatPrice(stats.totalSales)}</p>
                    <p className="text-sm text-gray-500">Este mes: {formatPrice(stats.monthlySales)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Pedidos</h3>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
                    <p className="text-sm text-gray-500">Este mes: {stats.monthlyOrders}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Productos</h3>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
                    <p className="text-sm text-gray-500">En catálogo</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Usuarios</h3>
                    <p className="text-2xl font-bold text-yellow-600">{stats.totalUsers}</p>
                    <p className="text-sm text-gray-500">Registrados</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders and Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Pedidos Recientes</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{formatPrice(order.amount)}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Productos Más Vendidos</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.sales} unidades vendidas</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{formatPrice(product.revenue)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Products Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Gestión de Productos</h3>
                    <p className="text-gray-600">Administra tu inventario y catálogo de productos</p>
                  </div>
                  <button 
                    onClick={handleAddProduct}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Producto
                  </button>
                </div>
              </div>

              {/* Products Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-gray-600">Total Productos</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-green-600">142</p>
                    <p className="text-sm text-gray-600">En Stock</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-yellow-600">8</p>
                    <p className="text-sm text-gray-600">Stock Bajo</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-red-600">6</p>
                    <p className="text-sm text-gray-600">Agotados</p>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-medium text-gray-900">Lista de Productos</h3>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Todas las categorías</option>
                        <option>Camisetas</option>
                        <option>Vestidos</option>
                        <option>Pantalones</option>
                        <option>Accesorios</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categoría
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'product-0', name: 'Camiseta Básica Premium', category: 'Camisetas', price: 89900, stock: 45, status: 'Activo', image: '👕' },
                        { id: 'product-1', name: 'Vestido Elegante', category: 'Vestidos', price: 124900, stock: 23, status: 'Activo', image: '👗' },
                        { id: 'product-2', name: 'Pantalón Casual Denim', category: 'Pantalones', price: 156900, stock: 8, status: 'Stock Bajo', image: '👖' },
                        { id: 'product-3', name: 'Chaqueta Deportiva', category: 'Chaquetas', price: 189900, stock: 15, status: 'Activo', image: '🧥' },
                        { id: 'product-4', name: 'Zapatos Ejecutivos', category: 'Calzado', price: 234900, stock: 0, status: 'Agotado', image: '👞' },
                        { id: 'product-5', name: 'Bolso de Cuero Premium', category: 'Accesorios', price: 167900, stock: 12, status: 'Activo', image: '👜' },
                      ].map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-lg">{product.image}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">SKU: PRD-{String(index + 1).padStart(3, '0')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.stock === 0 ? 'bg-red-100 text-red-800' :
                              product.stock < 10 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.stock} unidades
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'Activo' ? 'bg-green-100 text-green-800' :
                              product.status === 'Stock Bajo' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditProduct(product.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Editar producto"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                className="text-red-600 hover:text-red-900"
                                title="Eliminar producto"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">1</span> a <span className="font-medium">6</span> de{' '}
                      <span className="font-medium">156</span> productos
                    </p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500">
                        Anterior
                      </button>
                      <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm">
                        1
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700">
                        2
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700">
                        3
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700">
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Orders Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Gestión de Pedidos</h3>
                    <p className="text-gray-600">Administra todos los pedidos de la tienda</p>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exportar Pedidos
                  </button>
                </div>
              </div>

              {/* Orders Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <span className="text-gray-600 text-lg">📋</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-gray-600">45</p>
                    <p className="text-sm text-gray-600">Pendientes</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <span className="text-yellow-600 text-lg">⏳</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-yellow-600">23</p>
                    <p className="text-sm text-gray-600">Procesando</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-600 text-lg">🚚</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-blue-600">67</p>
                    <p className="text-sm text-gray-600">Enviados</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-green-600 text-lg">✅</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-green-600">1099</p>
                    <p className="text-sm text-gray-600">Completados</p>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-medium text-gray-900">Pedidos Recientes</h3>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Todos los estados</option>
                        <option>Pendiente</option>
                        <option>Procesando</option>
                        <option>Enviado</option>
                        <option>Completado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pedido
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.customer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(order.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewOrder(order.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Ver detalles del pedido"
                              >
                                Ver
                              </button>
                              <button 
                                onClick={() => handleProcessOrder(order.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Procesar pedido"
                              >
                                Procesar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Gestión de Usuarios</h3>
                    <p className="text-gray-600">Administra los usuarios registrados</p>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Agregar Usuario
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Gestión de Usuarios
                </h3>
                <p className="text-gray-600">
                  Panel de administración de usuarios en desarrollo
                </p>
              </div>
            </div>
          )}

          {/* Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Reportes y Análisis</h3>
                    <p className="text-gray-600">Analiza las métricas de tu tienda</p>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generar Reporte
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Módulo de Reportes
                </h3>
                <p className="text-gray-600">
                  Sistema de análisis y reportes en desarrollo
                </p>
              </div>
            </div>
          )}

          {/* Other tabs content - fallback */}
          {!['dashboard', 'products', 'orders', 'users', 'reports'].includes(activeTab) && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Sección en Desarrollo
              </h3>
              <p className="text-gray-600">
                La sección de <strong>{activeTab}</strong> estará disponible próximamente.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar producto */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDeleteProduct}
        onConfirm={confirmDeleteProduct}
        productName={deleteModal.productName}
        isDeleting={deleteModal.isDeleting}
      />
    </AdminProtected>
  )
}