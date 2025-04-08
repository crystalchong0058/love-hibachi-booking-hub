import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

type NotificationRequest = {
  name: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  region: string;
  location: string;
  plan: string;
  adultCount: string;
  childrenCount: string;
  totalGuests: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookingData: NotificationRequest = req.body;

    // Prepare email content
    const emailBody = `
      Dear ${bookingData.name},

      Thank you for booking with 4 U Love Hibachi Catering!

      Your booking details:
      - Date: ${new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      - Time: ${bookingData.startTime} - ${bookingData.endTime}
      - Location: ${bookingData.region} - ${bookingData.location}
      - Package: ${bookingData.plan} Plan
      - Guests: ${bookingData.adultCount} adults, ${bookingData.childrenCount} children (${bookingData.totalGuests} total)
      - Customer Contact: ${bookingData.email} (${bookingData.phone})

      If you need to make any changes to your booking, please contact us at (929) 688-1138.

      We look forward to serving you!

      Best regards,
      4 U Love Hibachi Catering
    `;

    // Prepare SMS content
    const smsBody = `
      Booking Confirmation:
      Date: ${new Date(bookingData.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
      Time: ${bookingData.startTime} - ${bookingData.endTime}
      Location: ${bookingData.region} - ${bookingData.location}
      Package: ${bookingData.plan} Plan
      Guests: ${bookingData.totalGuests} (${bookingData.adultCount} adults, ${bookingData.childrenCount} children)
      Contact: ${bookingData.name} (${bookingData.email})
    `;

    // Send emails
    const emailPromises = [
      sgMail.send({
        to: bookingData.email,
        from: 'noreply@4ulovehibachi.com',
        subject: 'Your 4 U Love Hibachi Booking Confirmation',
        text: emailBody,
      }),
      sgMail.send({
        to: 'crystalyschong@gmail.com',
        from: 'noreply@4ulovehibachi.com',
        subject: 'New Booking Notification',
        text: emailBody,
      }),
    ];

    // Send SMS
    const smsPromises = [
      twilioClient.messages.create({
        body: smsBody,
        to: bookingData.phone,
        from: process.env.TWILIO_PHONE_NUMBER,
      }),
      twilioClient.messages.create({
        body: smsBody,
        to: '+19295753205', // Business phone number
        from: process.env.TWILIO_PHONE_NUMBER,
      }),
    ];

    // Wait for all notifications to be sent
    await Promise.all([...emailPromises, ...smsPromises]);

    return res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return res.status(500).json({ message: 'Error sending notifications' });
  }
} 