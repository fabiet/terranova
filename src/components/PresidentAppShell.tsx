import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Home, 
  TrendingUp,
  Bell,
  ChevronDown,
  CreditCard,
  UserCheck,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

const PresidentAppShell = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const isDarkMode = true; // Static dark mode
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} />, path: '/president/dashboard' },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} />, path: '/president/analytics' }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'projects', label: 'Projects', icon: <Home size={18} />, path: '/president/projects' },
        { id: 'clients', label: 'Clients', icon: <Users size={18} />, path: '/president/clients' }
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { id: 'invoices', label: 'Invoices', icon: <FileText size={18} />, path: '/president/invoices' },
        { id: 'payments', label: 'Payments', icon: <CreditCard size={18} />, path: '/president/payments' }
      ]
    },
    {
      title: 'ADMIN',
      items: [
        { id: 'members', label: 'Members', icon: <UserCheck size={18} />, path: '/president/members' },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} />, path: '/president/settings' }
      ]
    }
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300 flex relative`}>
      {/* Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
      } border-r transition-all duration-300 flex-shrink-0 flex flex-col fixed left-0 top-0 h-full z-40 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand */}
        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-300 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {!sidebarCollapsed && (
              <span className="text-green-500 font-bold text-lg">Terranova</span>
            )}
            {sidebarCollapsed && (
              <div className="text-green-500 font-bold text-lg mx-auto">T</div>
            )}
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1 rounded hover:bg-zinc-800 transition-colors duration-300"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              {!sidebarCollapsed && (
                <h3 className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      isActivePath(item.path)
                        ? 'bg-green-500 text-black'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={sidebarCollapsed ? 'mx-auto' : ''}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Help */}
        <div className="p-4 border-t border-gray-800 dark:border-gray-800 border-gray-200">
          <Link
            to="/president/help"
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              isActivePath('/president/help')
                ? 'bg-green-500 text-black'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className={sidebarCollapsed ? 'mx-auto' : ''}>
              <HelpCircle size={18} />
            </span>
            {!sidebarCollapsed && <span>Help</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-60" style={{ marginLeft: window.innerWidth >= 768 ? (sidebarCollapsed ? '64px' : '240px') : '0' }}>
        {/* Vertical separator */}
        <div 
          className={`hidden md:block fixed top-0 h-full w-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} z-30 transition-all duration-300`}
          style={{ left: sidebarCollapsed ? '64px' : '240px' }}
        ></div>
        
        {/* Top Bar */}
        <header className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-300 flex-shrink-0`}>
          <div className="max-w-[1440px] mx-auto px-4 w-full">
            <div className="flex items-center justify-between h-16">
              {/* Left side */}
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors duration-300"
                >
                  <Menu size={18} className="text-gray-400" />
                </button>
                <Link
                  to="/"
                  className={`hidden sm:flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-1`}
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
                <h1 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 leading-tight`}>
                  {title}
                </h1>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Date Range */}
                <select 
                  className={`hidden sm:block px-3 py-1.5 rounded-lg border text-sm ${
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

                {/* Notifications */}
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}>
                  <Bell size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Role Badge */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block px-2 py-1 rounded-lg text-xs font-medium bg-green-500 text-black">
                    President
                  </div>
                </div>

                {/* Avatar */}
                <button className={`flex items-center gap-1 sm:gap-2 p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}>
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-black font-semibold text-xs">
                    F
                  </div>
                  <ChevronDown size={14} className={`hidden sm:block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PresidentAppShell;