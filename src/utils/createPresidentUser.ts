import { supabase } from '../lib/supabase';

export async function createPresidentUser(email: string = 'fabiettoaraujo@gmail.com', password: string = 'Fabio2005') {
  try {
    console.log('🔧 Creating president user...');
    
    // Add timeout wrapper for auth operations
    const timeoutPromise = (promise: Promise<unknown>, timeoutMs: number) => {
      return Promise.race([
        promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        )
      ]);
    };
    
    // First, try to sign in to check if user already exists (with timeout)
    console.log('🔍 Checking if user exists...');
    
    try {
      const signInPromise = supabase.auth.signInWithPassword({
        email,
        password
      });
      
      const { data: signInData, error: signInError } = await timeoutPromise(signInPromise, 30000);
      
      if (signInError) {
        // If sign-in fails, check the specific error
        if (signInError.message.includes('Invalid login credentials')) {
          console.log('🔧 User does not exist, creating new user...');
          
          // Create new user (with timeout)
          const signUpPromise = supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: undefined,
            }
          });
          
          const { data: signUpData, error: signUpError } = await timeoutPromise(signUpPromise, 45000);
          
          if (signUpError) {
            throw signUpError;
          }
          
          console.log('✅ User created successfully');
          
          if (signUpData.user) {
            // Create/update profile
            const { error: profileError } = await supabase
              .from('user_profiles')
              .upsert({
                id: signUpData.user.id,
                role: 'President'
              });

            if (profileError) {
              console.warn('⚠️ Profile creation warning:', profileError.message);
              // Don't throw error here, user was created successfully
            } else {
              console.log('✅ User profile created with President role');
            }
          }
        } else {
          throw signInError;
        }
      } else {
        // User already exists and sign-in was successful
        console.log('✅ User already exists, updating profile...');

        if (signInData.user) {
          // Update profile to President role
          const { error: profileError } = await supabase
            .from('user_profiles')
            .upsert({
              id: signInData.user.id,
              role: 'President'
            });

          if (profileError) {
            console.warn('⚠️ Profile update warning:', profileError.message);
            // Don't throw error here, user exists and can login
          } else {
            console.log('✅ User profile updated to President role');
          }
        }
      }
    } catch (timeoutError) {
      if (timeoutError.message === 'Operation timed out') {
        throw new Error('Authentication request timed out. Please check your internet connection and try again.');
      }
      throw timeoutError;
    }

    // Always sign out after setup
    await supabase.auth.signOut();
    
    return { success: true };
      } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('❌ Error creating president user:', errorMessage);
      
      // Always sign out on error too
      try {
        await supabase.auth.signOut();
      } catch {
        console.warn('Warning: Could not sign out after error');
      }
      
      return { success: false, error: errorMessage };
    }
}