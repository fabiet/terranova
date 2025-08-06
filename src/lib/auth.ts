import { supabase } from './supabase';

export interface PresidentUser {
  email: string;
  role: string;
}

export async function signInPresident(formEmail: string, formPassword: string): Promise<PresidentUser> {
  // Step a: Compare with hard-coded credentials
  const allowedEmail = import.meta.env.VITE_PRESIDENT_EMAIL;
  const allowedPassword = import.meta.env.VITE_PRESIDENT_PASSWORD;
  
  console.log('Debug - Form email:', formEmail);
  console.log('Debug - Allowed email:', allowedEmail);
  console.log('Debug - Form password length:', formPassword.length);
  console.log('Debug - Allowed password length:', allowedPassword.length);
  
  if (formEmail !== allowedEmail || formPassword !== allowedPassword) {
    console.log('Debug - Credential mismatch');
    throw new Error('Not authorized');
  }

  // Step b: Call Supabase signInWithPassword with env credentials
  const { data, error } = await supabase.auth.signInWithPassword({
    email: allowedEmail,
    password: allowedPassword
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('Authentication failed');
  }

  // Step c: Fetch own profile and verify role
  const { data: profileData, error: profileError } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profileData) {
    await supabase.auth.signOut();
    throw new Error('Profile not found');
  }

  if (profileData.role !== 'president') {
    await supabase.auth.signOut();
    throw new Error('Not authorized');
  }

  // Step d: Return user data
  return {
    email: data.user.email || '',
    role: profileData.role
  };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return session;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
} 