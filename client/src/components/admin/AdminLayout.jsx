import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Newspaper, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * Layout principal para el área de administración.
 * Proporciona el Sidebar, Navbar y la estructura básica para las páginas de gestión.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido de la página a renderizar.
 */
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class on mount and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Session check (1 hour)
  useEffect(() => {
    const checkSession = () => {
      const loginTimestamp = localStorage.getItem('login_timestamp');
      if (loginTimestamp) {
        const now = Date.now();
        const duration = 3600000; // 1 hour in ms
        if (now - parseInt(loginTimestamp) > duration) {
          console.warn("Sesión expirada. Cerrando sesión automáticamente...");
          localStorage.clear();
          window.location.href = '/login?expired=true';
        }
      }
    };

    // Check on mount
    checkSession();

    // Set interval to check every 30 seconds
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`min-h-screen bg-background text-foreground transition-all duration-700 font-sans selection:bg-primary/30 ${isDarkMode ? 'dark' : ''}`}>
      {/* Background HUD Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute inset-0 cyber-grid" />
        <div className="scan-line absolute" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[2000px] h-full border-x border-border/20" />
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        
        {/* Main Content Area - Strictly Symmetrical */}
        <main className="flex-1 lg:pl-64 transition-all duration-500 ease-in-out pb-24 md:pb-0">
          <div className="max-w-[1600px] mx-auto p-4 sm:p-8 lg:p-12 animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* BARRA DE NAVEGACIÓN INFERIOR (Solo para móviles/tablets) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-50 flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-700">
        <BottomNavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dash" />
        <BottomNavItem to="/admin/instructores" icon={<Users size={20} />} label="Instr" />
        <BottomNavItem to="/admin/eventos" icon={<Calendar size={20} />} label="Event" />
        <BottomNavItem to="/admin/noticias" icon={<Newspaper size={20} />} label="News" />
        <button 
          onClick={toggleSidebar}
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary transition-colors"
        >
          <div className="p-2 rounded-xl hover:bg-primary/10">
            <Menu size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">More</span>
        </button>
      </div>

      {/* Panoramic HUD Border (Bottom) */}
      <div className="hidden lg:block fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[2000px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-20 pointer-events-none" />
    </div>
  );
};

// Componente auxiliar para los items de la barra inferior
const BottomNavItem = ({ to, icon, label }) => {
  const isSelected = window.location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isSelected ? 'text-primary scale-110' : 'text-gray-500'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'hover:bg-white/5'}`}>
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
};

export default AdminLayout;
