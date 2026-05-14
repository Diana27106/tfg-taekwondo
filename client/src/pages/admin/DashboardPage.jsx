import { API_BASE_URL, BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import FeedbackMessages from '../../components/admin/FeedbackMessages';
import RecentActions from '../../components/admin/RecentActions';
import { 
  Users, 
  Activity, 
  Target, 
  ShieldCheck, 
  Download, 
  FileDown, 
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

/**
 * Página del Panel de Control (Dashboard).
 * Muestra estadísticas generales del sistema y los últimos registros de actividad.
 * 
 * @component
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { name: 'Próximos Eventos', value: '...', icon: Target, change: '0', changeType: 'neutral', color: 'bg-purple-500', key: 'events' },
    { name: 'Total Instructores', value: '...', icon: Users, change: '0', changeType: 'neutral', color: 'bg-blue-500', key: 'instructors' },
    { name: 'Sedes Activas', value: '...', icon: Activity, change: '0', changeType: 'neutral', color: 'bg-amber-500', key: 'locations' },
    { name: 'Patrocinadores', value: '...', icon: ShieldCheck, change: '0', changeType: 'neutral', color: 'bg-indigo-500', key: 'sponsors' },
  ]);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/stats/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          
          setStats(prevStats => prevStats.map(stat => ({
            ...stat,
            value: data.stats[stat.key]?.toString() || '0'
          })));
          
          setLogs(data.logs);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const exportLogsPDF = () => {
    const doc = new jsPDF();
    doc.text('Historial de Logs del Sistema - Taekwondo Sierra Nevada', 14, 15);
    
    const tableColumn = ["Usuario", "Acción", "Objetivo", "Hora"];
    const tableRows = [];

    logs.forEach(log => {
      const logData = [
        log.user || 'N/A',
        log.action || 'N/A',
        log.target || 'N/A',
        log.time || 'N/A'
      ];
      tableRows.push(logData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [168, 85, 247] } // Primary color
    });

    doc.save('logs_sistema.pdf');
  };

  const generateReportPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Token ${token}` };

      const [instructorsRes, locationsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/instructors/`, { headers }),
        fetch(`${API_BASE_URL}/locations/`, { headers })
      ]);

      const instructors = await instructorsRes.json();
      const locations = await locationsRes.json();

      const doc = new jsPDF();
      doc.text('Reporte Global - Taekwondo Sierra Nevada', 14, 15);

      // Instructors Table
      doc.setFontSize(12);
      doc.text('Directorio de Instructores', 14, 25);
      const instructorColumns = ["Nombre", "Rango", "Biografía"];
      const instructorRows = (Array.isArray(instructors) ? instructors : instructors.results || []).map(inst => [
        inst.name || 'N/A', 
        inst.rank ? `${inst.rank} DAN` : 'N/A', 
        (inst.bio || 'Sin biografía').substring(0, 50) + "..."
      ]);
      
      autoTable(doc, {
        head: [instructorColumns],
        body: instructorRows,
        startY: 30,
        theme: 'striped',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [168, 85, 247] }
      });

      // Locations Table
      const finalY = doc.lastAutoTable.finalY || 30;
      doc.text('Sedes Activas', 14, finalY + 10);
      const locationColumns = ["Nombre", "Dirección", "Tipo"];
      const locationRows = (Array.isArray(locations) ? locations : locations.results || []).map(loc => [
        loc.name || 'N/A', 
        loc.address || 'N/A', 
        loc.location_type || 'N/A'
      ]);

      autoTable(doc, {
        head: [locationColumns],
        body: locationRows,
        startY: finalY + 15,
        theme: 'striped',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [168, 85, 247] }
      });

      doc.save('reporte_global.pdf');

    } catch (error) {
      console.error('Error al generar el reporte:', error);
      alert('Hubo un error al generar el reporte. Verifica la conexión con el servidor.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-16 animate-fade-in pb-20">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Centro.De.Mando</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
              Panel de <span className="text-gradient">Control</span>
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Monitoreo de sistemas centrales y unidades operativas de <span className="text-primary">Taekwondo Sierra Nevada</span>.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={exportLogsPDF} className="flex items-center gap-3 px-8 py-4 bg-black/20 border border-border/30 rounded-sm text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300 group">
              <Download size={18} className="group-hover:scale-110 transition-transform" />
              <span>Exportar.Log</span>
            </button>
            <button onClick={generateReportPDF} className="flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-sm text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-primary/50">
              <FileDown size={18} />
              <span>Generar.Reporte</span>
            </button>
          </div>
        </div>

        {/* HUD Stats Grid - Strictly Symmetrical */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="tech-card group relative p-8 rounded-sm hover:-translate-y-1">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-border/30 group-hover:border-secondary transition-colors" />

              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-sm bg-black/40 border border-border/50 text-foreground group-hover:border-primary/50 transition-colors shadow-inner`}>
                  <stat.icon className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${
                  stat.changeType === 'positive' ? 'text-secondary' : 
                  stat.changeType === 'negative' ? 'text-destructive' : 
                  'text-gray-500'
                }`}>
                  {stat.changeType === 'positive' ? <ArrowUpRight size={14} className="animate-bounce" /> : stat.changeType === 'negative' ? <ArrowDownRight size={14} /> : null}
                  {stat.change} Unidades
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground font-mono tracking-tighter tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">{stat.name}</p>
              </div>

              {/* HUD Decoration */}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-1 h-1 bg-primary/20 rounded-full" />
                <div className="w-1 h-1 bg-border/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Data Node & Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Symmetrical Data Table Container */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between border-l-4 border-primary pl-6">
              <div>
                <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                  Instructores <span className="text-primary italic">Activos</span>
                </h2>
                <div className="flex items-center gap-3 mt-3">
                  <span className="h-[1px] w-4 bg-gray-700" />
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em]">Protocolo de gestión de unidades estratégicas activo.</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/admin/instructores/crearinstructores')}
                className="h-14 w-14 bg-black/20 border border-primary/30 text-primary rounded-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-primary/30"
              >
                <Plus size={24} className="group-hover:rotate-180 transition-transform duration-700" />
              </button>
            </div>
            
            <ProTable 
              apiUrl="/api/instructors/"
              entityName="Instructor"
              routePath="/admin/instructores"
              searchPlaceholder="ESCANEANDO DIRECTORIO..."
              columns={[
                { 
                  header: 'Entidad / Unidad', 
                  key: 'name',
                  render: (row) => (
                    <div className="flex items-center gap-5">
                      <div className="relative group/avatar">
                        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover/avatar:opacity-100 transition duration-500"></div>
                        {row.photo ? (
                          <img src={`${BASE_URL}${row.photo}`} alt={row.name} className="relative h-12 w-12 rounded-full object-cover border border-border/50 group-hover/avatar:border-primary/50 transition-colors" />
                        ) : (
                          <div className="relative h-12 w-12 rounded-full bg-black/40 text-primary border border-border/50 flex items-center justify-center font-black text-sm uppercase group-hover/avatar:border-primary/50 transition-colors">
                            {row.name ? row.name.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-[12px] font-black text-foreground uppercase tracking-wider">{row.name}</div>
                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest opacity-70">Nodo.Bio: Validado</div>
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
                }
              ]}
            />
          </div>

          {/* Symmetrical Recent Actions Panel */}
          <div className="lg:col-span-1 space-y-10">
            <div className="flex flex-col space-y-2 border-r-4 border-secondary pr-6 text-right">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                Logs del <span className="text-secondary italic">Sistema</span>
              </h2>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em]">Seguimiento del historial operativo.</p>
            </div>
            <RecentActions logs={logs} />
          </div>
        </div>

        {/* Global System Status Section */}
        <div className="pt-20 border-t border-border/20">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none flex items-center gap-4">
              Estado de <span className="text-gradient">Sincronización</span>
              <span className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
            </h2>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-4">Feedback de protocolos de bajo nivel y paridad de sincronización del servidor.</p>
          </div>
          <div className="tech-card rounded-sm p-10 bg-black/20">
            <FeedbackMessages />
          </div>
        </div>
        
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
