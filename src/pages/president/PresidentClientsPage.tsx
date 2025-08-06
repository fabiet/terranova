import React, { useState } from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { Search, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react';

const PresidentClientsPage = () => {
  const isDarkMode = true; // Static dark mode
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Johnson Residence',
      contact: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      projects: 2,
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'Chen Property',
      contact: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      projects: 1,
      lastActivity: '1 week ago'
    },
    {
      id: 3,
      name: 'Rodriguez Estate',
      contact: 'emily.rodriguez@email.com',
      phone: '(555) 345-6789',
      projects: 3,
      lastActivity: '3 days ago'
    },
    {
      id: 4,
      name: 'Tech Startup Inc.',
      contact: 'contact@techstartup.com',
      phone: '(555) 456-7890',
      projects: 1,
      lastActivity: '5 days ago'
    },
    {
      id: 5,
      name: 'Williams Family',
      contact: 'john.williams@email.com',
      phone: '(555) 567-8901',
      projects: 1,
      lastActivity: '1 day ago'
    }
  ];

  const topClients = [
    { name: 'Johnson Residence', amount: '$45,200' },
    { name: 'Rodriguez Estate', amount: '$38,900' },
    { name: 'Tech Startup Inc.', amount: '$32,400' }
  ];

  return (
    <PresidentAppShell title="Clients">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Main Table */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  All Clients
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-9 pr-3 py-2 rounded-lg border text-sm w-48 ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                    />
                  </div>
                  <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2">
                    <Plus size={14} />
                    Add Client
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} sticky top-0 transition-colors duration-300`}>
                  <tr>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Name
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Contact
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Projects
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Last Activity
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 dark:divide-gray-800 divide-gray-200">
                  {clients.map((client, index) => (
                    <tr key={client.id} className={`${index % 2 === 1 ? (isDarkMode ? 'bg-zinc-900/30' : 'bg-gray-50/50') : ''} hover:bg-zinc-800/20 dark:hover:bg-zinc-800/20 hover:bg-gray-100/50 transition-colors duration-300`}>
                      <td className={`py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {client.name}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            {client.contact}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {client.projects}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {client.lastActivity}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="Contact">
                            <Phone size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="More">
                            <MoreHorizontal size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Clients Card */}
        <div className="col-span-4 lg:col-span-4">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-4`}>
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              Top Clients
            </h3>
            
            {/* Client Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 transition-colors duration-300`}>Active Clients</div>
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>47</div>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 transition-colors duration-300`}>New this Month</div>
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>8</div>
              </div>
            </div>

            {/* Top Clients List */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                By Revenue
              </h4>
              <div className="space-y-2">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {client.name}
                    </span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {client.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className={`w-full ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm`}>
              View All Clients
            </button>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentClientsPage;