import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MomentsGallery = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (src: string) => {
    setImageErrors(prev => ({ ...prev, [src]: true }));
    console.error(`Failed to load media: ${src}`);
  };

  const moments = [
    {
      type: 'image',
      src: '/images/moments/IMG_1.jpg',
      alt: 'Hibachi cooking show',
      caption: 'Chef performing amazing hibachi tricks',
      size: 'medium'
    },
    {
      type: 'video',
      src: '/videos/moments/31_1743945480.mp4',
      alt: 'Hibachi performance',
      caption: 'Watch our chef in action',
      orientation: 'portrait',
      size: 'large'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_2.jpg',
      alt: 'Happy customers',
      caption: 'Our satisfied customers enjoying the show',
      size: 'medium'
    },
    {
      type: 'video',
      src: '/videos/moments/37_1743945494.mp4',
      alt: 'Hibachi experience',
      caption: 'Interactive dining experience',
      orientation: 'portrait'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_3.jpg',
      alt: 'Delicious food',
      caption: 'Freshly prepared hibachi dishes'
    },
    {
      type: 'video',
      src: '/videos/moments/38_1743945499.mp4',
      alt: 'Special event',
      caption: 'Making special occasions memorable',
      orientation: 'portrait'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_4.jpg',
      alt: 'Hibachi performance',
      caption: 'Watch our chef in action'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_5.jpg',
      alt: 'Hibachi experience',
      caption: 'Interactive dining experience'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_6.jpg',
      alt: 'Group celebration',
      caption: 'Perfect for group celebrations'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_7.jpg',
      alt: 'Family dinner',
      caption: 'Family-friendly entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_8.jpg',
      alt: 'Special occasions',
      caption: 'Making special occasions memorable'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_9.jpg',
      alt: 'Corporate events',
      caption: 'Great for corporate events'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_10.jpg',
      alt: 'Birthday parties',
      caption: 'Birthday celebrations with flair'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_11.jpg',
      alt: 'Anniversary dinner',
      caption: 'Romantic anniversary dinners'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_12.jpg',
      alt: 'Team building',
      caption: 'Team building with entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_13.jpg',
      alt: 'Wedding reception',
      caption: 'Wedding reception entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_14.jpg',
      alt: 'Graduation party',
      caption: 'Graduation celebrations'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_15.jpg',
      alt: 'Holiday gathering',
      caption: 'Holiday gatherings with style'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_16.jpg',
      alt: 'Private party',
      caption: 'Private party entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_17.jpg',
      alt: 'Corporate dinner',
      caption: 'Corporate dinner entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_18.jpg',
      alt: 'Birthday celebration',
      caption: 'Birthday celebration with hibachi'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_19.jpg',
      alt: 'Family gathering',
      caption: 'Family gathering entertainment'
    },
    {
      type: 'image',
      src: '/images/moments/IMG_20.jpg',
      alt: 'Special event',
      caption: 'Special event entertainment'
    }
  ];

  const scrollLeft = () => {
    const container = document.getElementById('moments-container');
    if (container) {
      container.scrollBy({ left: -900, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('moments-container');
    if (container) {
      container.scrollBy({ left: 900, behavior: 'smooth' });
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                moment.type === 'video' && moment.orientation === 'portrait' ? 'row-span-2' : ''
              }`}
            >
              <div className="relative">
                {moment.type === 'image' ? (
                  <img
                    src={moment.src}
                    alt={moment.alt}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(moment.src)}
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[9/16]">
                    <video
                      src={moment.src}
                      className="w-full h-full object-contain bg-black"
                      controls
                      playsInline
                      onError={() => handleImageError(moment.src)}
                    >
                      <source src={moment.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {imageErrors[moment.src] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-sm text-gray-500">Media not available</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{moment.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MomentsGallery; 