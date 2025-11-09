// src/components/BookingCard.jsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Bed, DollarSign, Clock } from 'lucide-react';
import { format } from 'date-fns';

// Define the component to display individual booking details
const BookingCard = ({ booking }) => {
  // Access populated hotel data (assumed to be in booking.hotelId)
  const hotel = booking.hotelId;
  
  // Determine status and styling for visual indicator (Task 2.2)
  const isPaid = booking.paymentStatus === 'PAID';
  const statusVariant = isPaid ? 'default' : 'secondary';
  const statusText = isPaid ? 'PAID' : 'PENDING';

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* COLUMN 1: Hotel Image & Name */}
        <div className="md:col-span-1">
          <img
            src={hotel?.image}
            alt={hotel?.name}
            className="w-full h-32 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-bold truncate">{hotel?.name || 'Hotel Details Missing'}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="w-4 h-4 mr-1" /> {hotel?.location}
          </p>
        </div>

        {/* COLUMN 2 & 3: Details */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 border-l md:pl-4">
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-500">CHECK-IN</p>
            <p className="flex items-center text-md">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-500">CHECK-OUT</p>
            <p className="flex items-center text-md">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-500">ROOM</p>
            <p className="flex items-center text-md">
              <Bed className="w-4 h-4 mr-2" />
              # {booking.roomNumber}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-500">BOOKING DATE</p>
            <p className="flex items-center text-md">
              <Clock className="w-4 h-4 mr-2" />
              {format(new Date(booking.createdAt || Date.now()), 'PPP')}
            </p>
          </div>
        </div>
        
        {/* COLUMN 4: Status & Total */}
        <div className="md:col-span-1 flex flex-col items-start md:items-end justify-between border-l md:pl-4">
          <Badge variant={statusVariant} className="text-base py-1">
            {statusText}
          </Badge>
          <div className="mt-4 md:mt-0">
            <p className="font-semibold text-lg flex items-center">
                <DollarSign className="w-5 h-5 mr-1" /> Total Paid
            </p>
            {/* NOTE: Total amount is not in the schema, but is inferred from hotel price * nights */}
            <p className="text-2xl font-bold text-primary text-right">${hotel?.price * 2 || 'N/A'}</p> 
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default BookingCard;