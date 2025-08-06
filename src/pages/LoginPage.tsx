import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Login from '../components/Login';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage = () => {
  const isDarkMode = true; // Static dark mode

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
                  Welcome to Terranova
                </h1>
                <p className={`text-lg lg:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed transition-colors duration-300`}>
                  Access your project dashboard, track renovation progress, and stay connected with our expert team throughout your interior transformation journey.
                </p>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time project updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Direct communication with your team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Photo galleries and progress reports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Schedule appointments and consultations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Login form */}
            <div className="w-full md:flex-1 md:max-w-md">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;