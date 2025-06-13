
import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, ShoppingCart } from 'lucide-react';
import ProfileCard from './ProfileCard';
import NotificationCard from './NotificationCard';
import { useCart } from '@/hooks/useCart';

const ChatHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();

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

  const handleLogout = () => {
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="w-[1042px] inline-flex justify-between items-center">
        <div className="w-36 h-11 p-3.5 bg-gray-200 rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-center text-black text-base font-normal font-['Poppins']">English</div>
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="flex justify-start items-center gap-2.5">
          <button className="w-11 h-11 bg-gray-200 rounded-[35px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
            <Search size={16} />
          </button>
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer relative"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer relative"
          >
            <ShoppingCart size={16} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-11 h-11 rounded-full hover:scale-110 transition-transform cursor-pointer bg-blue-500 flex items-center justify-center text-white"
          >
            <User size={20} />
          </button>
        </div>
      </div>

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
    </>
  );
};

export default ChatHeader;
