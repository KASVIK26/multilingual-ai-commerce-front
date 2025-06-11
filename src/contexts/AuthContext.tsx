
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface User {
  id: string;
  email: string;
  fullName?: string;
  emailConfirmed?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes and set user
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Error getting user:', error);
          setUser(null);
        } else if (data?.user) {
          setUser({
            id: data.user.id,
            email: data.user.email ?? '',
            fullName: data.user.user_metadata?.fullName || data.user.user_metadata?.full_name || '',
            emailConfirmed: data.user.email_confirmed_at ? true : false,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Unexpected error getting user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || '',
          emailConfirmed: session.user.email_confirmed_at ? true : false,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          fullName: data.user.user_metadata?.fullName || data.user.user_metadata?.full_name || '',
          emailConfirmed: data.user.email_confirmed_at ? true : false,
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { 
            fullName: fullName.trim(),
            full_name: fullName.trim() // Backup field name
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // Note: User will be null until email is confirmed
      if (data.user) {
        console.log('User signed up successfully, confirmation email sent');
        // Don't set user state until email is confirmed
        // Supabase will handle this through the auth state change listener
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
