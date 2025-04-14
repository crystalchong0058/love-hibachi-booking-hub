import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send the subscription directly using EmailJS
      const emailjs = await import('@emailjs/browser');
      
      // Prepare email parameters
      const emailParams = {
        to_email: "crystalyschong@gmail.com", // Your business email
        to_name: "4 U Sake Hibachi",
        subscriber_email: email,
        date: new Date().toLocaleString(),
      };
      
      // Send email notification
      const result = await emailjs.send(
        "service_df3zxal",
        "template_subscriber", // You'll need to create this template in EmailJS
        emailParams,
        "LCOpJ2w6UegSang_j" // Your EmailJS public key
      );
      
      if (result.status !== 200) {
        throw new Error(`Failed to send subscription: ${result.status}`);
      }
      
      // Clear the form and show success message
      setEmail('');
      toast.success('Thank you for subscribing! You\'ll receive our discounts and coupons soon.');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  

};

export default SubscriptionForm;