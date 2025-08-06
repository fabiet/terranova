import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
  const isDarkMode = true; // Static dark mode

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '(555) 123-4567',
      subtitle: 'Mon-Fri 8AM-6PM'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'info@terranova.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Service Area',
      details: 'Greater Metropolitan Area',
      subtitle: 'Free consultations available'
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: 'Mon-Fri: 8AM-6PM',
      subtitle: 'Sat: 9AM-4PM, Sun: Closed'
    }
  ];



  return (
    <section id="contact" className={`py-24 ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
            Get In Touch
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
            Ready to transform your space? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-8 flex flex-col">
            <div>
              <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
                Contact Information
              </h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-start space-x-4 p-6 ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
                    <div className="text-green-500 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1 transition-colors duration-300`}>
                        {info.title}
                      </h4>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-1 transition-colors duration-300`}>
                        {info.details}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;