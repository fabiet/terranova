import React from 'react';
import { Award, Users, Clock } from 'lucide-react';

const About = () => {
  const isDarkMode = true; // Static dark mode

  const stats = [
    { icon: <Award size={32} />, number: '10+', label: 'Years Experience' },
    { icon: <Users size={32} />, number: '500+', label: 'Happy Clients' },
    { icon: <Clock size={32} />, number: '1000+', label: 'Projects Completed' }
  ];

  return (
    <section id="about" className={`py-24 ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8 transition-colors duration-300`}>About Terranova</h2>
            <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed transition-colors duration-300`}>
              <p>
                At Terranova, we believe that exceptional interior design should be a seamless blend of 
                functionality, beauty, and craftsmanship. Our passion lies in transforming ordinary spaces 
                into extraordinary environments that reflect your unique style and enhance your daily life.
              </p>
              <p>
                With over a decade of experience in high-end renovations, our team of skilled artisans 
                and designers brings meticulous attention to detail to every project. From concept to 
                completion, we ensure that every element is perfectly executed to exceed your expectations.
              </p>
              <p>
                We specialize in creating modern, sophisticated interiors that stand the test of time. 
                Our commitment to quality materials, innovative techniques, and personalized service 
                has made us the trusted choice for discerning homeowners seeking elevated living spaces.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern interior design"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center p-6 ${isDarkMode ? 'bg-black/50 border-green-500/20' : 'bg-white border-gray-200'} rounded-lg border transition-colors duration-300`}>
                  <div className="text-green-500 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1 transition-colors duration-300`}>{stat.number}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;