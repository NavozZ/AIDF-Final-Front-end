import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  tagTypes: ["Hotels", "Locations", "Booking", "UserCount"],
  endpoints: (build) => ({
    getAllHotels: build.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `hotels?${queryString}`;
      },
      providesTags: [{ type: "Hotels", id: "LIST" }],
    }),

    getHotelsBySearch: build.query({
      query: (search) => `hotels/search?query=${search}`,
      providesTags: (result, error, search) => [{ type: "Hotels", search }],
    }),

    getHotelById: build.query({
      query: (id) => `hotels/${id}`,
      providesTags: (result, error, id) => [{ type: "Hotels", id }],
    }),

    getBookingCount: build.query({
      query: () => "bookings/count",
      providesTags: ["Booking"],
    }),

    getUserCount: build.query({
      query: () => "users/count",
      providesTags: ["UserCount"],
    }),

    createHotel: build.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
      invalidatesTags: [{ type: "Hotels", id: "LIST" }],
    }),

    updateHotel: build.mutation({
      query: ({ id, hotelData }) => ({
        url: `hotels/${id}`,
        method: "PUT",
        body: hotelData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Hotels", id: "LIST" },
        { type: "Hotels", id },
      ],
    }),

    deleteHotel: build.mutation({
      query: (id) => ({
        url: `hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Hotels", id: "LIST" }],
    }),

    getAllLocations: build.query({
      query: () => "locations",
      providesTags: [{ type: "Locations", id: "LIST" }],
    }),

    addLocation: build.mutation({
      query: (location) => ({
        url: "locations",
        method: "POST",
        body: { name: location.name },
      }),
      invalidatesTags: [{ type: "Locations", id: "LIST" }],
    }),

    addReview: build.mutation({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, review) => [
        { type: "Hotels", id: review.hotelId },
      ],
    }),

    createBooking: build.mutation({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),

    createCheckoutSession: build.mutation({
      query: (data) => ({
        url: "payments/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),

    getCheckoutSessionStatus: build.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
      providesTags: ["Booking"],
    }),

    getUserBookings: build.query({
      query: (userId) => `bookings/user/${userId}`,
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useGetHotelsBySearchQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetBookingCountQuery,
  useGetUserCountQuery,
  useGetAllLocationsQuery,
  useAddLocationMutation,
  useAddReviewMutation,
  useCreateBookingMutation,
  useCreateCheckoutSessionMutation,
  useGetCheckoutSessionStatusQuery,
  useGetUserBookingsQuery,
} = api;
