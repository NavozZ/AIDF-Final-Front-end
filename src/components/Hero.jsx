import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Added custom icons

export default function Hero() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Triggered");
  };

  return (
    <div className="relative h-[600px] overflow-hidden bg-black z-0">
      {/* Background Video */}
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

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 sm:px-12 space-y-8 md:space-y-0">
        {/* Left Side: Text and Search */}
        <div className="text-center md:text-left md:max-w-lg md:ml-16 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Your Perfect Stay Awaits
          </h1>
          <p className="text-lg md:text-xl text-white opacity-80 mb-8 max-w-lg">
            Explore top-rated hotels, unique accommodations, and personalized experiences to make your trip unforgettable. Let us find the perfect spot for you!
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="relative flex items-center">
              <Input
                type="text"
                name="search"
                placeholder="Where do you want to go?"
                className="bg-[#2d2d2d] text-sm sm:text-base text-white placeholder:text-white/70 placeholder:text-sm sm:placeholder:text-base rounded-full py-4 pl-6 pr-12 sm:pr-24 w-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="absolute right-2 h-[80%] my-auto bg-purple-600 text-white rounded-full px-4 flex items-center gap-x-2 border-2 border-purple-600 hover:bg-purple-700 transition-all"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm">Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Add GIF or Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Wave Animation (1).gif" // Your GIF here
            alt="Travel GIF"
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {/* Pagination dots can be kept if you want to show background change or just remove them */}
      </div>
    </div>
  );
}
