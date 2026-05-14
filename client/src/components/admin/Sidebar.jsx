import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  X, 
  MapPin, 
  Calendar, 
  Award, 
  Newspaper, 
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de barra lateral (Sidebar) para la administración.
 * Contiene los enlaces de navegación a las differentes entidades del sistema.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Estado de apertura del sidebar en móviles.
 * @param {function} props.toggleSidebar - Función para abrir/cerrar el sidebar.
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const username = localStorage.getItem('username') || 'Usuario';
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Instructores', icon: Users, path: '/admin/instructores' },
    { name: 'Sedes', icon: MapPin, path: '/admin/sedes' },
    { name: 'Eventos', icon: Calendar, path: '/admin/eventos' },
    { name: 'Noticias', icon: Newspaper, path: '/admin/noticias' },
    { name: 'Patrocinadores', icon: Award, path: '/admin/patrocinadores' },
    { name: 'Configuración', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - HUD Estilo Sinuoso */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64
        bg-black/40 backdrop-blur-2xl
        border-r border-border/30
        transition-all duration-500 ease-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col pt-12 pb-8">
          
          {/* Sección HUD de Marca/Usuario */}
          <div className="px-6 mb-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {/* Anillo Holográfico */}
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
                <div className="absolute -inset-1 border border-primary/30 rounded-full animate-spin-slow rotate-45" />
                <div className="absolute -inset-2 border border-secondary/20 rounded-full animate-spin-slow-reverse" />
                
                <div className="relative w-16 h-16 rounded-full bg-black/40 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <span className="font-black text-2xl tracking-tighter">{username.charAt(0).toUpperCase()}</span>
                </div>
                
                {/* Indicador de Estado */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-4 border-black shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xs font-black tracking-[0.3em] text-white uppercase opacity-90">{username}</h2>
                <div className="flex items-center gap-2 justify-center">
                  <span className="h-[1px] w-4 bg-primary/50" />
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">Unidad S.Nevada</span>
                  <span className="h-[1px] w-4 bg-primary/50" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-8" />

          {/* Elementos HUD de Navegación */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={window.innerWidth < 1024 ? toggleSidebar : undefined}
                  className={`
                    flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-sm transition-all duration-300 group relative
                    ${isActive 
                      ? 'text-primary bg-primary/5' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {/* Laser Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_15px_rgba(168,85,247,0.8)] z-20" />
                  )}
                  
                  <item.icon size={16} className={`
                    transition-all duration-300
                    ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'opacity-40 group-hover:opacity-100'}
                  `} />
                  
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Symmetrical Tech Decoration */}
                  <div className={`absolute right-4 w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'bg-primary shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'bg-transparent group-hover:bg-gray-700'}`} />
                </Link>
              );
            })}
          </nav>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
