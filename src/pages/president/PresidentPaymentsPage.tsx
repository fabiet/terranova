import React from 'react';
import PresidentAppShell from '../../components/PresidentAppShell';
import { CreditCard, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const PresidentPaymentsPage = () => {
  const isDarkMode = true; // Static dark mode

  const recentPayments = [
    {
      id: 1,
      client: 'Johnson Residence',
      amount: '$15,500',
      date: '2025-01-28',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      client: 'Chen Property',
      amount: '$8,750',
      date: '2025-01-25',
      method: 'Credit Card'
    },
    {
      id: 3,
      client: 'Rodriguez Estate',
      amount: '$12,200',
      date: '2025-01-22',
      method: 'Check'
    },
    {
      id: 4,
      client: 'Tech Startup Inc.',
      amount: '$22,800',
      date: '2025-01-20',
      method: 'Bank Transfer'
    },
    {
      id: 5,
      client: 'Williams Family',
      amount: '$18,900',
      date: '2025-01-18',
      method: 'Credit Card'
    }
  ];

  return (
    <PresidentAppShell title="Payments">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        
        {/* Recent Payments */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
            <div className="p-4 border-b border-gray-800 dark:border-gray-800 border-gray-200">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Recent Payments
              </h2>
            </div>
            
            <div className="p-4 space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-50'} transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-green-500" size={16} />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {payment.client}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                        {payment.method} • {payment.date}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    {payment.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout Summary */}
        <div className="col-span-4 lg:col-span-4">
          <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300 p-4`}>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-green-500" size={20} />
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Payout Summary
              </h3>
            </div>
            
            {/* This Month vs Previous */}
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 transition-colors duration-300`}>This Month</div>
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>$78,150</div>
                <div className="text-xs text-green-500">▲ 23% vs last month</div>
              </div>
              
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'} transition-colors duration-300`}>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 transition-colors duration-300`}>Previous Month</div>
                <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>$63,500</div>
              </div>
            </div>

            {/* Mini Sparkline Placeholder */}
            <div className="mt-4">
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}>
                Payment Trend (Last 7 Days)
              </div>
              <div className="h-8 flex items-end justify-between gap-1">
                {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                  <div key={index} className="flex-1">
                    <div 
                      className="w-full bg-green-500/30 rounded-t transition-all duration-300"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-4 pt-4 border-t border-gray-800 dark:border-gray-800 border-gray-200">
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}>
                Payment Methods
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Bank Transfer
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    65%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Credit Card
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    25%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    Check
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    10%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PresidentAppShell>
  );
};

export default PresidentPaymentsPage;