// Importación de Mongoose para modelado de datos y conexión a MongoDB
import mongoose, { Schema, Document } from 'mongoose'

// Interface TypeScript que define la estructura completa de una orden de compra
// Extiende Document para herdar funcionalidades de Mongoose
export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId    // Referencia al usuario que realizó la orden
  items: {                          // Array de productos en la orden
    productId: mongoose.Types.ObjectId
    name: string
    price: number
    quantity: number
    variant: {                      // Variantes específicas del producto (color, talla)
      color: string
      size: string
    }
  }[]
  shippingAddress: {               // Dirección de envío completa
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {                // Dirección de facturación (puede diferir del envío)
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  total: number                    // Monto total de la orden
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'  // Estados del proceso de orden
  paymentId: string               // ID de la transacción de pago
  trackingNumber?: string         // Número de seguimiento del envío (opcional)
  createdAt: Date                // Timestamps automáticos de Mongoose
  updatedAt: Date
}

// Schema para definir la estructura de cada item dentro de una orden
// Incluye validaciones y referencias a otros modelos
const OrderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',        // Referencia al modelo Product para populate
    required: true,
  },
  name: {
    type: String,
    required: true,        // Almacenar nombre para histórico (en caso de cambios en Product)
  },
  price: {
    type: Number,
    required: true,        // Precio al momento de la compra (puede diferir del precio actual)
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,               // Validación: cantidad mínima de 1 unidad
  },
  variant: {              // Objeto anidado para variantes del producto
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
})

// Schema reutilizable para direcciones (tanto envío como facturación)
// Permite consistencia en la estructura de direcciones
const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,        // Dirección física obligatoria
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,        // Estado/Provincia/Departamento
  },
  zipCode: {
    type: String,
    required: true,        // Código postal para cálculo de envíos
  },
  country: {
    type: String,
    required: true,
    default: 'México',     // País por defecto del ecommerce
  },
})

// Schema principal de la orden que combina todos los sub-schemas
// Define la estructura completa y validaciones para órdenes de compra
const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',         // Referencia al usuario para populate de datos
      required: true,
    },
    items: [OrderItemSchema],      // Array de items usando el schema definido arriba
    shippingAddress: AddressSchema, // Dirección de envío usando schema reutilizable
    billingAddress: AddressSchema,  // Dirección de facturación (puede ser diferente)
    total: {
      type: Number,
      required: true,
      min: 0,             // Validación: el total no puede ser negativo
    },
    status: {
      type: String,
      // Estados que representan el ciclo de vida de una orden
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending', // Estado inicial de toda orden nueva
    },
    paymentId: {
      type: String,
      required: true,     // ID de referencia del procesador de pagos (Stripe, etc.)
    },
    trackingNumber: {
      type: String,       // Opcional: se asigna cuando se envía el paquete
    },
  },
  {
    timestamps: true,     // Mongoose automáticamente agrega createdAt y updatedAt
  }
)

// Exportación del modelo con patrón de reutilización
// Evita errores de "modelo ya compilado" en desarrollo con hot reload
export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)