import React from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { TrendingUp, PieChart, BarChart3, DollarSign, Users, Home, FileText } from 'lucide-react';

const PresidentAnalyticsPage = () => {
  const isDarkMode = true; // Static dark mode

  const kpiData = [
    { 
      icon: <DollarSign size={18} />, 
      title: 'Total Revenue', 
      value: '$847K', 
      delta: '▲ 23%',
      deltaType: 'positive'
    },
    { 
      icon: <Users size={18} />, 
      title: 'New Clients', 
      value: '47', 
      delta: '▲ 12%',
      deltaType: 'positive'
    },
    { 
      icon: <Home size={18} />, 
      title: 'Active Projects', 
      value: '28', 
      delta: '▼ 3%',
      deltaType: 'negative'
    },
    { 
      icon: <FileText size={18} />, 
      title: 'Avg Invoice Value', 
      value: '$18.2K', 
      delta: '▲ 8%',
      deltaType: 'positive'
    }
  ];

  const topServices = [
    { name: 'Kitchen Renovations', percentage: 85, amount: '$425K' },
    { name: 'Bathroom Remodels', percentage: 72, amount: '$298K' },
    { name: 'Flooring Installation', percentage: 58, amount: '$187K' },
    { name: 'Full Home Renovation', percentage: 45, amount: '$156K' },
    { name: 'Interior Lighting', percentage: 32, amount: '$89K' }
  ];

  const conversionData = [
    { stage: 'Visits', value: 1250, percentage: 100 },
    { stage: 'Quotes', value: 425, percentage: 34 },
    { stage: 'Won', value: 127, percentage: 30 }
  ];

  return (
    <PresidentAppShell title="Analytics">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Row 1 - KPI Cards */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div
                key={index}
                className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} p-4 rounded-lg border transition-colors duration-300`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-500">
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
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Revenue Trend & Top Services */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 mb-4">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-green-500" size={24} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Revenue Trend
              </h2>
            </div>
            
            {/* Placeholder Chart */}
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {[65, 78, 82, 71, 89, 95, 88, 92, 87, 94, 98, 85].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-green-500/20 rounded-t transition-all duration-300 hover:bg-green-500/30"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <span key={index} className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 lg:col-span-4 mb-4">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6 h-full`}>
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="text-green-500" size={24} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Top Services
              </h2>
            </div>
            
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {service.name}
                    </span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {service.amount}
                    </span>
                  </div>
                  <div className={`h-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden transition-colors duration-300`}>
                    <div 
                      className="h-full bg-green-500/60 transition-all duration-300"
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 - Monthly Breakdown & Conversion Funnel */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-green-500" size={24} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Monthly Breakdown
              </h2>
            </div>
            
            {/* Compact Bar Chart */}
            <div className="h-32 flex items-end justify-between gap-1">
              {[45, 52, 48, 61, 55, 67, 59, 73, 68, 71, 64, 58].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500/30 rounded-t transition-all duration-300 hover:bg-blue-500/40"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-2">
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, index) => (
                <span key={index} className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 lg:col-span-4">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-6`}>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
              Conversion Funnel
            </h2>
            
            <div className="space-y-4">
              {conversionData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {stage.stage}
                    </span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {stage.value}
                    </span>
                  </div>
                  <div className={`h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden transition-colors duration-300`}>
                    <div 
                      className={`h-full transition-all duration-300 ${
                        index === 0 ? 'bg-green-500/60' : 
                        index === 1 ? 'bg-yellow-500/60' : 'bg-blue-500/60'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                    {stage.percentage}% conversion
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

export default PresidentAnalyticsPage;