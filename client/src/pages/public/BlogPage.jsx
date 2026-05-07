import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowRight, RefreshCw, Newspaper } from 'lucide-react';
import GalleryCarousel from '../../components/public/GalleryCarousel';

// Configuración - Idealmente en un archivo .env
const API_URL = 'http://127.0.0.1:8000/api/news/?format=json';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/800x600?text=TKD+Sierra+Nevada';

const BlogPage = () => {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Ordenar por fecha más reciente (o ID descendente como fallback)
      const sortedData = response.data.sort((a, b) => {
        const dateA = new Date(a.created_at || a.date || 0);
        const dateB = new Date(b.created_at || b.date || 0);
        return dateB - dateA || (b.id - a.id);
      });
      setNews(sortedData);
      setError(null);
    } catch (err) {
      setError("No se pudieron cargar las noticias. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Reciente";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  // --- COMPONENTES INTERNOS ---

  const SkeletonCard = ({ gridClasses }) => (
    <div className={`${gridClasses} bg-gray-100 animate-pulse border-2 border-gray-50`} />
  );

  // --- RENDERIZADO CONDICIONAL ---

  if (loading && news.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[350px]">
        <SkeletonCard gridClasses="md:col-span-2 md:row-span-2" />
        <SkeletonCard gridClasses="md:col-span-2" />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-white pb-24">
      {/* CABECERA (Header) */}
      <div className="relative w-full h-56 md:h-80 bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
          style={{ backgroundImage: "url('../../../src/assets/img/large/heroBlog.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700/40"></div>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
        <h1
          className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg uppercase text-center mt-8 md:mt-12"
          style={{ fontFamily: "'Anta', sans-serif" }}
        >
          Blog
        </h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8">

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-red-100 rounded-xl">
            <p className="text-red-500 font-bold mb-6">{error}</p>
            <button onClick={fetchNews} className="flex items-center gap-2 px-8 py-3 bg-black text-white hover:bg-yellow-500 transition-all uppercase font-black text-xs shadow-xl">
              <RefreshCw size={18} /> Reintentar
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="mx-auto mb-4 text-gray-200" size={80} />
            <p className="text-gray-400 uppercase tracking-[0.3em] font-bold text-sm">No hay noticias disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {news.slice(0, visibleCount).map((item, index) => {
              // Lógica de Grid Asimétrico
              let gridClasses = "col-span-1 row-span-1";
              if (index === 0) gridClasses = "md:col-span-2 md:row-span-2";
              else if (index === 1 || index === 5) gridClasses = "md:col-span-2 md:row-span-1";

              return (
                <Link
                  key={item.id || index}
                  to={`/noticia/${item.slug}`}
                  className={`${gridClasses} group relative overflow-hidden bg-black shadow-xl hover:shadow-2xl transition-all duration-500 rounded-sm`}
                >
                  {/* Image with dark layer */}
                  <div className="absolute inset-0 bg-black overflow-hidden">
                    <img
                      src={index === 0 ? (item.img2 || item.img1) : item.img1 || PLACEHOLDER_IMG}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Top line decoration */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-8 h-[1px] bg-yellow-500"></div>
                      <span>{formatDate(item.published_at || item.created_at || item.date)}</span>
                    </div>

                    <h3 className={`text-white font-black leading-tight uppercase group-hover:text-yellow-500 transition-colors duration-300 ${index === 0 ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                      {item.title}
                    </h3>

                    <div className="mt-6 flex items-center text-white/70 gap-3 font-bold text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="text-yellow-500">Seguir leyendo</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {!loading && visibleCount < news.length && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group relative px-14 py-6 bg-black text-white font-black uppercase tracking-[0.4em] text-[10px] hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-4 shadow-[10px_10px_0px_rgba(0,0,0,0.05)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95"
            >
              Cargar más historias
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
          </div>
        )}
      </main>

      {/* GALERÍA EXTRA - Oculta en móviles */}
      <div className="hidden md:block">
        <GalleryCarousel />
      </div>
    </div>
  );
};

export default BlogPage;
