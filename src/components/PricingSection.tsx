
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BookingModal from './BookingModal';

interface PricingSectionCardProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PricingSectionCard = ({ title, price, features, popular }: PricingSectionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`relative flex flex-col p-6 rounded-2xl shadow-lg ${popular ? 'bg-gradient-to-br from-hibachi-gold to-hibachi-red text-white scale-105 z-10' : 'bg-white'}`}>
      {popular && (
        <div className="absolute top-4 right-4 bg-white text-hibachi-red font-bold px-2 py-1 rounded-md text-sm">
          Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-5xl font-extrabold text-center mb-6">{price}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Button onClick={() => setIsModalOpen(true)} className="w-full mt-auto">
        Book Now
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <BookingModal plan={title} setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingSectionCard;
