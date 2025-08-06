import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, FileText } from 'lucide-react';
import { signUpClient } from '../lib/clientAuth';

const SignUpPage = () => {
  const isDarkMode = true; // Static dark mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: '',
    accountType: 'residential',
    serviceInterest: '',
    preferredContact: 'email',
    notes: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await signUpClient({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        account_type: formData.accountType as 'residential' | 'business',
        preferred_contact: formData.preferredContact as 'email' | 'phone' | 'sms',
        service_interest: formData.serviceInterest,
        notes: formData.notes
      });
      
      if (result.success) {
        setSuccess(result.message);
        // Optionally redirect after a delay
        setTimeout(() => {
          navigate('/login/client');
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const serviceOptions = [
    'Kitchen Remodel',
    'Bathroom Remodel', 
    'Full Home Renovation',
    'Office/Commercial',
    'Outdoor/Deck',
    'Other'
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300 flex flex-col`}>
      {/* Header with back button */}
      <header className="container mx-auto px-6 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="text-2xl font-bold text-green-500">
            Terranova
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className={`${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-6 md:p-8 rounded-xl border transition-colors duration-300 shadow-xl`}>
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">Create a Client Account</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                UI only — no data is saved
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                  <p className="text-sm font-medium">{success}</p>
                </div>
              )}
              {/* Email and Password Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="Create password"
                    />
                  </div>
                </div>
              </div>

              {/* Confirm Password and Full Name Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Address Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Address (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 transition-colors duration-300`}>
                  Account Type *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="residential"
                      checked={formData.accountType === 'residential'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
                    />
                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Residential
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={formData.accountType === 'business'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
                    />
                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      Business
                    </span>
                  </label>
                </div>
              </div>

              {/* Service Interest and Preferred Contact Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Service Interest
                  </label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                  >
                    <option value="">Select service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                    Preferred Contact
                  </label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300`}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                  Notes (Optional)
                </label>
                <div className="relative">
                  <FileText className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} size={18} />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 resize-none`}
                    placeholder="Tell us about your project or any specific requirements..."
                  ></textarea>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="w-4 h-4 text-green-500 focus:ring-green-500 mt-1"
                />
                <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  I agree to the <span className="text-green-500">Terms & Conditions</span> and <span className="text-green-500">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className={`w-full bg-green-500 hover:bg-green-400 disabled:bg-green-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <Link 
                  to="/login/client" 
                  className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;