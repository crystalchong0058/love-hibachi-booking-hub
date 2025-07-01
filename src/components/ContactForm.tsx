import React from 'react';
import { MapPin, Calendar, Users, Mail, Phone } from 'lucide-react';

const ContactForm = () => {

  return (
    <section id="contact" className="py-16">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Reach out to us directly using the contact form below or our contact information.
        </p>
        
        <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg border border-border">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Contact Information</h3>
            
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
                  <p className="text-gray-600">Our services are available with a $500 minimum charge.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Google Forms Contact Form */}
          <div className="mb-12">
            <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
  
              <div className="flex justify-center">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSe54Ky-bQOLgdWR8uceFF60IBHKkhxEVTBx6lOFw0WyEP9MbA/viewform?embedded=true" 
                  width={640} 
                  height={670} 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  title="Contact Form"
                  className="w-full max-w-2xl"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
