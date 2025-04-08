import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Locations from '../components/Locations';
import Chefs from '../components/Chefs';
import ContactForm from '../components/ContactForm';
import MomentsGallery from '../components/MomentsGallery';
import QRCodeSection from '../components/QRCodeSection';
import Footer from '../components/Footer';

const Index = () => {
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
        <ContactForm />
        <MomentsGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
