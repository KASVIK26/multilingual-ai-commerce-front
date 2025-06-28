import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  Package,
  CreditCard,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    checkout,
    clearCart,
    isLoading,
    getCartTotal,
    getCartItemCount
  } = useCart();

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      await checkout();
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
        duration: 5000,
      });
      // Redirect to orders page or show success message
      navigate('/my-account?tab=orders');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleRemoveItem = async (itemId: string, itemTitle: string) => {
    try {
      await removeFromCart(itemId);
      toast({
        title: "Item removed",
        description: `${itemTitle} has been removed from your cart.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number, itemTitle: string) => {
    try {
      if (newQuantity <= 0) {
        await handleRemoveItem(itemId, itemTitle);
      } else {
        await updateQuantity(itemId, newQuantity);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/chat')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <h1 className="text-xl font-semibold text-gray-900">Shopping Cart</h1>
                <Badge variant="secondary" className="ml-2">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Badge>
              </div>
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="p-6 bg-gray-100 rounded-full mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Cart Items</h2>
              
              {cartItems.map((item) => (
                <Card key={`${item.id}-${item.size}-${item.color}`} className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={item.image || '/placeholder.svg'} 
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      {(item.size || item.color) && (
                        <div className="absolute -top-2 -right-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.size} {item.color}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 pr-4">
                          {item.title}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600 p-2"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-600 p-2"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-2xl font-semibold text-green-600">
                            ₹{item.price_at_addition.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ₹{(item.price_at_addition * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.title)}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                              disabled={isLoading}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-lg font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.title)}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                              disabled={isLoading}
                            >
                              <Plus className="w-4 h-4" />
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
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{(total * 0.18).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(total * 1.18).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || isCheckingOut}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 h-auto"
                >
                  {isCheckingOut ? (
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
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  Secure checkout • SSL encrypted
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
