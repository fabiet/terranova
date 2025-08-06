import React from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { Building, User, Settings as SettingsIcon, Palette } from 'lucide-react';

const PresidentSettingsPage = () => {
  const isDarkMode = true; // Static dark mode

  return (
    <PresidentAppShell title="Settings">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Organization Settings */}
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <Building className="text-green-500" size={24} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Organization
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Company Name
                </label>
                <input
                  type="text"
                  value="Terranova"
                  readOnly
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-zinc-800 border-gray-700 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } transition-colors duration-300`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Business Address
                </label>
                <textarea
                  value="123 Construction Ave, Building City, BC 12345"
                  readOnly
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-zinc-800 border-gray-700 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } transition-colors duration-300 resize-none`}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value="(555) 123-4567"
                    readOnly
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } transition-colors duration-300`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value="info@terranova.com"
                    readOnly
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } transition-colors duration-300`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <User className="text-green-500" size={24} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Preferences
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Currency
                </label>
                <select
                  value="USD"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-zinc-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } transition-colors duration-300`}
                >
                  <option>USD - US Dollar</option>
                  <option>CAD - Canadian Dollar</option>
                  <option>EUR - Euro</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Date Format
                </label>
                <select
                  value="MM/DD/YYYY"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-zinc-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } transition-colors duration-300`}
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Theme
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked
                      readOnly
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
                    />
                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Dark
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      readOnly
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
                    />
                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Light
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className="flex justify-end">
            <button
              disabled
              className="bg-gray-600 cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300 text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentSettingsPage;