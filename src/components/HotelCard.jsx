import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router"; // Import Link

function HotelCard(props) {
  return (
    <Link
      to={`/hotels/${props.hotel._id}`} // Convert href to to
      className="block group relative w-[320px] h-[460px] overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Hotel Image */}
      <div className="relative w-full h-[75%] overflow-hidden rounded-xl">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          className="object-cover w-full h-full absolute transition-transform group-hover:scale-110 group-hover:brightness-75"
        />
      </div>

      {/* Hotel Information */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-transparent to-transparent text-white">
        <h3 className="font-semibold text-xl mb-2">{props.hotel.name}</h3>

        {/* Location */}
        <div className="flex items-center text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{props.hotel.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mt-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium">{props.hotel?.rating ?? "No rating"}</span>
          <span className="text-sm text-gray-300">
            ({props.hotel.reviews?.length ?? "No"} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2 mt-3">
          <span className="text-2xl font-bold">${props.hotel.price}</span>
          <span className="text-sm text-gray-300">per night</span>
        </div>

        {/* Reserve Button */}
        <Button
          type="button"
          className="w-full mt-4 py-2 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Reserve Now
        </Button>
      </div>
    </Link>
  );
}

export default HotelCard;
