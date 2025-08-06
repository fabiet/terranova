import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const isDarkMode = true; // Static dark mode

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Terranova transformed our outdated kitchen into a modern masterpiece. Their attention to detail and quality of work exceeded all our expectations. Every aspect was handled with professionalism and care.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Michael Chen',
      role: 'Property Developer',
      content: 'Working with Terranova on multiple properties has been exceptional. Their innovative design solutions and flawless execution have consistently added significant value to our developments.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      content: 'As a fellow designer, I appreciate Terranova\'s commitment to excellence. Their craftsmanship and ability to bring complex visions to life is truly remarkable. Highly recommend their services.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <section id="testimonials" className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>What Our Clients Say</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
            Don't just take our word for it - hear from satisfied clients who've experienced the Terranova difference
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-zinc-900 border-gray-800' : 'bg-gray-50 border-gray-200'} p-8 rounded-xl border hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105`}
            >
              <div className="text-green-500 mb-6">
                <Quote size={32} />
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-green-500 fill-current" />
                ))}
              </div>

              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed italic transition-colors duration-300`}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-500/30"
                />
                <div>
                  <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold transition-colors duration-300`}>{testimonial.name}</h4>
                  <p className="text-green-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;