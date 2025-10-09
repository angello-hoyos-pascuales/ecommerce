// Importación de Mongoose para modelado de datos y conexión a MongoDB
import mongoose, { Schema, Document } from 'mongoose'

// Interface TypeScript que define la estructura completa de un producto
// Extiende Document para heredar funcionalidades de Mongoose
export interface IProduct extends Document {
  name: string              // Nombre comercial del producto
  description: string       // Descripción detallada para SEO y ventas
  price: number            // Precio base del producto en la moneda local
  category: string         // Categoría para filtrado y navegación
  images: string[]         // URLs de imágenes del producto (múltiples vistas)
  variants: {              // Variantes del producto (color, talla, stock específico)
    color: string
    size: string
    stock: number
    priceAdjustment?: number  // Ajuste de precio opcional por variante
  }[]
  stock: number           // Stock total agregado de todas las variantes
  sku: string            // Código único de producto para inventario
  tags: string[]         // Etiquetas para búsqueda y SEO
  featured: boolean      // Marcador para productos destacados en homepage
  createdAt: Date        // Timestamps automáticos de Mongoose
  updatedAt: Date
}

// Schema principal de Mongoose que define validaciones y estructura de base de datos
const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,                    // Elimina espacios en blanco automáticamente
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],  // Límite para SEO
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],  // Límite razonable
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],  // Validación de negocio
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      // Enum que define las categorías válidas del ecommerce
      enum: ['ropa-hombre', 'ropa-mujer', 'accesorios', 'calzado', 'ofertas'],
    },
    images: [
      {
        type: String,
        required: true,        // Al menos una imagen es obligatoria
      },
    ],
    // Array de variantes para manejar diferentes combinaciones de color y talla
    variants: [
      {
        color: {
          type: String,
          required: true,        // Color es obligatorio para cada variante
        },
        size: {
          type: String,
          required: true,
          enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],  // Tallas estándar predefinidas
        },
        stock: {
          type: Number,
          required: true,
          min: 0,               // Stock específico por variante no puede ser negativo
        },
        priceAdjustment: {
          type: Number,
          default: 0,           // Ajuste de precio opcional (ej: tallas XL +$5000)
        },
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: [0, 'El stock no puede ser negativo'],  // Stock total del producto
    },
    sku: {
      type: String,
      required: true,
      unique: true,           // SKU debe ser único en toda la base de datos
      uppercase: true,        // Automaticamente convertir a mayúsculas
    },
    tags: [String],          // Array de strings para etiquetas de búsqueda
    featured: {
      type: Boolean,
      default: false,         // Por defecto los productos no son destacados
    },
  },
  {
    timestamps: true,        // Mongoose automáticamente agrega createdAt y updatedAt
  }
)

// Índice de texto completo para búsquedas eficientes
// Permite buscar por nombre, descripción y tags simultáneamente
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })

// Exportación del modelo con patrón de reutilización
// Evita errores de "modelo ya compilado" en desarrollo con hot reload
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)