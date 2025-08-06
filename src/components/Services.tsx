import React from 'react';
import { Home, Layers, Lightbulb, Wrench } from 'lucide-react';

const Services = () => {
  const isDarkMode = true; // Static dark mode

  const services = [
    {
      icon: <Layers size={40} />,
      title: 'Flooring',
      description: 'Premium hardwood, luxury vinyl, and tile installations with meticulous attention to detail and lasting quality.'
    },
    {
      icon: <Home size={40} />,
      title: 'Tiling',
      description: 'Expert ceramic, porcelain, and natural stone tile work for kitchens, bathrooms, and custom feature walls.'
    },
    {
      icon: <Lightbulb size={40} />,
      title: 'Interior Lighting',
      description: 'Modern lighting solutions including LED systems, smart controls, and ambient lighting design.'
    },
    {
      icon: <Wrench size={40} />,
      title: 'Full Renovations',
      description: 'Complete interior transformations from concept to completion, bringing your vision to life with precision.'
    }
  ];

  return (
    <section id="services" className={`py-24 ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>Our Services</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
            Transforming spaces with expert craftsmanship and innovative design solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} backdrop-blur-sm p-8 rounded-xl border hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/10`}
            >
              <div className="text-green-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 group-hover:text-green-500 transition-colors duration-300`}>
                {service.title}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed transition-colors duration-300`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;