import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowLeft } from 'lucide-react';

const NoticiaDetailPage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/news/${id}/`);
        setNewsItem(response.data);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError("No se pudo cargar la noticia.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  if (error || !newsItem) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 shadow-xl rounded-sm text-center max-w-md w-full">
        <p className="text-red-500 font-bold mb-4">{error || "Noticia no encontrada"}</p>
        <Link to="/blog" className="text-black font-black uppercase tracking-widest border-b-2 border-[#FFCC47] hover:border-black transition-all pb-1 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Volver al Blog
        </Link>
      </div>
    </div>
  );

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Header with Image 1 */}
      <header className="relative h-[50vh] min-h-[400px]">
        <img 
          src={newsItem.img1 || "/placeholder-news.jpg"} 
          alt={newsItem.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block bg-[#FFCC47] text-black px-4 py-1 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Noticia
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              {newsItem.title}
            </h1>
            <div className="flex items-center justify-center text-gray-300 text-sm gap-4">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(newsItem.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-12 uppercase text-xs font-bold tracking-widest">
          <ArrowLeft size={16} /> Volver al blog
        </Link>

        {/* Content Body */}
        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm">
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif text-justify">
            {newsItem.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </div>

          {/* Image 2 (Secondary) */}
          {newsItem.img2 && (
            <div className="mt-12 rounded-sm overflow-hidden shadow-lg border-4 border-[#FFCC47]">
              <img src={newsItem.img2} alt="Detalle" className="w-full h-auto" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NoticiaDetailPage;
