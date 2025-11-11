
import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const AdminProtectLayout = () => {
  const { isLoaded, sessionClaims } = useAuth();


  if (!isLoaded) {
    return (
      <div className="p-8">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const userRole = sessionClaims?.metadata?.role;


  if (userRole === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default AdminProtectLayout;
