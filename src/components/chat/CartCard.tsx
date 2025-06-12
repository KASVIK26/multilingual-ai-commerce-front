
import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartCardProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartCard = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartCardProps) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '') || '0');
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed top-16 right-4 w-96 bg-white border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Shopping Cart ({cartItems.length})</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      
      <div className="overflow-y-auto max-h-96 p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex gap-3">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-green-600 font-semibold">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto p-1 text-red-500 hover:text-red-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Total: ₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartCard;
