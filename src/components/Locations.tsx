
import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const LocationCard = ({ 
  title, 
  states, 
  image, 
  onClick 
}: { 
  title: string; 
  states: string[]; 
  image: string; 
  onClick: () => void;
}) => {
  return (
    <div className="location-card group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <div className="flex items-center text-gray-200">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">Serving these areas</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {states.map((state, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar size={18} className="mr-2" />
          <span>1 hour 30 minutes service</span>
        </div>
        <button 
          onClick={onClick}
          className="btn-secondary w-full flex items-center justify-center"
        >
          <span>Book Now</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const Locations = () => {

  const handleBookNow = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="locations" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Our Service Areas</h2>
        
        <div className="grid grid-cols-1 max-w-md mx-auto">
          <LocationCard 
            title="East Coast" 
            states={['NY', 'NJ', 'MA', 'CT', 'PA', 'MD', 'VA', 'DC', 'DE', 'NC', 'SC', 'GA']} 
            image="https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=1500&auto=format&fit=crop"
            onClick={handleBookNow}
          />
        </div>
      </div>
    </section>
  );
};

export default Locations;
