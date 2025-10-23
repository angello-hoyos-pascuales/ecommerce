# 🛠️ Guía de Solución de Problemas - ECommerce

## 🚨 Problemas Comunes y Soluciones

### 1. **"El proyecto no carga"**

#### ✅ **Solución Rápida:**
```bash
# 1. Ir al directorio del proyecto
cd "/c/Users/angeh/Desktop/ECommerce"

# 2. Terminar procesos existentes
taskkill /F /IM node.exe 2>/dev/null || true

# 3. Limpiar caché y reiniciar
rm -rf .next && npm run dev
```

#### ✅ **Verificar que funciona:**
- Abrir: http://localhost:3001
- Debería mostrar: "Bienvenido a Llamativo.co!"

---

### 2. **"Puerto en uso / Port already in use"**

#### 🔍 **Síntomas:**
```
⚠ Port 3000 is in use by an unknown process, using available port 3001 instead.
```

#### ✅ **Solución:**
- **Esto es NORMAL** - Next.js automáticamente usa el puerto 3001
- El proyecto estará disponible en: http://localhost:3001
- No requiere acción adicional

---

### 3. **"npm: command not found"**

#### ✅ **Solución:**
```bash
# Verificar instalación de Node.js
node --version
npm --version

# Si no están instalados, descargar desde:
# https://nodejs.org/
```

---

### 4. **"Módulos no encontrados / Module not found"**

#### ✅ **Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### 5. **"Error de compilación TypeScript"**

#### 🔍 **Síntomas:**
```
× Failed to compile
./src/components/...
Type error: ...
```

#### ✅ **Solución:**
```bash
# Verificar archivos TypeScript
npm run lint

# Limpiar caché TypeScript
rm -rf .next
npm run dev
```

---

### 6. **"Error de Zustand Storage"**

#### 🔍 **Síntomas:**
```
[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated
```

#### ✅ **Solución:**
- **Esto es solo una ADVERTENCIA** - no afecta funcionalidad
- El carrito funciona correctamente
- No requiere acción

---

### 7. **"GitHub Pages no carga / 404"**

#### ✅ **Verificar:**
1. **URL correcta**: https://angello-hoyos-pascuales.github.io/ecommerce/
2. **GitHub Actions**: Ir a repositorio → Actions → verificar build exitoso
3. **Configuración Pages**: Settings → Pages → Source: "GitHub Actions"

#### ✅ **Solución:**
```bash
# Forzar rebuild
git commit --allow-empty -m "Rebuild GitHub Pages"
git push origin main
```

---

### 8. **"APIs no funcionan"**

#### 🔍 **En Desarrollo Local:**
```bash
# Verificar servidor corriendo
curl http://localhost:3001/api/products

# Debería retornar JSON con productos
```

#### 🔍 **En GitHub Pages:**
- **ESPERADO** - APIs no funcionan en hosting estático
- Solo funciona UI y carrito con localStorage

---

## 🧪 Script de Diagnóstico Automático

```bash
# Ejecutar diagnóstico completo
./verify-project.sh

# Si no existe, crear y ejecutar:
chmod +x verify-project.sh
./verify-project.sh
```

---

## 📋 Checklist de Verificación

### ✅ **Ambiente de Desarrollo:**
- [ ] Node.js v18+ instalado
- [ ] npm funcionando
- [ ] Git configurado
- [ ] Terminal/Git Bash funcionando

### ✅ **Proyecto:**
- [ ] Directorio correcto: `/c/Users/angeh/Desktop/ECommerce`
- [ ] package.json presente
- [ ] node_modules instalado
- [ ] .env.local configurado

### ✅ **Servidor:**
- [ ] `npm run dev` ejecuta sin errores
- [ ] Puerto 3001 disponible
- [ ] http://localhost:3001 carga

### ✅ **Funcionalidades:**
- [ ] Página principal carga
- [ ] Navegación funciona
- [ ] Carrito agrega productos
- [ ] Páginas admin accesibles

---

## 🆘 Comandos de Emergencia

### **Reset Completo:**
```bash
# Backup del código (opcional)
cp -r src src_backup

# Reset total
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### **Reset Solo Cache:**
```bash
# Solo limpiar caché de Next.js
rm -rf .next
npm run dev
```

### **Verificación Rápida:**
```bash
# Verificar todo está funcionando
curl -I http://localhost:3001
```

---

## 🔗 Enlaces de Referencia

- **Desarrollo Local**: http://localhost:3001
- **GitHub Pages**: https://angello-hoyos-pascuales.github.io/ecommerce/
- **Repositorio**: https://github.com/angello-hoyos-pascuales/ecommerce
- **Documentación Next.js**: https://nextjs.org/docs

---

## 📞 Estado Actual Verificado

### ✅ **Funcionando Correctamente:**
- **Servidor Local**: http://localhost:3001 ✅
- **Compilación**: Sin errores críticos ✅
- **Carrito**: Persistencia funcional ✅
- **Navegación**: Todas las rutas ✅
- **GitHub Pages**: Deploy automático ✅

### ⚠️ **Advertencias (No Críticas):**
- Warning sobre puerto 3000 → Usa 3001 automáticamente
- Deprecated getStorage → Solo advertencia, no afecta funcionalidad

---

**🎉 El proyecto está completamente funcional y listo para usar** 🚀