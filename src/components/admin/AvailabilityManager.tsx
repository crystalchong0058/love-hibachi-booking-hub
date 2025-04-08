
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { CalendarIcon, PlusCircle, XCircle, Save, RefreshCw } from 'lucide-react';

// In a real app, these would be fetched from a backend API
const initialBookedDates = [
  new Date(2025, 3, 15),
  new Date(2025, 3, 18),
  new Date(2025, 3, 22),
  new Date(2025, 3, 29),
];

const initialUnavailableDates = [
  new Date(2025, 3, 10),
  new Date(2025, 3, 11),
  new Date(2025, 3, 12),
];

// In a real application, this would be a protected admin route
const AvailabilityManager = () => {
  const [bookedDates, setBookedDates] = useState<Date[]>(initialBookedDates);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>(initialUnavailableDates);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.getDate() === date.getDate() && 
      unavailableDate.getMonth() === date.getMonth() && 
      unavailableDate.getFullYear() === date.getFullYear()
    );
  };

  const handleAddUnavailableDate = () => {
    if (!selectedDate) return;
    
    if (isDateBooked(selectedDate)) {
      toast.error("This date already has bookings. Please contact customers to reschedule.");
      return;
    }
    
    if (isDateUnavailable(selectedDate)) {
      toast.error("This date is already marked as unavailable.");
      return;
    }
    
    setUnavailableDates([...unavailableDates, selectedDate]);
    setSelectedDate(undefined);
    toast.success("Date marked as unavailable.");
  };

  const handleRemoveUnavailableDate = (dateToRemove: Date) => {
    setUnavailableDates(unavailableDates.filter(date => 
      !(date.getDate() === dateToRemove.getDate() && 
        date.getMonth() === dateToRemove.getMonth() && 
        date.getFullYear() === dateToRemove.getFullYear())
    ));
    toast.success("Date availability restored.");
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    
    // In a real app, this would send data to a backend API
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Availability settings saved successfully!");
      
      // Send confirmation emails about changes
      console.log("Updated availability:", {
        unavailableDates,
        bookedDates
      });
    }, 1500);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Availability Manager</h1>
      <p className="text-gray-600 mb-8">
        Manage your availability calendar and view bookings.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" /> Calendar View
            </CardTitle>
            <CardDescription>
              Set which dates you are available or unavailable for bookings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-gray-50">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()} // Can't select past dates
                initialFocus
                className="p-3 pointer-events-auto"
                modifiers={{
                  booked: bookedDates,
                  unavailable: unavailableDates
                }}
                modifiersStyles={{
                  booked: { backgroundColor: '#ef4444', color: 'white' },
                  unavailable: { backgroundColor: '#9ca3af', color: 'white' }
                }}
              />
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Available</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={handleAddUnavailableDate}
                disabled={!selectedDate}
                className="w-full flex items-center justify-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Mark Selected Date as Unavailable
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booked Dates</CardTitle>
              <CardDescription>
                These dates have confirmed customer bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookedDates.length > 0 ? (
                <ul className="space-y-2">
                  {bookedDates.map((date, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-red-50 border border-red-100 rounded-md">
                      <span>{format(date, 'MMMM do, yyyy (EEEE)')}</span>
                      <Button variant="outline" size="sm" disabled>
                        <RefreshCw className="w-4 h-4 mr-1" /> Contact Customer
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No bookings yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unavailable Dates</CardTitle>
              <CardDescription>
                Dates you've marked as unavailable for bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {unavailableDates.length > 0 ? (
                <ul className="space-y-2">
                  {unavailableDates.map((date, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
                      <span>{format(date, 'MMMM do, yyyy (EEEE)')}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveUnavailableDate(date)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No unavailable dates set.</p>
              )}
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleSaveChanges} 
            className="w-full bg-hibachi-gold hover:bg-hibachi-gold/90 text-white"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Availability Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;
