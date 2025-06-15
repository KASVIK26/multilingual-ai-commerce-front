
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  return (
    <div className="h-screen w-full flex bg-stone-50 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <div className="w-80 flex-shrink-0 p-4">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b">
          <ChatHeader />
        </div>
        
        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
