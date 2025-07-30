import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { isDarkMode } = useTheme();
  const { user, profile, signOut } = useAuth();

  const stats = [
    { icon: <Users size={24} />, label: 'Active Clients', value: '24' },
    { icon: <FileText size={24} />, label: 'Projects', value: '18' },
    { icon: <Calendar size={24} />, label: 'This Month', value: '6' },
    { icon: <TrendingUp size={24} />, label: 'Revenue', value: '$125K' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-300`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
              <div className="text-2xl font-bold text-green-500">
                Terranova Dashboard
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                Welcome, {profile?.full_name || user?.email}
              </span>
              <button
                onClick={signOut}
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
            President Dashboard
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            Manage projects, clients, and business operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-green-500">
                  {stat.icon}
                </div>
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  {stat.value}
                </span>
              </div>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              Recent Projects
            </h2>
            <div className="space-y-4">
              {['Kitchen Renovation - Johnson Residence', 'Bathroom Remodel - Chen Property', 'Full Home - Rodriguez Estate'].map((project, index) => (
                <div key={index} className={`p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    {project}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                    In Progress
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-left">
                Create New Project
              </button>
              <button className={`w-full ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-left`}>
                Manage Clients
              </button>
              <button className={`w-full ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-left`}>
                View Reports
              </button>
              <button className={`w-full ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-left`}>
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;