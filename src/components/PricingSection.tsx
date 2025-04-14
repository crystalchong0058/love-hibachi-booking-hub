import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import BookingModal from './BookingModal';

interface PricingPlan {
  name: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  features: string[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    description: "Perfect for small gatherings",
    adultPrice: 35,
    childPrice: 20,
    features: [
      "Up to 2 hours of entertainment",
      "Basic menu options",
      "Standard teppanyaki show",
      "Up to 20 guests"
    ]
  },
  {
    name: "Premium",
    description: "Ideal for medium-sized events",
    adultPrice: 45,
    childPrice: 25,
    features: [
      "Up to 3 hours of entertainment",
      "Expanded menu options",
      "Enhanced teppanyaki show",
      "Up to 40 guests",
      "Complimentary appetizers"
    ]
  },
  {
    name: "Deluxe",
    description: "The ultimate hibachi experience",
    adultPrice: 55,
    childPrice: 30,
    features: [
      "Up to 4 hours of entertainment",
      "Full menu access",
      "Premium teppanyaki show",
      "Up to 60 guests",
      "Complimentary appetizers",
      "Dessert included"
    ]
  }
];

const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing Plans</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your event. All plans include our signature hibachi experience with professional chefs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-hibachi-red mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Adults (12+):</span>
                    <span className="font-semibold">${plan.adultPrice}/person</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Children (under 12):</span>
                    <span className="font-semibold">${plan.childPrice}/person</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-hibachi-red mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-hibachi-red hover:bg-hibachi-red/90"
                  onClick={() => handleOpenModal(plan.name)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="max-w-4xl">
              <BookingModal plan={selectedPlan} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default PricingSection; 