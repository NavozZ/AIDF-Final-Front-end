// navozz/aidf-final-front-end/src/components/layouts/admin-protect.layout.jsx

import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const AdminProtectLayout = () => {
  const { isLoaded, sessionClaims } = useAuth();

  // Loading state while Clerk loads user session
  if (!isLoaded) {
    return (
      <div className="p-8">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  // Extract role from Clerk metadata
  const userRole = sessionClaims?.metadata?.role;

  // If admin, allow access
  if (userRole === "admin") {
    return <Outlet />;
  }

  // Otherwise redirect to home
  return <Navigate to="/" replace />;
};

export default AdminProtectLayout;
