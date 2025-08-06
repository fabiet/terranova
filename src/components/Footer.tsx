import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Sun, Moon } from 'lucide-react';

const Footer = () => {
  const isDarkMode = true; // Static dark mode

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'portfolio' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-black border-t border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">Terranova</h3>
            <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Transforming spaces with expert craftsmanship, innovative design, and 
              unwavering commitment to excellence. Your vision, elevated to perfection.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`hover:text-green-500 transition-colors duration-300 hover:scale-110 transform ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Quick Links</h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block hover:text-green-500 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-left`}
                >
                  {link.label}
                </button>
              ))}
              <Link 
                to="/login/president" 
                className={`block hover:text-green-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } text-left`}
              >
                President Login
              </Link>
              <Link 
                to="/login/client" 
                className={`block hover:text-green-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } text-left`}
              >
                Client Login
              </Link>
              <Link 
                to="/signup" 
                className={`block hover:text-green-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } text-left`}
              >
                Sign Up
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Get In Touch</h4>
            <div className={`space-y-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@terranova.com</p>
              <p>Service Area: Greater Metropolitan Area</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 transition-colors duration-300 ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2025 Terranova. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-green-500 text-black hover:bg-green-400'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span className="font-medium">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              <a href="#" className={`hover:text-green-500 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Privacy Policy
              </a>
              <a href="#" className={`hover:text-green-500 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Terms of Service
              </a>
              <a href="#" className={`hover:text-green-500 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;