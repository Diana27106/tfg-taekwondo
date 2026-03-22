import React from 'react';
import { Menu, Bell, User, Search, Moon, Sun } from 'lucide-react';

const Navbar = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:pl-64 transition-colors duration-200">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden sm:flex max-w-md w-full ml-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Buscar globalmente..."
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-0 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 rounded-full transition-colors">
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <Bell size={20} />
          </button>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

          <button className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-1.5 rounded-full lg:rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">Super Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">admin@taekwondo.com</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
