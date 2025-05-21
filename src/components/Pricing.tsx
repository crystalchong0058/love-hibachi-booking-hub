
import React, { useState } from 'react';
import { Check, Users, Baby, Calendar, ChefHat, Utensils, MapPin, X } from 'lucide-react';
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
              <p className="text-4xl font-bold">$50<span className="text-base font-normal text-gray-600">/person</span></p>
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
          </div>

          <div className="bg-white rounded-lg shadow-md border border-border p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <Baby className="w-8 h-8 text-hibachi-orange mr-2" />
              <h3 className="text-2xl font-bold">Children</h3>
              <span className="text-sm bg-gray-100 text-gray-700 rounded-full px-2 ml-2 flex-shrink-0">Under 13</span>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold">$25<span className="text-base font-normal text-gray-600">/child</span></p>
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
          </div>
        </div>
        


        <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-border max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Important Pricing Information</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span><strong>$500 minimum</strong> for all parties</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Price may vary based on event location</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Each session lasts approximately 1 hour 30 minutes</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-hibachi-red mt-0.5 mr-2 flex-shrink-0" />
              <span>Additional fees may apply for premium menu options</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg border border-border max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="bg-hibachi-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-hibachi-red" />
              </div>
              <h4 className="font-semibold mb-2">We Bring</h4>
              <p className="text-gray-600 text-sm">Chef, cooking gear, setup, and all food ingredients</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-hibachi-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-hibachi-gold" />
              </div>
              <h4 className="font-semibold mb-2">You Provide</h4>
              <p className="text-gray-600 text-sm">Tables, chairs, eating utensils, plates, bowls for salad, and drinks</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-hibachi-orange/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-hibachi-orange" />
              </div>
              <h4 className="font-semibold mb-2">Flexible Location</h4>
              <p className="text-gray-600 text-sm">We can cook inside or outside, including in parks or by the sea</p>
            </div>
          </div>
          <p className="text-center text-gray-700 mb-6">
            The host only has to set up tables and chairs, and provide plates and utensils. We bring our own hibachi grill and experienced chef. Each guest can choose their own customized meal. It starts with a side salad and comes with hibachi vegetables, fried rice, and 2 choices of protein.
          </p>
          <p className="text-center text-gray-700 mb-6">
            For groups of 50 or more, we provide a fantastic buffet-style catering option.
          </p>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg border border-border max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center">Menu Options</h3>
          
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-3 text-hibachi-red">Protein Choices</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Chicken</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Steak</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Shrimp</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Scallops</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Salmon</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Vegetable (+Tofu)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Filet Mignon (+$5)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Lobster Tail (+$10)</li>
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-3 text-hibachi-red">Appetizers</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Gyoza $10 (6pcs)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Edamame $5</li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-3 text-hibachi-red">Side Orders</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Chicken (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Steak (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Shrimp (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Scallops (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Salmon (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Vegetable (+Tofu) (+$10)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Noodles (+$4)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Filet Mignon (+$15)</li>
              <li className="flex items-center"><Check className="w-4 h-4 text-hibachi-gold mr-2" /> Lobster Tail (+$15)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setIsBookingOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <BookingModal plan={selectedPlan} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
