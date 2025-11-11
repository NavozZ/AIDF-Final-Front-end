import { useState, useEffect, useCallback } from "react";
import AISearch from "./AISearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; 

export default function Hero() {
  const [isTransitioning, setIsTransitioning] = useState(false);


  return (
    <div className="relative h-[600px] overflow-hidden bg-black z-0">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/4456305-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 sm:px-12 space-y-8 md:space-y-0">
        <div className="text-center md:text-left md:max-w-lg md:ml-16 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Your Dream Stay Starts Here
          </h1>
          <p className="text-lg md:text-xl text-white opacity-80 mb-8 max-w-lg">
            Discover exceptional stays, unique experiences, and top-rated hotels curated just for your journey. Let us help you choose the perfect place
          </p>
          <AISearch />
        </div>

       
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Wave Animation (1).gif" 
            alt="Travel GIF"
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
      </div>
    </div>
  );
}
