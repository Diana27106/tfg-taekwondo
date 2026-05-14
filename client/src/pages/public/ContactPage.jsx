import { API_BASE_URL, BASE_URL } from '../../config';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dossierPdf from '../../assets/pdf/DOSSIER TKD SIERRA NEVADA.pdf';

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

// Schema de validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().email('Introduce un email válido').required('El email es obligatorio'),
  mensaje: yup.string().required('El mensaje no puede estar vacío').min(10, 'El mensaje debe tener al menos 10 caracteres'),
  acepto: yup.boolean().oneOf([true], 'Debes aceptar las políticas de privacidad')
});

/**
 * Página de Contacto.
 * Permite a los usuarios enviar mensajes al club y descargar el dossier informativo.
 * 
 * @component
 */
const ContactPage = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Inicialización de React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: '',
      email: '',
      mensaje: '',
      acepto: false
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          mensaje: data.mensaje,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setModalConfig({
          isOpen: true,
          title: '¡Mensaje Enviado!',
          message: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo lo antes posible.',
          isError: false,
        });
        reset(); // Limpiar el formulario
      } else {
        setModalConfig({
          isOpen: true,
          title: 'Error al enviar',
          message: result.error || 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
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
    <div className="min-h-screen font-sans">
      <Modal
        {...modalConfig}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

      {/* CABECERA (Header) */}
      <div className="relative w-full h-56 md:h-80 bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/img/large/heroBlog.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700/40"></div>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
        <h1
          className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg uppercase text-center mt-8 md:mt-12"
          style={{ fontFamily: "'Anta', sans-serif" }}
        >
          Contacto
        </h1>
      </div>

      {/* Main Content Area */}
      <main className='p-10'>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Formulario de Contacto (2/3 columnas) */}
          <div className="md:col-span-2 bg-white/95 p-8 shadow-lg rounded-sm">
            <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tighter">Formulario de contacto</h2>
            <div className="h-0.5 bg-yellow-500 w-full mb-6"></div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="font-bold text-gray-700">Registrate</p>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre :</label>
                <input
                  type="text"
                  {...register('nombre')}
                  placeholder="Tu nombre"
                  className={`w-full p-2 bg-gray-50 border ${errors.nombre ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                />
                {errors.nombre && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="ejemplo@gmail.com"
                  className={`w-full p-2 bg-yellow-50/30 border ${errors.email ? 'border-red-500' : 'border-yellow-500/30'} focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
                <textarea
                  {...register('mensaje')}
                  rows="5"
                  placeholder="Escribe tu mensaje..."
                  className={`w-full p-2 bg-gray-50 border ${errors.mensaje ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm`}
                ></textarea>
                {errors.mensaje && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.mensaje.message}</p>}
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
                    onClick={() => reset()}
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
                  {...register('acepto')}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="acepto" className={`text-xs ${errors.acepto ? 'text-red-600' : 'text-gray-600'}`}>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.186596374947!2d-3.6338329999999996!3d37.1482624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fb3a9ffc182f%3A0x42d0c77f192a03b5!2sTaekwon%20Do%20Sierra%20Nevada%20SEDES%20POR%20TODA%20GRANADA%20Y%20ALREDEDORES!5e0!3m2!1ses!2ses!4v1776707973273!5m2!1ses!2ses"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Sección del PDF (Dossier) - Oculto en móviles */}
        <div className="hidden md:block max-w-6xl mx-auto mt-12 bg-white/95 p-8 shadow-lg rounded-sm">
          <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tighter">Dossier Informativo</h2>
          <div className="h-0.5 bg-yellow-500 w-full mb-6"></div>
          <div className="w-full h-[500px] md:h-[800px] bg-gray-100 rounded overflow-hidden">
            <iframe
              src={`${dossierPdf}#toolbar=0`}
              className="w-full h-full border-0"
              title="Dossier Informativo PDF"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;