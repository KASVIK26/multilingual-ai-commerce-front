
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
      // Call Supabase Edge Function for NLP processing and product scraping
      const { data, error } = await supabase.functions.invoke('process-chat', {
        body: { 
          message: userMessage,
          user_id: (await supabase.auth.getUser()).data.user?.id 
        }
      });

      if (error) {
        throw error;
      }

      // Add AI response with products
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I found some products for you:",
        sender: 'ai',
        timestamp: new Date(),
        products: data.products || []
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your request. Please try again.",
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
