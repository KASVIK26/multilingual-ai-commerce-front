import React, { useEffect } from 'react';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Trash2, MessageSquare } from 'lucide-react';
import { setNewChatCallback, setChatDeletedCallback } from '@/hooks/useChat';
import { useChat } from '@/hooks/useChat';

interface ConversationSectionProps {}

const ConversationSection = ({}: ConversationSectionProps) => {
  const { chatHistory, isLoading, clearAllChats, deleteChat, fetchChatHistory } = useChatHistory();
  const { handleCurrentChatDeleted } = useChat();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const currentChatId = searchParams.get('chatId');

  // Set up callbacks for when new chats are created and when chats are deleted
  useEffect(() => {
    setNewChatCallback(() => {
      console.log('New chat created, refreshing history...');
      fetchChatHistory();
    });
    
    setChatDeletedCallback((deletedChatId: string) => {
      console.log('Chat deleted:', deletedChatId);
      // Check if the deleted chat is the currently active chat or if all chats were cleared
      if (currentChatId && (currentChatId === deletedChatId || deletedChatId === '*')) {
        console.log('Current chat was deleted, redirecting to new chat...');
        handleCurrentChatDeleted(); // Clear the chat state
        navigate('/chat'); // Redirect to new chat page
      }
    });
    
    // Cleanup
    return () => {
      setNewChatCallback(null);
      setChatDeletedCallback(null);
    };
  }, [fetchChatHistory, currentChatId, navigate, handleCurrentChatDeleted]);

  const handleChatClick = (chatId: string) => {
    navigate(`/chat?chatId=${chatId}`);
  };

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    try {
      await deleteChat(chatId);
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleClearConversations = async () => {
    if (window.confirm('Are you sure you want to clear all conversations? This action cannot be undone.')) {
      try {
        await clearAllChats();
      } catch (error) {
        console.error('Failed to clear conversations:', error);
      }
    }
  };

  const renderChatItem = (chat: any) => {
    const isActive = currentChatId === chat.id;
    
    return (
      <div 
        key={chat.id}
        onClick={() => handleChatClick(chat.id)}
        className={`h-8 px-2 py-1 rounded-lg flex items-center gap-2 group relative w-full cursor-pointer transition-colors ${
          isActive 
            ? 'bg-blue-200 border border-blue-300' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <div className="flex justify-between items-center w-full min-w-0">
          <div className={`text-sm font-normal font-['Poppins'] truncate flex-1 ${
            isActive ? 'text-blue-800 font-medium' : 'text-black'
          }`}>
            {chat.title}
          </div>
          <button
            onClick={(e) => handleDeleteChat(e, chat.id)}
            className="w-4 h-4 relative overflow-hidden flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  };

  const renderSection = (title: string, chats: any[]) => {
    if (chats.length === 0) return null;

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="text-gray-600 text-xs font-medium font-['Poppins'] px-2 py-1">
          {title}
        </div>
        {chats.map(renderChatItem)}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden w-full">
        <div className="flex justify-between items-center w-full">
          <div className="text-black text-sm font-normal font-['Poppins']">
            Conversations
          </div>
        </div>
        <div className="w-full px-2 py-2 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading conversations...</div>
        </div>
      </div>
    );
  }

  const hasAnyChats = Object.values(chatHistory).some(chats => chats.length > 0);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="text-black text-sm font-normal font-['Poppins'] truncate">
            Conversations
          </div>
          {hasAnyChats && (
            <button
              onClick={handleClearConversations}
              className="px-3 py-1 bg-gradient-to-b from-blue-700 to-sky-700 rounded-[5px] flex items-center overflow-hidden hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <div className="text-stone-50 text-sm font-normal font-['Poppins']">
                Clear
              </div>
            </button>
          )}
        </div>
        
        <div className="w-full px-2 py-2 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col gap-2 overflow-hidden">
          {!hasAnyChats ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="w-8 h-8 text-gray-400 mb-2" />
              <div className="text-gray-500 text-sm font-medium">No conversations yet</div>
              <div className="text-gray-400 text-xs mt-1">Start a chat to see your history here</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderSection('Today', chatHistory.today)}
              {renderSection('Yesterday', chatHistory.yesterday)}
              {renderSection('Last Week', chatHistory.lastWeek)}
              {renderSection('Last Month', chatHistory.lastMonth)}
              {renderSection('Older', chatHistory.older)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationSection;
