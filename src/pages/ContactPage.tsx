import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section for Contact page */}

        
        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl mx-auto px-4">
            <ContactForm />
          </div>
        </section>
        

      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;