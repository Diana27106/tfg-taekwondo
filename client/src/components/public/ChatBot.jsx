import React from 'react';
import { X, Send } from 'lucide-react';

const ChatBot = ({ onClose }) => {
  // Ruta de la imagen proporcionada
  const botImg = "/home/dianaradu/Escritorio/tfg-taekwondo/client/src/assets/img/small/ChatBot.png";

  return (
    <div className="w-[380px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all animate-in fade-in slide-in-from-bottom-5">
      
      {/* Header del Chat */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden shadow-sm">
            <img 
              src={botImg} 
              alt="Young-Su AI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-gray-800 text-base tracking-tight">Young-Su AI</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-black transition-colors"
        >
          <X size={22} />
        </button>
      </div>

      {/* Cuerpo del Mensaje */}
      <div className="p-8 h-40 flex flex-col justify-start">
        <p className="text-gray-700 text-[15px] leading-relaxed">
          ¡Hola! Soy Young-Su AI. ¿Cómo puedo ayudarte?
        </p>
      </div>

      {/* Input de Texto */}
      <div className="p-4 px-6 pb-6">
        <div className="relative border border-gray-300 rounded-lg p-3 h-32">
          <textarea
            placeholder="Escribe tu pregunta"
            className="w-full h-full text-sm text-gray-600 focus:outline-none resize-none placeholder:text-gray-400"
          ></textarea>
          <button className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-700 transition">
            <Send size={20} className="transform -rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;