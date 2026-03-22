import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  return (
    // Se añadió un fondo gris muy claro para que el blanco de las tarjetas resalte
    <div className="w-full min-h-screen bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">Cargando instructores...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && instructors.length === 0 && (
          <p className="text-gray-600">No hay instructores registrados actualmente.</p>
        )}

        {!loading && !error && instructors.length > 0 && (
          // Grid de 2 columnas con bastante espacio (gap) para acomodar el diseño
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 pt-8">
            {instructors.map((instructor) => (
              // Contenedor principal de la tarjeta, usa "relative"
              <div key={instructor.id} className="relative flex items-center w-full pl-24 sm:pl-28">
                
                {/* Imagen circular superpuesta en la izquierda (absolute) */}
                <div className="absolute left-0 z-10 w-64 h-64 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] bg-gray-200 flex items-center justify-center overflow-hidden">
                  {instructor.photo ? (
                    <img 
                      src={instructor.photo} 
                      alt={instructor.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-gray-500">Sin foto</span>
                  )}
                </div>

                {/* Tarjeta blanca de contenido */}
                <div className="w-full bg-white shadow-xl py-8 pr-8 pl-48 sm:pl-48 min-h-[14rem] flex flex-col justify-center relative z-0">
                  
                  {/* Nota: En tu imagen no salen los nombres, pero los dejé pequeños por si los necesitas. 
                      Si quieres que sea EXACTAMENTE igual a la imagen, puedes borrar estas dos líneas de <h2> y <p> */}
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h2>
                  <p className="text-blue-700 text-xs font-bold mb-3">Rango: {instructor.rank}º DAN</p>
                  
                  {/* Texto de la biografía */}
                  <p className="text-gray-800 text-sm leading-loose text-justify font-serif">
                    {instructor.bio || "En Taekwon-Do Sierra Nevada, nos dedicamos a formar no solo campeones, sino también personas íntegras, comprometidas con su crecimiento personal y deportivo."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;