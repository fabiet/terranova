import React, { useState } from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit } from 'lucide-react';

const PresidentProjectsPage = () => {
  const isDarkMode = true; // Static dark mode
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      client: 'Johnson Residence',
      status: 'In Progress',
      progress: 75,
      due: '2025-02-15'
    },
    {
      id: 2,
      name: 'Bathroom Remodel',
      client: 'Chen Property',
      status: 'Planned',
      progress: 25,
      due: '2025-03-01'
    },
    {
      id: 3,
      name: 'Full Home Renovation',
      client: 'Rodriguez Estate',
      status: 'Completed',
      progress: 100,
      due: '2025-01-30'
    },
    {
      id: 4,
      name: 'Office Space Renovation',
      client: 'Tech Startup Inc.',
      status: 'Blocked',
      progress: 60,
      due: '2025-02-28'
    },
    {
      id: 5,
      name: 'Master Suite Upgrade',
      client: 'Williams Family',
      status: 'In Progress',
      progress: 45,
      due: '2025-03-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Planned':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'Blocked':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <PresidentAppShell title="Projects">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Main Table */}
        <div className="col-span-4 md:col-span-8 lg:col-span-9">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  All Projects
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-9 pr-3 py-2 rounded-lg border text-sm w-48 ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                    />
                  </div>
                  <button className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-50'} transition-colors duration-300`}>
                    <Filter size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </button>
                  <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2">
                    <Plus size={14} />
                    New Project
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
                      Client
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Progress
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Due
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 dark:divide-gray-800 divide-gray-200">
                  {projects.map((project, index) => (
                    <tr key={project.id} className={`${index % 2 === 1 ? (isDarkMode ? 'bg-zinc-900/30' : 'bg-gray-50/50') : ''} hover:bg-zinc-800/20 dark:hover:bg-zinc-800/20 hover:bg-gray-100/50 transition-colors duration-300`}>
                      <td className={`py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {project.name}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {project.client}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`flex-1 h-2 ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden max-w-20`}>
                            <div 
                              className="h-full bg-green-500 transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {project.due}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="View">
                            <Eye size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="Edit">
                            <Edit size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
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

        {/* Filters Card */}
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-4`}>
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}>
                  Status
                </h4>
                <div className="space-y-2">
                  {['All', 'In Progress', 'Planned', 'Completed', 'Blocked'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked={status === 'All'}
                        className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
                      />
                      <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}>
                  Due Date
                </h4>
                <div className="space-y-2">
                  {['This Week', 'This Month', 'Next Month', 'Overdue'].map((period) => (
                    <label key={period} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
                      />
                      <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {period}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentProjectsPage;