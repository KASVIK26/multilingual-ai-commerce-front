
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProductDetailModal from './ProductDetailModal';
import CartCard from './CartCard';
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
    <div className="w-[1042px] left-[378px] top-[120px] absolute flex flex-col h-[calc(100vh-140px)]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Center ML Icon and Greeting */}
            <div className="w-[478px] h-[477px] relative mb-8">
              <div className="w-[477px] h-[477px] left-0 top-0 absolute opacity-60 bg-gradient-to-br from-green-500/60 via-violet-700/60 to-amber-300/60 rounded-full blur-[150px] backdrop-blur-[2px]" />
              <div className="w-[478px] left-0 top-[173px] absolute inline-flex flex-col justify-center items-center gap-2.5">
                <div className="w-20 h-20 px-3.5 py-3 bg-gradient-to-b from-violet-700 via-purple-700 to-sky-800/75 rounded-[37px] flex flex-col justify-center items-center gap-2.5">
                  <div className="text-center justify-center text-white text-3xl font-bold font-['Poppins']">ML</div>
                </div>
                <div className="justify-center text-black text-3xl font-medium font-['Poppins']">How can I help you today?</div>
              </div>
            </div>
            
            {/* Suggested Actions */}
            <SuggestedActions onActionClick={(action) => processUserMessage(action)} />
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
            />
          ))
        )}
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

      {/* Fixed Input Area */}
      <div className="border-t bg-white p-4">
        <ChatInput 
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
        <div className="text-center justify-center text-neutral-500 text-xs font-light font-['Poppins'] mt-4">
          Powered by Multilingual AI
        </div>
      </div>

      {/* Modals and Cards */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />
      
      <CartCard
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  );
};

export default ChatInterface;
