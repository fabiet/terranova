import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  role: 'President' | 'Client';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('AuthContext session error:', error.message);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('🔍 Fetching user profile for:', userId);
      
      // Add timeout to profile fetch
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout after 15 seconds')), 15000);
      });
      
      const profilePromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      const result = await Promise.race([profilePromise, timeoutPromise]);
      const { data, error } = result as { data: unknown; error: unknown };

      if (error) {
        const errorObj = error as { message: string; code?: string };
        console.log('⚠️ Profile fetch error:', errorObj.message, 'Code:', errorObj.code);
        
        // If profile doesn't exist, create it
        if (errorObj.code === 'PGRST116') {
          console.log('🔧 Creating new user profile...');
          
          const insertPromise = supabase
            .from('user_profiles')
            .insert({ id: userId, role: 'Client' })
            .select()
            .single();
            
          const insertResult = await Promise.race([insertPromise, timeoutPromise]);
          const { data: insertData, error: insertError } = insertResult as { data: unknown; error: unknown };
            
          if (insertError) {
            const insertErrorObj = insertError as { message: string };
            console.error('❌ Profile creation error:', insertErrorObj.message);
            // Don't set loading to false here, let the finally block handle it
          } else {
            console.log('✅ Profile created successfully:', insertData);
            setProfile(insertData);
          }
        } else {
          console.error('❌ Unexpected profile fetch error:', errorObj.message);
        }
      } else {
        console.log('✅ Profile fetched successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Profile fetch exception:', errorMessage);
      
      if (errorMessage.includes('timeout')) {
        console.error('🕐 This suggests a network connectivity issue or Supabase service problem');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error.message);
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};