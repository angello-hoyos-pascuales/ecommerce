<<<<<<< HEAD
# � ECommerce Llamativo - Plataforma Colombiana con Carrito Flotante Móvil

Un proyecto completo de eCommerce desarrollado con las tecnologías más modernas, incluyendo un **carrito flotante móvil ultra-moderno** para la mejor experiencia de usuario.

## ✨ NUEVO: Carrito Flotante Móvil

### 🎯 **Característica Estrella**
- **Botón flotante premium** en la parte inferior para móviles
- **Animaciones avanzadas** con efectos de glow y bounce
- **Contador dinámico** de productos con badge animado
- **Total en tiempo real** con formato COP
- **Solo visible en móviles** - se oculta automáticamente en desktop

### 📱 **Cómo Probarlo**
1. Abrir el proyecto en `http://localhost:3000`
2. Ir a `/productos` para ver productos de prueba
3. Agregar productos al carrito
4. **Cambiar a vista móvil** en DevTools (F12 → Toggle Device)
5. ¡Ver el carrito flotante en acción! 🚀

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS utilitario
- **Zustand** - Gestión de estado global
- **React Hook Form** - Manejo de formularios

### Backend
- **Node.js** - Runtime de JavaScript
- **Next.js API Routes** - Endpoints de API
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación y Pagos
- **NextAuth.js** - Autenticación completa
- **Stripe** - Procesamiento de pagos
- **JWT** - Tokens de seguridad
- **bcryptjs** - Hash de contraseñas

### Servicios Adicionales
- **Cloudinary** - Gestión de imágenes
- **Nodemailer** - Envío de emails
- **React Hot Toast** - Notificaciones

## 📋 Características Principales

### 🛒 Módulo de Compra (Cliente)
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras persistente
- ✅ Checkout seguro con Stripe
- ✅ Gestión de variantes (color, talla)
- ✅ Sistema de recomendaciones
- ✅ Historial de pedidos
- ✅ Gestión de direcciones

### 🔧 Módulo de Administración
- ✅ CRUD completo de productos
- ✅ Gestión de inventario
- ✅ Administración de pedidos
- ✅ Reportes de ventas
- ✅ Gestión de usuarios
- ✅ Dashboard con métricas

### 🔐 Sistema de Autenticación
- ✅ Registro e inicio de sesión
- ✅ Autenticación con JWT
- ✅ Roles de usuario (cliente/admin)
- ✅ Protección de rutas
- ✅ Recuperación de contraseña

### 💳 Integración de Pagos
- ✅ Procesamiento con Stripe
- ✅ Múltiples métodos de pago
- ✅ Manejo de webhooks
- ✅ Confirmación de pagos
- ✅ Reembolsos automáticos

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- MongoDB (local o MongoDB Atlas)
- Cuenta de Stripe para pagos
- Cuenta de Cloudinary (opcional)

### 1. Clona el repositorio
\`\`\`bash
git clone <tu-repositorio>
cd ECOMER
\`\`\`

### 2. Instala las dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configura las variables de entorno
Copia el archivo \`.env.example\` a \`.env.local\` y actualiza las variables:

\`\`\`env
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/ecomer-db

# Stripe para pagos
STRIPE_PUBLIC_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta

# JWT para autenticación
JWT_SECRET=tu_jwt_secret_muy_secreto

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# URL base
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### 4. Ejecuta la aplicación
\`\`\`bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
\`\`\`

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

\`\`\`
ECOMER/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── api/               # Rutas de API
│   │   ├── admin/             # Panel de administración
│   │   ├── products/          # Páginas de productos
│   │   ├── cart/              # Carrito de compras
│   │   └── auth/              # Autenticación
│   ├── components/            # Componentes reutilizables
│   ├── lib/                   # Utilidades y configuraciones
│   ├── models/                # Modelos de MongoDB
│   ├── store/                 # Gestión de estado global
│   ├── types/                 # Tipos de TypeScript
│   └── utils/                 # Funciones utilitarias
├── public/                    # Archivos estáticos
└── package.json
\`\`\`

## 🎯 Funcionalidades por Implementar

### 🔄 Fase 1: Core Features (Completado)
- [x] Configuración del proyecto
- [x] Modelos de datos
- [x] Autenticación básica
- [x] CRUD de productos
- [x] Carrito de compras

### 🔄 Fase 2: Características Avanzadas
- [ ] Integración completa de Stripe
- [ ] Sistema de recomendaciones con IA
- [ ] Optimización de imágenes con Cloudinary
- [ ] Sistema de reseñas y calificaciones
- [ ] Búsqueda avanzada con filtros

### 🔄 Fase 3: Optimizaciones
- [ ] Cache con Redis
- [ ] Optimización SEO
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados
- [ ] CI/CD con GitHub Actions

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Docker
\`\`\`bash
docker build -t ecomer-app .
docker run -p 3000:3000 ecomer-app
\`\`\`

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/amazing-feature\`)
3. Commit tus cambios (\`git commit -m 'Add amazing feature'\`)
4. Push a la rama (\`git push origin feature/amazing-feature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🐛 Reporte de Bugs

Si encuentras algún bug, por favor:
1. Verifica que no esté ya reportado en los Issues
2. Crea un nuevo Issue con:
   - Descripción detallada del problema
   - Pasos para reproducir
   - Capturas de pantalla si es necesario
   - Información del entorno (OS, Browser, etc.)

## 📞 Soporte

- 📧 Email: contacto@ecommerce.com
- 💬 Discord: [Enlace al servidor]
- 📖 Documentación: [Enlace a la wiki]

---

**Desarrollado con ❤️ y ☕ por el equipo de ECommerce**
=======
# ecommerce
>>>>>>> a41be54874fdc003d69f288b0e1c8f6ac3ab63b7
