import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import HotelListings from "../components/HotelListings";

function HomePage() {

  return (
    <>
      <main>
        <div className="relative min-h-[60vh]">
          <Hero />
        </div>
        <HotelListings />
      </main>
    </>
  );
}

export default HomePage;
