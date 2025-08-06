import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  const isDarkMode = true; // Static dark mode
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex items-center justify-center relative overflow-hidden transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-20 py-20">
        <div className="flex flex-col items-center justify-center">
          {/* Main heading - most dominant element */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-6xl md:text-8xl font-bold text-green-500 mb-4 tracking-tight drop-shadow-2xl">
              Terranova
            </h1>
          </div>
          
          {/* Subheading directly below */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'} mt-4 mb-8 font-light tracking-wide drop-shadow-lg transition-colors duration-300`}>
              Interior Upgrades. Elevated Living.
            </p>
          </div>

          {/* Spline 3D Model below heading and subheading */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="mt-8 mb-6">
              <div className="w-full max-w-[500px] mx-auto h-[350px] overflow-hidden">
                <Spline 
                  scene="https://prod.spline.design/0d6S-w4WRyeOVDDn/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Button closer to the model */}
          <div className={`transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={scrollToContact}
              className="group bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 inline-flex items-center gap-3 shadow-2xl mt-10"
            >
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;