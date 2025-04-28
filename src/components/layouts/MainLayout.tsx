import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MobileNavigation } from "./MobileNavigation";
import { Sidebar } from "./Sidebar";

export const MainLayout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medapp-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}

      <div className="flex flex-col flex-1">
        <main className="flex-1 flex flex-col p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>

        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
};
