import React from 'react';
import { Link } from 'react-router';
import { useGetAllHotelsQuery, useDeleteHotelMutation } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Edit, Trash2, Hotel, Star, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminHotelsListPage = () => {
  const { data: hotels, isLoading, isError } = useGetAllHotelsQuery();
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

  const handleDelete = async (hotelId, hotelName) => {
    if (!window.confirm(`Delete "${hotelName}"? This cannot be undone.`)) return;
    try {
      await deleteHotel(hotelId).unwrap();
      toast.success(`"${hotelName}" deleted.`);
    } catch (error) {
      toast.error(`Failed: ${error.data?.message || 'Server error'}`);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-10 px-4 space-y-4">
        <Skeleton className="h-10 w-64 mb-6" />
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container mx-auto py-10 px-4 flex items-center gap-3 text-destructive">
        <AlertCircle className="w-5 h-5" />
        Error loading hotels. Check your connection and authorization.
      </main>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Hotel className="h-7 w-7 text-primary" /> Hotel Listings
          </h1>
          <p className="text-muted-foreground mt-1">{hotels?.length ?? 0} hotels in the system</p>
        </div>
        <Button asChild>
          <Link to="/admin/create-hotel">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Hotel
          </Link>
        </Button>
      </div>

      {/* Hotel list */}
      <div className="space-y-3">
        {hotels?.map((hotel) => (
          <Card key={hotel._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">

              {/* Image */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-lg font-semibold truncate">{hotel.name}</p>
                  {!hotel.stripePriceId && (
                    <Badge variant="destructive" className="text-xs">No Stripe Price</Badge>
                  )}
                  {!hotel.embedding?.length && (
                    <Badge variant="secondary" className="text-xs">No Embedding</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {hotel.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> ${hotel.price}/night
                  </span>
                  {hotel.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {hotel.rating}
                    </span>
                  )}
                  <span className="text-xs font-mono opacity-50 truncate">ID: {hotel._id}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/edit-hotel/${hotel._id}`}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(hotel._id, hotel.name)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}

        {hotels?.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <Hotel className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-xl font-semibold">No hotels yet</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">
              Add your first hotel to get started.
            </p>
            <Button asChild>
              <Link to="/admin/create-hotel">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Hotel
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminHotelsListPage;
