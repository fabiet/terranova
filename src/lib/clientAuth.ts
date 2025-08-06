import { supabase } from './supabase';

export type ClientSignupData = {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
  account_type: 'residential' | 'business';
  preferred_contact: 'email' | 'phone' | 'sms';
  service_interest?: string;
  notes?: string;
};

export async function signUpClient(data: ClientSignupData): Promise<{ success: boolean; message: string }> {
  try {
    // Basic validation
    if (!data.email || !data.password || !data.full_name) {
      throw new Error('Email, password, and full name are required');
    }

    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Step 1: Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user account');
    }

    // Step 2: Insert client data using the secure database function
    const { error: clientError } = await supabase.rpc('create_client_profile', {
      p_user_id: authData.user.id,
      p_full_name: data.full_name,
      p_email: data.email,
      p_phone: data.phone || null,
      p_address: data.address || null,
      p_account_type: data.account_type,
      p_preferred_contact: data.preferred_contact,
      p_service_interest: data.service_interest || null,
      p_notes: data.notes || null
    });

    if (clientError) {
      throw new Error(`Failed to create client profile: ${clientError.message}`);
    }

    return {
      success: true,
      message: 'Account created successfully! Please check your email to verify your account.'
    };

  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred during signup'
    };
  }
}

export async function signInClient(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutClient() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getCurrentClient() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
} 