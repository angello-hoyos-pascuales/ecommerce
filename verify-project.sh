#!/bin/bash

# 🔍 Script de Verificación del Proyecto ECommerce
# Verifica que todos los componentes estén funcionando correctamente

echo "🚀 Iniciando verificación del proyecto ECommerce..."
echo "================================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

echo "✅ Directorio del proyecto verificado"

# Verificar versiones de Node.js y npm
echo "📦 Verificando versiones:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules no encontrado. Instalando dependencias..."
    npm install
else
    echo "✅ Dependencias verificadas"
fi

# Verificar estructura de archivos importantes
echo "📁 Verificando estructura del proyecto:"

FILES=(
    "src/app/page.tsx"
    "src/components/Header.tsx"
    "src/store/cartStore.ts"
    "next.config.js"
    "tailwind.config.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANTE"
    fi
done

# Verificar si hay procesos de Node ejecutándose
echo "🔍 Verificando procesos..."
if pgrep -f "next" > /dev/null; then
    echo "⚠️  Hay procesos de Next.js ejecutándose"
    echo "   Puedes terminarlos con: taskkill /F /IM node.exe"
else
    echo "✅ No hay procesos conflictivos"
fi

echo ""
echo "🎯 Instrucciones para iniciar el proyecto:"
echo "1. npm run dev           # Iniciar servidor de desarrollo"
echo "2. http://localhost:3001 # Abrir en navegador"
echo ""
echo "🌐 URLs disponibles:"
echo "• Desarrollo Local: http://localhost:3001"
echo "• GitHub Pages: https://angello-hoyos-pascuales.github.io/ecommerce/"
echo ""
echo "🧪 Páginas de prueba:"
echo "• Principal: http://localhost:3001/"
echo "• Productos: http://localhost:3001/products"
echo "• Carrito: http://localhost:3001/cart"
echo "• Admin: http://localhost:3001/admin"
echo "• API Test: http://localhost:3001/api-test"

echo ""
echo "================================================="
echo "✅ Verificación completada"