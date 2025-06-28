
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

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

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
  rating?: string;
  review_count?: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Force refresh trigger
  const { toast } = useToast();

  // Load cart items on component mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: cartData, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          price_at_addition,
          size,
          color,
          products!inner (
            id,
            name,
            image_url,
            images,
            price
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems: CartItem[] = (cartData || []).map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        title: item.products.name || 'Unknown Product',
        price: `₹${item.price_at_addition}`,
        image: item.products.image_url || (item.products.images && item.products.images[0]) || '',
        quantity: item.quantity,
        size: item.size || undefined,
        color: item.color || undefined,
        price_at_addition: item.price_at_addition
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Force refresh cart data
  const forceRefreshCart = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
    loadCartItems();
  }, [loadCartItems]);

  const addToCart = useCallback(async (product: Product, size?: string, color?: string) => {
    try {
      setIsLoading(true);
      console.log('Adding to cart:', product);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      // Parse price to number
      const priceNumber = parseFloat(product.price.replace(/[^\d.]/g, '') || '0');
      console.log('Parsed price:', priceNumber);

      // Check if item already exists in cart with same size/color
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .eq('size', size || '')
        .eq('color', color || '')
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing item:', checkError);
        throw checkError;
      }

      if (existingItem) {
        console.log('Updating existing item:', existingItem);
        // Update existing item quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (updateError) {
          console.error('Error updating item:', updateError);
          throw updateError;
        }
      } else {
        console.log('Adding new item to cart');
        // Add new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1,
            price_at_addition: priceNumber,
            size: size || null,
            color: color || null
          });

        if (insertError) {
          console.error('Error inserting item:', insertError);
          throw insertError;
        }
      }

      // Reload cart items and force refresh
      await loadCartItems();
      forceRefreshCart();
      console.log('Successfully added to cart:', product.title);
      
      // Show success toast
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [loadCartItems, forceRefreshCart]);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(cartItemId);
      return;
    }

    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
      
      // Force refresh to ensure header updates
      forceRefreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  }, [forceRefreshCart]);

  const removeFromCart = useCallback(async (cartItemId: string) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      // Force refresh to ensure header updates
      forceRefreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [forceRefreshCart]);

  const clearCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems([]);
      
      // Force refresh to ensure header updates
      forceRefreshCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [forceRefreshCart]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.price_at_addition * item.quantity);
    }, 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const checkout = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const total = getCartTotal();
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: `ORD-${Date.now()}`,
          total_amount: total,
          subtotal: total,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price_at_addition,
        total: item.price_at_addition * item.quantity
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      // Clear cart
      await clearCart();
      setIsCartOpen(false);
      
      console.log('Order placed successfully:', order.id);
      
      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.order_number} has been placed.`,
      });
      
      return order;
    } catch (error) {
      console.error('Error during checkout:', error);
      
      // Show error toast
      toast({
        title: "Checkout failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cartItems, getCartTotal, clearCart]);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
    getCartTotal,
    getCartItemCount,
    loadCartItems
  };
};
