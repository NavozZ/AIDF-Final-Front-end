import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import HotelListings from "../components/HotelListings";
//import { useDispatch, useSelector } from "react-redux";
// import { incrementByAmount } from "../lib/features/counterSlice";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";

function HomePage() {

  // const count = useSelector((state) => state.counter);
  // console.log(count);

  // const dispatch = useDispatch();

  

  return (
    <>
      <main>
        <div className="relative min-h-[60vh]">
          <Hero />
        </div>
        {/* <Button onClick={() => dispatch(incrementByAmount(5))}>
        <PlusCircle className="w-4 h-4" />
      </Button> */}
        <HotelListings />
      </main>
    </>
  );
}

export default HomePage;
