
import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Package, ShoppingCart, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'cart' | 'recommendation';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCardProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationCard = ({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }: NotificationCardProps) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'cart': return ShoppingCart;
      case 'recommendation': return Star;
      default: return Package;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed top-16 right-4 w-96 bg-white border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </h3>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-96">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notifications</p>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <Icon size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
