import React from 'react';
import { X, Send } from 'lucide-react';
import botImg from '../../assets/img/small/ChatBot.png';

/**
 * Componente de interfaz del Chatbot.
 * Gestiona la visualización de mensajes y la entrada de texto del usuario.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.onClose - Función para cerrar la ventana del chat.
 * @param {Array} props.messages - Lista de mensajes a mostrar.
 * @param {function} props.onSend - Función para enviar un nuevo mensaje.
 * @param {boolean} props.isLoading - Estado de carga mientras el bot responde.
 */
const ChatBot = ({ onClose, messages, onSend, isLoading }) => {
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="w-[380px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all animate-in fade-in slide-in-from-bottom-5">
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden shadow-sm">
            <img src={botImg} alt="Young-Su AI Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-gray-800 text-base tracking-tight">Young-Su AI</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
          <X size={22} />
        </button>
      </div>

      {/* Mensajes */}
      <div 
        ref={chatContainerRef}
        className="p-4 h-52 overflow-y-auto flex flex-col gap-3 scroll-smooth"
      >
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">¡Hola! Soy Young-Su AI. ¿Cómo puedo ayudarte?</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 animate-pulse">Pensando...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 pt-0 px-6 pb-6">
        <div className="relative border border-gray-300 rounded-lg p-3 h-20">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta..."
            className="w-full h-full text-sm text-gray-600 focus:outline-none resize-none placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute bottom-3 right-3 text-gray-400 hover:text-yellow-500 transition disabled:opacity-40"
          >
            <Send size={20} className="transform -rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;