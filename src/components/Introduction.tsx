import React from 'react';

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
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-xl">
            <div className="relative" style={{ paddingBottom: '177.78%' }}> {/* 9:16 aspect ratio for portrait */}
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/images/moments/profilepic/introduction.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction; 