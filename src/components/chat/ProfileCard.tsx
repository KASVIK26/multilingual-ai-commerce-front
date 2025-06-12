
import React from 'react';
import { Card } from '@/components/ui/card';
import { X, User, Settings, CreditCard, Package, LogOut } from 'lucide-react';

interface ProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const ProfileCard = ({ isOpen, onClose, user, onLogout }: ProfileCardProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: User, label: 'My Profile', action: () => console.log('Profile') },
    { icon: Package, label: 'My Orders', action: () => console.log('Orders') },
    { icon: CreditCard, label: 'Payment Methods', action: () => console.log('Payments') },
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings') },
  ];

  return (
    <div className="fixed top-16 right-4 w-80 bg-white border rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Account</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
          ) : (
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="font-medium">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
            >
              <item.icon size={18} className="text-gray-500" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="border-t mt-4 pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
