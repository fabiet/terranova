import React from 'react';
import { isSupabaseConfigured } from '../lib/supabase';

const ConfigCheck: React.FC = () => {
  if (isSupabaseConfigured()) {
    return null; // Don't render anything if properly configured
  }

  return (
    <div className="fixed inset-0 bg-red-600 text-white z-50 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">⚠️ Configuration Error</h1>
        <p className="mb-4">
          Supabase is not properly configured. Please follow these steps:
        </p>
        <div className="text-left bg-red-700 p-4 rounded-lg mb-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a <code className="bg-red-800 px-1 rounded">.env</code> file in your project root</li>
            <li>Add your Supabase credentials:</li>
          </ol>
          <pre className="mt-2 text-sm bg-red-800 p-2 rounded overflow-x-auto">
{`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>
        </div>
        <p className="text-sm opacity-90">
          You can find these values in your Supabase project dashboard under Settings → API.
        </p>
      </div>
    </div>
  );
};

export default ConfigCheck; 