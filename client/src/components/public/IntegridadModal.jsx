import React, { useEffect, useState } from 'react';
import { X, Scale } from 'lucide-react';

const IntegridadModal = ({ isOpen, onClose }) => {
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
                {/* Arco Verde (Basado en image_0.png) */}
                <div
                    className="absolute -top-[350px] -left-[140px] w-[650px] h-[650px] rounded-full bg-gradient-to-b from-emerald-50 via-green-100 to-green-600"
                ></div>

                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 z-50 text-black hover:text-gray-600 transition-colors"
                >
                    <X size={28} strokeWidth={2} />
                </button>

                {/* Icono de Balanza (de image_0.png, usando lucide) */}
                <div className="relative z-10 flex h-[180px] md:h-[280px] items-center justify-center pt-6 md:pt-8">
                    <Scale size={100} strokeWidth={2} className="text-gray-900 transition-all md:scale-125" />
                </div>

                {/* Contenido de Texto (Texto exacto de image_0.png) */}
                <div className="relative z-10 px-6 md:px-8 pb-10 md:pb-16 pt-4 md:pt-8 text-center">
                    <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
                    <h2
                        className="text-3xl md:text-5xl tracking-wide text-black font-semibold leading-tight mb-2"
                        style={{ fontFamily: "'Anta', sans-serif" }}
                    >
                        Integridad
                    </h2>
                    <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-green-600 mb-6 md:mb-8 uppercase opacity-90">
                        [Yom-Chi]
                    </p>

                    <div className="mx-auto text-[15px] font-serif tracking-wide text-gray-800 px-2 space-y-4 text-justify">
                        <p className="leading-[1.8]">
                            Es la capacidad de distinguir entre lo <span className="font-bold text-green-700">correcto y lo incorrecto</span>, y actuar siempre con honestidad. Implica ser genuino, saber reconocer los propios errores y no engañarse a uno mismo ni al prójimo.
                        </p>
                        <p className="leading-[1.8] pt-2">
                            Un verdadero practicante vive con <span className="font-bold text-slate-900 border-b border-green-400">valores firmes y coherentes</span> en todo su camino.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegridadModal;