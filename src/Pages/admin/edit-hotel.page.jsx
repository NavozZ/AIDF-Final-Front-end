import React from 'react';
import { useParams } from 'react-router';
import { useGetHotelByIdQuery, useUpdateHotelMutation } from '@/lib/api';
import HotelCreateFrom from '@/components/HotelCreateFrom'; // Assuming this component exists
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Edit3 } from 'lucide-react';

const AdminEditHotelPage = () => {
  const { id } = useParams(); 
  
  
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
  
  
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();

  const handleSubmit = async (formData) => {
    try {
      await updateHotel({ id, hotelData: formData }).unwrap();
      toast.success(`Hotel "${formData.name}" updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update hotel: ${error.data?.message || 'Server error'}`);
    }
  };

  if (isLoading) {
    return <div className="p-8"><Skeleton className="h-96 w-full" /></div>;
  }

  if (isError || !hotel) {
    return <div className="p-8 text-red-500">Error: Could not load hotel data for editing.</div>;
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Edit3 className="mr-3 h-7 w-7" /> Edit Hotel: {hotel.name}
      </h1>
      <div className="max-w-3xl mx-auto">
        
        <HotelCreateFrom 
          initialData={hotel} 
          onSubmit={handleSubmit} 
          isLoading={isUpdating}
          buttonText="Save Changes"
        />
      </div>
    </main>
  );
};

export default AdminEditHotelPage;