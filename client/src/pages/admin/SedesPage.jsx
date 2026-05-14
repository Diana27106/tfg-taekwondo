import { BASE_URL } from '../../config';
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import { MapPin, Plus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de Gestión de Sedes (Locations).
 * Administra los lugares físicos donde se imparten las clases.
 * 
 * @component
 */
const SedesPage = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-16 animate-fade-in pb-20">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Sincronización.Geoespacial</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Gestión de <span className="text-gradient">Sedes</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Gestionando las instalaciones de entrenamiento y centros operativos de <span className="text-primary italic">Taekwondo Sierra Nevada</span>.
            </p>
          </div>
          
        </div>

        {/* HUD Table Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-l-4 border-secondary pl-6">
            <div>
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Centros de <span className="text-secondary italic">Entrenamiento</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mt-3">Protocolo de seguimiento de instalaciones de alta precisión activo.</p>
            </div>
            <div className="p-4 border border-secondary/20 text-secondary/40">
              <MapPin size={24} />
            </div>
          </div>
          
          <ProTable 
            apiUrl="/api/locations/"
            entityName="Sede"
            routePath="/admin/sedes"
            searchPlaceholder="ESCANEANDO GEODATOS..."
            filterConfigs={[
              { label: 'Ciudad', field: 'city' }
            ]}
            columns={[
              { 
                header: 'Instalación / Unidad', 
                key: 'name',
                render: (row) => (
                  <div className="flex items-center gap-6">
                    <div className="relative group/img overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity z-10" />
                      {row.photo ? (
                        <img src={`${BASE_URL}${row.photo}`} alt={row.name} className="relative h-14 w-20 rounded-sm object-cover border border-border/30 group-hover/img:border-primary/50 transition-colors" />
                      ) : (
                        <div className="relative h-14 w-20 rounded-sm bg-black/40 text-primary border border-border/30 flex items-center justify-center group-hover/img:border-primary/50 transition-colors">
                          <MapPin size={20} className="opacity-40" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[12px] font-black text-foreground uppercase tracking-wider">{row.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-secondary rounded-full" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{row.city}</span>
                      </div>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Vector.Dirección', 
                key: 'address', 
                render: (row) => (
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider leading-relaxed">
                    {row.address}
                  </span>
                )
              },
              { 
                header: 'Enlace.Externo', 
                key: 'google_maps_url',
                render: (row) => row.google_maps_url ? (
                  <a href={row.google_maps_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-2.5 bg-black/20 border border-secondary/30 text-secondary rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-black transition-all group">
                    Ver Mapas <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

export default SedesPage;
