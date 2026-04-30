import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowLeft, Clock, Share2, Tag } from 'lucide-react';

const NoticiaDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        // Intentamos buscar por slug. Si el backend no tiene endpoint de slug directo, 
        // podríamos tener que filtrar de la lista, pero asumimos un endpoint de detalle.
        // Nota: Si el backend usa IDs en el endpoint, pero slugs en la URL, 
        // aquí deberíamos adaptar la lógica. 
        const response = await axios.get(`http://127.0.0.1:8000/api/news/${slug}/`);
        setNewsItem(response.data);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError("No se pudo encontrar la noticia solicitada.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-500"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cargando historia...</p>
      </div>
    </div>
  );

  if (error || !newsItem) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <h2 className="text-4xl font-black uppercase mb-4 text-gray-900">¡Ups!</h2>
        <p className="text-gray-500 mb-8 font-medium">{error || "No hemos podido encontrar lo que buscabas."}</p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-yellow-500 transition-all flex items-center gap-3 mx-auto"
        >
          <ArrowLeft size={18} /> Volver al Blog
        </button>
      </div>
    </div>
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: `Lee esta noticia: ${newsItem.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha reciente";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-200">
      {/* Hero Header */}
      <header className="relative w-full h-[60vh] md:h-[70vh] bg-gray-900 overflow-hidden">
        <img 
          src={newsItem.img1} 
          alt={newsItem.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Tag size={12} />
              Actualidad
            </div>
            
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic drop-shadow-2xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ fontFamily: "'Anta', sans-serif" }}>
              {newsItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-yellow-500" />
                {formatDate(newsItem.published_at || newsItem.created_at || newsItem.date)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-yellow-500" />
                Lectura rápida
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-24">
        {/* Main Content */}
        <article className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] p-8 md:p-16 border-t-8 border-yellow-500">
          <div className="flex justify-between items-center mb-12">
            <Link to="/blog" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              <ArrowLeft size={14} /> Volver al blog
            </Link>
            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-yellow-500 transition-colors"
              >
                Compartir <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {newsItem.content && newsItem.content.split('\n').map((para, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed text-lg mb-8 text-justify">
                {para}
              </p>
            ))}
          </div>

          {/* Secondary Image with Sierra Nevada style */}
          {newsItem.img2 && (
            <div className="mt-16 relative group">
              <div className="absolute inset-0 bg-yellow-500 translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <img 
                src={newsItem.img2} 
                alt="Detalle de la noticia" 
                className="w-full h-auto shadow-2xl border-4 border-white"
              />
            </div>
          )}
        </article>
      </main>

      {/* Footer Decoration */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-gray-100 flex justify-between items-center">
        <div>
          <div className="h-1 bg-yellow-500 w-12 mb-2"></div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Taekwon-Do Sierra Nevada
          </p>
        </div>
        <div className="text-4xl font-black text-gray-50 select-none italic tracking-tighter">NOTICIAS</div>
      </footer>
    </div>
  );
};

export default NoticiaDetailPage;


