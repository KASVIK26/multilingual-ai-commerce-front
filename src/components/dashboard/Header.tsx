
import { Search, Bell, User } from "lucide-react";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileCard from '../chat/ProfileCard';
import UserAvatar from '@/components/ui/UserAvatar';
import { useUserProfile } from '@/hooks/useUserProfile';

const Header = () => {
  const { user, signOut } = useAuth();
  const { getDisplayName } = useUserProfile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = () => {
    if (user?.fullName) {
      return user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <>
      <div className="w-full h-20 px-6 py-4 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-between items-center">
        {/* Search Section */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products, orders, or conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {user ? (
              <UserAvatar size="sm" />
            ) : (
              <User className="w-8 h-8 text-gray-600" />
            )}
            <div className="text-left hidden sm:block">
              <div className="text-sm font-medium text-gray-900">
                {getDisplayName()}
              </div>
              <div className="text-xs text-gray-500">
                {user?.email || 'Not logged in'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      {user && (
        <ProfileCard
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={{
            name: getDisplayName(),
            email: user.email,
            avatar: undefined
          }}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
