import { MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router"; 

function HotelCard(props) {
  
  return (
    <Link
      to={`/hotels/${props.hotel._id}`}
      className="block group bg-card text-card-foreground rounded-xl shadow-lg 
                 overflow-hidden transition-all duration-300 border border-border
                 hover:shadow-2xl hover:border-blue-500/50 hover:scale-[1.02]"
    >
      
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          className="object-cover w-full h-full transition-transform duration-500 
                     group-hover:scale-105"
        />
      </div>

      
      <div className="p-4 space-y-3">
        
        
        <div>
          <h3 className="font-bold text-xl text-card-foreground truncate">
            {props.hotel.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            <span>{props.hotel.location}</span>
          </div>
        </div>

        
        <div className="flex items-center justify-between border-t pt-3 border-border">
          
          
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-lg text-card-foreground">
              {props.hotel?.rating ?? "—"}
            </span>
            <span className="text-xs text-muted-foreground">
              ({props.hotel.reviews?.length ?? "0"} Reviews)
            </span>
          </div>

          
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${props.hotel.price}
            </span>
            <span className="text-xs text-muted-foreground">per night</span>
          </div>
        </div>

        
        <Button
          type="button"
          className="w-full text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300 mt-2"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
}

export default HotelCard;