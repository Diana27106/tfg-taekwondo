import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, title, message, isError }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className={`h-2 ${isError ? 'bg-red-600' : 'bg-green-500'}`}></div>
        <div className="p-6 text-center">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {isError ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded font-bold text-white transition-colors ${isError ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'}`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    acepto: false,
  });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '', acepto: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acepto) {
      setModalConfig({
        isOpen: true,
        title: 'Error',
        message: 'Debes aceptar las políticas de privacidad y los términos y condiciones.',
        isError: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          mensaje: formData.mensaje,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalConfig({
          isOpen: true,
          title: '¡Mensaje Enviado!',
          message: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo lo antes posible.',
          isError: false,
        });
        handleReset();
      } else {
        setModalConfig({
          isOpen: true,
          title: 'Error al enviar',
          message: data.error || 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
          isError: true,
        });
      }
    } catch (error) {
      setModalConfig({
        isOpen: true,
        title: 'Error de conexión',
        message: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión.',
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Modal 
        {...modalConfig} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
      />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-white text-5xl md:text-6xl font-bold tracking-wider">
          Contacto
        </h1>
      </section>

      {/* Main Content Area */}
      <main 
        className="py-12 px-4 md:px-8 bg-cover bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop')" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Formulario de Contacto (2/3 columnas) */}
          <div className="md:col-span-2 bg-white/95 p-8 shadow-lg rounded-sm">
            <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tighter">Formulario de contacto</h2>
            <div className="h-0.5 bg-yellow-500 w-full mb-6"></div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-bold text-gray-700">Registrate</p>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre :</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                  required
                  className="w-full p-2 bg-yellow-50/30 border border-yellow-500/30 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
                <textarea
                  name="mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje y añade los medios de contacto por el cual desee comunicarse: número de teléfono, correo electrónico o redes sociales."
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm"
                ></textarea>
              </div>

              <div className="flex flex-col space-y-4">
                <span className="font-bold text-gray-700">Enviar info</span>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded shadow-sm transition flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : 'Enviar'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-sm transition"
                  >
                    Reestablecer
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="acepto"
                  name="acepto"
                  checked={formData.acepto}
                  onChange={handleChange}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="acepto" className="text-xs text-gray-600">
                  Acepto las <Link to="/politicas" className="text-yellow-600 font-bold hover:underline">Políticas de Privacidad</Link> y los <Link to="/terms" className="text-yellow-600 font-bold hover:underline">Términos y Condiciones</Link>
                </label>
              </div>
            </form>
          </div>

          {/* Ubicación (1/3 columna) */}
          <div className="bg-white/95 p-8 shadow-lg rounded-sm flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tighter">Ubicación</h2>
            <div className="h-0.5 bg-yellow-500 w-full mb-6"></div>

            <div className="space-y-4 text-sm text-gray-700 mb-6">
              <p>
                <span className="font-bold">Dirección:</span> Cam. Puente del Palo, 2, 18194 Churriana de la Vega, Granada.
              </p>
              <p>
                <span className="font-bold">Tlf:</span> 642 24 30 24
              </p>
              <p>
                <span className="font-bold">Email:</span> taekwondoitfsierranevada@gmail.com
              </p>
            </div>

            {/* Google Maps Embed Placeholder */}
            <div className="mt-auto w-full h-64 bg-gray-200 rounded overflow-hidden">
              <iframe
                title="mapa-ubicacion"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.252678123456!2d-3.649!3d37.149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA4JzU2LjQiTiAzwrAzOCU1Ni40Ilc!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;