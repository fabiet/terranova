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
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('⚠️ Profile fetch error:', error.message, 'Code:', error.code);
        
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('🔧 Creating new user profile...');
          
          const { data: insertData, error: insertError } = await supabase
            .from('user_profiles')
            .insert({ id: userId, role: 'Client' })
            .select()
            .single();
            
          if (insertError) {
            console.error('❌ Profile creation error:', insertError.message);
            // Don't set loading to false here, let the finally block handle it
          } else {
            console.log('✅ Profile created successfully:', insertData);
            setProfile(insertData);
          }
        } else {
          console.error('❌ Unexpected profile fetch error:', error.message);
        }
      } else {
        console.log('✅ Profile fetched successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('❌ Profile fetch exception:', error);
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