import React from 'react';
import { isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';

const ConfigCheck: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = React.useState<{
    tested: boolean;
    success: boolean;
    error?: string;
    duration?: number;
  }>({ tested: false, success: false });

  React.useEffect(() => {
    if (isSupabaseConfigured()) {
      testSupabaseConnection().then(result => {
        setConnectionStatus({
          tested: true,
          success: result.success,
          error: result.error,
          duration: result.duration
        });
      });
    }
  }, []);

  if (isSupabaseConfigured()) {
    // Show connection status if configured
    if (!connectionStatus.tested) {
      return (
        <div className="fixed top-4 right-4 bg-blue-600 text-white z-50 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-sm">Testing Supabase connection...</p>
          </div>
        </div>
      );
    }

    if (!connectionStatus.success) {
      return (
        <div className="fixed top-4 right-4 bg-orange-600 text-white z-50 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">⚠️ Connection Issue</h3>
            <p className="text-sm mb-2">
              Supabase is configured but connection failed:
            </p>
            <p className="text-xs bg-orange-700 p-2 rounded mb-2">
              {connectionStatus.error}
            </p>
            <p className="text-xs opacity-90">
              Check your Supabase project status and network connection.
            </p>
          </div>
        </div>
      );
    }

    // Connection successful - show brief success message then hide
    if (connectionStatus.duration) {
      setTimeout(() => setConnectionStatus(prev => ({ ...prev, tested: false })), 3000);
      return (
        <div className="fixed top-4 right-4 bg-green-600 text-white z-50 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">✅ Connected</h3>
            <p className="text-sm">
              Supabase connection successful ({connectionStatus.duration}ms)
            </p>
          </div>
        </div>
      );
    }

    return null;
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