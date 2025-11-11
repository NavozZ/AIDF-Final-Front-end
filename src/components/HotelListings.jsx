import HotelCard from "@/components/HotelCard";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Search, SortAsc } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [sortBy, setSortBy] = useState("rating_desc");

  const { results: searchResults, mode: searchMode, query: searchQuery } = useSelector(
    (state) => state.search
  );

  const { data: allHotelsData, isLoading: isHotelsLoading, isError: isHotelsError } =
    useGetAllHotelsQuery({ sortBy });

  const hotels = allHotelsData;
  const { data: locations, isLoading: isLocationsLoading, isError: isLocationsError } =
    useGetAllLocationsQuery();

  const allLocations = locations ? [{ _id: 0, name: "All" }, ...locations] : [{ _id: 0, name: "All" }];
  const handleLocationSelect = (location) => setSelectedLocation(location._id);

  const selectedLocationName =
    allLocations.find((el) => selectedLocation === el._id)?.name || "All";

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels?.filter((hotel) => hotel.location.includes(selectedLocationName));

  const hotelsToDisplay = searchMode === "search" ? searchResults : filteredHotels;
  const isSearchActive = searchMode === "search";

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;

  if (isLoading) {
    return (
      <section className="container mx-auto py-12 px-4">
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

  if (isError) {
    return (
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-red-600">Failed to Load Listings</h2>
        <p className="text-xl text-red-400">A critical error occurred while fetching data.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-2 text-white-800 dark:text-white">
          {isSearchActive ? `AI Search Results for: "${searchQuery}"` : "Top Trending Hotels Worldwide"}
        </h2>
        <p className="text-xl text-muted-foreground">
          {isSearchActive
            ? "Displaying best matches found by our AI service."
            : "Discover the most trending hotels for an unforgettable experience."}
        </p>
      </div>

      {!isSearchActive && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold dark:text-white">Filter by Location</h3>
            <div className="flex items-center space-x-2">
              <SortAsc className="h-5 w-5 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-full">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="name_asc">Alphabetical: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
        </>
      )}

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
          {hotelsToDisplay.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HotelListings;
