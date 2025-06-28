
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Product {
  id: string;
  title: string;
  description?: string;
  specs?: string[];
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
  rating?: string;
  review_count?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  products?: Product[];
  extracted_features?: any;
}

// Simple cache for loaded chats to avoid re-fetching
const chatCache = new Map<string, ChatMessage[]>();

// Global callback for when new chats are created (to refresh sidebar)
let onNewChatCreated: (() => void) | null = null;

// Global callback for when chats are deleted (to handle active chat deletion)
let onChatDeleted: ((chatId: string) => void) | null = null;

export const setNewChatCallback = (callback: (() => void) | null) => {
  onNewChatCreated = callback;
};

export const setChatDeletedCallback = (callback: ((chatId: string) => void) | null) => {
  onChatDeleted = callback;
};

// Function to trigger chat deleted callback (for internal use)
export const triggerChatDeleted = (chatId: string) => {
  if (onChatDeleted) {
    onChatDeleted(chatId);
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const processUserMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    
    // Add user message immediately
    const userChatMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev, userChatMessage];
      
      // Update cache if this is an existing chat
      if (currentChatId) {
        chatCache.set(currentChatId, updatedMessages);
      }
      
      return updatedMessages;
    });

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Call our AI-powered process-chat edge function
      const { data, error } = await supabase.functions.invoke('process-chat', {
        body: {
          message: userMessage,
          user_id: user.id,
          chat_id: currentChatId
        }
      });

      if (error) {
        throw error;
      }

      console.log('✅ AI Processing Result:', data);

      // Store the new chat ID if this is a new chat
      let newChatId = currentChatId;
      
      // Update chat ID if it's a new chat and update URL
      if (data.chat_id && !currentChatId) {
        newChatId = data.chat_id;
        setCurrentChatId(data.chat_id);
        
        // Update URL to include the new chat ID
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.set('chatId', data.chat_id);
          window.history.replaceState({}, '', url.toString());
        }
        
        // Notify sidebar to refresh chat history
        if (onNewChatCreated) {
          setTimeout(onNewChatCreated, 500); // Small delay to ensure chat is saved
        }
      }

      // Transform products to match the expected format
      const transformedProducts = data.products?.map((product: any) => ({
        id: product.id || product.product_id || Date.now().toString(),
        title: product.title || product.name || 'Product',
        description: product.description || '',
        specs: product.specs || [],
        price: product.price || `₹${product.price}`,
        image: product.image || product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
        link: product.link || product.product_url || product.url || '#',
        is_amazon_choice: product.is_amazon_choice || false,
        rating: product.rating || '',
        review_count: product.review_count || ''
      })) || [];

      // Add AI response with products and extracted features
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date(),
        products: transformedProducts,
        extracted_features: data.extracted_features
      };

      setMessages(prev => {
        const updatedMessages = [...prev, aiMessage];
        
        // Update cache with the correct chat ID (either current or newly created)
        if (newChatId) {
          chatCache.set(newChatId, updatedMessages);
        }
        
        return updatedMessages;
      });

      // Show extracted features in console for debugging
      if (data.extracted_features) {
        console.log('🎯 Extracted Features:', data.extracted_features);
      }

    } catch (error) {
      console.error('❌ Error processing message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your request. Please make sure you're logged in and try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => {
        const updatedMessages = [...prev, errorMessage];
        
        // Update cache if this is an existing chat
        if (currentChatId) {
          chatCache.set(currentChatId, updatedMessages);
        }
        
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentChatId]);

  // Function to start a new chat
  const startNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    // Clear any cached data for new chats
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('chatId');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Function to load chat history
  const loadChatHistory = useCallback(async (chatId: string) => {
    try {
      setIsLoading(true);
      
      // Always update the current chat ID immediately to prevent race conditions
      setCurrentChatId(chatId);
      
      // Check cache first
      if (chatCache.has(chatId)) {
        const cachedMessages = chatCache.get(chatId)!;
        setMessages(cachedMessages);
        setIsLoading(false);
        return;
      }
      
      // Fetch messages for the chat
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform messages to match our ChatMessage interface
      const loadedMessages: ChatMessage[] = messagesData.map(msg => {
        let products: Product[] = [];
        
        // Extract products from metadata if available
        if (msg.metadata?.products && Array.isArray(msg.metadata.products)) {
          products = msg.metadata.products.map((product: any) => ({
            id: product.id || product.product_id || Date.now().toString(),
            title: product.title || product.name || 'Product',
            description: product.description || '',
            specs: product.specs || [],
            price: product.price || (product.price ? `₹${product.price}` : ''),
            image: product.image || product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
            link: product.link || product.product_url || product.url || '#',
            is_amazon_choice: product.is_amazon_choice || false,
            rating: product.rating || '',
            review_count: product.review_count || ''
          }));
        }

        return {
          id: msg.id,
          content: msg.content,
          sender: msg.role === 'user' ? 'user' : 'ai',
          timestamp: new Date(msg.created_at),
          products: products,
          extracted_features: msg.metadata?.extracted_features
        };
      });

      // Cache the loaded messages
      chatCache.set(chatId, loadedMessages);
      
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't load this conversation. Please try again or start a new chat.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to clear cache for a specific chat (useful when chat is updated)
  const clearChatCache = useCallback((chatId?: string) => {
    if (chatId) {
      chatCache.delete(chatId);
    } else {
      chatCache.clear();
    }
  }, []);

  // Function to handle when current chat is deleted externally
  const handleCurrentChatDeleted = useCallback(() => {
    // Clear current chat state and cache
    setCurrentChatId(null);
    setMessages([]);
    if (currentChatId) {
      chatCache.delete(currentChatId);
    }
  }, [currentChatId]);

  return {
    messages,
    isLoading,
    currentChatId,
    processUserMessage,
    startNewChat,
    loadChatHistory,
    clearChatCache,
    handleCurrentChatDeleted
  };
};
