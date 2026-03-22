import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/news/');
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("No se pudieron cargar las noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Blog & Noticias</h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Mantente al día con los últimos eventos, campeonatos y novedades de Taekwondo Sierra Nevada.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item) => (
            <div key={item.id} className="group bg-white rounded-sm shadow-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1">
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.img1 || "/placeholder-news.jpg"} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#FFCC47] text-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  Noticia
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-xs mb-4 gap-2">
                  <Calendar size={14} />
                  <span>{new Date(item.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 uppercase tracking-tight leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.content}
                </p>

                <div className="mt-auto">
                  <Link 
                    to={`/blog/${item.id}`}
                    className="inline-flex items-center gap-2 text-black font-black text-xs uppercase tracking-[0.2em] border-b-2 border-[#FFCC47] pb-1 hover:border-black transition-all"
                  >
                    Leer más <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length === 0 && !loading && !error && (
          <div className="text-center py-20 bg-white rounded-sm shadow-sm border border-gray-100">
            <p className="text-gray-400 italic">No hay noticias publicadas en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
