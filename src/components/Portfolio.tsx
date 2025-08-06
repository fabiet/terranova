import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const Portfolio = () => {
  const isDarkMode = true; // Static dark mode
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Modern Kitchen Renovation',
      before: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kitchen'
    },
    {
      id: 2,
      title: 'Luxury Bathroom Remodel',
      before: 'https://images.pexels.com/photos/7534557/pexels-photo-7534557.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/7534558/pexels-photo-7534558.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bathroom'
    },
    {
      id: 3,
      title: 'Living Room Transformation',
      before: 'https://images.pexels.com/photos/6782342/pexels-photo-6782342.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/6782343/pexels-photo-6782343.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Living Room'
    },
    {
      id: 4,
      title: 'Master Suite Upgrade',
      before: 'https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/6775269/pexels-photo-6775269.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bedroom'
    }
  ];

  return (
    <section id="portfolio" className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>Our Work</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
            Discover how we transform ordinary spaces into extraordinary living environments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                <div className="grid grid-cols-2 h-64">
                  {/* Before Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.before}
                      alt={`${project.title} - Before`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before
                    </div>
                  </div>
                  
                  {/* After Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.after}
                      alt={`${project.title} - After`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center text-white">
                    <Eye className="mx-auto mb-3 text-green-500" size={32} />
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-green-500 font-medium">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;