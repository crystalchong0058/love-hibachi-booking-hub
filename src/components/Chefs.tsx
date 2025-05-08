import React from 'react';
import { Star, MapPin } from 'lucide-react';

type Chef = {
  name: string;
  image: string;
  location: string;
  rating: number;
  experience: string;
  specialties: string[];
};

const ChefCard = ({ chef }: { chef: Chef }) => {
  return (
    <div className="chef-card grid md:grid-cols-2 gap-6 items-center">
      <div className="aspect-square relative overflow-hidden rounded-lg">
        <video 
          src="/images/moments/profilepic/profile.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading video:', e);
            const videoElement = e.target as HTMLVideoElement;
            videoElement.style.display = 'none';
          }}
        />
        <div className="absolute top-4 right-4 bg-hibachi-red text-white text-xs font-medium py-1 px-2 rounded">
          Master Chef
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-3xl font-bold mb-4">{chef.name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={20} className="mr-2" />
          <span className="text-base">{chef.location}</span>
        </div>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={20} 
              className={i < chef.rating ? "text-hibachi-gold fill-hibachi-gold" : "text-gray-300"} 
            />
          ))}
        </div>
        <p className="text-lg text-gray-700 mb-4">{chef.experience}</p>
        <div className="mb-6">
          <p className="text-lg font-medium mb-3">Culinary Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {chef.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        <a 
          href="#pricing" 
          className="btn-primary inline-block"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

const Chefs = () => {
  const chef: Chef = {
    name: "Chef Jason",
    image: "/images/moments/profilepic/profile.mp4",
    location: "East Coast Region",
    rating: 5,
    experience: "Master Hibachi Chef with years of culinary excellence and dedication to customer satisfaction makes her a favorite among our clients.",
    specialties: ["Steak Mastery", "Seafood Artistry", "Interactive Cooking Performance"]
  };

  return (
    <section id="chef" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Our Master Chef</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Meet the culinary artist who transforms every hibachi experience into an unforgettable celebration of flavor and entertainment.
        </p>
        
        <ChefCard chef={chef} />
      </div>
    </section>
  );
};

export default Chefs;

