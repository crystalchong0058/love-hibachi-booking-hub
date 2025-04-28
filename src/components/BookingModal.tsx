import React, { useState, useEffect } from 'react';
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

// Function to retrieve booked time slots from localStorage
const getBookedData = () => {
  const storedTimeSlots = localStorage.getItem('bookedTimeSlots');
  
  return {
    bookedTimeSlots: storedTimeSlots ? JSON.parse(storedTimeSlots) : {}
  };
};

// Available time slots from 9am to 11pm in 15 minute increments
const HOURS = Array.from({ length: 15 }, (_, i) => i + 9); // 9 AM to 11 PM
const MINUTES = ['00', '15', '30', '45'];

interface BookingModalProps {
  plan: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedPlan: (plan: string | null) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ plan, setIsModalOpen, setSelectedPlan }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<string>("");
  const [state, setState] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [adultCount, setAdultCount] = useState<string>('2');
  const [childrenCount, setChildrenCount] = useState<string>('0');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [foodOrderDetails, setFoodOrderDetails] = useState<string>('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // ... existing code ...
  });
  
  // Protein choices with quantities
  const [proteinQuantities, setProteinQuantities] = useState<{[key: string]: number}>({
    chicken: 0,
    steak: 0,
    shrimp: 0,
    scallops: 0,
    salmon: 0,
    vegetable: 0,
    tofu: 0,
    filetMignon: 0,
    lobsterTail: 0
  });
  
  // Appetizers
  const [appetizers, setAppetizers] = useState<{[key: string]: boolean}>({
    gyoza: false,
    edamame: false
  });
  
  // Side orders
  const [sideOrders, setSideOrders] = useState<{[key: string]: boolean}>({
    chickenSide: false,
    steakSide: false,
    shrimpSide: false,
    scallopsSide: false,
    salmonSide: false,
    vegetableSide: false,
    noodles: false,
    filetMignonSide: false,
    lobsterTailSide: false
  });
  
  // Get booked time slots from localStorage
  const { bookedTimeSlots: initialBookedTimeSlots } = getBookedData();
  const [bookedTimeSlots, setBookedTimeSlots] = useState<{[key: string]: string[]}>(initialBookedTimeSlots);

  // Calculate total guests
  const totalGuests = Number(adultCount) + Number(childrenCount);
  
  // No longer limiting protein choices
  
  // Calculate additional costs from selections
  const calculateAdditionalCosts = () => {
    let additionalCost = 0;
    
    // Premium protein costs
    additionalCost += proteinQuantities.filetMignon * 5; // $5 per Filet Mignon
    additionalCost += proteinQuantities.lobsterTail * 10; // $10 per Lobster Tail
    
    // Appetizers
    if (appetizers.gyoza) additionalCost += 10;
    if (appetizers.edamame) additionalCost += 5;
    
    // Side orders
    if (sideOrders.chickenSide) additionalCost += 10;
    if (sideOrders.steakSide) additionalCost += 10;
    if (sideOrders.shrimpSide) additionalCost += 10;
    if (sideOrders.scallopsSide) additionalCost += 10;
    if (sideOrders.salmonSide) additionalCost += 10;
    if (sideOrders.vegetableSide) additionalCost += 10;
    if (sideOrders.noodles) additionalCost += 4;
    if (sideOrders.filetMignonSide) additionalCost += 15;
    if (sideOrders.lobsterTailSide) additionalCost += 15;
    
    return additionalCost;
  };
  
  const additionalCosts = calculateAdditionalCosts();

  // No longer need to check if a date is booked

  // Function to check if a time slot is booked or within 2 hours of a booked slot
  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    
    // If there are no booked slots for this date, return false
    if (!bookedTimeSlots[dateKey] || bookedTimeSlots[dateKey].length === 0) {
      return false;
    }
    
    // Parse the time slot to check
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    const timeInMinutes = hour * 60 + minute;
    
    // Check if this time slot is within 2 hours of any booked slot
    return bookedTimeSlots[dateKey].some(bookedTime => {
      const [bookedHourStr, bookedMinuteStr] = bookedTime.split(':');
      const bookedHour = parseInt(bookedHourStr);
      const bookedMinute = parseInt(bookedMinuteStr);
      const bookedTimeInMinutes = bookedHour * 60 + bookedMinute;
      
      // Check if the time slot is within 2 hours (120 minutes) after the booked slot
      return timeInMinutes >= bookedTimeInMinutes && timeInMinutes < bookedTimeInMinutes + 120;
    });
  };

  // Save only booked time slots to localStorage
  useEffect(() => {
    localStorage.setItem('bookedTimeSlots', JSON.stringify(bookedTimeSlots));
  }, [bookedTimeSlots]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !startTime || !state || !location || !adultCount || !name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Check if the exact protein count is met (2 per person)
    const totalProteinCount = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
    const requiredProteinCount = totalGuests * 2;
    
    if (totalProteinCount === 0) {
      toast.error("Please select at least one protein");
      return;
    }
    
    if (totalProteinCount !== requiredProteinCount) {
      toast.error(`You must select exactly ${requiredProteinCount} proteins (2 per person). You've selected ${totalProteinCount}.`);
      return;
    }
    
    if (totalGuests < 10) {
      toast.error("Total guest count must be at least 10");
      return;
    }
    
    // Check if the booking meets the $500 minimum requirement
    const adultTotal = Number(adultCount) * 60;
    const childTotal = Number(childrenCount) * 30;
    const totalAmount = adultTotal + childTotal + additionalCosts;
    
    if (totalAmount < 500) {
      toast.error("Booking must meet the $500 minimum requirement");
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

      // Calculate pricing details
      const adultTotal = Number(adultCount) * 60;
      const childTotal = Number(childrenCount) * 30;
      const totalAmount = adultTotal + childTotal + additionalCosts;
      
      // Prepare selected protein choices with quantities
      const selectedProteins = Object.entries(proteinQuantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([protein, quantity]) => {
          let proteinName;
          switch(protein) {
            case 'chicken': proteinName = 'Chicken'; break;
            case 'steak': proteinName = 'Steak'; break;
            case 'shrimp': proteinName = 'Shrimp'; break;
            case 'scallops': proteinName = 'Scallops'; break;
            case 'salmon': proteinName = 'Salmon'; break;
            case 'vegetable': proteinName = 'Vegetable'; break;
            case 'tofu': proteinName = 'Tofu'; break;
            case 'filetMignon': proteinName = 'Filet Mignon (+$5 per person)'; break;
            case 'lobsterTail': proteinName = 'Lobster Tail (+$10 per person)'; break;
            default: proteinName = '';
          }
          return `${quantity} ${proteinName}`;
        }).join(', ');
      
      // Prepare selected appetizers
      const selectedAppetizers = Object.entries(appetizers)
        .filter(([_, selected]) => selected)
        .map(([appetizer, _]) => {
          switch(appetizer) {
            case 'gyoza': return 'Gyoza $10 (6pcs)';
            case 'edamame': return 'Edamame $5';
            default: return '';
          }
        }).join(', ');
      
      // Prepare selected side orders
      const selectedSideOrders = Object.entries(sideOrders)
        .filter(([_, selected]) => selected)
        .map(([side, _]) => {
          switch(side) {
            case 'chickenSide': return 'Chicken (+$10)';
            case 'steakSide': return 'Steak (+$10)';
            case 'shrimpSide': return 'Shrimp (+$10)';
            case 'scallopsSide': return 'Scallops (+$10)';
            case 'salmonSide': return 'Salmon (+$10)';
            case 'vegetableSide': return 'Vegetable (+Tofu) (+$10)';
            case 'noodles': return 'Noodles (+$4)';
            case 'filetMignonSide': return 'Filet Mignon (+$15)';
            case 'lobsterTailSide': return 'Lobster Tail (+$15)';
            default: return '';
          }
        }).join(', ');
      
      // Prepare email template parameters
      const emailParams = {
        to_name: name,
        to_email: email.trim(),
        date: format(selectedDate, 'EEEE, MMMM do, yyyy'),
        time: startTime,
        location: `${state} - ${location}`,
        plan: plan,
        adults: adultCount,
        children: childrenCount,
        total_guests: totalGuests,
        contact_email: email.trim(),
        contact_phone: phone,
        business_phone: "(929) 688-1138",
        customer_name: name,
        booking_date: format(selectedDate, 'EEEE, MMMM do, yyyy'),
        booking_time: startTime,
        booking_location: `${state} - ${location}`,
        package_type: plan,
        adult_count: adultCount,
        children_count: childrenCount,
        total_guest_count: totalGuests,
        email: email.trim(),
        phone_number: phone,
        order_id: orderId,
        comments: comments || 'No special requests or comments',
        // Food selections
        protein_choices: selectedProteins,
        protein_details: selectedProteins, // Add this for the customer email template
        premium_protein_details: `${proteinQuantities.filetMignon > 0 || proteinQuantities.lobsterTail > 0 ? 
          `${proteinQuantities.filetMignon > 0 ? `Filet Mignon: ${proteinQuantities.filetMignon}` : ''}${proteinQuantities.filetMignon > 0 && proteinQuantities.lobsterTail > 0 ? ', ' : ''}${proteinQuantities.lobsterTail > 0 ? `Lobster Tail: ${proteinQuantities.lobsterTail}` : ''}` 
          : 'None selected'}`,
        appetizers: selectedAppetizers || 'None selected',
        side_orders: selectedSideOrders || 'None selected',
        
        // Pricing details
        adult_price: "$60/person",
        child_price: "$30/person",
        adult_subtotal: `$${adultTotal}`,
        child_subtotal: `$${childTotal}`,
        additional_costs: `$${additionalCosts}`,
        total_amount: `$${totalAmount}`,
        total_price: `$${totalAmount}`  // Added for clarity in templates
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
        to_name: "4 U Sake Hibachi",
        customer_name: name,  // Add separate parameter for customer name
        // Add a more detailed protein breakdown for the business
        protein_details: `Total proteins: ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0)} (${totalGuests} guests × 2 proteins each)\n${selectedProteins}`,
        
        // Add premium protein details and costs
        premium_protein_details: `${proteinQuantities.filetMignon > 0 ? `Filet Mignon: ${proteinQuantities.filetMignon} × $5 = $${proteinQuantities.filetMignon * 5}\n` : ''}${proteinQuantities.lobsterTail > 0 ? `Lobster Tail: ${proteinQuantities.lobsterTail} × $10 = $${proteinQuantities.lobsterTail * 10}` : ''}`
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
        // Update booked dates
        // No longer adding the date to booked dates
        
        // Update booked time slots
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        
        // Just use the single start time slot
        const allBookedSlots = [startTime];
        
        setBookedTimeSlots(prev => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), ...allBookedSlots]
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

  // Helper function to get time slots for display
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const availableSlots: string[] = [];
    
    // Generate all possible time slots
    HOURS.forEach(hour => {
      MINUTES.forEach(minute => {
        const timeSlot = `${hour}:${minute}`;
        if (!isTimeSlotBooked(timeSlot)) {
          availableSlots.push(timeSlot);
        }
      });
    });
    
    return availableSlots;
  };

  // No longer need to check if a date is unavailable

  const states = [
    {
      coast: 'East Coast',
      states: [
        { value: 'ME', label: 'Maine' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'VT', label: 'Vermont' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'NY', label: 'New York' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'DE', label: 'Delaware' },
        { value: 'MD', label: 'Maryland' },
        { value: 'DC', label: 'Washington DC' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'GA', label: 'Georgia' },
        { value: 'FL', label: 'Florida' }
      ]
    },
    {
      coast: 'West Coast',
      states: [
        { value: 'WA', label: 'Washington' },
        { value: 'OR', label: 'Oregon' },
        { value: 'CA', label: 'California' },
        { value: 'AK', label: 'Alaska' },
        { value: 'HI', label: 'Hawaii' }
      ]
    },
    {
      coast: 'Midwest',
      states: [
        { value: 'OH', label: 'Ohio' },
        { value: 'MI', label: 'Michigan' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IL', label: 'Illinois' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'IA', label: 'Iowa' },
        { value: 'MO', label: 'Missouri' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'KS', label: 'Kansas' }
      ]
    },
    {
      coast: 'South',
      states: [
        { value: 'KY', label: 'Kentucky' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'AL', label: 'Alabama' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'TX', label: 'Texas' }
      ]
    },
    {
      coast: 'Mountain',
      states: [
        { value: 'MT', label: 'Montana' },
        { value: 'ID', label: 'Idaho' },
        { value: 'WY', label: 'Wyoming' },
        { value: 'CO', label: 'Colorado' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'UT', label: 'Utah' },
        { value: 'NV', label: 'Nevada' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <img 
              src="/images/moments/profilepic/logo.png" 
              alt="4 U Sake Hibachi Logo" 
              className="h-24 w-auto"
            />
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setSelectedPlan(null);
              }} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {isBookingComplete ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for booking with 4 U Sake Hibachi Catering. We've sent a confirmation to your email.
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
                      <span>{startTime}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Location</span>
                      <span>{state} - {location}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Package</span>
                      <span>Adult Plan - {adultCount} adults, {childrenCount} children ({totalGuests} total)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Total Price</span>
                      <span className="text-lg font-semibold">${Number(adultCount) * 60 + Number(childrenCount) * 30 + additionalCosts}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        Adults: ${Number(adultCount) * 60} (${60}/person) <br/>
                        Children: ${Number(childrenCount) * 30} (${30}/person)
                        {additionalCosts > 0 && (
                          <><br/>Additional items: ${additionalCosts}</>
                        )}
                      </div>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 11h.01M11 15h.01M16 16h.01M10 11h.01M13 13h.01"/>
                        <path d="M4 7h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Z"/>
                        <path d="M17 5v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1Z"/>
                        <path d="M4 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z"/>
                        <path d="M17 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1Z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Protein Choices</span>
                      <span className="text-sm">
                        {Object.entries(proteinQuantities)
                          .filter(([_, quantity]) => quantity > 0)
                          .map(([protein, quantity]) => {
                            let proteinName;
                            switch(protein) {
                              case 'chicken': proteinName = 'Chicken'; break;
                              case 'steak': proteinName = 'Steak'; break;
                              case 'shrimp': proteinName = 'Shrimp'; break;
                              case 'scallops': proteinName = 'Scallops'; break;
                              case 'salmon': proteinName = 'Salmon'; break;
                              case 'vegetable': proteinName = 'Vegetable'; break;
                              case 'tofu': proteinName = 'Tofu'; break;
                              case 'filetMignon': proteinName = 'Filet Mignon'; break;
                              case 'lobsterTail': proteinName = 'Lobster Tail'; break;
                              default: proteinName = '';
                            }
                            return `${quantity} ${proteinName}`;
                          }).join(', ')}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Total: {Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0)} proteins
                        {(proteinQuantities.filetMignon > 0 || proteinQuantities.lobsterTail > 0) && (
                          <div className="mt-1">
                            {proteinQuantities.filetMignon > 0 && (
                              <div>Filet Mignon: +${proteinQuantities.filetMignon * 5}</div>
                            )}
                            {proteinQuantities.lobsterTail > 0 && (
                              <div>Lobster Tail: +${proteinQuantities.lobsterTail * 10}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  
                  {Object.values(appetizers).some(v => v) && (
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                          <path d="M7 2v20"/>
                          <path d="M21 15V2"/>
                          <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                          <path d="M18 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium block">Appetizers</span>
                        <span className="text-sm">
                          {Object.entries(appetizers)
                            .filter(([_, selected]) => selected)
                            .map(([appetizer, _]) => {
                              switch(appetizer) {
                                case 'gyoza': return 'Gyoza $10 (6pcs)';
                                case 'edamame': return 'Edamame $5';
                                default: return '';
                              }
                            }).join(', ')}
                        </span>
                      </div>
                    </li>
                  )}
                  
                  {Object.values(sideOrders).some(v => v) && (
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                          <path d="M11 8h5a2 2 0 0 1 2 2v2"/>
                          <path d="M19 15v6"/>
                          <path d="M15 18h8"/>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium block">Side Orders</span>
                        <span className="text-sm">
                          {Object.entries(sideOrders)
                            .filter(([_, selected]) => selected)
                            .map(([side, _]) => {
                              switch(side) {
                                case 'chickenSide': return 'Chicken (+$10)';
                                case 'steakSide': return 'Steak (+$10)';
                                case 'shrimpSide': return 'Shrimp (+$10)';
                                case 'scallopsSide': return 'Scallops (+$10)';
                                case 'salmonSide': return 'Salmon (+$10)';
                                case 'vegetableSide': return 'Vegetable (+Tofu) (+$10)';
                                case 'noodles': return 'Noodles (+$4)';
                                case 'filetMignonSide': return 'Filet Mignon (+$15)';
                                case 'lobsterTailSide': return 'Lobster Tail (+$15)';
                                default: return '';
                              }
                            }).join(', ')}
                        </span>
                      </div>
                    </li>
                  )}
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
                  {comments && (
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-hibachi-red mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium block">Special Requests/Comments</span>
                        <span className="text-sm">{comments}</span>
                      </div>
                    </li>
                  )}
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
              <h2 className="text-3xl font-bold mb-4 text-left">Booking Details</h2>
              <p className="text-gray-600 mb-2">
                Select your preferred date and provide your details to complete your booking.
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6 text-sm">
                <h3 className="font-semibold mb-2 text-hibachi-red">What We Provide vs. What You Provide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4">
                    <div>
                      <p className="font-medium mb-1">We'll Bring:</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Professional chef</li>
                        <li>Cooking gear and setup</li>
                        <li>All food ingredients</li>
                        <li>Hibachi grill</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col">
                          <div className="bg-yellow-100 p-2 w-32 h-32 rounded-md shadow-md border border-yellow-200 flex items-center justify-center">
                            <p className="text-yellow-800 font-medium italic text-sm text-center">"More Sake, More Happy. More Happy, More Sexy. More Sexy, More Baby!"</p>
                          </div>
                          <div className="mt-2 text-xs text-red-500">
                            <p>We provide premium sake<br/>at no additional cost<br/>to enhance your dining<br/>experience!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">You'll Provide:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Tables and chairs</li>
                      <li>Eating utensils, plates, and bowls</li>
                      <li>Drinks for your guests</li>
                    </ul>
                  </div>
                </div>
              </div>
              
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
                        date < new Date() // Only disable past dates
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                    <div className="mt-4 space-y-2">
      




       
                      <p className="text-xs text-gray-500">Note: Each booking reserves a 2-hour time slot.</p>
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
                          onValueChange={(value) => {
                            setStartTime(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select start time (9am-11pm)" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.flatMap((hour) => 
                              MINUTES.map((minute) => {
                                const timeSlot = `${hour}:${minute}`;
                                const isBooked = isTimeSlotBooked(timeSlot);
                                
                                return (
                                  <SelectItem 
                                    key={timeSlot} 
                                    value={timeSlot}
                                    disabled={isBooked}
                                    className={isBooked ? "opacity-50 bg-gray-100" : ""}
                                  >
                                    {hour}:{minute === '0' ? '00' : minute}
                                  </SelectItem>
                                );
                              })
                            )}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                        <Select value={state} onValueChange={setState}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((coast) => (
                              <div key={coast.coast}>
                                <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
                                  {coast.coast}
                                </div>
                                {coast.states.map((state) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          placeholder="Full address for the event"
                        />
                        <p className="text-xs text-gray-500 mt-1">We can cook inside or outside, including in parks or by the sea</p>
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
                      
                      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-sm text-yellow-800">
                        <p>Total guests: <strong>{totalGuests}</strong> (Minimum 10 guests required)</p>
                        <div className="mt-2 flex items-center">
                          <span className="mr-2">Total Price:</span>
                          <span className="text-xl font-bold">${Number(adultCount) * 60 + Number(childrenCount) * 30 + additionalCosts}</span>
                          <span className="ml-2 text-xs">($500 minimum for all parties)</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600 border-t border-yellow-200 pt-2">
                          <p>Adults: ${Number(adultCount) * 60} (${60}/person)</p>
                          <p>Children: ${Number(childrenCount) * 30} (${30}/person)</p>
                          {additionalCosts > 0 && (
                            <p>Additional items: ${additionalCosts}</p>
                          )}
                        </div>
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
                        
                        <div className="mt-6">
                          <h4 className="font-semibold text-md mb-3">Food Selections</h4>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Protein Choices</label>
                            <div className="mb-2 text-xs text-gray-500 font-semibold">FOOD ORDER: (2 Proteins per person)</div>
                            <div className="mb-2 text-xs text-gray-500">EXAMPLE: (Party of 10 adults & 5 kids) - Adults: 10 chicken, 5 steak, 5 shrimp. Kids: 5 chicken, 5 steak.</div>
                            <div className="mb-4">
                              <div className="text-sm text-gray-700 mb-2">Select quantity for each protein (2 proteins per person recommended):</div>
                              
                              <div className="grid grid-cols-1 gap-3">
                                {/* Regular proteins */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Chicken</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          chicken: Math.max(0, prev.chicken - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.chicken}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              chicken: prev.chicken + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Steak</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          steak: Math.max(0, prev.steak - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.steak}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              steak: prev.steak + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Shrimp</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          shrimp: Math.max(0, prev.shrimp - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.shrimp}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              shrimp: prev.shrimp + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Scallops</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          scallops: Math.max(0, prev.scallops - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.scallops}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              scallops: prev.scallops + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Salmon</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          salmon: Math.max(0, prev.salmon - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.salmon}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              salmon: prev.salmon + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Vegetable</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          vegetable: Math.max(0, prev.vegetable - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.vegetable}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              vegetable: prev.vegetable + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between border rounded-md p-2">
                                    <span className="text-sm">Tofu</span>
                                    <div className="flex items-center">
                                      <button 
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                        onClick={() => setProteinQuantities(prev => ({
                                          ...prev, 
                                          tofu: Math.max(0, prev.tofu - 1)
                                        }))}
                                      >-</button>
                                      <span className="w-8 text-center">{proteinQuantities.tofu}</span>
                                      <button 
                                        type="button"
                                        className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                        onClick={() => {
                                          const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                          if (currentTotal < totalGuests * 2) {
                                            setProteinQuantities(prev => ({
                                              ...prev, 
                                              tofu: prev.tofu + 1
                                            }));
                                          }
                                        }}
                                      >+</button>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Premium proteins */}
                                <div className="mt-2">
                                  <div className="text-sm font-medium text-gray-700 mb-2">Premium Proteins (Additional Cost):</div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center justify-between border rounded-md p-2">
                                      <span className="text-sm">Filet Mignon<br/><span className="text-xs text-gray-500">(+$5 per person)</span></span>
                                      <div className="flex items-center">
                                        <button 
                                          type="button"
                                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                          onClick={() => setProteinQuantities(prev => ({
                                            ...prev, 
                                            filetMignon: Math.max(0, prev.filetMignon - 1)
                                          }))}
                                        >-</button>
                                        <span className="w-8 text-center">{proteinQuantities.filetMignon}</span>
                                        <button 
                                          type="button"
                                          className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                          onClick={() => {
                                            const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                            if (currentTotal < totalGuests * 2) {
                                              setProteinQuantities(prev => ({
                                                ...prev, 
                                                filetMignon: prev.filetMignon + 1
                                              }));
                                            }
                                          }}
                                        >+</button>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between border rounded-md p-2">
                                      <span className="text-sm">Lobster Tail<br/><span className="text-xs text-gray-500">(+$10 per person)</span></span>
                                      <div className="flex items-center">
                                        <button 
                                          type="button"
                                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-l-md"
                                          onClick={() => setProteinQuantities(prev => ({
                                            ...prev, 
                                            lobsterTail: Math.max(0, prev.lobsterTail - 1)
                                          }))}
                                        >-</button>
                                        <span className="w-8 text-center">{proteinQuantities.lobsterTail}</span>
                                        <button 
                                          type="button"
                                          className={`w-6 h-6 flex items-center justify-center ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) >= totalGuests * 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'} rounded-r-md`}
                                          onClick={() => {
                                            const currentTotal = Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0);
                                            if (currentTotal < totalGuests * 2) {
                                              setProteinQuantities(prev => ({
                                                ...prev, 
                                                lobsterTail: prev.lobsterTail + 1
                                              }));
                                            }
                                          }}
                                        >+</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Total protein count */}
                                <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Total Protein Count:</span>
                                    <span className={`text-sm font-bold ${Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) > totalGuests * 2 ? 'text-red-500' : ''}`}>
                                      {Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0)} / {totalGuests * 2}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Required: Exactly 2 proteins per person ({totalGuests * 2} total)
                                  </div>
                                  {Object.values(proteinQuantities).reduce((sum, count) => sum + count, 0) > totalGuests * 2 && (
                                    <div className="text-xs text-red-500 mt-1">
                                      You've selected too many proteins. Please reduce your selection.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Appetizers</label>
                            <div className="grid grid-cols-2 gap-2">
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={appetizers.gyoza}
                                  onChange={(e) => setAppetizers({...appetizers, gyoza: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Gyoza $10 (6pcs)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={appetizers.edamame}
                                  onChange={(e) => setAppetizers({...appetizers, edamame: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Edamame $5</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Side Orders</label>
                            <div className="grid grid-cols-2 gap-2">
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.chickenSide}
                                  onChange={(e) => setSideOrders({...sideOrders, chickenSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Chicken (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.steakSide}
                                  onChange={(e) => setSideOrders({...sideOrders, steakSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Steak (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.shrimpSide}
                                  onChange={(e) => setSideOrders({...sideOrders, shrimpSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Shrimp (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.scallopsSide}
                                  onChange={(e) => setSideOrders({...sideOrders, scallopsSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Scallops (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.salmonSide}
                                  onChange={(e) => setSideOrders({...sideOrders, salmonSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Salmon (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.vegetableSide}
                                  onChange={(e) => setSideOrders({...sideOrders, vegetableSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Vegetable (+Tofu) (+$10)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.noodles}
                                  onChange={(e) => setSideOrders({...sideOrders, noodles: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Noodles (+$4)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.filetMignonSide}
                                  onChange={(e) => setSideOrders({...sideOrders, filetMignonSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Filet Mignon (+$15)</span>
                              </label>
                              <label className="flex items-center space-x-2 text-sm">
                                <input 
                                  type="checkbox" 
                                  checked={sideOrders.lobsterTailSide}
                                  onChange={(e) => setSideOrders({...sideOrders, lobsterTailSide: e.target.checked})}
                                  className="rounded text-hibachi-red focus:ring-hibachi-red"
                                />
                                <span>Lobster Tail (+$15)</span>
                              </label>
                            </div>
                          </div>
                          
                          {additionalCosts > 0 && (
                            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm text-yellow-800 mb-4">
                              <p className="font-medium">Additional Cost: ${additionalCosts}</p>
                              <p className="text-xs text-gray-600 mt-1">These selections will be added to your total price</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Special Requests or Comments</label>
                          <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Special requests, food allergies, or any other comments"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hibachi-red min-h-[100px] text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Let us know about any food allergies or dietary restrictions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        disabled={!selectedDate || !startTime || totalGuests < 10 || (Number(adultCount) * 60 + Number(childrenCount) * 30 + additionalCosts) < 500 || isLoading}
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