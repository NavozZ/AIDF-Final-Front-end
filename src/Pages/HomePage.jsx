import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import HotelListings from "../components/HotelListings";
import HotelsView from "../components/HotelsView";

function HomePage() {


  return (
    <>
      <main>
        <div className="relative min-h-[60vh]">
          <Hero />
        </div>
        <HotelsView />
      </main>
    </>
  );
}

export default HomePage;
