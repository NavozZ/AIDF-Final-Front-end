import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input"; // Ensure this component exists in your project
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const heroImages = [
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596257607.jpg?k=0b513d8fca0734c02a83d558cbad7f792ef3ac900fd42c7d783f31ab94b4062c&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308797093.jpg?k=3a35a30f15d40ced28afacf4b6ae81ea597a43c90c274194a08738f6e760b596&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/84555265.jpg?k=ce7c3c699dc591b8fbac1a329b5f57247cfa4d13f809c718069f948a4df78b54&o=&hp=1",
  // Add more images if needed
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (index === currentSlide || isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
    },
    [currentSlide, isTransitioning]
  );

  useEffect(() => {
    let transitionTimeout;
    if (isTransitioning) {
      transitionTimeout = setTimeout(() => setIsTransitioning(false), 500);
    }
    return () => clearTimeout(transitionTimeout);
  }, [isTransitioning]);

  useEffect(() => {
    let intervalId;
    if (!isTransitioning) {
      intervalId = setInterval(() => {
        const nextSlide = (currentSlide + 1) % heroImages.length;
        goToSlide(nextSlide);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [currentSlide, isTransitioning, goToSlide]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching...");
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            currentSlide === index ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Discover Your Dream Destination
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mb-8 max-w-2xl px-4 sm:px-8 drop-shadow-lg">
          Find the best places, experiences, and stays that match your dream getaway. Let us do the work!
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-lg">
          <div className="relative flex items-center">
            <div className="relative flex-grow">
              <Input
                type="text"
                name="search"
                placeholder="Where do you want to go?"
                className="bg-[#1a1a1a] text-sm sm:text-base text-white placeholder:text-white/70 placeholder:text-sm sm:placeholder:text-base border-0 rounded-full py-6 pl-8 pr-16 sm:pr-32 w-full transition-all"
              />
            </div>

            <button
              type="submit"
              className="absolute right-2 h-[80%] my-auto bg-black text-white rounded-full px-4 py-2 flex items-center gap-x-2 border-white border-2 hover:bg-white/10 transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span className="text-sm">Search</span>
            </button>
          </div>
        </form>

        {/* Pagination dots */}
        <div className="absolute bottom-8 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-3 w-3 rounded-full transition-all",
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 w-3 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
