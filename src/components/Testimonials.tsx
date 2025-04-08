
import React from 'react';
import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="testimony-card">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={16} 
            className={i < testimonial.rating ? "text-hibachi-gold fill-hibachi-gold" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-gray-700">{testimonial.text}</p>
    </div>
  );
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Jennifer K.",
      location: "New York, NY",
      rating: 5,
      text: "The chef was amazing! Everyone at my daughter's birthday party was impressed with both the food quality and the entertaining performance. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Robert M.",
      location: "Boston, MA",
      rating: 5,
      text: "We hired 4 U Love for our company holiday party and they exceeded our expectations. The food was delicious and the presentation was spectacular.",
      image: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      name: "Sarah T.",
      location: "Los Angeles, CA",
      rating: 5,
      text: "The best decision for our anniversary celebration! Our chef was professional, funny, and made the most delicious hibachi we've ever had. Worth every penny!",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      name: "Michael P.",
      location: "Atlanta, GA",
      rating: 4,
      text: "Great experience for my son's graduation party. The chef was punctual, professional and entertaining. Everyone loved the interactive experience.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Lisa J.",
      location: "Phoenix, AZ",
      rating: 5,
      text: "Absolutely amazing! The chef created a memorable experience for our family reunion. The food was exceptional and the service was top-notch.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "David W.",
      location: "Charlotte, NC",
      rating: 5,
      text: "From booking to the actual event, everything was smooth and professional. The chef was skilled and engaging. Will definitely book again!",
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  ];

  return (
    <section id="testimonials" className="py-16">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Don't just take our word for it. Here's what our happy customers have to say about their 4 U Love Hibachi experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
