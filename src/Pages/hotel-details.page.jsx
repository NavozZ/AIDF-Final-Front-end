import { useParams } from "react-router";
import { hotels } from "../data.js";

const HotelDetailsPage = () => {
  const { _id } = useParams(); // Get the hotel ID from the URL parameters
  const hotel = hotels.find((hotel) => hotel._id === _id); // Find the hotel by ID

  return (
    <main className="pt-20 px-6">
      <h1 className="text-3xl font-bold text-center text-white">{hotel.name}</h1>
      {/* You can add more details of the hotel here */}
    </main>
  );
};

export default HotelDetailsPage;
