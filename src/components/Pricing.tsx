
import React, { useState } from 'react';
import { Check, Users, Baby, Calendar } from 'lucide-react';
import BookingModal from './BookingModal';

const Pricing = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleBookNow = (plan: string) => {
    setSelectedPlan(plan);
    setIsBookingOpen(true);
  };

  return (
    <section id="pricing" className="py-16">
      <div className="container">
        <h2 className="section-title">Hibachi Pricing</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our hibachi catering packages are designed to provide an exceptional experience for all your guests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-border p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 bg-hibachi-red text-white py-1 px-4 text-sm font-medium">
              Most Popular
            </div>
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-hibachi-red mr-2" />
              <h3 className="text-2xl font-bold">Adults</h3>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold">$60<span className="text-base font-normal text-gray-600">/person</span></p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Full hibachi experience with professional chef</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Live cooking and entertainment</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Protein, vegetable, and rice options</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Special hibachi sauces</span>
              </li>
            </ul>
            <button 
              onClick={() => handleBookNow('Adult')} 
              className="btn-primary w-full text-center flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" /> Book Date
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-border p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <Baby className="w-8 h-8 text-hibachi-orange mr-2" />
              <h3 className="text-2xl font-bold">Children</h3>
              <span className="text-sm bg-gray-100 text-gray-700 rounded-full px-2 ml-2 flex-shrink-0">Under 13</span>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold">$30<span className="text-base font-normal text-gray-600">/child</span></p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Kid-friendly hibachi experience</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Smaller portion sizes</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Child-safe entertainment</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-hibachi-gold mt-0.5 mr-2 flex-shrink-0" />
                <span>Special hibachi tricks for kids</span>
              </li>
            </ul>
            <button 
              onClick={() => handleBookNow('Child')} 
              className="btn-secondary w-full text-center flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" /> Book Date
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-border max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Important Pricing Information</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span><strong>$600 minimum</strong> for all parties</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Price may vary based on event location</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Each session lasts approximately 1 hour and 30 minutes</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Additional fees may apply for premium menu options</span>
            </li>
          </ul>
        </div>
      </div>
      
      {isBookingOpen && (
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          plan={selectedPlan}
        />
      )}
    </section>
  );
};

export default Pricing;
