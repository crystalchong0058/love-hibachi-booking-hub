import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookingModal from './BookingModal';

interface LocationCardProps {
  title: string;
  states: string[];
  videoId: string;
  onClick: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ title, states, videoId, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-[200%] h-[140%] -translate-x-[25%] -translate-y-[20%]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&background=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {states.map((state) => (
            <span 
              key={state}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {state}
            </span>
          ))}
        </div>
        <button
          onClick={onClick}
          className="w-full bg-hibachi-red text-white py-2 px-4 rounded-md hover:bg-hibachi-red/90 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Book Now
        </button>
      </div>
    </div>
  );
};

const Locations: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const regions = [
    {
      title: 'East Coast',
      states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'DC', 'VA', 'WV', 'NC', 'SC', 'GA', 'FL'],
      videoId: 'h3fUgOKFMNU' // New York City skyline timelapse
    },
    {
      title: 'West Coast',
      states: ['WA', 'OR', 'CA', 'AK', 'HI'],
      videoId: '8FCiSy3oboc' // California coastline drone footage
    },
    {
      title: 'Midwest',
      states: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
      videoId: 'QkaM46EUeds' // Chicago skyline timelapse
    },
    {
      title: 'South',
      states: ['KY', 'TN', 'AL', 'MS', 'AR', 'LA', 'OK', 'TX'],
      videoId: 'QUGu3F6cCWs' // Texas landscape drone footage
    },
    {
      title: 'Mountain',
      states: ['MT', 'ID', 'WY', 'CO', 'NM', 'AZ', 'UT', 'NV'],
      videoId: 'vINU4qZqoO0' // Rocky Mountains aerial view
    }
  ];

  return (
    <section id="locations" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Our Service Areas</h2>
        <p className="text-center text-lg text-gray-600 italic mb-8">"Eat Fresh, Stay Healthy"</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {regions.map((region) => (
            <LocationCard 
              key={region.title}
              title={region.title}
              states={region.states}
              videoId={region.videoId}
              onClick={handleBookNow}
            />
          ))}
        </div>

        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-4xl">
            <BookingModal setIsModalOpen={setIsModalOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Locations;
