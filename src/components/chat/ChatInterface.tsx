
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProductDetailModal from './ProductDetailModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
  rating?: string;
  review_count?: string;
}

interface ChatInterfaceProps {
  addToCart: (product: Product, size?: string, color?: string) => Promise<void>;
}

const ChatInterface = ({ addToCart }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const [searchParams] = useSearchParams();
  const loadingChatIdRef = useRef<string | null>(null);
  
  const { messages, isLoading, processUserMessage, loadChatHistory, currentChatId, startNewChat, handleCurrentChatDeleted } = useChat();

  // Load chat history when chatId parameter is present, or start new chat when no chatId
  useEffect(() => {
    const chatId = searchParams.get('chatId');
    
    console.log('🔄 ChatInterface useEffect:', { 
      chatId, 
      currentChatId, 
      isCreatingNewChat, 
      isInitialLoad, 
      messagesLength: messages.length 
    });
    
    // Skip loading if we're creating a new chat
    if (isCreatingNewChat) {
      console.log('⏸️ Skipping useEffect - creating new chat');
      return;
    }
    
    // Skip loading if this is the initial load and we're setting up the component
    if (isInitialLoad) {
      console.log('🚀 Initial load');
      setIsInitialLoad(false);
      
      if (chatId && chatId !== currentChatId) {
        console.log('📂 Loading existing chat on initial load:', chatId);
        // Load existing chat only on initial load
        loadChatHistory(chatId);
      } else if (!chatId && currentChatId) {
        console.log('🆕 Starting new chat (URL has no chatId but currentChatId exists)');
        // If there's no chatId in URL but we have a current chat, start a new one
        startNewChat();
      }
      return;
    }
    
    // For subsequent URL changes, only load if it's a different chat
    if (chatId && chatId !== currentChatId) {
      console.log('🔄 Chat ID changed:', { from: currentChatId, to: chatId });
      
      // Prevent loading the same chat if it's already being loaded
      if (loadingChatIdRef.current === chatId) {
        console.log('⏸️ Already loading this chat:', chatId);
        return;
      }
      
      // Don't load chat history if we just created this chat (it should already be in state)
      if (isCreatingNewChat) {
        console.log('⏸️ Skipping load - creating new chat:', chatId);
        return;
      }
      
      console.log('📂 Loading chat history for:', chatId);
      loadingChatIdRef.current = chatId;
      // Load different chat (always load when switching between chats)
      loadChatHistory(chatId).finally(() => {
        loadingChatIdRef.current = null;
      });
    } else if (!chatId && currentChatId && messages.length > 0) {
      console.log('🆕 Starting new chat (no URL chatId but have currentChatId)');
      // If URL changes to no chatId but we have an active chat with messages, start new
      startNewChat();
    }
    // If no chatId in URL and no current chat = ready for new chat (do nothing)
  }, [searchParams, currentChatId, loadChatHistory, startNewChat, isInitialLoad, isCreatingNewChat]);

  // Reset the creating new chat flag when a chatId appears in URL and currentChatId is updated
  useEffect(() => {
    const chatId = searchParams.get('chatId');
    // Only reset when we have both the URL chatId and the currentChatId is updated to match
    if (chatId && isCreatingNewChat && chatId === currentChatId) {
      console.log('✅ New chat creation complete, resetting flag:', chatId);
      // Small delay to ensure all state updates are complete
      const timer = setTimeout(() => {
        setIsCreatingNewChat(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, isCreatingNewChat, currentChatId]);

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      // If we're sending a message without a currentChatId, we're creating a new chat
      if (!currentChatId) {
        setIsCreatingNewChat(true);
      }
      
      try {
        await processUserMessage(message);
        setMessage('');
      } catch (error) {
        // Reset the flag only on error, success case is handled by useEffect
        setIsCreatingNewChat(false);
        throw error;
      }
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full [&>div>div[style]]:!block">
          <div className="flex flex-col items-center justify-center min-h-full p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                {/* Center ML Icon and Greeting */}
                <div className="w-72 h-72 relative mb-8 flex-shrink-0">
                  <div className="w-full h-full absolute opacity-60 bg-gradient-to-br from-green-500/60 via-violet-700/60 to-amber-300/60 rounded-full blur-[100px]" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-b from-violet-700 via-purple-700 to-sky-800/75 rounded-3xl flex items-center justify-center">
                      <div className="text-white text-2xl font-bold font-['Poppins']">ML</div>
                    </div>
                    <div className="text-black text-2xl font-medium font-['Poppins'] text-center">How can I help you today?</div>
                  </div>
                </div>
                
                {/* Suggested Actions */}
                <div className="w-full">
                  <SuggestedActions onActionClick={async (action) => {
                    // If we're sending a message without a currentChatId, we're creating a new chat
                    if (!currentChatId) {
                      setIsCreatingNewChat(true);
                    }
                    
                    try {
                      await processUserMessage(action);
                    } catch (error) {
                      // Reset the flag only on error, success case is handled by useEffect
                      setIsCreatingNewChat(false);
                      throw error;
                    }
                  }} />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl space-y-4 py-4">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onAddToCart={addToCart}
                    onProductClick={handleProductClick}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input Area */}
      <div className="border-t bg-white p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <ChatInput 
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
          <div className="text-center text-neutral-500 text-xs font-light font-['Poppins'] mt-4">
            Powered by Multilingual AI
          </div>
        </div>
      </div>

      {/* Modals and Cards */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default ChatInterface;
