// Simple script to set up user account
// Run this with: node setup-user.js

import { createClient } from '@supabase/supabase-js';

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your_supabase_url_here';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupUser() {
  try {
    console.log('🔧 Setting up user account...');
    
    // First, try to sign up a new user
    const { data, error } = await supabase.auth.signUp({
      email: 'fabiettoaraujo@gmail.com',
      password: 'Fabio2005',
      options: {
        emailRedirectTo: undefined,
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ User already exists, trying to sign in...');
        
        // Try to sign in instead
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'fabiettoaraujo@gmail.com',
          password: 'Fabio2005'
        });

        if (signInError) {
          console.error('❌ Sign in failed:', signInError.message);
          return;
        }

        console.log('✅ Sign in successful!');
        
        // Update profile to President role
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            id: signInData.user.id,
            role: 'President'
          });

        if (profileError) {
          console.error('❌ Profile update failed:', profileError.message);
        } else {
          console.log('✅ Profile updated to President role');
        }
      } else {
        console.error('❌ Sign up failed:', error.message);
        return;
      }
    } else {
      console.log('✅ User created successfully!');
      
      // Create profile with President role
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            id: data.user.id,
            role: 'President'
          });

        if (profileError) {
          console.error('❌ Profile creation failed:', profileError.message);
        } else {
          console.log('✅ Profile created with President role');
        }
      }
    }

    // Always sign out after setup
    await supabase.auth.signOut();
    console.log('✅ Setup complete! You can now log in with:');
    console.log('   Email: fabiettoaraujo@gmail.com');
    console.log('   Password: Fabio2005');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Check if environment variables are set
if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
  console.error('❌ Please set your Supabase environment variables first!');
  console.error('Create a .env file with:');
  console.error('VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
} else {
  setupUser();
} 