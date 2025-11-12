import { useParams, useNavigate } from "react-router";
import { useState } from "react";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns"; 
import { cn } from "@/lib/utils"; // Your utility for class merging
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Building2, Tv, Coffee, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";

import { useGetHotelByIdQuery, useAddReviewMutation, useCreateBookingMutation } from "@/lib/api";

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const { user } = useUser();

  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();


  const [dates, setDates] = useState({ from: undefined, to: undefined });

  const handleAddReview = async () => {
    try {
      await addReview({
        hotelId: _id,
        comment: "This is a test review",
        rating: 5,
      }).unwrap();
    } catch (error) {}
  };

  // Booking handler
  const handleBook = async () => {
    if (!dates.from || !dates.to) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    try {
      const bookingDetails = {
        hotelId: _id,
        checkInDate: dates.from.toISOString(),
        checkOutDate: dates.to.toISOString(),
      };

      const result = await createBooking(bookingDetails).unwrap();
      const newBookingId = result._id;

      navigate(`/booking/payment?bookingId=${newBookingId}`);
    } catch (error) {
      alert(`Booking failed: ${error.data?.message || "Unknown error"}`);
    }
  };

  if (isLoading) {
    return (
      <main className="px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative w-full h-[400px]">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <Skeleton className="h-9 w-48" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Hotel</h2>
        <p className="text-muted-foreground">{error?.data?.message || "Try again later"}</p>
      </div>
    );
  }

  return (
    <main className="px-4">
      <div className="grid md:grid-cols-2 gap-8">

        {/* IMAGE + TAGS */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img src={hotel.image} alt={hotel.name} className="object-cover rounded-lg w-full h-full" />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>

        {/* HOTEL DETAILS */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
              <p className="text-muted-foreground">{hotel.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel.rating ?? "No Rating"}</span>
            <span className="text-muted-foreground">
              ({hotel.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-muted-foreground">{hotel.description}</p>

          
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center"><Wifi className="h-5 w-5 mr-2" /> Free Wi-Fi</div>
              <div className="flex items-center"><Building2 className="h-5 w-5 mr-2" /> Restaurant</div>
              <div className="flex items-center"><Tv className="h-5 w-5 mr-2" /> Flat-screen TV</div>
              <div className="flex items-center"><Coffee className="h-5 w-5 mr-2" /> Coffee maker</div>
            </CardContent>
          </Card>

          
          <Card className="p-4">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-xl font-semibold">Select Dates</h2>

             
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dates.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dates.from ? (
                      dates.to ? (
                        <>
                          {format(dates.from, "LLL dd, y")} -{" "}
                          {format(dates.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dates.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={dates}
                    onSelect={setDates}
                    numberOfMonths={2}
                
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
              
              
              <p className="text-center text-sm text-muted-foreground">
                Check-in: {dates.from ? format(dates.from, "PPP") : "Select Date"} |
                Check-out: {dates.to ? format(dates.to, "PPP") : "Select Date"}
              </p>
            </CardContent>
          </Card>

          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>

            <Button
              disabled={isCreateBookingLoading || !dates.from || !dates.to}
              onClick={handleBook}
            >
              {isCreateBookingLoading ? "Booking..." : "Book Now"}
            </Button>
          </div>

          
          <Button onClick={handleAddReview} disabled={isAddReviewLoading}>
            <PlusCircle className="w-4 h-4" /> Add Review
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HotelDetailsPage;