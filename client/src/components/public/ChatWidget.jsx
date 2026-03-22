import React, { useState } from 'react';
import ChatBtn from './ChatBtn';
import ChatBot from './ChatBot';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Solo se muestra si isOpen es true */}
      {isOpen && <ChatBot onClose={() => setIsOpen(false)} />}
      
      {/* Botón siempre visible */}
      <ChatBtn onClick={toggleChat} />
    </div>
  );
};

export default ChatWidget;