import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

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
        <main className="flex-1 lg:pl-64 transition-all duration-500 ease-in-out">
          <div className="max-w-[1600px] mx-auto p-6 sm:p-10 lg:p-12 animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Panoramic HUD Border (Bottom) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[2000px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default AdminLayout;
