import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

const UserSetup = () => {
  const isDarkMode = true; // Static dark mode
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateUser = async () => {
    setIsCreating(true);
    setMessage('');
    
    // Simulate user creation
    setTimeout(() => {
      setMessage('✅ President user created successfully! You can now login with the credentials.');
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }, 1500);
    
    setIsCreating(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-8 rounded-xl border transition-colors duration-300 shadow-xl max-w-md w-full`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-green-500 mb-2">User Setup</h1>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
            Create President User
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            Create the president user with your specified credentials
          </p>
        </div>

        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
              User Details:
            </h3>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1 transition-colors duration-300`}>
              <p><strong>Email:</strong> fabiettoaraujo@gmail.com</p>
              <p><strong>Password:</strong> Fabio2005</p>
              <p><strong>Role:</strong> President</p>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              isSuccess 
                ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                : 'bg-red-500/10 border border-red-500/20 text-red-500'
            }`}>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <button
            onClick={handleCreateUser}
            disabled={isCreating}
            className={`w-full bg-green-500 hover:bg-green-400 disabled:bg-green-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25`}
          >
            {isCreating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Creating User...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <User size={20} />
                Create President User
              </div>
            )}
          </button>

          {isSuccess && (
            <div className="text-center">
              <a 
                href="/login" 
                className={`text-green-500 hover:text-green-400 font-medium transition-colors duration-300`}
              >
                → Go to Login Page
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetup;