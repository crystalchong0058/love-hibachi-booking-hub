
import React, { useEffect } from 'react';

// Google Reviews Widget Component
const GoogleReviewsWidget = () => {
  useEffect(() => {
    // Create a script element for the Google Reviews widget
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mt-12 mb-16">

      {/* Elfsight Google Reviews Widget */}
      <div className="elfsight-app-f942b569-460b-4321-a43d-54299402bbf9" data-elfsight-app-lazy></div>
    </div>
  );
};

const Testimonials = () => {

  return (
    <section id="testimonials" className="py-16">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Don't just take our word for it. Here's what our happy customers have to say about their 4 U Sake Hibachi experience.
        </p>
        
        {/* Google Reviews Widget */}
        <GoogleReviewsWidget />


      </div>
    </section>
  );
};

export default Testimonials;
