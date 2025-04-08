
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
    <div className="chef-card">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={chef.image} 
          alt={chef.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-hibachi-red text-white text-xs font-medium py-1 px-2 rounded">
          Master Chef
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{chef.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{chef.location}</span>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={14} 
              className={i < chef.rating ? "text-hibachi-gold fill-hibachi-gold" : "text-gray-300"} 
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 mb-3">{chef.experience}</p>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {chef.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        <a 
          href="#contact" 
          className="block text-center text-hibachi-red hover:text-hibachi-orange border border-hibachi-red hover:border-hibachi-orange py-2 px-4 rounded transition-colors"
        >
          Book This Chef
        </a>
      </div>
    </div>
  );
};

const Chefs = () => {
  const chefs: Chef[] = [
    {
      name: "Chef Takeshi",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop",
      location: "New York Region",
      rating: 5,
      experience: "15+ years of hibachi experience",
      specialties: ["Steak", "Seafood", "Vegetarian"]
    },
    {
      name: "Chef Miyako",
      image: "https://images.unsplash.com/photo-1581299894008-aaa75151526c?q=80&w=600&auto=format&fit=crop",
      location: "California Region",
      rating: 5,
      experience: "12+ years of hibachi experience",
      specialties: ["Seafood", "Chicken", "Special Sauces"]
    },
    {
      name: "Chef Hiro",
      image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?q=80&w=600&auto=format&fit=crop",
      location: "Massachusetts Region",
      rating: 5,
      experience: "20+ years of hibachi experience",
      specialties: ["Steak", "Chicken", "Show Techniques"]
    },
    {
      name: "Chef Ken",
      image: "https://images.unsplash.com/photo-1607631568561-3a970f0151a0?q=80&w=600&auto=format&fit=crop",
      location: "Georgia Region",
      rating: 5,
      experience: "10+ years of hibachi experience",
      specialties: ["Seafood", "Vegetarian", "Fried Rice"]
    }
  ];

  return (
    <section id="chefs" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Meet Our Master Chefs</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our talented hibachi chefs bring years of experience and showmanship to your event. 
          Each chef is trained in both culinary excellence and entertaining performance.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <ChefCard key={index} chef={chef} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;
