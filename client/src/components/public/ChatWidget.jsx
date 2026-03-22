import React, { useState } from 'react';
import ChatBtn from './ChatBtn';
import ChatBot from './ChatBot';

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
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta }),
      });
      const data = await response.json();
      const botMessage = {
        role: 'bot',
        content: data.respuesta || data.error || 'Sin respuesta del servidor.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Error de conexión con el servidor.' },
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