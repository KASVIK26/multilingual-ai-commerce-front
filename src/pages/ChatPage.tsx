
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInterface from '@/components/chat/ChatInterface';
import CartCard from '@/components/chat/CartCard';
import { useCart } from '@/hooks/useCart';

const ChatPage = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    checkout,
    addToCart,
    isLoading: cartLoading,
    getCartTotal,
    getCartItemCount
  } = useCart();

  return (
    <div className="h-screen w-full flex bg-stone-50 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <div className="w-80 flex-shrink-0 p-4">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b">
          <ChatHeader 
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            getCartItemCount={getCartItemCount}
          />
        </div>
        
        <div className="flex-1 min-h-0">
          <ChatInterface addToCart={addToCart} />
        </div>
      </div>
      
      {/* Cart Sidebar - Global for the chat page */}
      {isCartOpen && (
        <CartCard
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={checkout}
          isLoading={cartLoading}
          getCartTotal={getCartTotal}
          getCartItemCount={getCartItemCount}
        />
      )}
    </div>
  );
};

export default ChatPage;
