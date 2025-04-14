
import React from 'react';
import { QrCode, Share2 } from 'lucide-react';

const QRCodeSection = () => {
  return (
    <section className="py-16 bg-hibachi-red text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
          <div className="mb-8 md:mb-0 md:mr-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scan & Order Instantly</h2>
            <p className="text-white/90 max-w-xl mb-6">
              Use our QR code to quickly access our menu, special promotions, 
              and make instant booking inquiries from your mobile device.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-white text-hibachi-red hover:bg-white/90 font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center">
                <Share2 size={18} className="mr-2" />
                Share This QR Code
              </button>
              <a 
                href="#contact" 
                className="bg-hibachi-gold hover:bg-hibachi-gold/90 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center"
              >
                <QrCode size={18} className="mr-2" />
                Book Now
              </a>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="bg-white w-64 h-64 flex items-center justify-center rounded">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://4ulovehibachi.com" 
                alt="4 U Sake Hibachi Catering QR Code" 
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeSection;
