import HotelCard from "@/components/HotelCard";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import LocationTab from "./LocationTab";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  // ✅ Read search state from Redux
  const { results: searchResults, mode: searchMode, query: searchQuery } = useSelector(
    (state) => state.search
  );

  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery();

  const {
    data: locations,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useGetAllLocationsQuery();

  const allLocations = locations ? [{ _id: 0, name: "All" }, ...locations] : [{ _id: 0, name: "All" }];

  const handleLocationSelect = (location) => setSelectedLocation(location._id);

  const selectedLocationName =
    allLocations.find((el) => selectedLocation === el._id)?.name || "All";

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels?.filter((hotel) => hotel.location.includes(selectedLocationName));

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;

  // ✅ Determine active display list
  const hotelsToDisplay = searchMode === "search" ? searchResults : filteredHotels;

  // ✅ Check if search mode active
  const isSearchActive = searchMode === "search";

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-2 text-gray-800 dark:text-white">
            Discover Your Next Destination
          </h2>
          <p className="text-xl text-muted-foreground">Fetching live listings and locations worldwide.</p>
        </div>

        <div className="flex space-x-3 overflow-x-hidden pb-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  // --- ERROR STATE ---
  if (isError) {
    return (
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-red-600">Failed to Load Listings</h2>
        <p className="text-xl text-red-400">A critical error occurred while fetching data.</p>
        <pre className="mt-4 text-sm text-gray-500">{hotelsError?.message || locationsError?.message}</pre>
      </section>
    );
  }

  // --- SUCCESS STATE ---
  return (
    <section className="container mx-auto py-12 px-4">

      {/* ✅ Dynamic Title based on Search Mode */}
      {isSearchActive ? (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            AI Search Results for: "{searchQuery}"
          </h2>
          <p className="text-lg text-muted-foreground">Displaying best matches found by our AI service.</p>
        </div>
      ) : (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-2 text-white-800 dark:text-white">
            Top Trending Hotels Worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
      )}

      {/* ✅ Hide Location Tabs in Search Mode */}
      {!isSearchActive && (
        <div className="relative mb-12">
          <div className="flex space-x-3 pb-3 overflow-x-auto scrollbar-hide">
            {allLocations.map((location) => (
              <LocationTab
                onClick={handleLocationSelect}
                location={location}
                selectedLocation={selectedLocation}
                key={location._id}
              />
            ))}
          </div>
        </div>
      )}

      {/* ✅ Hotel Grid / No Results */}
      {hotelsToDisplay?.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-2xl font-bold">No Hotels Found</h3>
          <p className="text-muted-foreground">
            {isSearchActive
              ? `No AI matches for "${searchQuery}". Try another search.`
              : 'Try selecting "All" or a different location.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          {hotelsToDisplay?.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HotelListings;
