
import React from 'react';
import { Users, Calendar, MapPin, ChefHat, Gift, Utensils } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-border transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      <div className="bg-hibachi-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-hibachi-red" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: ChefHat,
      title: "Expert Hibachi Chefs",
      description: "Our professional chefs bring years of experience and entertainment to your event."
    },
    {
      icon: Users,
      title: "Private & Corporate Events",
      description: "Perfect for birthdays, anniversaries, corporate gatherings and special celebrations."
    },
    {
      icon: MapPin,
      title: "East Coast Service",
      description: "Serving NY, NJ, MA, CT, PA, MD, VA, DC, DE, NC, SC, and GA."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book your hibachi experience at a time that works for your event."
    },
    {
      icon: Utensils,
      title: "Customized Menus",
      description: "Tailor your hibachi experience with personalized menu options for all guests."
    },
    {
      icon: Gift,
      title: "Special Occasion Packages",
      description: "Enhanced service options for weddings, milestone birthdays, and anniversaries."
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We offer premium hibachi catering services that bring the restaurant experience directly to your venue of choice.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
