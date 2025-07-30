import React from 'react';
import { isSupabaseConfigured } from '../lib/supabase';

const ConfigCheck: React.FC = () => {
  if (isSupabaseConfigured()) {
    return null; // Don't render anything if properly configured
  }

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white z-50 p-4 rounded-lg shadow-lg max-w-sm">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">⚠️ Configuration Error</h3>
        <p className="text-sm mb-3">
          Supabase is not properly configured. Please create a <code className="bg-red-700 px-1 rounded">.env</code> file with your credentials.
        </p>
        <div className="text-left bg-red-700 p-3 rounded text-xs mb-3">
          <pre className="overflow-x-auto">
{`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>
        </div>
        <p className="text-xs opacity-90">
          Find these in your Supabase dashboard under Settings → API.
        </p>
      </div>
    </div>
  );
};

export default ConfigCheck; 