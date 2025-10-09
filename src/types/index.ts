// Definiciones de tipos para el sistema de productos del ecommerce
// Interface principal que define la estructura completa de un producto en la base de datos
export interface Product {
  _id: string              // Identificador único de MongoDB
  name: string             // Nombre comercial del producto
  description: string      // Descripción detallada para SEO y ventas
  price: number           // Precio base en la moneda local
  category: string        // Categoría para filtrado y navegación
  images: string[]        // URLs de imágenes del producto (múltiples vistas)
  variants: ProductVariant[]  // Array de variantes disponibles (color, talla, stock)
  stock: number          // Stock total agregado de todas las variantes
  sku: string           // Código único de producto para inventario
  tags: string[]        // Etiquetas para búsqueda y SEO
  featured: boolean     // Marcador para productos destacados en homepage
  createdAt: Date       // Fecha de creación del producto
  updatedAt: Date       // Fecha de última actualización
}

// Interface para definir variantes específicas de productos
// Permite manejar diferentes combinaciones de color, talla y stock individual
export interface ProductVariant {
  color: string              // Color específico de la variante
  size: string              // Talla específica de la variante
  stock: number            // Stock disponible para esta combinación específica
  priceAdjustment?: number // Ajuste de precio opcional (ej: tallas XL +$5000)
}

// Definiciones de tipos para el sistema de carrito de compras
// Interface para items individuales dentro del carrito
export interface CartItem {
  productId: string        // ID del producto para referencias
  product: Product         // Objeto completo del producto para mostrar información
  quantity: number         // Cantidad seleccionada por el usuario
  variant: ProductVariant  // Variante específica seleccionada (color, talla)
}

// Interface para el carrito completo con cálculos de totales
// Incluye todos los items y cálculos automáticos de precios
export interface Cart {
  items: CartItem[]        // Array de todos los productos en el carrito
  total: number           // Total final incluyendo impuestos y envío
  subtotal: number        // Subtotal de productos sin impuestos ni envío
  shipping: number        // Costo de envío calculado
  tax: number            // Impuestos aplicables
}

// Definiciones de tipos para el sistema de usuarios y autenticación
// Interface principal que define la estructura completa de un usuario registrado
export interface User {
  _id: string                    // Identificador único de MongoDB
  email: string                  // Email único para autenticación
  firstName: string              // Nombre del usuario
  lastName: string               // Apellido del usuario
  role: 'customer' | 'admin'     // Rol para control de acceso (cliente o administrador)
  addresses: Address[]           // Array de direcciones guardadas del usuario
  orders: Order[]               // Historial de órdenes del usuario
  createdAt: Date               // Fecha de registro del usuario
}

// Interface para direcciones de usuario (envío, facturación, etc.)
// Permite que un usuario tenga múltiples direcciones almacenadas
export interface Address {
  _id: string          // Identificador único de la dirección
  street: string       // Dirección física completa
  city: string         // Ciudad
  state: string        // Estado/Provincia/Departamento
  zipCode: string      // Código postal para cálculo de envíos
  country: string      // País de la dirección
  isDefault: boolean   // Marca si es la dirección predeterminada del usuario
}

// Definiciones de tipos para el sistema de órdenes y pedidos
// Interface principal que define la estructura completa de una orden de compra
export interface Order {
  _id: string                  // Identificador único de MongoDB
  userId: string               // ID del usuario que realizó la orden
  items: CartItem[]           // Array de productos comprados con sus variantes
  shippingAddress: Address    // Dirección de envío para esta orden
  billingAddress: Address     // Dirección de facturación (puede diferir del envío)
  total: number              // Monto total de la orden
  status: OrderStatus        // Estado actual de la orden en el proceso de fulfillment
  paymentId: string         // ID de referencia del procesador de pagos
  trackingNumber?: string    // Número de seguimiento del envío (opcional hasta envío)
  createdAt: Date           // Fecha de creación de la orden
  updatedAt: Date           // Fecha de última actualización del estado
}

// Enum que define todos los estados posibles de una orden
// Representa el ciclo de vida completo desde la creación hasta la entrega
export enum OrderStatus {
  PENDING = 'pending',         // Orden creada pero pago pendiente
  CONFIRMED = 'confirmed',     // Pago confirmado, orden en proceso
  PROCESSING = 'processing',   // Orden siendo preparada/empacada
  SHIPPED = 'shipped',        // Orden enviada, en tránsito
  DELIVERED = 'delivered',    // Orden entregada exitosamente
  CANCELLED = 'cancelled'     // Orden cancelada por usuario o administrador
}

// Definiciones de tipos para el sistema de pagos y procesamiento financiero
// Interface para intenciones de pago de Stripe o procesadores similares
export interface PaymentIntent {
  id: string               // Identificador único del payment intent del procesador
  amount: number          // Monto a cobrar en centavos (ej: $10.50 = 1050)
  currency: string        // Código de moneda ISO (USD, MXN, COP, etc.)
  status: string         // Estado del pago (pending, succeeded, failed, etc.)
  clientSecret: string   // Secret del cliente para confirmar el pago en frontend
}