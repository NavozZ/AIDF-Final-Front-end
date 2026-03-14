import HotelCard from "@/components/HotelCard";
import { useGetHotelsBySearchQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { resetQuery } from "@/lib/features/searchSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

function HotelSearchResults() {
  const query = useSelector((state) => state.search.query);
  const dispatch = useDispatch();

  const {
    data: hotels,
    isLoading,
    isError,
  } = useGetHotelsBySearchQuery(query);

  function handleClear() {
    dispatch(resetQuery());
  }

  if (isLoading) {
    return (
      <section className="px-8 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8">
        <p className="text-destructive">Error loading search results.</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
      {/* Search header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            AI Search results
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {hotels?.length ?? 0} hotel{hotels?.length !== 1 ? 's' : ''} found for{" "}
            <span className="font-medium text-foreground">"{query}"</span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleClear}
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Show all hotels
        </Button>
      </div>

      {/* Empty state */}
      {hotels?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
          <p className="text-muted-foreground mb-6">
            Try a different search — or browse all hotels.
          </p>
          <Button onClick={handleClear}>Browse all hotels</Button>
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {hotels?.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

export default HotelSearchResults;
