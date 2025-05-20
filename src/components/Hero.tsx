import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BookingModal from './BookingModal';

const Hero = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('canplay', () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsVideoLoaded(true))
            .catch(() => setIsVideoLoaded(false));
        }
      });
    }

    return () => {
      if (video) {
        video.removeEventListener('canplay', () => {});
      }
    };
  }, []);

  const handleOpenModal = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="absolute inset-0">
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/carouselhero/foodwithfire.jpg')",
            opacity: isVideoLoaded ? 0 : 0.7
          }}
        />
        
        {/* Video background */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ opacity: isVideoLoaded ? 0.7 : 0 }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
        >
          <source src="/videos/intro/fire burning.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container relative py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Private Hibachi Catering
        </h1>
        <div className="relative mb-6 overflow-hidden">
          <p className="text-2xl md:text-3xl font-bold text-hibachi-gold animate-slide-in">
            Eat Fresh, Stay Healthy
          </p>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-hibachi-red via-hibachi-gold to-hibachi-red"></div>
        </div>
        <p className="text-xl text-white mb-8 max-w-2xl animate-fade-in">
          Professional chefs bringing the excitement and flavors of hibachi cooking directly to your celebration. Serving both East and West Coast locations.
        </p>
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="text-2xl font-bold text-hibachi-gold mb-2">Pricing</div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-white">Adults:</span>
              <span className="text-hibachi-gold font-bold">$50/person</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">Children:</span>
              <span className="text-hibachi-gold font-bold">$25/person</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => handleOpenModal('Premium')} 
            className="btn-primary flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" /> Book Now
          </button>
          <Link to="/#pricing" className="btn-secondary flex items-center justify-center space-x-2">
            <span>View Pricing</span>
          </Link>
        </div>
        {/* Contact Info Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-hibachi-red" />
            <span>Jason: (929) 688-1138 | Alex: (718)666-7955</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-hibachi-red" />
            <span>Serving All Locations in the USA</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-hibachi-red" />
            <span>9:00 AM - 10:00 PM, 7 days a week</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#fff">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>

      {selectedPlan && (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-4xl">
            <BookingModal 
              plan={selectedPlan} 
              setIsModalOpen={setIsModalOpen} 
              setSelectedPlan={setSelectedPlan}
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Hero;
