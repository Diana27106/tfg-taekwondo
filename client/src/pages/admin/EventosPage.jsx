import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import { Calendar, Plus, Clock, MapPin, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de Gestión de Eventos.
 * Lista todos los eventos registrados y permite acceder a la creación, edición y borrado.
 * 
 * @component
 */
const EventosPage = () => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
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
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Linea.De.Tiempo</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Agenda de <span className="text-gradient">Eventos</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Orquestando el calendario operativo de <span className="text-primary italic">Taekwondo Sierra Nevada</span>, exámenes y despliegues tácticos.
            </p>
          </div>
          
        </div>

        {/* HUD Table Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-l-4 border-secondary pl-6">
            <div>
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Calendario <span className="text-secondary italic">Activo</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mt-3">Protocolo de sincronización temporal activo.</p>
            </div>
            <div className="p-4 border border-secondary/20 text-secondary/40">
              <Calendar size={24} />
            </div>
          </div>
          
          <ProTable 
            apiUrl="/api/events/"
            entityName="Evento"
            routePath="/admin/eventos"
            searchPlaceholder="ESCANEANDO AGENDA..."
            filterConfigs={[
              { label: 'Ubicación', field: 'location' }
            ]}
            columns={[
              { 
                header: 'Operación / Evento', 
                key: 'title',
                render: (row) => (
                  <div className="space-y-2">
                    <div className="text-[12px] font-black text-foreground uppercase tracking-wider group-hover/row:text-primary transition-colors">{row.title}</div>
                    <div className="flex items-center gap-2 text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">
                      <MapPin size={12} className="text-secondary" />
                      Sector: {row.location}
                    </div>
                  </div>
                )
              },
              { 
                header: 'Vector.Temporal', 
                key: 'start_date',
                render: (row) => (
                  <div className="flex flex-col gap-2 font-mono">
                    <div className="flex items-center gap-2 text-[11px] text-foreground font-black tracking-tighter">
                      <Clock size={12} className="text-primary" />
                      {formatDate(row.start_date).toUpperCase()}
                    </div>
                    <div className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] pl-5">
                      Finalización: {formatDate(row.end_date).toUpperCase()}
                    </div>
                  </div>
                )
              },
              { 
                header: 'Protocolo.Registro', 
                key: 'registration_link',
                render: (row) => row.registration_link ? (
                  <a href={row.registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-2.5 bg-black/20 border border-secondary/30 text-secondary rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-black transition-all group">
                    Ver Protocolo <LinkIcon size={12} className="group-hover:rotate-45 transition-transform" />
                  </a>
                ) : <span className="font-mono text-[9px] text-gray-700 tracking-tighter">SIN_DATOS</span>
              }
            ]}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default EventosPage;
