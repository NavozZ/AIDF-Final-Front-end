import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import LocationTab from "./LocationTab";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import HotelCard from "./HotelCard";
import { getAllHotels, getAllLocations } from "@/lib/api"; // Import the API functions

function HotelListings() {
  const [hotels, setHotels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelData, locationData] = await Promise.all([getAllHotels(), getAllLocations()]);
        setHotels(hotelData);
        setLocations(locationData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const allLocations = locations ? [{ _id: 0, name: "All" }, ...locations] : [{ _id: 0, name: "All" }];
  
  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
  };

  const selectedLocationName = allLocations.find(el => selectedLocation === el._id)?.name;

  const filteredHotels = selectedLocation === 0 ? hotels : hotels.filter(hotel => hotel.location.includes(selectedLocationName));

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
        </div>
        <Skeleton className="h-6 flex items-center flex-wrap gap-x-4" />
        <Skeleton className="h-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
        </div>
        <p className="text-red-500">Error loading data: {error}</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-8">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
        <p className="text-lg text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
        <Button className="opacity-50" disabled>
          <PlusCircle className="w-4 h-4" /> Add Location
        </Button>
      </div>

      <div className="flex items-center flex-wrap gap-x-4">
        {allLocations.map((location) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
}

export default HotelListings;