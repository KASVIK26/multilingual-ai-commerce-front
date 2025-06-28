
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Trash2, 
  CreditCard,
  Package,
  ArrowRight
} from 'lucide-react';

interface CartItem {
  id: string;
  product_id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  price_at_addition: number;
}

interface CartCardProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isLoading?: boolean;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartCard = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  isLoading = false,
  getCartTotal,
  getCartItemCount
}: CartCardProps) => {
  const { toast } = useToast();
  
  if (!isOpen) return null;

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const handleUpdateQuantity = async (itemId: string, newQuantity: number, itemTitle: string) => {
    try {
      if (newQuantity <= 0) {
        onRemoveItem(itemId);
        toast({
          title: "Item removed",
          description: `${itemTitle} has been removed from your cart.`,
          duration: 3000,
        });
      } else {
        onUpdateQuantity(itemId, newQuantity);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleRemoveItem = (itemId: string, itemTitle: string) => {
    onRemoveItem(itemId);
    toast({
      title: "Item removed",
      description: `${itemTitle} has been removed from your cart.`,
      duration: 3000,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-[10000] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
              <p className="text-sm text-gray-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h4>
              <p className="text-gray-500 mb-6">Add some products to get started!</p>
              <Button onClick={onClose} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.id}-${item.size}-${item.color}`} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative">
                      <img 
                        src={item.image || '/placeholder.svg'} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      {(item.size || item.color) && (
                        <div className="absolute -top-2 -right-2">
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            {item.size} {item.color}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 line-clamp-2 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-lg font-semibold text-green-600 mb-3">
                        ₹{item.price_at_addition.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.title)}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                            disabled={isLoading}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.title)}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                            disabled={isLoading}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id, item.title)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right mt-2">
                        <span className="text-sm text-gray-600">Total: </span>
                        <span className="font-semibold text-gray-900">
                          ₹{(item.price_at_addition * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer with Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t bg-white p-6 space-y-4">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button
              onClick={onCheckout}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 h-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              Secure checkout powered by Supabase
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartCard;
