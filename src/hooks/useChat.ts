
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  products?: Product[];
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const processUserMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    
    // Add user message
    const userChatMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userChatMessage]);

    try {
      // Search for products in the database directly
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${userMessage}%,description.ilike.%${userMessage}%,brand.ilike.%${userMessage}%`)
        .eq('is_active', true)
        .limit(10);

      if (error) {
        throw error;
      }

      // Transform products to match the expected format
      const transformedProducts = products?.map(product => ({
        id: product.id,
        title: product.name,
        price: `$${product.price}`,
        image: product.image_url || '',
        link: product.product_url || '',
        is_amazon_choice: false // You can add this field to your database if needed
      })) || [];

      // Generate AI response based on found products
      let responseContent = "";
      if (transformedProducts.length > 0) {
        responseContent = `I found ${transformedProducts.length} products matching "${userMessage}". Here are the best options:`;
      } else {
        responseContent = `I couldn't find any products matching "${userMessage}" in our current database. Our scraper may need to be run to fetch fresh products for this search term.`;
      }

      // Add AI response with products
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
        products: transformedProducts
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while searching for products. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    processUserMessage
  };
};
