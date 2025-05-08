import React from 'react';
import { MapPin, Calendar, Users, Mail, Phone } from 'lucide-react';

const ContactForm = () => {

  return (
    <section id="contact" className="py-16">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Reach out to us directly using the contact information below.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg border border-border">
            
            
            <div className="space-y-8">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-hibachi-red mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg">Phone</h4>
                  <p className="text-gray-600">Jason: (929) 688-1138 | Alex: (718)666-7955</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-hibachi-red mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-gray-600">4usakehibachicatering@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-hibachi-red mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg">Service Areas</h4>
                  <p className="text-gray-600 mb-1">East Coast: NY, NJ, MA, CT, PA, MD, VA, DC, DE, NC, SC, GA, FL</p>
                  <p className="text-gray-600">West Coast: CA, OR, WA, NV, AZ</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="w-6 h-6 text-hibachi-red mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg">Booking Notice</h4>
                  <p className="text-gray-600">We recommend booking at least 2 weeks in advance to secure your preferred date and chef.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-6 h-6 text-hibachi-red mt-1 mr-4" />
                <div>
                  <h4 className="font-medium text-lg">Group Size</h4>
                  <p className="text-gray-600">Our services are available with a $600 minimum charge.</p>
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
