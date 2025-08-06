import React, { useState } from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { UserPlus, Search, MoreHorizontal } from 'lucide-react';

const PresidentMembersPage = () => {
  const isDarkMode = true; // Static dark mode
  const [searchTerm, setSearchTerm] = useState('');

  const members = [
    {
      id: 1,
      name: 'Fabio Araujo',
      email: 'fabiettoaraujo@gmail.com',
      role: 'President',
      status: 'Active',
      avatar: 'F'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@terranova.com',
      role: 'Admin',
      status: 'Active',
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@terranova.com',
      role: 'Staff',
      status: 'Active',
      avatar: 'M'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily@terranova.com',
      role: 'Staff',
      status: 'Inactive',
      avatar: 'E'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@terranova.com',
      role: 'Staff',
      status: 'Active',
      avatar: 'D'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'President':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Admin':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Staff':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Inactive':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <PresidentAppShell title="Members">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Members List */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  Team Members
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search members..."
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
                    <UserPlus size={14} />
                    Invite Member
                  </button>
                </div>
              </div>
            </div>

            {/* Members Grid */}
            <div className="p-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <div key={member.id} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300'} transition-colors duration-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-semibold">
                          {member.avatar}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                      <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}>
                        <MoreHorizontal size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                          {member.name}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                          {member.email}
                        </div>
                      </div>
                      
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentMembersPage;