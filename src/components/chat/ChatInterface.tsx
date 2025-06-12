
import { useState } from 'react';
import { User, ShoppingCart } from 'lucide-react';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ProductDetailModal from './ProductDetailModal';
import CartCard from './CartCard';
import ProfileCard from './ProfileCard';
import NotificationCard from './NotificationCard';
import { useChat } from '@/hooks/useChat';
import { useCart } from '@/hooks/useCart';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const { messages, isLoading, processUserMessage } = useChat();
  const { cartItems, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart, checkout } = useCart();

  // Mock user data
  const user = {
    name: 'Vikas',
    email: 'kasvik333@gmail.com',
    avatar: ''
  };

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'order' as const,
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and will arrive tomorrow.',
      timestamp: new Date(),
      read: false
    }
  ]);

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

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="w-[1042px] left-[378px] top-[120px] absolute flex flex-col h-[calc(100vh-140px)]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-[478px] h-[477px] relative mb-8">
              <div className="w-[477px] h-[477px] absolute opacity-60 bg-gradient-to-br from-green-500/60 via-violet-700/60 to-amber-300/60 rounded-full blur-[150px] backdrop-blur-[2px]" />
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2.5">
                <div className="w-20 h-20 px-3.5 py-3 bg-gradient-to-b from-violet-700 via-purple-700 to-sky-800/75 rounded-[37px] flex flex-col justify-center items-center gap-2.5">
                  <div className="text-center justify-center text-white text-3xl font-bold font-['Poppins']">ML</div>
                </div>
                <div className="justify-center text-black text-3xl font-medium font-['Poppins']">How can I help you today?</div>
              </div>
            </div>
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

      {/* Cart Icon */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed top-20 right-20 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40"
      >
        <ShoppingCart size={20} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

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
      
      <ProfileCard
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
      
      <NotificationCard
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearNotifications}
      />
    </div>
  );
};

export default ChatInterface;
