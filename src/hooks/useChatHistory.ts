import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ChatHistoryItem {
  id: string;
  title: string;
  summary?: string;
  last_message_at: string;
  message_count: number;
  chat_type: string;
  created_at: string;
}

interface GroupedChats {
  today: ChatHistoryItem[];
  yesterday: ChatHistoryItem[];
  lastWeek: ChatHistoryItem[];
  lastMonth: ChatHistoryItem[];
  older: ChatHistoryItem[];
}

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<GroupedChats>({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groupChatsByDate = useCallback((chats: ChatHistoryItem[]): GroupedChats => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const grouped: GroupedChats = {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: []
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.last_message_at);
      
      if (chatDate >= today) {
        grouped.today.push(chat);
      } else if (chatDate >= yesterday) {
        grouped.yesterday.push(chat);
      } else if (chatDate >= lastWeek) {
        grouped.lastWeek.push(chat);
      } else if (chatDate >= lastMonth) {
        grouped.lastMonth.push(chat);
      } else {
        grouped.older.push(chat);
      }
    });

    return grouped;
  }, []);

  const fetchChatHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: chats, error } = await supabase
        .from('chats')
        .select(`
          id,
          title,
          summary,
          last_message_at,
          message_count,
          chat_type,
          created_at
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('last_message_at', { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      const processedChats: ChatHistoryItem[] = (chats || []).map(chat => ({
        ...chat,
        title: chat.title || generateChatTitle(chat.created_at, chat.chat_type)
      }));

      const grouped = groupChatsByDate(processedChats);
      setChatHistory(grouped);

    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch chat history');
    } finally {
      setIsLoading(false);
    }
  }, [groupChatsByDate]);

  const loadChat = useCallback(async (chatId: string) => {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          role,
          content,
          message_type,
          metadata,
          created_at
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      return messages || [];
    } catch (err) {
      console.error('Error loading chat:', err);
      throw err;
    }
  }, []);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Start a transaction to delete all related data
      console.log(`🗑️ Starting cascade delete for chat: ${chatId}`);

      // 1. Delete search results (cascades from search queries)
      // 2. Delete search queries (this will cascade delete search_results)
      const { error: searchError } = await supabase
        .from('search_queries')
        .delete()
        .eq('chat_id', chatId)
        .eq('user_id', user.id);

      if (searchError) {
        console.error('Error deleting search queries:', searchError);
        // Continue with deletion even if this fails
      }

      // 3. Delete messages (will cascade from chat deletion, but let's be explicit)
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .eq('chat_id', chatId);

      if (messagesError) {
        console.error('Error deleting messages:', messagesError);
        // Continue with deletion even if this fails
      }

      // 4. Finally, delete the chat itself
      const { error: chatError } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)
        .eq('user_id', user.id);

      if (chatError) {
        throw chatError;
      }

      console.log(`✅ Successfully deleted chat and all related data: ${chatId}`);

      // Refresh chat history
      await fetchChatHistory();
      
      // Notify that a chat was deleted (for handling active chat deletion)
      const { triggerChatDeleted } = await import('@/hooks/useChat');
      triggerChatDeleted(chatId);
    } catch (err) {
      console.error('Error deleting chat:', err);
      throw err;
    }
  }, [fetchChatHistory]);

  const clearAllChats = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log(`🗑️ Starting cascade delete for all chats for user: ${user.id}`);

      // Delete all active chats for this user - this will cascade delete messages and search queries
      const { error: chatError } = await supabase
        .from('chats')
        .delete()
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (chatError) {
        throw chatError;
      }

      console.log(`✅ Successfully deleted all chats and related data for user: ${user.id}`);

      // Refresh chat history from database
      await fetchChatHistory();
      
      // Notify that all chats were cleared (redirect if user is in any chat)
      const { triggerChatDeleted } = await import('@/hooks/useChat');
      triggerChatDeleted('*'); // Use '*' to indicate all chats cleared
      
    } catch (err) {
      console.error('Error clearing chats:', err);
      throw err;
    }
  }, [fetchChatHistory]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return {
    chatHistory,
    isLoading,
    error,
    fetchChatHistory,
    loadChat,
    deleteChat,
    clearAllChats
  };
};

// Helper function to generate chat titles
const generateChatTitle = (createdAt: string, chatType: string): string => {
  const date = new Date(createdAt);
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const typeMap: { [key: string]: string } = {
    general: 'Chat',
    product_search: 'Product Search',
    support: 'Support',
    recommendation: 'Recommendations'
  };
  
  return `${typeMap[chatType] || 'Chat'} ${timeStr}`;
};
