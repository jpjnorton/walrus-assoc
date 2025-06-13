import React, { useState } from "react";

const videoSources = ["/videos/bg1.mov", "/videos/bg2.mov", "/videos/bg3.mov"];

const BackgroundVideoLayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent z-10"></div>

      {/* Background videos */}

      <div className="fixed inset-0 z-[-1] w-screen h-screen">
        <video
          key={videoSources[currentIndex]} // Important for resetting playback
          src={videoSources[currentIndex]}
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          playsInline
        />
      </div>
    </div>
  );
};

export default BackgroundVideoLayer;
