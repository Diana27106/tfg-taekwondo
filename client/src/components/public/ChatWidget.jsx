import React, { useState } from 'react';
import ChatBtn from './ChatBtn';
import ChatBot from './ChatBot';

/**
 * Widget de Chat Flotante.
 * Gestiona el estado de apertura y la comunicación con el componente ChatBot.
 * 
 * @component
 */
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (pregunta) => {
    const userMessage = { role: 'user', content: pregunta };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5678/webhook/chatbot-rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: pregunta }),
      });
      
      // n8n workflow 'Respond to Webhook' is configured for 'text' response
      const data = await response.text();
      
      const botMessage = {
        role: 'bot',
        content: data || 'Sin respuesta del servidor de IA.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Error de conexión con el servidor de IA.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <ChatBot
          onClose={() => setIsOpen(false)}
          messages={messages}
          onSend={handleSend}
          isLoading={isLoading}
        />
      )}
      <ChatBtn onClick={toggleChat} />
    </div>
  );
};

export default ChatWidget;