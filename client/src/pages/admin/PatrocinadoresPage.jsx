import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import { Award, Plus, ExternalLink, ShieldCheck, ShieldX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatrocinadoresPage = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-16 animate-fade-in pb-20">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Registro.Alianzas</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Red de <span className="text-gradient">Patrocinios</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Gestionando las asociaciones estratégicas y alianzas industriales de <span className="text-primary italic">Taekwondo Sierra Nevada</span>.
            </p>
          </div>
          
        </div>

        {/* HUD Table Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-l-4 border-secondary pl-6">
            <div>
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Núcleo de <span className="text-secondary italic">Asociados</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em] mt-3">Protocolo de sincronización de activos estratégicos activo.</p>
            </div>
            <div className="p-4 border border-secondary/20 text-secondary/40">
              <Award size={24} />
            </div>
          </div>
          
          <ProTable 
            apiUrl="/api/sponsors/"
            entityName="Patrocinador"
            routePath="/admin/patrocinadores"
            searchPlaceholder="ESCANEANDO ALIANZAS..."
            columns={[
              { 
                header: 'Entidad / Corporativo', 
                key: 'name',
                render: (row) => (
                  <div className="flex items-center gap-6">
                    <div className="relative group/logo">
                      <div className="absolute -inset-1 bg-primary/20 rounded-sm blur-md opacity-0 group-hover/logo:opacity-100 transition duration-500"></div>
                      <div className="relative h-14 w-14 rounded-sm bg-black/40 border border-border/30 flex items-center justify-center p-3 group-hover/logo:border-primary/50 transition-colors">
                        {row.logo ? (
                          <img src={`http://localhost:8000${row.logo}`} alt={row.name} className="w-full h-full object-contain grayscale group-hover/logo:grayscale-0 transition-all duration-500" />
                        ) : (
                          <Award size={20} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="text-[12px] font-black text-foreground uppercase tracking-wider group-hover/row:text-primary transition-colors">{row.name}</div>
                  </div>
                )
              },
              { 
                header: 'Vector.Digital', 
                key: 'website',
                render: (row) => row.website ? (
                  <a href={row.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-2.5 bg-black/20 border border-secondary/30 text-secondary rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-black transition-all group">
                    Visitar Activo <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : <span className="font-mono text-[9px] text-gray-700 tracking-tighter">SIN_DATOS</span>
              },
            ]}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default PatrocinadoresPage;
