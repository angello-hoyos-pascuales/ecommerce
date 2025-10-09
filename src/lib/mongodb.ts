// Importación de la librería Mongoose para conexión y modelado de MongoDB
import mongoose from 'mongoose'

// Configuración de la URI de conexión desde variables de entorno o localhost por defecto
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecomer-db'

// Validación de seguridad para asegurar que la URI esté definida en producción
if (!MONGODB_URI && process.env.NODE_ENV !== 'development') {
  throw new Error('Por favor define la variable de entorno MONGODB_URI en tu archivo .env.local')
}

// Interface TypeScript para definir la estructura del cache de conexión
interface MongooseCache {
  conn: typeof mongoose | null    // Conexión activa de mongoose o null
  promise: Promise<typeof mongoose> | null    // Promise de conexión pendiente o null
}

// Declaración global para extender el objeto global con nuestro cache
// Esto permite persistir la conexión entre hot reloads en desarrollo
declare global {
  var mongoose: MongooseCache | undefined
}

// Inicialización del cache global para reutilizar conexiones
let cached = global.mongoose

// Si no existe cache global, inicializarlo con valores null
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Función principal para establecer y gestionar la conexión a MongoDB
async function dbConnect(): Promise<typeof mongoose> {
  // Prevención de conexiones durante el proceso de build en Vercel
  // Evita errores de conexión durante el deployment
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'preview') {
    throw new Error('No database connection during build')
  }

  // Si ya existe una conexión activa, reutilizarla (patrón singleton)
  if (cached!.conn) {
    return cached!.conn
  }

  // Si no hay una promise de conexión pendiente, crear una nueva
  if (!cached!.promise) {
    // Configuración de opciones para la conexión de Mongoose
    const opts = {
      bufferCommands: false,    // Deshabilitar buffering para mejor control de errores
    }

    // Crear nueva promise de conexión y almacenarla en cache
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  // Manejo de la conexión con try-catch para control de errores
  try {
    // Esperar a que se resuelva la promise y almacenar la conexión
    cached!.conn = await cached!.promise
  } catch (e) {
    // Si falla la conexión, limpiar la promise para permitir retry
    cached!.promise = null
    throw e  // Re-lanzar el error para que el caller lo maneje
  }

  // Retornar la conexión exitosa
  return cached!.conn
}

// Exportación por defecto de la función de conexión
export default dbConnect