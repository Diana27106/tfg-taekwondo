import React, { useEffect, useState } from 'react';
import { X, Mountain } from 'lucide-react';

const PerseveranciaModal = ({ isOpen, onClose }) => {
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
                {/* Arco Azul (Según la imagen de Perseverancia) */}
                <div
                    className="absolute -top-[350px] -left-[140px] w-[650px] h-[650px] rounded-full bg-gradient-to-b from-blue-50 via-blue-300 to-blue-500"
                ></div>

                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 z-50 text-black hover:text-gray-600 transition-colors"
                >
                    <X size={28} strokeWidth={2} />
                </button>

                {/* Icono Representativo (Montaña/Esfuerzo) */}
                <div className="relative z-10 flex h-[280px] items-center justify-center pt-8">
                    <Mountain size={120} strokeWidth={1.5} className="text-gray-900" />
                </div>

                {/* Contenido de Texto */}
                <div className="relative z-10 px-8 pb-16 pt-8 text-center">
                    <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
                    <h2
                        className="text-[2.3rem] tracking-wide text-black font-semibold leading-tight mb-2"
                        style={{ fontFamily: "'Anta', sans-serif" }}
                    >
                        Perseverancia
                    </h2>
                    <p className="text-sm font-bold tracking-[0.3em] text-blue-600 mb-8 uppercase opacity-90">
                        [In-Nae]
                    </p>

                    <div className="mx-auto text-[15px] font-serif tracking-wide text-gray-800 px-2 space-y-4 text-justify">
                        <p className="leading-[1.8]">
                            Es la enorme <span className="font-bold text-blue-600">constancia para seguir adelante</span> ante cualquier reto o frustración. Nos enseña que los logros se alcanzan progresivamente con esfuerzo sostenido.
                        </p>
                        <p className="leading-[1.8] pt-2">
                            Tanto en el tatami como en la vida exterior, <span className="font-bold text-slate-900 border-b border-blue-400">no rendirse nunca</span> y asimilar los retrocesos es la clave fundamental para crecer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerseveranciaModal;