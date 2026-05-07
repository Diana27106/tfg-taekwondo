import React from 'react';
import { Menu, Bell, User, Search, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-2xl border-b border-border/30 lg:pl-64 transition-all duration-500">
      <div className="flex h-20 items-center justify-between px-8 sm:px-12">
        
        {/* Left section: HUD Command & Search */}
        <div className="flex items-center gap-8 flex-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-3 text-gray-500 hover:text-primary transition-all duration-300"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        </div>


        {/* Right section: System Actions */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle HUD */}
          <button 
            onClick={toggleDarkMode}
            className="relative p-2.5 text-gray-500 hover:text-foreground transition-all duration-500 group"
            title={isDarkMode ? 'SWITCH: LIGHT' : 'SWITCH: DARK'}
          >
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full transition-all duration-500" />
            {isDarkMode ? <Sun size={20} className="relative z-10" /> : <Moon size={20} className="relative z-10" />}
          </button>
          
          <button className="relative p-2.5 text-gray-500 hover:text-foreground transition-all duration-500 group">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] z-20" />
            <Bell size={20} className="relative z-10" />
          </button>

          <div className="h-8 w-px bg-border/20 hidden sm:block"></div>

          {/* Symmetrical Profile Unit */}
          <Link to="/admin/settings" className="flex items-center gap-4 py-1 px-2 border border-transparent hover:border-border/30 rounded-sm transition-all duration-300 group">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none">Super.Unit</p>
              <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mt-1 opacity-70">Protocol.1</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-10 h-10 rounded-full bg-black/20 border border-border/50 flex items-center justify-center text-foreground group-hover:border-primary/50 transition-colors">
                <User size={18} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
