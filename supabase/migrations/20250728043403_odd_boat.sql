/*
  # Final User Profiles Setup - Consolidated Migration

  This migration consolidates all user profile setup into a single, clean migration.
  It ensures the user_profiles table exists with proper structure and security.
*/

-- Drop existing objects if they exist to start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.user_profiles;

-- Create user_profiles table with proper structure
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'Client' CHECK (role IN ('President', 'Client')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can read own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Allow profile creation during signup (this is crucial for the trigger to work)
CREATE POLICY "Allow profile creation during signup"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role)
  VALUES (new.id, 'Client');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- Insert a default President user if needed (optional)
-- You can uncomment and modify this if you want to create a default admin user
-- INSERT INTO public.user_profiles (id, role) 
-- VALUES ('your-user-id-here', 'President') 
-- ON CONFLICT (id) DO NOTHING;