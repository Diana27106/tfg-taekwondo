import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import { Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de Gestión de Instructores.
 * Permite visualizar el equipo docente, editar sus perfiles y añadir nuevos miembros.
 * 
 * @component
 */
const InstructoresPage = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-16 animate-fade-in pb-20">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Directorio.Unidades</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Equipo de <span className="text-gradient">Instructores</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Gestionando las unidades de entrenamiento especializadas y rangos profesionales de <span className="text-primary italic">Taekwondo Sierra Nevada</span>.
            </p>
          </div>
          
        </div>

        {/* HUD Table Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-l-4 border-secondary pl-6">
            <div>
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Personal <span className="text-secondary italic">Activo</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mt-3">Protocolo de sincronización de directorio de personal activo.</p>
            </div>
            <div className="p-4 border border-secondary/20 text-secondary/40">
              <Users size={24} />
            </div>
          </div>
          
          <ProTable 
            apiUrl="/api/instructors/"
            entityName="Instructor"
            routePath="/admin/instructores"
            searchPlaceholder="ESCANEANDO PERSONAL..."
            filterConfigs={[
              { label: 'Rango', field: 'rank' }
            ]}
            columns={[
              { 
                header: 'Entidad / Unidad', 
                key: 'name',
                render: (row) => (
                  <div className="flex items-center gap-6">
                    <div className="relative group/avatar">
                      <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover/avatar:opacity-100 transition duration-500"></div>
                      {row.photo ? (
                        <img src={`http://localhost:8000${row.photo}`} alt={row.name} className="relative h-12 w-12 rounded-full object-cover border border-border/30 group-hover/avatar:border-primary/50 transition-colors" />
                      ) : (
                        <div className="relative h-12 w-12 rounded-full bg-black/40 text-primary border border-border/30 flex items-center justify-center font-black text-sm uppercase group-hover/avatar:border-primary/50 transition-colors">
                          {row.name ? row.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[12px] font-black text-foreground uppercase tracking-wider">{row.name}</div>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Rango.Dan', 
                key: 'rank',
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-primary/30" />
                    <span className="font-mono text-primary font-black tracking-tighter">
                      {row.rank} DAN
                    </span>
                  </div>
                )
              },
            ]}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default InstructoresPage;
