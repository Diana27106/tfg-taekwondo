import React from 'react';
import botImg from '../../assets/img/small/ChatBot.png';

const ChatBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white hover:bg-gray-50 flex items-center gap-2.5 px-3 py-1.5 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.15)] border border-gray-100 transition-transform active:scale-95 group self-end"
    >
      <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden">
        <img src={botImg} alt="AI Icon" className="w-full h-full object-contain" />
      </div>
      <span className="font-bold text-gray-700 text-sm pr-1">Young-Su AI</span>
    </button>
  );
};

export default ChatBtn;