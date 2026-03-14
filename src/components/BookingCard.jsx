import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Bed, DollarSign, Clock, CheckCircle2, Clock3 } from 'lucide-react';
import { format } from 'date-fns';

const BookingCard = ({ booking }) => {
  const hotel = booking.hotelId;

  const nights = booking.checkIn && booking.checkOut
    ? Math.max(1, Math.round((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;
  const totalPrice = hotel?.price ? hotel.price * nights : null;

  const isPaid = booking.paymentStatus === 'PAID';

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4">

          
          <div className="md:col-span-1 relative">
            <img
              src={hotel?.image}
              alt={hotel?.name}
              className="w-full h-40 md:h-full object-cover"
            />
            
            <div className={`absolute top-3 left-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full
              ${isPaid
                ? 'bg-green-500/90 text-white'
                : 'bg-yellow-400/90 text-yellow-900'
              }`}
            >
              {isPaid
                ? <><CheckCircle2 className="w-3 h-3" /> PAID</>
                : <><Clock3 className="w-3 h-3" /> PENDING</>
              }
            </div>
          </div>

          
          <div className="md:col-span-3 p-5 flex flex-col justify-between gap-4">

            
            <div>
              <h3 className="text-lg font-bold">{hotel?.name || 'Hotel Details Missing'}</h3>
              <p className="text-sm text-muted-foreground flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                {hotel?.location}
              </p>
            </div>

            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Check-in</p>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Check-out</p>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Room</p>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <Bed className="w-3.5 h-3.5 text-primary" />
                  #{booking.roomNumber}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Booked on</p>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {format(new Date(booking.createdAt || Date.now()), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-end justify-between border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">{nights} night{nights !== 1 ? 's' : ''}</p>
              <div className="flex items-baseline gap-1">
                <DollarSign className="w-4 h-4 text-primary mb-0.5" />
                <span className="text-2xl font-bold text-primary">
                  {totalPrice ?? 'N/A'}
                </span>
                <span className="text-xs text-muted-foreground">total</span>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;