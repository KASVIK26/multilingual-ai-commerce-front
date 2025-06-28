
import React, { useState } from 'react';
import { Search, Bell, ChevronDown, ShoppingCart } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import NotificationCard from './NotificationCard';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useIsMobile } from '@/hooks/use-mobile';
import UserAvatar from '@/components/ui/UserAvatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';

interface ChatHeaderProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getCartItemCount: () => number;
}

const ChatHeader = ({ isCartOpen, setIsCartOpen, getCartItemCount }: ChatHeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { chatHistory } = useChatHistory();
  const { getDisplayName } = useUserProfile();
  const { user: authUser } = useAuth();

  const currentChatId = searchParams.get('chatId');
  
  // Find current chat title
  const getCurrentChatTitle = () => {
    if (!currentChatId) return 'New Chat';
    
    // Search through all chat history sections for the current chat
    const allChats = [
      ...chatHistory.today,
      ...chatHistory.yesterday,
      ...chatHistory.lastWeek,
      ...chatHistory.lastMonth,
      ...chatHistory.older
    ];
    
    const currentChat = allChats.find(chat => chat.id === currentChatId);
    return currentChat?.title || 'Chat';
  };

  // No hardcoded notifications - start with empty array
  const [notifications, setNotifications] = useState([]);

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

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMobile) {
      // On mobile, navigate to cart page
      navigate('/cart');
    } else {
      // On desktop, toggle cart sidebar
      setIsCartOpen(!isCartOpen);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-36 h-11 p-3.5 bg-gray-200 rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
            <div className="flex justify-between items-center w-full">
              <div className="text-black text-base font-normal font-['Poppins']">English</div>
              <ChevronDown size={16} />
            </div>
          </div>
          {currentChatId && (
            <div className="text-gray-600 text-lg font-medium">
              {getCurrentChatTitle()}
            </div>
          )}
        </div>
        <div className="flex justify-start items-center gap-2.5">
          <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center hover:bg-gray-300 transition-colors cursor-pointer">
            <Search size={16} />
          </button>
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center hover:bg-gray-300 transition-colors cursor-pointer relative"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 z-10">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={handleCartClick}
            className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center hover:bg-gray-300 transition-colors cursor-pointer relative"
          >
            <ShoppingCart size={16} />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 z-10">
                {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:scale-110 transition-transform cursor-pointer"
          >
            <UserAvatar size="md" />
          </button>
        </div>
      </div>

      <ProfileCard
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={{
          name: getDisplayName(),
          email: authUser?.email || '',
          avatar: undefined
        }}
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
