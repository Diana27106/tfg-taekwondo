import React from 'react';
import { Home, Users, FileText, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { name: 'Gestión de Usuarios', icon: Users, path: '/admin/users' },
    { name: 'Reportes PDF', icon: FileText, path: '/admin/reports' },
    { name: 'Configuración IA', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between px-6 mb-8">
            <span className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm">TKD</span>
              Admin Pro
            </span>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                onClick={(e) => e.preventDefault()}
              >
                <item.icon size={20} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                {item.name}
              </a>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Doble Cara Arch</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Versión 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
