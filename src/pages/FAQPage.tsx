import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section for FAQ page */}
        <section className="relative bg-gray-900 py-20 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
          </div>
          
          <div className="container max-w-5xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 text-white mb-8 md:mb-0 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-xl opacity-90 max-w-2xl">
                  Find answers to common questions about our hibachi catering services
                </p>
              </div>
              <div className="md:w-1/3">
                <div className="bg-hibachi-red p-6 rounded-lg shadow-lg relative">
                  <div className="absolute -top-3 -right-3 bg-hibachi-gold text-white text-sm font-bold py-1 px-3 rounded-full">FAQ</div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hibachi-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Have Questions?</p>
                  </div>
                  <p className="text-white/90 text-sm mb-4">
                    Browse our FAQ section to find answers to the most common questions about our hibachi catering services.
                  </p>
                  <div className="flex justify-between text-white/80 text-xs">
                    <span>Updated regularly</span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Component */}
        <FAQ />
        
        {/* Call to action */}
        <section className="bg-gray-100 py-12">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8">
              If you couldn't find the answer to your question, feel free to reach out to us directly.
              Our team is always happy to help!
            </p>
            <Link 
              to="/contact" 
              className="bg-hibachi-red hover:bg-hibachi-red/90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center"
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

export default FAQPage;