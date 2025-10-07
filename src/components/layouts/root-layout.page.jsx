import { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation";
import { Outlet } from "react-router";

function RootLayoutPage() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Set navbar height on component mount or resize
  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Navigation bar with ref */}
      <Navigation ref={navbarRef} />
      
      {/* Apply dynamic padding to the Outlet content */}
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayoutPage;
