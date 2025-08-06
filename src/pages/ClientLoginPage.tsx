import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ClientLoginPage = () => {
  const isDarkMode = true; // Static dark mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    
    // Simulate loading then navigate to client portal
    setTimeout(() => {
      setIsLoading(false);
      navigate('/client');
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300 flex flex-col`}>
      {/* Header with back button */}
      <header className="container mx-auto px-6 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="text-2xl font-bold text-green-500">
            Terranova
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 md:py-0">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-16">
            {/* Brand side panel - hidden on mobile, visible on desktop */}
            <div className="hidden md:block md:flex-1 md:max-w-lg">
              <div className="text-center md:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-green-500 mb-6">
                  Client Login
                </h1>
                <p className={`text-lg lg:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed transition-colors duration-300`}>
                  Access your project and invoices. Stay connected with your renovation progress and communicate directly with our team.
                </p>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>View project progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Access invoices and payments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Message your project team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Schedule appointments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Login form */}
            <div className="w-full md:flex-1 md:max-w-md">
              <div className={`${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-6 md:p-8 rounded-xl border transition-colors duration-300 shadow-xl`}>
                <div className="text-center mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">Terranova</h1>
                  <h2 className={`text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                    Client Portal
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                    Access your project and invoices
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
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-green-500 hover:bg-green-400 disabled:bg-green-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <div className={`mt-6 md:mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
                  <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                    <p className="mb-2">Don't have an account?</p>
                    <Link to="/signup" className="text-green-500 hover:text-green-400 font-medium transition-colors duration-300">
                      Create Client Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoginPage;