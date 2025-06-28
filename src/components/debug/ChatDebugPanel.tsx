import React from 'react';
import { useChatHistory } from '@/hooks/useChatHistory';

const ChatDebugPanel = () => {
  const { chatHistory, debugChatStatus, clearAllChats } = useChatHistory();

  const handleDebug = async () => {
    console.log('=== CHAT DEBUG INFO ===');
    console.log('Current chat history state:', chatHistory);
    await debugChatStatus();
    console.log('=== END DEBUG INFO ===');
  };

  const handleTestClear = async () => {
    try {
      console.log('=== TESTING CLEAR FUNCTIONALITY ===');
      await debugChatStatus(); // Before
      console.log('Calling clearAllChats...');
      await clearAllChats();
      console.log('Clear completed, waiting 1 second...');
      setTimeout(async () => {
        await debugChatStatus(); // After
        console.log('=== CLEAR TEST COMPLETED ===');
      }, 1000);
    } catch (error) {
      console.error('Clear test failed:', error);
    }
  };

  const totalChats = Object.values(chatHistory).reduce((sum, chats) => sum + chats.length, 0);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50">
      <h3 className="font-bold mb-2">Chat Debug Panel</h3>
      <p className="text-sm mb-2">Total chats visible: {totalChats}</p>
      <div className="flex flex-col gap-2">
        <button 
          onClick={handleDebug}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Debug Chat Status
        </button>
        <button 
          onClick={handleTestClear}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Test Clear Function
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Check browser console for logs</p>
    </div>
  );
};

export default ChatDebugPanel;
