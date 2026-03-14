import React from 'react';
import { useParams } from 'react-router';
import { useGetHotelByIdQuery, useUpdateHotelMutation } from '@/lib/api';
import HotelCreateFrom from '@/components/HotelCreateFrom';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Edit3, AlertCircle } from 'lucide-react';

const AdminEditHotelPage = () => {
  const { id } = useParams();

  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();

  const handleSubmit = async (formData) => {
    try {
      await updateHotel({ id, hotelData: formData }).unwrap();
      toast.success(`"${formData.name}" updated successfully!`);
    } catch (error) {
      toast.error(`Failed: ${error.data?.message || 'Server error'}`);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-10 px-4 space-y-4">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-96 w-full max-w-2xl" />
      </main>
    );
  }

  if (isError || !hotel) {
    return (
      <main className="container mx-auto py-10 px-4 flex items-center gap-3 text-destructive">
        <AlertCircle className="w-5 h-5" />
        Could not load hotel data. It may have been deleted.
      </main>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Edit3 className="w-7 h-7 text-primary" /> Edit Hotel
        </h1>
        <p className="text-muted-foreground mt-1">Editing: <span className="font-medium text-foreground">{hotel.name}</span></p>
      </div>
      <HotelCreateFrom
        initialData={hotel}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        buttonText="Save Changes"
      />
    </main>
  );
};

export default AdminEditHotelPage;
