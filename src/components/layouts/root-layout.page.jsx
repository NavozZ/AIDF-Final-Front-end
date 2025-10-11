
import Navigation from "../Navigation";
import { Outlet } from "react-router";

function RootLayoutPage() {
  return (
    <>
          <Navigation />
          <Outlet />
    </>
  );
}

export default RootLayoutPage;
