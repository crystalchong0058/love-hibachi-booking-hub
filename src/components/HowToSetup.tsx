import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HowToSetup = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const steps = [
    {
      title: 'Choose Your Location',
      description: 'Select a suitable space in your home or venue with enough room for the hibachi setup and guests.',
      image: '/images/howtosetup/1.png'
    },
    {
      title: 'Set Up Tables',
      description: 'Arrange tables and chairs for your guests. We recommend a U-shaped or rectangular setup.',
      image: '/images/howtosetup/2.png'
    },
    {
      title: 'Welcome the Chef',
      description: 'Our professional chef arrives with all necessary equipment and ingredients.',
      image: '/images/howtosetup/3.png'
    },
    {
      title: 'Payment & Cancellation Policy',
      description: (
        <div className="space-y-2">
          <p className="font-medium">Accepted Payment Methods:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cash</li>
            <li>Zelle</li>
            <li>Venmo</li>
            <li>PayPal</li>
          </ul>
          <p className="mt-2">A 20% deposit is required to secure your booking.</p>
          <p className="font-medium mt-4">Cancellation Policy:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>72+ hours before event: Full deposit refund</li>
            <li>Less than 72 hours: Deposit is non-refundable</li>
          </ul>
        </div>
      ),
      image: '/images/howtosetup/4.png'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="section-title">How to Set Up</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Follow these simple steps to prepare for your hibachi experience
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-hibachi-red mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-hibachi-red" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-hibachi-red" />
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-hibachi-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToSetup; 