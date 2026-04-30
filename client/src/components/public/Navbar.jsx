import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio Sesión ???', href: '/login' },
    { name: 'Inicio', href: '/' },
    { name: 'Nuestra Escuela', href: '/about' },
    { name: 'Clases y Sedes', href: '/clases' },
    { name: 'Patrocinadores', href: '/sponsors' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/src/assets/img/logos/logoFBlanco.png"
              alt="Taekwondo Sierra Nevada"
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Menu (Desktop & Large Tablets) */}
          <div className="hidden lg:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:bg-yellow-100 hover:rounded-3xl px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile/Tablet Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {/* Icono Hamburguesa */}
              <div className="space-y-2">
                <span className={`block w-8 h-0.5 bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-black ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;