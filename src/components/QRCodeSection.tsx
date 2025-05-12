import React, { useState, useRef } from 'react';
import { Share2, Copy, Download, Check } from 'lucide-react';

const QRCodeSection = () => {
  const [shareStatus, setShareStatus] = useState<string>('');
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://4usakehibachicatering.com";
  const qrCodeRef = useRef<HTMLImageElement>(null);
  
  // Function to handle sharing
  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: '4 U Sake Hibachi Catering QR Code',
          text: 'Scan this QR code to access our menu and make bookings!',
          url: 'https://4usakehibachicatering.com',
        });
        setShareStatus('Shared successfully!');
        setTimeout(() => setShareStatus(''), 2000);
      } catch (error) {
        console.error('Error sharing:', error);
        setShareStatus('Sharing failed');
        setTimeout(() => setShareStatus(''), 2000);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        // Create a temporary element to copy the URL
        const tempInput = document.createElement('input');
        tempInput.value = 'https://4usakehibachicatering.com';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        setShareStatus('URL copied to clipboard!');
        setTimeout(() => setShareStatus(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        setShareStatus('Copy failed');
        setTimeout(() => setShareStatus(''), 2000);
      }
    }
  };

  // Function to download QR code
  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = '4u-hibachi-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShareStatus('Downloaded!');
    setTimeout(() => setShareStatus(''), 2000);
  };

  // Function to copy URL
  const copyUrl = () => {
    navigator.clipboard.writeText('https://4usakehibachicatering.com')
      .then(() => {
        setShareStatus('URL copied!');
        setTimeout(() => setShareStatus(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setShareStatus('Copy failed');
        setTimeout(() => setShareStatus(''), 2000);
      });
  };

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
              <button 
                onClick={handleShare}
                className="bg-white text-hibachi-red hover:bg-white/90 font-medium py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center"
              >
                <Share2 size={18} className="mr-2" />
                Share This QR Code
              </button>
              
              {/* Additional sharing options */}
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={copyUrl}
                  className="bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-md transition-all duration-300 inline-flex items-center"
                  title="Copy URL"
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={downloadQRCode}
                  className="bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-md transition-all duration-300 inline-flex items-center"
                  title="Download QR Code"
                >
                  <Download size={16} />
                </button>
              </div>
              
              {/* Status message */}
              {shareStatus && (
                <div className="mt-2 text-sm flex items-center text-white/90">
                  <Check size={14} className="mr-1" />
                  {shareStatus}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="bg-white w-64 h-64 flex items-center justify-center rounded">
              <img 
                ref={qrCodeRef}
                src={qrCodeUrl}
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
