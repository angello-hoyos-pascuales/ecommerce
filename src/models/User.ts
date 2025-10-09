// Importación de Mongoose para modelado de datos y bcrypt para hash de contraseñas
import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

// Interface TypeScript que define la estructura completa de un usuario
// Extiende Document para heredar funcionalidades de Mongoose e incluye métodos personalizados
export interface IUser extends Document {
  email: string              // Email único para autenticación
  firstName: string          // Nombre del usuario
  lastName: string           // Apellido del usuario
  password: string           // Contraseña hasheada (nunca en texto plano)
  role: 'customer' | 'admin' // Roles del sistema para control de acceso
  addresses: {               // Array de direcciones del usuario
    _id?: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault: boolean       // Marca una dirección como predeterminada
  }[]
  orders: mongoose.Types.ObjectId[]  // Referencias a órdenes del usuario
  createdAt: Date           // Timestamp de creación automático
  comparePassword(candidatePassword: string): Promise<boolean>  // Método para verificar contraseñas
}

// Schema reutilizable para direcciones de usuario (envío, facturación, etc.)
// Permite que un usuario tenga múltiples direcciones almacenadas
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
  isDefault: {
    type: Boolean,
    default: false,        // Permite marcar una dirección como predeterminada
  },
})

// Schema principal del usuario con validaciones completas y restricciones de seguridad
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,          // Email único en toda la base de datos
      lowercase: true,       // Automaticamente convierte a minúsculas
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Formato de email inválido'],  // Validación regex
    },
    firstName: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,            // Elimina espacios en blanco automáticamente
      maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es requerido'],
      trim: true,
      maxlength: [50, 'El apellido no puede exceder 50 caracteres'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],  // Longitud mínima de seguridad
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],  // Solo permite estos dos roles
      default: 'customer',          // Por defecto todos son clientes
    },
    addresses: [AddressSchema],     // Array de direcciones usando el schema definido arriba
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',               // Referencias a órdenes para populate
      },
    ],
  },
  {
    timestamps: true,               // Mongoose automáticamente agrega createdAt y updatedAt
  }
)

// Middleware de Mongoose que se ejecuta antes de guardar el usuario
// Hashea automáticamente la contraseña solo cuando es nueva o modificada
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()  // Solo hashea si la contraseña cambió

  try {
    const salt = await bcrypt.genSalt(12)          // Genera salt con factor de costo 12
    const hashedPassword = await bcrypt.hash(this.password as string, salt)
    this.password = hashedPassword                 // Reemplaza la contraseña plana con el hash
    next()                                         // Continúa con el proceso de guardado
  } catch (error: any) {
    next(error)                                    // Pasa el error al siguiente middleware
  }
})

// Método de instancia para comparar contraseñas de forma segura
// Compara la contraseña en texto plano con el hash almacenado
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Exportación del modelo con patrón de reutilización
// Evita errores de "modelo ya compilado" en desarrollo con hot reload
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)