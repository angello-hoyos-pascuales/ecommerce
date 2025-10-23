# 🛍️ Llamativo.co - ECommerce Moderno Colombiano

**Plataforma de eCommerce completa desarrollada con Next.js, TypeScript y tecnologías modernas para el mercado colombiano.**

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-green)
![Versión](https://img.shields.io/badge/Versión-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

## 🚀 **Características Principales**

### ✨ **Funcionalidades Completadas**
- ✅ **Sistema de Carrito Avanzado** con persistencia automática
- ✅ **Gestión de Estado Global** con Zustand y migración automática
- ✅ **Panel de Administración** completo con CRUD de productos
- ✅ **Autenticación y Autorización** con protección de rutas
- ✅ **Carrito Flotante Móvil** con animaciones premium
- ✅ **API REST Completa** para gestión de datos
- ✅ **Diseño Responsivo** con Tailwind CSS
- ✅ **Manejo de Variantes** de productos (color, talla)

### 🎯 **Características Destacadas**
- **Migración Automática de Datos**: Sistema robusto para manejar cambios en la estructura del store
- **Recuperación de Errores**: Limpieza automática de datos corruptos en localStorage
- **Carrito Persistente**: Mantiene el estado del carrito entre sesiones
- **Interfaz Moderna**: Diseño premium con gradientes y animaciones

## �️ **Stack Tecnológico**

### **Frontend**
- **Next.js 15.5.4** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS utilitario moderno
- **Zustand 4.4.0** - Gestión de estado global ligera
- **React Hook Form** - Manejo optimizado de formularios

### **Backend & Base de Datos**
- **Next.js API Routes** - Endpoints RESTful integrados
- **MongoDB con Mongoose** - Base de datos NoSQL escalable
- **Autenticación JWT** - Sistema de tokens seguros

### **Servicios Integrados**
- **Stripe** - Procesamiento de pagos internacional
- **Cloudinary** - Gestión y optimización de imágenes
- **Nodemailer** - Sistema de emails transaccionales
- **React Hot Toast** - Notificaciones elegantes

## 📋 **Módulos del Sistema**

### 🛒 **Módulo de Cliente**
| Funcionalidad | Estado | Descripción |
|---------------|--------|-------------|
| Catálogo | ✅ | Vista de productos con filtros |
| Carrito | ✅ | Gestión completa con persistencia |
| Checkout | 🚧 | Proceso de compra (en desarrollo) |
| Perfil | ✅ | Gestión de datos del usuario |
| Historial | ✅ | Seguimiento de pedidos |

### 🔧 **Módulo de Administración**
| Funcionalidad | Estado | Descripción |
|---------------|--------|-------------|
| Dashboard | ✅ | Panel principal con métricas |
| Productos | ✅ | CRUD completo de productos |
| Pedidos | ✅ | Gestión de órdenes |
| Usuarios | 🚧 | Administración de clientes |
| Reportes | 🚧 | Analytics y estadísticas |

### 🔐 **Sistema de Autenticación**
- **Registro/Login** con validación completa
- **Roles de usuario**: Cliente y Administrador
- **Protección de rutas** automática
- **Gestión de sesiones** persistente

## 🏗️ **Arquitectura del Proyecto**

```
ECOMER/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── � api/               # API Routes RESTful
│   │   │   └── 📁 products/      # Endpoints de productos
│   │   ├── 📁 admin/             # Panel de administración
│   │   ├── 📁 products/          # Páginas de productos
│   │   ├── 📁 cart/              # Carrito de compras
│   │   ├── 📁 checkout/          # Proceso de compra
│   │   └── 📁 auth/              # Autenticación
│   ├── 📁 components/            # Componentes reutilizables
│   │   ├── Header.tsx            # Navegación principal
│   │   ├── FloatingCart.tsx      # Carrito flotante móvil
│   │   ├── CartInitializer.tsx   # Inicializador de carrito
│   │   └── AdminProtected.tsx    # Protección de rutas admin
│   ├── 📁 store/                 # Gestión de estado (Zustand)
│   │   ├── cartStore.ts          # Estado del carrito
│   │   └── authStore.ts          # Estado de autenticación
│   ├── 📁 lib/                   # Configuraciones y utilidades
│   ├── 📁 models/                # Modelos de datos (MongoDB)
│   ├── 📁 types/                 # Definiciones de TypeScript
│   └── 📁 context/               # Contextos de React
├── 📁 public/                    # Archivos estáticos
└── 📄 Archivos de configuración
```

## � **Instalación y Configuración**

### **Prerrequisitos**
- Node.js 18.0+ 
- MongoDB (local o Atlas)
- Git

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/angello-hoyos-pascuales/ecommerce.git
cd ecommerce
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crear archivo `.env.local` basado en `.env.example`:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/llamativo-db

# JWT para autenticación
JWT_SECRET=tu_jwt_secret_super_seguro

# Stripe (opcional para pagos)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **4. Ejecutar la Aplicación**
```bash
# Desarrollo
npm run dev

# Producción
npm run build && npm start
```

**🌐 Aplicación disponible en:** [http://localhost:3000](http://localhost:3000)

## � **Últimas Actualizaciones (v0.1.0)**

### **🆕 Funcionalidades Agregadas**
- **Sistema de Migración Automática**: Manejo robusto de cambios en el store de Zustand
- **Recuperación de Errores**: Limpieza automática de datos corruptos en localStorage
- **CartInitializer**: Componente para inicialización segura del carrito
- **Validación de Datos**: Sistema completo de validación de estructura de datos
- **Logging Mejorado**: Sistema de logs para debugging y monitoreo

### **🔧 Correcciones**
- ✅ Resuelto error: "State loaded from storage couldn't be migrated"
- ✅ Mejorado manejo de persistencia en Zustand
- ✅ Optimizada carga inicial del carrito
- ✅ Implementada migración de versiones de datos

### **⚡ Optimizaciones**
- Incrementada versión del store para forzar limpieza de datos incompatibles
- Mejorado rendimiento de la carga inicial
- Optimizada serialización/deserialización de datos
- Sistema de fallback para errores de parsing

## 🎯 **Roadmap de Desarrollo**

### **🔄 Fase Actual (v0.1.x)**
- [x] Corrección de sistema de carrito
- [x] Implementación de migración automática
- [ ] Integración completa de Stripe
- [ ] Sistema de notificaciones push
- [ ] Optimización de imágenes

### **🚀 Próximas Fases**
- **v0.2.0**: Integración de pagos completa
- **v0.3.0**: Sistema de recomendaciones con IA
- **v0.4.0**: PWA y optimizaciones móviles
- **v1.0.0**: Lanzamiento oficial

## � **Métricas del Proyecto**

- **Componentes Creados**: 15+
- **Páginas Implementadas**: 12+
- **API Endpoints**: 8+
- **Tipos TypeScript**: 25+
- **Líneas de Código**: 2000+

## 🤝 **Contribuir al Proyecto**

### **Proceso de Contribución**
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código**
- Usar TypeScript para tipado estático
- Seguir convenciones de naming de React/Next.js
- Documentar componentes y funciones complejas
- Mantener cobertura de tipos del 100%

## 🐛 **Reporte de Issues**

Para reportar bugs o solicitar nuevas funcionalidades:
1. Verificar que no esté ya reportado
2. Crear issue detallado con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Capturas de pantalla
   - Información del entorno

## � **Licencia**

Este proyecto está bajo la **Licencia MIT**. Ver archivo `LICENSE` para más detalles.

## 👨‍� **Desarrollador**

**Angello Hoyos Pascuales**
- GitHub: [@angello-hoyos-pascuales](https://github.com/angello-hoyos-pascuales)
- Proyecto: [ecommerce](https://github.com/angello-hoyos-pascuales/ecommerce)

---

**Desarrollado con ❤️ en Colombia 🇨🇴 | Impulsado por Next.js y TypeScript**
