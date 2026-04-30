import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/public/Navbar';
import FeaturableWidget from '../../components/public/FeaturableWidget';

const LandingPage = () => {
  // Estado para almacenar los patrocinadores desde la BBDD
  const [patrocinadores, setPatrocinadores] = useState([]);

  useEffect(() => {
    // Aquí debes hacer la llamada real a tu API/Base de datos
    const fetchPatrocinadores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sponsors/');
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
          style={{ backgroundImage: "url('/src/assets/img/large/heroHomeContact.jpg')" }}
        >
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Anta', sans-serif" }}>
            <span className="block">Bienvenidos a</span>
            <span className="block mt-2 transition-colors duration-300 hover:text-yellow-500 cursor-default">
              Taekwondo Sierra
            </span>
            <span className="block mt-2">Nevada</span>
          </h1>
          <p className="text-white mt-6 text-lg md:text-xl font-medium italic">
            Siempre un poco más y mejor
          </p>
        </div>
      </header>

      {/* Section: Sobre Nosotros */}
      <section className="w-full bg-white relative mt-24 mb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
          {/* Texto (Lado izquierdo) */}
          <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2 inline-block self-start">
              Sobre nosotros
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify lg:text-left text-sm md:text-base">
              En Taekwondo Sierra Nevada, nos dedicamos a formar no solo campeones,
              sino también personas íntegras, comprometidas con su crecimiento personal
              y deportivo. Nuestra misión es proporcionar una educación en Taekwondo
              que trascienda las habilidades físicas, promoviendo los valores de disciplina,
              respeto, esfuerzo y trabajo en equipo.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed hidden md:block text-sm md:text-base">
              Creemos en el poder del deporte para transformar vidas, enseñando a nuestros
              alumnos a superar sus propios límites y a enfrentar los retos con determinación.
            </p>
          </div>

          {/* Imagen (Lado derecho) sobresale 20px arriba y abajo */}
          <div className="w-full md:w-1/2 px-4 md:px-8 order-1 md:order-2 flex flex-col relative z-10">
            <img
              src="../../../src/assets/img/medium/home.jpg"
              alt="Competencia Taekwondo"
              className="shadow-2xl rounded-sm w-full object-cover flex-grow"
              style={{ marginTop: '-20px', marginBottom: '-20px', minHeight: '400px' }}
            />
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
            <div className="lg:col-span-2 relative z-10 flex flex-col group" style={{ marginTop: '-10px', marginBottom: '-10px' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white flex-grow h-full">
                <img
                  src="../../../src/assets/img/medium/home2.jpg"
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