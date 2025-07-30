import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Eye, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const InvoicesPage = () => {
  const { isDarkMode } = useTheme();
  const { user, signOut } = useAuth();

  const invoices = [
    {
      id: 'INV-001',
      project: 'Kitchen Renovation',
      amount: '$15,500',
      status: 'Paid',
      date: '2025-01-15',
      dueDate: '2025-01-30'
    },
    {
      id: 'INV-002',
      project: 'Bathroom Remodel',
      amount: '$8,750',
      status: 'Pending',
      date: '2025-01-20',
      dueDate: '2025-02-05'
    },
    {
      id: 'INV-003',
      project: 'Flooring Installation',
      amount: '$12,200',
      status: 'Overdue',
      date: '2024-12-15',
      dueDate: '2024-12-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Pending':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Overdue':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

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
                Terranova Invoices
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                Welcome, {user?.email}
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
            Your Invoices
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            View and manage your project invoices and payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-500">
                <FileText size={24} />
              </div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                3
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Total Invoices
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-500">
                <Calendar size={24} />
              </div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                1
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Pending Payment
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-xl border transition-colors duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-500">
                <span className="text-2xl">$</span>
              </div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                $36,450
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Total Amount
            </p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-xl border transition-colors duration-300 overflow-hidden`}>
          <div className="p-6 border-b border-gray-800">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Invoice History
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
                <tr>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Invoice ID
                  </th>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Project
                  </th>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Amount
                  </th>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Status
                  </th>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Due Date
                  </th>
                  <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300`}>
                    <td className={`py-4 px-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {invoice.id}
                    </td>
                    <td className={`py-4 px-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {invoice.project}
                    </td>
                    <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {invoice.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className={`py-4 px-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {invoice.dueDate}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className={`p-2 ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} rounded-lg transition-colors duration-300`}>
                          <Eye size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`} />
                        </button>
                        <button className={`p-2 ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} rounded-lg transition-colors duration-300`}>
                          <Download size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoicesPage;