
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  return (
    <div className="w-[1440px] h-[1024px] relative bg-stone-50 overflow-hidden">
      <Sidebar />
      
      <div className="w-[1042px] left-[378px] top-[20px] absolute">
        <ChatHeader />
      </div>

      <div className="w-[478px] h-[477px] left-[660px] top-[120px] absolute">
        <div className="w-[477px] h-[477px] left-0 top-0 absolute opacity-60 bg-gradient-to-br from-green-500/60 via-violet-700/60 to-amber-300/60 rounded-full blur-[150px] backdrop-blur-[2px]" />
        <div className="w-[478px] left-0 top-[173px] absolute inline-flex flex-col justify-center items-center gap-2.5">
          <div className="w-20 h-20 px-3.5 py-3 bg-gradient-to-b from-violet-700 via-purple-700 to-sky-800/75 rounded-[37px] flex flex-col justify-center items-center gap-2.5">
            <div className="text-center justify-center text-white text-3xl font-bold font-['Poppins']">ML</div>
          </div>
          <div className="justify-center text-black text-3xl font-medium font-['Poppins']">How can I help you today?</div>
        </div>
      </div>

      <ChatInterface />
    </div>
  );
};

export default ChatPage;
