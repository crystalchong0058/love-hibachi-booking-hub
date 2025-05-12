import React from 'react';

type Video = {
  id: string;
  title: string;
};

const videos: Video[] = [
  {
    id: "PMqlndYxVko",
    title: "Hibachi Cooking Experience"
  }
];

const Introduction = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Experience the Magic</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our professional chefs create an unforgettable dining experience right in your home or venue.
          </p>
        </div>

        <div className="flex justify-center px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-2xl">
            <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videos[0].id}?autoplay=1&mute=0&loop=1&playlist=${videos[0].id}&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
                title={videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction; 