import React from 'react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Acerca de Llamativo.co 🇨🇴
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos una marca colombiana comprometida con llevar la mejor moda nacional e internacional 
            a cada rincón de Colombia, con calidad, estilo y precios justos.
          </p>
        </div>

        {/* Nuestra Historia */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Nuestra Historia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Llamativo.co nació en 2023 con una visión clara: democratizar la moda en Colombia. 
                  Fundada por un equipo de jóvenes emprendedores colombianos, nuestra misión es hacer 
                  que la moda de calidad sea accesible para todos.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Desde nuestros inicios en Bogotá, hemos expandido nuestro alcance a todo el territorio 
                  nacional, trabajando de la mano con diseñadores locales y marcas internacionales para 
                  ofrecer la mejor selección de productos.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Hoy, más de 50.000 colombianos confían en nosotros para vestirse con estilo, 
                  personalidad y autenticidad.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold mb-2">+50.000</h3>
                <p className="text-gray-600">Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">�🇴</div>
              <h3 className="text-xl font-semibold mb-3">Orgullo Colombiano</h3>
              <p className="text-gray-600">
                Apoyamos el talento nacional y promovemos la moda "hecha en Colombia" 
                en cada oportunidad que tenemos.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-semibold mb-3">Sostenibilidad</h3>
              <p className="text-gray-600">
                Trabajamos con proveedores que respetan el medio ambiente y promovemos 
                la moda consciente y responsable.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Creemos en construir una comunidad de moda donde todos se sientan 
                representados y puedan expresar su estilo único.
              </p>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="mb-16">
          <div className="bg-primary-600 text-white rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Llamativo.co en Números</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
                <p className="text-primary-100">Años de experiencia</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">32</div>
                <p className="text-primary-100">Departamentos cubiertos</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <p className="text-primary-100">Productos disponibles</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                <p className="text-primary-100">Atención al cliente</p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ana Sofía Rodríguez', role: 'CEO & Fundadora', emoji: '👩‍💼' },
              { name: 'Carlos Andrés Méndez', role: 'Director de Operaciones', emoji: '👨‍💼' },
              { name: 'María Fernanda López', role: 'Directora de Moda', emoji: '👩‍🎨' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-sm text-gray-500">
                  Comprometid@ con llevar la mejor moda a todos los colombianos
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">¿Quieres saber más?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Estamos siempre disponibles para responder tus preguntas, escuchar tus sugerencias 
              y ayudarte a encontrar el look perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contáctanos
              </a>
              <a 
                href="mailto:hola@llamativo.co" 
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
              >
                hola@llamativo.co
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}