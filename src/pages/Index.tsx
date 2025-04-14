import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Locations from '../components/Locations';
import Chefs from '../components/Chefs';
import MomentsGallery from '../components/MomentsGallery';
import Testimonials from '../components/Testimonials';
import QRCodeSection from '../components/QRCodeSection';
import Footer from '../components/Footer';
import { useScrollToHash } from '../hooks/useScrollToHash';

const Index = () => {
  // Use the custom hook to scroll to the hash element
  useScrollToHash();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Pricing />
        <Locations />
        <Chefs />
        <QRCodeSection />
        <MomentsGallery />
        <Testimonials />
        
        {/* Contact CTA Section */}
        <section className="py-16 bg-hibachi-red text-white" id="contact-cta">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Hibachi Experience?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Contact us today to schedule your personalized hibachi catering event.
            </p>
            <Link 
              to="/contact" 
              className="bg-white text-hibachi-red hover:bg-white/90 font-medium py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
