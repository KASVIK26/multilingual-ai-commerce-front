
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProductDetailModal from './ProductDetailModal';
import CartCard from './CartCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useCart } from '@/hooks/useCart';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const { messages, isLoading, processUserMessage } = useChat();
  const { cartItems, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart, checkout } = useCart();

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      await processUserMessage(message);
      setMessage('');
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
                  <SuggestedActions onActionClick={(action) => processUserMessage(action)} />
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
      
      {isCartOpen && (
        <CartCard
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={checkout}
        />
      )}
    </div>
  );
};

export default ChatInterface;
