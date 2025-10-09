import React from 'react'

// Componente principal del centro de ayuda que proporciona soporte y documentación
// Organiza recursos de ayuda por categorías y facilita el acceso a información clave
export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado principal del centro de ayuda */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Centro de Ayuda
        </h1>

        {/* Barra de búsqueda para localizar información específica de ayuda */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pl-12"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de categorías organizadas por temas principales de soporte */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Tarjeta de ayuda para pedidos y envíos con navegación a sección específica */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Pedidos y Envíos
            </h3>
            <p className="text-gray-600 mb-4">
              Información sobre seguimiento, tiempos de entrega y costos de envío.
            </p>
            <a href="/help/shipping" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>

          {/* Tarjeta de ayuda para devoluciones y cambios */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">↩️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Devoluciones
            </h3>
            <p className="text-gray-600 mb-4">
              Políticas de devolución, cambios y reembolsos.
            </p>
            <a href="/help/returns" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>

          {/* Tarjeta de ayuda para guías de tallas y ajustes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📏</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Guía de Tallas
            </h3>
            <p className="text-gray-600 mb-4">
              Encuentra la talla perfecta con nuestras guías detalladas.
            </p>
            <a href="/help/sizing" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>

          {/* Tarjeta de ayuda para métodos de pago y facturación */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Pagos y Facturación
            </h3>
            <p className="text-gray-600 mb-4">
              Métodos de pago, facturación y resolución de problemas.
            </p>
            <a href="/help/payment" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>

          {/* Tarjeta de ayuda para gestión de cuenta y perfil */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Mi Cuenta
            </h3>
            <p className="text-gray-600 mb-4">
              Gestión de perfil, contraseñas y configuración de cuenta.
            </p>
            <a href="/help/account" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>

          {/* Tarjeta de ayuda para preguntas frecuentes generales */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">❓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Preguntas Frecuentes
            </h3>
            <p className="text-gray-600 mb-4">
              Respuestas a las preguntas más comunes de nuestros clientes.
            </p>
            <a href="/help/faq" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver más →
            </a>
          </div>
        </div>

        {/* Sección de preguntas frecuentes destacadas con respuestas completas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            {/* FAQ sobre tiempos de entrega y seguimiento */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Cuánto tiempo tarda en llegar mi pedido?
              </h3>
              <p className="text-gray-600">
                Los pedidos se procesan en 24-48 horas. El tiempo de entrega es de 3-5 días hábiles 
                en la Ciudad de México y 5-7 días en el resto del país. Recibirás un código de 
                seguimiento para rastrear tu pedido.
              </p>
            </div>

            {/* FAQ sobre modificaciones y cancelaciones de pedidos */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Puedo cambiar o cancelar mi pedido?
              </h3>
              <p className="text-gray-600">
                Puedes cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. 
                Para cambios, contáctanos lo antes posible. Una vez enviado el pedido, 
                no podemos realizar modificaciones.
              </p>
            </div>

            {/* FAQ sobre cambios de talla y políticas de devolución */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Qué hago si mi talla no es la correcta?
              </h3>
              <p className="text-gray-600">
                Aceptamos cambios de talla dentro de los 30 días posteriores a la compra. 
                El producto debe estar sin usar y con etiquetas. Consulta nuestra guía de 
                tallas antes de ordenar para evitar inconvenientes.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de contacto directo para casos no resueltos con opciones múltiples */}
        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta.
          </p>
          {/* Botones de acción para diferentes canales de soporte */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors"
            >
              Contactar Soporte
            </a>
            <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
              Chat en Vivo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}