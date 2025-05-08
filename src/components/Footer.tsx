
import React from 'react';
import { Flame, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscriptionForm from './SubscriptionForm';
import SectionLink from './ui/section-link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container">
        {/* Subscription Form */}
        <div className="mb-10">
          <SubscriptionForm />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-8 h-8 text-hibachi-gold" />
              <div>
                <h2 className="text-xl font-bold leading-tight">
                  <span className="text-hibachi-gold">4 U Sake</span>
                </h2>
                <p className="text-xs font-medium text-gray-400 -mt-1">Hibachi Catering</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Experience the art of hibachi catering with our professional chefs who bring the excitement and flavors directly to your event.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hibachi-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hibachi-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hibachi-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-hibachi-gold transition-colors">Home</Link></li>
              <li><SectionLink to="/#services" className="text-gray-400 hover:text-hibachi-gold transition-colors">Services</SectionLink></li>
              <li><SectionLink to="/#pricing" className="text-gray-400 hover:text-hibachi-gold transition-colors">Pricing</SectionLink></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-hibachi-gold transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-hibachi-gold transition-colors">Contact Us</Link></li>
              <li><SectionLink to="/#testimonials" className="text-gray-400 hover:text-hibachi-gold transition-colors">Testimonials</SectionLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-hibachi-gold mt-0.5" />
                <span className="text-gray-400">Serving Every State in United States</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-hibachi-gold" />
                <a href="tel:+19296881138" className="text-gray-400 hover:text-hibachi-gold transition-colors">
                  Jason: (929) 688-1138 | Alex: (718)666-7955
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-hibachi-gold" />
                <a href="mailto:4usakecatering@gmail.com" className="text-gray-400 hover:text-hibachi-gold transition-colors">
                  4usakehibachicatering@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} 4 U Sake Hibachi Catering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
