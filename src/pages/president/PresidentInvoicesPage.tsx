import React, { useState } from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { Search, Filter, Plus, MoreHorizontal, Eye, Download } from 'lucide-react';

const PresidentInvoicesPage = () => {
  const isDarkMode = true; // Static dark mode
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    {
      id: 'INV-001',
      client: 'Johnson Residence',
      project: 'Kitchen Renovation',
      amount: '$15,500',
      due: '2025-02-05',
      status: 'Paid'
    },
    {
      id: 'INV-002',
      client: 'Chen Property',
      project: 'Bathroom Remodel',
      amount: '$8,750',
      due: '2025-02-10',
      status: 'Due'
    },
    {
      id: 'INV-003',
      client: 'Rodriguez Estate',
      project: 'Full Home Renovation',
      amount: '$12,200',
      due: '2025-01-25',
      status: 'Overdue'
    },
    {
      id: 'INV-004',
      client: 'Tech Startup Inc.',
      project: 'Office Space Renovation',
      amount: '$22,800',
      due: '2025-02-20',
      status: 'Draft'
    },
    {
      id: 'INV-005',
      client: 'Williams Family',
      project: 'Master Suite Upgrade',
      amount: '$18,900',
      due: '2025-02-28',
      status: 'Due'
    },
    {
      id: 'INV-006',
      client: 'Martinez Home',
      project: 'Flooring Installation',
      amount: '$9,400',
      due: '2025-03-05',
      status: 'Draft'
    },
    {
      id: 'INV-007',
      client: 'Thompson Residence',
      project: 'Lighting Upgrade',
      amount: '$6,200',
      due: '2025-01-30',
      status: 'Paid'
    },
    {
      id: 'INV-008',
      client: 'Davis Property',
      project: 'Tile Installation',
      amount: '$11,800',
      due: '2025-02-15',
      status: 'Due'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Due':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Overdue':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <PresidentAppShell title="Invoices">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Full Width Table */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
            {/* Enhanced Toolbar */}
            <div className="p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  All Invoices
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search invoices..."
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
                  <select 
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                  </select>
                  <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2">
                    <Plus size={14} />
                    Create Invoice
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
                      Invoice #
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Client
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Project
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Amount
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Due Date
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 dark:divide-gray-800 divide-gray-200">
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className={`${index % 2 === 1 ? (isDarkMode ? 'bg-zinc-900/30' : 'bg-gray-50/50') : ''} hover:bg-zinc-800/20 dark:hover:bg-zinc-800/20 hover:bg-gray-100/50 transition-colors duration-300`}>
                      <td className={`py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {invoice.id}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {invoice.client}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {invoice.project}
                      </td>
                      <td className={`py-3 px-4 font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {invoice.amount}
                      </td>
                      <td className={`py-3 px-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {invoice.due}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="View">
                            <Eye size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                          <button className={`p-1.5 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`} title="Download">
                            <Download size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
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
      </div>
    </PresidentAppShell>
  );
};

export default PresidentInvoicesPage;