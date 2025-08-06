import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type PresidentStatus = 'checking' | 'ok' | 'blocked';

export function useRequirePresident(): PresidentStatus {
  const [status, setStatus] = useState<PresidentStatus>('checking');

  useEffect(() => {
    const checkPresidentStatus = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setStatus('blocked');
          return;
        }

        // Query user_profiles for role
        const { data: profileData, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || !profileData || profileData.role !== 'president') {
          setStatus('blocked');
          return;
        }

        setStatus('ok');
      } catch (error) {
        console.error('Error checking president status:', error);
        setStatus('blocked');
      }
    };

    checkPresidentStatus();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setStatus('blocked');
        } else if (session) {
          // Re-check status when auth state changes
          checkPresidentStatus();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return status;
} 