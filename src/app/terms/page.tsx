import React from 'react'

// Componente de página estática para mostrar los términos y condiciones legales
// Renderiza un documento estructurado con las políticas y regulaciones del ecommerce
// Incluye secciones organizadas para facilitar la lectura y comprensión legal
export default function TermsPage() {
  return (
    // Contenedor principal con fondo gris y altura mínima completa
    <div className="min-h-screen bg-gray-50">
      {/* Wrapper responsivo con padding y centrado automático */}
      <div className="container mx-auto px-4 py-16">
        {/* Contenedor con ancho máximo para mejorar legibilidad en pantallas grandes */}
        <div className="max-w-4xl mx-auto">
          {/* Card principal con fondo blanco, sombra y bordes redondeados */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Título principal de la página con tipografía prominente */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
            
            {/* Contenedor principal del contenido con espaciado prose y tipografía optimizada */}
            {/* Utiliza clases prose para mejorar la legibilidad del texto largo */}
            <div className="prose prose-gray max-w-none space-y-6">
              {/* Marca temporal de la última actualización para transparencia legal */}
              <p className="text-sm text-gray-600 mb-8">
                Última actualización: 9 de octubre de 2025
              </p>

              {/* Sección 1: Información general y aceptación de términos */}
              {/* Establece el contexto legal y la aceptación implícita del usuario */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información General</h2>
                <p className="text-gray-700 leading-relaxed">
                  Bienvenido a Llamativo.co. Estos términos y condiciones describen las reglas y regulaciones 
                  para el uso del sitio web de Llamativo, ubicado en llamativo.co. Al acceder a este sitio web, 
                  asumimos que aceptas estos términos y condiciones en su totalidad.
                </p>
              </section>

              {/* Sección 2: Reglas de uso del sitio web */}
              {/* Define las responsabilidades y limitaciones del usuario */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso del Sitio Web</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Al utilizar nuestro sitio web, aceptas:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Proporcionar información veraz y actualizada durante el proceso de compra</li>
                  <li>Usar el sitio web solo para fines legítimos</li>
                  <li>No intentar acceder a áreas restringidas del sitio</li>
                  <li>Respetar los derechos de propiedad intelectual de Llamativo.co</li>
                </ul>
              </section>

              {/* Sección 3: Política de precios y productos */}
              {/* Clarifica aspectos monetarios, impuestos y modificaciones de precios */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Productos y Precios</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Todos los precios están expresados en pesos colombianos (COP) e incluyen el IVA del 19%. 
                  Los productos de lujo superiores a $238.000 COP incluyen adicionalmente el impuesto al consumo del 8%.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nos reservamos el derecho de modificar precios sin previo aviso. Los precios vigentes 
                  serán los mostrados al momento de confirmar la compra.
                </p>
              </section>

              {/* Sección 4: Procedimientos y obligaciones de compra */}
              {/* Define responsabilidades del cliente durante el proceso de compra */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Proceso de Compra</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Al realizar un pedido, te comprometes a:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Proporcionar información de contacto y envío precisa</li>
                  <li>Realizar el pago completo antes del envío</li>
                  <li>Estar disponible para recibir el pedido en la dirección indicada</li>
                </ul>
              </section>

              {/* Sección 5: Opciones de pago disponibles y seguridad */}
              {/* Lista métodos de pago aceptados y garantías de seguridad */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Métodos de Pago</h2>
                <p className="text-gray-700 leading-relaxed">
                  Aceptamos los siguientes métodos de pago: PSE, tarjetas de crédito y débito (Visa, Mastercard), 
                  transferencias bancarias y contraentrega (sujeto a verificación). Todos los pagos son procesados 
                  de forma segura a través de plataformas certificadas.
                </p>
              </section>

              {/* Sección 6: Política de envíos y tiempos de entrega */}
              {/* Especifica condiciones de envío, costos y tiempos de entrega */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Envíos y Entregas</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Realizamos envíos a nivel nacional en Colombia con los siguientes términos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Envío gratis en compras superiores a $150.000 COP</li>
                  <li>Tiempo de entrega: 3-5 días hábiles en ciudades principales</li>
                  <li>Tiempo de entrega: 5-8 días hábiles en otras ciudades</li>
                  <li>Los envíos se realizan de lunes a viernes</li>
                </ul>
              </section>

              {/* Sección 7: Procedimientos para cambios y devoluciones */}
              {/* Define condiciones, tiempos y responsabilidades para devoluciones */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Política de Devoluciones</h2>
                <p className="text-gray-700 leading-relaxed">
                  Tienes 30 días calendario a partir de la fecha de entrega para solicitar un cambio o devolución. 
                  Los productos deben estar en perfecto estado, con etiquetas originales y sin haber sido usados. 
                  Los gastos de envío para devoluciones corren por cuenta del cliente, excepto en casos de 
                  productos defectuosos o error en el envío.
                </p>
              </section>

              {/* Sección 8: Cobertura y limitaciones de garantía */}
              {/* Especifica qué cubre la garantía y qué no está incluido */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Garantías</h2>
                <p className="text-gray-700 leading-relaxed">
                  Todos nuestros productos cuentan con garantía contra defectos de fabricación por 3 meses. 
                  Esta garantía no cubre daños por uso normal, mal uso o accidentes. Para hacer efectiva la 
                  garantía, debes conservar la factura de compra.
                </p>
              </section>

              {/* Sección 9: Limitaciones legales de responsabilidad */}
              {/* Establece límites de responsabilidad legal de la empresa */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitación de Responsabilidad</h2>
                <p className="text-gray-700 leading-relaxed">
                  Llamativo.co no será responsable por daños indirectos, incidentales, especiales o 
                  consecuenciales que resulten del uso o la imposibilidad de usar nuestros productos o servicios. 
                  Nuestra responsabilidad máxima no excederá el valor pagado por el producto específico.
                </p>
              </section>

              {/* Sección 10: Derecho a modificar términos */}
              {/* Reserva el derecho de cambiar términos y notificación */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modificaciones</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                  Los cambios serán efectivos inmediatamente después de su publicación en el sitio web. 
                  Es tu responsabilidad revisar periódicamente estos términos.
                </p>
              </section>

              {/* Sección 11: Jurisdicción y ley aplicable */}
              {/* Define el marco legal y jurisdicción para disputas */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Ley Aplicable</h2>
                <p className="text-gray-700 leading-relaxed">
                  Estos términos y condiciones se rigen por las leyes de la República de Colombia. 
                  Cualquier disputa será resuelta en los tribunales competentes de Colombia.
                </p>
              </section>

              {/* Sección 12: Información de contacto para consultas legales */}
              {/* Proporciona canales de comunicación para asuntos relacionados con términos */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
                <p className="text-gray-700 leading-relaxed">
                  Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en:
                </p>
                {/* Card destacada con información de contacto legal */}
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700"><strong>Email:</strong> legal@llamativo.co</p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> +57 (1) 234-5678</p>
                  <p className="text-gray-700"><strong>Dirección:</strong> Calle 93 #11-27, Bogotá, Colombia</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}