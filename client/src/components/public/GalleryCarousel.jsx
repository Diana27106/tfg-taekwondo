import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';

// === CONFIGURACIÓN POR DEFECTO ===
// Mantenemos tu importación para Vite como fallback
const IMAGES_MODULES = import.meta.glob('../../../src/assets/carrusel/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, as: 'url' });
const DEFAULT_IMAGES = Object.values(IMAGES_MODULES);

const GalleryCarousel = ({ initialImages = DEFAULT_IMAGES }) => {
  const [images, setImages] = useState(initialImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  // Estados para el swipe en móviles
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Funciones de navegación memorizadas
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsMaximized(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Lógica de gestos (Swipe)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (images.length === 0) {
    return (
      <div className="w-full text-center p-20 bg-gray-50 border-y border-gray-100">
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Cargando Galería...</p>
      </div>
    );
  }

  const getVisibleImages = () => {
    const prev = (activeIndex - 1 + images.length) % images.length;
    const current = activeIndex;
    const next = (activeIndex + 1) % images.length;
    return [
      { index: prev, src: images[prev], position: 'left' },
      { index: current, src: images[current], position: 'center' },
      { index: next, src: images[next], position: 'right' },
    ];
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] overflow-hidden relative flex flex-col mt-10">
      {/* Background Kinetic Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[30vw] font-black italic tracking-tighter leading-none inline-block animate-marquee" aria-hidden="true">
          SIERRA NEVADA SIERRA NEVADA SIERRA NEVADA
        </span>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col py-8 md:py-12">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 md:mb-10 gap-6 shrink-0">
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-yellow-500"></span>
              <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px]">Martial Arts Gallery</span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.75]" style={{ fontFamily: "'Anta', sans-serif" }}>
              TKD <br /> <span className="text-yellow-500">LIFE</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black text-white italic">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/20 font-bold text-lg md:text-xl uppercase tracking-widest">/ {String(images.length).padStart(2, '0')}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Imagen anterior"
                className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente imagen"
                className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 flex items-center justify-center text-black hover:bg-white transition-all duration-500 cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Focused Stage Slider */}
        <div
          className="relative flex-1 w-full flex items-center justify-center touch-pan-y min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {getVisibleImages().map((item) => {
            let style = {};
            if (item.position === 'center') {
              style = { transform: 'translateX(0) scale(1)', zIndex: 30, opacity: 1, filter: 'blur(0)' };
            } else if (item.position === 'left') {
              style = { transform: 'translateX(-60%) scale(0.8)', zIndex: 10, opacity: 0.15, filter: 'blur(4px)' };
            } else {
              style = { transform: 'translateX(60%) scale(0.8)', zIndex: 10, opacity: 0.15, filter: 'blur(4px)' };
            }

            return (
              <div
                key={`${item.src}-${item.position}`}
                className="absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] w-[90vw] md:w-[75%] lg:w-[85%] h-full group"
                style={style}
              >
                <div className="w-full h-full overflow-hidden relative rounded-sm">
                  <img
                    src={item.src}
                    alt={`Momento ${item.index + 1} de la galería`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading={item.position === 'center' ? "eager" : "lazy"}
                  />

                  {item.position === 'center' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Sierra Nevada Archive</p>
                          <h3 className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-tighter">Impacto & Disciplina</h3>
                        </div>
                        <div 
                          onClick={() => setIsMaximized(true)}
                          className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 rounded-sm pointer-events-auto cursor-pointer hover:bg-white/20 transition-colors"
                        >
                          <Maximize2 size={18} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Border deco on center only */}
                  {item.position === 'center' && (
                    <>
                      <div className="absolute top-6 right-6 w-12 h-12 border-t-[1px] border-r-[1px] border-yellow-500/50 pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-[1px] border-l-[1px] border-yellow-500/50 pointer-events-none"></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar & Dots */}
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 shrink-0">
          <div className="flex-1 h-[1px] bg-white/10 relative w-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-1000 shadow-[0_0_10px_#eab308]"
              style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex gap-2 overflow-x-auto max-w-full pb-2 scrollbar-hide items-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ir a la imagen ${idx + 1}`}
                aria-current={idx === activeIndex}
                className={`h-1.5 transition-all duration-500 flex-none cursor-pointer rounded-full ${idx === activeIndex ? 'w-8 bg-yellow-500' : 'w-2 bg-white/20 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {isMaximized && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setIsMaximized(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-[110]"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={images[activeIndex]} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <p className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-2">Sierra Nevada Archive</p>
              <h3 className="text-white text-4xl font-black uppercase italic tracking-tighter">Impacto & Disciplina</h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
};

export default GalleryCarousel;