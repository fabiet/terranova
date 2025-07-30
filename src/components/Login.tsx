import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Login = () => {
  const { isDarkMode } = useTheme();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle redirect when auth state changes
  React.useEffect(() => {
    if (user && !loading) {
      console.log('🚀 Login: User authenticated, checking profile...', { user: user.email, profile });
      setIsLoading(false);
      
      if (profile) {
        // Profile is loaded, redirect based on role
        console.log('🚀 Login: Profile loaded, redirecting based on role:', profile.role);
        if (profile.role === 'President') {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/invoices', { replace: true });
        }
      } else {
        // Profile not loaded yet, wait a bit more or redirect to user setup
        console.log('🚀 Login: Profile not loaded yet, waiting...');
        const timeoutId = setTimeout(() => {
          if (!profile) {
            console.log('🚀 Login: Profile still not loaded, redirecting to user setup');
            navigate('/user-setup', { replace: true });
          }
        }, 2000);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [user, profile, loading, navigate]);

  // Test Supabase connection on component mount
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Supabase connection...');
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
        
        // Test basic connection
        const { error } = await supabase.from('user_profiles').select('count').limit(1);
        
        if (error) {
          console.error('❌ Supabase connection test failed:', error);
        } else {
          console.log('✅ Supabase connection test successful');
        }
      } catch (err) {
        console.error('❌ Supabase connection error:', err);
      }
    };
    
    testConnection();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('🔐 Login: Starting authentication for:', formData.email);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) throw error;
      
      console.log('✅ Login: Authentication successful!');
      console.log('⏳ Login: Waiting for profile to load...');
      // Don't set loading to false here - let the useEffect handle it
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      console.error('❌ Login: Error:', errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-6 md:p-8 rounded-xl border transition-colors duration-300 shadow-xl`}>
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">Terranova</h1>
          <h2 className={`text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
            Welcome Back
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-500 hover:bg-green-400 disabled:bg-green-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 ${
              isLoading ? 'opacity-75' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className={`mt-6 md:mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
          <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            <p className="mb-2">Access your project dashboard and track progress.</p>
            <p>Need help? Contact us at <span className="text-green-500">info@terranova.com</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;