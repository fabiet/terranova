import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'portfolio' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? `backdrop-blur-lg border-b border-green-500/20 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'}` 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-500">
            Terranova
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-green-500 transition-colors duration-300 relative group ${
                  isDarkMode 
                    ? 'text-white' 
                    : isScrolled 
                      ? 'text-gray-900' 
                      : 'text-gray-900'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Login Button */}
            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-green-500 text-black hover:bg-green-400'
                  : 'bg-green-500 text-black hover:bg-green-400'
              }`}
            >
              <LogIn size={16} />
              <span className="font-medium">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden hover:text-green-500 transition-colors ${
              isDarkMode 
                ? 'text-white' 
                : isScrolled 
                  ? 'text-gray-900' 
                  : 'text-gray-900'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-green-500/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-2 hover:text-green-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Login Button */}
            <Link
              to="/login"
              className={`flex items-center gap-2 w-full px-4 py-2 mt-4 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-green-500 text-black hover:bg-green-400'
                  : 'bg-green-500 text-black hover:bg-green-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              <span className="font-medium">Login</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;