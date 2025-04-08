
import React, { useState } from 'react';
import { MapPin, Calendar, Users, Mail, Phone, Send } from 'lucide-react';
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    location: '',
    region: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success message
    toast.success("Your booking inquiry has been submitted! We'll contact you shortly.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
      location: '',
      region: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16">
      <div className="container">
        <h2 className="section-title">Book Your Hibachi Experience</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Fill out the form below to inquire about our hibachi catering services. 
          We'll get back to you within 24 hours to discuss your event details.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    min="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                    placeholder="Minimum 10 guests"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                  >
                    <option value="">Select a region</option>
                    <option value="East Coast">East Coast</option>
                    <option value="West Coast">West Coast</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Event Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                  placeholder="Full address of your event"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                  placeholder="Tell us more about your event, dietary restrictions, etc."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Submit Booking Request
              </button>
            </form>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg border border-border h-full">
              <h3 className="text-xl font-bold mb-6 text-center">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-hibachi-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">(123) 456-7890</p>
                    <p className="text-gray-600">(987) 654-3210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-hibachi-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">bookings@4ulovehibachi.com</p>
                    <p className="text-gray-600">info@4ulovehibachi.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-hibachi-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Service Areas</h4>
                    <p className="text-gray-600 mb-1">East Coast: NY, NJ, MA, CT, PA, MD, VA, DC, DE, NC, SC, GA</p>
                    <p className="text-gray-600">West Coast: AZ, CA, NV (Las Vegas)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-hibachi-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Booking Notice</h4>
                    <p className="text-gray-600">We recommend booking at least 2 weeks in advance to secure your preferred date and chef.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-hibachi-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Group Size</h4>
                    <p className="text-gray-600">Our services are available for groups of 10 or more people with a $600 minimum charge.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
