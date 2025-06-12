
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback(async (product: Product) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity
        const updatedItems = cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedItems);
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        };
        setCartItems(prev => [...prev, newItem]);
      }

      // Save to database
      await supabase.from('cart_items').upsert({
        user_id: user.data.user.id,
        product_id: product.id,
        product_title: product.title,
        product_price: product.price,
        product_image: product.image,
        quantity: existingItem ? existingItem.quantity + 1 : 1
      });

      console.log('Added to cart:', product.title);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [cartItems]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.data.user.id)
        .eq('product_id', id);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, []);

  const removeFromCart = useCallback(async (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.data.user.id)
        .eq('product_id', id);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }, []);

  const checkout = useCallback(async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.data.user.id,
          total_amount: cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^\d.]/g, '') || '0');
            return sum + (price * item.quantity);
          }, 0),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_title: item.title,
        product_price: item.price,
        quantity: item.quantity
      }));

      await supabase.from('order_items').insert(orderItems);

      // Clear cart
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.data.user.id);

      setCartItems([]);
      setIsCartOpen(false);
      
      console.log('Order placed successfully:', order.id);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }, [cartItems]);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout
  };
};
