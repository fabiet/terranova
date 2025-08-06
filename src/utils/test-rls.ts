import { supabase } from '../lib/supabase';

// Test function to verify RLS is working correctly
export const testRLS = async () => {
  console.log('Testing RLS policies...');
  
  try {
    // This should fail due to RLS - anonymous users can only INSERT
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('✅ RLS is working correctly - SELECT was denied:', error.message);
      return true;
    } else {
      console.log('❌ RLS is NOT working - SELECT was allowed:', data);
      return false;
    }
  } catch (err) {
    console.log('✅ RLS is working correctly - SELECT was denied:', err);
    return true;
  }
};

// Test function to verify INSERT works
export const testInsert = async () => {
  console.log('Testing INSERT functionality...');
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '(555) 123-4567',
      project_type: 'Test Project',
      message: 'This is a test submission',
      source: 'test'
    };
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([testData])
      .select();
    
    if (error) {
      console.log('❌ INSERT failed:', error.message);
      return false;
    } else {
      console.log('✅ INSERT successful:', data);
      return true;
    }
  } catch (err) {
    console.log('❌ INSERT failed:', err);
    return false;
  }
}; 