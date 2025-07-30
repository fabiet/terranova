import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ProfileSetup: React.FC = () => {
  const { user, profile } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  const createProfile = async (role: 'President' | 'Client') => {
    if (!user) {
      setMessage('❌ No user found. Please log in first.');
      return;
    }

    setIsCreating(true);
    setMessage('');
    
    console.log('🔧 Creating profile for user:', user.id, 'with role:', role);

    // Add timeout to prevent hanging (reduced to 10 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out after 10 seconds')), 10000);
    });

    try {
      // First, let's test the connection
      console.log('🔍 Testing database connection...');
      const connectionPromise = supabase
        .from('user_profiles')
        .select('count')
        .limit(1);
      
      const result = await Promise.race([
        connectionPromise,
        timeoutPromise
      ]) as { data: unknown; error: unknown };
      
      const { error: testError } = result;
      
      if (testError) {
        const errorMessage = testError instanceof Error ? testError.message : 'Unknown connection error';
        console.error('❌ Database connection test failed:', errorMessage);
        setMessage(`❌ Database connection failed: ${errorMessage}`);
        setIsCreating(false);
        return;
      }
      
      console.log('✅ Database connection test successful');

      // Now try to create the profile
      console.log('🔧 Inserting profile...');
      const insertPromise = supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          role: role
        })
        .select();
      
      const insertResult = await Promise.race([
        insertPromise,
        timeoutPromise
      ]) as { data: unknown; error: unknown };
      
      const { data, error } = insertResult;

      console.log('🔧 Insert result:', { data, error });

      if (error) {
        console.error('❌ Profile creation error:', error);
        
        const errorObj = error as { code?: string; message?: string };
        if (errorObj.code === '23505') { // Unique constraint violation
          console.log('🔄 Profile already exists, updating...');
          // Profile already exists, try to update it
          const { data: updateData, error: updateError } = await supabase
            .from('user_profiles')
            .update({ role: role })
            .eq('id', user.id)
            .select();

          console.log('🔄 Update result:', { updateData, updateError });

          if (updateError) {
            setMessage(`❌ Error updating profile: ${updateError.message}`);
          } else {
            setMessage('✅ Profile updated successfully! Please refresh the page.');
            // Force a page refresh after a short delay
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          const errorMessage = errorObj.message || 'Unknown error occurred';
          setMessage(`❌ Error creating profile: ${errorMessage}`);
        }
      } else {
        console.log('✅ Profile created successfully:', data);
        setMessage('✅ Profile created successfully! Please refresh the page.');
        // Force a page refresh after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      setMessage(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsCreating(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800">Please log in first to set up your profile.</p>
      </div>
    );
  }

  if (profile) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
        <p className="text-green-800">
          ✅ Profile already exists! You are a <strong>{profile.role}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Profile Setup Required
      </h3>
      <p className="text-blue-800 mb-4">
        Your account exists but needs a profile to determine your role. The automatic setup is having issues, so please set up your profile manually:
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => createProfile('President')}
          disabled={isCreating}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {isCreating ? 'Creating...' : 'Try Automatic Setup (President)'}
        </button>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Manual setup instructions */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Manual Setup Instructions</h4>
        <p className="text-yellow-700 text-sm mb-3">
          Since the automatic setup is timing out, please create your profile manually:
        </p>
        <ol className="text-yellow-700 text-sm list-decimal list-inside space-y-2">
          <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Supabase Dashboard</a></li>
          <li>Select your project</li>
          <li>Navigate to <strong>Table Editor</strong> → <strong>user_profiles</strong></li>
          <li>Click <strong>"Insert row"</strong></li>
          <li>Fill in the fields:
            <ul className="ml-4 mt-1 space-y-1">
              <li><strong>id</strong>: <code className="bg-yellow-100 px-1 rounded text-xs">{user.id}</code></li>
              <li><strong>role</strong>: <code className="bg-yellow-100 px-1 rounded text-xs">President</code></li>
              <li><strong>created_at</strong>: Leave empty (auto-fills)</li>
              <li><strong>updated_at</strong>: Leave empty (auto-fills)</li>
            </ul>
          </li>
          <li>Click <strong>"Save"</strong></li>
          <li>Come back here and <strong>refresh this page</strong></li>
        </ol>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> If you don't see the <code>user_profiles</code> table, you need to apply the database migration first. 
            Go to <strong>SQL Editor</strong> and run the migration from <code>supabase/migrations/20250728043403_odd_boat.sql</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup; 