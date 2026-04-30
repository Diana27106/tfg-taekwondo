import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Bot, Send } from 'lucide-react';

const ChatbotPage = () => {
  return (
    <AdminLayout>
      <div className="h-[calc(100vh-160px)] flex flex-col space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Chatbot <span className="text-purple-600 dark:text-purple-400">AI</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Asistente inteligente para la gestión de la escuela.</p>
        </div>

        <div className="flex-1 bg-white dark:bg-[#161426] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Doble Cara AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">En línea</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-white/5">
                <p className="text-sm text-gray-700 dark:text-gray-300">Hola, soy el asistente IA de Taekwondo Sierra Nevada. ¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-white/5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Escribe tu mensaje aquí..."
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-105 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChatbotPage;
