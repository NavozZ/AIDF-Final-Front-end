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
    <section className="px-6 md:px-10 lg:px-16 py-12 backdrop-blur-md bg-white/30 rounded-xl shadow-xl">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-white mb-4">Top Trending Hotels Worldwide</h2>
        <p className="text-lg text-white-700 max-w-3xl mx-auto">
          Explore our collection of top-rated hotels across the globe. Find the perfect place for an unforgettable stay.
        </p>
      </div>

      {/* Location Tabs */}
      <div className="flex items-center flex-wrap gap-6 mb-12 justify-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredHotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
}

export default HotelListings;
