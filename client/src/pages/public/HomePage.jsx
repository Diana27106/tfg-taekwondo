import React from 'react';
import Navbar from '../../components/public/Navbar';
import FeaturableWidget from '../../components/public/FeaturableWidget';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Hero Section */}
      <header className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image con Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/img/large/heroHomeContact.jpg')" }} // Reemplazar con tu imagen
        >
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Bienvenidos a <br />
            <span className="block mt-2">Taekwondo Sierra Nevada</span>
          </h1>
          <p className="text-white mt-6 text-lg md:text-xl font-medium italic">
            Siempre un poco más y mejor
          </p>
        </div>
      </header>

      {/* Section: Sobre Nosotros */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row items-stretch">
          
          {/* Texto - En móvil arriba, en desktop izquierda */}
          <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2 inline-block">
              Sobre nosotros
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify lg:text-left">
              En Taekwondo Sierra Nevada, nos dedicamos a formar no solo campeones, 
              sino también personas íntegras, comprometidas con su crecimiento personal 
              y deportivo. Nuestra misión es proporcionar una educación en Taekwondo 
              que trascienda las habilidades físicas, promoviendo los valores de disciplina, 
              respeto, esfuerzo y trabajo en equipo.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed hidden md:block">
              Creemos en el poder del deporte para transformar vidas, enseñando a nuestros 
              alumnos a superar sus propios límites y a enfrentar los retos con determinación.
            </p>
            <button className="mt-8 text-blue-700 font-bold hover:underline self-start">
              Leer más...
            </button>
          </div>

          {/* Imagen - En móvil al centro, en desktop derecha */}
          <div className="lg:w-1/2 p-6 md:p-12 flex justify-center items-center order-1 md:order-2 bg-gray-100">
            <div className="relative group">
              <img 
                src="/combate.jpg" 
                alt="Competencia Taekwondo" 
                className="shadow-2xl rounded-sm w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
              />
              {/* Adorno estético opcional similar al diseño */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-blue-900 -z-10 hidden md:block"></div>
            </div>
          </div>

        </section>

        <FeaturableWidget />
      </main>
    </div>
  );
};

export default LandingPage;