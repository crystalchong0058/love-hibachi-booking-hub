import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';
import SubscriptionForm from './SubscriptionForm';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About Us</h4>
            <p className="text-gray-400">We are passionate about bringing the authentic hibachi experience to your private events. Serving delicious food with a side of entertainment!</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-white">Pricing</Link>
              </li>
              <li>
                <Link to="/#locations" className="hover:text-white">Locations</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="text-gray-400">
              <p className="flex items-center mb-2">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                (123) 456-7890
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mb-8">
        <div className="bg-hibachi-red/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="mb-6 max-w-xl mx-auto">Get the latest updates, special offers and event information directly to your inbox.</p>
          <SubscriptionForm />
        </div>
      </div>
      
      <div className="text-center text-gray-400">
        &copy; {new Date().getFullYear()} Hibachi Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
