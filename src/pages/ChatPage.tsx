
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  return (
    <div className="h-screen w-screen flex bg-stone-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-shrink-0 p-5">
          <ChatHeader />
        </div>
        
        <div className="flex-1 min-h-0 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
