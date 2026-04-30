import React, { useEffect, useState } from 'react';
import { X, Handshake } from 'lucide-react';

const CortesiaModal = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            setTimeout(() => setShow(true), 10);
        } else if (!isOpen && render) {
            setShow(false);
            const timeout = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, render]);

    if (!render) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${show ? 'backdrop-blur-sm bg-black/50 opacity-100' : 'bg-transparent opacity-0'}`}
            onClick={onClose}
        >
            {/* Contenedor Principal del Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-[90%] max-w-[460px] bg-white overflow-hidden rounded-xl shadow-2xl transition-all duration-300 transform ${show ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
            >
                {/* Arco Dorado (Círculo superpuesto esquina superior izquierda) */}
                <div
                    className="absolute -top-[350px] -left-[140px] w-[650px] h-[650px] rounded-full bg-gradient-to-b from-white via-yellow-100 to-[#ffc954]"
                ></div>

                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 z-50 text-black hover:text-gray-600 transition-colors"
                >
                    <X size={28} strokeWidth={2} />
                </button>

                {/* Icono de Apretón de Manos */}
                <div className="relative z-10 flex h-[280px] items-center justify-center pt-8">
                    <Handshake size={120} strokeWidth={2} className="text-black" />
                </div>

                {/* Contenido de Texto */}
                <div className="relative z-10 px-8 pb-16 pt-8 text-center">
                    <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
                    <h2
                        className="text-[2.5rem] tracking-wide text-black font-semibold leading-tight mb-2"
                        style={{ fontFamily: "'Anta', sans-serif" }}
                    >
                        Cortesía
                    </h2>
                    <p className="text-sm font-bold tracking-[0.3em] text-amber-500 mb-8 uppercase opacity-90">
                        [Ye-Ui]
                    </p>

                    <div className="mx-auto text-[15px] font-serif tracking-wide text-gray-800 px-2 space-y-4 text-justify">
                        <p className="leading-[1.8]">
                            Es el <span className="font-bold text-slate-900 border-b border-amber-300">primer principio</span> del Taekwondo. Es <span className="font-bold text-amber-600">respeto en todo momento</span>. A uno mismo y hacia los demás: saber saludar, escuchar, ser humilde y tratar con máxima educación tanto a instructores y compañeros como a la propia vida.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CortesiaModal;