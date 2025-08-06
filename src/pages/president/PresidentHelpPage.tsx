import React from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { HelpCircle, MessageCircle, Book, Mail, Phone } from 'lucide-react';

const PresidentHelpPage = () => {
  const isDarkMode = true; // Static dark mode

  const helpLinks = [
    {
      icon: <Book size={20} />,
      title: 'User Guide',
      description: 'Learn how to use the dashboard and manage your business'
    },
    {
      icon: <MessageCircle size={20} />,
      title: 'FAQ',
      description: 'Find answers to frequently asked questions'
    },
    {
      icon: <Mail size={20} />,
      title: 'Email Support',
      description: 'Get in touch with our support team'
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides'
    }
  ];

  return (
    <PresidentAppShell title="Help & Support">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Help Links */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <div className="text-center mb-8">
              <HelpCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                How can we help you?
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                Find answers, get support, and learn how to make the most of Terranova
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {helpLinks.map((link, index) => (
                <button
                  key={index}
                  className={`block p-6 rounded-lg border ${isDarkMode ? 'border-gray-800 hover:border-gray-700 hover:bg-zinc-800/50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'} transition-all duration-300 hover:scale-105 group text-left`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-green-500 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                        {link.title}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                        {link.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Contact Support */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                Need immediate assistance?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                Our support team is available Monday through Friday, 9 AM to 6 PM EST.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-center flex items-center justify-center gap-2">
                  <Mail size={16} />
                  support@terranova.com
                </button>
                <button className={`${isDarkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-center flex items-center justify-center gap-2`}>
                  <Phone size={16} />
                  (555) 123-4567
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentHelpPage;