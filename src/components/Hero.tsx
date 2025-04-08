
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="container relative py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">
          Experience <span className="text-hibachi-gold">Authentic Hibachi</span> Catering for Your Special Event
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">
          Professional chefs bringing the excitement and flavors of hibachi cooking directly to your celebration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="btn-primary flex items-center justify-center space-x-2">
            <span>Book Your Experience</span>
            <ArrowRight size={18} />
          </a>
          <a href="#pricing" className="btn-secondary flex items-center justify-center space-x-2">
            <span>View Pricing</span>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#fff">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
