
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X, MapPin, Users, Clock, CheckCircle, Mail } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// These would come from a backend API in a real application
const BOOKED_DATES = [
  new Date(2025, 3, 15),
  new Date(2025, 3, 18),
  new Date(2025, 3, 22),
  new Date(2025, 3, 29),
];

const UNAVAILABLE_DATES = [
  new Date(2025, 3, 10),
  new Date(2025, 3, 11),
  new Date(2025, 3, 12),
];

// Available time slots from 9pm to 11pm in 15 minute increments
const TIME_SLOTS = [
  "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM",
  "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",
  "11:00 PM"
];

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, plan }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [region, setRegion] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adultCount, setAdultCount] = useState<string>('2');
  const [childrenCount, setChildrenCount] = useState<string>('0');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total guests
  const totalGuests = Number(adultCount) + Number(childrenCount);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !region || !location || !adultCount || !name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (totalGuests < 10) {
      toast.error("Total guest count must be at least 10");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsBookingComplete(true);
      
      // In a real app, this would send emails through a backend API
      console.log("Booking details:", {
        plan,
        date: selectedDate,
        time: selectedTime,
        region,
        location,
        adultCount,
        childrenCount,
        totalGuests,
        name,
        email,
        phone
      });
      
      toast.success("Booking confirmed! A confirmation has been sent to your email.");
    }, 1500);
  };

  const isDateUnavailable = (date: Date) => {
    // Check if the date is in the booked or unavailable dates
    return BOOKED_DATES.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    ) || 
    UNAVAILABLE_DATES.some(unavailableDate => 
      unavailableDate.getDate() === date.getDate() && 
      unavailableDate.getMonth() === date.getMonth() && 
      unavailableDate.getFullYear() === date.getFullYear()
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          
          {isBookingComplete ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for booking with 4 U Love Hibachi Catering. We've sent a confirmation to your email.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md mx-auto text-left">
                <h4 className="font-bold mb-4 text-lg">Booking Details</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CalendarIcon className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Date</span>
                      <span>{selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : 'N/A'}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Time</span>
                      <span>{selectedTime}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Location</span>
                      <span>{region} - {location}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Package</span>
                      <span>{plan} Plan - {adultCount} adults, {childrenCount} children ({totalGuests} total)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Contact</span>
                      <span>{email}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <Button 
                onClick={onClose} 
                className="mt-6"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Book Your Hibachi Experience</h2>
              <p className="text-gray-600 mb-6">
                Select your preferred date and provide your details to book our {plan} Plan.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" /> Select Available Date
                  </h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < new Date() || // Past dates
                        isDateUnavailable(date)
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                        <span>Unavailable</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-hibachi-red rounded-full mr-2"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4 text-lg flex items-center">
                      <Clock className="w-5 h-5 mr-2" /> Select Time
                    </h3>
                    <div className="border rounded-md p-4 bg-gray-50">
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time (9pm-11pm)" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Complete Your Booking</h3>
                  <form onSubmit={handleBooking}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                        <select
                          id="region"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red"
                        >
                          <option value="">Select a region</option>
                          <option value="East Coast">East Coast</option>
                          <option value="West Coast">West Coast</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location Address *</label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          placeholder="Full address for the event"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adultCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Adults *</label>
                          <Input
                            id="adultCount"
                            type="number"
                            value={adultCount}
                            onChange={(e) => setAdultCount(e.target.value)}
                            required
                            min="1"
                            placeholder="Number of adults"
                          />
                        </div>
                        <div>
                          <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                          <Input
                            id="childrenCount"
                            type="number"
                            value={childrenCount}
                            onChange={(e) => setChildrenCount(e.target.value)}
                            min="0"
                            placeholder="Number of children"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm text-yellow-800">
                        <p>Total guests: <strong>{totalGuests}</strong> (Minimum 10 guests required)</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3">Contact Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="For confirmation email"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        disabled={!selectedDate || !selectedTime || totalGuests < 10 || isLoading}
                        className="w-full bg-hibachi-red hover:bg-hibachi-red/90 text-white"
                      >
                        {isLoading ? 'Processing...' : 'Complete Booking'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
