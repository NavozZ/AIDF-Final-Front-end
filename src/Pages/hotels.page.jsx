import { useState, useMemo } from 'react';
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from '@/lib/api';
import HotelCard from '@/components/HotelCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, X, SlidersHorizontal } from 'lucide-react';

function HotelsPage() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const { data: hotels, isLoading: hotelsLoading } = useGetAllHotelsQuery({});
  const { data: locations, isLoading: locationsLoading } = useGetAllLocationsQuery();

  // Filter by selected locations
  const filtered = useMemo(() => {
    if (!hotels) return [];
    let result = [...hotels];
    if (selectedLocations.length > 0) {
      result = result.filter(h => selectedLocations.includes(h.location));
    }
    switch (sortBy) {
      case 'price_asc':  return result.sort((a, b) => a.price - b.price);
      case 'price_desc': return result.sort((a, b) => b.price - a.price);
      case 'rating':     return result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case 'name':       return result.sort((a, b) => a.name.localeCompare(b.name));
      default:           return result;
    }
  }, [hotels, selectedLocations, sortBy]);

  function toggleLocation(loc) {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  }

  function clearFilters() {
    setSelectedLocations([]);
    setSortBy('default');
  }

  const hasActiveFilters = selectedLocations.length > 0 || sortBy !== 'default';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Hotels</h1>
          <p className="text-muted-foreground mt-1">
            {hotelsLoading ? '...' : `${filtered.length} hotel${filtered.length !== 1 ? 's' : ''} available`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Featured</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="name">Name: A–Z</SelectItem>
            </SelectContent>
          </Select>

          {/* Toggle filter panel on mobile */}
          <Button variant="outline" onClick={() => setShowFilters(v => !v)} className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedLocations.length + (sortBy !== 'default' ? 1 : 0)}
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground text-sm">
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Active location chips */}
      {selectedLocations.length > 0 && (
        <div className="px-8 pb-2 flex flex-wrap gap-2">
          {selectedLocations.map(loc => (
            <Badge key={loc} variant="secondary" className="flex items-center gap-1 py-1 px-3">
              <MapPin className="w-3 h-3" />
              {loc}
              <button onClick={() => toggleLocation(loc)} className="ml-1 hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-6 px-8 pb-8">
        {/* Sidebar filter panel */}
        {showFilters && (
          <aside className="w-56 flex-shrink-0">
            <div className="border border-border rounded-xl p-4 sticky top-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Filter by Location
              </h3>
              {locationsLoading ? (
                <div className="space-y-2">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
              ) : (
                <div className="space-y-1">
                  {locations?.map(loc => (
                    <button
                      key={loc._id}
                      onClick={() => toggleLocation(loc.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedLocations.includes(loc.name)
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Hotel grid */}
        <div className="flex-1">
          {hotelsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hotels match your filters</h3>
              <p className="text-muted-foreground mb-6">Try removing some filters to see more results.</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;