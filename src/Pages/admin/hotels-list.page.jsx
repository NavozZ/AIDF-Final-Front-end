import React from 'react';
import { Link } from 'react-router';
import { useGetAllHotelsQuery, useDeleteHotelMutation } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Edit, Trash2, Hotel } from 'lucide-react';
import { toast } from 'sonner';

const AdminHotelsListPage = () => {
  const { data: hotels, isLoading, isError } = useGetAllHotelsQuery();
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

  const handleDelete = async (hotelId, hotelName) => {
    if (!window.confirm(`Are you sure you want to delete the hotel: ${hotelName}? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteHotel(hotelId).unwrap();
      toast.success(`Hotel "${hotelName}" successfully deleted.`);
    } catch (error) {
      toast.error(`Failed to delete hotel: ${error.data?.message || 'Server error'}`);
    }
  };

  if (isLoading) {
    return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">Error loading hotels: Check backend and authorization.</div>;
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Hotel className="mr-3 h-7 w-7" /> All Hotel Listings ({hotels?.length || 0})
      </h1>
      
      <div className="flex justify-end mb-6">
        <Button asChild>
          <Link to="/admin/create-hotel">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Hotel
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {hotels.map((hotel) => (
          <Card key={hotel._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={hotel.image} alt={hotel.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="text-xl font-semibold">{hotel.name}</p>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <p className="text-lg font-bold text-green-600">${hotel.price} / night</p>
                </div>
              </div>

              <div className="flex space-x-3">
                
                {/* EDIT FIX */}
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/hotels/${hotel._id}/edit`}>
                    <Edit className="h-4 w-4" /> 
                  </Link>
                </Button>

                {/* DELETE FIX */}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(hotel._id, hotel.name)} 
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" /> 
                </Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default AdminHotelsListPage;
