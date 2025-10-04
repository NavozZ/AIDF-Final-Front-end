import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function HotelCard(props) {
  return (
    <div
      href={`/hotels/${props.hotel._id}`}
      className="block group relative w-[320px] h-[420px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-full h-[70%] overflow-hidden rounded-xl">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          className="object-cover w-full h-full absolute transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
        <h3 className="font-semibold text-lg">{props.hotel.name}</h3>
        <div className="flex items-center text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{props.hotel.location}</span>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium">{props.hotel?.rating ?? "No rating"}</span>
          <span className="text-muted-foreground">
            ({props.hotel.reviews?.length ?? "No"} Reviews)
          </span>
        </div>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-xl font-bold">${props.hotel.price}</span>
        </div>
        <Button
          type="button"
          className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-all duration-300"
        >
          Reserve Now
        </Button>
      </div>
    </div>
  );
}

export default HotelCard;
