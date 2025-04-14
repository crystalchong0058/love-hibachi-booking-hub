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
        

      </main>
      <Footer />
    </div>
  );
};

export default Index;
