import HotelCard from "@/components/HotelCard";
import { hotels, locations } from "@/data";
import { useState } from "react";
import LocationTab from "./LocationTab";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
  };

  const selectedLocationName = locations.find(
    (el) => selectedLocation === el._id
  ).name;

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels.filter((hotel) => {
          return hotel.location.includes(selectedLocationName);
        });

  return (
    <section className="px-8 py-8 lg:py-12 backdrop-blur-md bg-white/30 rounded-xl shadow-xl">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-black mb-4">Top Trending Hotels Worldwide</h2>
        <p className="text-lg text-black/70">
          Discover the most trending hotels worldwide for an unforgettable experience.
        </p>
      </div>

      {/* Location Tabs */}
      <div className="flex items-center flex-wrap gap-x-4 mb-8 justify-center">
        {locations.map((location) => {
          return (
            <LocationTab
              onClick={handleLocationSelect}
              location={location}
              selectedLocation={selectedLocation}
              key={location._id}
            />
          );
        })}
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
}

export default HotelListings;
