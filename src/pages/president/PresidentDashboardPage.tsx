import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PresidentAppShell from '../../components/PresidentAppShell';
import { useRequirePresident } from '../../hooks/useRequirePresident';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  Home, 
  TrendingUp,
  Bell,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Eye,
  Edit,
  DollarSign,
  Menu,
  HelpCircle,
  CreditCard,
  UserCheck,
  Activity
} from 'lucide-react';

const PresidentDashboardPage = () => {
  const isDarkMode = true; // Static dark mode
  const navigate = useNavigate();
  const presidentStatus = useRequirePresident();
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Invoice #INV-003 overdue by 5 days' },
    { id: 2, type: 'danger', message: 'Kitchen Renovation project behind schedule' }
  ]);

  const kpiData = [
    { 
      icon: <DollarSign size={18} />, 
      title: 'Revenue', 
      value: '$127K', 
      delta: '+15%',
      deltaType: 'positive'
    },
    { 
      icon: <Home size={18} />, 
      title: 'Active Projects', 
      value: '12', 
      delta: '+2',
      deltaType: 'positive'
    },
    { 
      icon: <FileText size={18} />, 
      title: 'Pending Invoices', 
      value: '8', 
      delta: '-3',
      deltaType: 'positive'
    },
    { 
      icon: <Users size={18} />, 
      title: 'New Clients', 
      value: '24', 
      delta: '+12',
      deltaType: 'positive'
    }
  ];

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
    }
  ];

  const activities = [
    { id: 1, type: 'payment', message: 'Invoice #INV-001 paid by Johnson Residence', time: '2 hours ago' },
    { id: 2, type: 'status', message: 'Kitchen Renovation status updated to "In Progress"', time: '4 hours ago' },
    { id: 3, type: 'client', message: 'New client consultation scheduled with Martinez Family', time: '1 day ago' },
    { id: 4, type: 'project', message: 'Bathroom Remodel project started', time: '2 days ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Paid':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress':
      case 'Due':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Planned':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'Blocked':
      case 'Overdue':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  // Handle president status
  useEffect(() => {
    if (presidentStatus === 'blocked') {
      navigate('/president-login');
    }
  }, [presidentStatus, navigate]);

  if (presidentStatus === 'checking') {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (presidentStatus === 'blocked') {
    return null; // Will redirect via useEffect
  }

  return (
    <PresidentAppShell title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-4">
        
        {/* Row 1 - KPI Cards */}
        <div className="col-span-1 sm:col-span-4 md:col-span-8 lg:col-span-12 mb-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {kpiData.map((kpi, index) => (
              <button
                key={index}
                className={`${isDarkMode ? 'bg-black border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'} p-2 sm:p-4 rounded-lg border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-left group`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-500 group-hover:scale-110 transition-transform duration-300">
                    {kpi.icon}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    kpi.deltaType === 'positive' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {kpi.delta}
                  </span>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 transition-colors duration-300`}>
                  {kpi.title}
                </div>
                <div className={`text-lg sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  {kpi.value}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2 - Invoices & Activity */}
        <div className="col-span-1 sm:col-span-4 md:col-span-8 lg:col-span-8 mb-2">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 h-full`}>
            {/* Header */}
            <div className="p-2 sm:p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  Invoices
                </h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="relative">
                    <Search size={14} className={`hidden sm:block absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`hidden sm:block pl-9 pr-3 py-1.5 rounded-lg border text-sm w-32 ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                    />
                  </div>
                  <button className={`hidden sm:block p-1.5 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-50'} transition-colors duration-300`}>
                    <Filter size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </button>
                  <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-2 sm:px-3 py-1.5 rounded-lg transition-colors duration-300 text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5">
                    <Plus size={12} className="sm:hidden" />
                    <Plus size={14} className="hidden sm:block" />
                    <span className="hidden sm:inline">Create Invoice</span>
                    <span className="sm:hidden">New</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} sticky top-0 transition-colors duration-300`}>
                  <tr>
                    <th className={`text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Invoice #
                    </th>
                    <th className={`hidden sm:table-cell text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Client
                    </th>
                    <th className={`hidden md:table-cell text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Project
                    </th>
                    <th className={`text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Amount
                    </th>
                    <th className={`hidden sm:table-cell text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Due
                    </th>
                    <th className={`text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Status
                    </th>
                    <th className={`text-left py-2 px-2 sm:px-4 font-medium text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 dark:divide-gray-800 divide-gray-200">
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className={`${index % 2 === 1 ? (isDarkMode ? 'bg-zinc-900/30' : 'bg-gray-50/50') : ''} hover:bg-zinc-800/20 dark:hover:bg-zinc-800/20 hover:bg-gray-100/50 transition-colors duration-300`}>
                      <td className={`py-2 px-2 sm:px-4 font-medium text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {invoice.id}
                      </td>
                      <td className={`hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {invoice.client}
                      </td>
                      <td className={`hidden md:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300 max-w-32 truncate`}>
                        {invoice.project}
                      </td>
                      <td className={`py-2 px-2 sm:px-4 font-medium text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {invoice.amount}
                      </td>
                      <td className={`hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        {invoice.due}
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        <div className="flex items-center gap-1">
                          <button className={`p-1 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300`} title="View">
                            <Eye size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                          <button className={`p-1 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300`} title="Download">
                            <Download size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                          <button className={`p-1 rounded hover:bg-zinc-700 dark:hover:bg-zinc-700 hover:bg-gray-200 transition-colors duration-300`} title="More">
                            <MoreHorizontal size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
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

        {/* Activity & Alerts */}
        <div className="col-span-1 sm:col-span-4 lg:col-span-4 space-y-4 mb-2">
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-2 sm:p-4 rounded-lg border transition-colors duration-300`}>
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>
                Alerts
              </h3>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border flex items-start gap-2 ${
                    alert.type === 'warning' 
                      ? 'bg-yellow-500/10 border-yellow-500/20' 
                      : 'bg-red-500/10 border-red-500/20'
                  }`}>
                    <AlertTriangle size={14} className={alert.type === 'warning' ? 'text-yellow-500' : 'text-red-500'} />
                    <p className={`text-xs flex-1 ${
                      alert.type === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {alert.message}
                    </p>
                    <button 
                      onClick={() => dismissAlert(alert.id)}
                      className={`${alert.type === 'warning' ? 'text-yellow-500 hover:text-yellow-400' : 'text-red-500 hover:text-red-400'} transition-colors duration-300`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-2 sm:p-4 rounded-lg border transition-colors duration-300`}>
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'status' ? 'bg-blue-500' : 
                    activity.type === 'client' ? 'bg-purple-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {activity.message}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentDashboardPage;