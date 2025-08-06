import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase, ContactSubmission } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Kitchen Renovation',
    'Bathroom Remodel',
    'Flooring Installation',
    'Interior Lighting',
    'Full Home Renovation',
    'Commercial Project',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      project_type: '',
      message: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error('Message is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData: Omit<ContactSubmission, 'id' | 'created_at'> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        project_type: formData.project_type.trim() || null,
        message: formData.message.trim(),
        source: 'website'
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        throw error;
      }

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      resetForm();
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="bg-black/50 border-gray-800 p-8 rounded-xl border h-fit flex flex-col">
        <h3 className="text-2xl font-semibold text-white mb-6">
          Start Your Project
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                aria-label="Full name"
                className="w-full px-4 py-3 rounded-lg border bg-zinc-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                aria-label="Email address"
                className="w-full px-4 py-3 rounded-lg border bg-zinc-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Phone number"
                className="w-full px-4 py-3 rounded-lg border bg-zinc-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Type
              </label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Project type"
                className="w-full px-4 py-3 rounded-lg border bg-zinc-800 border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50"
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Details *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              aria-label="Project details"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border bg-zinc-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 resize-none disabled:opacity-50"
              placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 inline-flex items-center justify-center gap-3"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm; 