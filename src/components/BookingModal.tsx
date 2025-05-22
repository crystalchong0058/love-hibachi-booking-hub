
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ClockIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Define props for BookingModal component
export interface BookingModalProps {
  plan: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  adultCount: z.number().min(0, { message: "Adult count cannot be negative" }),
  childrenCount: z.number().min(0, { message: "Children count cannot be negative" }),
  message: z.string().optional(),
}).refine((data) => {
  // Calculate total cost
  const totalCost = (data.adultCount * 50) + (data.childrenCount * 25);
  // Check if total cost meets minimum requirement
  return totalCost >= 500;
}, {
  message: "Total booking cost must be at least $500",
  path: ["adultCount"] // Show error on adultCount field
});

const BookingModal = ({ plan, setIsModalOpen }: BookingModalProps) => {
  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      adultCount: 0,
      childrenCount: 0,
      message: "",
    },
  });

  // Generate time slots from 9 AM to 11 PM
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minute} ${period}`;
  });

  // Calculate total cost and guest count
  const adultCount = form.watch('adultCount') || 0;
  const childrenCount = form.watch('childrenCount') || 0;
  const totalGuests = adultCount + childrenCount;
  const totalCost = (adultCount * 50) + (childrenCount * 25);
  const isMinimumMet = totalCost >= 500;

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Check minimum booking amount
    if (totalCost < 500) {
      toast.error("Booking must meet the $500 minimum requirement");
      return;
    }

    console.log(values);
    toast.success("Booking submitted successfully! We'll contact you soon.");
    setIsModalOpen(false);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto py-4">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-bold text-center">Book Your {plan} Hibachi Experience</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Event address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="pl-3 text-left font-normal flex items-center justify-between"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center">
                          <ClockIcon className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select time" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Guest Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="adultCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adults ($50/person)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="childrenCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Children ($25/person)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Summary and Price Calculation */}
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Total Guests:</span>
              <span className="font-bold">{totalGuests}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Adults (${50} × {adultCount}):</span>
              <span>${adultCount * 50}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Children (${25} × {childrenCount}):</span>
              <span>${childrenCount * 25}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${totalCost}</span>
            </div>
            {!isMinimumMet && (
              <p className="mt-2 text-red-500 text-sm font-medium">
                * Booking requires a minimum of $500 *
              </p>
            )}
          </div>

          {/* Additional Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[100px] border border-gray-300 rounded-md p-2"
                    placeholder="Dietary preferences, special requests, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!isMinimumMet}
              className={!isMinimumMet ? "opacity-50 cursor-not-allowed" : ""}
            >
              Submit Booking
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingModal;
