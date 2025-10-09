import React from 'react'

// Componente de página estática que presenta la política de privacidad completa
// Cumple con normativas colombianas (Ley 1581 de 2012) e internacionales (RGPD)
// Proporciona transparencia sobre recopilación, uso y protección de datos personales
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contenedor principal con diseño de tarjeta para el documento legal */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
            
            {/* Área de contenido estructurado con tipografía optimizada para lectura */}
            <div className="prose prose-gray max-w-none space-y-6">
              {/* Fecha de última actualización para cumplimiento legal */}
              <p className="text-sm text-gray-600 mb-8">
                Última actualización: 9 de octubre de 2025
              </p>

              {/* Sección 1: Define tipos de información personal y técnica recopilada */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En Llamativo.co, recopilamos información para brindarte la mejor experiencia de compra. 
                  Los tipos de información que recopilamos incluyen:
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Información Personal</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de envío y facturación</li>
                  <li>Información de pago (procesada de forma segura)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Información de Navegación</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </section>

              {/* Sección 2: Explica finalidades del tratamiento de datos y base legal */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo Utilizamos tu Información</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos la información recopilada para los siguientes propósitos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Procesar y entregar tus pedidos</li>
                  <li>Comunicarnos contigo sobre tu compra</li>
                  <li>Mejorar nuestros productos y servicios</li>
                  <li>Enviarte ofertas y promociones (con tu consentimiento)</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Prevenir fraudes y garantizar la seguridad</li>
                </ul>
              </section>

              {/* Sección 3: Detalla circunstancias limitadas para compartir datos con terceros */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compartir Información</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestro negocio (envíos, pagos, marketing)</li>
                  <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o autoridades competentes</li>
                  <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad</li>
                  <li><strong>Con tu consentimiento:</strong> Cuando nos autorices expresamente</li>
                </ul>
              </section>

              {/* Sección 4: Explica uso de cookies y tecnologías de seguimiento */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies y Tecnologías Similares</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Recordar tus preferencias y configuraciones</li>
                  <li>Mantener productos en tu carrito de compras</li>
                  <li>Analizar el tráfico y uso del sitio web</li>
                  <li>Personalizar contenido y anuncios</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Puedes controlar las cookies a través de la configuración de tu navegador, 
                  pero ten en cuenta que esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              {/* Sección 5: Describe medidas técnicas y organizativas de seguridad */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Seguridad de los Datos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger 
                  tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. 
                  Estas medidas incluyen encriptación SSL, servidores seguros y acceso restringido a datos personales.
                </p>
              </section>

              {/* Sección 6: Establece períodos de conservación según tipo de datos */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Retención de Datos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conservamos tu información personal durante el tiempo necesario para cumplir con los 
                  propósitos descritos en esta política, cumplir con obligaciones legales, resolver disputas 
                  y hacer cumplir nuestros acuerdos. Por lo general, esto significa:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>Información de cuenta: Mientras mantengas tu cuenta activa</li>
                  <li>Información de transacciones: 5 años para efectos fiscales y legales</li>
                  <li>Datos de marketing: Hasta que retires tu consentimiento</li>
                </ul>
              </section>

              {/* Sección 7: Enumera derechos del titular según legislación aplicable */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Tus Derechos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  De acuerdo con la Ley 1581 de 2012 de Colombia y el RGPD, tienes los siguientes derechos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos de ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                  <li><strong>Portabilidad:</strong> Obtener una copia de tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos para marketing</li>
                  <li><strong>Limitación:</strong> Solicitar la limitación del procesamiento</li>
                </ul>
              </section>

              {/* Sección 8: Aborda transferencias internacionales con salvaguardias */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Transferencias Internacionales</h2>
                <p className="text-gray-700 leading-relaxed">
                  Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Colombia. 
                  Cuando transferimos datos a otros países, nos aseguramos de que existan las salvaguardias 
                  adecuadas para proteger tu información personal de acuerdo con los estándares colombianos 
                  e internacionales de protección de datos.
                </p>
              </section>

              {/* Sección 9: Establece política para protección de menores de edad */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Menores de Edad</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente 
                  información personal de menores de edad. Si un padre o tutor se da cuenta de que su hijo 
                  ha proporcionado información personal, debe contactarnos para que podamos eliminar dicha información.
                </p>
              </section>

              {/* Sección 10: Procedimiento para notificar cambios en la política */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cambios a esta Política</h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en 
                  nuestras prácticas o por razones legales. Te notificaremos sobre cambios significativos 
                  a través de nuestro sitio web o por correo electrónico. La fecha de la última actualización 
                  se indica al inicio de esta política.
                </p>
              </section>

              {/* Sección 11: Canales de contacto para ejercicio de derechos */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contacto y Ejercicio de Derechos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, 
                  puedes contactarnos a través de:
                </p>
                {/* Bloque de información de contacto destacado visualmente */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> privacidad@llamativo.co</p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> +57 (1) 234-5678</p>
                  <p className="text-gray-700"><strong>Dirección:</strong> Calle 93 #11-27, Bogotá, Colombia</p>
                  <p className="text-gray-700 mt-2"><strong>Oficial de Protección de Datos:</strong> datos@llamativo.co</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Nos comprometemos a responder a tu solicitud dentro de los 15 días hábiles establecidos por la ley colombiana.
                </p>
              </section>

              {/* Sección 12: Referencia a autoridad de control competente */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Autoridad de Control</h2>
                <p className="text-gray-700 leading-relaxed">
                  Si consideras que el tratamiento de tus datos personales infringe la normativa de protección 
                  de datos personales, tienes derecho a presentar una reclamación ante la Superintendencia de 
                  Industria y Comercio (SIC) de Colombia.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}