import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MomentsGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (src: string) => {
    setImageErrors(prev => ({ ...prev, [src]: true }));
    console.error(`Failed to load media: ${src}`);
  };

  const moments = [
    {
      type: 'image',
      src: '/images/moments/2911745948437_.pic.jpg',
      alt: 'Hibachi cooking show',
      size: 'medium'
    },
    {
      type: 'video',
      src: '/videos/moments/358_1746266456.mp4',
      alt: 'Hibachi performance',
      orientation: 'portrait',
      size: 'large'
    },
    {
      type: 'image',
      src: '/images/moments/2921745948438_.pic.jpg',
      alt: 'Happy customers',
      size: 'medium'
    },
    {
      type: 'video',
      src: '/videos/moments/357_1746266456.mp4',
      alt: 'Hibachi experience',
      orientation: 'portrait'
    },
    {
      type: 'image',
      src: '/images/moments/2931745948439_.pic.jpg',
      alt: 'Delicious food'
    },
    {
      type: 'video',
      src: '/videos/moments/356_1746266453.mp4',
      alt: 'Special event',
      orientation: 'portrait'
    },
    {
      type: 'image',
      src: '/images/moments/2951745948441_.pic.jpg',
      alt: 'Hibachi performance'
    },
    {
      type: 'image',
      src: '/images/moments/2961745948441_.pic.jpg',
      alt: 'Hibachi experience'
    },
    {
      type: 'video',
      src: '/videos/moments/355_1746266452.mp4',
      alt: 'Group celebration',
      orientation: 'portrait'
    },
    {
      type: 'video',
      src: '/videos/moments/352_1746266447.mp4',
      alt: 'Family dinner',
      orientation: 'portrait'
    },
    {
      type: 'video',
      src: '/videos/moments/351_1746266446.mp4',
      alt: 'Special occasions',
      orientation: 'portrait'
    },
    {
      type: 'video',
      src: '/videos/moments/567_1744909774.mp4',
      alt: 'Corporate events',
      orientation: 'portrait'
    },
    {
      type: 'image',
      src: '/images/moments/3341744423666_.pic.jpg',
      alt: 'Birthday parties'
    },
    {
      type: 'image',
      src: '/images/moments/2401743772810_.pic.jpg',
      alt: 'Special celebrations'
    },
    {
      type: 'image',
      src: '/images/moments/2341743772800_.pic.jpg',
      alt: 'Group dining'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_5.jpg',
      alt: 'Hibachi show'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_4.jpg',
      alt: 'Culinary art'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_2.jpg',
      alt: 'Happy guests'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_1.jpg',
      alt: 'Hibachi experience'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_3.jpg',
      alt: 'Delicious cuisine'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moments.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <section id="moments" className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Moments</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing the joy and excitement of our hibachi experiences
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {moments.map((moment, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="aspect-video relative">
                      {moment.type === 'image' ? (
                        <img
                          src={moment.src}
                          alt={moment.alt}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          onError={() => handleImageError(moment.src)}
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={moment.src}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          autoPlay
                          loop
                          muted={false}
                          playsInline
                          controls
                          onError={() => handleImageError(moment.src)}
                        >
                          <source src={moment.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {imageErrors[moment.src] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <p className="text-sm text-gray-500">Media not available</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-center">{moment.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-hibachi-red" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-hibachi-red" />
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {moments.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-hibachi-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentsGallery; 