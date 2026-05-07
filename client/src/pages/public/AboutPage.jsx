import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CortesiaModal from '../../components/public/CortesiaModal';
import IntegridadModal from '../../components/public/IntegridadModal';
import PerseveranciaModal from '../../components/public/PerseveranciaModal';
import AutocontrolModal from '../../components/public/AutocontrolModal';
import EspirituIndomableModal from '../../components/public/EspirituModal';

const AboutPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para los modales de Principios
  const [isCortesiaOpen, setIsCortesiaOpen] = useState(false);
  const [isIntegridadOpen, setIsIntegridadOpen] = useState(false);
  const [isPerseveranciaOpen, setIsPerseveranciaOpen] = useState(false);
  const [isAutocontrolOpen, setIsAutocontrolOpen] = useState(false);
  const [isEspirituOpen, setIsEspirituOpen] = useState(false);

  // Estado para el carrusel de instructores en móvil
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const carouselTimer = useRef(null);

  const nextInstructor = () => {
    setCurrentInstructor((prev) => (prev + 1) % instructors.length);
  };

  const prevInstructor = () => {
    setCurrentInstructor((prev) => (prev - 1 + instructors.length) % instructors.length);
  };

  useEffect(() => {
    if (instructors.length > 0) {
      carouselTimer.current = setInterval(nextInstructor, 5000);
    }
    return () => {
      if (carouselTimer.current) clearInterval(carouselTimer.current);
    };
  }, [instructors.length]);

  const resetTimer = () => {
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(nextInstructor, 5000);
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/instructors/');
        setInstructors(response.data);
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError("No se pudieron cargar los instructores.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();

    // Cargar script de Instagram
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans overflow-hidden">

      {/* CABECERA (Header) */}
      <div className="relative w-full h-56 md:h-80 bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
          style={{ backgroundImage: "url('../../../src/assets/img/large/heroAbout.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700/40"></div>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
        <h1
          className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg uppercase text-center mt-8 md:mt-12"
          style={{ fontFamily: "'Anta', sans-serif" }}
        >
          Sobre Nosotros
        </h1>
      </div>

      {/* SECCIÓN 1: HISTORIA DE LA ESCUELA - Dual View */}
      <section className="w-full relative mt-24 mb-32">
        
        {/* VISTA ESCRITORIO (Diseño Estilo SponsorsPage) */}
        <div className="hidden md:flex bg-white p-16 flex-row-reverse items-stretch gap-10 font-sans">
          {/* Contenedor de la Imagen (Derecha) */}
          <div className="w-1/2 relative min-h-[400px] flex-shrink-0">
            <div className="absolute top-[-80px] bottom-[-80px] left-0 right-0">
              <img
                src="../../../src/assets/img/medium/historia.jpg"
                alt="Historia de la Escuela"
                className="shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Contenedor de Texto (Izquierda) */}
          <div className="w-1/2 text-gray-800 flex flex-col justify-center pr-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2 inline-block self-start">
              Historia de la Escuela
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-justify text-sm md:text-base">
              <p>
                Fundada en 2020, <strong>Taekwon-Do Sierra Nevada</strong> nació como un proyecto familiar
                con la ilusión de compartir el Taekwon-Do como arte, disciplina y estilo de vida.
                Desde el inicio, nos guiaron valores como el respeto, la perseverancia y el trabajo
                en equipo, construyendo una escuela cercana y comprometida con cada alumno.
              </p>

              <p>
                A lo largo de los años, hemos crecido hasta convertirnos en un referente dentro de
                nuestra comunidad. No solo hemos formado campeones, sino que también nos enorgullece
                ver cómo nuestros alumnos crecen como personas.
              </p>

              <p>
                Hoy, seguimos comprometidos con ese mismo espíritu con el que comenzamos; enseñar
                con pasión, educar con el ejemplo, y formar no solo cinturones negros, sino personas
                íntegras, valientes y comprometidas con su propio camino.
              </p>
            </div>
          </div>
        </div>

        {/* VISTA MÓVIL (Diseño Premium) */}
        <div className="md:hidden max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col items-stretch">
            
            {/* Parte Visual e Identidad */}
            <div className="bg-slate-50 p-10 flex flex-col items-center justify-center text-center relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Historia de la Escuela
              </h2>

              <div className="w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white group">
                <img
                  src="../../../src/assets/img/medium/historia.jpg"
                  alt="Historia Taekwondo Sierra Nevada"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* Parte Narrativa */}
            <div className="p-10 flex flex-col justify-center bg-white text-gray-800">
              <div className="space-y-4 text-sm leading-relaxed text-justify">
                <p>
                  Fundada en 2020, <strong>Taekwon-Do Sierra Nevada</strong> nació como un proyecto familiar
                  con la ilusión de compartir el Taekwon-Do como arte, disciplina y estilo de vida.
                </p>
                <p>
                  A lo largo de los años, hemos crecido hasta convertirnos en un referente dentro de
                  nuestra comunidad, formando no solo campeones, sino personas íntegras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 & 3: PRINCIPIOS E INSTRUCTORES */}
      <div className="relative w-full mt-24 pb-24">

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">

          {/* PRINCIPIOS FLOTANTES Y FOTO POLAROID */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-32 min-h-[550px] gap-12 lg:gap-8">

            {/* Izquierda: Etiquetas flotantes de los principios (Mosaico en Cascada mejorado) */}
            <div className="w-full lg:w-1/2 relative flex flex-col justify-center min-h-[400px] lg:min-h-[550px] gap-6 py-10 lg:pr-10 items-center lg:items-start">
              <div
                onClick={() => setIsCortesiaOpen(true)}
                className="lg:self-start bg-white/90 backdrop-blur-md border border-orange-200 text-orange-600 rounded-2xl px-8 lg:px-10 py-4 shadow-xl font-bold text-lg lg:text-xl tracking-wide hover:-translate-y-1 hover:scale-105 hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer w-full max-w-[280px] lg:max-w-none lg:w-auto text-center lg:text-left"
              >
                Cortesía
              </div>
              <div
                onClick={() => setIsIntegridadOpen(true)}
                className="lg:self-start lg:ml-14 bg-white/90 backdrop-blur-md border border-green-200 text-green-700 rounded-2xl px-8 lg:px-10 py-4 shadow-xl font-bold text-lg lg:text-xl tracking-wide hover:-translate-y-1 hover:scale-105 hover:shadow-green-500/20 transition-all duration-300 cursor-pointer w-full max-w-[280px] lg:max-w-none lg:w-auto text-center lg:text-left"
              >
                Integridad
              </div>
              <div
                onClick={() => setIsPerseveranciaOpen(true)}
                className="lg:self-start lg:ml-28 bg-white/90 backdrop-blur-md border border-blue-200 text-blue-600 rounded-2xl px-8 lg:px-10 py-4 shadow-xl font-bold text-lg lg:text-xl tracking-wide hover:-translate-y-1 hover:scale-105 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer w-full max-w-[280px] lg:max-w-none lg:w-auto text-center lg:text-left"
              >
                Perseverancia
              </div>
              <div
                onClick={() => setIsAutocontrolOpen(true)}
                className="lg:self-start lg:ml-40 bg-white/90 backdrop-blur-md border border-red-200 text-red-600 rounded-2xl px-8 lg:px-10 py-4 shadow-xl font-bold text-lg lg:text-xl tracking-wide hover:-translate-y-1 hover:scale-105 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer w-full max-w-[280px] lg:max-w-none lg:w-auto text-center lg:text-left"
              >
                Autocontrol
              </div>
              <div
                onClick={() => setIsEspirituOpen(true)}
                className="lg:self-start lg:ml-52 bg-white/90 backdrop-blur-md border border-slate-300 text-slate-800 rounded-2xl px-8 lg:px-10 py-4 shadow-xl font-bold text-lg lg:text-xl tracking-wide hover:-translate-y-1 hover:scale-105 hover:shadow-slate-500/20 transition-all duration-300 cursor-pointer w-full max-w-[280px] lg:max-w-none lg:w-auto text-center lg:text-left"
              >
                Espíritu Indomable
              </div>
            </div>

            {/* Derecha: Imagen tipo polaroid / Instagram Embed */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 pr-0 lg:pr-4">
              <div className="bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
                <iframe
                  src="https://www.instagram.com/reel/DBa8Bm9IF6m/embed"
                  width="350"
                  height="550"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  className="rounded-lg shadow-sm"
                ></iframe>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: INSTRUCTORES */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-16 uppercase tracking-wider">
              Nuestros Instructores
            </h2>

            {loading && (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-700"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-xl border-l-4 border-red-500 p-6 mb-8 shadow-sm">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {!loading && !error && instructors.length === 0 && (
              <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                <p className="text-gray-500 text-lg">No hay instructores registrados actualmente.</p>
              </div>
            )}

            {!loading && !error && instructors.length > 0 && (
              <div className="relative">
                {/* Vista Móvil: Carrusel */}
                <div className="lg:hidden relative px-4 overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentInstructor * 100}%)` }}
                  >
                    {instructors.map((instructor) => (
                      <div key={instructor.id} className="min-w-full flex flex-col items-center px-2">
                        <div className="relative w-full max-w-sm">
                          {/* Imagen circular centrada arriba */}
                          <div className="mx-auto w-48 h-48 rounded-full shadow-2xl bg-gray-200 border-4 border-white overflow-hidden z-10 relative -mb-12">
                            {instructor.photo ? (
                              <img src={instructor.photo} alt={instructor.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold uppercase text-xs">Sin foto</div>
                            )}
                          </div>
                          
                          {/* Tarjeta de contenido */}
                          <div className="bg-white rounded-3xl shadow-xl pt-16 pb-10 px-8 text-center border border-gray-50">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">{instructor.name}</h3>
                            {instructor.rank && (
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                                {instructor.rank}º DAN
                              </span>
                            )}
                            <p className="text-slate-600 text-sm leading-relaxed text-center italic">
                              {instructor.bio || "En Taekwondo Sierra Nevada, nos dedicamos a formar no solo campeones, sino también personas íntegras."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controles del Carrusel Móvil */}
                  <div className="flex justify-center items-center gap-6 mt-8">
                    <button 
                      onClick={() => { prevInstructor(); resetTimer(); }}
                      className="p-3 bg-white shadow-lg rounded-full text-slate-700 hover:bg-slate-50 transition-colors border border-gray-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                      {instructors.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-2 rounded-full transition-all duration-300 ${idx === currentInstructor ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={() => { nextInstructor(); resetTimer(); }}
                      className="p-3 bg-white shadow-lg rounded-full text-slate-700 hover:bg-slate-50 transition-colors border border-gray-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* Vista Escritorio: Grid Original */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-x-12 gap-y-24 pt-8">
                  {instructors.map((instructor) => (
                    <div key={instructor.id} className="relative flex items-center w-full pl-24 sm:pl-32 mt-8 md:mt-0 group">
                      {/* Imagen circular */}
                      <div className="absolute left-0 z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] bg-gray-200 border-4 border-white flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                        {instructor.photo ? (
                          <img
                            src={instructor.photo}
                            alt={instructor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm uppercase tracking-widest text-gray-500 font-bold">Sin foto</span>
                        )}
                      </div>

                      {/* Tarjeta de contenido */}
                      <div className="w-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 py-10 pr-10 pl-32 sm:pl-40 min-h-[15rem] flex flex-col justify-center relative z-0 border border-gray-50">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 truncate">{instructor.name}</h3>
                        {instructor.rank && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-max">
                            {instructor.rank}º DAN
                          </span>
                        )}
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify line-clamp-4">
                          {instructor.bio || "En Taekwondo Sierra Nevada, nos dedicamos a formar no solo campeones, sino también personas íntegras, comprometidas con su crecimiento personal y deportivo."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MODALES PRINCIPIOS */}
      <CortesiaModal isOpen={isCortesiaOpen} onClose={() => setIsCortesiaOpen(false)} />
      <IntegridadModal isOpen={isIntegridadOpen} onClose={() => setIsIntegridadOpen(false)} />
      <PerseveranciaModal isOpen={isPerseveranciaOpen} onClose={() => setIsPerseveranciaOpen(false)} />
      <AutocontrolModal isOpen={isAutocontrolOpen} onClose={() => setIsAutocontrolOpen(false)} />
      <EspirituIndomableModal isOpen={isEspirituOpen} onClose={() => setIsEspirituOpen(false)} />
    </div >
  );
};

export default AboutPage;