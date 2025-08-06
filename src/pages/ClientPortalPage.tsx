import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Home } from 'lucide-react';

const ClientPortalPage = () => {
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
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className={`${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-8 md:p-12 rounded-xl border transition-colors duration-300 shadow-xl`}>
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="text-green-500" size={32} />
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
                Client Portal
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 transition-colors duration-300`}>
                Welcome to your project dashboard. Manage your renovations and stay connected with our team.
              </p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3">
                <CreditCard size={20} />
                Make a Payment
              </button>

              <Link 
                to="/" 
                className={`block w-full ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-medium py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105`}
              >
                Back to Home
              </Link>
            </div>

            <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
              <div className={`grid md:grid-cols-3 gap-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                    Quick Actions
                  </h4>
                  <ul className="space-y-1">
                    <li>View Project Status</li>
                    <li>Download Invoices</li>
                    <li>Schedule Consultation</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                    Support
                  </h4>
                  <ul className="space-y-1">
                    <li>Contact Your Team</li>
                    <li>FAQ & Help</li>
                    <li>Emergency Contact</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                    Resources
                  </h4>
                  <ul className="space-y-1">
                    <li>Project Gallery</li>
                    <li>Design Inspiration</li>
                    <li>Maintenance Tips</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalPage;