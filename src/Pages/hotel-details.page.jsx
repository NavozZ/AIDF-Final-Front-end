import { useParams, useNavigate } from "react-router";
import { useState } from "react";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns"; 
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Building2, Tv, Coffee, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/clerk-react";

import { useGetHotelByIdQuery, useAddReviewMutation, useCreateBookingMutation } from "@/lib/api";

const StarPicker = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "w-6 h-6 transition-colors",
              (hovered || value) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
};

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const { user } = useUser();

  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();

  const [dates, setDates] = useState({ from: undefined, to: undefined });

  // Review form state
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleAddReview = async () => {
    setReviewError("");
    setReviewSuccess(false);
    if (reviewRating === 0) { setReviewError("Please select a star rating."); return; }
    if (reviewComment.trim().length < 10) { setReviewError("Please write at least 10 characters."); return; }
    try {
      await addReview({
        hotelId: _id,
        comment: reviewComment.trim(),
        rating: reviewRating,
      }).unwrap();
      setReviewComment("");
      setReviewRating(0);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      setReviewError("Failed to submit review. Please try again.");
    }
  };

  const handleBook = async () => {
    if (!dates.from || !dates.to) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    try {
      const result = await createBooking({
        hotelId: _id,
        checkInDate: dates.from.toISOString(),
        checkOutDate: dates.to.toISOString(),
      }).unwrap();
      navigate(`/booking/payment?bookingId=${result._id}`);
    } catch (error) {
      alert(`Booking failed: ${error.data?.message || "Unknown error"}`);
    }
  };

  if (isLoading) {
    return (
      <main className="px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-[400px] rounded-lg" />
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
    <main className="px-4 py-8 max-w-6xl mx-auto space-y-10">
      <div className="grid md:grid-cols-2 gap-8">

        {/* IMAGE + TAGS */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img src={hotel.image} alt={hotel.name} className="object-cover rounded-lg w-full h-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
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
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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
                    className={cn("w-full justify-start text-left font-normal", !dates.from && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dates.from ? (
                      dates.to ? (
                        <>{format(dates.from, "LLL dd, y")} – {format(dates.to, "LLL dd, y")}</>
                      ) : format(dates.from, "LLL dd, y")
                    ) : <span>Pick a date range</span>}
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
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Reviews
          <span className="text-muted-foreground text-lg font-normal">({hotel.reviews?.length || 0})</span>
        </h2>

        {/* Existing reviews */}
        {hotel.reviews?.length > 0 ? (
          <div className="space-y-4">
            {hotel.reviews.map((review, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={cn("w-4 h-4", s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">{review.rating}/5</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
        )}

        {/* Add review form */}
        {user ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leave a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Your rating</p>
                <StarPicker value={reviewRating} onChange={setReviewRating} />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Your comment</p>
                <Textarea
                  placeholder="Share your experience at this hotel..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                />
              </div>
              {reviewError && <p className="text-sm text-destructive">{reviewError}</p>}
              {reviewSuccess && <p className="text-sm text-green-600">Review submitted! Thank you.</p>}
              <Button
                onClick={handleAddReview}
                disabled={isAddReviewLoading}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isAddReviewLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-6 text-center border-dashed">
            <p className="text-muted-foreground">Sign in to leave a review.</p>
          </Card>
        )}
      </div>
    </main>
  );
};

export default HotelDetailsPage;
