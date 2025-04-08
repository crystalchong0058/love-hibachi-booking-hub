import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X, MapPin, Users, Clock, CheckCircle, Mail, Phone } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Initialize EmailJS with Gmail service
emailjs.init("LCOpJ2w6UegSang_j");

// These would come from a backend API in a real application
const BOOKED_DATES = [
  new Date(2025, 3, 15),
  new Date(2025, 3, 18),
  new Date(2025, 3, 22),
  new Date(2025, 3, 29),
];

const UNAVAILABLE_DATES = [];

// Available time slots from 9am to 11pm in 15 minute increments
const HOURS = Array.from({ length: 15 }, (_, i) => i + 9); // 9 AM to 11 PM
const MINUTES = ['00', '15', '30', '45'];

interface BookingModalProps {
  plan: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ plan }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [region, setRegion] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adultCount, setAdultCount] = useState<string>('2');
  const [childrenCount, setChildrenCount] = useState<string>('0');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState<{[key: string]: string[]}>({});

  // Calculate total guests
  const totalGuests = Number(adultCount) + Number(childrenCount);

  // Function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  // Function to check if a time slot is booked
  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return bookedTimeSlots[dateKey]?.includes(time) || false;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !startTime || !endTime || !region || !location || !adultCount || !name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (totalGuests < 10) {
      toast.error("Total guest count must be at least 10");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate a random 5-digit order ID
      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      const orderId = "HIB-" + randomDigits.toString();

      // Prepare email template parameters
      const emailParams = {
        to_name: name,
        to_email: email.trim(),
        date: format(selectedDate, 'EEEE, MMMM do, yyyy'),
        time: `${startTime} - ${endTime}`,
        location: `${region} - ${location}`,
        plan: plan,
        adults: adultCount,
        children: childrenCount,
        total_guests: totalGuests,
        contact_email: email.trim(),
        contact_phone: phone,
        business_phone: "(929) 688-1138",
        customer_name: name,
        booking_date: format(selectedDate, 'EEEE, MMMM do, yyyy'),
        booking_time: `${startTime} - ${endTime}`,
        booking_location: `${region} - ${location}`,
        package_type: plan,
        adult_count: adultCount,
        children_count: childrenCount,
        total_guest_count: totalGuests,
        email: email.trim(),
        phone_number: phone,
        order_id: orderId
      };

      console.log('Attempting to send customer email with params:', emailParams);

      // Send email to customer
      const customerResult = await emailjs.send(
        "service_df3zxal",
        "template_uy7nh4f",
        emailParams
      ).catch(error => {
        console.error('Customer email error details:', {
          error,
          status: error.status,
          text: error.text,
          response: error.response,
          params: emailParams
        });
        throw new Error(`Customer email failed: ${error.text || error.message}`);
      });

      console.log('Customer email result:', customerResult);

      if (customerResult.status !== 200) {
        throw new Error(`Failed to send customer email: ${customerResult.status}`);
      }

      // Send email to business
      const businessParams = {
        ...emailParams,
        to_email: "crystalyschong@gmail.com",
        to_name: "4 U Love Hibachi"
      };

      console.log('Attempting to send business email with params:', businessParams);

      const businessResult = await emailjs.send(
        "service_df3zxal",
        "template_y12igxq",
        businessParams
      ).catch(error => {
        console.error('Business email error details:', {
          error,
          status: error.status,
          text: error.text,
          response: error.response
        });
        throw new Error(`Business email failed: ${error.text || error.message}`);
      });

      console.log('Business email result:', businessResult);

      if (businessResult.status !== 200) {
        throw new Error(`Failed to send business email: ${businessResult.status}`);
      }

      // After successful booking, update booked dates and times
      if (selectedDate) {
        setBookedDates(prev => [...prev, selectedDate]);
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setBookedTimeSlots(prev => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), startTime, endTime]
        }));
      }

      setIsBookingComplete(true);
      toast.success("Booking confirmed! Confirmations have been sent to your email and the business.");
    } catch (error) {
      console.error('Detailed error in handleBooking:', error);
      toast.error(`Failed to send notifications: ${error.message}. Please try again or contact us directly.`);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button 
            onClick={() => window.location.reload()} 
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
                      <span>{startTime} - {endTime}</span>
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
                  <li className="flex items-start">
                    <Phone className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Business Contact</span>
                      <span>(929) 688-1138</span>
                    </div>
                  </li>
                </ul>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
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
                        isDateBooked(date) // Booked dates
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
                    <div className="border rounded-md p-4 bg-gray-50 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                        <Select
                          value={startTime}
                          onValueChange={setStartTime}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select start time (9am-11pm)" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => (
                              <SelectItem 
                                key={hour} 
                                value={`${hour}:00`}
                                disabled={isTimeSlotBooked(`${hour}:00`)}
                              >
                                {hour}:00
                              </SelectItem>
                            ))}
                            {HOURS.map((hour) => (
                              <SelectItem 
                                key={`${hour}:15`} 
                                value={`${hour}:15`}
                                disabled={isTimeSlotBooked(`${hour}:15`)}
                              >
                                {hour}:15
                              </SelectItem>
                            ))}
                            {HOURS.map((hour) => (
                              <SelectItem 
                                key={`${hour}:30`} 
                                value={`${hour}:30`}
                                disabled={isTimeSlotBooked(`${hour}:30`)}
                              >
                                {hour}:30
                              </SelectItem>
                            ))}
                            {HOURS.map((hour) => (
                              <SelectItem 
                                key={`${hour}:45`} 
                                value={`${hour}:45`}
                                disabled={isTimeSlotBooked(`${hour}:45`)}
                              >
                                {hour}:45
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                        <Select
                          value={endTime}
                          onValueChange={setEndTime}
                          disabled={!startTime}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select end time" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => {
                              const time = `${hour}:00`;
                              if (startTime && time <= startTime) return null;
                              return (
                                <SelectItem 
                                  key={time} 
                                  value={time}
                                  disabled={isTimeSlotBooked(time)}
                                >
                                  {time}
                                </SelectItem>
                              );
                            })}
                            {HOURS.map((hour) => {
                              const time = `${hour}:15`;
                              if (startTime && time <= startTime) return null;
                              return (
                                <SelectItem 
                                  key={time} 
                                  value={time}
                                  disabled={isTimeSlotBooked(time)}
                                >
                                  {time}
                                </SelectItem>
                              );
                            })}
                            {HOURS.map((hour) => {
                              const time = `${hour}:30`;
                              if (startTime && time <= startTime) return null;
                              return (
                                <SelectItem 
                                  key={time} 
                                  value={time}
                                  disabled={isTimeSlotBooked(time)}
                                >
                                  {time}
                                </SelectItem>
                              );
                            })}
                            {HOURS.map((hour) => {
                              const time = `${hour}:45`;
                              if (startTime && time <= startTime) return null;
                              return (
                                <SelectItem 
                                  key={time} 
                                  value={time}
                                  disabled={isTimeSlotBooked(time)}
                                >
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
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
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
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
                        disabled={!selectedDate || !startTime || !endTime || totalGuests < 10 || isLoading}
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
