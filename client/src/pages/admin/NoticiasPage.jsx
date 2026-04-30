import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import { Newspaper, Plus, Image as ImageIcon, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NoticiasPage = () => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-16 animate-fade-in pb-20">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Flujo.Informativo</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Resgistro de <span className="text-gradient">Noticias</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Difundiendo actualizaciones de <span className="text-primary italic">Taekwondo Sierra Nevada</span>, informes tácticos y transmisiones comunitarias.
            </p>
          </div>
          
        </div>

        {/* HUD Table Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-l-4 border-secondary pl-6">
            <div>
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Informes <span className="text-secondary italic">Publicados</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mt-3">Protocolo de sincronización de flujo informativo activo.</p>
            </div>
            <div className="p-4 border border-secondary/20 text-secondary/40">
              <Newspaper size={24} />
            </div>
          </div>
          
          <ProTable 
            apiUrl="/api/news/"
            entityName="Noticia"
            routePath="/admin/noticias"
            searchPlaceholder="ESCANEANDO INFORMES..."
            columns={[
              { 
                header: 'Informe / Unidad', 
                key: 'title',
                render: (row) => (
                  <div className="flex items-center gap-6">
                    <div className="relative group/news overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/news:opacity-100 transition-opacity z-10" />
                      <div className="relative h-14 w-24 rounded-sm bg-black/40 border border-border/30 flex items-center justify-center group-hover/news:border-primary/50 transition-colors overflow-hidden">
                        {row.img1 ? (
                          <img src={`http://localhost:8000${row.img1}`} alt={row.title} className="w-full h-full object-cover grayscale group-hover/news:grayscale-0 transition-all duration-500" />
                        ) : (
                          <ImageIcon size={20} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <div className="text-[12px] font-black text-foreground uppercase tracking-wider line-clamp-1 group-hover/row:text-primary transition-colors">{row.title}</div>
                      <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest opacity-70">Descriptor: {row.slug}</div>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Fecha.Publicación', 
                key: 'published_at',
                render: (row) => (
                  <div className="flex items-center gap-3 font-mono">
                    <Calendar size={12} className="text-primary" />
                    <span className="text-[11px] font-black text-foreground uppercase tracking-tighter">
                      {formatDate(row.published_at).toUpperCase()}
                    </span>
                  </div>
                )
              }
            ]}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default NoticiasPage;
