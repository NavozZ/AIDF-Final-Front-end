import { MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router"; // Use 'react-router-dom' Link

function HotelCard(props) {
  // Use a card-like structure that flows well in a grid
  return (
    <Link
      to={`/hotels/${props.hotel._id}`}
      // Removed fixed width/height. Uses 'group' for hover effects.
      className="block group bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                 overflow-hidden transition-all duration-300 border border-transparent 
                 hover:shadow-2xl hover:border-blue-500/50 hover:scale-[1.02]"
    >
      {/* 1. Hotel Image (Fixed Aspect Ratio) */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          // Object-cover ensures full coverage. Subtle hover effects.
          className="object-cover w-full h-full transition-transform duration-500 
                     group-hover:scale-105"
        />
      </div>

      {/* 2. Hotel Information (Content Block) */}
      <div className="p-4 space-y-3">
        
        {/* Name and Location (Top Block) */}
        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white truncate">
            {props.hotel.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            <span>{props.hotel.location}</span>
          </div>
        </div>

        {/* Rating and Price (Mid Block) */}
        <div className="flex items-center justify-between border-t pt-3 border-gray-200 dark:border-gray-700">
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-lg text-gray-900 dark:text-white">
              {props.hotel?.rating ?? "—"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({props.hotel.reviews?.length ?? "0"} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${props.hotel.price}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">per night</span>
          </div>
        </div>

        {/* Reserve Button (Bottom Block) */}
        <Button
          type="button"
          // Use a full-width button styled with the primary brand color
          className="w-full text-base font-semibold bg-blue-600 dark:bg-blue-600 
                     hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors duration-300 mt-2"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
}

export default HotelCard;