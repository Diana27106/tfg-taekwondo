import React from 'react';
import { Instagram, Facebook, Music2 } from 'lucide-react'; // Music2 se usa para TikTok habitualmente

/**
 * Componente de pie de página (Footer).
 * Contiene información de contacto, enlaces legales y enlaces rápidos a secciones del sitio.
 * 
 * @component
 */
const Footer = () => {
  const hoverStyles = "hover:underline hover:text-[#FFF0D4] transition-colors duration-200";

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1: Redes Sociales */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#D4AF37] text-xl font-bold mb-2 uppercase tracking-wide">
            Síguenos en redes
          </h3>
          <div className="flex flex-col gap-3">
            <a href="https://www.instagram.com/tkdsierranevada/?hl=es" className={`flex items-center gap-3 ${hoverStyles} target="_blank"`}>
              <Instagram size={24} />
              <span className="font-semibold">tkdsierranevada</span>
            </a>
            <a href="https://www.facebook.com/tkdsierranevada/?locale=es_ES" className={`flex items-center gap-3 ${hoverStyles} target="_blank"`}>
              <Facebook size={24} />
              <span className="font-semibold">tkdsierranevada</span>
            </a>
            <a href="https://www.tiktok.com/@tkdsierranevada" className={`flex items-center gap-3 ${hoverStyles} target="_blank"`}>
              <Music2 size={24} />
              <span className="font-semibold">tkdsierranevada</span>
            </a>
          </div>
        </div>

        {/* Columna 2: Información Legal */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#D4AF37] text-xl font-bold mb-2 uppercase tracking-wide">
            Información Legal
          </h3>
          <nav className="flex flex-col gap-3">
            <a href="/terms" className={`font-semibold ${hoverStyles}`}>Términos y Condiciones</a>
            <a href="/politicas" className={`font-semibold ${hoverStyles}`}>Política de Privacidad</a>
            <a href="/legacy" className={`font-semibold ${hoverStyles}`}>Aviso Legal</a>
            <a href="/cookies" className={`font-semibold ${hoverStyles}`}>Políticas de Cookies</a>
          </nav>
        </div>

        {/* Columna 3: Información de Contacto */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#D4AF37] text-xl font-bold mb-2 uppercase tracking-wide">
            Información de contacto
          </h3>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              Email: <a href="mailto:taekwondoitfsierranevada@gmail.com" className={hoverStyles}>taekwondoitfsierranevada@gmail.com</a>
            </p>
            <p className="font-semibold">
              Tlf: <a href="tel:+34642243024" className={hoverStyles}>+34 642 24 30 24</a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 text-center border-t border-gray-800 pt-8">
        <p className="text-sm text-gray-400">
          © 2026 TKD Sierra Nevada. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;