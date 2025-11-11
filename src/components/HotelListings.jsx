import HotelCard from "@/components/HotelCard";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import LocationTab from "./LocationTab"; // Assumed to be updated
import { Button } from "./ui/button";
import { Search } from "lucide-react"; // Added Search icon for flair

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const { data: hotels, isLoading: isHotelsLoading, isError: isHotelsError, error: hotelsError } = useGetAllHotelsQuery();
  const { data: locations, isLoading: isLocationsLoading, isError: isLocationsError, error: locationsError } = useGetAllLocationsQuery();

  const allLocations = locations ? [{ _id: 0, name: "All" }, ...locations] : [{ _id: 0, name: "All" }];
  const handleLocationSelect = (selectedLocation) => setSelectedLocation(selectedLocation._id);
  
  // NOTE: This filter logic is prone to breaking if location names contain special characters.
  // The backend should ideally filter by location ID, not name inclusion.
  const selectedLocationName = allLocations.find(el => selectedLocation === el._id)?.name || 'All';
  const filteredHotels = selectedLocation === 0 ? hotels : hotels.filter(hotel => hotel.location.includes(selectedLocationName));

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;
  
  // --- LOADING STATE IMPROVED ---
  if (isLoading) {
    return (
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-2 text-gray-800 dark:text-white">Discover Your Next Destination</h2>
          <p className="text-xl text-muted-foreground">Fetching live listings and locations worldwide.</p>
        </div>
        
        {/* Scrollable Skeleton for Tabs */}
        <div className="flex space-x-3 overflow-x-hidden pb-4">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Skeleton Grid for Hotel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  // --- ERROR STATE IMPROVED ---
  if (isError) {
    return (
      <section className="container mx-auto py-12 px-4 text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-red-600">Failed to Load Listings</h2>
          <p className="text-xl text-red-400">
            A critical error occurred while fetching data. Please check the backend connection.
          </p>
          <pre className="mt-4 text-sm text-gray-500 overflow-auto">{hotelsError?.message || locationsError?.message}</pre>
        </div>
      </section>
    );
  }

  // --- SUCCESS STATE IMPROVED ---
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-2 text-white-800 dark:text-white">Top Trending Hotels Worldwide</h2>
        <p className="text-xl text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
      </div>

      {/* LOCATION TABS CONTAINER (Scrollable) */}
      <div className="relative mb-12">
        {/* Scrollable bar for tabs */}
        <div className="flex space-x-3 pb-3 overflow-x-auto scrollbar-hide">
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
        
        {/* Fading overlay on the right (purely for aesthetic scroll effect) */}
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background pointer-events-none hidden md:block"></div>
      </div>
      
      {/* HOTEL GRID */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold">No Hotels Found</h3>
            <p className="text-muted-foreground">Try selecting "All" or searching a different location.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HotelListings;