import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"  // z-index of 0 ensures the video stays in the background
      >
        <source src="/14468560_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
  );
};

export default BackgroundVideo;
