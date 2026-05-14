import { API_BASE_URL, BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/public/Navbar';
import FeaturableWidget from '../../components/public/FeaturableWidget';

/**
 * Página Principal (Landing Page).
 * Sección de bienvenida, presentación de servicios, noticias destacadas y patrocinadores.
 * 
 * @component
 */
const LandingPage = () => {
  // Estado para almacenar los patrocinadores desde la BBDD
  const [patrocinadores, setPatrocinadores] = useState([]);

  useEffect(() => {
    // Aquí debes hacer la llamada real a tu API/Base de datos
    const fetchPatrocinadores = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/sponsors/`);
        setPatrocinadores(response.data);
      } catch (error) {
        console.error("Error al cargar los patrocinadores:", error);
      }
    };

    fetchPatrocinadores();
  }, []);

  return (
    <div className="min-h-screen font-sans">

      {/* Hero Section */}
      <header className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image con Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/img/large/heroHomeContact.jpg')" }}
        >
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Anta', sans-serif" }}>
            <span className="block">Bienvenidos a</span>
            <span className="block transition-colors duration-300 hover:text-yellow-500 cursor-default">
              <span className="block mt-2">Taekwondo Sierra</span>
              <span className="block mt-2">Nevada</span>
            </span>
          </h1>
          <p className="text-white mt-6 text-lg md:text-xl font-medium italic">
            Siempre un poco más y mejor
          </p>
        </div>
      </header>

      {/* Section: Sobre Nosotros - Dual View (Desktop Original / Mobile Premium) */}
      <section className="w-full relative mt-24 mb-32">
        
        {/* VISTA ESCRITORIO (Diseño Estilo SponsorsPage) */}
        <div className="hidden md:flex bg-white p-16 flex-row-reverse items-stretch gap-10 font-sans">
          {/* Contenedor de la Imagen (Derecha) */}
          <div className="w-1/2 relative min-h-[400px] flex-shrink-0">
            <div className="absolute top-[-80px] bottom-[-80px] left-0 right-0">
              <img
                src="/assets/img/medium/home.jpg"
                alt="Competencia Taekwondo"
                className="shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Contenedor de Texto (Izquierda) */}
          <div className="w-1/2 text-gray-800 flex flex-col justify-center pr-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2 inline-block self-start">
              Sobre nosotros
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-justify text-sm md:text-base">
              <p>
                En Taekwondo Sierra Nevada, nos dedicamos a formar no solo campeones,
                sino también personas íntegras, comprometidas con su crecimiento personal
                y deportivo. Nuestra misión es proporcionar una educación en Taekwondo
                que trascienda las habilidades físicas, promoviendo los valores de disciplina,
                respeto, esfuerzo y trabajo en equipo.
              </p>
              <p>
                Creemos en el poder del deporte para transformar vidas, enseñando a nuestros
                alumnos a superar sus propios límites y a enfrentar los retos con determinación.
              </p>
            </div>
          </div>
        </div>

        {/* VISTA MÓVIL (Diseño Premium Estilo AboutPage) */}
        <div className="md:hidden max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col items-stretch">
            
            {/* Parte Visual e Identidad */}
            <div className="bg-slate-50 p-10 flex flex-col items-center justify-center text-center relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Sobre nosotros
              </h2>

              <div className="w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-1000 border-[10px] border-white group">
                <img
                  src="/assets/img/medium/home.jpg"
                  alt="Sobre Nosotros Taekwondo Sierra Nevada"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* Parte Narrativa */}
            <div className="p-10 flex flex-col justify-center bg-white text-gray-800">
              <div className="space-y-4 text-sm leading-relaxed text-justify">
                <p>
                  En <strong>Taekwondo Sierra Nevada</strong>, nos dedicamos a formar no solo campeones,
                  sino también personas íntegras, comprometidas con su crecimiento personal
                  y deportivo.
                </p>
                <p>
                  Creemos en el poder del deporte para transformar vidas, enseñando a nuestros
                  alumnos a superar sus propios límites y a enfrentar los retos con determinación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-12">
        <FeaturableWidget />
      </div>

      {/* Sección de Patrocinadores e Imagen Destacada */}
      <section className="w-full bg-white relative py-8 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* Patrocinadores (1/3) */}
            <div className="lg:col-span-1 relative z-10 flex flex-col" style={{ marginTop: '-10px', marginBottom: '-10px' }}>
              <div className="grid grid-cols-2 gap-4 h-full">
                {patrocinadores.slice(0, 4).map((patrocinador, index) => {
                  if (index === 3) {
                    return (
                      <Link
                        to="/sponsors"
                        key={patrocinador.id}
                        className="bg-white shadow-md rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden relative group h-32"
                      >
                        <img
                          src={patrocinador.logo}
                          alt={patrocinador.name}
                          className="max-h-24 object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white text-5xl font-light transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            +
                          </span>
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={patrocinador.id}
                      className="bg-white p-4 shadow-md rounded-xl flex items-center justify-center border border-gray-100 hover:shadow-lg transition-shadow h-32"
                    >
                      <img
                        src={patrocinador.logo}
                        alt={patrocinador.name}
                        className="max-h-24 object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Imagen Principal (Derecha, 2/3) sobresale 10px arriba y abajo */}
            <div className="hidden lg:flex lg:col-span-2 relative z-10 flex-col group" style={{ marginTop: '-10px', marginBottom: '-10px' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white flex-grow h-full">
                <img
                  src="/assets/img/medium/home2.jpg"
                  alt="Entrenamiento Taekwondo"
                  className="w-full h-[400px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;